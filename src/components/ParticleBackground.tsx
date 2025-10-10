import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Random position and size
      particle.style.left = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.animationDuration = (Math.random() * 8 + 6) + 's';
      particle.style.animationDelay = Math.random() * 5 + 's';
      
      // Random colors
      const colors = [
        'hsl(271 91% 65%)',
        'hsl(192 91% 55%)',
        'hsl(280 85% 60%)',
        'hsl(271 91% 75%)',
        'hsl(192 91% 65%)'
      ];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      container.appendChild(particle);

      // Remove particle after animation
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 15000);
    };

    // Create particles periodically
    const interval = setInterval(createParticle, 2000);
    
    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ overflow: 'hidden' }}
    />
  );
};

export default ParticleBackground;
