import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useProduct, formatPrice, getProductImages, getProductVariants } from "@/hooks/useShopify";
import { useCart } from "@/contexts/CartContext";
import { ProductReviews } from "@/components/ProductReviews";
import { EnhancedProductInfo } from "@/components/EnhancedProductInfo";
import { ProductSEO } from "@/components/SEOComponent";
import { useEcommerceAnalytics } from "@/hooks/useAnalytics";
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, ArrowLeft, Plus, Minus, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const { product, loading } = useProduct(id || '');
  const { addToCart } = useCart();
  const { trackProductView, trackAddToCart } = useEcommerceAnalytics();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);

  // Set default variant when product loads
  useEffect(() => {
    if (product && !selectedVariant) {
      const variants = getProductVariants(product);
      if (variants.length > 0) {
        setSelectedVariant(variants[0]);
      }
    }
  }, [product, selectedVariant]);

  // Track product view when product loads
  useEffect(() => {
    if (product) {
      trackProductView(product);
    }
  }, [product, trackProductView]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <ProductSEO product={product} productHandle={id || ''} />
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/shop">Browse All Products</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (product && selectedVariant) {
      await addToCart(product, selectedVariant, quantity);
      // Track add to cart event
      trackAddToCart(product, selectedVariant, quantity);
    }
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

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Button asChild>
              <Link to="/shop">Back to Shop</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const images = getProductImages(product);
  const variants = getProductVariants(product);
  const currentVariant = selectedVariant || variants[0];
  
  // Mock additional data that would come from Shopify metafields or your CMS
  const mockData = {
    healthBenefits: [
      "Reduces inflammation naturally",
      "Powerful antioxidant properties", 
      "Supports immune system function",
      "May help with joint health",
      "Supports digestive wellness"
    ],
    ingredients: "100% Organic " + product.title,
    origin: "Ghana, West Africa",
    certifications: ["USDA Organic", "FDA Registered", "Non-GMO", "Gluten-Free"],
    usage: [
      "Add 1 tsp to warm milk for golden milk",
      "Mix into smoothies and juices", 
      "Use in curries and rice dishes",
      "Blend into salad dressings",
      "Add to soups and stews"
    ],
    storage: "Store in a cool, dry place away from direct sunlight. Use within 2 years of opening.",
    reviews: [
      {
        id: 1,
        name: "Sarah M.",
        rating: 5,
        date: "2 weeks ago",
        comment: "Amazing quality! The color is so vibrant and the flavor is incredible.",
        verified: true
      }
    ]
  };

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
          <Link to="/shop/functional" className="hover:text-primary">{product.productType || 'Spices'}</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
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
                  src={images[0]?.url || "/images/turmeric_1.jpeg"}
                  alt={images[0]?.altText || product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {images.slice(0, 4).map((image, index) => (
                  <div key={index} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer border-2 border-transparent hover:border-primary">
                    <img
                      src={image.url}
                      alt={image.altText || `${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-4">{product.productType || 'Premium Spices'}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-primary fill-current" />
                      ))}
                    </div>
                    <span className="ml-2 font-medium">4.9</span>
                  </div>
                  <span className="text-muted-foreground">(847 reviews)</span>
                </div>
                <p className="text-muted-foreground text-lg">{product.description || 'Premium organic spice from Ghana with exceptional quality and purity.'}</p>
              </div>

              {/* Benefits */}
              <div>
                <h3 className="font-semibold mb-3">Health Benefits:</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags?.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary">{tag}</Badge>
                  )) || (
                    <Badge variant="secondary">Premium Quality</Badge>
                  )}
                </div>
              </div>

              {/* Pricing */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    {currentVariant ? formatPrice(currentVariant.price) : '$0.00'}
                  </span>
                  {currentVariant?.compareAtPrice && (
                    <span className="text-xl text-muted-foreground line-through">
                      {formatPrice(currentVariant.compareAtPrice)}
                    </span>
                  )}
                  <Badge className="premium-gradient text-white">Save 15%</Badge>
                </div>
                
                {/* Subscription Option */}
                <Card className="border-primary/20 bg-primary/5">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">Subscribe & Save 15%</h4>
                        <p className="text-sm text-muted-foreground">
                          Get it delivered monthly with 15% discount
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => {}}
                        className="border-primary text-primary"
                      >
                        Subscribe
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
                    {currentVariant?.quantityAvailable || 'In stock'}
                  </span>
                </div>

                <div className="flex gap-4">
                  <Button 
                    size="lg" 
                    className="flex-1 premium-gradient text-white"
                    onClick={handleAddToCart}
                    disabled={!currentVariant?.availableForSale}
                  >
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
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="benefits">Health Benefits</TabsTrigger>
              <TabsTrigger value="usage">Usage & Storage</TabsTrigger>
              <TabsTrigger value="enhanced-info">Complete Info</TabsTrigger>
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
                        <p className="text-muted-foreground">{mockData.ingredients}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Origin</h4>
                        <p className="text-muted-foreground">{mockData.origin}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Certifications</h3>
                    <div className="flex flex-wrap gap-2">
                      {mockData.certifications.map((cert, index) => (
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
                        <p className="text-muted-foreground">1 tsp (2g)</p>
                      </div>
                      <div>
                        <span className="font-medium">Calories:</span>
                        <p className="text-muted-foreground">8</p>
                      </div>
                      <div>
                        <span className="font-medium">Total Fat:</span>
                        <p className="text-muted-foreground">0.2g</p>
                      </div>
                      <div>
                        <span className="font-medium">Protein:</span>
                        <p className="text-muted-foreground">0.3g</p>
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
                    {mockData.healthBenefits.map((benefit, index) => (
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
                      {mockData.usage.map((use, index) => (
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
                    <p className="text-muted-foreground">{mockData.storage}</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="enhanced-info" className="mt-8">
              <EnhancedProductInfo 
                productHandle={product.handle}
                productTitle={product.title}
              />
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-8">
              <ProductReviews 
                productHandle={product.handle}
                productTitle={product.title}
              />
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