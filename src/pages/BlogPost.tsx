
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CommentSection, { Comment } from '@/components/CommentSection';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Clock, MessageSquare, Share2, ThumbsUp, Bookmark, ChevronLeft } from 'lucide-react';
import { toast } from '@/lib/toast';
import { BlogPost as BlogPostType } from '@/components/BlogCard';

// Mock post data
const MOCK_POST: BlogPostType = {
  id: '1',
  title: 'The Future of Web Design: Minimalism and Functionality',
  excerpt: 'Exploring how modern web design is evolving to prioritize simplicity, accessibility, and user experience.',
  content: `
    <h1>The Future of Web Design: Minimalism and Functionality</h1>
    <p>Web design has come a long way since the early days of the internet. From the flashy, animated GIF-laden pages of the late 90s to the sleek, minimalist designs of today, the evolution of web aesthetics reflects broader cultural shifts in how we interact with technology.</p>
    <h2>The Rise of Minimalism</h2>
    <p>Minimalist design principles have dominated web design trends for the past decade. Characterized by clean lines, ample white space, and restrained color palettes, minimalist websites prioritize content and user experience above all else.</p>
    <p>This shift toward simplicity isn't merely aesthetic—it's functional. As users access websites across a multitude of devices with varying screen sizes, minimalist designs adapt more gracefully to different viewing contexts.</p>
    <blockquote>Design is not just what it looks like and feels like. Design is how it works. - Steve Jobs</blockquote>
    <h2>Function Driving Form</h2>
    <p>Today's most successful websites understand that design should serve function. Key elements of this approach include:</p>
    <ul>
      <li>Intuitive navigation that requires minimal cognitive load</li>
      <li>Strategic use of negative space to guide attention</li>
      <li>Typography that enhances readability across devices</li>
      <li>Accessibility considerations built into the design process</li>
    </ul>
    <p>The emphasis on functionality doesn't mean aesthetics are unimportant. Rather, beauty emerges from the elegant solution of problems.</p>
    <h2>Looking Ahead</h2>
    <p>As we look to the future, we can expect web design to become even more focused on creating seamless, accessible experiences. Emerging technologies like voice interfaces, augmented reality, and artificial intelligence will influence how websites function and appear.</p>
    <p>The most forward-thinking designers are already exploring how these technologies can enhance rather than complicate the user experience, maintaining the core principles of minimalism while leveraging new capabilities.</p>
    <p>In conclusion, the future of web design lies not in flashy trends or visual complexity, but in the thoughtful application of design principles that prioritize the user's needs, creating experiences that feel both intuitive and delightful.</p>
  `,
  author: {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://avatar.vercel.sh/alex@example.com',
  },
  date: 'May 15, 2023',
  readTime: '5 min read',
  tags: ['Design', 'Web Development', 'UX'],
  image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
  comments: 12,
};

// Mock comments
const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://avatar.vercel.sh/sarah@example.com',
    },
    content: 'Great article! I especially appreciated the point about function driving form. Too many designs prioritize aesthetics at the expense of usability.',
    date: 'May 16, 2023',
    likes: 8,
    isLiked: false,
  },
  {
    id: '2',
    author: {
      id: '3',
      name: 'Michael Torres',
      avatar: 'https://avatar.vercel.sh/michael@example.com',
    },
    content: 'I wonder how AR and VR will affect web design in the coming years. Will we still prioritize minimalism when we have entirely new dimensions to work with?',
    date: 'May 16, 2023',
    likes: 4,
    isLiked: false,
  },
  {
    id: '3',
    author: {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://avatar.vercel.sh/emma@example.com',
    },
    content: 'The Steve Jobs quote is spot on. I think the best designs are those you barely notice because they work so well. Looking forward to more articles in this series!',
    date: 'May 17, 2023',
    likes: 12,
    isLiked: true,
  },
];

const BlogPost = () => {
  const { postId } = useParams<{ postId: string }>();
  const { user } = useAuth();
  
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(36);
  
  // Fetch post data
  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real app, fetch data based on postId
        // For this example, we'll use our mock data
        setPost(MOCK_POST);
        setComments(MOCK_COMMENTS);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPost();
  }, [postId]);
  
  // Handle like/unlike post
  const handleLikePost = () => {
    if (isLiked) {
      setLikeCount(prevCount => prevCount - 1);
    } else {
      setLikeCount(prevCount => prevCount + 1);
    }
    setIsLiked(!isLiked);
  };
  
  // Handle save/unsave post
  const handleSavePost = () => {
    setIsSaved(!isSaved);
    
    if (!isSaved) {
      toast.success('Post saved to your bookmarks');
    } else {
      toast.success('Post removed from your bookmarks');
    }
  };
  
  // Handle share post
  const handleSharePost = () => {
    // In a real app, this would copy the post URL to clipboard
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl">Loading post...</div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16">
          <div className="container px-4 mx-auto text-center max-w-xl py-12">
            <AlertCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-display font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        {/* Back Button */}
        <div className="container px-4 mx-auto">
          <Button 
            variant="ghost" 
            asChild 
            className="mb-6"
          >
            <Link to="/" className="flex items-center gap-1">
              <ChevronLeft size={16} />
              <span>Back to posts</span>
            </Link>
          </Button>
        </div>
        
        {/* Cover Image (if available) */}
        {post.image && (
          <div className="w-full aspect-[3/1] overflow-hidden bg-muted mb-8">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <article className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto">
            {/* Post Header */}
            <header className="mb-8">
              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
                {post.title}
              </h1>
              
              {/* Post Meta */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span>{post.date}</span>
                      <span className="mx-1">•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} />
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Post Content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            
            {/* Post Actions */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-b">
              <div className="flex items-center gap-4">
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLikePost}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp size={16} className={isLiked ? "fill-primary-foreground" : ""} />
                  <span>{likeCount}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSharePost}
                  className="flex items-center gap-2"
                >
                  <Share2 size={16} />
                  <span>Share</span>
                </Button>
                
                <Button 
                  variant={isSaved ? "default" : "outline"}
                  size="sm"
                  onClick={handleSavePost}
                  className="flex items-center gap-2"
                >
                  <Bookmark size={16} className={isSaved ? "fill-primary-foreground" : ""} />
                  <span>{isSaved ? "Saved" : "Save"}</span>
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
                className="flex items-center gap-2"
              >
                <a href="#comments">
                  <MessageSquare size={16} />
                  <span>{post.comments} comments</span>
                </a>
              </Button>
            </div>
            
            {/* Author Info */}
            <div className="mt-12 bg-muted/30 rounded-lg p-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="text-lg">{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">
                    Written by {post.author.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Alex is a web designer and developer with over 10 years of experience creating beautiful, functional websites that prioritize user experience.
                  </p>
                  <Button variant="outline" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Separator */}
            <Separator className="my-12" />
            
            {/* Comments Section */}
            <section id="comments" className="mt-12">
              <CommentSection 
                postId={post.id} 
                initialComments={comments} 
              />
            </section>
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
