-- Add proper foreign key relationships for blog articles
ALTER TABLE public.blog_articles_2024_10_29_14_00 
ADD CONSTRAINT fk_blog_articles_author 
FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add proper foreign key relationships for recipes
ALTER TABLE public.recipes_2024_10_29_13_00 
ADD CONSTRAINT fk_recipes_author 
FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- Add proper foreign key relationships for user content
ALTER TABLE public.user_content_2024_10_29_13_00 
ADD CONSTRAINT fk_user_content_author 
FOREIGN KEY (author_id) REFERENCES auth.users(id) ON DELETE SET NULL;