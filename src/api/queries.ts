export const PRODUCTS_QUERY = `
  query Products($first: Int = 12) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage { url altText }
          priceRange { minVariantPrice { amount currencyCode } }
        }
      }
    }
  }
`;
