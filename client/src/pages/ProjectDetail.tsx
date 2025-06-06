import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowLeft, Github, ExternalLink, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectType } from "@/components/ProjectCard";

const ProjectDetail = () => {
  const { id } = useParams();
  const projectId = parseInt(id || "0", 10);

  // Fetch project details
  const { data: project, isLoading, error } = useQuery({
    queryKey: [`/api/projects/${projectId}`],
  });

  useEffect(() => {
    if (project) {
      // Update page title
      document.title = `${(project as ProjectType).title} | Zachary Marabeas`;
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", (project as ProjectType).description);
      } else {
        const meta = document.createElement('meta');
        meta.name = "description";
        meta.content = (project as ProjectType).description;
        document.head.appendChild(meta);
      }
    }
  }, [project]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-pulse space-y-4 w-full max-w-3xl">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-80 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
              <div className="h-4 bg-muted rounded w-2/3"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Handle error state
  if (error || !project) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar />
        <div className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The project you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/#projects">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const projectData = project as ProjectType;
  const projectImage = projectData.image.startsWith('http') 
    ? projectData.image 
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <Link 
          href="/#projects"
          onClick={() => {
            // Restore scroll position after navigation
            setTimeout(() => {
              const savedPosition = sessionStorage.getItem('projectsScrollPosition');
              if (savedPosition) {
                window.scrollTo({
                  top: parseInt(savedPosition),
                  behavior: 'smooth'
                });
                sessionStorage.removeItem('projectsScrollPosition');
              }
            }, 100);
          }}
        >
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{projectData.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {projectData.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="mb-8 rounded-lg overflow-hidden h-[400px]">
            <img 
              src={projectImage} 
              alt={projectData.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap gap-4 mb-8">
            {projectData.demoUrl && (
              <a href={projectData.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </a>
            )}
            
            {projectData.githubUrl && (
              <a href={projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Button>
              </a>
            )}
          </div>
          
          <div className="prose dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-li:text-foreground">
            <h2 className="text-foreground">Project Overview</h2>
            <p className="text-lg leading-relaxed text-foreground">{projectData.description}</p>
            
            <h3 className="text-foreground">Technologies Used</h3>
            <ul>
              {projectData.tags.map(tag => (
                <li key={tag} className="text-foreground">{tag}</li>
              ))}
            </ul>
            
            <h3 className="text-foreground">Challenges & Solutions</h3>
            <p className="text-foreground">
              During this project, I had to overcome several technical challenges, 
              including optimizing performance for the large dataset and implementing
              responsive design patterns that work across all device sizes.
            </p>
            
            <h3 className="text-foreground">Key Features</h3>
            <ul>
              <li className="text-foreground">Responsive design that adapts to all screen sizes</li>
              <li className="text-foreground">Performance optimization for smooth user experience</li>
              <li className="text-foreground">Accessibility considerations for all users</li>
              <li className="text-foreground">Interactive UI elements with smooth animations</li>
            </ul>
            
            <h3 className="text-foreground">Lessons Learned</h3>
            <p className="text-foreground">
              This project taught me valuable lessons about state management in complex
              applications and the importance of performance optimization from the start.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProjectDetail;
