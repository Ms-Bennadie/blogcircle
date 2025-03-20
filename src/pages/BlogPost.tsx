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

// Mock post data for entertainment sector
const MOCK_POST: BlogPostType = {
  id: '1',
  title: 'The Evolution of Hip-Hop Dance in the Digital Age',
  excerpt: 'How social media platforms like TikTok have transformed hip-hop dance culture, creating new styles and connecting dancers worldwide.',
  content: `
    <h1>The Evolution of Hip-Hop Dance in the Digital Age</h1>
    <p>The way we consume, create, and share dance has fundamentally changed with the rise of social media platforms. Hip-hop dance, with its rich culture of innovation and self-expression, has found a particularly vibrant home in the digital landscape.</p>
    <h2>From Streets to Screens</h2>
    <p>Hip-hop dance originated in the 1970s alongside the development of hip-hop music in New York City, primarily as a street dance form. It was shared through community gatherings, battles, and in-person cultural exchange. Today, while these traditions continue, the primary vehicle for dance transmission has become the digital screen.</p>
    <p>TikTok, Instagram, and YouTube have created global stages where dancers from different backgrounds and geographic locations can share their interpretations of hip-hop movement, leading to unprecedented cross-cultural influence and evolution.</p>
    <blockquote>The internet didn't just document hip-hop dance culture; it fundamentally transformed how movements are created, named, and popularized. - Dance historian Naomi Johnson</blockquote>
    <h2>The Rise of Viral Dance Challenges</h2>
    <p>Perhaps the most significant digital-age contribution to hip-hop dance is the viral dance challenge. These short, catchy combinations spread rapidly through social networks, creating:</p>
    <ul>
      <li>Mainstream visibility for hip-hop choreographers</li>
      <li>New economic opportunities through brand partnerships</li>
      <li>Accelerated evolution of movement vocabulary</li>
      <li>Cross-generational participation in dance culture</li>
    </ul>
    <p>Choreographers like JaQuel Knight, who created Beyoncé's "Single Ladies" dance, and Keara Wilson, creator of the viral "Savage" TikTok dance, have helped reshape not just hip-hop dance, but pop culture as a whole.</p>
    <h2>Digital Divides and Opportunities</h2>
    <p>While digital platforms have democratized access to hip-hop dance in many ways, they've also created new divisions. Issues of proper attribution have emerged as viral dances cross platforms, with many Black creators not receiving recognition for viral trends they started.</p>
    <p>Simultaneously, these platforms have created unprecedented opportunities for dancers in regions where hip-hop wasn't previously mainstream. From South Korea to Nigeria, regional hip-hop dance scenes have flourished by combining global influences with local movement traditions.</p>
    <p>As we look to the future, the relationship between digital platforms and hip-hop dance culture will continue to evolve, creating both challenges and opportunities for the preservation and innovation of this vibrant cultural expression.</p>
  `,
  author: {
    id: '1',
    name: 'Alex Johnson',
    avatar: 'https://avatar.vercel.sh/alex@example.com',
  },
  date: 'May 15, 2023',
  readTime: '5 min read',
  tags: ['Dance', 'Hip-Hop', 'Digital Culture'],
  image: 'https://images.unsplash.com/photo-1535525153412-5a42439a210d?q=80&w=2070&auto=format&fit=crop',
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
