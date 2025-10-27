import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { MapPin, Users, Award, Leaf, Heart, Globe, ArrowRight, CheckCircle } from "lucide-react";

const Story = () => {
  const milestones = [
    {
      year: "2018",
      title: "Roots in Ghana",
      description: "Founded with a mission to bring authentic Ghanaian spices to the world while supporting local farmers."
    },
    {
      year: "2019",
      title: "FDA Compliance",
      description: "Achieved full FDA registration and compliance, ensuring our spices meet the highest safety standards."
    },
    {
      year: "2020",
      title: "Organic Certification",
      description: "Obtained USDA Organic certification, confirming our commitment to pure, natural spices."
    },
    {
      year: "2021",
      title: "Community Growth",
      description: "Reached 10,000+ satisfied customers and established partnerships with 50+ local farms."
    },
    {
      year: "2022",
      title: "Market Expansion",
      description: "Expanded to serve West African and Caribbean communities across North America."
    },
    {
      year: "2024",
      title: "Wellness Focus",
      description: "Launched functional spice line focusing on health benefits and therapeutic properties."
    }
  ];

  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description: "We work directly with farmers to promote sustainable farming practices and environmental stewardship."
    },
    {
      icon: Heart,
      title: "Community",
      description: "Supporting local communities in Ghana while serving diaspora communities worldwide."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Uncompromising commitment to the highest quality standards and regulatory compliance."
    },
    {
      icon: Globe,
      title: "Authenticity",
      description: "Preserving traditional flavors and cultural heritage through authentic spice blends."
    }
  ];

  const impact = [
    {
      number: "200+",
      label: "Partner Farms",
      description: "Supporting small-scale farmers across Ghana"
    },
    {
      number: "50K+",
      label: "Customers Served",
      description: "Bringing authentic flavors to kitchens worldwide"
    },
    {
      number: "100%",
      label: "FDA Compliant",
      description: "Meeting the highest safety and quality standards"
    },
    {
      number: "15+",
      label: "Premium Spices",
      description: "Carefully curated selection of authentic blends"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden hero-gradient py-20">
        <div className="absolute inset-0 african-pattern opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="premium-gradient text-white border-0">
                  Our Heritage
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  From Ghana's <span className="text-gradient">Golden Fields</span> to Your Kitchen
                </h1>
                <p className="text-xl text-muted-foreground">
                  The story of NMA Foods is one of heritage, quality, and community. 
                  We bridge continents to bring you the authentic flavors of West Africa 
                  with guaranteed safety and purity.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="premium-gradient text-white">
                  <Link to="/shop">
                    Shop Our Spices
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  <Link to="/safety">Learn About Quality</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="/images/spice_blends_1.jpeg"
                  alt="Authentic Ghanaian Spices"
                  className="rounded-2xl shadow-elegant w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-semibold">Sourced from Ghana</p>
                      <p className="text-sm text-muted-foreground">West Africa's Spice Capital</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-8 -right-8 w-32 h-32 rounded-full premium-gradient opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Our <span className="text-gradient">Mission</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              To bring the authentic flavors and proven health benefits of Ghanaian spices to the world, 
              while maintaining the highest standards of quality, safety, and cultural authenticity. 
              We believe that great food connects communities and that premium spices should be accessible to everyone.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border-0 card-gradient text-center hover:shadow-card transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From humble beginnings to becoming a trusted name in premium spices, 
              our journey reflects our commitment to quality and community.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center text-white font-bold text-lg">
                      {milestone.year.slice(-2)}
                    </div>
                  </div>
                  <Card className="flex-1 border-0 bg-white shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge className="premium-gradient text-white">{milestone.year}</Badge>
                        <h3 className="text-xl font-semibold">{milestone.title}</h3>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Heritage & Ingredients */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="text-gradient">Heritage</span> of Ingredients
              </h2>
              <p className="text-lg text-muted-foreground">
                Ghana has been a center of spice cultivation for centuries. Our spices are grown in the 
                fertile soils of West Africa, where traditional farming methods meet modern quality standards.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Traditional Cultivation</h4>
                    <p className="text-muted-foreground">Time-honored farming practices passed down through generations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Optimal Climate</h4>
                    <p className="text-muted-foreground">Ghana's tropical climate provides perfect conditions for spice cultivation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sustainable Practices</h4>
                    <p className="text-muted-foreground">Environmentally responsible farming that preserves soil health</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/images/turmeric_1.jpeg"
                alt="Premium Turmeric from Ghana"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-card">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">🇬🇭</div>
                  <p className="text-sm font-medium">Proudly Ghanaian</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Impact</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Measuring success through community support and customer satisfaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impact.map((stat, index) => (
              <Card key={index} className="text-center border-0 bg-white shadow-card">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <h3 className="font-semibold text-lg mb-2">{stat.label}</h3>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-white shadow-elegant">
              <CardContent className="p-12">
                <div className="text-center mb-8">
                  <Leaf className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">
                    <span className="text-gradient">Sustainability</span> Commitment
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    We believe in responsible business practices that benefit both people and planet
                  </p>
                </div>

                <Separator className="my-8" />

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Environmental Stewardship</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Organic farming practices that preserve soil health</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Minimal packaging using recyclable materials</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Carbon-conscious shipping and logistics</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Community Support</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Fair trade partnerships with local farmers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Educational programs on sustainable farming</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Investment in rural community development</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <Button asChild className="premium-gradient text-white">
                    <Link to="/shop">
                      Support Our Mission
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Experience the authentic flavors of Ghana while supporting sustainable farming 
              and community development. Every purchase makes a difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="premium-gradient text-white">
                <Link to="/shop">
                  Explore Our Spices
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                <Link to="/recipes">Discover Recipes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;