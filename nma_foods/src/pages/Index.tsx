import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOComponent } from "@/components/SEOComponent";
import { ArrowRight, Shield, Award, Leaf, Heart, Star, Users, CheckCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEOComponent 
        pagePath="/"
        fallbackTitle="NMA Foods - Premium Ghanaian Spices | Organic Turmeric, Ginger & Traditional Blends"
        fallbackDescription="Discover premium organic spices from Ghana. FDA-compliant turmeric, ginger, and authentic West African spice blends. Free shipping on orders over $50."
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient">
        <div className="absolute inset-0 african-pattern opacity-30"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="premium-gradient text-white border-0">
                  Ghana's Gold Standard Spices
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Purity Sealed at the{" "}
                  <span className="text-gradient">Source</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Premium Ghanaian Spices with Guaranteed FDA Compliance. 
                  Discover vibrant, authentic, and organic spices that fuel health and culinary exploration.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="premium-gradient text-white hover:shadow-glow transition-all">
                  <Link to="/shop/functional">
                    Shop Wellness Essentials
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link to="/story">Learn Our Story</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                <div className="text-center">
                  <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">FDA Licensed</p>
                </div>
                <div className="text-center">
                  <Leaf className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Organic Certified</p>
                </div>
                <div className="text-center">
                  <Award className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Treated & Sealed</p>
                </div>
                <div className="text-center">
                  <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                  <p className="text-sm font-medium">Ethically Sourced</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/turmeric_1.jpeg"
                  alt="Premium Turmeric Powder"
                  className="rounded-2xl shadow-elegant w-full max-w-md mx-auto"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-4 shadow-card">
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary fill-current" />
                    <span className="font-semibold">4.9/5</span>
                    <span className="text-sm text-muted-foreground">(2,847 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 -left-8 w-32 h-32 rounded-full premium-gradient opacity-20 blur-xl"></div>
              <div className="absolute -bottom-8 right-8 w-24 h-24 rounded-full bg-accent opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Premium Spices for <span className="text-gradient">Every Need</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From functional powerhouses to authentic traditional blends, 
              discover the perfect spices for your wellness journey and culinary adventures.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Functional Spices */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-0 card-gradient">
              <CardHeader className="pb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/images/ginger_2.jpeg"
                    alt="Turmeric and Ginger"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-2xl">Functional Powerhouses</CardTitle>
                <CardDescription className="text-base">
                  Turmeric & Ginger: Fuel Your Health
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Turmeric's anti-inflammatory, antioxidant, and immunity-boosting properties 
                  drive market growth. Our premium organic powders deliver maximum potency.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Anti-inflammatory</Badge>
                  <Badge variant="secondary">Antioxidant</Badge>
                  <Badge variant="secondary">Immunity Boost</Badge>
                </div>
                <Button asChild className="w-full premium-gradient text-white">
                  <Link to="/shop/functional">
                    Explore Functional Spices
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Authentic Blends */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-0 card-gradient">
              <CardHeader className="pb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/images/spice_blends_1.jpeg"
                    alt="Jollof Spice Blend"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-2xl">Authentic Flavor</CardTitle>
                <CardDescription className="text-base">
                  Zero Compromise. Traditional Blends Trusted Globally
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Our flavors are proven, already on the shelf in African and Caribbean markets, 
                  bringing authentic cross-cultural flavors to your kitchen.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Jollof Blend</Badge>
                  <Badge variant="secondary">Shito Seasoning</Badge>
                  <Badge variant="secondary">Traditional</Badge>
                </div>
                <Button asChild className="w-full premium-gradient text-white">
                  <Link to="/shop/authentic">
                    Discover Authentic Blends
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Premium Staples */}
            <Card className="group hover:shadow-elegant transition-all duration-300 border-0 card-gradient md:col-span-2 lg:col-span-1">
              <CardHeader className="pb-4">
                <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                  <img
                    src="/images/spice_jars_1.jpeg"
                    alt="Premium Spice Collection"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardTitle className="text-2xl">Essential Staples</CardTitle>
                <CardDescription className="text-base">
                  Premium Quality. Everyday Excellence
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  From Black Pepper to Cinnamon, our essential spices maintain product breadth 
                  while ensuring the highest quality standards.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Black Pepper</Badge>
                  <Badge variant="secondary">Cinnamon</Badge>
                  <Badge variant="secondary">Cumin</Badge>
                </div>
                <Button asChild className="w-full premium-gradient text-white">
                  <Link to="/shop/staples">
                    Shop Essential Staples
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof & Community */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-gradient">Thousands</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Join our community of health-conscious food lovers and culinary explorers
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <p className="text-muted-foreground">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">4.9★</div>
              <p className="text-muted-foreground">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <p className="text-muted-foreground">FDA Compliant</p>
            </div>
          </div>

          {/* Recipe Showcase */}
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Recipe Showcase & Community</h3>
                <p className="text-muted-foreground mb-6">
                  Discover authentic recipes, share your culinary creations, and connect with 
                  fellow spice enthusiasts. From traditional Jollof rice to modern fusion dishes.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>User-submitted recipes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Health benefit guides</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span>Cooking technique tutorials</span>
                  </div>
                </div>
                <Button asChild className="premium-gradient text-white">
                  <Link to="/recipes">
                    Explore Recipes & Wellness
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative">
                <img
                  src="/images/spice_blends_3.jpeg"
                  alt="Recipe showcase"
                  className="rounded-xl w-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="font-semibold">Authentic Jollof Rice</h4>
                  <p className="text-sm opacity-90">With NMA Jollof Blend</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;