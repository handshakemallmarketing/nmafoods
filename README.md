# NMA Foods - Complete Website Package

## 🌟 Overview

This is the complete NMA Foods website - a premium Ghanaian spices e-commerce platform with comprehensive features including user authentication, content management, analytics, and performance monitoring.

**Live Demo:** https://rgrzbtrait.skywork.website

## 📦 Package Contents

This package contains the complete source code for:

### ✅ Core Features Implemented
- **E-commerce Integration** - Full Shopify storefront with cart and checkout
- **User Authentication** - Complete Supabase auth system with profiles
- **Content Management** - Blog platform with SEO optimization
- **Community Features** - Recipe sharing, reviews, user-generated content
- **Email Marketing** - Newsletter system with Resend integration
- **Analytics & Performance** - Google Analytics 4 + custom tracking
- **SEO Optimization** - Dynamic meta tags, structured data, sitemap
- **Mobile Responsive** - Optimized for all devices

### 🏗️ Technical Stack
- **Frontend:** React 18 + TypeScript + Vite + Tailwind CSS
- **Backend:** Supabase (Database + Auth + Edge Functions)
- **E-commerce:** Shopify Storefront API
- **Email:** Resend API
- **Analytics:** Google Analytics 4 + Custom tracking
- **Deployment:** Ready for Vercel, Netlify, or any static host

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- Supabase account (free tier available)
- Shopify store (optional for testing)

### Installation Steps

