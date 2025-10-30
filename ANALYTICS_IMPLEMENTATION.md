# Analytics & Performance Monitoring Implementation

## Overview

This implementation provides comprehensive analytics and performance monitoring for the NMA Foods website, including:

- **Google Analytics 4** integration with enhanced e-commerce tracking
- **Custom analytics** stored in Supabase for detailed insights
- **Performance monitoring** with Core Web Vitals tracking
- **Conversion tracking** for e-commerce events
- **User behavior analytics** with session management
- **SEO performance tracking** for search optimization

## Features Implemented

### 1. Analytics Tracking System

#### Core Analytics (`/src/lib/analytics.ts`)
- **Event Tracking**: Custom events with categories, actions, and labels
- **Page View Tracking**: Automatic page view tracking on route changes
- **User Session Management**: Session creation and tracking
- **Conversion Tracking**: E-commerce conversion events
- **Batch Processing**: Efficient event batching for performance

#### Key Events Tracked:
- `page_view` - Page visits and navigation
- `add_to_cart` - Product additions to cart
- `view_product` - Product detail page views
- `begin_checkout` - Checkout process initiation
- `purchase` - Completed transactions
- `signup` - User registrations
- `newsletter_signup` - Newsletter subscriptions
- `search` - Site search queries
- `click` - User interactions and clicks

### 2. Performance Monitoring System

#### Performance Tracking (`/src/lib/performance.ts`)
- **Core Web Vitals**: LCP, FID, CLS tracking
- **Page Load Metrics**: DNS, TCP, SSL, TTFB timing
- **Resource Performance**: Asset loading times
- **Memory Usage**: JavaScript heap monitoring
- **Network Information**: Connection type and speed

#### Performance Metrics:
- **LCP (Largest Contentful Paint)**: Loading performance
- **FID (First Input Delay)**: Interactivity measurement
- **CLS (Cumulative Layout Shift)**: Visual stability
- **TTFB (Time to First Byte)**: Server response time
- **Page Load Complete**: Full page loading time

### 3. Google Analytics 4 Integration

#### GA4 Features (`/src/components/GoogleAnalytics.tsx`)
- **Enhanced E-commerce**: Product views, cart actions, purchases
- **Custom Dimensions**: User type, product category, engagement level
- **Event Tracking**: Automatic and manual event tracking
- **Performance Integration**: Core Web Vitals sent to GA4
- **Privacy Compliance**: IP anonymization and consent management

#### E-commerce Events:
```javascript
// Product view
gtag('event', 'view_item', {
  currency: 'USD',
  value: item.price,
  items: [item]
});

// Add to cart
gtag('event', 'add_to_cart', {
  currency: 'USD',
  value: item.price * quantity,
  items: [item]
});

// Purchase
gtag('event', 'purchase', {
  transaction_id: transactionId,
  value: totalValue,
  currency: 'USD',
  items: items
});
```

### 4. Analytics Dashboard

#### Dashboard Features (`/src/components/AnalyticsDashboard.tsx`)
- **Key Metrics Overview**: Users, sessions, page views, conversions
- **Audience Analytics**: Device breakdown, traffic sources
- **Behavior Analysis**: Top pages, user events, engagement
- **Conversion Funnel**: Step-by-step conversion tracking
- **Performance Insights**: Core Web Vitals and page speed

#### Dashboard Sections:
1. **Overview**: Key performance indicators
2. **Audience**: User demographics and device info
3. **Behavior**: User interactions and content performance
4. **Conversions**: E-commerce funnel analysis
5. **Performance**: Site speed and Core Web Vitals

### 5. Analytics Hooks

#### useAnalytics Hook (`/src/hooks/useAnalytics.ts`)
```typescript
const { trackEvent, trackConversion, trackEcommerce } = useAnalytics();

// Track custom event
trackEvent('button_click', 'engagement', 'click', 'header_cta');

// Track e-commerce event
trackEcommerce.addToCart(productId, productName, category, price, quantity);

// Track conversion
trackConversion('purchase', totalValue, { transactionId, items });
```

#### useEcommerceAnalytics Hook
```typescript
const { trackProductView, trackAddToCart, trackPurchase } = useEcommerceAnalytics();

// Track product view
trackProductView(product);

// Track add to cart
trackAddToCart(product, variant, quantity);

// Track purchase
trackPurchase(orderId, items, totalValue, paymentMethod);
```

#### useContentAnalytics Hook
```typescript
const { trackArticleView, trackSearchQuery } = useContentAnalytics();

// Track blog article view
trackArticleView(articleId, articleTitle, category);

// Track search
trackSearchQuery(searchTerm, resultsCount, category);
```

## Database Schema

### Analytics Tables

#### 1. analytics_events_2024_10_29_15_00
Stores all user events and interactions:
- `event_name`: Type of event (page_view, click, etc.)
- `event_category`: Event category (engagement, ecommerce, etc.)
- `user_id`: Associated user (if authenticated)
- `session_id`: User session identifier
- `page_path`: Current page path
- `device_type`: Desktop, mobile, or tablet
- `utm_parameters`: Marketing campaign tracking

