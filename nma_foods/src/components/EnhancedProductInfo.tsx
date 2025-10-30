import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { Leaf, Award, MapPin, Users, Calendar, Truck, Loader2 } from 'lucide-react';

interface NutritionInfo {
  id: string;
  product_handle: string;
  serving_size: string;
  calories: number;
  total_fat: string;
  saturated_fat: string;
  sodium: string;
  total_carbs: string;
  dietary_fiber: string;
  protein: string;
  vitamin_c: string;
  iron: string;
  allergen_info: string[];
  storage_instructions: string;
  shelf_life: string;
}

interface SourcingStory {
  id: string;
  product_handle: string;
  ingredient_name: string;
  origin_country: string;
  origin_region: string;
  farm_name: string;
  farmer_story: string;
  harvesting_method: string;
  processing_method: string;
  quality_certifications: string[];
  sustainability_practices: string[];
  harvest_season: string;
}

interface UsageGuide {
  id: string;
  product_handle: string;
  guide_type: string;
  title: string;
  description: string;
  instructions: any[];
  tips: string[];
  health_benefits: string[];
  precautions: string[];
  difficulty_level: string;
  prep_time: number;
}

interface HealthBenefit {
  id: string;
  ingredient_name: string;
  benefit_category: string;
  benefit_title: string;
  scientific_description: string;
  research_studies: any[];
  dosage_recommendations: string;
  evidence_level: string;
}

interface EnhancedProductInfoProps {
  productHandle: string;
  productTitle: string;
}

