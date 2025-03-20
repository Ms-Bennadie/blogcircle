
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

// Mock blog posts data
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Web Design: Minimalism and Functionality',
    excerpt: 'Exploring how modern web design is evolving to prioritize simplicity, accessibility, and user experience, while still maintaining visual appeal and brand identity.',
    content: '<p>Full content here...</p>',
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
  },
  {
    id: '2',
    title: 'Understanding Modern JavaScript: From ES6 to Today',
    excerpt: 'A comprehensive guide to the evolution of JavaScript and how the language has transformed web development practices over the past decade.',
    content: '<p>Full content here...</p>',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://avatar.vercel.sh/sarah@example.com',
    },
    date: 'April 28, 2023',
    readTime: '8 min read',
    tags: ['JavaScript', 'Programming', 'Web Development'],
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
    comments: 24,
  },
  {
    id: '3',
    title: 'The Psychology of User Interfaces: Why Some Designs Just Feel Right',
    excerpt: 'Exploring the cognitive aspects of UI design and how understanding human psychology can help create more intuitive and satisfying user experiences.',
    content: '<p>Full content here...</p>',
    author: {
      id: '3',
      name: 'Michael Torres',
      avatar: 'https://avatar.vercel.sh/michael@example.com',
    },
    date: 'May 2, 2023',
    readTime: '6 min read',
    tags: ['Psychology', 'UI', 'Design'],
    image: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=1826&auto=format&fit=crop',
    comments: 18,
  },
  {
    id: '4',
    title: 'Building Accessible Web Applications: A Practical Guide',
    excerpt: 'A step-by-step approach to incorporating accessibility standards in web development, ensuring applications are usable for everyone.',
    content: '<p>Full content here...</p>',
    author: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://avatar.vercel.sh/alex@example.com',
    },
    date: 'April 15, 2023',
    readTime: '10 min read',
    tags: ['Accessibility', 'Web Development', 'Inclusion'],
    image: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?q=80&w=2070&auto=format&fit=crop',
    comments: 9,
  },
  {
    id: '5',
    title: 'The Rise of Jamstack: Modern Web Architecture Explained',
    excerpt: 'Understanding the benefits and implementation strategies of Jamstack architecture for building faster, more secure, and scalable websites.',
    content: '<p>Full content here...</p>',
    author: {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://avatar.vercel.sh/emma@example.com',
    },
    date: 'March 30, 2023',
    readTime: '7 min read',
    tags: ['Jamstack', 'Architecture', 'Performance'],
    image: 'https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=1826&auto=format&fit=crop',
    comments: 15,
  },
  {
    id: '6',
    title: 'Effective State Management in Modern Frontend Frameworks',
    excerpt: 'Comparing different approaches to managing application state in React, Vue, and Angular, with practical examples and performance considerations.',
    content: '<p>Full content here...</p>',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://avatar.vercel.sh/sarah@example.com',
    },
    date: 'May 10, 2023',
    readTime: '9 min read',
    tags: ['State Management', 'Frontend', 'JavaScript'],
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
    comments: 21,
  },
];

const CATEGORIES = [
  'All',
  'Design',
  'Development',
  'JavaScript',
  'UI/UX',
  'Accessibility',
  'Architecture',
];

const Index = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  // Simulate loading data from API
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set featured post (first post in our mock data)
      setFeaturedPost(MOCK_POSTS[0]);
      
      // Set the rest of the posts
      setPosts(MOCK_POSTS.slice(1));
      
      setIsLoading(false);
    };
    
    loadPosts();
  }, []);

  // Filter posts by category
  const filterPostsByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setPosts(MOCK_POSTS.slice(1));
      setFeaturedPost(MOCK_POSTS[0]);
      return;
    }
    
    // Filter posts including the featured post
    const filteredPosts = MOCK_POSTS.filter(
      post => post.tags?.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
    );
    
    if (filteredPosts.length > 0) {
      setFeaturedPost(filteredPosts[0]);
      setPosts(filteredPosts.slice(1));
    } else {
      setFeaturedPost(null);
      setPosts([]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="container px-4 py-12 mx-auto">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight animate-slide-up">
              Explore ideas, share stories
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-100">
              inkcircle is a minimalist blog platform focused on what truly matters — your content and the conversations it inspires.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-slide-up animation-delay-200">
              <Button asChild size="lg">
                <Link to="/signup">Start writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="#featured">Explore posts</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Post Section */}
        <section id="featured" className="container px-4 py-16 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight">
              Featured Post
            </h2>
            <Link to="#" className="text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
              <span>View all</span>
              <ChevronRight size={16} />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="h-96 w-full bg-muted/30 animate-pulse rounded-lg"></div>
          ) : featuredPost ? (
            <BlogCard post={featuredPost} variant="featured" />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No featured posts available</p>
            </div>
          )}
        </section>
        
        {/* Latest Posts Section */}
        <section className="container px-4 py-16 mx-auto">
          <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-8">
            Latest Posts
          </h2>
          
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent border-b w-full justify-start">
              {CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => filterPostsByCategory(category)}
                  className={`px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-foreground transition-all
                    ${activeCategory === category ? 'text-foreground font-medium' : 'text-muted-foreground'}
                  `}
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            
            <TabsContent value={activeCategory} className="mt-0">
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-80 bg-muted/30 animate-pulse rounded-lg"></div>
                  ))}
                </div>
              ) : posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No posts available in this category</p>
                </div>
              )}
              
              {posts.length > 0 && (
                <div className="flex justify-center mt-12">
                  <Button variant="outline" size="lg">
                    Load more
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </section>
        
        {/* Call to Action */}
        <section className="bg-muted/50 py-20 mt-16">
          <div className="container px-4 mx-auto text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">
                Ready to share your story?
              </h2>
              <p className="text-muted-foreground text-lg">
                Join our community of writers and readers to connect through meaningful content.
              </p>
              <Button asChild size="lg" className="mt-6">
                <Link to="/signup">Get started</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
