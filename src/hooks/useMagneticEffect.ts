import { useEffect, useRef } from 'react';

export const useMagneticEffect = () => {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      const distance = Math.sqrt(x * x + y * y);
      const maxDistance = 50;
      
      if (distance < maxDistance) {
        const strength = (maxDistance - distance) / maxDistance;
        const moveX = x * strength * 0.3;
        const moveY = y * strength * 0.3;
        
        element.style.setProperty('--mouse-x', `${moveX}px`);
        element.style.setProperty('--mouse-y', `${moveY}px`);
      } else {
        element.style.setProperty('--mouse-x', '0px');
        element.style.setProperty('--mouse-y', '0px');
      }
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--mouse-x', '0px');
      element.style.setProperty('--mouse-y', '0px');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return elementRef;
};
