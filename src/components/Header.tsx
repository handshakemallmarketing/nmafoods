import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Search, ShoppingCart, User, Menu, Shield, Award, Leaf } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        {/* Trust Bar */}
        <div className="flex items-center justify-center gap-6 py-2 text-xs text-muted-foreground border-b">
          <div className="flex items-center gap-1">
            <Shield className="h-3 w-3 text-primary" />
            <span>FDA Licensed</span>
          </div>
          <div className="flex items-center gap-1">
            <Leaf className="h-3 w-3 text-primary" />
            <span>Organic Certified</span>
          </div>
          <div className="flex items-center gap-1">
            <Award className="h-3 w-3 text-primary" />
            <span>Treated & Sealed</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <span>🌍</span>
            <span>Ethically Sourced</span>
          </div>
        </div>

        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-10 h-10 rounded-full premium-gradient flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent flex items-center justify-center">
                <span className="text-xs text-white">✓</span>
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">NMA FOODS</h1>
              <p className="text-xs text-muted-foreground">Ghana's Gold Standard</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base">SHOP</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <div className="grid gap-1">
                      <h4 className="font-medium leading-none">Functional Spices</h4>
                      <p className="text-sm text-muted-foreground">
                        Premium spices with proven health benefits
                      </p>
                    </div>
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/shop/functional"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Turmeric & Ginger</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Anti-inflammatory powerhouses
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/shop/authentic"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Authentic Blends</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Traditional West African flavors
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                    <div className="grid gap-1">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/shop/staples"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Staples</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Essential spices for every kitchen
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/story" className="text-base font-medium px-4 py-2 hover:text-primary transition-colors">
                    Our Story
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/safety" className="text-base font-medium px-4 py-2 hover:text-primary transition-colors">
                    Safety & Compliance
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link to="/recipes" className="text-base font-medium px-4 py-2 hover:text-primary transition-colors">
                    Recipes
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search spices..."
                  className="pl-8 w-[200px]"
                />
              </div>
            </div>
            
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                0
              </Badge>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <div className="flex flex-col space-y-4 mt-8">
                  <Link
                    to="/shop"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Shop All
                  </Link>
                  <Link
                    to="/shop/functional"
                    className="text-base hover:text-primary transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Functional Spices
                  </Link>
                  <Link
                    to="/shop/authentic"
                    className="text-base hover:text-primary transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Authentic Blends
                  </Link>
                  <Link
                    to="/shop/staples"
                    className="text-base hover:text-primary transition-colors pl-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Staples
                  </Link>
                  <Link
                    to="/story"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Our Story
                  </Link>
                  <Link
                    to="/safety"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Safety & Compliance
                  </Link>
                  <Link
                    to="/recipes"
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Recipes
                  </Link>
                  
                  <div className="pt-4 border-t">
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search spices..."
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;