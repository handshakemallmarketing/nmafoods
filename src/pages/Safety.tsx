import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Shield, Award, CheckCircle, FileText, Microscope, Globe, ArrowRight, Leaf } from "lucide-react";

const Safety = () => {
  const complianceFeatures = [
    {
      icon: Shield,
      title: "FDA Licensed Manufacturer",
      description: "Our Ghanaian manufacturer holds all necessary FDA and regulatory licenses required for U.S. importation.",
      details: [
        "FDA registration and compliance verification",
        "Regular facility inspections and audits",
        "Continuous monitoring of regulatory changes",
        "Full traceability from source to shelf"
      ]
    },
    {
      icon: Microscope,
      title: "Pathogen-Free Guarantee",
      description: "Ready-to-eat products sealed only after validated microbial reduction techniques.",
      details: [
        "Steam or EtO treatment for pathogen destruction",
        "Salmonella elimination protocols",
        "Third-party laboratory testing",
        "Batch-by-batch quality verification"
      ]
    },
    {
      icon: Award,
      title: "ASTA Cleanliness Standards",
      description: "We exceed American Spice Trade Association specifications for quality and cleanliness.",
      details: [
        "Defect Action Levels (DALs) compliance",
        "Extraneous matter elimination",
        "Filth-free guarantee",
        "Premium grade classification"
      ]
    }
  ];

  const certifications = [
    { name: "FDA Registered", icon: "🇺🇸", status: "Verified" },
    { name: "Organic Certified", icon: "🌿", status: "USDA Organic" },
    { name: "ASTA Member", icon: "⭐", status: "Compliant" },
    { name: "ISO 22000", icon: "🏆", status: "Food Safety" },
    { name: "HACCP", icon: "✅", status: "Certified" },
    { name: "GMP", icon: "🏭", status: "Good Manufacturing" }
  ];

  const testingProtocols = [
    {
      test: "Microbiological Testing",
      frequency: "Every Batch",
      parameters: ["Salmonella", "E. coli", "Total Plate Count", "Yeast & Mold"],
      standard: "FDA BAM Methods"
    },
    {
      test: "Heavy Metals Analysis",
      frequency: "Quarterly",
      parameters: ["Lead", "Cadmium", "Mercury", "Arsenic"],
      standard: "USP Standards"
    },
    {
      test: "Pesticide Residue",
      frequency: "Semi-Annual",
      parameters: ["Organochlorines", "Organophosphates", "Carbamates"],
      standard: "EPA Methods"
    },
    {
      test: "Aflatoxin Testing",
      frequency: "Every Batch",
      parameters: ["B1", "B2", "G1", "G2"],
      standard: "AOAC Methods"
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
              Risk Eliminated
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Promise: <span className="text-gradient">FDA Licensed</span>, Pathogen-Free Spices
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Why our spices are the safest on the market. Complete transparency in our 
              quality assurance, regulatory compliance, and safety protocols.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-white font-medium">100% FDA Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Microscope className="h-5 w-5 text-primary" />
                <span className="text-white font-medium">Pathogen-Free Tested</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
                <Award className="h-5 w-5 text-primary" />
                <span className="text-white font-medium">ASTA Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Compliance Data */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Triple-Layer</span> Safety Assurance
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive approach to spice safety goes beyond industry standards, 
              ensuring every product meets the highest quality and safety requirements.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="border-0 card-gradient hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 rounded-full premium-gradient flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-gradient">Certifications</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Recognized by leading industry organizations and regulatory bodies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="text-center p-6 border-0 bg-white hover:shadow-card transition-all duration-300">
                <div className="text-4xl mb-3">{cert.icon}</div>
                <h3 className="font-semibold mb-1">{cert.name}</h3>
                <Badge variant="secondary" className="text-xs">{cert.status}</Badge>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testing Protocols */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Laboratory Testing</span> Protocols
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive testing at every stage ensures our spices meet the highest safety standards. 
              Every batch is verified before it reaches your kitchen.
            </p>
          </div>

          <div className="space-y-6">
            {testingProtocols.map((protocol, index) => (
              <Card key={index} className="border-0 bg-white shadow-card">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{protocol.test}</h3>
                      <Badge className="premium-gradient text-white">{protocol.frequency}</Badge>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-medium mb-2">Parameters Tested:</h4>
                      <div className="flex flex-wrap gap-2">
                        {protocol.parameters.map((param, paramIndex) => (
                          <Badge key={paramIndex} variant="outline">{param}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <h4 className="font-medium mb-2">Standard:</h4>
                      <p className="text-sm text-muted-foreground">{protocol.standard}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Price Transparency */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 bg-white shadow-elegant">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-3xl mb-4">
                  <span className="text-gradient">Price Transparency</span>
                </CardTitle>
                <CardDescription className="text-lg">
                  Value over Volatility: Our Commitment to Quality
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="prose max-w-none">
                  <p className="text-muted-foreground text-center mb-8">
                    We are committed to selling unadulterated, clean spices. Current price fluctuations 
                    due to tariffs (up to 50%) and global climate risks are managed by prioritizing quality. 
                    We guarantee you are receiving pure, compliant product—not cheaper substitutes or reduced spice content.
                  </p>
                </div>

                <Separator />

                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <h4 className="font-semibold mb-2">No Adulterants</h4>
                    <p className="text-sm text-muted-foreground">
                      100% pure spices with no fillers, artificial colors, or preservatives
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Full Potency</h4>
                    <p className="text-sm text-muted-foreground">
                      Maximum active compounds and essential oils preserved through proper processing
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Fair Pricing</h4>
                    <p className="text-sm text-muted-foreground">
                      Transparent pricing that reflects true quality and compliance costs
                    </p>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button asChild className="premium-gradient text-white">
                    <Link to="/shop">
                      Shop Premium Spices
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient">Documentation</span> & Reports
            </h2>
            <p className="text-xl text-muted-foreground">
              Access our compliance certificates, test reports, and quality documentation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "FDA Registration", icon: FileText, description: "Current FDA facility registration" },
              { title: "Organic Certificates", icon: Leaf, description: "USDA Organic certification documents" },
              { title: "Test Reports", icon: Microscope, description: "Latest laboratory analysis results" },
              { title: "HACCP Plan", icon: Shield, description: "Hazard analysis and critical control points" }
            ].map((doc, index) => (
              <Card key={index} className="text-center p-6 border-0 card-gradient hover:shadow-card transition-all duration-300">
                <doc.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{doc.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{doc.description}</p>
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                  View Document
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Safety;