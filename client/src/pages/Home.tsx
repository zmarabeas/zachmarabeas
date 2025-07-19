import { useEffect } from "react";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { setupScrollAnimations } from "@/lib/animation";

const Home = () => {
  useEffect(() => {
    // Set page title and metadata
    document.title = "Zachary Marabeas | Software Developer";
    
    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Zachary Marabeas, Computer Science Student and Freelance Software Developer specializing in full-stack development, automation, and productivity tools.");
    } else {
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = "Zachary Marabeas, Computer Science Student and Freelance Software Developer specializing in full-stack development, automation, and productivity tools.";
      document.head.appendChild(meta);
    }
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Handle hash navigation from other pages
    const handleHashNavigation = () => {
      const hash = window.location.hash;
      if (hash) {
        const targetId = hash.replace('#', '');
        const section = document.getElementById(targetId);
        if (section) {
          setTimeout(() => {
            const headerHeight = 64; // Match navbar height
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      }
    };

    // Handle hash on page load
    handleHashNavigation();
    
    // Handle hash changes
    window.addEventListener('hashchange', handleHashNavigation);
    
    // Restore scroll position when returning from project details
    const restoreScrollPosition = () => {
      const savedScrollPosition = sessionStorage.getItem('projectsScrollPosition');
      if (savedScrollPosition) {
        // Wait for content to load, then restore position
        setTimeout(() => {
          const scrollPos = parseInt(savedScrollPosition);
          window.scrollTo(0, scrollPos);
          // Clear the saved position after using it
          sessionStorage.removeItem('projectsScrollPosition');
        }, 500);
      }
    };

    // Check if we're returning from a project page or use a more reliable method
    const urlParams = new URLSearchParams(window.location.search);
    const fromProject = urlParams.get('from') === 'project' || sessionStorage.getItem('projectsScrollPosition');
    
    if (fromProject) {
      restoreScrollPosition();
    }
    
    return () => {
      window.removeEventListener('hashchange', handleHashNavigation);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="pt-16">
        <Hero 
          name="Zachary Marabeas" 
          title="Computer Science Student & Freelance Software Developer" 
        />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
