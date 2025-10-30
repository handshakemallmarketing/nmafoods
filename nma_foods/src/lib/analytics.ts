import { supabase } from '@/integrations/supabase/client';

// Analytics configuration
const ANALYTICS_CONFIG = {
  GA4_MEASUREMENT_ID: import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  GTM_ID: import.meta.env.VITE_GTM_ID || 'GTM-XXXXXXX',
  DEBUG_MODE: import.meta.env.DEV,
  BATCH_SIZE: 10,
  BATCH_TIMEOUT: 5000, // 5 seconds
};

// Event queue for batching
let eventQueue: any[] = [];
let batchTimeout: NodeJS.Timeout | null = null;

// Session management
let sessionId: string = '';
let sessionStartTime: number = Date.now();

// Device and browser detection
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;
  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

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

  return { deviceType, browser, os, viewport };
};

// UTM parameter extraction
const getUTMParameters = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return {
    utm_source: urlParams.get('utm_source'),
    utm_medium: urlParams.get('utm_medium'),
    utm_campaign: urlParams.get('utm_campaign'),
    utm_term: urlParams.get('utm_term'),
    utm_content: urlParams.get('utm_content'),
  };
};

// Initialize session
const initializeSession = () => {
  sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  sessionStartTime = Date.now();
  
  // Store session in localStorage for persistence
  localStorage.setItem('nma_session_id', sessionId);
  localStorage.setItem('nma_session_start', sessionStartTime.toString());
  
  // Create session record
  createSession();
};

// Get or create session ID
const getSessionId = () => {
  const stored = localStorage.getItem('nma_session_id');
  const storedStart = localStorage.getItem('nma_session_start');
  
  // Check if session is still valid (30 minutes)
  if (stored && storedStart) {
    const sessionAge = Date.now() - parseInt(storedStart);
    if (sessionAge < 30 * 60 * 1000) { // 30 minutes
      sessionId = stored;
      sessionStartTime = parseInt(storedStart);
      return sessionId;
    }
  }
  
  // Create new session
  initializeSession();
  return sessionId;
};

// Create session record in database
const createSession = async () => {
  try {
    const deviceInfo = getDeviceInfo();
    const utmParams = getUTMParameters();
    const { data: { user } } = await supabase.auth.getUser();

    await supabase.from('user_sessions_2024_10_29_15_00').insert({
      session_id: sessionId,
      user_id: user?.id || null,
      entry_page: window.location.pathname,
      referrer: document.referrer || null,
      device_type: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      user_agent: navigator.userAgent,
      ...utmParams,
    });
  } catch (error) {
    console.error('Failed to create session:', error);
  }
};

// Update session on page unload
const updateSession = async () => {
  try {
    const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
    
    await supabase.from('user_sessions_2024_10_29_15_00')
      .update({
        end_time: new Date().toISOString(),
        duration_seconds: duration,
        exit_page: window.location.pathname,
        updated_at: new Date().toISOString(),
      })
      .eq('session_id', sessionId);
  } catch (error) {
    console.error('Failed to update session:', error);
  }
};

// Batch event processing
const processBatch = async () => {
  if (eventQueue.length === 0) return;
  
  const batch = [...eventQueue];
  eventQueue = [];
  
  try {
    // Send to Supabase
    await supabase.from('analytics_events_2024_10_29_15_00').insert(batch);
    
    // Send to Google Analytics 4 if configured
    if (typeof gtag !== 'undefined') {
      batch.forEach(event => {
        gtag('event', event.event_name, {
          event_category: event.event_category,
          event_label: event.event_label,
          value: event.event_value,
          custom_map: event.custom_parameters,
        });
      });
    }
    
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('Analytics batch sent:', batch);
    }
  } catch (error) {
    console.error('Failed to send analytics batch:', error);
    // Re-queue failed events
    eventQueue.unshift(...batch);
  }
};

// Schedule batch processing
const scheduleBatch = () => {
  if (batchTimeout) clearTimeout(batchTimeout);
  
  batchTimeout = setTimeout(() => {
    processBatch();
  }, ANALYTICS_CONFIG.BATCH_TIMEOUT);
};

