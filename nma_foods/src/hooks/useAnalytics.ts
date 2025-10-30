import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { analytics } from '@/lib/analytics';
import { performanceMonitoring } from '@/lib/performance';
import { useAuth } from '@/contexts/AuthContext';

// Custom hook for analytics integration
export const useAnalytics = () => {
  const location = useLocation();
  const { user } = useAuth();

  // Track page views on route changes
  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [location.pathname]);

  // Tracking functions
  const trackEvent = useCallback((
    eventName: string,
    eventCategory: string,
    eventAction?: string,
    eventLabel?: string,
    eventValue?: number,
    customParameters?: Record<string, any>
  ) => {
    analytics.track(eventName, eventCategory, eventAction, eventLabel, eventValue, customParameters);
  }, []);

  const trackConversion = useCallback((
    conversionType: 'purchase' | 'signup' | 'newsletter_signup' | 'add_to_cart' | 'view_product' | 'begin_checkout' | 'add_payment_info',
    conversionValue?: number,
    additionalData?: any
  ) => {
    analytics.trackConversion(conversionType, conversionValue, additionalData);
  }, []);

  const trackEcommerce = useCallback({
    viewItem: (productId: string, productName: string, category: string, value: number) => {
      analytics.ecommerce.viewItem(productId, productName, category, value);
      
      // Also send to Google Analytics if available
      if (typeof window !== 'undefined' && window.ecommerceHelper) {
        window.ecommerceHelper.viewItem({
          id: productId,
          name: productName,
          category,
          price: value
        });
      }
    },

    addToCart: (productId: string, productName: string, category: string, value: number, quantity: number = 1) => {
      analytics.ecommerce.addToCart(productId, productName, category, value, quantity);
      
      if (typeof window !== 'undefined' && window.ecommerceHelper) {
        window.ecommerceHelper.addToCart({
          id: productId,
          name: productName,
          category,
          price: value
        }, quantity);
      }
    },

    beginCheckout: (value: number, items: any[]) => {
      analytics.ecommerce.beginCheckout(value, items);
      
      if (typeof window !== 'undefined' && window.ecommerceHelper) {
        window.ecommerceHelper.beginCheckout(items, value);
      }
    },

    purchase: (transactionId: string, value: number, items: any[], paymentMethod?: string, shippingMethod?: string, couponCode?: string) => {
      analytics.ecommerce.purchase(transactionId, value, items, paymentMethod, shippingMethod, couponCode);
      
      if (typeof window !== 'undefined' && window.ecommerceHelper) {
        window.ecommerceHelper.purchase(transactionId, items, value);
      }
    }
  }, []);

  const trackEngagement = useCallback({
    click: (elementType: string, elementText: string, elementId?: string) => {
      analytics.engagement.click(elementType, elementText, elementId);
    },

    search: (searchTerm: string, resultsCount: number) => {
      analytics.engagement.search(searchTerm, resultsCount);
      
      if (typeof window !== 'undefined' && window.ecommerceHelper) {
        window.ecommerceHelper.search(searchTerm, resultsCount);
      }
    },

    download: (fileName: string, fileType: string) => {
      analytics.engagement.download(fileName, fileType);
    },

    scroll: (percentage: number) => {
      analytics.engagement.scroll(percentage);
    },

    timeOnPage: (seconds: number) => {
      analytics.engagement.timeOnPage(seconds);
    }
  }, []);

  const trackPerformance = useCallback((
    metricName: string,
    startTime?: number
  ) => {
    performanceMonitoring.trackUserTiming(metricName, startTime);
  }, []);

  return {
    trackEvent,
    trackConversion,
    trackEcommerce,
    trackEngagement,
    trackPerformance,
  };
};

// Hook for tracking specific component interactions
export const useComponentAnalytics = (componentName: string) => {
  const { trackEvent, trackEngagement } = useAnalytics();

  const trackComponentEvent = useCallback((
    action: string,
    label?: string,
    value?: number,
    customData?: Record<string, any>
  ) => {
    trackEvent(
      `${componentName}_${action}`,
      'component_interaction',
      action,
      label,
      value,
      { component: componentName, ...customData }
    );
  }, [componentName, trackEvent]);

  const trackComponentClick = useCallback((
    elementText: string,
    elementId?: string
  ) => {
    trackEngagement.click(componentName, elementText, elementId);
  }, [componentName, trackEngagement]);

  return {
    trackComponentEvent,
    trackComponentClick,
  };
};

