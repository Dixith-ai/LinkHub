import { useEffect, useRef, useState } from 'react';

const CursorEffects = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .glass-button, .project-card');
    
    const handleElementEnter = () => setIsHovering(true);
    const handleElementLeave = () => setIsHovering(false);

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementEnter);
      el.addEventListener('mouseleave', handleElementLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementEnter);
        el.removeEventListener('mouseleave', handleElementLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 transition-all duration-300 ease-out mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: isClicking ? 'scale(0.5)' : 'scale(1)',
          opacity: isHovering ? 1 : 0.8,
        }}
      />
      
      {/* Cursor ring */}
      <div
        className="fixed w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: isHovering ? 'scale(1.5)' : 'scale(1)',
          opacity: isHovering ? 0.6 : 0.3,
        }}
      />
      
      {/* Subtle glow effect */}
      <div
        className="fixed w-16 h-16 bg-primary/10 rounded-full blur-sm pointer-events-none z-30 transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 32,
          top: mousePosition.y - 32,
          transform: isHovering ? 'scale(1.2)' : 'scale(0.8)',
          opacity: isHovering ? 0.4 : 0.1,
        }}
      />
    </>
  );
};

export default CursorEffects;
