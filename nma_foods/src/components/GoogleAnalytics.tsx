import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface GoogleAnalyticsProps {
  measurementId?: string;
  gtmId?: string;
  debugMode?: boolean;
}

export const GoogleAnalytics: React.FC<GoogleAnalyticsProps> = ({
  measurementId = import.meta.env.VITE_GA4_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  gtmId = import.meta.env.VITE_GTM_ID,
  debugMode = import.meta.env.DEV
}) => {
  useEffect(() => {
    // Initialize Google Analytics 4
    if (measurementId && measurementId !== 'G-XXXXXXXXXX') {
      // Configure gtag
      if (typeof window !== 'undefined') {
        window.gtag = window.gtag || function() {
          (window.dataLayer = window.dataLayer || []).push(arguments);
        };
        
        window.gtag('js', new Date());
        window.gtag('config', measurementId, {
          debug_mode: debugMode,
          send_page_view: false, // We'll handle page views manually
          anonymize_ip: true,
          allow_google_signals: true,
          allow_ad_personalization_signals: false,
        });

        // Enhanced e-commerce configuration
        window.gtag('config', measurementId, {
          custom_map: {
            'custom_parameter_1': 'product_category',
            'custom_parameter_2': 'user_type',
            'custom_parameter_3': 'session_id',
          }
        });

        if (debugMode) {
          console.log('Google Analytics 4 initialized:', measurementId);
        }
      }
    }

    // Initialize Google Tag Manager if provided
    if (gtmId && gtmId !== 'GTM-XXXXXXX') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });

      if (debugMode) {
        console.log('Google Tag Manager initialized:', gtmId);
      }
    }
  }, [measurementId, gtmId, debugMode]);

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {measurementId && measurementId !== 'G-XXXXXXXXXX' && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
          />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${measurementId}', {
                debug_mode: ${debugMode},
                send_page_view: false,
                anonymize_ip: true,
                allow_google_signals: true,
                allow_ad_personalization_signals: false
              });
            `}
          </script>
        </>
      )}

      {/* Google Tag Manager */}
      {gtmId && gtmId !== 'GTM-XXXXXXX' && (
        <>
          <script>
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content={import.meta.env.VITE_GOOGLE_SITE_VERIFICATION || ''} />

      {/* Enhanced E-commerce Data Layer */}
      <script>
        {`
          window.dataLayer = window.dataLayer || [];
          
          // Enhanced E-commerce helper functions
          window.ecommerceHelper = {
            viewItem: function(item) {
              gtag('event', 'view_item', {
                currency: 'USD',
                value: item.price,
                items: [{
                  item_id: item.id,
                  item_name: item.name,
                  category: item.category,
                  price: item.price,
                  quantity: 1
                }]
              });
            },
            
            addToCart: function(item, quantity = 1) {
              gtag('event', 'add_to_cart', {
                currency: 'USD',
                value: item.price * quantity,
                items: [{
                  item_id: item.id,
                  item_name: item.name,
                  category: item.category,
                  price: item.price,
                  quantity: quantity
                }]
              });
            },
            
            beginCheckout: function(items, value) {
              gtag('event', 'begin_checkout', {
                currency: 'USD',
                value: value,
                items: items
              });
            },
            
            purchase: function(transactionId, items, value, shipping = 0, tax = 0) {
              gtag('event', 'purchase', {
                transaction_id: transactionId,
                value: value,
                currency: 'USD',
                shipping: shipping,
                tax: tax,
                items: items
              });
            },
            
            search: function(searchTerm, resultsCount = 0) {
              gtag('event', 'search', {
                search_term: searchTerm,
                results_count: resultsCount
              });
            },
            
            signup: function(method = 'email') {
              gtag('event', 'sign_up', {
                method: method
              });
            },
            
            login: function(method = 'email') {
              gtag('event', 'login', {
                method: method
              });
            }
          };
        `}
      </script>

      {/* Performance Monitoring */}
      <script>
        {`
          // Core Web Vitals tracking for Google Analytics
          function sendToGoogleAnalytics({name, delta, value, id}) {
            gtag('event', name, {
              event_category: 'Web Vitals',
              event_label: id,
              value: Math.round(name === 'CLS' ? delta * 1000 : delta),
              non_interaction: true,
            });
          }
          
          // Load web-vitals library and track metrics
          if (typeof webVitals !== 'undefined') {
            webVitals.getCLS(sendToGoogleAnalytics);
            webVitals.getFID(sendToGoogleAnalytics);
            webVitals.getFCP(sendToGoogleAnalytics);
            webVitals.getLCP(sendToGoogleAnalytics);
            webVitals.getTTFB(sendToGoogleAnalytics);
          }
        `}
      </script>

      {/* Custom Dimensions Setup */}
      <script>
        {`
          // Set custom dimensions
          gtag('config', '${measurementId}', {
            custom_map: {
              'custom_parameter_1': 'user_type',
              'custom_parameter_2': 'product_category',
              'custom_parameter_3': 'page_category',
              'custom_parameter_4': 'user_engagement_level'
            }
          });
          
          // User properties
          function setUserProperties(properties) {
            gtag('config', '${measurementId}', {
              user_properties: properties
            });
          }
          
          // Enhanced measurement events
          gtag('config', '${measurementId}', {
            enhanced_measurement: {
              scrolls: true,
              outbound_clicks: true,
              site_search: true,
              video_engagement: true,
              file_downloads: true
            }
          });
        `}
      </script>
    </Helmet>
  );
};

// TypeScript declarations for global gtag
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    ecommerceHelper: {
      viewItem: (item: any) => void;
      addToCart: (item: any, quantity?: number) => void;
      beginCheckout: (items: any[], value: number) => void;
      purchase: (transactionId: string, items: any[], value: number, shipping?: number, tax?: number) => void;
      search: (searchTerm: string, resultsCount?: number) => void;
      signup: (method?: string) => void;
      login: (method?: string) => void;
    };
  }
}

export default GoogleAnalytics;