// Hook for e-commerce specific tracking
export const useEcommerceAnalytics = () => {
  const { trackEcommerce, trackConversion } = useAnalytics();

  const trackProductView = useCallback((product: any) => {
    trackEcommerce.viewItem(
      product.id || product.handle,
      product.title || product.name,
      product.product_type || product.category || 'spices',
      parseFloat(product.variants?.[0]?.price || product.price || '0')
    );
  }, [trackEcommerce]);

  const trackAddToCart = useCallback((product: any, variant: any, quantity: number = 1) => {
    const price = parseFloat(variant.price || product.price || '0');
    trackEcommerce.addToCart(
      product.id || product.handle,
      product.title || product.name,
      product.product_type || product.category || 'spices',
      price,
      quantity
    );
  }, [trackEcommerce]);

  const trackCheckoutStart = useCallback((cartItems: any[], totalValue: number) => {
    const items = cartItems.map(item => ({
      item_id: item.product.id || item.product.handle,
      item_name: item.product.title || item.product.name,
      category: item.product.product_type || 'spices',
      price: parseFloat(item.variant.price || '0'),
      quantity: item.quantity
    }));

    trackEcommerce.beginCheckout(totalValue, items);
  }, [trackEcommerce]);

  const trackPurchase = useCallback((
    orderId: string,
    items: any[],
    totalValue: number,
    paymentMethod?: string,
    shippingMethod?: string,
    couponCode?: string
  ) => {
    const formattedItems = items.map(item => ({
      item_id: item.product.id || item.product.handle,
      item_name: item.product.title || item.product.name,
      category: item.product.product_type || 'spices',
      price: parseFloat(item.variant.price || '0'),
      quantity: item.quantity
    }));

    trackEcommerce.purchase(orderId, totalValue, formattedItems, paymentMethod, shippingMethod, couponCode);
  }, [trackEcommerce]);

  const trackNewsletterSignup = useCallback((email: string, source: string = 'website') => {
    trackConversion('newsletter_signup', undefined, {
      email,
      source,
    });
  }, [trackConversion]);

  return {
    trackProductView,
    trackAddToCart,
    trackCheckoutStart,
    trackPurchase,
    trackNewsletterSignup,
  };
};

// Hook for content analytics
export const useContentAnalytics = () => {
  const { trackEvent, trackEngagement } = useAnalytics();

  const trackArticleView = useCallback((articleId: string, articleTitle: string, category: string) => {
    trackEvent('article_view', 'content', 'view', articleTitle, undefined, {
      article_id: articleId,
      category,
    });
  }, [trackEvent]);

  const trackArticleShare = useCallback((articleId: string, articleTitle: string, platform: string) => {
    trackEvent('article_share', 'content', 'share', articleTitle, undefined, {
      article_id: articleId,
      platform,
    });
  }, [trackEvent]);

  const trackRecipeView = useCallback((recipeId: string, recipeTitle: string, difficulty: string) => {
    trackEvent('recipe_view', 'content', 'view', recipeTitle, undefined, {
      recipe_id: recipeId,
      difficulty,
    });
  }, [trackEvent]);

  const trackRecipeShare = useCallback((recipeId: string, recipeTitle: string) => {
    trackEvent('recipe_share', 'content', 'share', recipeTitle, undefined, {
      recipe_id: recipeId,
    });
  }, [trackEvent]);

  const trackSearchQuery = useCallback((query: string, resultsCount: number, category?: string) => {
    trackEngagement.search(query, resultsCount);
    trackEvent('site_search', 'search', 'query', query, resultsCount, {
      category,
    });
  }, [trackEvent, trackEngagement]);

  return {
    trackArticleView,
    trackArticleShare,
    trackRecipeView,
    trackRecipeShare,
    trackSearchQuery,
  };
};