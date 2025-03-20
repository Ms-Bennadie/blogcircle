
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, UserRound, Lock } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
    
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 blue-gradient-bg">
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
        <Link to="/" className="text-2xl font-display font-bold blue-gradient-text">
          inkcircle
        </Link>
      </div>
      
      <Card className="w-full max-w-md animate-fade-in bg-slate-900/80 border border-blue-500/20 shadow-lg backdrop-blur-lg">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/')}
              className="h-8 w-8 text-blue-400 hover:bg-blue-900/30"
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="text-sm text-blue-400">
              Connected
            </div>
          </div>
          
          <CardTitle className="text-3xl font-display text-center pt-4 text-white">
            Log in
          </CardTitle>
          <CardDescription className="text-center text-blue-300">
            Your favorite social network
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-300">Username</Label>
              <div className="relative">
                <UserRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-slate-800/60 border-blue-500/30 text-white focus:border-blue-400"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-400">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-blue-300">Password</Label>
                <Link 
                  to="/forgot-password" 
                  className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" size={18} />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10 bg-slate-800/60 border-blue-500/30 text-white focus:border-blue-400"
                />
              </div>
              {errors.password && (
                <p className="text-sm text-red-400">{errors.password}</p>
              )}
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Log in'}
            </Button>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-blue-500/20" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-slate-900 px-2 text-blue-300">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                disabled={isLoading}
                className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30"
              >
                Google
              </Button>
              <Button 
                variant="outline" 
                disabled={isLoading}
                className="border-blue-500/30 text-blue-300 hover:bg-blue-900/30"
              >
                GitHub
              </Button>
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <p className="text-sm text-center w-full text-blue-300">
            Don't have an account?{' '}
            <Link 
              to="/signup" 
              className="text-blue-400 font-medium hover:underline transition-all"
            >
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
