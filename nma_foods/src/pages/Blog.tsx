import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useContentAnalytics } from '@/hooks/useAnalytics';
import { supabase } from '@/integrations/supabase/client';
import { Search, Calendar, Clock, User, ArrowRight, ArrowLeft, Tag, Eye, Loader2 } from 'lucide-react';

interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image_url: string;
  category: string;
  tags: string[];
  published_at: string;
  views_count: number;
  reading_time: number;
  user_profiles_2024_10_29_13_00?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface BlogProps {
  category?: string;
}

const Blog: React.FC<BlogProps> = ({ category }) => {
  const { slug } = useParams();
  const { trackArticleView, trackSearchQuery } = useContentAnalytics();
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [featuredArticles, setFeaturedArticles] = useState<BlogArticle[]>([]);
  const [currentArticle, setCurrentArticle] = useState<BlogArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(category || 'all');

  const categories = [
    'All',
    'Health & Wellness',
    'Sourcing & Sustainability',
    'Recipes & Cooking',
    'Traditional Medicine',
    'Nutrition Science'
  ];

  useEffect(() => {
    if (slug) {
      fetchArticleBySlug(slug);
    } else {
      fetchArticles();
      fetchFeaturedArticles();
    }
  }, [slug, selectedCategory, searchTerm]);

  const fetchArticles = async () => {
    try {
      let query = supabase
        .from('blog_articles_2024_10_29_14_00')
        .select('*')
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      if (searchTerm) {
        query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`);
      }

      const { data, error } = await query.limit(12);

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeaturedArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_articles_2024_10_29_14_00')
        .select('*')
        .eq('status', 'published')
        .eq('featured', true)
        .order('published_at', { ascending: false })
        .limit(3);

      if (error) throw error;
      setFeaturedArticles(data || []);
    } catch (error) {
      console.error('Error fetching featured articles:', error);
    }
  };

  const fetchArticleBySlug = async (articleSlug: string) => {
    try {
      const { data, error } = await supabase
        .from('blog_articles_2024_10_29_14_00')
        .select('*')
        .eq('slug', articleSlug)
        .eq('status', 'published')
        .single();

      if (error) throw error;
      setCurrentArticle(data);

      // Track article view
      trackArticleView(data.id, data.title, data.category);

      // Increment view count
      await supabase
        .from('blog_articles_2024_10_29_14_00')
        .update({ views_count: (data.views_count || 0) + 1 })
        .eq('id', data.id);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="flex justify-center items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Single article view
  if (slug && currentArticle) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Article Header */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-6">
                <Link to="/blog" className="text-primary hover:underline flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Link>
              </div>
              
              <div className="space-y-4">
                <Badge className="premium-gradient text-white">{currentArticle.category}</Badge>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {currentArticle.title}
                </h1>
                <p className="text-xl text-muted-foreground">
                  {currentArticle.excerpt}
                </p>
                
                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentArticle.user_profiles_2024_10_29_13_00?.avatar_url} />
                      <AvatarFallback>
                        {currentArticle.user_profiles_2024_10_29_13_00?.full_name?.charAt(0) || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <span>{currentArticle.user_profiles_2024_10_29_13_00?.full_name || 'NMA Foods Team'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(currentArticle.published_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {currentArticle.reading_time} min read
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {currentArticle.views_count} views
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              {currentArticle.featured_image_url && (
                <div className="aspect-video rounded-2xl overflow-hidden mb-8">
                  <img
                    src={currentArticle.featured_image_url}
                    alt={currentArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: currentArticle.content }}
              />
              
              {currentArticle.tags.length > 0 && (
                <div className="mt-8 pt-8 border-t">
                  <h3 className="font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentArticle.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        <Tag className="h-3 w-3 mr-1" />
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20">
        <div className="absolute inset-0 african-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="premium-gradient text-white border-0 mb-6">
              Knowledge Hub
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
              Spice <span className="text-gradient">Wisdom</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8">
              Discover the science, stories, and traditions behind Ghana's finest spices
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/90 backdrop-blur border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                Featured <span className="text-gradient">Articles</span>
              </h2>
              <p className="text-xl text-muted-foreground">
                Our most popular and insightful content
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                  <CardHeader className="p-0">
                    {article.featured_image_url && (
                      <div className="aspect-video rounded-t-lg overflow-hidden">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge className="premium-gradient text-white">{article.category}</Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          {article.reading_time} min
                        </div>
                      </div>
                      
                      <div>
                        <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                          <Link to={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-base">
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={article.user_profiles_2024_10_29_13_00?.avatar_url} />
                            <AvatarFallback className="text-xs">
                              {article.user_profiles_2024_10_29_13_00?.full_name?.charAt(0) || 'A'}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">
                            {formatDate(article.published_at)}
                          </span>
                        </div>
                        
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${article.slug}`}>
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat.toLowerCase() || (cat === 'All' && selectedCategory === 'all') ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(cat === 'All' ? 'all' : cat)}
                className={selectedCategory === cat.toLowerCase() || (cat === 'All' && selectedCategory === 'all') ? 'premium-gradient text-white' : ''}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article) => (
                <Card key={article.id} className="group hover:shadow-card transition-all duration-300">
                  <CardHeader className="p-0">
                    {article.featured_image_url && (
                      <div className="aspect-video rounded-t-lg overflow-hidden">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">{article.category}</Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {article.reading_time} min
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {article.views_count}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                          <Link to={`/blog/${article.slug}`}>
                            {article.title}
                          </Link>
                        </CardTitle>
                        <CardDescription>
                          {article.excerpt}
                        </CardDescription>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(article.published_at)}
                        </span>
                        
                        <Button variant="ghost" size="sm" asChild>
                          <Link to={`/blog/${article.slug}`}>
                            Read More
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category filter.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;