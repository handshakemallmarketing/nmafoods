import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus } from "lucide-react";
import { useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSubscription, setSelectedSubscription] = useState(false);

  // Mock product data - in real app, this would come from API
  const product = {
    id: 1,
    name: "Organic Turmeric Powder",
    price: "$24.99",
    originalPrice: "$29.99",
    subscriptionPrice: "$21.24",
    images: ["/images/turmeric_1.jpeg", "/images/turmeric_2.jpeg"],
    rating: 4.9,
    reviews: 847,
    category: "Functional Spices",
    benefits: ["Anti-inflammatory", "Antioxidant", "Immunity Boost"],
    description: "Premium organic turmeric powder sourced directly from Ghana's finest farms. Our turmeric contains high levels of curcumin, the active compound responsible for its powerful anti-inflammatory and antioxidant properties.",
    healthBenefits: [
      "Reduces inflammation naturally",
      "Powerful antioxidant properties",
      "Supports immune system function",
      "May help with joint health",
      "Supports digestive wellness"
    ],
    ingredients: "100% Organic Turmeric Root Powder (Curcuma longa)",
    origin: "Ghana, West Africa",
    certifications: ["USDA Organic", "FDA Registered", "Non-GMO", "Gluten-Free"],
    nutritionFacts: {
      servingSize: "1 tsp (2g)",
      calories: 8,
      totalFat: "0.2g",
      sodium: "1mg",
      totalCarbs: "1.4g",
      fiber: "0.5g",
      protein: "0.3g"
    },
    usage: [
      "Add 1 tsp to warm milk for golden milk",
      "Mix into smoothies and juices",
      "Use in curries and rice dishes",
      "Blend into salad dressings",
      "Add to soups and stews"
    ],
    storage: "Store in a cool, dry place away from direct sunlight. Use within 2 years of opening.",
    inStock: true,
    stockCount: 47
  };

  const relatedProducts = [
    {
      id: 2,
      name: "Premium Ginger Flakes",
      price: "$22.99",
      image: "/images/ginger_2.jpeg",
      rating: 4.9
    },
    {
      id: 3,
      name: "Golden Milk Blend",
      price: "$28.99",
      image: "/images/turmeric_2.jpeg",
      rating: 4.8
    }
  ];

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 weeks ago",
      comment: "Amazing quality! The color is so vibrant and the flavor is incredible. I use it daily in my golden milk.",
      verified: true
    },
    {
      id: 2,
      name: "Michael K.",
      rating: 5,
      date: "1 month ago",
      comment: "Best turmeric I've ever purchased. You can really taste the difference in quality. Will definitely reorder.",
      verified: true
    },
    {
      id: 3,
      name: "Priya S.",
      rating: 4,
      date: "3 weeks ago",
      comment: "Great product! Love that it's organic and from Ghana. The packaging is excellent too.",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary">Shop</Link>
          <span>/</span>
          <Link to="/shop/functional" className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer border-2 border-transparent hover:border-primary">
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4">{product.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviews} reviews)</span>
                </div>
                <p className="text-muted-foreground text-lg">{product.description}</p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold mb-3">Health Benefits:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.benefits.map((benefit, index) => (
                    <Badge key={index} variant="secondary">{benefit}</Badge>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">{product.price}</span>
                  <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                  <Badge className="premium-gradient text-white">17% OFF</Badge>
                </div>
                
                {/* Subscription Option */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Subscribe & Save 15%</h4>
                        <p className="text-sm text-muted-foreground">Get it for {product.subscriptionPrice} every month</p>
                      </div>
                      <Button
                        variant={selectedSubscription ? "default" : "outline"}
                        onClick={() => setSelectedSubscription(!selectedSubscription)}
                        className={selectedSubscription ? "premium-gradient text-white" : "border-primary text-primary"}
                      >
                        {selectedSubscription ? "Selected" : "Subscribe"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <div className="flex items-center border rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.stockCount} in stock
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="flex-1 premium-gradient text-white">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" size="lg">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Shipping Info */}
              <div className="space-y-3 pt-6 border-t">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-primary" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <span>FDA licensed and pathogen-free guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="benefits">Health Benefits</TabsTrigger>
              <TabsTrigger value="usage">Usage & Storage</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="mt-8">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Product Information</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">Ingredients</h4>
                        <p className="text-muted-foreground">{product.ingredients}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Origin</h4>
                        <p className="text-muted-foreground">{product.origin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline">{cert}</Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Nutrition Facts</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Serving Size:</span>
                        <p className="text-muted-foreground">{product.nutritionFacts.servingSize}</p>
                      </div>
                      <div>
                        <span className="font-medium">Calories:</span>
                        <p className="text-muted-foreground">{product.nutritionFacts.calories}</p>
                      </div>
                      <div>
                        <span className="font-medium">Total Fat:</span>
                        <p className="text-muted-foreground">{product.nutritionFacts.totalFat}</p>
                      </div>
                      <div>
                        <span className="font-medium">Protein:</span>
                        <p className="text-muted-foreground">{product.nutritionFacts.protein}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="benefits" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Health Benefits</h3>
                  <ul className="space-y-3">
                    {product.healthBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="usage" className="mt-8">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">How to Use</h3>
                    <ul className="space-y-2">
                      {product.usage.map((use, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                          <span>{use}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Storage Instructions</h3>
                    <p className="text-muted-foreground">{product.storage}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <div className="space-y-6">
                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.name}</span>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 text-primary fill-current" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            You Might Also <span className="text-gradient">Like</span>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="group hover:shadow-elegant transition-all duration-300 border-0 bg-white">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardTitle className="text-xl">{relatedProduct.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-primary fill-current" />
                      <span className="text-sm font-medium ml-1">{relatedProduct.rating}</span>
                    </div>
                    <span className="text-2xl font-bold text-primary">{relatedProduct.price}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button asChild className="w-full premium-gradient text-white">
                    <Link to={`/product/${relatedProduct.id}`}>
                      View Product
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;