import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, ThumbsUp, Flag, Reply } from 'lucide-react';
import { toast } from '@/lib/toast';

export type Comment = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  content: string;
  date: string;
  likes: number;
  isLiked?: boolean;
};

type CommentSectionProps = {
  postId: string;
  initialComments?: Comment[];
};

const CommentSection = ({ 
  postId, 
  initialComments = [] 
}: CommentSectionProps) => {
  const { user, isAuthenticated } = useAuth();
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to comment');
      return;
    }
    
    if (!newComment.trim()) {
      toast.error('Comment cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const comment: Comment = {
        id: Date.now().toString(),
        author: {
          id: user?.id || '',
          name: user?.name || '',
          avatar: user?.avatar,
        },
        content: newComment,
        date: new Date().toLocaleDateString(),
        likes: 0,
      };
      
      setComments([comment, ...comments]);
      setNewComment('');
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLikeComment = (commentId: string) => {
    if (!isAuthenticated) {
      toast.error('Please sign in to like comments');
      return;
    }
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const isLiked = comment.isLiked;
        return {
          ...comment,
          likes: isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !isLiked,
        };
      }
      return comment;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-display font-semibold">
          Comments ({comments.length})
        </h3>
        <MessageSquare size={20} />
      </div>
      
      <Separator />
      
      {/* Comment Form */}
      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <div className="flex gap-4">
          {isAuthenticated && (
            <Avatar className="h-10 w-10">
              <AvatarImage src={user?.avatar} alt={user?.name} />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          )}
          
          <div className="flex-1">
            <Textarea
              placeholder={isAuthenticated ? "Write a comment..." : "Sign in to comment"}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={!isAuthenticated || isSubmitting}
              className="resize-none"
            />
          </div>
        </div>
        
        {isAuthenticated && (
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isSubmitting || !newComment.trim()}
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </div>
        )}
      </form>
      
      {/* Comments List */}
      <div className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <Card key={comment.id} className="animate-fade-in">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{comment.author.name}</p>
                        <p className="text-xs text-muted-foreground">{comment.date}</p>
                      </div>
                    </div>
                    
                    <div className="mt-2">
                      <p>{comment.content}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="p-4 pt-0 flex gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground gap-1"
                  onClick={() => handleLikeComment(comment.id)}
                >
                  <ThumbsUp 
                    size={16} 
                    className={comment.isLiked ? 'fill-foreground' : ''}
                  />
                  <span>{comment.likes}</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground gap-1"
                >
                  <Reply size={16} />
                  <span>Reply</span>
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-muted-foreground hover:text-foreground gap-1 ml-auto"
                >
                  <Flag size={16} />
                  <span>Report</span>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
