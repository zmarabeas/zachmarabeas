import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BinaryTextAnimator } from "@/lib/animation";
import { Link } from "wouter";

interface HeroProps {
  name: string;
  title: string;
}

const Hero = ({ name, title }: HeroProps) => {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      // Start both animations at the same time
      
      // Start animating the name
      if (nameRef.current) {
        const nameAnimator = new BinaryTextAnimator(nameRef.current, name);
        // Configure timing: 30ms between frames, 10 cycles per char
        // 1000ms initial delay, 80ms stagger between character starts (faster)
        nameAnimator.setSpeed(30, 10, 1000, 80);
        nameAnimator.start();
      }
      
      // Start animating the title
      if (titleRef.current) {
        const titleAnimator = new BinaryTextAnimator(titleRef.current, title);
        // Similar timing for title: 30ms between frames, 8 cycles per char
        // 1000ms initial delay, 60ms stagger between character starts (even faster)
        titleAnimator.setSpeed(30, 8, 1000, 60);
        titleAnimator.start(() => {
          // Mark as complete when both are done (title will finish later)
          setAnimationComplete(true);
        });
      }
    }, 600); // Shorter initial delay before starting animations
  }, [name, title]);

  const scrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
      const headerHeight = 64; // 16 * 4 = 64px (h-16)
      const elementPosition = aboutSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 16; // Extra 16px padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section relative flex flex-col justify-center items-center bg-background text-foreground">
      <div className="container mx-auto px-6 py-12 text-center z-10">
        <div className="binary-container mb-6">
          <h1 
            ref={nameRef} 
            className="text-4xl md:text-6xl font-bold tracking-tight mb-2"
            aria-label={name}
          >
            {/* This will be filled by the animation */}
          </h1>
          
          <h2 
            ref={titleRef} 
            className="text-xl md:text-3xl text-muted-foreground font-light mt-4"
            aria-label={title}
          >
            {/* This will be filled by the animation */}
          </h2>
        </div>
        
        <div className={`mt-12 transition-opacity duration-1000 ${animationComplete ? 'opacity-100' : 'opacity-0'}`}>
          <Button
            onClick={(e) => scrollToAbout(e)}
            variant="default"
            className="mt-6 group"
          >
            View My Work
            <ChevronDown className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
          </Button>
        </div>
      </div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5 flex flex-wrap justify-center content-center">
          {Array.from({ length: 100 }).map((_, index) => (
            <div 
              key={index} 
              className="text-xs font-mono opacity-20 p-2"
              style={{ 
                transform: `rotate(${Math.random() * 360}deg)`,
                opacity: Math.random() * 0.2 + 0.1
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </div>
          ))}
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;
