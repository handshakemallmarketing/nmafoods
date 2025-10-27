import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ArrowRight, Star, ShoppingCart } from "lucide-react";

const Shop = () => {
  const categories = [
    {
      id: "functional",
      title: "Functional Spices",
      description: "Premium spices with proven health benefits",
      image: "/images/turmeric_1.jpeg",
      products: ["Organic Turmeric Powder", "Organic Ginger Flakes", "Golden Milk Blend"],
      benefits: ["Anti-inflammatory", "Antioxidant", "Digestive Health"]
    },
    {
      id: "authentic",
      title: "Authentic Blends",
      description: "Traditional West African and Caribbean flavors",
      image: "/images/spice_blends_1.jpeg",
      products: ["Jollof Spice Blend", "Shito Seasoning", "Caribbean Curry Blend"],
      benefits: ["Authentic Flavor", "Traditional Recipe", "Cultural Heritage"]
    },
    {
      id: "staples",
      title: "Essential Staples",
      description: "Premium quality everyday spices",
      image: "/images/spice_jars_2.jpeg",
      products: ["Black Pepper", "Cinnamon", "Cumin", "Cloves"],
      benefits: ["Premium Quality", "Everyday Use", "Versatile"]
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Organic Turmeric Powder",
      price: "$24.99",
      originalPrice: "$29.99",
      image: "/images/turmeric_1.jpeg",
      rating: 4.9,
      reviews: 847,
      category: "Functional",
      benefits: ["Anti-inflammatory", "Antioxidant"],
      subscription: true
    },
    {
      id: 2,
      name: "Jollof Spice Blend",
      price: "$19.99",
      originalPrice: "$24.99",
      image: "/images/spice_blends_1.jpeg",
      rating: 4.8,
      reviews: 623,
      category: "Authentic",
      benefits: ["Traditional", "Authentic"],
      subscription: true
    },
    {
      id: 3,
      name: "Premium Ginger Flakes",
      price: "$22.99",
      originalPrice: "$27.99",
      image: "/images/ginger_2.jpeg",
      rating: 4.9,
      reviews: 456,
      category: "Functional",
      benefits: ["Digestive Health", "Natural"],
      subscription: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20">
        <div className="absolute inset-0 african-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium <span className="text-gradient">Ghanaian Spices</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover our complete collection of FDA-compliant, organic spices. 
              From functional powerhouses to authentic traditional blends.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="premium-gradient text-white border-0 px-4 py-2">
                Free Shipping Over $50
              </Badge>
              <Badge variant="outline" className="border-primary text-primary px-4 py-2">
                Subscribe & Save 15%
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Shop by <span className="text-gradient">Category</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Find the perfect spices for your culinary journey and wellness goals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Card key={category.id} className="group hover:shadow-elegant transition-all duration-300 border-0 card-gradient">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-2xl">{category.title}</CardTitle>
                  <CardDescription className="text-base">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Featured Products:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      {category.products.map((product, index) => (
                        <li key={index}>• {product}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary">{benefit}</Badge>
                    ))}
                  </div>
                  <Button asChild className="w-full premium-gradient text-white">
                    <Link to={`/shop/${category.id}`}>
                      Explore {category.title}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Best Sellers</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Our most popular spices, trusted by thousands of customers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 left-2 bg-accent text-white">
                      {product.category}
                    </Badge>
                    {product.subscription && (
                      <Badge className="absolute top-2 right-2 premium-gradient text-white">
                        Subscribe & Save
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-primary fill-current" />
                        <span className="text-sm font-medium ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {product.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary">{benefit}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">or $19.99 with subscription</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button asChild className="flex-1 premium-gradient text-white">
                      <Link to={`/product/${product.id}`}>
                        View Details
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/shop/all">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Compliance Guarantee */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl p-8 shadow-card">
            <div className="text-center max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">
                Every Jar Guaranteed <span className="text-gradient">Pathogen-Free</span>
              </h3>
              <p className="text-muted-foreground mb-6">
                Our spices exceed ASTA Cleanliness Specifications and FDA Defect Action Levels. 
                Each product is sealed only after validated microbial reduction techniques, 
                ensuring complete safety and purity.
              </p>
              <Button asChild className="premium-gradient text-white">
                <Link to="/safety">
                  Learn About Our Safety Standards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;