export const EnhancedProductInfo: React.FC<EnhancedProductInfoProps> = ({ 
  productHandle, 
  productTitle 
}) => {
  const [nutritionInfo, setNutritionInfo] = useState<NutritionInfo | null>(null);
  const [sourcingStories, setSourcingStories] = useState<SourcingStory[]>([]);
  const [usageGuides, setUsageGuides] = useState<UsageGuide[]>([]);
  const [healthBenefits, setHealthBenefits] = useState<HealthBenefit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductInfo();
  }, [productHandle]);

  const fetchProductInfo = async () => {
    try {
      // Fetch nutrition information
      const { data: nutrition } = await supabase
        .from('product_nutrition_2024_10_29_14_00')
        .select('*')
        .eq('product_handle', productHandle)
        .single();

      if (nutrition) setNutritionInfo(nutrition);

      // Fetch sourcing stories
      const { data: sourcing } = await supabase
        .from('ingredient_sourcing_2024_10_29_14_00')
        .select('*')
        .eq('product_handle', productHandle);

      setSourcingStories(sourcing || []);

      // Fetch usage guides
      const { data: guides } = await supabase
        .from('usage_guides_2024_10_29_14_00')
        .select('*')
        .eq('product_handle', productHandle);

      setUsageGuides(guides || []);

      // Fetch health benefits (based on main ingredient)
      const mainIngredient = productTitle.split(' ')[0]; // Simple extraction
      const { data: benefits } = await supabase
        .from('health_benefits_research_2024_10_29_14_00')
        .select('*')
        .ilike('ingredient_name', `%${mainIngredient}%`);

      setHealthBenefits(benefits || []);
    } catch (error) {
      console.error('Error fetching product info:', error);
    } finally {
      setLoading(false);
    }
  };

  const getEvidenceLevelColor = (level: string) => {
    switch (level) {
      case 'conclusive': return 'bg-green-100 text-green-800';
      case 'strong': return 'bg-blue-100 text-blue-800';
      case 'moderate': return 'bg-yellow-100 text-yellow-800';
      case 'preliminary': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Tabs defaultValue="nutrition" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
        <TabsTrigger value="sourcing">Sourcing</TabsTrigger>
        <TabsTrigger value="usage">Usage Guides</TabsTrigger>
        <TabsTrigger value="science">Health Science</TabsTrigger>
      </TabsList>

      {/* Nutrition Tab */}
      <TabsContent value="nutrition" className="mt-6">
        {nutritionInfo ? (
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  Nutrition Facts
                </CardTitle>
                <CardDescription>Per {nutritionInfo.serving_size}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="font-semibold border-b pb-2">Calories</div>
                  <div className="border-b pb-2">{nutritionInfo.calories}</div>
                  
                  <div>Total Fat</div>
                  <div>{nutritionInfo.total_fat}</div>
                  
                  <div className="pl-4">Saturated Fat</div>
                  <div>{nutritionInfo.saturated_fat}</div>
                  
                  <div>Sodium</div>
                  <div>{nutritionInfo.sodium}</div>
                  
                  <div>Total Carbohydrates</div>
                  <div>{nutritionInfo.total_carbs}</div>
                  
                  <div className="pl-4">Dietary Fiber</div>
                  <div>{nutritionInfo.dietary_fiber}</div>
                  
                  <div>Protein</div>
                  <div>{nutritionInfo.protein}</div>
                  
                  <div>Vitamin C</div>
                  <div>{nutritionInfo.vitamin_c}</div>
                  
                  <div>Iron</div>
                  <div>{nutritionInfo.iron}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-blue-600" />
                  Storage & Safety
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Storage Instructions</h4>
                  <p className="text-muted-foreground">{nutritionInfo.storage_instructions}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Shelf Life</h4>
                  <p className="text-muted-foreground">{nutritionInfo.shelf_life}</p>
                </div>
                
                {nutritionInfo.allergen_info.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-2">Allergen Information</h4>
                    <div className="space-y-1">
                      {nutritionInfo.allergen_info.map((allergen, index) => (
                        <Badge key={index} variant="outline" className="mr-2">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Nutritional information coming soon.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Sourcing Tab */}
      <TabsContent value="sourcing" className="mt-6">
        {sourcingStories.length > 0 ? (
          <div className="space-y-6">
            {sourcingStories.map((story) => (
              <Card key={story.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    {story.ingredient_name} from {story.farm_name}
                  </CardTitle>
                  <CardDescription>
                    {story.origin_region}, {story.origin_country}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Farmer's Story
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {story.farmer_story}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">Harvesting & Processing</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-medium">Harvesting:</span>
                          <p className="text-muted-foreground">{story.harvesting_method}</p>
                        </div>
                        <div>
                          <span className="font-medium">Processing:</span>
                          <p className="text-muted-foreground">{story.processing_method}</p>
                        </div>
                        <div>
                          <span className="font-medium">Season:</span>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {story.harvest_season}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-3">Quality & Sustainability</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium text-sm">Certifications:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {story.quality_certifications.map((cert, index) => (
                              <Badge key={index} className="premium-gradient text-white text-xs">
                                <Award className="h-3 w-3 mr-1" />
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <span className="font-medium text-sm">Sustainability:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {story.sustainability_practices.map((practice, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <Leaf className="h-3 w-3 mr-1" />
                                {practice}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Sourcing stories coming soon.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Usage Guides Tab */}
      <TabsContent value="usage" className="mt-6">
        {usageGuides.length > 0 ? (
          <div className="grid gap-6">
            {usageGuides.map((guide) => (
              <Card key={guide.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{guide.title}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge className={getDifficultyColor(guide.difficulty_level)}>
                        {guide.difficulty_level}
                      </Badge>
                      <Badge variant="outline">
                        {guide.prep_time} min
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Instructions</h4>
                    <div className="space-y-3">
                      {guide.instructions.map((step: any, index: number) => (
                        <div key={index} className="flex gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium flex-shrink-0">
                            {step.step}
                          </div>
                          <p className="text-muted-foreground">{step.instruction}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {guide.tips.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Pro Tips</h4>
                      <ul className="space-y-2">
                        {guide.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                            <span className="text-muted-foreground">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-4">
                    {guide.health_benefits.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-green-700">Health Benefits</h4>
                        <div className="space-y-1">
                          {guide.health_benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {guide.precautions.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 text-orange-700">Precautions</h4>
                        <ul className="space-y-1 text-sm">
                          {guide.precautions.map((precaution, index) => (
                            <li key={index} className="text-muted-foreground">
                              • {precaution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Usage guides coming soon.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Health Science Tab */}
      <TabsContent value="science" className="mt-6">
        {healthBenefits.length > 0 ? (
          <div className="space-y-6">
            {healthBenefits.map((benefit) => (
              <Card key={benefit.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{benefit.benefit_title}</CardTitle>
                    <Badge className={getEvidenceLevelColor(benefit.evidence_level)}>
                      {benefit.evidence_level} evidence
                    </Badge>
                  </div>
                  <CardDescription className="text-primary font-medium">
                    {benefit.benefit_category}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.scientific_description}
                  </p>

                  {benefit.dosage_recommendations && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Recommended Dosage</h4>
                      <p className="text-sm text-muted-foreground">
                        {benefit.dosage_recommendations}
                      </p>
                    </div>
                  )}

                  {benefit.research_studies.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3">Research Studies</h4>
                      <div className="space-y-3">
                        {benefit.research_studies.map((study: any, index: number) => (
                          <div key={index} className="border-l-4 border-primary pl-4">
                            <h5 className="font-medium text-sm">{study.title}</h5>
                            <p className="text-xs text-muted-foreground">
                              {study.journal} ({study.year})
                              {study.participants && ` • ${study.participants} participants`}
                              {study.duration && ` • ${study.duration}`}
                            </p>
                            <p className="text-sm mt-1">{study.findings}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">Health research information coming soon.</p>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </Tabs>
  );
};