import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, X-Client-Info, apikey, Content-Type, X-Application-Name',
};

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: string;
  priority?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const baseUrl = 'https://nmafoods.com';
    const urls: SitemapUrl[] = [];

    // Static pages with high priority
    const staticPages = [
      { path: '/', priority: '1.0', changefreq: 'weekly' },
      { path: '/shop', priority: '0.9', changefreq: 'daily' },
      { path: '/safety', priority: '0.8', changefreq: 'monthly' },
      { path: '/recipes', priority: '0.8', changefreq: 'weekly' },
      { path: '/story', priority: '0.7', changefreq: 'monthly' },
      { path: '/blog', priority: '0.8', changefreq: 'daily' },
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${baseUrl}${page.path}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: page.changefreq,
        priority: page.priority
      });
    });

    // Fetch SEO metadata for additional pages
    const { data: seoPages } = await supabase
      .from('seo_metadata_2024_10_29_14_00')
      .select('page_path, priority, change_frequency, updated_at')
      .order('priority', { ascending: false });

    if (seoPages) {
      seoPages.forEach(page => {
        // Skip if already added as static page
        if (!staticPages.find(sp => sp.path === page.page_path)) {
          urls.push({
            loc: `${baseUrl}${page.page_path}`,
            lastmod: new Date(page.updated_at).toISOString().split('T')[0],
            changefreq: page.change_frequency || 'weekly',
            priority: page.priority?.toString() || '0.5'
          });
        }
      });
    }

    // Fetch published blog articles
    const { data: articles } = await supabase
      .from('blog_articles_2024_10_29_14_00')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (articles) {
      articles.forEach(article => {
        urls.push({
          loc: `${baseUrl}/blog/${article.slug}`,
          lastmod: new Date(article.updated_at).toISOString().split('T')[0],
          changefreq: 'monthly',
          priority: '0.6'
        });
      });
    }

    // Mock Shopify products (in real implementation, fetch from Shopify API)
    const mockProducts = [
      { handle: 'organic-turmeric-powder', updated_at: new Date().toISOString() },
      { handle: 'premium-ginger-flakes', updated_at: new Date().toISOString() },
      { handle: 'jollof-spice-blend', updated_at: new Date().toISOString() },
      { handle: 'berbere-spice-mix', updated_at: new Date().toISOString() },
      { handle: 'suya-spice-blend', updated_at: new Date().toISOString() },
      { handle: 'curry-powder-blend', updated_at: new Date().toISOString() }
    ];

    mockProducts.forEach(product => {
      urls.push({
        loc: `${baseUrl}/product/${product.handle}`,
        lastmod: new Date(product.updated_at).toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.8'
      });
    });

    // Product categories
    const categories = [
      'single-spices',
      'spice-blends',
      'wellness-spices',
      'cooking-essentials'
    ];

    categories.forEach(category => {
      urls.push({
        loc: `${baseUrl}/category/${category}`,
        lastmod: new Date().toISOString().split('T')[0],
        changefreq: 'weekly',
        priority: '0.7'
      });
    });

    // Generate XML sitemap
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';

    const urlElements = urls.map(url => {
      let urlElement = `  <url>\n    <loc>${url.loc}</loc>`;
      
      if (url.lastmod) {
        urlElement += `\n    <lastmod>${url.lastmod}</lastmod>`;
      }
      
      if (url.changefreq) {
        urlElement += `\n    <changefreq>${url.changefreq}</changefreq>`;
      }
      
      if (url.priority) {
        urlElement += `\n    <priority>${url.priority}</priority>`;
      }
      
      urlElement += '\n  </url>';
      return urlElement;
    }).join('\n');

    const sitemap = `${xmlHeader}\n${urlsetOpen}\n${urlElements}\n${urlsetClose}`;

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Sitemap generation error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate sitemap',
        details: error.message 
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});