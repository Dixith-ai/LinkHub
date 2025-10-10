import { useEffect, useRef, useState, useCallback } from 'react';

const CursorEffects = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{x: number, y: number, id: number}>>([]);
  const animationFrameRef = useRef<number>();
  const trailIdRef = useRef(0);

  // Enhanced mouse move handler with trail effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail effect
      setTrail(prev => {
        const newTrail = [...prev, { x: e.clientX, y: e.clientY, id: trailIdRef.current++ }];
        return newTrail.slice(-8); // Keep only last 8 trail points
      });
    });
  }, []);

  // Optimized hover detection
  const handleElementEnter = useCallback(() => setIsHovering(true), []);
  const handleElementLeave = useCallback(() => setIsHovering(false), []);
  const handleMouseDown = useCallback(() => setIsClicking(true), []);
  const handleMouseUp = useCallback(() => setIsClicking(false), []);

  useEffect(() => {
    // Check if user prefers reduced motion or is on mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (prefersReducedMotion || isMobile) return;

    // Add event listeners with passive option for better performance
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mousedown', handleMouseDown, { passive: true });
    document.addEventListener('mouseup', handleMouseUp, { passive: true });

    // Use event delegation instead of individual listeners
    const handleMouseOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .glass-button, .project-card')) {
        setIsHovering(true);
      }
    };

    const handleMouseOut = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], .glass-button, .project-card')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <>
      {/* Magical trail effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed w-1 h-1 bg-primary rounded-full pointer-events-none z-30"
          style={{
            left: point.x - 2,
            top: point.y - 2,
            opacity: (index + 1) / trail.length * 0.8,
            transform: `translate3d(0, 0, 0) scale(${0.3 + (index / trail.length) * 0.7})`,
            willChange: 'transform, opacity',
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
      
      {/* Pulsing outer ring with animation */}
      <div
        ref={ringRef}
        className="fixed w-12 h-12 border border-primary/40 rounded-full pointer-events-none z-40"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
          transform: `translate3d(0, 0, 0) ${isHovering ? 'scale(2)' : 'scale(1)'}`,
          opacity: isHovering ? 0.8 : 0.4,
          willChange: 'transform, opacity',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />
      
      {/* Rotating inner ring */}
      <div
        className="fixed w-6 h-6 border border-primary/60 rounded-full pointer-events-none z-45"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: `translate3d(0, 0, 0) ${isHovering ? 'scale(1.5) rotate(180deg)' : 'scale(1) rotate(0deg)'}`,
          opacity: isHovering ? 0.9 : 0.6,
          willChange: 'transform, opacity',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          animation: 'spin 3s linear infinite',
        }}
      />
      
      {/* Main cursor dot with glow */}
      <div
        ref={cursorRef}
        className="fixed w-3 h-3 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
          transform: `translate3d(0, 0, 0) ${isClicking ? 'scale(0.3)' : isHovering ? 'scale(1.5)' : 'scale(1)'}`,
          opacity: isHovering ? 1 : 0.9,
          willChange: 'transform, opacity',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: isHovering 
            ? '0 0 20px hsl(var(--primary)), 0 0 40px hsl(var(--primary) / 0.5)' 
            : '0 0 10px hsl(var(--primary) / 0.3)',
        }}
      />
      
      {/* Magical glow effect with gradient */}
      <div
        ref={glowRef}
        className="fixed w-20 h-20 rounded-full pointer-events-none z-30"
        style={{
          left: mousePosition.x - 40,
          top: mousePosition.y - 40,
          transform: `translate3d(0, 0, 0) ${isHovering ? 'scale(1.5)' : 'scale(0.8)'}`,
          opacity: isHovering ? 0.6 : 0.2,
          willChange: 'transform, opacity',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, hsl(var(--primary-vibrant) / 0.2) 50%, transparent 100%)',
          filter: 'blur(8px)',
          animation: isHovering ? 'pulse 1.5s ease-in-out infinite' : 'none',
        }}
      />
      
      {/* Floating particles around cursor */}
      {isHovering && (
        <>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="fixed w-1 h-1 bg-primary rounded-full pointer-events-none z-35"
              style={{
                left: mousePosition.x + (Math.cos(i * 2.09) * 20) - 2,
                top: mousePosition.y + (Math.sin(i * 2.09) * 20) - 2,
                opacity: 0.7,
                animation: `float ${1 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                willChange: 'transform, opacity',
              }}
            />
          ))}
        </>
      )}
      
      {/* Click ripple effect */}
      {isClicking && (
        <div
          className="fixed w-16 h-16 border-2 border-primary rounded-full pointer-events-none z-45"
          style={{
            left: mousePosition.x - 32,
            top: mousePosition.y - 32,
            transform: 'translate3d(0, 0, 0) scale(0)',
            opacity: 1,
            willChange: 'transform, opacity',
            animation: 'ripple 0.6s ease-out forwards',
          }}
        />
      )}
    </>
  );
};

export default CursorEffects;
