
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
                <Badge key={tag} variant="secondary" className="font-normal text-xs">
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
