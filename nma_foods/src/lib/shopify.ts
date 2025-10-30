import { createStorefrontApiClient } from '@shopify/storefront-api-client';

const storeDomain = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN;
const accessToken = import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

// Check if Shopify credentials are available
const hasShopifyCredentials = storeDomain && accessToken && storeDomain !== 'your-store.myshopify.com';

let client: any = null;

if (hasShopifyCredentials) {
  client = createStorefrontApiClient({
    storeDomain,
    apiVersion: '2024-01',
    publicAccessToken: accessToken,
  });
}
// GraphQL queries
export const GET_PRODUCTS = `
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
              }
            }
          }
          variants(first: 5) {
            edges {
              node {
                id
                title
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                availableForSale
                quantityAvailable
              }
            }
          }
          tags
          productType
          vendor
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      images(first: 10) {
        edges {
          node {
            id
            url
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            availableForSale
            quantityAvailable
            selectedOptions {
              name
              value
            }
          }
        }
      }
      tags
      productType
      vendor
      options {
        id
        name
        values
      }
    }
  }
`;

export const GET_COLLECTIONS = `
  query getCollections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image {
            id
            url
            altText
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
                images(first: 1) {
                  edges {
                    node {
                      url
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CHECKOUT = `
  mutation checkoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
        totalTax {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_LINE_ITEMS_ADD = `
  mutation checkoutLineItemsAdd($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        totalTax {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_LINE_ITEMS_UPDATE = `
  mutation checkoutLineItemsUpdate($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
        totalTax {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

export const CHECKOUT_LINE_ITEMS_REMOVE = `
  mutation checkoutLineItemsRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(checkoutId: $checkoutId, lineItemIds: $lineItemIds) {
      checkout {
        id
        webUrl
        totalTax {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
        }
        lineItems(first: 250) {
          edges {
            node {
              id
              title
              quantity
              variant {
                id
                title
                image {
                  url
                  altText
                }
                price {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
      checkoutUserErrors {
        field
        message
      }
    }
  }
`;

// Mock data for when Shopify credentials are not available
const mockProducts = [
  {
    id: 'mock-1',
    title: 'Organic Turmeric Powder',
    handle: 'organic-turmeric-powder',
    description: 'Premium organic turmeric powder sourced directly from Ghana\'s finest farms.',
    productType: 'Functional Spices',
    vendor: 'NMA Foods',
    tags: ['anti-inflammatory', 'antioxidant', 'organic'],
    images: {
      edges: [
        { node: { id: '1', url: '/images/turmeric_1.jpeg', altText: 'Organic Turmeric Powder' } },
        { node: { id: '2', url: '/images/turmeric_2.jpeg', altText: 'Turmeric Powder Close-up' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'variant-1',
            title: 'Default Title',
            price: { amount: '24.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '29.99', currencyCode: 'USD' },
            availableForSale: true,
            quantityAvailable: 47
          }
        }
      ]
    }
  },
  {
    id: 'mock-2',
    title: 'Jollof Spice Blend',
    handle: 'jollof-spice-blend',
    description: 'Authentic West African Jollof rice seasoning blend, trusted by generations.',
    productType: 'Authentic Blends',
    vendor: 'NMA Foods',
    tags: ['traditional', 'authentic', 'blend'],
    images: {
      edges: [
        { node: { id: '3', url: '/images/spice_blends_1.jpeg', altText: 'Jollof Spice Blend' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'variant-2',
            title: 'Default Title',
            price: { amount: '19.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '24.99', currencyCode: 'USD' },
            availableForSale: true,
            quantityAvailable: 32
          }
        }
      ]
    }
  },
  {
    id: 'mock-3',
    title: 'Premium Ginger Flakes',
    handle: 'premium-ginger-flakes',
    description: 'Dried ginger flakes perfect for teas, cooking, and natural wellness remedies.',
    productType: 'Functional Spices',
    vendor: 'NMA Foods',
    tags: ['digestive-health', 'natural', 'organic'],
    images: {
      edges: [
        { node: { id: '4', url: '/images/ginger_2.jpeg', altText: 'Premium Ginger Flakes' } }
      ]
    },
    variants: {
      edges: [
        {
          node: {
            id: 'variant-3',
            title: 'Default Title',
            price: { amount: '22.99', currencyCode: 'USD' },
            compareAtPrice: { amount: '27.99', currencyCode: 'USD' },
            availableForSale: true,
            quantityAvailable: 28
          }
        }
      ]
    }
  }
];

const mockCollections = [
  {
    id: 'collection-1',
    title: 'Functional Spices',
    handle: 'functional',
    description: 'Premium spices with proven health benefits',
    image: { id: '1', url: '/images/turmeric_1.jpeg', altText: 'Functional Spices' },
    products: { edges: [{ node: mockProducts[0] }, { node: mockProducts[2] }] }
  },
  {
    id: 'collection-2',
    title: 'Authentic Blends',
    handle: 'authentic',
    description: 'Traditional West African and Caribbean flavors',
    image: { id: '2', url: '/images/spice_blends_1.jpeg', altText: 'Authentic Blends' },
    products: { edges: [{ node: mockProducts[1] }] }
  },
  {
    id: 'collection-3',
    title: 'Essential Staples',
    handle: 'staples',
    description: 'Premium quality everyday spices',
    image: { id: '3', url: '/images/spice_jars_1.jpeg', altText: 'Essential Staples' },
    products: { edges: [] }
  }
];

// API functions
export const fetchProducts = async (first = 20) => {
  if (!hasShopifyCredentials) {
    console.log('Using mock data - Shopify credentials not configured');
    return mockProducts;
  }
  
  try {
    const response = await client.request(GET_PRODUCTS, {
      variables: { first }
    });
    return response.data?.products?.edges?.map(edge => edge.node) || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    console.log('Falling back to mock data');
    return mockProducts;
  }
};

export const fetchProductByHandle = async (handle: string) => {
  if (!hasShopifyCredentials) {
    console.log('Using mock data - Shopify credentials not configured');
    return mockProducts.find(p => p.handle === handle) || null;
  }
  
  try {
    const response = await client.request(GET_PRODUCT_BY_HANDLE, {
      variables: { handle }
    });
    return response.data?.productByHandle || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    console.log('Falling back to mock data');
    return mockProducts.find(p => p.handle === handle) || null;
  }
};

export const fetchCollections = async (first = 10) => {
  if (!hasShopifyCredentials) {
    console.log('Using mock data - Shopify credentials not configured');
    return mockCollections;
  }
  
  try {
    const response = await client.request(GET_COLLECTIONS, {
      variables: { first }
    });
    return response.data?.collections?.edges?.map(edge => edge.node) || [];
  } catch (error) {
    console.error('Error fetching collections:', error);
    console.log('Falling back to mock data');
    return mockCollections;
  }
};

export const createCheckout = async (lineItems: any[] = []) => {
  if (!hasShopifyCredentials) {
    console.log('Mock checkout - Shopify credentials not configured');
    return {
      id: 'mock-checkout-' + Date.now(),
      webUrl: '#',
      totalPrice: { amount: '0.00', currencyCode: 'USD' },
      lineItems: { edges: [] }
    };
  }
  
  try {
    const response = await client.request(CREATE_CHECKOUT, {
      variables: {
        input: {
          lineItems: lineItems.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
          }))
        }
      }
    });
    return response.data?.checkoutCreate?.checkout || null;
  } catch (error) {
    console.error('Error creating checkout:', error);
    return null;
  }
};

export const addToCheckout = async (checkoutId: string, lineItems: any[]) => {
  if (!hasShopifyCredentials) {
    console.log('Mock add to checkout - Shopify credentials not configured');
    return null;
  }
  
  try {
    const response = await client.request(CHECKOUT_LINE_ITEMS_ADD, {
      variables: {
        checkoutId,
        lineItems: lineItems.map(item => ({
          variantId: item.variantId,
          quantity: item.quantity
        }))
      }
    });
    return response.data?.checkoutLineItemsAdd?.checkout || null;
  } catch (error) {
    console.error('Error adding to checkout:', error);
    return null;
  }
};

export const updateCheckoutLineItems = async (checkoutId: string, lineItems: any[]) => {
  try {
    const response = await client.request(CHECKOUT_LINE_ITEMS_UPDATE, {
      variables: {
        checkoutId,
        lineItems: lineItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        }))
      }
    });
    return response.data?.checkoutLineItemsUpdate?.checkout || null;
  } catch (error) {
    console.error('Error updating checkout:', error);
    return null;
  }
};

export const removeFromCheckout = async (checkoutId: string, lineItemIds: string[]) => {
  try {
    const response = await client.request(CHECKOUT_LINE_ITEMS_REMOVE, {
      variables: {
        checkoutId,
        lineItemIds
      }
    });
    return response.data?.checkoutLineItemsRemove?.checkout || null;
  } catch (error) {
    console.error('Error removing from checkout:', error);
    return null;
  }
};

export default client;