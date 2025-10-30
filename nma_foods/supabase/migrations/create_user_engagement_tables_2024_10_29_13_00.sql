-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles_2024_10_29_13_00 (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT,
    full_name TEXT,
    avatar_url TEXT,
    shopify_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product reviews table
CREATE TABLE IF NOT EXISTS public.product_reviews_2024_10_29_13_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_handle TEXT NOT NULL,
    product_title TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    comment TEXT NOT NULL,
    verified_purchase BOOLEAN DEFAULT FALSE,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recipes table
CREATE TABLE IF NOT EXISTS public.recipes_2024_10_29_13_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    ingredients JSONB NOT NULL,
    instructions JSONB NOT NULL,
    prep_time INTEGER, -- in minutes
    cook_time INTEGER, -- in minutes
    servings INTEGER,
    difficulty TEXT CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
    cuisine_type TEXT,
    spices_used TEXT[], -- array of spice names/handles
    image_url TEXT,
    featured BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create recipe likes table
CREATE TABLE IF NOT EXISTS public.recipe_likes_2024_10_29_13_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    recipe_id UUID REFERENCES public.recipes_2024_10_29_13_00(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, recipe_id)
);

-- Create email subscriptions table
CREATE TABLE IF NOT EXISTS public.email_subscriptions_2024_10_29_13_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    subscribed BOOLEAN DEFAULT TRUE,
    subscription_type TEXT DEFAULT 'newsletter', -- newsletter, recipes, promotions
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user generated content table (for community posts, tips, etc.)
CREATE TABLE IF NOT EXISTS public.user_content_2024_10_29_13_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    content_type TEXT CHECK (content_type IN ('tip', 'story', 'photo', 'video')) NOT NULL,
    title TEXT,
    content TEXT NOT NULL,
    media_url TEXT,
    tags TEXT[],
    featured BOOLEAN DEFAULT FALSE,
    likes_count INTEGER DEFAULT 0,
    approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_product_reviews_product_handle ON public.product_reviews_2024_10_29_13_00(product_handle);
CREATE INDEX IF NOT EXISTS idx_product_reviews_user_id ON public.product_reviews_2024_10_29_13_00(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_user_id ON public.recipes_2024_10_29_13_00(user_id);
CREATE INDEX IF NOT EXISTS idx_recipes_featured ON public.recipes_2024_10_29_13_00(featured);
CREATE INDEX IF NOT EXISTS idx_recipes_spices_used ON public.recipes_2024_10_29_13_00 USING GIN(spices_used);
CREATE INDEX IF NOT EXISTS idx_user_content_type ON public.user_content_2024_10_29_13_00(content_type);
CREATE INDEX IF NOT EXISTS idx_user_content_approved ON public.user_content_2024_10_29_13_00(approved);

-- RLS Policies

-- User profiles: users can only see and edit their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles_2024_10_29_13_00
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles_2024_10_29_13_00
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles_2024_10_29_13_00
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Product reviews: authenticated users can read all, but only edit their own
CREATE POLICY "Anyone can view reviews" ON public.product_reviews_2024_10_29_13_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create reviews" ON public.product_reviews_2024_10_29_13_00
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON public.product_reviews_2024_10_29_13_00
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews" ON public.product_reviews_2024_10_29_13_00
    FOR DELETE USING (auth.uid() = user_id);

-- Recipes: authenticated users can read all, but only edit their own
CREATE POLICY "Anyone can view recipes" ON public.recipes_2024_10_29_13_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create recipes" ON public.recipes_2024_10_29_13_00
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can update own recipes" ON public.recipes_2024_10_29_13_00
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own recipes" ON public.recipes_2024_10_29_13_00
    FOR DELETE USING (auth.uid() = user_id);

-- Recipe likes: authenticated users can manage their own likes
CREATE POLICY "Anyone can view recipe likes" ON public.recipe_likes_2024_10_29_13_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can like recipes" ON public.recipe_likes_2024_10_29_13_00
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can remove own likes" ON public.recipe_likes_2024_10_29_13_00
    FOR DELETE USING (auth.uid() = user_id);

-- Email subscriptions: users can manage their own subscriptions
CREATE POLICY "Users can view own subscriptions" ON public.email_subscriptions_2024_10_29_13_00
    FOR SELECT USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can subscribe" ON public.email_subscriptions_2024_10_29_13_00
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own subscriptions" ON public.email_subscriptions_2024_10_29_13_00
    FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

-- User content: authenticated users can read approved content, manage their own
CREATE POLICY "Anyone can view approved content" ON public.user_content_2024_10_29_13_00
    FOR SELECT USING (approved = true OR auth.uid() = user_id);

CREATE POLICY "Authenticated users can create content" ON public.user_content_2024_10_29_13_00
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = user_id);

CREATE POLICY "Users can update own content" ON public.user_content_2024_10_29_13_00
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own content" ON public.user_content_2024_10_29_13_00
    FOR DELETE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipes_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recipe_likes_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.email_subscriptions_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_content_2024_10_29_13_00 ENABLE ROW LEVEL SECURITY;