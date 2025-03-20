
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X, PenSquare, User, LogOut } from 'lucide-react';

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on location change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-display font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          blogcircle
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link 
            to="/" 
            className={`text-foreground/80 hover:text-foreground transition-colors ${
              location.pathname === '/' ? 'font-medium text-foreground' : ''
            }`}
          >
            Home
          </Link>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className={`text-foreground/80 hover:text-foreground transition-colors ${
                location.pathname.includes('/dashboard') ? 'font-medium text-foreground' : ''
              }`}
            >
              Dashboard
            </Link>
          )}
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Button asChild variant="ghost" size="sm" className="gap-2">
                <Link to="/create-post">
                  <PenSquare size={16} />
                  <span>Write</span>
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-2 cursor-pointer">
                      <User size={16} />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="flex items-center gap-2 cursor-pointer">
                    <LogOut size={16} />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[60px] bg-background z-40 animate-fade-in">
          <nav className="flex flex-col p-6 space-y-6">
            <Link 
              to="/" 
              className={`text-xl ${location.pathname === '/' ? 'font-semibold' : ''}`}
            >
              Home
            </Link>
            
            {isAuthenticated && (
              <Link 
                to="/dashboard" 
                className={`text-xl ${location.pathname.includes('/dashboard') ? 'font-semibold' : ''}`}
              >
                Dashboard
              </Link>
            )}
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/create-post" 
                  className="flex items-center gap-2 text-xl"
                >
                  <PenSquare size={20} />
                  <span>Write a post</span>
                </Link>
                
                <button 
                  onClick={logout}
                  className="flex items-center gap-2 text-xl text-left"
                >
                  <LogOut size={20} />
                  <span>Log out</span>
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-4">
                <Button asChild size="lg">
                  <Link to="/signin">Sign in</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
