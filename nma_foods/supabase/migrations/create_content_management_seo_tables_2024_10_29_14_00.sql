-- Create blog articles table
CREATE TABLE IF NOT EXISTS public.blog_articles_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image_url TEXT,
    author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    category TEXT NOT NULL,
    tags TEXT[],
    status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
    featured BOOLEAN DEFAULT FALSE,
    seo_title TEXT,
    seo_description TEXT,
    seo_keywords TEXT[],
    published_at TIMESTAMP WITH TIME ZONE,
    views_count INTEGER DEFAULT 0,
    reading_time INTEGER, -- in minutes
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create product nutritional information table
CREATE TABLE IF NOT EXISTS public.product_nutrition_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_handle TEXT NOT NULL UNIQUE,
    serving_size TEXT,
    calories INTEGER,
    total_fat TEXT,
    saturated_fat TEXT,
    trans_fat TEXT,
    cholesterol TEXT,
    sodium TEXT,
    total_carbs TEXT,
    dietary_fiber TEXT,
    total_sugars TEXT,
    protein TEXT,
    vitamin_a TEXT,
    vitamin_c TEXT,
    calcium TEXT,
    iron TEXT,
    additional_nutrients JSONB DEFAULT '{}',
    allergen_info TEXT[],
    storage_instructions TEXT,
    shelf_life TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ingredient sourcing stories table
CREATE TABLE IF NOT EXISTS public.ingredient_sourcing_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_handle TEXT NOT NULL,
    ingredient_name TEXT NOT NULL,
    origin_country TEXT,
    origin_region TEXT,
    farm_name TEXT,
    farmer_story TEXT,
    harvesting_method TEXT,
    processing_method TEXT,
    quality_certifications TEXT[],
    sustainability_practices TEXT[],
    images JSONB DEFAULT '[]',
    harvest_season TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create usage guides table
CREATE TABLE IF NOT EXISTS public.usage_guides_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    product_handle TEXT NOT NULL,
    guide_type TEXT CHECK (guide_type IN ('cooking', 'wellness', 'storage', 'preparation')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    instructions JSONB NOT NULL, -- array of step objects
    tips TEXT[],
    health_benefits TEXT[],
    precautions TEXT[],
    related_recipes TEXT[],
    difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
    prep_time INTEGER, -- in minutes
    images JSONB DEFAULT '[]',
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create health benefits research table
CREATE TABLE IF NOT EXISTS public.health_benefits_research_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    ingredient_name TEXT NOT NULL,
    benefit_category TEXT NOT NULL,
    benefit_title TEXT NOT NULL,
    scientific_description TEXT NOT NULL,
    research_studies JSONB DEFAULT '[]', -- array of study objects
    dosage_recommendations TEXT,
    contraindications TEXT[],
    evidence_level TEXT CHECK (evidence_level IN ('preliminary', 'moderate', 'strong', 'conclusive')),
    last_reviewed DATE,
    sources JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create SEO metadata table
CREATE TABLE IF NOT EXISTS public.seo_metadata_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL UNIQUE,
    page_type TEXT CHECK (page_type IN ('product', 'category', 'blog', 'static', 'homepage')) NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    keywords TEXT[],
    og_title TEXT,
    og_description TEXT,
    og_image TEXT,
    twitter_title TEXT,
    twitter_description TEXT,
    twitter_image TEXT,
    canonical_url TEXT,
    schema_markup JSONB DEFAULT '{}',
    robots_meta TEXT DEFAULT 'index,follow',
    priority DECIMAL(2,1) DEFAULT 0.5,
    change_frequency TEXT CHECK (change_frequency IN ('always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never')) DEFAULT 'weekly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create local SEO information table
CREATE TABLE IF NOT EXISTS public.local_seo_2024_10_29_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    business_name TEXT NOT NULL,
    address TEXT,
    city TEXT,
    region TEXT,
    country TEXT,
    postal_code TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    business_hours JSONB DEFAULT '{}',
    business_type TEXT,
    description TEXT,
    keywords TEXT[],
    service_areas TEXT[],
    languages TEXT[],
    social_profiles JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_articles_slug ON public.blog_articles_2024_10_29_14_00(slug);
CREATE INDEX IF NOT EXISTS idx_blog_articles_status ON public.blog_articles_2024_10_29_14_00(status);
CREATE INDEX IF NOT EXISTS idx_blog_articles_category ON public.blog_articles_2024_10_29_14_00(category);
CREATE INDEX IF NOT EXISTS idx_blog_articles_featured ON public.blog_articles_2024_10_29_14_00(featured);
CREATE INDEX IF NOT EXISTS idx_blog_articles_published_at ON public.blog_articles_2024_10_29_14_00(published_at);
CREATE INDEX IF NOT EXISTS idx_product_nutrition_handle ON public.product_nutrition_2024_10_29_14_00(product_handle);
CREATE INDEX IF NOT EXISTS idx_ingredient_sourcing_handle ON public.ingredient_sourcing_2024_10_29_14_00(product_handle);
CREATE INDEX IF NOT EXISTS idx_usage_guides_handle ON public.usage_guides_2024_10_29_14_00(product_handle);
CREATE INDEX IF NOT EXISTS idx_usage_guides_type ON public.usage_guides_2024_10_29_14_00(guide_type);
CREATE INDEX IF NOT EXISTS idx_health_benefits_ingredient ON public.health_benefits_research_2024_10_29_14_00(ingredient_name);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_path ON public.seo_metadata_2024_10_29_14_00(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_metadata_type ON public.seo_metadata_2024_10_29_14_00(page_type);

-- RLS Policies

-- Blog articles: public can read published, authenticated users can manage their own
CREATE POLICY "Anyone can view published articles" ON public.blog_articles_2024_10_29_14_00
    FOR SELECT USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Authenticated users can create articles" ON public.blog_articles_2024_10_29_14_00
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

CREATE POLICY "Authors can update own articles" ON public.blog_articles_2024_10_29_14_00
    FOR UPDATE USING (auth.uid() = author_id);

CREATE POLICY "Authors can delete own articles" ON public.blog_articles_2024_10_29_14_00
    FOR DELETE USING (auth.uid() = author_id);

-- Product nutrition: public read access
CREATE POLICY "Anyone can view nutrition info" ON public.product_nutrition_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage nutrition info" ON public.product_nutrition_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Ingredient sourcing: public read access
CREATE POLICY "Anyone can view sourcing info" ON public.ingredient_sourcing_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage sourcing info" ON public.ingredient_sourcing_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Usage guides: public read access
CREATE POLICY "Anyone can view usage guides" ON public.usage_guides_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage usage guides" ON public.usage_guides_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Health benefits research: public read access
CREATE POLICY "Anyone can view health benefits" ON public.health_benefits_research_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage health benefits" ON public.health_benefits_research_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- SEO metadata: public read access
CREATE POLICY "Anyone can view SEO metadata" ON public.seo_metadata_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage SEO metadata" ON public.seo_metadata_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Local SEO: public read access
CREATE POLICY "Anyone can view local SEO info" ON public.local_seo_2024_10_29_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage local SEO info" ON public.local_seo_2024_10_29_14_00
    FOR ALL WITH CHECK (auth.role() = 'authenticated');

-- Enable RLS on all tables
ALTER TABLE public.blog_articles_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_nutrition_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ingredient_sourcing_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_guides_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.health_benefits_research_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_metadata_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.local_seo_2024_10_29_14_00 ENABLE ROW LEVEL SECURITY;