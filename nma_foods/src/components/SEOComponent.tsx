import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { supabase } from '@/integrations/supabase/client';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
  canonical_url?: string;
  schema_markup?: any;
  robots_meta?: string;
}

interface SEOComponentProps {
  pagePath: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  customSchema?: any;
}

export const SEOComponent: React.FC<SEOComponentProps> = ({
  pagePath,
  fallbackTitle = 'NMA Foods - Premium Ghanaian Spices',
  fallbackDescription = 'Discover premium organic spices from Ghana. FDA-compliant turmeric, ginger, and authentic West African spice blends.',
  fallbackImage = '/images/nma-foods-og-image.jpg',
  customSchema
}) => {
  const [seoData, setSeoData] = useState<SEOData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSEOData();
  }, [pagePath]);

  const fetchSEOData = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_metadata_2024_10_29_14_00')
        .select('*')
        .eq('page_path', pagePath)
        .single();

      if (data && !error) {
        setSeoData(data);
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    return seoData?.title || fallbackTitle;
  };

  const getDescription = () => {
    return seoData?.description || fallbackDescription;
  };

  const getOGTitle = () => {
    return seoData?.og_title || seoData?.title || fallbackTitle;
  };

  const getOGDescription = () => {
    return seoData?.og_description || seoData?.description || fallbackDescription;
  };

  const getOGImage = () => {
    return seoData?.og_image || fallbackImage;
  };

  const getTwitterTitle = () => {
    return seoData?.twitter_title || seoData?.og_title || seoData?.title || fallbackTitle;
  };

  const getTwitterDescription = () => {
    return seoData?.twitter_description || seoData?.og_description || seoData?.description || fallbackDescription;
  };

  const getTwitterImage = () => {
    return seoData?.twitter_image || seoData?.og_image || fallbackImage;
  };

  const getCanonicalUrl = () => {
    return seoData?.canonical_url || `https://nmafoods.com${pagePath}`;
  };

  const getKeywords = () => {
    if (seoData?.keywords && seoData.keywords.length > 0) {
      return seoData.keywords.join(', ');
    }
    return 'Ghana spices, organic spices, turmeric, ginger, West African spices, premium spices';
  };

  const getRobotsMeta = () => {
    return seoData?.robots_meta || 'index,follow';
  };

  const getStructuredData = () => {
    const baseSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "NMA Foods",
      "url": "https://nmafoods.com",
      "logo": "https://nmafoods.com/images/logo.png",
      "description": "Premium organic spice manufacturer and exporter specializing in traditional Ghanaian spices",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "123 Spice Trade Avenue",
        "addressLocality": "Accra",
        "addressRegion": "Greater Accra",
        "addressCountry": "Ghana"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+233-20-123-4567",
        "contactType": "customer service",
        "email": "info@nmafoods.com"
      },
      "sameAs": [
        "https://www.facebook.com/nmafoods",
        "https://www.instagram.com/nmafoods",
        "https://www.youtube.com/nmafoods"
      ]
    };

    // Merge with custom schema if provided
    if (customSchema) {
      return JSON.stringify([baseSchema, customSchema]);
    }

    // Use database schema if available
    if (seoData?.schema_markup && Object.keys(seoData.schema_markup).length > 0) {
      return JSON.stringify([baseSchema, seoData.schema_markup]);
    }

    return JSON.stringify(baseSchema);
  };

  if (loading) {
    return null;
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{getTitle()}</title>
      <meta name="description" content={getDescription()} />
      <meta name="keywords" content={getKeywords()} />
      <meta name="robots" content={getRobotsMeta()} />
      <link rel="canonical" href={getCanonicalUrl()} />

      {/* Open Graph Meta Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={getOGTitle()} />
      <meta property="og:description" content={getOGDescription()} />
      <meta property="og:image" content={getOGImage()} />
      <meta property="og:url" content={getCanonicalUrl()} />
      <meta property="og:site_name" content="NMA Foods" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={getTwitterTitle()} />
      <meta name="twitter:description" content={getTwitterDescription()} />
      <meta name="twitter:image" content={getTwitterImage()} />
      <meta name="twitter:site" content="@nmafoods" />

      {/* Additional Meta Tags */}
      <meta name="author" content="NMA Foods" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />

      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content="GH-AA" />
      <meta name="geo.placename" content="Accra, Ghana" />
      <meta name="geo.position" content="5.6037;-0.1870" />
      <meta name="ICBM" content="5.6037, -0.1870" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {getStructuredData()}
      </script>

      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://cdn.shopify.com" />

      {/* DNS Prefetch for performance */}
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      <link rel="dns-prefetch" href="//cdn.shopify.com" />
    </Helmet>
  );
};

// Product-specific SEO component
interface ProductSEOProps {
  product: any;
  productHandle: string;
}

export const ProductSEO: React.FC<ProductSEOProps> = ({ product, productHandle }) => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product?.title || "Premium Spice",
    "description": product?.description || "High-quality organic spice from Ghana",
    "image": product?.images?.[0]?.src || "/images/default-product.jpg",
    "brand": {
      "@type": "Brand",
      "name": "NMA Foods"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "NMA Foods"
    },
    "offers": {
      "@type": "Offer",
      "price": product?.variants?.[0]?.price || "0",
      "priceCurrency": "USD",
      "availability": product?.variants?.[0]?.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "NMA Foods"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127"
    }
  };

  return (
    <SEOComponent
      pagePath={`/product/${productHandle}`}
      fallbackTitle={`${product?.title || 'Premium Spice'} | NMA Foods`}
      fallbackDescription={product?.description || 'High-quality organic spice from Ghana with proven health benefits.'}
      fallbackImage={product?.images?.[0]?.src}
      customSchema={productSchema}
    />
  );
};

// Blog article SEO component
interface BlogSEOProps {
  article: any;
}

export const BlogSEO: React.FC<BlogSEOProps> = ({ article }) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article?.title,
    "description": article?.excerpt,
    "image": article?.featured_image_url,
    "author": {
      "@type": "Person",
      "name": article?.user_profiles_2024_10_29_13_00?.full_name || "NMA Foods Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NMA Foods",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nmafoods.com/images/logo.png"
      }
    },
    "datePublished": article?.published_at,
    "dateModified": article?.updated_at,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nmafoods.com/blog/${article?.slug}`
    }
  };

  return (
    <SEOComponent
      pagePath={`/blog/${article?.slug}`}
      fallbackTitle={`${article?.title || 'Blog Article'} | NMA Foods`}
      fallbackDescription={article?.excerpt || 'Discover insights about premium Ghanaian spices and their health benefits.'}
      fallbackImage={article?.featured_image_url}
      customSchema={articleSchema}
    />
  );
};