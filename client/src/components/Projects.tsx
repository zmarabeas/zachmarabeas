import { useState } from "react";
import ProjectCard, { ProjectType } from "./ProjectCard";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState(6);
  const [filter, setFilter] = useState("all");
  
  // Fetch projects
  const { data: projects = [], isLoading, error } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Debug logging
  console.log('Projects query result:', { projects, isLoading, error });

  // Filter projects based on selected category
  const filteredProjects = (projects as ProjectType[]).filter(project => {
    if (filter === "all") return true;
    return project.tags.includes(filter);
  });

  const loadMore = () => {
    setVisibleProjects(prev => prev + 3);
  };

  // All unique tags for filtering
  const allTags = [...new Set((projects as ProjectType[]).flatMap(p => p.tags))];

  return (
    <section id="projects" className="py-20 bg-muted/10 section">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Projects</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          Check out some of my recent work. Each project represents a unique challenge and solution.
        </p>
        
        {/* Filter buttons */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          <Button 
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          
          {allTags.map(tag => (
            <Button
              key={tag}
              variant={filter === tag ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card/20 animate-pulse rounded-lg h-80"></div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.slice(0, visibleProjects).map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            
            {filteredProjects.length > visibleProjects && (
              <div className="flex justify-center mt-10">
                <Button onClick={loadMore} variant="outline">
                  Load More
                </Button>
              </div>
            )}
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No projects found with the selected filter.</p>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Projects;
