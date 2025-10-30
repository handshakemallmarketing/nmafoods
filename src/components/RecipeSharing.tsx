import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { AuthDialog } from './AuthDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Heart, Clock, Users, ChefHat, Plus, Minus, Loader2, Star } from 'lucide-react';

interface Recipe {
  id: string;
  user_id: string;
  title: string;
  description: string;
  ingredients: any[];
  instructions: any[];
  prep_time: number;
  cook_time: number;
  servings: number;
  difficulty: string;
  cuisine_type: string;
  spices_used: string[];
  image_url: string;
  featured: boolean;
  likes_count: number;
  created_at: string;
  user_profiles_2024_10_29_13_00?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface RecipeSharingProps {
  featured?: boolean;
  limit?: number;
}

export const RecipeSharing: React.FC<RecipeSharingProps> = ({ 
  featured = false, 
  limit 
}) => {
  const { user } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showRecipeDialog, setShowRecipeDialog] = useState(false);
  
  // Recipe form state
  const [recipeForm, setRecipeForm] = useState({
    title: '',
    description: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    instructions: [{ step: 1, description: '' }],
    prep_time: 15,
    cook_time: 30,
    servings: 4,
    difficulty: 'Medium',
    cuisine_type: '',
    spices_used: [] as string[],
    image_url: ''
  });

  const spiceOptions = [
    'Turmeric', 'Ginger', 'Black Pepper', 'Cinnamon', 'Cumin', 'Coriander',
    'Cardamom', 'Cloves', 'Nutmeg', 'Paprika', 'Cayenne', 'Garlic Powder',
    'Onion Powder', 'Thyme', 'Oregano', 'Bay Leaves'
  ];

  // Fetch recipes
  useEffect(() => {
    fetchRecipes();
  }, [featured, limit]);

