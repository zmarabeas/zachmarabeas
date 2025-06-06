import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from "zod";

// Sample projects data
const sampleProjects = [
  {
    id: 1,
    title: "Great North Finance Website",
    description: "Developed a responsive and engaging website that improved user engagement by 25%. Built lead generation tools to enhance customer acquisition and productivity, integrating APIs for seamless data management.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["JavaScript", "Svelte", "Firebase", "Lead Generation", "API Integration"],
    demoUrl: "",
    githubUrl: "https://github.com/zmarabeas",
    featured: true
  },
  {
    id: 2,
    title: "TextBlaster SMS Automation",
    description: "Developed a full-stack SMS automation app delivering mass text messaging capabilities for businesses. Integrated Twilio APIs for SMS dispatch, real-time analytics, and user management features with a user-friendly dashboard.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["Node.js", "Svelte", "Firebase", "Twilio API", "Real-time Analytics"],
    demoUrl: "",
    githubUrl: "https://github.com/zmarabeas",
    featured: true
  },
  {
    id: 3,
    title: "Primo's Pizzeria POS System",
    description: "Designed and built a full-stack Point of Sale system tailored to a local pizzeria's needs. Integrated Heartland API for secure online payment processing and developed features such as menu interfaces and customer data management.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["JavaScript", "Svelte", "MongoDB", "Heartland API", "Payment Processing"],
    demoUrl: "",
    githubUrl: "https://github.com/zmarabeas",
    featured: true
  },
  {
    id: 4,
    title: "Robotics Programming & Control Systems",
    description: "Guided teams through designing autonomous systems and controls for competitive robotics. Led programming workshops focused on autonomous systems using Arduino, CAN bus, and various control algorithms.",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["Arduino", "Python", "C", "CAN Bus", "Autonomous Systems", "Controls"],
    demoUrl: "",
    githubUrl: "https://github.com/zmarabeas",
    featured: false
  },
  {
    id: 5,
    title: "Educational Programming Workshops",
    description: "Led programming workshops and designed robotics projects at Schoolcraft College, improving students' grasp of STEM subjects. Delivered instruction in JavaScript, Python, and block-based programming for robotics courses.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["JavaScript", "Python", "Education", "Robotics", "STEM", "Workshop Design"],
    demoUrl: "",
    githubUrl: "https://github.com/zmarabeas",
    featured: false
  },
  {
    id: 6,
    title: "Budget Tracker",
    description: "A personal finance application for tracking income, expenses, and savings goals. Includes visualization of spending patterns and budget forecasts.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "Redux", "Firebase", "ChartJS"],
    demoUrl: "https://budget.example.com",
    githubUrl: "https://github.com/example/budget",
    featured: false
  },
  {
    id: 7,
    title: "Fitness Tracking App",
    description: "A comprehensive fitness tracking application for monitoring workouts, nutrition, and progress. Includes custom workout plans and achievement badges.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["Angular", "TypeScript", "Firebase", "Health APIs"],
    demoUrl: "https://fitness.example.com",
    githubUrl: "https://github.com/example/fitness",
    featured: false
  },
  {
    id: 8,
    title: "Recipe Sharing Platform",
    description: "A community-driven recipe sharing platform with search, ratings, and user profiles. Features include dietary filters and cooking timers.",
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
    tags: ["React", "Node.js", "MongoDB", "AWS S3"],
    demoUrl: "https://recipes.example.com",
    githubUrl: "https://github.com/example/recipes",
    featured: true
  }
];

const contactSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string()
});

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { method, url } = req;
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (url === '/api/projects' && method === 'GET') {
      return res.status(200).json(sampleProjects);
    }
    
    if (url?.match(/^\/api\/projects\/\d+$/) && method === 'GET') {
      const id = parseInt(url.split('/').pop() || '0', 10);
      const project = sampleProjects.find(p => p.id === id);
      
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      
      return res.status(200).json(project);
    }
    
    if (url === '/api/contact' && method === 'POST') {
      try {
        const validatedData = contactSchema.parse(req.body);
        
        // Log contact form submission with clear formatting
        console.log("=== NEW CONTACT FORM SUBMISSION ===");
        console.log(`From: ${validatedData.name} (${validatedData.email})`);
        console.log(`Subject: ${validatedData.subject}`);
        console.log(`Message: ${validatedData.message}`);
        console.log(`Timestamp: ${new Date().toISOString()}`);
        console.log("================================");
        
        return res.status(200).json({ 
          message: "Thank you for your message! I'll get back to you soon." 
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          return res.status(400).json({ message: "Validation error", errors: error.format() });
        }
        throw error;
      }
    }
    
    return res.status(404).json({ message: "Not found" });
    
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: "Server error" });
  }
}