import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger 
} from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/ThemeToggle";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [location, setLocation] = useLocation();
  const isMobile = useMobile();
  const { toast } = useToast();

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      // Show name after scrolling past hero section (approximately 80vh)
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/#about" },
    { name: "Skills", path: "/#skills" },
    { name: "Projects", path: "/#projects" },
    { name: "Resume", path: "/#resume" },
    { name: "Contact", path: "/#contact" }
  ];

  const handleNavigation = (path: string) => (e: React.MouseEvent) => {
    if (path.startsWith('/#')) {
      e.preventDefault();
      
      // If we're already on the home page, scroll to section
      if (location === '/') {
        const targetId = path.replace('/#', '');
        const section = document.getElementById(targetId);
        if (section) {
          const headerHeight = 64; // 16 * 4 = 64px (h-16)
          const elementPosition = section.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        // If we're on another page, navigate to home with the hash for later processing
        window.location.href = path;
      }
    }
    // For non-hash links (like /resume), let the Link component handle normally
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md shadow-md transition-all duration-300">
      <div className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link 
          href="/" 
          className="flex items-center group"
          onClick={(e) => {
            // If we're on the home page, just scroll to top
            if (location === '/') {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            }
            // If we're on another page, let the Link navigate normally to home
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 40 40" 
            className="text-primary transition-all duration-500 group-hover:rotate-45"
          >
            <defs>
              <linearGradient id="cubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" className="text-primary" stopColor="currentColor" />
                <stop offset="100%" className="text-primary/50" stopColor="currentColor" />
              </linearGradient>
            </defs>
            
            {/* Back face */}
            <rect 
              x="8" 
              y="8" 
              width="16" 
              height="16" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="opacity-60 transition-all duration-500 group-hover:translate-x-1 group-hover:translate-y-1"
            />
            
            {/* Front face */}
            <rect 
              x="16" 
              y="16" 
              width="16" 
              height="16" 
              fill="url(#cubeGradient)" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="transition-all duration-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
            />
            
            {/* Connecting lines */}
            <line 
              x1="8" 
              y1="8" 
              x2="16" 
              y2="16" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="opacity-70 transition-all duration-500 group-hover:opacity-100"
            />
            <line 
              x1="24" 
              y1="8" 
              x2="32" 
              y2="16" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="opacity-70 transition-all duration-500 group-hover:opacity-100"
            />
            <line 
              x1="8" 
              y1="24" 
              x2="16" 
              y2="32" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="opacity-70 transition-all duration-500 group-hover:opacity-100"
            />
            <line 
              x1="24" 
              y1="24" 
              x2="32" 
              y2="32" 
              stroke="currentColor" 
              strokeWidth="1.5"
              className="opacity-70 transition-all duration-500 group-hover:opacity-100"
            />
          </svg>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            {navLinks.map(link => (
              <div key={link.name} className="relative">
                {link.path.includes('#') ? (
                  <a 
                    href={link.path}
                    onClick={handleNavigation(link.path)}
                    className={`nav-link px-1 py-2 text-sm font-medium transition-colors ${location === link.path ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link 
                    href={link.path} 
                    className={`nav-link px-1 py-2 text-sm font-medium transition-colors ${location === link.path ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
            
            <ThemeToggle />
          </nav>
        )}

        {/* Mobile Navigation */}
        {isMobile && (
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-64">
                <div className="flex flex-col space-y-4 pt-8">
                  {navLinks.map(link => (
                    <div key={link.name}>
                      {link.path.includes('#') ? (
                        <a
                          href={link.path}
                          onClick={handleNavigation(link.path)}
                          className={`block py-2 text-lg font-medium transition-colors ${location === link.path ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
                        >
                          {link.name}
                        </a>
                      ) : (
                        <Link 
                          href={link.path}
                          className={`block py-2 text-lg font-medium transition-colors ${location === link.path ? 'text-primary' : 'text-foreground/80 hover:text-foreground'}`}
                        >
                          {link.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