  const fetchRecipes = async () => {
    try {
      let query = supabase
        .from('recipes_2024_10_29_13_00')
        .select('*')
        .order('created_at', { ascending: false });
      if (featured) {
        query = query.eq('featured', true);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setRecipes(data || []);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitRecipe = async () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    if (!recipeForm.title.trim() || !recipeForm.description.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and description",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('recipes_2024_10_29_13_00')
        .insert({
          user_id: user.id,
          title: recipeForm.title,
          description: recipeForm.description,
          ingredients: recipeForm.ingredients.filter(ing => ing.name.trim()),
          instructions: recipeForm.instructions.filter(inst => inst.description.trim()),
          prep_time: recipeForm.prep_time,
          cook_time: recipeForm.cook_time,
          servings: recipeForm.servings,
          difficulty: recipeForm.difficulty,
          cuisine_type: recipeForm.cuisine_type,
          spices_used: recipeForm.spices_used,
          image_url: recipeForm.image_url,
        });

      if (error) throw error;

      toast({
        title: "Recipe Shared",
        description: "Your recipe has been submitted for review!",
      });

      setRecipeForm({
        title: '',
        description: '',
        ingredients: [{ name: '', amount: '', unit: '' }],
        instructions: [{ step: 1, description: '' }],
        prep_time: 15,
        cook_time: 30,
        servings: 4,
        difficulty: 'Medium',
        cuisine_type: '',
        spices_used: [],
        image_url: ''
      });
      setShowRecipeDialog(false);
      fetchRecipes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const addIngredient = () => {
    setRecipeForm({
      ...recipeForm,
      ingredients: [...recipeForm.ingredients, { name: '', amount: '', unit: '' }]
    });
  };

  const removeIngredient = (index: number) => {
    setRecipeForm({
      ...recipeForm,
      ingredients: recipeForm.ingredients.filter((_, i) => i !== index)
    });
  };

  const addInstruction = () => {
    setRecipeForm({
      ...recipeForm,
      instructions: [...recipeForm.instructions, { 
        step: recipeForm.instructions.length + 1, 
        description: '' 
      }]
    });
  };

  const removeInstruction = (index: number) => {
    const newInstructions = recipeForm.instructions.filter((_, i) => i !== index);
    // Renumber steps
    const renumbered = newInstructions.map((inst, i) => ({ ...inst, step: i + 1 }));
    setRecipeForm({
      ...recipeForm,
      instructions: renumbered
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            {featured ? 'Featured Recipes' : 'Community Recipes'}
          </h2>
          <p className="text-muted-foreground">
            {featured 
              ? 'Handpicked recipes from our community' 
              : 'Discover amazing recipes shared by our community'
            }
          </p>
        </div>
        
        <Dialog open={showRecipeDialog} onOpenChange={setShowRecipeDialog}>
          <DialogTrigger asChild>
            <Button className="premium-gradient text-white">
              <Plus className="h-4 w-4 mr-2" />
              Share Recipe
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Share Your Recipe</DialogTitle>
              <DialogDescription>
                Share your favorite recipe with the NMA Foods community
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="recipe-title">Recipe Title</Label>
                  <Input
                    id="recipe-title"
                    placeholder="e.g., Golden Milk Turmeric Latte"
                    value={recipeForm.title}
                    onChange={(e) => setRecipeForm({ ...recipeForm, title: e.target.value })}
                  />
                </div>
                
                <div className="col-span-2">
                  <Label htmlFor="recipe-description">Description</Label>
                  <Textarea
                    id="recipe-description"
                    placeholder="Tell us about your recipe..."
                    value={recipeForm.description}
                    onChange={(e) => setRecipeForm({ ...recipeForm, description: e.target.value })}
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="prep-time">Prep Time (minutes)</Label>
                  <Input
                    id="prep-time"
                    type="number"
                    value={recipeForm.prep_time}
                    onChange={(e) => setRecipeForm({ ...recipeForm, prep_time: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="cook-time">Cook Time (minutes)</Label>
                  <Input
                    id="cook-time"
                    type="number"
                    value={recipeForm.cook_time}
                    onChange={(e) => setRecipeForm({ ...recipeForm, cook_time: parseInt(e.target.value) || 0 })}
                  />
                </div>
                
                <div>
                  <Label htmlFor="servings">Servings</Label>
                  <Input
                    id="servings"
                    type="number"
                    value={recipeForm.servings}
                    onChange={(e) => setRecipeForm({ ...recipeForm, servings: parseInt(e.target.value) || 1 })}
                  />
                </div>
                
                <div>
                  <Label>Difficulty</Label>
                  <Select 
                    value={recipeForm.difficulty} 
                    onValueChange={(value) => setRecipeForm({ ...recipeForm, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ingredients */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Ingredients</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addIngredient}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {recipeForm.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) => {
                          const newIngredients = [...recipeForm.ingredients];
                          newIngredients[index].amount = e.target.value;
                          setRecipeForm({ ...recipeForm, ingredients: newIngredients });
                        }}
                        className="w-20"
                      />
                      <Input
                        placeholder="Unit"
                        value={ingredient.unit}
                        onChange={(e) => {
                          const newIngredients = [...recipeForm.ingredients];
                          newIngredients[index].unit = e.target.value;
                          setRecipeForm({ ...recipeForm, ingredients: newIngredients });
                        }}
                        className="w-20"
                      />
                      <Input
                        placeholder="Ingredient name"
                        value={ingredient.name}
                        onChange={(e) => {
                          const newIngredients = [...recipeForm.ingredients];
                          newIngredients[index].name = e.target.value;
                          setRecipeForm({ ...recipeForm, ingredients: newIngredients });
                        }}
                        className="flex-1"
                      />
                      {recipeForm.ingredients.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Instructions */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Label>Instructions</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addInstruction}>
                    <Plus className="h-4 w-4 mr-1" />
                    Add Step
                  </Button>
                </div>
                <div className="space-y-2">
                  {recipeForm.instructions.map((instruction, index) => (
                    <div key={index} className="flex gap-2">
                      <div className="w-8 h-10 bg-muted rounded flex items-center justify-center text-sm font-medium">
                        {instruction.step}
                      </div>
                      <Textarea
                        placeholder="Describe this step..."
                        value={instruction.description}
                        onChange={(e) => {
                          const newInstructions = [...recipeForm.instructions];
                          newInstructions[index].description = e.target.value;
                          setRecipeForm({ ...recipeForm, instructions: newInstructions });
                        }}
                        rows={2}
                        className="flex-1"
                      />
                      {recipeForm.instructions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeInstruction(index)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={submitRecipe} 
                disabled={submitting}
                className="w-full premium-gradient text-white"
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Share Recipe
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Recipes Grid */}
      {recipes.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="group hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                {recipe.image_url && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img
                      src={recipe.image_url}
                      alt={recipe.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{recipe.title}</CardTitle>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe.description}
                    </p>
                  </div>
                  {recipe.featured && (
                    <Badge className="ml-2">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </Badge>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {recipe.prep_time + recipe.cook_time}m
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {recipe.servings}
                  </div>
                  <div className="flex items-center gap-1">
                    <ChefHat className="h-4 w-4" />
                    {recipe.difficulty}
                  </div>
                </div>
                
                {recipe.spices_used.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {recipe.spices_used.slice(0, 3).map((spice, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spice}
                      </Badge>
                    ))}
                    {recipe.spices_used.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{recipe.spices_used.length - 3} more
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={recipe.user_profiles_2024_10_29_13_00?.avatar_url} />
                      <AvatarFallback className="text-xs">
                        {recipe.user_profiles_2024_10_29_13_00?.full_name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {recipe.user_profiles_2024_10_29_13_00?.full_name || 'Anonymous'}
                    </span>
                  </div>
                  
                  <Button variant="ghost" size="sm">
                    <Heart className="h-4 w-4 mr-1" />
                    {recipe.likes_count}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No recipes yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share a recipe with our community!
          </p>
          <Button onClick={() => setShowRecipeDialog(true)} className="premium-gradient text-white">
            Share Your Recipe
          </Button>
        </div>
      )}

      <AuthDialog 
        open={showAuthDialog} 
        onOpenChange={setShowAuthDialog}
        defaultTab="register"
      />
    </div>
  );
};