#### 2. conversion_events_2024_10_29_15_00
Tracks e-commerce conversions:
- `conversion_type`: Type of conversion (purchase, signup, etc.)
- `conversion_value`: Monetary value
- `product_id`: Associated product
- `transaction_id`: Order identifier
- `funnel_step`: Position in conversion funnel

#### 3. performance_metrics_2024_10_29_15_00
Stores performance measurements:
- `metric_type`: Type of metric (core_web_vitals, page_load, etc.)
- `metric_name`: Specific metric (LCP, FID, CLS, etc.)
- `metric_value`: Measured value
- `device_type`: Device category
- `connection_type`: Network connection info

#### 4. user_sessions_2024_10_29_15_00
Manages user sessions:
- `session_id`: Unique session identifier
- `start_time`: Session start timestamp
- `duration_seconds`: Session length
- `page_views`: Number of pages viewed
- `bounce`: Whether session was a bounce
- `traffic_source`: How user arrived

#### 5. seo_performance_2024_10_29_15_00
Tracks SEO metrics:
- `page_path`: Page URL
- `search_query`: Search term
- `position`: Search result position
- `clicks`: Number of clicks from search
- `impressions`: Search result impressions
- `ctr`: Click-through rate

## Configuration

### Environment Variables

```bash
# Google Analytics 4
VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager (optional)
VITE_GTM_ID=GTM-XXXXXXX

# Google Search Console
VITE_GOOGLE_SITE_VERIFICATION=your_verification_code

# Performance Monitoring
VITE_ENABLE_PERFORMANCE_MONITORING=true
VITE_PERFORMANCE_SAMPLE_RATE=0.1

# Debug Mode
VITE_ANALYTICS_DEBUG=false
```

### Setup Instructions

1. **Google Analytics 4 Setup**:
   - Create GA4 property in Google Analytics
   - Get Measurement ID (G-XXXXXXXXXX)
   - Add to environment variables
   - Enable Enhanced E-commerce in GA4

2. **Google Search Console**:
   - Add property in Search Console
   - Get verification meta tag
   - Add to environment variables

3. **Supabase Configuration**:
   - Analytics tables are automatically created
   - RLS policies are configured for security
   - No additional setup required

## Usage Examples

### Basic Event Tracking
```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

const { trackEvent } = useAnalytics();

// Track button click
const handleButtonClick = () => {
  trackEvent('cta_click', 'engagement', 'click', 'hero_button');
};
```

### E-commerce Tracking
```typescript
import { useEcommerceAnalytics } from '@/hooks/useAnalytics';

const { trackAddToCart, trackPurchase } = useEcommerceAnalytics();

// Track add to cart
const handleAddToCart = (product, variant, quantity) => {
  trackAddToCart(product, variant, quantity);
};

// Track purchase
const handlePurchase = (order) => {
  trackPurchase(order.id, order.items, order.total, order.paymentMethod);
};
```

### Performance Tracking
```typescript
import { performanceMonitoring } from '@/lib/performance';

// Track custom timing
const startTime = performance.now();
// ... some operation
performanceMonitoring.trackUserTiming('custom_operation', startTime);
```

## Analytics Dashboard Access

The analytics dashboard is available at `/admin/analytics` (requires authentication):

1. **Key Metrics**: Overview of site performance
2. **Real-time Data**: Live user activity
3. **Historical Trends**: Performance over time
4. **Conversion Analysis**: E-commerce funnel insights
5. **Performance Monitoring**: Core Web Vitals tracking

## Privacy & Compliance

### GDPR Compliance
- IP anonymization enabled
- User consent management
- Data retention policies
- Right to deletion support

### Data Security
- Row Level Security (RLS) on all tables
- Encrypted data transmission
- Secure API endpoints
- User data isolation

## Performance Impact

### Optimization Features
- **Event Batching**: Reduces API calls
- **Sampling**: Configurable performance monitoring sample rate
- **Lazy Loading**: Analytics scripts loaded asynchronously
- **Caching**: Efficient data storage and retrieval

### Performance Metrics
- **Bundle Size Impact**: ~15KB additional JavaScript
- **Network Requests**: Batched to minimize impact
- **Memory Usage**: Monitored and optimized
- **CPU Impact**: Minimal processing overhead

## Monitoring & Alerts

### Automated Monitoring
- Performance budget alerts
- Conversion rate monitoring
- Error rate tracking
- User experience metrics

### Custom Alerts
- Configure thresholds for key metrics
- Email notifications for issues
- Dashboard alerts for anomalies
- Performance regression detection

## Future Enhancements

### Planned Features
1. **A/B Testing Framework**: Integrated testing platform
2. **Predictive Analytics**: Machine learning insights
3. **Real-time Personalization**: Dynamic content optimization
4. **Advanced Segmentation**: User behavior clustering
5. **Cross-device Tracking**: Enhanced user journey mapping

### Integration Opportunities
1. **CRM Integration**: Customer data platform connection
2. **Marketing Automation**: Campaign performance tracking
3. **Business Intelligence**: Advanced reporting and insights
4. **Customer Support**: User behavior context for support

This comprehensive analytics implementation provides deep insights into user behavior, site performance, and business metrics while maintaining privacy compliance and optimal performance.