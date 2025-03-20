import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogCard, { BlogPost } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';

// Mock blog posts data for entertainment sector
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'The Evolution of Hip-Hop Dance in the Digital Age',
    excerpt: 'How social media platforms like TikTok have transformed hip-hop dance culture, creating new styles and connecting dancers worldwide.',
    content: '<p>Full content here...</p>',
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
  },
  {
    id: '2',
    title: 'Sustainable Fashion: The Celebrities Leading the Movement',
    excerpt: 'A look at how A-list celebrities are using their platforms to promote sustainable fashion choices and drive industry change.',
    content: '<p>Full content here...</p>',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://avatar.vercel.sh/sarah@example.com',
    },
    date: 'April 28, 2023',
    readTime: '8 min read',
    tags: ['Fashion', 'Sustainability', 'Celebrities'],
    image: 'https://images.unsplash.com/photo-1589476993333-f55b84301219?q=80&w=2127&auto=format&fit=crop',
    comments: 24,
  },
  {
    id: '3',
    title: 'The Psychology Behind Sports Fandom: Why We Get So Attached',
    excerpt: 'Exploring the emotional connections fans make with sports teams and how these bonds affect our identities and mental health.',
    content: '<p>Full content here...</p>',
    author: {
      id: '3',
      name: 'Michael Torres',
      avatar: 'https://avatar.vercel.sh/michael@example.com',
    },
    date: 'May 2, 2023',
    readTime: '6 min read',
    tags: ['Sports', 'Psychology', 'Fandom'],
    image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2073&auto=format&fit=crop',
    comments: 18,
  },
  {
    id: '4',
    title: 'K-Pop\'s Global Influence: More Than Just Music',
    excerpt: 'How South Korean pop culture is reshaping global entertainment, fashion trends, and even language learning among international fans.',
    content: '<p>Full content here...</p>',
    author: {
      id: '1',
      name: 'Alex Johnson',
      avatar: 'https://avatar.vercel.sh/alex@example.com',
    },
    date: 'April 15, 2023',
    readTime: '10 min read',
    tags: ['Music', 'K-Pop', 'Cultural Impact'],
    image: 'https://images.unsplash.com/photo-1619229666372-3c586da1e828?q=80&w=2070&auto=format&fit=crop',
    comments: 9,
  },
  {
    id: '5',
    title: 'The Rising Popularity of Vintage Fashion Among Gen Z',
    excerpt: 'Why today\'s youth are embracing fashion trends from decades past, and how vintage shopping is becoming a form of sustainable consumption.',
    content: '<p>Full content here...</p>',
    author: {
      id: '4',
      name: 'Emma Wilson',
      avatar: 'https://avatar.vercel.sh/emma@example.com',
    },
    date: 'March 30, 2023',
    readTime: '7 min read',
    tags: ['Fashion', 'Gen Z', 'Vintage'],
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2176&auto=format&fit=crop',
    comments: 15,
  },
  {
    id: '6',
    title: 'How Streaming Services Are Changing Music Production',
    excerpt: 'The impact of Spotify, Apple Music, and other platforms on song structure, album length, and artistic expression in the music industry.',
    content: '<p>Full content here...</p>',
    author: {
      id: '2',
      name: 'Sarah Chen',
      avatar: 'https://avatar.vercel.sh/sarah@example.com',
    },
    date: 'May 10, 2023',
    readTime: '9 min read',
    tags: ['Music', 'Streaming', 'Industry'],
    image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?q=80&w=2074&auto=format&fit=crop',
    comments: 21,
  },
];

// Entertainment-focused categories
const CATEGORIES = [
  'All',
  'Music',
  'Dance',
  'Fashion',
  'Sports',
  'Movies',
  'TV Shows',
  'Celebrity News'
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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight animate-slide-up bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Your entertainment pulse
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up animation-delay-100">
              inkcircle brings you the latest in music, dance, fashion, and sports — keeping you connected to the entertainment world.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4 animate-slide-up animation-delay-200">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
                <Link to="/signup">Start writing</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/20">
                <Link to="#featured">Explore stories</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Post Section */}
        <section id="featured" className="container px-4 py-16 mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Featured Story
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
        <h2 className="text-2xl md:text-3xl font-display font-bold tracking-tight mb-8 bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
          Entertainment Highlights
        </h2>
        
        <Tabs defaultValue="All" className="w-full">
          <TabsList className="mb-8 flex flex-wrap h-auto bg-transparent border-b w-full justify-start">
            {CATEGORIES.map((category) => (
              <TabsTrigger
                key={category}
                value={category}
                onClick={() => filterPostsByCategory(category)}
                className={`px-4 py-2 rounded-none border-b-2 border-transparent data-[state=active]:border-purple-500 transition-all
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
      <section className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/40 dark:to-pink-950/40 py-20 mt-16">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">
              Share your entertainment story
            </h2>
            <p className="text-muted-foreground text-lg">
              Join our community of writers and readers passionate about music, dance, fashion, and sports.
            </p>
            <Button asChild size="lg" className="mt-6 bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600">
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
