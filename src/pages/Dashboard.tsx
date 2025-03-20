
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { PenSquare, Settings, MoreVertical, Edit, Trash2, Copy, Eye, Search } from 'lucide-react';
import { toast } from '@/lib/toast';
import { BlogPost } from '@/components/BlogCard';

// Mock user posts
const MOCK_USER_POSTS: BlogPost[] = [
  {
    id: '101',
    title: 'Getting Started with React Hooks',
    excerpt: 'Learn the basics of React Hooks and how they can simplify your components.',
    content: '<p>Full content here...</p>',
    author: {
      id: '1',
      name: 'You',
      avatar: '',
    },
    date: 'June 5, 2023',
    readTime: '6 min read',
    tags: ['React', 'JavaScript', 'Hooks'],
    comments: 8,
  },
  {
    id: '102',
    title: 'CSS Grid vs Flexbox: When to Use Each',
    excerpt: 'A comprehensive comparison of two powerful CSS layout systems and their ideal use cases.',
    content: '<p>Full content here...</p>',
    author: {
      id: '1',
      name: 'You',
      avatar: '',
    },
    date: 'May 22, 2023',
    readTime: '7 min read',
    tags: ['CSS', 'Design', 'Frontend'],
    comments: 12,
  },
  {
    id: '103',
    title: 'Introduction to TypeScript for JavaScript Developers',
    excerpt: 'A gentle introduction to TypeScript for developers already familiar with JavaScript.',
    content: '<p>Full content here...</p>',
    author: {
      id: '1',
      name: 'You',
      avatar: '',
    },
    date: 'April 18, 2023',
    readTime: '10 min read',
    tags: ['TypeScript', 'JavaScript', 'Programming'],
    comments: 15,
  },
];

// Mock drafts
const MOCK_DRAFTS: BlogPost[] = [
  {
    id: '201',
    title: 'The Future of Web Components',
    excerpt: 'Exploring the potential of web components in modern web development...',
    content: '<p>Draft content here...</p>',
    author: {
      id: '1',
      name: 'You',
      avatar: '',
    },
    date: 'Last edited June 10, 2023',
    readTime: '4 min read',
    tags: ['Web Components', 'Frontend'],
    comments: 0,
  },
  {
    id: '202',
    title: 'Understanding the JavaScript Event Loop',
    excerpt: 'A deep dive into how the JavaScript event loop works...',
    content: '<p>Draft content here...</p>',
    author: {
      id: '1',
      name: 'You',
      avatar: '',
    },
    date: 'Last edited May 30, 2023',
    readTime: '8 min read',
    tags: ['JavaScript', 'Advanced'],
    comments: 0,
  },
];

