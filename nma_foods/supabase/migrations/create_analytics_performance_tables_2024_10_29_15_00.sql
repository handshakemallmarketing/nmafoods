-- Create analytics events table
CREATE TABLE IF NOT EXISTS public.analytics_events_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    event_name TEXT NOT NULL,
    event_category TEXT NOT NULL,
    event_action TEXT,
    event_label TEXT,
    event_value DECIMAL(10,2),
    page_path TEXT NOT NULL,
    page_title TEXT,
    referrer TEXT,
    user_agent TEXT,
    ip_address INET,
    country TEXT,
    city TEXT,
    device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
    browser TEXT,
    os TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_term TEXT,
    utm_content TEXT,
    custom_parameters JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create conversion tracking table
CREATE TABLE IF NOT EXISTS public.conversion_events_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    session_id TEXT NOT NULL,
    conversion_type TEXT CHECK (conversion_type IN ('purchase', 'signup', 'newsletter_signup', 'add_to_cart', 'view_product', 'begin_checkout', 'add_payment_info')) NOT NULL,
    conversion_value DECIMAL(10,2),
    currency TEXT DEFAULT 'USD',
    product_id TEXT,
    product_name TEXT,
    product_category TEXT,
    quantity INTEGER,
    transaction_id TEXT,
    payment_method TEXT,
    shipping_method TEXT,
    coupon_code TEXT,
    funnel_step INTEGER,
    conversion_data JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create performance metrics table
CREATE TABLE IF NOT EXISTS public.performance_metrics_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    page_path TEXT NOT NULL,
    page_title TEXT,
    metric_type TEXT CHECK (metric_type IN ('page_load', 'core_web_vitals', 'user_timing', 'resource_timing')) NOT NULL,
    metric_name TEXT NOT NULL,
    metric_value DECIMAL(10,3) NOT NULL,
    metric_unit TEXT DEFAULT 'ms',
    device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
    connection_type TEXT,
    browser TEXT,
    os TEXT,
    viewport_width INTEGER,
    viewport_height INTEGER,
    additional_data JSONB DEFAULT '{}',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user sessions table
CREATE TABLE IF NOT EXISTS public.user_sessions_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    start_time TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    end_time TIMESTAMP WITH TIME ZONE,
    duration_seconds INTEGER,
    page_views INTEGER DEFAULT 0,
    events_count INTEGER DEFAULT 0,
    conversions_count INTEGER DEFAULT 0,
    bounce BOOLEAN DEFAULT FALSE,
    entry_page TEXT,
    exit_page TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    device_type TEXT CHECK (device_type IN ('desktop', 'mobile', 'tablet')),
    browser TEXT,
    os TEXT,
    country TEXT,
    city TEXT,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create SEO performance tracking table
CREATE TABLE IF NOT EXISTS public.seo_performance_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    search_query TEXT,
    search_engine TEXT DEFAULT 'google',
    position INTEGER,
    clicks INTEGER DEFAULT 0,
    impressions INTEGER DEFAULT 0,
    ctr DECIMAL(5,4), -- Click-through rate
    avg_position DECIMAL(5,2),
    date DATE NOT NULL,
    country TEXT DEFAULT 'US',
    device TEXT CHECK (device IN ('desktop', 'mobile', 'tablet')) DEFAULT 'desktop',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(page_path, search_query, date, country, device)
);

-- Create analytics dashboard metrics table
CREATE TABLE IF NOT EXISTS public.analytics_dashboard_2024_10_29_15_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    metric_name TEXT NOT NULL,
    metric_category TEXT NOT NULL,
    metric_value DECIMAL(15,2) NOT NULL,
    metric_unit TEXT,
    comparison_value DECIMAL(15,2),
    comparison_period TEXT,
    date_range_start DATE NOT NULL,
    date_range_end DATE NOT NULL,
    filters JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON public.analytics_events_2024_10_29_15_00(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events_2024_10_29_15_00(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events_2024_10_29_15_00(event_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_timestamp ON public.analytics_events_2024_10_29_15_00(timestamp);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON public.analytics_events_2024_10_29_15_00(page_path);

CREATE INDEX IF NOT EXISTS idx_conversion_events_user_id ON public.conversion_events_2024_10_29_15_00(user_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_session_id ON public.conversion_events_2024_10_29_15_00(session_id);
CREATE INDEX IF NOT EXISTS idx_conversion_events_type ON public.conversion_events_2024_10_29_15_00(conversion_type);
CREATE INDEX IF NOT EXISTS idx_conversion_events_timestamp ON public.conversion_events_2024_10_29_15_00(timestamp);

CREATE INDEX IF NOT EXISTS idx_performance_metrics_session_id ON public.performance_metrics_2024_10_29_15_00(session_id);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_page_path ON public.performance_metrics_2024_10_29_15_00(page_path);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_type ON public.performance_metrics_2024_10_29_15_00(metric_type);
CREATE INDEX IF NOT EXISTS idx_performance_metrics_timestamp ON public.performance_metrics_2024_10_29_15_00(timestamp);

CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON public.user_sessions_2024_10_29_15_00(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions_2024_10_29_15_00(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_start_time ON public.user_sessions_2024_10_29_15_00(start_time);

CREATE INDEX IF NOT EXISTS idx_seo_performance_page_path ON public.seo_performance_2024_10_29_15_00(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_performance_date ON public.seo_performance_2024_10_29_15_00(date);
CREATE INDEX IF NOT EXISTS idx_seo_performance_query ON public.seo_performance_2024_10_29_15_00(search_query);

-- RLS Policies

-- Analytics events: users can view their own events, admins can view all
CREATE POLICY "Users can view own analytics events" ON public.analytics_events_2024_10_29_15_00
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "System can insert analytics events" ON public.analytics_events_2024_10_29_15_00
    FOR INSERT WITH CHECK (true);

-- Conversion events: similar to analytics events
CREATE POLICY "Users can view own conversion events" ON public.conversion_events_2024_10_29_15_00
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "System can insert conversion events" ON public.conversion_events_2024_10_29_15_00
    FOR INSERT WITH CHECK (true);

-- Performance metrics: public read for optimization
CREATE POLICY "Anyone can view performance metrics" ON public.performance_metrics_2024_10_29_15_00
    FOR SELECT USING (true);

CREATE POLICY "System can insert performance metrics" ON public.performance_metrics_2024_10_29_15_00
    FOR INSERT WITH CHECK (true);

-- User sessions: users can view their own sessions
CREATE POLICY "Users can view own sessions" ON public.user_sessions_2024_10_29_15_00
    FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

CREATE POLICY "System can manage sessions" ON public.user_sessions_2024_10_29_15_00
    FOR ALL WITH CHECK (true);

-- SEO performance: public read access
CREATE POLICY "Anyone can view SEO performance" ON public.seo_performance_2024_10_29_15_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage SEO performance" ON public.seo_performance_2024_10_29_15_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Analytics dashboard: authenticated users can view
CREATE POLICY "Authenticated users can view dashboard metrics" ON public.analytics_dashboard_2024_10_29_15_00
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can manage dashboard metrics" ON public.analytics_dashboard_2024_10_29_15_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Enable RLS on all tables
ALTER TABLE public.analytics_events_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversion_events_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_performance_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_dashboard_2024_10_29_15_00 ENABLE ROW LEVEL SECURITY;