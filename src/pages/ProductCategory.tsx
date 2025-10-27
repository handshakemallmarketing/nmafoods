import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Filter, ArrowRight } from "lucide-react";

const ProductCategory = () => {
  const { category } = useParams();

  const categoryData = {
    functional: {
      title: "Functional Spices",
      description: "Premium spices with proven health benefits and therapeutic properties",
      image: "/images/turmeric_1.jpeg",
      benefits: ["Anti-inflammatory", "Antioxidant", "Digestive Health", "Immunity Boost"]
    },
    authentic: {
      title: "Authentic Blends",
      description: "Traditional West African and Caribbean spice blends with authentic flavors",
      image: "/images/spice_blends_1.jpeg",
      benefits: ["Traditional Recipe", "Authentic Flavor", "Cultural Heritage", "Proven Taste"]
    },
    staples: {
      title: "Essential Staples",
      description: "Premium quality everyday spices for all your culinary needs",
      image: "/images/spice_jars_2.jpeg",
      benefits: ["Premium Quality", "Everyday Use", "Versatile", "Essential"]
    }
  };

  const products = {
    functional: [
      {
        id: 1,
        name: "Organic Turmeric Powder",
        price: "$24.99",
        originalPrice: "$29.99",
        image: "/images/turmeric_1.jpeg",
        rating: 4.9,
        reviews: 847,
        benefits: ["Anti-inflammatory", "Antioxidant"],
        description: "Premium organic turmeric with high curcumin content for maximum health benefits.",
        healthBenefit: "Anti-inflammatory"
      },
      {
        id: 2,
        name: "Premium Ginger Flakes",
        price: "$22.99",
        originalPrice: "$27.99",
        image: "/images/ginger_2.jpeg",
        rating: 4.9,
        reviews: 456,
        benefits: ["Digestive Health", "Natural"],
        description: "Dried ginger flakes perfect for teas, cooking, and natural wellness remedies.",
        healthBenefit: "Digestive"
      },
      {
        id: 3,
        name: "Golden Milk Blend",
        price: "$28.99",
        originalPrice: "$34.99",
        image: "/images/turmeric_2.jpeg",
        rating: 4.8,
        reviews: 623,
        benefits: ["Immunity Boost", "Anti-inflammatory"],
        description: "Carefully crafted blend of turmeric, ginger, and warming spices for the perfect golden milk.",
        healthBenefit: "Antioxidant"
      }
    ],
    authentic: [
      {
        id: 4,
        name: "Jollof Spice Blend",
        price: "$19.99",
        originalPrice: "$24.99",
        image: "/images/spice_blends_1.jpeg",
        rating: 4.8,
        reviews: 623,
        benefits: ["Traditional", "Authentic"],
        description: "Authentic West African Jollof rice seasoning blend, trusted by generations.",
        healthBenefit: "Traditional"
      },
      {
        id: 5,
        name: "Shito Seasoning",
        price: "$21.99",
        originalPrice: "$26.99",
        image: "/images/spice_blends_2.jpeg",
        rating: 4.7,
        reviews: 389,
        benefits: ["Spicy", "Traditional"],
        description: "Traditional Ghanaian hot pepper sauce seasoning blend with complex flavors.",
        healthBenefit: "Traditional"
      },
      {
        id: 6,
        name: "Caribbean Curry Blend",
        price: "$23.99",
        originalPrice: "$28.99",
        image: "/images/spice_blends_3.jpeg",
        rating: 4.9,
        reviews: 512,
        benefits: ["Aromatic", "Authentic"],
        description: "Vibrant Caribbean curry blend with turmeric, coriander, and island spices.",
        healthBenefit: "Traditional"
      }
    ],
    staples: [
      {
        id: 7,
        name: "Premium Black Pepper",
        price: "$18.99",
        originalPrice: "$22.99",
        image: "/images/spice_jars_1.jpeg",
        rating: 4.8,
        reviews: 734,
        benefits: ["Premium Quality", "Versatile"],
        description: "Freshly ground premium black pepper with intense flavor and aroma.",
        healthBenefit: "Essential"
      },
      {
        id: 8,
        name: "Ceylon Cinnamon",
        price: "$26.99",
        originalPrice: "$31.99",
        image: "/images/spice_jars_2.jpeg",
        rating: 4.9,
        reviews: 445,
        benefits: ["Premium Quality", "Sweet"],
        description: "True Ceylon cinnamon with delicate, sweet flavor profile.",
        healthBenefit: "Essential"
      },
      {
        id: 9,
        name: "Whole Cumin Seeds",
        price: "$16.99",
        originalPrice: "$20.99",
        image: "/images/spice_jars_3.jpeg",
        rating: 4.7,
        reviews: 298,
        benefits: ["Aromatic", "Versatile"],
        description: "Premium whole cumin seeds with earthy, warm flavor perfect for any cuisine.",
        healthBenefit: "Essential"
      }
    ]
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];
  const currentProducts = products[category as keyof typeof products] || [];

  if (!currentCategory) {
    return <div>Category not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Category Hero */}
      <section className="relative overflow-hidden hero-gradient py-20">
        <div className="absolute inset-0 african-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="premium-gradient text-white border-0">
                {currentCategory.title}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                {currentCategory.title.split(' ')[0]}{" "}
                <span className="text-gradient">{currentCategory.title.split(' ').slice(1).join(' ')}</span>
              </h1>
              <p className="text-xl text-muted-foreground">
                {currentCategory.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentCategory.benefits.map((benefit, index) => (
                  <Badge key={index} variant="outline" className="border-primary text-primary">
                    {benefit}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="relative">
              <img
                src={currentCategory.image}
                alt={currentCategory.title}
                className="rounded-2xl shadow-elegant w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Filter by:</span>
            </div>
            <div className="flex flex-wrap gap-4">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Health Benefit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Benefits</SelectItem>
                  <SelectItem value="anti-inflammatory">Anti-inflammatory</SelectItem>
                  <SelectItem value="antioxidant">Antioxidant</SelectItem>
                  <SelectItem value="digestive">Digestive</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Form" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Forms</SelectItem>
                  <SelectItem value="powder">Powder</SelectItem>
                  <SelectItem value="flakes">Flakes</SelectItem>
                  <SelectItem value="whole">Whole</SelectItem>
                  <SelectItem value="blend">Blend</SelectItem>
                </SelectContent>
              </Select>

              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-2 right-2 premium-gradient text-white">
                      Subscribe & Save 15%
                    </Badge>
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
                    <CardDescription className="text-sm">
                      {product.description}
                    </CardDescription>
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
                      <p className="text-xs text-muted-foreground">or 15% off with subscription</p>
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

          {/* Compliance Note */}
          <div className="mt-16 text-center">
            <Card className="border-0 bg-muted/30 p-8">
              <h3 className="text-xl font-bold mb-4">
                <span className="text-gradient">Compliance Guarantee</span>
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every jar guaranteed free of filth and pathogenic microorganisms per ASTA Cleanliness Specifications. 
                Our spices are considered ready-to-eat products by the FDA, sealed only after validated microbial reduction techniques.
              </p>
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/safety">
                  Learn About Our Safety Standards
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductCategory;