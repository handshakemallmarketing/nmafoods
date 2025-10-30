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
import { Heart, MessageSquare, Share2, Camera, Video, FileText, Lightbulb, Plus, Loader2, Star } from 'lucide-react';

interface UserContent {
  id: string;
  user_id: string;
  content_type: 'tip' | 'story' | 'photo' | 'video';
  title: string;
  content: string;
  media_url: string;
  tags: string[];
  featured: boolean;
  likes_count: number;
  approved: boolean;
  created_at: string;
  user_profiles_2024_10_29_13_00?: {
    full_name: string;
    avatar_url?: string;
  };
}

interface UserGeneratedContentProps {
  contentType?: 'tip' | 'story' | 'photo' | 'video' | 'all';
  featured?: boolean;
  limit?: number;
}

export const UserGeneratedContent: React.FC<UserGeneratedContentProps> = ({ 
  contentType = 'all',
  featured = false, 
  limit 
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState<UserContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [showContentDialog, setShowContentDialog] = useState(false);
  
  // Content form state
  const [contentForm, setContentForm] = useState({
    content_type: 'tip' as 'tip' | 'story' | 'photo' | 'video',
    title: '',
    content: '',
    media_url: '',
    tags: [] as string[]
  });

  const contentTypeOptions = [
    { value: 'tip', label: 'Cooking Tip', icon: Lightbulb },
    { value: 'story', label: 'Story', icon: FileText },
    { value: 'photo', label: 'Photo', icon: Camera },
    { value: 'video', label: 'Video', icon: Video }
  ];

  const tagOptions = [
    'Cooking Tips', 'Health Benefits', 'Traditional Recipe', 'Quick & Easy',
    'Family Recipe', 'Wellness', 'Spice Knowledge', 'Cultural Heritage',
    'Beginner Friendly', 'Advanced Technique', 'Seasonal', 'Festive'
  ];

  // Fetch content
  useEffect(() => {
    fetchContent();
  }, [contentType, featured, limit]);

  const fetchContent = async () => {
    try {
      let query = supabase
        .from('user_content_2024_10_29_13_00')
        .select(`
          *,
          user_profiles_2024_10_29_13_00 (
            full_name,
            avatar_url
          )
        `)
        .eq('approved', true)
        .order('created_at', { ascending: false });

      if (contentType !== 'all') {
        query = query.eq('content_type', contentType);
      }

      if (featured) {
        query = query.eq('featured', true);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitContent = async () => {
    if (!user) {
      setShowAuthDialog(true);
      return;
    }

    if (!contentForm.title.trim() || !contentForm.content.trim()) {
      toast({
        title: "Missing Information",
        description: "Please fill in title and content",
        variant: "destructive",
      });
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_content_2024_10_29_13_00')
        .insert({
          user_id: user.id,
          content_type: contentForm.content_type,
          title: contentForm.title,
          content: contentForm.content,
          media_url: contentForm.media_url,
          tags: contentForm.tags,
        });

      if (error) throw error;

      toast({
        title: "Content Submitted",
        description: "Your content has been submitted for review!",
      });

      setContentForm({
        content_type: 'tip',
        title: '',
        content: '',
        media_url: '',
        tags: []
      });
      setShowContentDialog(false);
      fetchContent();
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

  const getContentTypeIcon = (type: string) => {
    const option = contentTypeOptions.find(opt => opt.value === type);
    return option ? option.icon : FileText;
  };

  const getContentTypeLabel = (type: string) => {
    const option = contentTypeOptions.find(opt => opt.value === type);
    return option ? option.label : type;
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
            {featured ? 'Featured Community Content' : 'Community Stories'}
          </h2>
          <p className="text-muted-foreground">
            {featured 
              ? 'Highlighted content from our amazing community' 
              : 'Tips, stories, and experiences shared by our community'
            }
          </p>
        </div>
        
        <Dialog open={showContentDialog} onOpenChange={setShowContentDialog}>
          <DialogTrigger asChild>
            <Button className="premium-gradient text-white">
              <Plus className="h-4 w-4 mr-2" />
              Share Content
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Share Your Content</DialogTitle>
              <DialogDescription>
                Share your cooking tips, stories, or experiences with the community
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Content Type</Label>
                <Select 
                  value={contentForm.content_type} 
                  onValueChange={(value: any) => setContentForm({ ...contentForm, content_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {contentTypeOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {option.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="content-title">Title</Label>
                <Input
                  id="content-title"
                  placeholder="Give your content a catchy title"
                  value={contentForm.title}
                  onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                />
              </div>
              
              <div>
                <Label htmlFor="content-body">Content</Label>
                <Textarea
                  id="content-body"
                  placeholder="Share your tip, story, or experience..."
                  value={contentForm.content}
                  onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                  rows={6}
                />
              </div>
              
              {(contentForm.content_type === 'photo' || contentForm.content_type === 'video') && (
                <div>
                  <Label htmlFor="media-url">Media URL (Optional)</Label>
                  <Input
                    id="media-url"
                    placeholder="https://example.com/your-image-or-video.jpg"
                    value={contentForm.media_url}
                    onChange={(e) => setContentForm({ ...contentForm, media_url: e.target.value })}
                  />
                </div>
              )}
              
              <div>
                <Label>Tags</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {tagOptions.map((tag) => (
                    <Badge
                      key={tag}
                      variant={contentForm.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const newTags = contentForm.tags.includes(tag)
                          ? contentForm.tags.filter(t => t !== tag)
                          : [...contentForm.tags, tag];
                        setContentForm({ ...contentForm, tags: newTags });
                      }}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <Button 
                onClick={submitContent} 
                disabled={submitting}
                className="w-full premium-gradient text-white"
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Share Content
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Content Grid */}
      {content.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-6">
          {content.map((item) => {
            const Icon = getContentTypeIcon(item.content_type);
            return (
              <Card key={item.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={item.user_profiles_2024_10_29_13_00?.avatar_url} />
                        <AvatarFallback>
                          {item.user_profiles_2024_10_29_13_00?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {item.user_profiles_2024_10_29_13_00?.full_name || 'Anonymous'}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Icon className="h-4 w-4" />
                          {getContentTypeLabel(item.content_type)}
                          <span>•</span>
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    {item.featured && (
                      <Badge>
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  
                  {item.media_url && (
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      {item.content_type === 'video' ? (
                        <video
                          src={item.media_url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      ) : (
                        <img
                          src={item.media_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      )}
                    </div>
                  )}
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {item.content}
                  </p>
                  
                  {item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{item.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4 mr-1" />
                        {item.likes_count}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageSquare className="h-4 w-4 mr-1" />
                        Comment
                      </Button>
                    </div>
                    
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No content yet</h3>
          <p className="text-muted-foreground mb-6">
            Be the first to share your cooking tips and stories!
          </p>
          <Button onClick={() => setShowContentDialog(true)} className="premium-gradient text-white">
            Share Your Story
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