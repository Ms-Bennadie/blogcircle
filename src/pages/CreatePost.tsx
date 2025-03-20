
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RichTextEditor from '@/components/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from '@/lib/toast';
import { X, Image, Save, FileText } from 'lucide-react';

const PLACEHOLDER_TAGS = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular', 'Svelte', 
  'Node.js', 'Python', 'Ruby', 'CSS', 'HTML', 'Web Development',
  'Frontend', 'Backend', 'DevOps', 'Design', 'UI/UX', 'Product',
  'Career', 'Productivity', 'Learning'
];

const CreatePost = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isDraft, setIsDraft] = useState(true);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  
  // Local field validation
  const [titleError, setTitleError] = useState('');
  const [contentError, setContentError] = useState('');
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Validate form fields
  const validateForm = () => {
    let isValid = true;
    
    if (!title.trim()) {
      setTitleError('Title is required');
      isValid = false;
    } else {
      setTitleError('');
    }
    
    if (!content.trim() || content === '<p></p>') {
      setContentError('Content is required');
      isValid = false;
    } else {
      setContentError('');
    }
    
    return isValid;
  };

  // Handle tag input
  const handleTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const newTag = tagInput.trim();
    if (newTag && !tags.includes(newTag) && tags.length < 5) {
      setTags([...tags, newTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  // Handle tag suggestion selection
  const handleTagSuggestionSelect = (tag: string) => {
    if (!tags.includes(tag) && tags.length < 5) {
      setTags([...tags, tag]);
    }
  };

  // Filtered tag suggestions
  const filteredTagSuggestions = PLACEHOLDER_TAGS.filter(
    tag => !tags.includes(tag) && tag.toLowerCase().includes(tagInput.toLowerCase())
  ).slice(0, 5);

  // Handle form submission
  const handleSubmit = async (saveAsDraft: boolean) => {
    if (!saveAsDraft && !validateForm()) {
      toast.error('Please fix the errors in your post');
      return;
    }
    
    setIsSaving(true);
    setIsDraft(saveAsDraft);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send data to an API
      console.log({
        title,
        content,
        tags,
        coverImage,
        isDraft: saveAsDraft,
        author: user?.id,
      });
      
      toast.success(
        saveAsDraft 
          ? 'Draft saved successfully' 
          : 'Post published successfully'
      );
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving post:', error);
      toast.error('Failed to save post. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cover image selection
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Remove cover image
  const handleRemoveCoverImage = () => {
    setCoverImage(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Main Editor Column */}
            <div className="flex-grow space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Your post title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-3xl font-display border-none shadow-none focus-visible:ring-0 p-0 placeholder:text-muted-foreground/50"
                />
                {titleError && (
                  <p className="text-sm text-destructive">{titleError}</p>
                )}
              </div>
              
              {/* Cover Image Section */}
              <div className="space-y-2">
                {coverImage ? (
                  <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden bg-muted">
                    <img 
                      src={coverImage} 
                      alt="Cover" 
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="secondary"
                      size="icon"
                      className="absolute top-3 right-3 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background/90"
                      onClick={handleRemoveCoverImage}
                    >
                      <X size={16} />
                    </Button>
                  </div>
                ) : (
                  <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                    <div className="flex flex-col items-center">
                      <Image className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-muted-foreground mb-4">
                        Add a cover image to your post
                      </p>
                      <Label 
                        htmlFor="cover-image" 
                        className="cursor-pointer"
                      >
                        <Button variant="secondary" type="button">
                          Select image
                        </Button>
                        <Input
                          id="cover-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleCoverImageChange}
                        />
                      </Label>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Rich Text Editor */}
              <div className="space-y-2">
                <Card className="border-none shadow-none">
                  <CardContent className="p-0">
                    <RichTextEditor 
                      initialContent={content} 
                      onChange={setContent}
                      placeholder="Start writing your post here..."
                    />
                  </CardContent>
                </Card>
                {contentError && (
                  <p className="text-sm text-destructive">{contentError}</p>
                )}
              </div>
            </div>
            
            {/* Sidebar Column */}
            <div className="w-full md:w-80 shrink-0 space-y-6">
              <Card className="sticky top-24">
                <CardContent className="p-6 space-y-6">
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Publishing as yourself
                      </p>
                    </div>
                  </div>
                  
                  {/* Tags Input */}
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (up to 5)</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {tags.map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button 
                            onClick={() => removeTag(tag)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X size={14} />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <Input
                        id="tags"
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagInputKeyDown}
                        onBlur={addTag}
                        disabled={tags.length >= 5}
                      />
                      
                      {tagInput && filteredTagSuggestions.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 border rounded-md bg-background shadow-md">
                          <ScrollArea className="h-[120px]">
                            <div className="p-1">
                              {filteredTagSuggestions.map((suggestion) => (
                                <button
                                  key={suggestion}
                                  className="w-full text-left px-2 py-1.5 text-sm rounded hover:bg-muted"
                                  onClick={() => handleTagSuggestionSelect(suggestion)}
                                >
                                  {suggestion}
                                </button>
                              ))}
                            </div>
                          </ScrollArea>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Publish Settings */}
                  <div className="space-y-2">
                    <Label htmlFor="post-format">Format</Label>
                    <Select defaultValue="standard">
                      <SelectTrigger id="post-format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Standard</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {/* Actions */}
                  <div className="pt-4 flex flex-col gap-2">
                    <Button
                      onClick={() => handleSubmit(false)}
                      disabled={isSaving}
                      className="w-full"
                    >
                      <FileText size={16} className="mr-2" />
                      {isSaving && !isDraft ? 'Publishing...' : 'Publish Post'}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => handleSubmit(true)}
                      disabled={isSaving}
                      className="w-full"
                    >
                      <Save size={16} className="mr-2" />
                      {isSaving && isDraft ? 'Saving...' : 'Save as Draft'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CreatePost;
