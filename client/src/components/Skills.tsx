import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Skills = () => {
  // Technology icons and labels
  const frontendSkills = [
    { name: "JavaScript", icon: "devicon-javascript-plain" },
    { name: "Svelte", icon: "devicon-svelte-plain" },
    { name: "HTML5", icon: "devicon-html5-plain" },
    { name: "CSS3", icon: "devicon-css3-plain" },
    { name: "React", icon: "devicon-react-plain" },
    { name: "TypeScript", icon: "devicon-typescript-plain" },
  ];

  const backendSkills = [
    { name: "Node.js", icon: "devicon-nodejs-plain" },
    { name: "Python", icon: "devicon-python-plain" },
    { name: "C", icon: "devicon-c-plain" },
    { name: "MongoDB", icon: "devicon-mongodb-plain" },
    { name: "Firebase", icon: "devicon-firebase-plain" },
    { name: "Linux", icon: "devicon-linux-plain" },
    { name: "Bash", icon: "devicon-bash-plain" },
  ];

  const toolsSkills = [
    { name: "Git", icon: "devicon-git-plain" },
    { name: "GitHub", icon: "devicon-github-plain" },
    { name: "VS Code", icon: "devicon-vscode-plain" },
    { name: "Arduino", icon: "devicon-arduino-plain" },
    { name: "Twilio", icon: "devicon-nodejs-plain" },
    { name: "APIs", icon: "devicon-fastapi-plain" },
  ];

  // Load the devicon library
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css';
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const renderSkillItems = (skills: { name: string; icon: string }[]) => (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-8">
      {skills.map((skill, index) => (
        <div 
          key={skill.name}
          className="skill-item"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            animationDuration: '0.5s'
          }}
        >
          <i className={`${skill.icon} text-5xl mb-3 text-primary float-animation`} style={{ 
            animationDelay: `${index * 0.2}s`
          }}></i>
          <span className="text-sm font-medium">{skill.name}</span>
        </div>
      ))}
    </div>
  );

  return (
    <section id="skills" className="py-20 section">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-center">My Skills</h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-10">
          I've gained expertise in various technologies across frontend, backend, and development tools.
          Here's a breakdown of my technical skills:
        </p>

        <Tabs defaultValue="frontend" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frontend" className="mt-6">
            <div className="p-4 rounded-lg bg-card/50">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-primary/10">JavaScript</Badge>
                <Badge variant="outline" className="bg-primary/10">Svelte</Badge>
                <Badge variant="outline" className="bg-primary/10">HTML5</Badge>
                <Badge variant="outline" className="bg-primary/10">CSS3</Badge>
                <Badge variant="outline" className="bg-primary/10">React</Badge>
                <Badge variant="outline" className="bg-primary/10">TypeScript</Badge>
                <Badge variant="outline" className="bg-primary/10">UI/UX Design</Badge>
              </div>
              {renderSkillItems(frontendSkills)}
            </div>
          </TabsContent>
          
          <TabsContent value="backend" className="mt-6">
            <div className="p-4 rounded-lg bg-card/50">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-primary/10">Node.js</Badge>
                <Badge variant="outline" className="bg-primary/10">Python</Badge>
                <Badge variant="outline" className="bg-primary/10">C</Badge>
                <Badge variant="outline" className="bg-primary/10">MongoDB</Badge>
                <Badge variant="outline" className="bg-primary/10">Firebase</Badge>
                <Badge variant="outline" className="bg-primary/10">APIs</Badge>
                <Badge variant="outline" className="bg-primary/10">Linux</Badge>
                <Badge variant="outline" className="bg-primary/10">Bash</Badge>
              </div>
              {renderSkillItems(backendSkills)}
            </div>
          </TabsContent>
          
          <TabsContent value="tools" className="mt-6">
            <div className="p-4 rounded-lg bg-card/50">
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge variant="outline" className="bg-primary/10">Git</Badge>
                <Badge variant="outline" className="bg-primary/10">GitHub</Badge>
                <Badge variant="outline" className="bg-primary/10">VS Code</Badge>
                <Badge variant="outline" className="bg-primary/10">Arduino</Badge>
                <Badge variant="outline" className="bg-primary/10">Twilio</Badge>
                <Badge variant="outline" className="bg-primary/10">CAN Bus</Badge>
                <Badge variant="outline" className="bg-primary/10">Robotics</Badge>
                <Badge variant="outline" className="bg-primary/10">Automation</Badge>
              </div>
              {renderSkillItems(toolsSkills)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Skills;