1. **Extract the package:**
   ```bash
   tar -xzf nma_foods_complete_website.tar.gz
   cd nma_foods
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

4. **Configure Environment Variables:**
   Edit `.env` file with your credentials:
   ```bash
   # Supabase Configuration (Required)
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Shopify Configuration (Optional for testing)
   VITE_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token

   # Analytics Configuration (Optional)
   VITE_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
   VITE_GTM_ID=GTM-XXXXXXX
   VITE_GOOGLE_SITE_VERIFICATION=your_verification_code

   # Email Marketing (Optional)
   # Configure in Supabase Edge Functions
   ```

5. **Database Setup:**
   The SQL migration files are included in `supabase/migrations/`. 
   Run them in your Supabase dashboard or use the Supabase CLI:
   ```bash
   # If you have Supabase CLI installed
   supabase db reset
   ```

6. **Start Development Server:**
   ```bash
   npm run dev
   ```

7. **Build for Production:**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
nma_foods/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── ui/               # Shadcn/ui components
│   │   ├── Header.tsx        # Main navigation
│   │   ├── Footer.tsx        # Site footer
│   │   ├── GoogleAnalytics.tsx # GA4 integration
│   │   ├── SEOComponent.tsx  # Dynamic SEO
│   │   ├── AnalyticsDashboard.tsx # Analytics dashboard
│   │   ├── ProductReviews.tsx # Review system
│   │   ├── RecipeSharing.tsx # Recipe platform
│   │   ├── UserGeneratedContent.tsx # UGC platform
│   │   ├── NewsletterSignup.tsx # Email marketing
│   │   └── EnhancedProductInfo.tsx # Product details
│   ├── contexts/             # React contexts
│   │   ├── AuthContext.tsx   # Authentication
│   │   └── CartContext.tsx   # Shopping cart
│   ├── hooks/                # Custom React hooks
│   │   ├── useShopify.ts     # Shopify integration
│   │   └── useAnalytics.ts   # Analytics tracking
│   ├── integrations/         # Third-party integrations
│   │   └── supabase/         # Supabase client
│   ├── lib/                  # Utility libraries
│   │   ├── analytics.ts      # Analytics system
│   │   ├── performance.ts    # Performance monitoring
│   │   └── utils.ts          # Helper functions
│   ├── pages/                # Page components
│   │   ├── Index.tsx         # Homepage
│   │   ├── Shop.tsx          # Product catalog
│   │   ├── ProductDetail.tsx # Product pages
│   │   ├── Blog.tsx          # Blog platform
│   │   ├── Recipes.tsx       # Recipe hub
│   │   ├── Safety.tsx        # Compliance page
│   │   └── Story.tsx         # About page
│   └── styles/               # CSS styles
├── supabase/                 # Supabase configuration
│   ├── migrations/           # Database migrations
│   └── edge_function/        # Serverless functions
├── package.json              # Dependencies
├── tailwind.config.ts        # Tailwind configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🔧 Configuration Guide

### Supabase Setup (Required)

1. **Create Supabase Project:**
   - Go to https://supabase.com
   - Create new project
   - Get your URL and anon key

2. **Run Database Migrations:**
   - Copy SQL from `supabase/migrations/` folder
   - Run in Supabase SQL editor
   - Tables will be created automatically

3. **Configure Authentication:**
   - Enable email authentication in Supabase
   - Set up email templates (optional)

### Shopify Setup (Optional)

1. **Create Shopify Store:**
   - Set up products and collections
   - Enable Storefront API
   - Get storefront access token

2. **Configure Products:**
   - Add product images and descriptions
   - Set up collections/categories
   - Configure inventory

### Analytics Setup (Optional)

1. **Google Analytics 4:**
   - Create GA4 property
   - Get measurement ID
   - Enable enhanced e-commerce

2. **Google Search Console:**
   - Add property
   - Get verification code
   - Submit sitemap

### Email Marketing Setup (Optional)

1. **Resend API:**
   - Create Resend account
   - Get API key
   - Configure in Supabase secrets

## 🎯 Key Features

### E-commerce Features
- **Product Catalog** - Dynamic product listing from Shopify
- **Shopping Cart** - Persistent cart with local storage
- **Checkout Process** - Secure Shopify checkout integration
- **Product Reviews** - User rating and review system
- **Inventory Management** - Real-time stock levels

### Content Management
- **Blog Platform** - Full-featured blog with categories
- **Recipe Sharing** - Community recipe submission
- **User Content** - Tips, stories, photos, videos
- **SEO Optimization** - Dynamic meta tags and structured data

### User Features
- **Authentication** - Email-based registration and login
- **User Profiles** - Profile management and preferences
- **Community Interaction** - Reviews, recipes, content sharing
- **Email Subscriptions** - Newsletter and marketing emails

### Analytics & Performance
- **Google Analytics 4** - Enhanced e-commerce tracking
- **Custom Analytics** - Detailed user behavior tracking
- **Performance Monitoring** - Core Web Vitals tracking
- **SEO Tracking** - Search performance monitoring

## 🚀 Deployment Options

### Vercel (Recommended)
1. Connect GitHub repository
2. Set environment variables
3. Deploy automatically

### Netlify
1. Drag and drop `dist` folder
2. Configure environment variables
3. Set up continuous deployment

### Traditional Hosting
1. Build the project: `npm run build`
2. Upload `dist` folder contents
3. Configure server for SPA routing

## 📊 Database Schema

The package includes complete database schema with:

### Core Tables
- `user_profiles_2024_10_29_13_00` - User profile management
- `product_reviews_2024_10_29_13_00` - Product review system
- `recipes_2024_10_29_13_00` - Recipe sharing platform
- `user_content_2024_10_29_13_00` - User-generated content
- `email_subscriptions_2024_10_29_13_00` - Email marketing

### Content Management
- `blog_articles_2024_10_29_14_00` - Blog platform
- `product_nutrition_2024_10_29_14_00` - Nutritional information
- `ingredient_sourcing_2024_10_29_14_00` - Sourcing stories
- `usage_guides_2024_10_29_14_00` - Product usage guides
- `health_benefits_research_2024_10_29_14_00` - Health research

### Analytics & SEO
- `analytics_events_2024_10_29_15_00` - User event tracking
- `conversion_events_2024_10_29_15_00` - E-commerce conversions
- `performance_metrics_2024_10_29_15_00` - Performance monitoring
- `seo_metadata_2024_10_29_14_00` - SEO optimization
- `user_sessions_2024_10_29_15_00` - Session management

## 🔒 Security Features

- **Row Level Security (RLS)** - Comprehensive data protection
- **User Data Isolation** - Users can only access their own data
- **Secure Authentication** - Supabase auth with email verification
- **API Security** - Protected endpoints and rate limiting
- **Privacy Compliance** - GDPR-ready with IP anonymization

## 🎨 Customization

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - High-quality component library
- **Custom Design System** - Consistent colors and typography
- **Responsive Design** - Mobile-first approach

### Content
- **Dynamic Content** - All content stored in database
- **SEO Optimization** - Automatic meta tag generation
- **Multi-language Ready** - Prepared for internationalization

## 📞 Support & Documentation

### Included Documentation
- `ANALYTICS_IMPLEMENTATION.md` - Complete analytics guide
- `SHOPIFY_INTEGRATION.md` - E-commerce setup guide
- Component documentation in source files

### Getting Help
- Check the source code comments
- Review the migration files for database schema
- Test with the live demo: https://rgrzbtrait.skywork.website

## 📄 License

This project is provided as-is for educational and commercial use. Please ensure you have proper licenses for all third-party services used (Shopify, Supabase, etc.).

## 🎉 What's Included

This complete package gives you:

✅ **Production-Ready Code** - Fully tested and optimized
✅ **Complete Database Schema** - All tables and relationships
✅ **Third-Party Integrations** - Shopify, Supabase, Analytics
✅ **Responsive Design** - Works on all devices
✅ **SEO Optimized** - Ready for search engines
✅ **Analytics Ready** - Comprehensive tracking system
✅ **Security Implemented** - Production-grade security
✅ **Documentation** - Complete setup and usage guides

## 🚀 Ready to Launch

This website is production-ready and includes everything needed for a successful e-commerce platform. Simply configure your environment variables, set up your services, and deploy!

---

**Built with ❤️ for NMA Foods - Ghana's Gold Standard Spices**