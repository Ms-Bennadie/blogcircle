
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  date: string;
  readTime: string;
  tags?: string[];
  image?: string;
  comments: number;
};

type BlogCardProps = {
  post: BlogPost;
  variant?: 'default' | 'featured';
};

// Function to determine badge color based on tag
const getTagColor = (tag: string): string => {
  const tag_lower = tag.toLowerCase();
  if (tag_lower.includes('music') || tag_lower.includes('k-pop') || tag_lower.includes('hip-hop')) {
    return 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800';
  } else if (tag_lower.includes('dance')) {
    return 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600';
  } else if (tag_lower.includes('sports') || tag_lower.includes('fandom')) {
    return 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800';
  } else if (tag_lower.includes('fashion') || tag_lower.includes('style') || tag_lower.includes('trend')) {
    return 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600';
  } else if (tag_lower.includes('movie') || tag_lower.includes('tv') || tag_lower.includes('film')) {
    return 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700';
  } else if (tag_lower.includes('celebrity')) {
    return 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600';
  }
  return '';
};

const BlogCard = ({ post, variant = 'default' }: BlogCardProps) => {
  const isFeatured = variant === 'featured';

  return (
    <Card className={`overflow-hidden border hover:shadow-md transition-all ${
      isFeatured ? 'md:grid md:grid-cols-5 h-full' : ''
    }`}>
      {post.image && (
        <div className={`
          ${isFeatured 
            ? 'md:col-span-2 h-full w-full' 
            : 'w-full aspect-video'
          }
          overflow-hidden bg-muted
        `}>
          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className={`${isFeatured ? 'md:col-span-3' : ''} flex flex-col h-full`}>
        <CardHeader className="p-6 pb-2">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className={`font-normal text-xs ${getTagColor(tag)}`}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          <Link to={`/post/${post.id}`}>
            <h3 className={`font-display font-semibold hover:text-foreground/80 transition-colors ${
              isFeatured ? 'text-2xl' : 'text-xl'
            }`}>
              {post.title}
            </h3>
          </Link>
        </CardHeader>
        
        <CardContent className="p-6 pt-2 flex-grow">
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        
        <CardFooter className="p-6 pt-2 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{post.author.name}</p>
            </div>
          </div>
          
          <div className="flex items-center text-xs text-muted-foreground">
            <span>{post.date}</span>
            <span className="mx-1">•</span>
            <span>{post.readTime}</span>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
};

export default BlogCard;
