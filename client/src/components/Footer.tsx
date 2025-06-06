import { Link } from "wouter";
import { ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/10 py-10">
      <div className="container mx-auto px-4">
        {/* Brand Section - Full Width at Top */}
        <div className="text-center md:text-left mb-8">
          <Link href="/" className="text-2xl font-bold text-primary">
            Zachary Marabeas
          </Link>
          <p className="text-muted-foreground text-sm mt-2">
            Crafting digital experiences with care and precision.
          </p>
        </div>
        
        {/* Navigation and Connect - Left and Right */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Navigation - Left */}
          <div>
            <h4 className="font-semibold mb-3">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Home</a></li>
              <li><a href="#about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projects</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Connect - Right */}
          <div>
            <h4 className="font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <hr className="border-border my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Zachary Marabeas. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop}
            className="mt-4 md:mt-0 flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to top
            <ArrowUp className="ml-2 h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;