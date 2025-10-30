import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Mail, Check, Loader2, Gift, BookOpen, Percent } from 'lucide-react';

interface NewsletterSignupProps {
  variant?: 'default' | 'compact' | 'footer';
  className?: string;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ 
  variant = 'default',
  className = ''
}) => {
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [subscriptionTypes, setSubscriptionTypes] = useState({
    newsletter: true,
    recipes: true,
    promotions: false
  });
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Subscribe to each selected type
      const subscriptionPromises = Object.entries(subscriptionTypes)
        .filter(([_, selected]) => selected)
        .map(([type, _]) => 
          supabase.functions.invoke('email_marketing_2024_10_29_14_00', {
            body: {
              action: 'subscribe',
              email: email,
              user_id: user?.id || null,
              subscription_type: type,
              preferences: subscriptionTypes
            }
          })
        );

      const results = await Promise.all(subscriptionPromises);
      
      // Check if any subscription failed
      const hasError = results.some(result => result.error);
      
      if (hasError) {
        throw new Error('Failed to subscribe to some newsletters');
      }

      setSubscribed(true);
      toast({
        title: "Successfully Subscribed! 🎉",
        description: "Welcome to the NMA Foods community. Check your email for a welcome message!",
      });

      // Clear form if not logged in
      if (!user) {
        setEmail('');
      }
    } catch (error: any) {
      toast({
        title: "Subscription Failed",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const subscriptionOptions = [
    {
      id: 'newsletter',
      label: 'Weekly Newsletter',
      description: 'Get our latest recipes, tips, and community highlights',
      icon: Mail,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'recipes',
      label: 'Recipe Updates',
      description: 'New recipes and cooking techniques from our community',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'promotions',
      label: 'Special Offers',
      description: 'Exclusive discounts and early access to new products',
      icon: Percent,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  if (subscribed) {
    return (
      <Card className={`${className} border-green-200 bg-green-50`}>
        <CardContent className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Welcome to the Community!
          </h3>
          <p className="text-green-700 mb-4">
            You're now subscribed to our newsletter. Check your email for a welcome message with exclusive content!
          </p>
          <Badge className="bg-green-600 text-white">
            <Gift className="h-3 w-3 mr-1" />
            Welcome bonus inside!
          </Badge>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex gap-2 ${className}`}>
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1"
        />
        <Button 
          onClick={handleSubscribe}
          disabled={loading}
          className="premium-gradient text-white"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Subscribe'}
        </Button>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={className}>
        <h3 className="font-semibold mb-3">Stay Connected</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Get recipes, tips, and exclusive offers delivered to your inbox.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-3">
          <Input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit"
            disabled={loading}
            className="w-full premium-gradient text-white"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Mail className="h-4 w-4 mr-2" />}
            Subscribe
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-primary" />
          Join Our Community
        </CardTitle>
        <CardDescription>
          Get exclusive recipes, cooking tips, and special offers delivered to your inbox.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubscribe} className="space-y-6">
          <div>
            <Label htmlFor="newsletter-email">Email Address</Label>
            <Input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label className="text-base font-medium">What would you like to receive?</Label>
            <div className="space-y-4 mt-3">
              {subscriptionOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <div key={option.id} className="flex items-start space-x-3">
                    <Checkbox
                      id={option.id}
                      checked={subscriptionTypes[option.id as keyof typeof subscriptionTypes]}
                      onCheckedChange={(checked) =>
                        setSubscriptionTypes(prev => ({
                          ...prev,
                          [option.id]: checked
                        }))
                      }
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${option.color}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <Label htmlFor={option.id} className="font-medium cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground ml-10">
                        {option.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-muted/50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="h-4 w-4 text-primary" />
              <span className="font-medium text-sm">Subscriber Benefits</span>
            </div>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 15% off your first order</li>
              <li>• Exclusive access to new recipes</li>
              <li>• Early bird pricing on new products</li>
              <li>• Monthly cooking challenges</li>
            </ul>
          </div>

          <Button 
            type="submit"
            disabled={loading || !Object.values(subscriptionTypes).some(Boolean)}
            className="w-full premium-gradient text-white"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            Subscribe to Newsletter
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            By subscribing, you agree to receive marketing emails from NMA Foods. 
            You can unsubscribe at any time. We respect your privacy.
          </p>
        </form>
      </CardContent>
    </Card>
  );
};