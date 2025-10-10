import { useEffect, useRef, useState, useCallback } from 'react';

const CursorEffects = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const animationFrameRef = useRef<number>();

  // Throttled mouse move handler using requestAnimationFrame
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    animationFrameRef.current = requestAnimationFrame(() => {
      setMousePosition({ x: e.clientX, y: e.clientY });
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
      {/* Main cursor dot - optimized with will-change and transform3d */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-primary rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          transform: `translate3d(0, 0, 0) ${isClicking ? 'scale(0.5)' : 'scale(1)'}`,
          opacity: isHovering ? 1 : 0.8,
          willChange: 'transform, opacity',
          transition: 'opacity 0.2s ease-out, transform 0.1s ease-out',
        }}
      />
      
      {/* Cursor ring - optimized */}
      <div
        ref={ringRef}
        className="fixed w-8 h-8 border border-primary/30 rounded-full pointer-events-none z-40"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: `translate3d(0, 0, 0) ${isHovering ? 'scale(1.5)' : 'scale(1)'}`,
          opacity: isHovering ? 0.6 : 0.3,
          willChange: 'transform, opacity',
          transition: 'opacity 0.3s ease-out, transform 0.2s ease-out',
        }}
      />
      
      {/* Subtle glow effect - optimized with reduced blur */}
      <div
        ref={glowRef}
        className="fixed w-16 h-16 bg-primary/10 rounded-full pointer-events-none z-30"
        style={{
          left: mousePosition.x - 32,
          top: mousePosition.y - 32,
          transform: `translate3d(0, 0, 0) ${isHovering ? 'scale(1.2)' : 'scale(0.8)'}`,
          opacity: isHovering ? 0.4 : 0.1,
          willChange: 'transform, opacity',
          transition: 'opacity 0.4s ease-out, transform 0.3s ease-out',
          filter: 'blur(4px)', // Reduced blur for better performance
        }}
      />
    </>
  );
};

export default CursorEffects;
