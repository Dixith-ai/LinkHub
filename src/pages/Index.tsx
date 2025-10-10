import { Link } from "react-router-dom";
import { MessageCircle, Instagram, Github, Linkedin, Mail, FolderGit2, Sparkles, Phone } from "lucide-react";
import profileImage from "../../image/dp.jpg";
import CursorEffects from "@/components/CursorEffects";
import ScrollProgress from "@/components/ScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { useMagneticEffect } from "@/hooks/useMagneticEffect";
import { useState, useEffect } from "react";

const socialLinks = [
  {
    name: "Phone",
    icon: Phone,
    url: "tel:+917338010377",
    color: "hover:text-green-400",
    copyText: "+917338010377",
    copyType: "Phone number"
  },
  {
    name: "WhatsApp",
    icon: MessageCircle,
    url: "https://api.whatsapp.com/send?phone=917338010377&text=Hey%20Dixith,%20I%20am%20%5BEnter%20your%20name%20here%5D%20found%20your%20link%20and%20wanted%20to%20connect%20with%20you.",
    color: "hover:text-green-400",
  },
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://www.instagram.com/dixith.adi/",
    color: "hover:text-pink-400",
  },
  {
    name: "GitHub",
    icon: Github,
    url: "https://github.com/Dixith-ai",
    color: "hover:text-foreground",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: "https://www.linkedin.com/in/dixith-adithya-b9459b213/",
    color: "hover:text-blue-400",
  },
  {
    name: "Gmail",
    icon: Mail,
    url: "mailto:dixithadithya@gmail.com",
    color: "hover:text-red-400",
    copyText: "dixithadithya@gmail.com",
    copyType: "Email"
  },
];

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isTyping, setIsTyping] = useState(false);
  
  // Scroll reveal hooks
  const [profileRef, profileVisible] = useScrollReveal();
  const [socialRef, socialVisible] = useScrollReveal();
  const [projectsRef, projectsVisible] = useScrollReveal();
  
  // Keyboard navigation
  useKeyboardNavigation();
  
  // Magnetic effects
  const magneticRef = useMagneticEffect();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    setIsTyping(true);
    const timer = setTimeout(() => setIsTyping(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Silent copy - no visual feedback as requested
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <ScrollProgress />
      <CursorEffects />
      
      {/* Animated background orbs with gradient shift */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse gradient-shift" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-vibrant/20 rounded-full blur-3xl animate-pulse gradient-shift" style={{ animationDelay: "1s" }} />
      
      {/* Subtle card suits decoration - jack of all trades */}
      <div className="absolute top-32 right-16 text-primary/20 text-4xl animate-pulse" style={{ animationDelay: "2s" }}>♣</div>
      <div className="absolute top-48 left-20 text-primary-vibrant/15 text-2xl animate-pulse" style={{ animationDelay: "3s" }}>♠</div>
      <div className="absolute bottom-32 left-16 text-primary/10 text-3xl animate-pulse" style={{ animationDelay: "4s" }}>♥</div>
      <div className="absolute bottom-48 right-24 text-primary-vibrant/20 text-2xl animate-pulse" style={{ animationDelay: "1.5s" }}>♦</div>
      <div className="absolute top-64 left-32 text-primary/15 text-xl animate-pulse" style={{ animationDelay: "2.5s" }}>🃏</div>
      <div className="absolute bottom-64 right-32 text-primary-vibrant/10 text-lg animate-pulse" style={{ animationDelay: "3.5s" }}>🃏</div>
      
      <main className="w-full max-w-2xl mx-auto space-y-12 relative z-10">
        {/* Profile Section */}
        <div ref={profileRef} className={`text-center space-y-8 scroll-reveal ${profileVisible ? 'revealed' : ''}`}>
          <div className="flex justify-center mb-6">
            <div className="relative group">
              <img
                src={profileImage}
                alt="Dixith Adithya - Developer & Tech Enthusiast"
                className="w-44 h-44 md:w-52 md:h-52 rounded-full object-cover profile-glow transition-all duration-500 group-hover:scale-105 breathing"
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const centerX = rect.left + rect.width / 2;
                  const centerY = rect.top + rect.height / 2;
                  
                  const deltaX = e.clientX - centerX;
                  const deltaY = e.clientY - centerY;
                  
                  const tiltX = (deltaY / rect.height) * 15;
                  const tiltY = (deltaX / rect.width) * -15;
                  
                  e.currentTarget.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
                }}
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary-vibrant/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative inline-block">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight modern-name">
                Dixith Adithya
              </h1>
            </div>
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-foreground font-medium tracking-wider animate-fade-in italic" style={{ animationDelay: "0.2s" }}>
                śūnye gatiḥ
              </p>
              <p className="text-lg text-foreground/50 font-medium">
                {getGreeting()}! 👋
              </p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className={`space-y-3 scroll-reveal ${socialVisible ? 'revealed' : ''}`}>
          {socialLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button magnetic flex items-center justify-center gap-4 group w-full stagger-1"
              style={{ 
                animationDelay: `${0.1 * (index + 4)}s`
              }}
              onClick={(e) => {
                if (link.copyText && link.copyType) {
                  e.preventDefault();
                  copyToClipboard(link.copyText, link.copyType);
                  // Still open the URL after copying
                  window.open(link.url, '_blank');
                }
              }}
            >
              <link.icon className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 ${link.color}`} />
              <span className="font-semibold text-lg tracking-wide">{link.name}</span>
            </a>
          ))}
        </div>

        {/* Projects Button */}
        <div ref={projectsRef} className={`pt-8 scroll-reveal ${projectsVisible ? 'revealed' : ''}`}>
          <Link
            to="/projects"
            className="glass-button magnetic flex items-center justify-center gap-4 bg-gradient-to-r from-primary/20 to-primary-vibrant/20 hover:from-primary/30 hover:to-primary-vibrant/30 border-primary/40 hover:border-primary/60 group relative overflow-hidden w-full breathing"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-vibrant/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <FolderGit2 className="w-6 h-6 relative z-10 group-hover:rotate-6 transition-transform duration-300" />
            <span className="font-bold text-xl tracking-wide relative z-10">View Projects</span>
            <span className="text-sm text-foreground/40 absolute -bottom-6 right-4 italic">✨ things I've built</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center animate-fade-in relative z-10" style={{ animationDelay: "1.2s" }}>
        <p className="text-sm text-foreground/40 tracking-wider">
          © 2025 Dixith Adithya
        </p>
      </footer>
    </div>
  );
};

export default Index;
