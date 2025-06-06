import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";

export interface ProjectType {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const projectImage = project.image.startsWith('http') 
    ? project.image 
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80";

  return (
    <Card 
      className="project-card overflow-hidden h-full bg-card/50 backdrop-blur-sm border-primary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <div 
          className="w-full h-full bg-center bg-cover transform transition-transform duration-700"
          style={{ 
            backgroundImage: `url(${projectImage})`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)'
          }}
        />
        
        {project.featured && (
          <Badge 
            className="absolute top-2 right-2 bg-primary text-white"
          >
            Featured
          </Badge>
        )}
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2 text-foreground">{project.title}</h3>
        
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs bg-primary/10 text-foreground">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="secondary" className="text-xs bg-primary/10 text-foreground">
              +{project.tags.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <Link 
            href={`/project/${project.id}`}
            onClick={() => {
              // Save current scroll position
              sessionStorage.setItem('projectsScrollPosition', window.pageYOffset.toString());
            }}
          >
            <Button variant="ghost" size="sm" className="gap-1 text-foreground hover:text-primary">
              <Eye className="h-4 w-4" />
              Details
            </Button>
          </Link>
          
          <div className="flex gap-2">
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </a>
            )}
            
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Github className="h-4 w-4" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
