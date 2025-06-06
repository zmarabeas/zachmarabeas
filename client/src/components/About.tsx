import { useEffect } from "react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Github, Linkedin, Twitter } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-20 bg-muted/10 section">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">About Me</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-primary">Self-motivated Software Developer Building Efficiency Solutions.</h3>
            
            <div className="space-y-4 text-muted-foreground">
              <p>
                I'm a Computer Science student and freelance software developer with 3+ years of experience 
                building efficiency-boosting solutions for businesses. I focus on enhancing productivity 
                and user engagement through full-stack development.
              </p>
              <p>
                With expertise in JavaScript, Svelte, Node.js, and Python, I lead end-to-end development 
                from gathering requirements to deployment. I specialize in automation tools, lead generation 
                solutions, and custom business applications.
              </p>
              <p>
                Currently pursuing my Bachelor of Computer Science (graduating December 2025) while 
                mentoring robotics teams and teaching programming workshops. I believe in creating 
                solutions that make a real impact on business productivity.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="default" asChild>
                <a href="/resume">
                  <FileText className="mr-2 h-4 w-4" />
                  View Resume
                </a>
              </Button>
              
              <div className="flex space-x-3">
                <Button variant="outline" size="icon" aria-label="GitHub" asChild>
                  <a href="https://github.com/zmarabeas" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" aria-label="LinkedIn">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" aria-label="Email" asChild>
                  <a href="mailto:zmarabeas@gmail.com">
                    <FileText className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <h4 className="text-xl font-bold text-primary mb-2">3+</h4>
                <p className="text-sm text-muted-foreground">Years Freelancing</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <h4 className="text-xl font-bold text-primary mb-2">9+</h4>
                <p className="text-sm text-muted-foreground">Years Teaching & Mentoring</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <h4 className="text-xl font-bold text-primary mb-2">5+</h4>
                <p className="text-sm text-muted-foreground">Major Projects Delivered</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur-sm border-primary/10">
              <CardContent className="pt-6">
                <h4 className="text-xl font-bold text-primary mb-2">Dec 2025</h4>
                <p className="text-sm text-muted-foreground">BS Computer Science</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
