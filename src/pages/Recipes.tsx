import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Search, Clock, Users, ChefHat, Heart, Star, ArrowRight, BookOpen } from "lucide-react";

const Recipes = () => {
  const featuredRecipes = [
    {
      id: 1,
      title: "Authentic Ghanaian Jollof Rice",
      description: "Traditional West African rice dish with our signature Jollof spice blend",
      image: "/images/spice_blends_3.jpeg",
      cookTime: "45 mins",
      servings: 6,
      difficulty: "Medium",
      spices: ["Jollof Spice Blend", "Bay Leaves", "Ginger"],
      rating: 4.9,
      reviews: 234,
      category: "Traditional",
      healthBenefits: ["Anti-inflammatory", "Digestive Health"]
    },
    {
      id: 2,
      title: "Golden Milk Turmeric Latte",
      description: "Warming wellness drink with organic turmeric and healing spices",
      image: "/images/turmeric_1.jpeg",
      cookTime: "10 mins",
      servings: 2,
      difficulty: "Easy",
      spices: ["Organic Turmeric", "Ginger", "Cinnamon"],
      rating: 4.8,
      reviews: 189,
      category: "Wellness",
      healthBenefits: ["Anti-inflammatory", "Immunity Boost"]
    },
    {
      id: 3,
      title: "Spiced Ginger Tea Blend",
      description: "Soothing digestive tea with premium ginger flakes and warming spices",
      image: "/images/ginger_2.jpeg",
      cookTime: "15 mins",
      servings: 4,
      difficulty: "Easy",
      spices: ["Ginger Flakes", "Cinnamon", "Cloves"],
      rating: 4.7,
      reviews: 156,
      category: "Wellness",
      healthBenefits: ["Digestive Health", "Natural Remedy"]
    }
  ];

  const wellnessArticles = [
    {
      id: 1,
      title: "Turmeric: The Anti-Inflammatory Powerhouse",
      excerpt: "Discover the science behind turmeric's powerful health benefits and how to maximize its absorption.",
      image: "/images/turmeric_2.jpeg",
      readTime: "5 min read",
      category: "Health Benefits",
      tags: ["Turmeric", "Anti-inflammatory", "Curcumin"]
    },
    {
      id: 2,
      title: "Ginger for Digestive Health: Ancient Wisdom, Modern Science",
      excerpt: "Learn how ginger supports digestive wellness and the best ways to incorporate it into your daily routine.",
      image: "/images/ginger_1.jpeg",
      readTime: "4 min read",
      category: "Digestive Health",
      tags: ["Ginger", "Digestion", "Natural Remedy"]
    },
    {
      id: 3,
      title: "The Art of West African Spice Blending",
      excerpt: "Explore the traditional techniques and cultural significance of authentic African spice combinations.",
      image: "/images/spice_blends_1.jpeg",
      readTime: "7 min read",
      category: "Cultural Heritage",
      tags: ["Traditional", "Blending", "Culture"]
    }
  ];

  const cookingTips = [
    {
      title: "Maximizing Turmeric Absorption",
      tip: "Add a pinch of black pepper and a healthy fat like coconut oil to increase curcumin bioavailability by up to 2000%."
    },
    {
      title: "Perfect Ginger Tea",
      tip: "Simmer fresh ginger flakes for 10-15 minutes to extract maximum flavor and beneficial compounds."
    },
    {
      title: "Authentic Jollof Technique",
      tip: "Toast your spice blend in oil for 30 seconds before adding rice to develop deeper, more complex flavors."
    },
    {
      title: "Spice Storage",
      tip: "Store spices in airtight containers away from light and heat to preserve potency and flavor for up to 2 years."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20">
        <div className="absolute inset-0 african-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="premium-gradient text-white border-0 mb-6">
              Culinary Wellness Hub
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient">Recipes</span>, Health Benefits & Global Inspiration
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover authentic recipes, learn about the health benefits of spices, 
              and explore culinary traditions from around the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search recipes, spices, or health benefits..."
                  className="pl-10"
                />
              </div>
              <Button className="premium-gradient text-white">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="recipes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="recipes" className="text-base">
                <ChefHat className="mr-2 h-4 w-4" />
                Recipes
              </TabsTrigger>
              <TabsTrigger value="wellness" className="text-base">
                <Heart className="mr-2 h-4 w-4" />
                Wellness Articles
              </TabsTrigger>
              <TabsTrigger value="tips" className="text-base">
                <BookOpen className="mr-2 h-4 w-4" />
                Cooking Tips
              </TabsTrigger>
            </TabsList>
            
            {/* Recipes Tab */}
            <TabsContent value="recipes">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Featured <span className="text-gradient">Recipes</span>
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Authentic dishes and wellness drinks using our premium spices
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {featuredRecipes.map((recipe) => (
                    <Card key={recipe.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                      <CardHeader className="pb-4">
                        <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img
                            src={recipe.image}
                            alt={recipe.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <Badge className="absolute top-2 left-2 bg-black/70 text-white">
                            {recipe.category}
                          </Badge>
                          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur rounded-full p-2">
                            <Heart className="h-4 w-4 text-muted-foreground hover:text-red-500 cursor-pointer" />
                          </div>
                        </div>
                        <CardTitle className="text-xl">{recipe.title}</CardTitle>
                        <CardDescription className="text-base">
                          {recipe.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{recipe.cookTime}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{recipe.servings} servings</span>
                          </div>
                          <Badge variant="outline">{recipe.difficulty}</Badge>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Featured Spices:</h4>
                          <div className="flex flex-wrap gap-1">
                            {recipe.spices.map((spice, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {spice}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium mb-2">Health Benefits:</h4>
                          <div className="flex flex-wrap gap-1">
                            {recipe.healthBenefits.map((benefit, index) => (
                              <Badge key={index} className="premium-gradient text-white text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-primary fill-current" />
                              ))}
                            </div>
                            <span className="text-sm font-medium">{recipe.rating}</span>
                            <span className="text-sm text-muted-foreground">({recipe.reviews})</span>
                          </div>
                          <Button size="sm" className="premium-gradient text-white">
                            View Recipe
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Recipe Categories */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "Traditional African", count: 24, image: "/images/spice_blends_1.jpeg" },
                    { name: "Wellness Drinks", count: 18, image: "/images/turmeric_1.jpeg" },
                    { name: "Fusion Cuisine", count: 32, image: "/images/spice_jars_1.jpeg" },
                    { name: "Plant-Based", count: 28, image: "/images/ginger_2.jpeg" }
                  ].map((category, index) => (
                    <Card key={index} className="group hover:shadow-card transition-all duration-300 cursor-pointer">
                      <CardContent className="p-4">
                        <div className="w-full h-32 rounded-lg overflow-hidden mb-3">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <h3 className="font-semibold">{category.name}</h3>
                        <p className="text-sm text-muted-foreground">{category.count} recipes</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Wellness Articles Tab */}
            <TabsContent value="wellness">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="text-gradient">Wellness</span> Education
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Learn about the science behind spice health benefits and traditional uses
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wellnessArticles.map((article) => (
                    <Card key={article.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                      <CardHeader className="pb-4">
                        <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-sm text-muted-foreground">{article.readTime}</span>
                        </div>
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                        <CardDescription className="text-base">
                          {article.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex flex-wrap gap-1">
                          {article.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button className="w-full premium-gradient text-white">
                          Read Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Cooking Tips Tab */}
            <TabsContent value="tips">
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="text-gradient">Expert</span> Cooking Tips
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Professional techniques and traditional wisdom for using spices effectively
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {cookingTips.map((tip, index) => (
                    <Card key={index} className="border-0 card-gradient hover:shadow-card transition-all duration-300">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold mb-3">{tip.title}</h3>
                        <p className="text-muted-foreground">{tip.tip}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Technique Videos Section */}
                <div className="bg-white rounded-2xl p-8 shadow-card">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold mb-4">
                      <span className="text-gradient">Video</span> Tutorials
                    </h3>
                    <p className="text-muted-foreground">
                      Watch our expert chefs demonstrate traditional spice preparation techniques
                    </p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { title: "Toasting Whole Spices", duration: "3:24" },
                      { title: "Making Golden Milk", duration: "5:12" },
                      { title: "Jollof Rice Masterclass", duration: "12:45" }
                    ].map((video, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-l-[12px] border-l-white border-y-[8px] border-y-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <h4 className="font-medium">{video.title}</h4>
                          <p className="text-sm text-muted-foreground">{video.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Community Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Join Our <span className="text-gradient">Culinary Community</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Share your recipes, discover new flavors, and connect with fellow spice enthusiasts from around the world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-0 bg-white shadow-card">
              <CardContent className="p-8 text-center">
                <ChefHat className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Share Your Recipe</h3>
                <p className="text-muted-foreground mb-6">
                  Have a favorite recipe using our spices? Share it with our community and inspire others.
                </p>
                <Button className="premium-gradient text-white">
                  Submit Recipe
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-card">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">Newsletter Signup</h3>
                <p className="text-muted-foreground mb-6">
                  Get weekly recipes, health tips, and exclusive offers delivered to your inbox.
                </p>
                <div className="flex gap-2">
                  <Input placeholder="Enter your email" className="flex-1" />
                  <Button className="premium-gradient text-white">
                    Subscribe
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Recipes;