import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import CursorEffects from "@/components/CursorEffects";
import ScrollProgress from "@/components/ScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";

interface Project {
  name: string;
  description: string;
  url: string;
  emoji: string;
  note: string;
}
/*
const projects: Project[] = [
  {
    name: "Project Alpha",
    description: "A revolutionary web application built with modern technologies",
    url: "https://github.com/your-username/project-alpha",
    emoji: "🚀",
    note: "my first big launch"
  },
  {
    name: "Project Beta",
    description: "Mobile-first design system with elegant animations",
    url: "https://github.com/your-username/project-beta",
    emoji: "✨",
    note: "proud of this one"
  },
  {
    name: "Project Gamma",
    description: "Full-stack platform for seamless user experiences",
    url: "https://github.com/your-username/project-gamma",
    emoji: "⚡",
    note: "built in 3 weeks"
  },
  {
    name: "Project Delta",
    description: "AI-powered tool for productivity enhancement",
    url: "https://github.com/your-username/project-delta",
    emoji: "🤖",
    note: "experimenting with AI"
  },
  {
    name: "Project Epsilon",
    description: "Open-source library for developers worldwide",
    url: "https://github.com/your-username/project-epsilon",
    emoji: "💎",
    note: "giving back to community"
  },
];*/

const Projects = () => {
  // Scroll reveal hooks
  const [headerRef, headerVisible] = useScrollReveal();
  const [projectsRef, projectsVisible] = useScrollReveal();
  
  // Keyboard navigation
  useKeyboardNavigation();
  
  // Magnetic effects
  const magneticRef = useMagneticEffect();

  return (
    <div className="min-h-screen px-4 py-12 relative overflow-hidden">
      <ScrollProgress />
      <CursorEffects />
      
      {/* Animated background orbs with gradient shift */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse gradient-shift" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary-vibrant/20 rounded-full blur-3xl animate-pulse gradient-shift" style={{ animationDelay: "1s" }} />
      
      {/* Subtle card suits decoration - jack of all trades */}
      <div className="absolute top-40 left-24 text-primary/20 text-3xl animate-pulse" style={{ animationDelay: "2.2s" }}>♠</div>
      <div className="absolute top-56 right-20 text-primary-vibrant/15 text-2xl animate-pulse" style={{ animationDelay: "3.2s" }}>♥</div>
      <div className="absolute bottom-40 right-16 text-primary/10 text-2xl animate-pulse" style={{ animationDelay: "4.2s" }}>♦</div>
      <div className="absolute bottom-56 left-24 text-primary-vibrant/20 text-3xl animate-pulse" style={{ animationDelay: "1.7s" }}>♣</div>
      <div className="absolute top-72 right-40 text-primary/15 text-lg animate-pulse" style={{ animationDelay: "2.8s" }}>🃏</div>
      
      <div className="w-full max-w-5xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className={`space-y-8 scroll-reveal ${headerVisible ? 'revealed' : ''}`}>
          <Link
            to="/"
            className="glass-button magnetic inline-flex items-center gap-3 text-foreground/60 hover:text-foreground transition-all duration-300 group backdrop-blur-sm w-fit breathing"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform duration-300" />
            <span className="text-lg font-medium">Back to Home</span>
          </Link>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gradient">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-foreground/60 font-light tracking-wide italic">
              things I've built & shipped ✨
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className={`grid gap-6 md:grid-cols-2 scroll-reveal ${projectsVisible ? 'revealed' : ''}`}>
          {projects.map((project, index) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card magnetic group breathing"
              style={{ 
                animationDelay: `${0.1 * (index + 2)}s`,
                marginLeft: `${index % 2 === 0 ? '0' : '0.5rem'}`
              }}
            >
              <div className="space-y-4 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{project.emoji}</span>
                    <h3 className="text-2xl font-bold group-hover:text-gradient transition-all duration-300">
                      {project.name}
                    </h3>
                  </div>
                  <ExternalLink className="w-6 h-6 text-foreground/50 group-hover:text-primary group-hover:scale-110 transition-all duration-300 flex-shrink-0" />
                </div>
                <p className="text-foreground/70 leading-relaxed text-lg">
                  {project.description}
                </p>
                <p className="text-sm text-foreground/40 italic pt-2">
                  — {project.note}
                </p>
              </div>
              
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-vibrant/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
