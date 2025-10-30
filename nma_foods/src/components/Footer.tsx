import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        {/* Newsletter Section */}
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-4">Join the NMA Flavor Collective</h3>
          <p className="text-secondary-foreground/80 mb-6 max-w-md mx-auto">
            Get exclusive health tips, authentic recipes, and special offers on premium Ghanaian spices.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-background text-foreground"
            />
            <Button className="premium-gradient text-white">
              Subscribe
            </Button>
          </div>
        </div>

        <Separator className="mb-8" />

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full premium-gradient flex items-center justify-center">
                <span className="text-white font-bold">N</span>
              </div>
              <div>
                <h4 className="font-bold text-gradient">NMA FOODS</h4>
                <p className="text-xs text-secondary-foreground/70">Ghana's Gold Standard Spices</p>
              </div>
            </div>
            <p className="text-sm text-secondary-foreground/80">
              Premium Ghanaian spices with guaranteed FDA compliance, 
              bringing authentic flavors and proven wellness benefits to your kitchen.
            </p>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Shop</h4>
            <div className="space-y-2">
              <Link to="/shop/functional" className="block text-sm hover:text-primary transition-colors">
                Functional Spices
              </Link>
              <Link to="/shop/authentic" className="block text-sm hover:text-primary transition-colors">
                Authentic Blends
              </Link>
              <Link to="/shop/staples" className="block text-sm hover:text-primary transition-colors">
                Staples
              </Link>
              <Link to="/shop" className="block text-sm hover:text-primary transition-colors">
                All Spices
              </Link>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Company</h4>
            <div className="space-y-2">
              <Link to="/story" className="block text-sm hover:text-primary transition-colors">
                Our Story
              </Link>
              <Link to="/safety" className="block text-sm hover:text-primary transition-colors">
                Safety & Compliance
              </Link>
              <Link to="/recipes" className="block text-sm hover:text-primary transition-colors">
                Recipes & Wellness
              </Link>
              <Link to="/contact" className="block text-sm hover:text-primary transition-colors">
                Contact Us
              </Link>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <NewsletterSignup variant="footer" />
          </div>

          {/* Social & Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Connect</h4>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary">
                <Mail className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-2 text-sm">
              <Link to="/terms" className="block hover:text-primary transition-colors">
                Terms & Conditions
              </Link>
              <Link to="/privacy" className="block hover:text-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/shipping" className="block hover:text-primary transition-colors">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-secondary-foreground/70">
          <p>© 2024 NMA Foods. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="flex items-center gap-1">
              🇬🇭 <span>Proudly from Ghana</span>
            </span>
            <span className="flex items-center gap-1">
              🇺🇸 <span>FDA Compliant</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;