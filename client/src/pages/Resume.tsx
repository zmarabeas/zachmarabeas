import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/ZachMarabeas_2025.pdf';
    link.download = 'ZachMarabeas_2025.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      
      <main className="container mx-auto px-4 pt-20 pb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold">Resume</h1>
            <Button onClick={handleDownload} className="gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
          
          <div className="bg-white text-black p-8 rounded-lg shadow-lg">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Zachary Marabeas</h1>
              <p className="text-lg text-gray-600 mb-4">Computer Science Student & Freelance Software Developer</p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span>zmarabeas@gmail.com</span>
                <span>734-751-0417</span>
                <span>github.com/zmarabeas</span>
              </div>
            </div>

            {/* Summary */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Summary</h2>
              <p className="text-gray-700">
                Self-motivated and results-driven software developer with a strong technical background in 
                full-stack development. 3+ years of freelance experience building efficiency-boosting solutions 
                for businesses, with a focus on enhancing productivity and user engagement. Proficient in 
                leading end-to-end development, from gathering requirements to deployment.
              </p>
            </section>

            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Work Experience</h2>
              
              <div className="mb-6">
                <h3 className="font-bold">Software Developer, Great North Finance</h3>
                <p className="text-gray-600 text-sm">March 2024 - Present</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Developed a responsive and engaging website that improved user engagement by 25%.</li>
                  <li>Built lead generation tools to enhance customer acquisition and productivity, integrating APIs for seamless data management.</li>
                  <li>Utilized JavaScript, Svelte, and Firebase for frontend and backend development, ensuring robust performance and scalability.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold">Software Developer, TextBlaster</h3>
                <p className="text-gray-600 text-sm">October 2023 - Present</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Developed a full-stack SMS automation app, "TextBlaster," using Node.js, Svelte, and Firebase, delivering mass text messaging capabilities for businesses.</li>
                  <li>Integrated Twilio APIs for SMS dispatch, real-time analytics, and user management features.</li>
                  <li>Created a user-friendly dashboard for clients to manage their messaging campaigns efficiently.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold">Software Developer, Primo's Pizzeria POS System</h3>
                <p className="text-gray-600 text-sm">February 2021 - August 2023</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Designed and built a full-stack Point of Sale (POS) system tailored to a local pizzeria's needs, utilizing JavaScript, Svelte, and MongoDB.</li>
                  <li>Integrated Heartland API for secure online payment processing and developed features such as menu interfaces and customer data management.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold">Instructor, Schoolcraft College</h3>
                <p className="text-gray-600 text-sm">June 2018 - Present</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Led programming workshops and designed robotics projects focused on autonomous systems and controls, improving students' grasp of STEM subjects.</li>
                  <li>Delivered instruction in JavaScript, Python, and Blocks for programming and robotics courses.</li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="font-bold">Mentor, First Robotics</h3>
                <p className="text-gray-600 text-sm">March 2016 - Present</p>
                <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                  <li>Guided teams through designing autonomous systems and controls for competitive robotics, fostering technical skills in programming and engineering.</li>
                </ul>
              </div>
            </section>

            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Education</h2>
              <div className="mb-4">
                <h3 className="font-bold">Wayne State University & Grand Valley State University</h3>
                <p className="text-gray-600">Bachelor of Computer Science (Graduating December 2025)</p>
              </div>
            </section>

            {/* Skills */}
            <section className="mb-6">
              <h2 className="text-xl font-bold mb-3 border-b-2 border-gray-300 pb-1">Skills</h2>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-1">Programming Languages:</h4>
                  <p className="text-sm text-gray-700">JavaScript, Svelte, Node.js, Python, C, HTML/CSS, Bash, Linux</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Frameworks & Tools:</h4>
                  <p className="text-sm text-gray-700">MongoDB, Firebase, Twilio, APIs, UI/UX Design</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Robotics Expertise:</h4>
                  <p className="text-sm text-gray-700">Arduino, CAN bus, Controls, Autonomy</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Development Focus:</h4>
                  <p className="text-sm text-gray-700">Full-Stack Development, Automation, Productivity Tools, Lead Generation Solutions</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Resume;