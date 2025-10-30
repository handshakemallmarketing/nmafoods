import { supabase } from '@/integrations/supabase/client';

// Performance monitoring configuration
const PERFORMANCE_CONFIG = {
  SAMPLE_RATE: 0.1, // Sample 10% of sessions
  BATCH_SIZE: 5,
  BATCH_TIMEOUT: 10000, // 10 seconds
  DEBUG_MODE: import.meta.env.DEV,
};

// Performance metrics queue
let metricsQueue: any[] = [];
let batchTimeout: NodeJS.Timeout | null = null;

// Session ID for performance tracking
let performanceSessionId: string = '';

// Get session ID from analytics
const getPerformanceSessionId = () => {
  if (!performanceSessionId) {
    performanceSessionId = localStorage.getItem('nma_session_id') || 
      `perf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  return performanceSessionId;
};

// Device and connection info
const getPerformanceContext = () => {
  const userAgent = navigator.userAgent;
  
  let deviceType: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    deviceType = /iPad|Android(?=.*Tablet)|Tablet/i.test(userAgent) ? 'tablet' : 'mobile';
  }

  const browser = (() => {
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  })();

  const os = (() => {
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Unknown';
  })();

  // Connection info (if available)
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  const connectionType = connection ? connection.effectiveType || connection.type : 'unknown';

  return {
    deviceType,
    browser,
    os,
    connectionType,
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,
  };
};

// Batch processing for performance metrics
const processMetricsBatch = async () => {
  if (metricsQueue.length === 0) return;
  
  const batch = [...metricsQueue];
  metricsQueue = [];
  
  try {
    await supabase.from('performance_metrics_2024_10_29_15_00').insert(batch);
    
    if (PERFORMANCE_CONFIG.DEBUG_MODE) {
      console.log('Performance metrics batch sent:', batch);
    }
  } catch (error) {
    console.error('Failed to send performance metrics:', error);
    // Re-queue failed metrics
    metricsQueue.unshift(...batch);
  }
};

// Schedule batch processing
const scheduleMetricsBatch = () => {
  if (batchTimeout) clearTimeout(batchTimeout);
  
  batchTimeout = setTimeout(() => {
    processMetricsBatch();
  }, PERFORMANCE_CONFIG.BATCH_TIMEOUT);
};

// Core performance tracking function
const trackPerformanceMetric = (
  metricType: 'page_load' | 'core_web_vitals' | 'user_timing' | 'resource_timing',
  metricName: string,
  metricValue: number,
  metricUnit: string = 'ms',
  additionalData?: Record<string, any>
) => {
  // Sample rate check
  if (Math.random() > PERFORMANCE_CONFIG.SAMPLE_RATE) return;
  
  try {
    const context = getPerformanceContext();
    
    const metric = {
      session_id: getPerformanceSessionId(),
      page_path: window.location.pathname,
      page_title: document.title,
      metric_type: metricType,
      metric_name: metricName,
      metric_value: metricValue,
      metric_unit: metricUnit,
      device_type: context.deviceType,
      connection_type: context.connectionType,
      browser: context.browser,
      os: context.os,
      viewport_width: context.viewportWidth,
      viewport_height: context.viewportHeight,
      additional_data: additionalData || {},
    };
    
    metricsQueue.push(metric);
    
    // Process batch if queue is full
    if (metricsQueue.length >= PERFORMANCE_CONFIG.BATCH_SIZE) {
      processMetricsBatch();
    } else {
      scheduleMetricsBatch();
    }
  } catch (error) {
    console.error('Failed to track performance metric:', error);
  }
};

// Core Web Vitals tracking
export const trackCoreWebVitals = () => {
  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        trackPerformanceMetric(
          'core_web_vitals',
          'LCP',
          lastEntry.startTime,
          'ms',
          {
            element: lastEntry.element?.tagName || 'unknown',
            url: lastEntry.url || window.location.href,
          }
        );
      });
      
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.error('LCP observer error:', error);
    }

    // First Input Delay (FID)
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          trackPerformanceMetric(
            'core_web_vitals',
            'FID',
            entry.processingStart - entry.startTime,
            'ms',
            {
              eventType: (entry as any).name,
            }
          );
        });
      });
      
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.error('FID observer error:', error);
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            clsValue += (entry as any).value;
          }
        });
        
        // Report CLS periodically
        setTimeout(() => {
          trackPerformanceMetric(
            'core_web_vitals',
            'CLS',
            clsValue,
            'score',
            {
              finalValue: true,
            }
          );
        }, 5000);
      });
      
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.error('CLS observer error:', error);
    }
  }
};

// Page load performance
export const trackPageLoadPerformance = () => {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      
      if (navigation) {
        // DNS lookup time
        trackPerformanceMetric(
          'page_load',
          'DNS_lookup',
          navigation.domainLookupEnd - navigation.domainLookupStart
        );
        
        // TCP connection time
        trackPerformanceMetric(
          'page_load',
          'TCP_connection',
          navigation.connectEnd - navigation.connectStart
        );
        
        // SSL negotiation time
        if (navigation.secureConnectionStart > 0) {
          trackPerformanceMetric(
            'page_load',
            'SSL_negotiation',
            navigation.connectEnd - navigation.secureConnectionStart
          );
        }
        
        // Time to First Byte (TTFB)
        trackPerformanceMetric(
          'page_load',
          'TTFB',
          navigation.responseStart - navigation.requestStart
        );
        
        // DOM content loaded
        trackPerformanceMetric(
          'page_load',
          'DOM_content_loaded',
          navigation.domContentLoadedEventEnd - navigation.navigationStart
        );
        
        // Full page load
        trackPerformanceMetric(
          'page_load',
          'page_load_complete',
          navigation.loadEventEnd - navigation.navigationStart
        );
        
        // DOM processing time
        trackPerformanceMetric(
          'page_load',
          'DOM_processing',
          navigation.domComplete - navigation.domLoading
        );
      }
    }, 0);
  });
};

// Resource loading performance
export const trackResourcePerformance = () => {
  if ('PerformanceObserver' in window) {
    try {
      const resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const resource = entry as PerformanceResourceTiming;
          
          // Only track significant resources
          if (resource.duration > 100) { // Only resources taking more than 100ms
            trackPerformanceMetric(
              'resource_timing',
              'resource_load',
              resource.duration,
              'ms',
              {
                resourceType: resource.initiatorType,
                resourceUrl: resource.name,
                resourceSize: resource.transferSize || 0,
                cached: resource.transferSize === 0 && resource.decodedBodySize > 0,
              }
            );
          }
        });
      });
      
      resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (error) {
      console.error('Resource observer error:', error);
    }
  }
};

// Custom user timing
export const trackUserTiming = (name: string, startTime?: number) => {
  const endTime = performance.now();
  const duration = startTime ? endTime - startTime : endTime;
  
  trackPerformanceMetric(
    'user_timing',
    name,
    duration,
    'ms'
  );
};

// Memory usage tracking
export const trackMemoryUsage = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    
    trackPerformanceMetric(
      'user_timing',
      'memory_used',
      memory.usedJSHeapSize,
      'bytes',
      {
        totalHeapSize: memory.totalJSHeapSize,
        heapSizeLimit: memory.jsHeapSizeLimit,
      }
    );
  }
};

// Network information tracking
export const trackNetworkInfo = () => {
  const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
  
  if (connection) {
    trackPerformanceMetric(
      'user_timing',
      'network_info',
      connection.downlink || 0,
      'mbps',
      {
        effectiveType: connection.effectiveType,
        rtt: connection.rtt,
        saveData: connection.saveData,
      }
    );
  }
};

// Performance budget monitoring
export const checkPerformanceBudget = () => {
  const budgets = {
    LCP: 2500, // 2.5 seconds
    FID: 100,  // 100ms
    CLS: 0.1,  // 0.1 score
    TTFB: 800, // 800ms
    page_load_complete: 3000, // 3 seconds
  };
  
  // This would typically be called after collecting metrics
  // and would alert if budgets are exceeded
  return budgets;
};

// Performance insights
export const getPerformanceInsights = async (timeRange: number = 7) => {
  try {
    const endDate = new Date();
    const startDate = new Date(endDate.getTime() - (timeRange * 24 * 60 * 60 * 1000));
    
    const { data: metrics } = await supabase
      .from('performance_metrics_2024_10_29_15_00')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString());
    
    if (!metrics) return null;
    
    // Calculate averages by metric type
    const insights = metrics.reduce((acc: any, metric) => {
      const key = `${metric.metric_type}_${metric.metric_name}`;
      if (!acc[key]) {
        acc[key] = {
          type: metric.metric_type,
          name: metric.metric_name,
          unit: metric.metric_unit,
          values: [],
          count: 0,
          sum: 0,
        };
      }
      
      acc[key].values.push(metric.metric_value);
      acc[key].count++;
      acc[key].sum += parseFloat(metric.metric_value);
      
      return acc;
    }, {});
    
    // Calculate statistics
    Object.keys(insights).forEach(key => {
      const insight = insights[key];
      insight.average = insight.sum / insight.count;
      insight.median = insight.values.sort((a: number, b: number) => a - b)[Math.floor(insight.count / 2)];
      insight.p95 = insight.values[Math.floor(insight.count * 0.95)];
    });
    
    return insights;
  } catch (error) {
    console.error('Failed to get performance insights:', error);
    return null;
  }
};

// Initialize performance monitoring
export const initializePerformanceMonitoring = () => {
  // Check if we should monitor this session
  if (Math.random() > PERFORMANCE_CONFIG.SAMPLE_RATE) {
    if (PERFORMANCE_CONFIG.DEBUG_MODE) {
      console.log('Performance monitoring skipped (sampling)');
    }
    return;
  }
  
  // Track Core Web Vitals
  trackCoreWebVitals();
  
  // Track page load performance
  trackPageLoadPerformance();
  
  // Track resource performance
  trackResourcePerformance();
  
  // Track memory usage periodically
  setInterval(trackMemoryUsage, 30000); // Every 30 seconds
  
  // Track network info
  trackNetworkInfo();
  
  if (PERFORMANCE_CONFIG.DEBUG_MODE) {
    console.log('Performance monitoring initialized');
  }
};

// Export performance monitoring instance
export const performanceMonitoring = {
  trackMetric: trackPerformanceMetric,
  trackUserTiming,
  trackMemoryUsage,
  trackNetworkInfo,
  getInsights: getPerformanceInsights,
  checkBudget: checkPerformanceBudget,
  initialize: initializePerformanceMonitoring,
};