// Core analytics tracking function
export const trackEvent = async (
  eventName: string,
  eventCategory: string,
  eventAction?: string,
  eventLabel?: string,
  eventValue?: number,
  customParameters?: Record<string, any>
) => {
  try {
    const deviceInfo = getDeviceInfo();
    const utmParams = getUTMParameters();
    const { data: { user } } = await supabase.auth.getUser();
    
    const event = {
      user_id: user?.id || null,
      session_id: getSessionId(),
      event_name: eventName,
      event_category: eventCategory,
      event_action: eventAction || null,
      event_label: eventLabel || null,
      event_value: eventValue || null,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
      device_type: deviceInfo.deviceType,
      browser: deviceInfo.browser,
      os: deviceInfo.os,
      custom_parameters: customParameters || {},
      ...utmParams,
    };
    
    eventQueue.push(event);
    
    // Process batch if queue is full
    if (eventQueue.length >= ANALYTICS_CONFIG.BATCH_SIZE) {
      await processBatch();
    } else {
      scheduleBatch();
    }
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

// Conversion tracking
export const trackConversion = async (
  conversionType: 'purchase' | 'signup' | 'newsletter_signup' | 'add_to_cart' | 'view_product' | 'begin_checkout' | 'add_payment_info',
  conversionValue?: number,
  additionalData?: {
    currency?: string;
    productId?: string;
    productName?: string;
    productCategory?: string;
    quantity?: number;
    transactionId?: string;
    paymentMethod?: string;
    shippingMethod?: string;
    couponCode?: string;
    funnelStep?: number;
  }
) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    const conversion = {
      user_id: user?.id || null,
      session_id: getSessionId(),
      conversion_type: conversionType,
      conversion_value: conversionValue || null,
      currency: additionalData?.currency || 'USD',
      product_id: additionalData?.productId || null,
      product_name: additionalData?.productName || null,
      product_category: additionalData?.productCategory || null,
      quantity: additionalData?.quantity || null,
      transaction_id: additionalData?.transactionId || null,
      payment_method: additionalData?.paymentMethod || null,
      shipping_method: additionalData?.shippingMethod || null,
      coupon_code: additionalData?.couponCode || null,
      funnel_step: additionalData?.funnelStep || null,
      conversion_data: additionalData || {},
    };
    
    await supabase.from('conversion_events_2024_10_29_15_00').insert(conversion);
    
    // Also track as regular event
    await trackEvent(
      conversionType,
      'conversion',
      'convert',
      additionalData?.productName || conversionType,
      conversionValue,
      additionalData
    );
    
    // Send to Google Analytics 4
    if (typeof gtag !== 'undefined') {
      if (conversionType === 'purchase') {
        gtag('event', 'purchase', {
          transaction_id: additionalData?.transactionId,
          value: conversionValue,
          currency: additionalData?.currency || 'USD',
          items: [{
            item_id: additionalData?.productId,
            item_name: additionalData?.productName,
            category: additionalData?.productCategory,
            quantity: additionalData?.quantity || 1,
            price: conversionValue,
          }],
        });
      } else {
        gtag('event', conversionType, {
          value: conversionValue,
          currency: additionalData?.currency || 'USD',
        });
      }
    }
    
    if (ANALYTICS_CONFIG.DEBUG_MODE) {
      console.log('Conversion tracked:', conversion);
    }
  } catch (error) {
    console.error('Failed to track conversion:', error);
  }
};

// Page view tracking
export const trackPageView = async (pagePath?: string, pageTitle?: string) => {
  const path = pagePath || window.location.pathname;
  const title = pageTitle || document.title;
  
  await trackEvent('page_view', 'engagement', 'view', path, undefined, {
    page_path: path,
    page_title: title,
  });
  
  // Send to Google Analytics 4
  if (typeof gtag !== 'undefined') {
    gtag('config', ANALYTICS_CONFIG.GA4_MEASUREMENT_ID, {
      page_title: title,
      page_location: window.location.href,
    });
  }
};

// E-commerce specific tracking
export const trackEcommerce = {
  viewItem: (productId: string, productName: string, category: string, value: number) => {
    trackConversion('view_product', value, {
      productId,
      productName,
      productCategory: category,
    });
  },
  
  addToCart: (productId: string, productName: string, category: string, value: number, quantity: number = 1) => {
    trackConversion('add_to_cart', value * quantity, {
      productId,
      productName,
      productCategory: category,
      quantity,
    });
  },
  
  beginCheckout: (value: number, items: any[]) => {
    trackConversion('begin_checkout', value, {
      funnelStep: 1,
    });
  },
  
  addPaymentInfo: (value: number, paymentMethod: string) => {
    trackConversion('add_payment_info', value, {
      paymentMethod,
      funnelStep: 2,
    });
  },
  
  purchase: (transactionId: string, value: number, items: any[], paymentMethod?: string, shippingMethod?: string, couponCode?: string) => {
    trackConversion('purchase', value, {
      transactionId,
      paymentMethod,
      shippingMethod,
      couponCode,
      funnelStep: 3,
    });
  },
};

// User engagement tracking
export const trackEngagement = {
  scroll: (percentage: number) => {
    trackEvent('scroll', 'engagement', 'scroll_depth', `${percentage}%`, percentage);
  },
  
  timeOnPage: (seconds: number) => {
    trackEvent('time_on_page', 'engagement', 'duration', `${seconds}s`, seconds);
  },
  
  click: (elementType: string, elementText: string, elementId?: string) => {
    trackEvent('click', 'engagement', elementType, elementText, undefined, {
      element_id: elementId,
    });
  },
  
  search: (searchTerm: string, resultsCount: number) => {
    trackEvent('search', 'engagement', 'site_search', searchTerm, resultsCount);
  },
  
  download: (fileName: string, fileType: string) => {
    trackEvent('download', 'engagement', 'file_download', fileName, undefined, {
      file_type: fileType,
    });
  },
};

// Initialize analytics
export const initializeAnalytics = () => {
  // Initialize session
  getSessionId();
  
  // Track initial page view
  trackPageView();
  
  // Set up page unload handler
  window.addEventListener('beforeunload', updateSession);
  
  // Set up scroll tracking
  let scrollTimeout: NodeJS.Timeout;
  let maxScroll = 0;
  
  window.addEventListener('scroll', () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );
    
    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (maxScroll >= 25 && maxScroll % 25 === 0) {
          trackEngagement.scroll(maxScroll);
        }
      }, 1000);
    }
  });
  
  // Set up time on page tracking
  let timeOnPageStart = Date.now();
  setInterval(() => {
    const timeOnPage = Math.floor((Date.now() - timeOnPageStart) / 1000);
    if (timeOnPage > 0 && timeOnPage % 30 === 0) { // Every 30 seconds
      trackEngagement.timeOnPage(timeOnPage);
    }
  }, 30000);
  
  if (ANALYTICS_CONFIG.DEBUG_MODE) {
    console.log('Analytics initialized');
  }
};

// Export analytics instance
export const analytics = {
  track: trackEvent,
  trackConversion,
  trackPageView,
  ecommerce: trackEcommerce,
  engagement: trackEngagement,
  initialize: initializeAnalytics,
};