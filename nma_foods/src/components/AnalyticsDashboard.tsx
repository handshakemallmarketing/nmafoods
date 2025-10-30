import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, Area, AreaChart
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Users, Eye, ShoppingCart, 
  Clock, Smartphone, Monitor, Tablet, Globe, Zap, Target,
  Activity, DollarSign, Loader2
} from 'lucide-react';

interface AnalyticsData {
  totalUsers: number;
  totalSessions: number;
  totalPageViews: number;
  totalConversions: number;
  conversionRate: number;
  averageSessionDuration: number;
  bounceRate: number;
  topPages: Array<{ page: string; views: number; }>;
  topEvents: Array<{ event: string; count: number; }>;
  deviceBreakdown: Array<{ device: string; count: number; percentage: number; }>;
  trafficSources: Array<{ source: string; sessions: number; percentage: number; }>;
  conversionFunnel: Array<{ step: string; count: number; rate: number; }>;
  performanceMetrics: Array<{ metric: string; value: number; unit: string; }>;
}

interface AnalyticsDashboardProps {
  className?: string;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className }) => {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const endDate = new Date();
      const startDate = new Date();
      
      // Calculate date range
      switch (timeRange) {
        case '1d':
          startDate.setDate(endDate.getDate() - 1);
          break;
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
      }

      // Fetch sessions data
      const { data: sessions } = await supabase
        .from('user_sessions_2024_10_29_15_00')
        .select('*')
        .gte('start_time', startDate.toISOString())
        .lte('start_time', endDate.toISOString());

      // Fetch events data
      const { data: events } = await supabase
        .from('analytics_events_2024_10_29_15_00')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      // Fetch conversions data
      const { data: conversions } = await supabase
        .from('conversion_events_2024_10_29_15_00')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      // Fetch performance data
      const { data: performance } = await supabase
        .from('performance_metrics_2024_10_29_15_00')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString());

      // Process data
      const analyticsData = processAnalyticsData(sessions || [], events || [], conversions || [], performance || []);
      setData(analyticsData);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processAnalyticsData = (sessions: any[], events: any[], conversions: any[], performance: any[]): AnalyticsData => {
    // Calculate basic metrics
    const totalUsers = new Set(sessions.map(s => s.user_id).filter(Boolean)).size;
    const totalSessions = sessions.length;
    const totalPageViews = events.filter(e => e.event_name === 'page_view').length;
    const totalConversions = conversions.length;
    const conversionRate = totalSessions > 0 ? (totalConversions / totalSessions) * 100 : 0;
    
    // Calculate average session duration
    const validSessions = sessions.filter(s => s.duration_seconds);
    const averageSessionDuration = validSessions.length > 0 
      ? validSessions.reduce((sum, s) => sum + s.duration_seconds, 0) / validSessions.length 
      : 0;
    
    // Calculate bounce rate
    const bouncedSessions = sessions.filter(s => s.bounce).length;
    const bounceRate = totalSessions > 0 ? (bouncedSessions / totalSessions) * 100 : 0;

    // Top pages
    const pageViews = events.filter(e => e.event_name === 'page_view');
    const pageViewCounts = pageViews.reduce((acc: any, event) => {
      acc[event.page_path] = (acc[event.page_path] || 0) + 1;
      return acc;
    }, {});
    const topPages = Object.entries(pageViewCounts)
      .map(([page, views]) => ({ page, views: views as number }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    // Top events
    const eventCounts = events.reduce((acc: any, event) => {
      acc[event.event_name] = (acc[event.event_name] || 0) + 1;
      return acc;
    }, {});
    const topEvents = Object.entries(eventCounts)
      .map(([event, count]) => ({ event, count: count as number }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Device breakdown
    const deviceCounts = sessions.reduce((acc: any, session) => {
      const device = session.device_type || 'unknown';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {});
    const deviceBreakdown = Object.entries(deviceCounts)
      .map(([device, count]) => ({
        device,
        count: count as number,
        percentage: ((count as number) / totalSessions) * 100
      }));

    // Traffic sources
    const sourceCounts = sessions.reduce((acc: any, session) => {
      const source = session.utm_source || session.referrer || 'direct';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
    const trafficSources = Object.entries(sourceCounts)
      .map(([source, sessions]) => ({
        source,
        sessions: sessions as number,
        percentage: ((sessions as number) / totalSessions) * 100
      }))
      .sort((a, b) => b.sessions - a.sessions);

    // Conversion funnel
    const funnelSteps = [
      { step: 'Page Views', count: totalPageViews, rate: 100 },
      { step: 'Product Views', count: conversions.filter(c => c.conversion_type === 'view_product').length, rate: 0 },
      { step: 'Add to Cart', count: conversions.filter(c => c.conversion_type === 'add_to_cart').length, rate: 0 },
      { step: 'Begin Checkout', count: conversions.filter(c => c.conversion_type === 'begin_checkout').length, rate: 0 },
      { step: 'Purchase', count: conversions.filter(c => c.conversion_type === 'purchase').length, rate: 0 },
    ];
    
    // Calculate funnel rates
    funnelSteps.forEach((step, index) => {
      if (index > 0) {
        step.rate = funnelSteps[0].count > 0 ? (step.count / funnelSteps[0].count) * 100 : 0;
      }
    });

    // Performance metrics
    const performanceMetrics = [
      {
        metric: 'Average LCP',
        value: getAverageMetric(performance, 'LCP'),
        unit: 'ms'
      },
      {
        metric: 'Average FID',
        value: getAverageMetric(performance, 'FID'),
        unit: 'ms'
      },
      {
        metric: 'Average CLS',
        value: getAverageMetric(performance, 'CLS'),
        unit: 'score'
      },
      {
        metric: 'Average TTFB',
        value: getAverageMetric(performance, 'TTFB'),
        unit: 'ms'
      },
    ];

    return {
      totalUsers,
      totalSessions,
      totalPageViews,
      totalConversions,
      conversionRate,
      averageSessionDuration,
      bounceRate,
      topPages,
      topEvents,
      deviceBreakdown,
      trafficSources,
      conversionFunnel: funnelSteps,
      performanceMetrics,
    };
  };

  const getAverageMetric = (performance: any[], metricName: string): number => {
    const metrics = performance.filter(p => p.metric_name === metricName);
    if (metrics.length === 0) return 0;
    
    const sum = metrics.reduce((acc, m) => acc + parseFloat(m.metric_value), 0);
    return Math.round(sum / metrics.length);
  };

  const formatDuration = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case 'users': return <Users className="h-4 w-4" />;
      case 'sessions': return <Activity className="h-4 w-4" />;
      case 'pageviews': return <Eye className="h-4 w-4" />;
      case 'conversions': return <Target className="h-4 w-4" />;
      case 'revenue': return <DollarSign className="h-4 w-4" />;
      case 'performance': return <Zap className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case 'mobile': return <Smartphone className="h-4 w-4" />;
      case 'tablet': return <Tablet className="h-4 w-4" />;
      case 'desktop': return <Monitor className="h-4 w-4" />;
      default: return <Globe className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center p-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00ff00'];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Track your website performance and user behavior</p>
        </div>
        
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1d">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Unique visitors in selected period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Avg. {formatDuration(data.averageSessionDuration)} per session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPageViews.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.bounceRate.toFixed(1)}% bounce rate
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversions</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalConversions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {data.conversionRate.toFixed(2)}% conversion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="conversions">Conversions</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle>Top Pages</CardTitle>
                <CardDescription>Most visited pages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {data.topPages.slice(0, 5).map((page, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm truncate">{page.page}</span>
                      <Badge variant="secondary">{page.views}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources */}
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your visitors come from</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={data.trafficSources}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ source, percentage }) => `${source} (${percentage.toFixed(1)}%)`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="sessions"
                    >
                      {data.trafficSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audience" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Device Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Device Types</CardTitle>
                <CardDescription>User device preferences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.deviceBreakdown.map((device, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getDeviceIcon(device.device)}
                        <span className="capitalize">{device.device}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">
                          {device.percentage.toFixed(1)}%
                        </span>
                        <Badge variant="outline">{device.count}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Events */}
            <Card>
              <CardHeader>
                <CardTitle>User Events</CardTitle>
                <CardDescription>Most common user interactions</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={data.topEvents.slice(0, 5)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="event" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>User journey through conversion steps</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data.conversionFunnel}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'count' ? value : `${value}%`,
                      name === 'count' ? 'Count' : 'Rate'
                    ]}
                  />
                  <Bar dataKey="count" fill="#8884d8" />
                  <Bar dataKey="rate" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.performanceMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.metric}</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metric.value}
                    <span className="text-sm font-normal text-muted-foreground ml-1">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {metric.value < 2500 ? 'Good' : metric.value < 4000 ? 'Needs Improvement' : 'Poor'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};