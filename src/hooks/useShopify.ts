import { useState, useEffect } from 'react';
import { fetchProducts, fetchProductByHandle, fetchCollections } from '@/lib/shopify';

export function useProducts(first = 20) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(first);
        setProducts(data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [first]);

  return { products, loading, error };
}

export function useProduct(handle: string) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!handle) return;

    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByHandle(handle);
        setProduct(data);
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [handle]);

  return { product, loading, error };
}

export function useCollections(first = 10) {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCollections = async () => {
      try {
        setLoading(true);
        const data = await fetchCollections(first);
        setCollections(data);
      } catch (err) {
        setError('Failed to fetch collections');
        console.error('Error fetching collections:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCollections();
  }, [first]);

  return { collections, loading, error };
}

// Helper function to format price
export function formatPrice(price: { amount: string; currencyCode: string }) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));
}

// Helper function to get product images
export function getProductImages(product: any) {
  return product?.images?.edges?.map((edge: any) => edge.node) || [];
}

// Helper function to get product variants
export function getProductVariants(product: any) {
  return product?.variants?.edges?.map((edge: any) => edge.node) || [];
}

// Helper function to get default variant
export function getDefaultVariant(product: any) {
  const variants = getProductVariants(product);
  return variants[0] || null;
}

// Helper function to check if product has multiple variants
export function hasMultipleVariants(product: any) {
  const variants = getProductVariants(product);
  return variants.length > 1;
}

// Helper function to get product tags
export function getProductTags(product: any) {
  return product?.tags || [];
}

// Helper function to filter products by tag
export function filterProductsByTag(products: any[], tag: string) {
  return products.filter(product => 
    getProductTags(product).includes(tag)
  );
}

// Helper function to filter products by collection
export function filterProductsByCollection(products: any[], collectionHandle: string) {
  // This would need to be implemented based on your collection structure
  return products;
}

// Helper function to get product availability
export function isProductAvailable(product: any) {
  const variants = getProductVariants(product);
  return variants.some((variant: any) => variant.availableForSale);
}

// Helper function to get lowest price variant
export function getLowestPriceVariant(product: any) {
  const variants = getProductVariants(product);
  if (variants.length === 0) return null;
  
  return variants.reduce((lowest: any, current: any) => {
    const lowestPrice = parseFloat(lowest.price.amount);
    const currentPrice = parseFloat(current.price.amount);
    return currentPrice < lowestPrice ? current : lowest;
  });
}

// Helper function to calculate discount percentage
export function getDiscountPercentage(price: any, compareAtPrice: any) {
  if (!compareAtPrice) return 0;
  
  const originalPrice = parseFloat(compareAtPrice.amount);
  const currentPrice = parseFloat(price.amount);
  
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
}