const Dashboard = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [drafts, setDrafts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('published');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<string | null>(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/signin');
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Load user posts
  useEffect(() => {
    const loadUserContent = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Set posts with author data from authenticated user
      const postsWithUserData = MOCK_USER_POSTS.map(post => ({
        ...post,
        author: {
          ...post.author,
          name: user?.name || post.author.name,
          avatar: user?.avatar || `https://avatar.vercel.sh/${user?.email}`,
        },
      }));
      
      setPosts(postsWithUserData);
      setDrafts(MOCK_DRAFTS);
    };
    
    if (isAuthenticated) {
      loadUserContent();
    }
  }, [isAuthenticated, user]);

  // Handle post deletion
  const handleDeletePost = (postId: string) => {
    setPostToDelete(postId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (!postToDelete) return;
    
    if (activeTab === 'published') {
      setPosts(posts.filter(post => post.id !== postToDelete));
    } else {
      setDrafts(drafts.filter(draft => draft.id !== postToDelete));
    }
    
    toast.success('Post deleted successfully');
    setDeleteDialogOpen(false);
    setPostToDelete(null);
  };

  // Filter posts based on search term
  const filteredContent = activeTab === 'published'
    ? posts.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : drafts.filter(draft => 
        draft.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        draft.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container px-4 mx-auto">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold">Your Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Manage your posts, drafts, and account settings
              </p>
            </div>
            
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/create-post" className="flex items-center gap-2">
                  <PenSquare size={16} />
                  <span>New Post</span>
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/account" className="flex items-center gap-2">
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Content Tabs and Search */}
          <div className="mb-6 flex flex-col md:flex-row justify-between gap-4">
            <Tabs 
              defaultValue="published" 
              className="w-full"
              onValueChange={setActiveTab}
            >
              <TabsList>
                <TabsTrigger value="published">Published ({posts.length})</TabsTrigger>
                <TabsTrigger value="drafts">Drafts ({drafts.length})</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="relative w-full md:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          {/* Content List */}
          <Tabs defaultValue="published" className="w-full">
            <TabsContent value="published" className="mt-0">
              <div className="space-y-4">
                {filteredContent.length > 0 ? (
                  filteredContent.map((post) => (
                    <Card key={post.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <CardContent className="flex-grow p-6">
                          <Link to={`/post/${post.id}`}>
                            <h3 className="font-display text-xl font-semibold hover:text-foreground/80 transition-colors">
                              {post.title}
                            </h3>
                          </Link>
                          
                          <p className="text-muted-foreground mt-2 line-clamp-2">
                            {post.excerpt}
                          </p>
                          
                          <div className="flex items-center mt-4 text-sm text-muted-foreground">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                            <span className="mx-2">•</span>
                            <span>{post.comments} comments</span>
                          </div>
                        </CardContent>
                        
                        <div className="p-4 md:p-6 flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="flex-1"
                          >
                            <Link to={`/post/${post.id}`} className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>View</span>
                            </Link>
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="sm" 
                            asChild
                            className="flex-1"
                          >
                            <Link to={`/edit-post/${post.id}`} className="flex items-center gap-1">
                              <Edit size={14} />
                              <span>Edit</span>
                            </Link>
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 md:self-end"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="flex items-center gap-2"
                                onClick={() => {
                                  toast.success('Post link copied to clipboard');
                                }}
                              >
                                <Copy size={14} />
                                <span>Copy Link</span>
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-destructive focus:text-destructive"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No published posts found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm 
                        ? `No posts match "${searchTerm}". Try a different search term.` 
                        : "You haven't published any posts yet."}
                    </p>
                    <Button asChild>
                      <Link to="/create-post">Create your first post</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="drafts" className="mt-0">
              <div className="space-y-4">
                {filteredContent.length > 0 ? (
                  filteredContent.map((draft) => (
                    <Card key={draft.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <CardContent className="flex-grow p-6">
                          <h3 className="font-display text-xl font-semibold">
                            {draft.title || 'Untitled Draft'}
                          </h3>
                          
                          <p className="text-muted-foreground mt-2 line-clamp-2">
                            {draft.excerpt || 'No content preview available'}
                          </p>
                          
                          <div className="flex items-center mt-4 text-sm text-muted-foreground">
                            <span>{draft.date}</span>
                          </div>
                        </CardContent>
                        
                        <div className="p-4 md:p-6 flex md:flex-col justify-end gap-2 border-t md:border-t-0 md:border-l">
                          <Button 
                            size="sm" 
                            asChild
                            className="flex-1"
                          >
                            <Link to={`/edit-post/${draft.id}`} className="flex items-center gap-1">
                              <Edit size={14} />
                              <span>Continue Editing</span>
                            </Link>
                          </Button>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 md:self-end"
                              >
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem 
                                className="flex items-center gap-2 text-destructive focus:text-destructive"
                                onClick={() => handleDeletePost(draft.id)}
                              >
                                <Trash2 size={14} />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No drafts found</h3>
                    <p className="text-muted-foreground mb-6">
                      {searchTerm 
                        ? `No drafts match "${searchTerm}". Try a different search term.` 
                        : "You don't have any drafts saved."}
                    </p>
                    <Button asChild>
                      <Link to="/create-post">Start a new draft</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
