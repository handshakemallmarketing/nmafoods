# NMA Foods - Shopify Integration

This project integrates the NMA Foods website with Shopify for complete e-commerce functionality.

## 🛍️ Features Implemented

### ✅ Complete E-commerce Integration
- **Product Catalog**: Real-time product fetching from Shopify
- **Shopping Cart**: Full cart management with persistent storage
- **Checkout Process**: Secure Shopify checkout integration
- **Inventory Management**: Real-time stock levels and availability
- **Product Variants**: Support for multiple product options
- **Pricing**: Dynamic pricing with compare-at prices and discounts

### 🔧 Technical Implementation

#### Shopify Storefront API Integration
- Uses `@shopify/storefront-api-client` for GraphQL API calls
- Real-time product data synchronization
- Optimized queries for performance

#### Cart Management
- React Context for global cart state
- Persistent cart storage in localStorage
- Real-time cart updates with Shopify checkout
- Add/remove/update cart items functionality

#### Components Created
- `CartSheet`: Sliding cart panel with full functionality
- `useShopify` hooks: Custom hooks for product data fetching
- `CartContext`: Global cart state management
- Updated product pages to use real Shopify data

## 🚀 Setup Instructions

### 1. Shopify Store Setup

1. **Create/Access Shopify Store**
   - Go to https://www.shopify.com
   - Create a new store or access existing one

2. **Enable Storefront API**
   - In Shopify Admin, go to **Apps → Manage private apps**
   - Click **Create private app**
   - Fill in app details

3. **Configure API Permissions**
   - Enable **Storefront API access**
   - Select required permissions:
     - ✅ Read products, variants, and collections
     - ✅ Read customer tags and customer details
     - ✅ Modify checkouts
     - ✅ Read orders

4. **Get API Credentials**
   - Copy the **Storefront access token**
   - Note your store domain (e.g., `your-store.myshopify.com`)

### 2. Environment Configuration

1. **Update Environment Variables**
   ```bash
   # In .env file
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
   ```

2. **Restart Development Server**
   ```bash
   npm run dev
   ```

### 3. Product Setup in Shopify

#### Recommended Product Structure
```
Collections:
├── Functional Spices
│   ├── Organic Turmeric Powder
│   ├── Premium Ginger Flakes
│   └── Golden Milk Blend
├── Authentic Blends
│   ├── Jollof Spice Blend
│   ├── Shito Seasoning
│   └── Caribbean Curry Blend
└── Essential Staples
    ├── Premium Black Pepper
    ├── Ceylon Cinnamon
    └── Whole Cumin Seeds
```

#### Product Tags for Filtering
- Health benefits: `anti-inflammatory`, `antioxidant`, `digestive-health`
- Product types: `powder`, `flakes`, `whole`, `blend`
- Categories: `functional`, `authentic`, `staples`

## 📱 User Experience

### Shopping Flow
1. **Browse Products**: View products from Shopify catalog
2. **Product Details**: Detailed product information with variants
3. **Add to Cart**: Add products with quantity selection
4. **Cart Management**: View, update, and remove cart items
5. **Checkout**: Redirect to secure Shopify checkout
6. **Order Completion**: Shopify handles payment and fulfillment

### Cart Features
- **Persistent Storage**: Cart persists across browser sessions
- **Real-time Updates**: Instant cart updates and totals
- **Quantity Management**: Easy quantity adjustment
- **Variant Support**: Handle different product options
- **Subscription Options**: 15% discount messaging

## 🔒 Security & Performance

### Security
- **API Keys**: Storefront API tokens are public-safe
- **Checkout**: Secure Shopify-hosted checkout process
- **Data Validation**: Input validation and error handling

### Performance
- **Optimized Queries**: Efficient GraphQL queries
- **Lazy Loading**: Products loaded on demand
- **Caching**: Browser caching for better performance
- **Error Handling**: Graceful error handling and fallbacks

## 🛠️ Development

### Key Files
```
src/
├── lib/shopify.ts              # Shopify API client and queries
├── contexts/CartContext.tsx    # Cart state management
├── hooks/useShopify.ts         # Custom hooks for data fetching
├── components/CartSheet.tsx    # Shopping cart component
└── pages/
    ├── Shop.tsx               # Updated with real data
    ├── ProductDetail.tsx      # Updated with real data
    └── ProductCategory.tsx    # Updated with real data
```

### Available Hooks
```typescript
// Fetch products
const { products, loading, error } = useProducts(20);

// Fetch single product
const { product, loading, error } = useProduct('product-handle');

// Fetch collections
const { collections, loading, error } = useCollections(10);

// Cart management
const { 
  items, 
  totalQuantity, 
  totalPrice, 
  addToCart, 
  updateQuantity, 
  removeFromCart 
} = useCart();
```

### Helper Functions
```typescript
// Format price
formatPrice(variant.price) // "$24.99"

// Get product images
getProductImages(product) // Array of image objects

// Get product variants
getProductVariants(product) // Array of variant objects

// Check availability
isProductAvailable(product) // boolean
```

## 🎯 Next Steps

### Recommended Enhancements
1. **Customer Accounts**: Implement Shopify customer login
2. **Order Tracking**: Add order status and tracking
3. **Wishlist**: Save favorite products
4. **Product Reviews**: Integrate review system
5. **Search & Filters**: Advanced product filtering
6. **Recommendations**: Related products and upsells

### Analytics Integration
- Google Analytics 4 for e-commerce tracking
- Shopify Analytics for sales insights
- Conversion tracking and optimization

## 🐛 Troubleshooting

### Common Issues

1. **Products Not Loading**
   - Check environment variables are set correctly
   - Verify Storefront API permissions
   - Check network requests in browser dev tools

2. **Cart Not Working**
   - Ensure checkout creation permissions are enabled
   - Check localStorage for cart data
   - Verify API token has checkout modification rights

3. **Images Not Displaying**
   - Check product images are uploaded in Shopify
   - Verify image URLs in API responses
   - Check for CORS issues

### Debug Mode
```typescript
// Enable debug logging
localStorage.setItem('debug', 'shopify:*');
```

## 📞 Support

For technical support or questions about the Shopify integration:
1. Check the browser console for error messages
2. Verify Shopify API credentials and permissions
3. Test API calls directly using GraphQL playground
4. Review Shopify Storefront API documentation

---

**Note**: This integration uses Shopify's Storefront API which is designed for headless commerce implementations. All sensitive operations (payments, order processing) are handled securely by Shopify's infrastructure.