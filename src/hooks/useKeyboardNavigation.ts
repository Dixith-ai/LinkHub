import { useEffect, useRef, useState } from 'react';

export const useKeyboardNavigation = () => {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const elementsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const interactiveElements = document.querySelectorAll('a, button, .glass-button, .project-card');
      const elements = Array.from(interactiveElements) as HTMLElement[];
      
      if (elements.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex(prev => {
            const next = prev + 1;
            return next >= elements.length ? 0 : next;
          });
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex(prev => {
            const prevIndex = prev - 1;
            return prevIndex < 0 ? elements.length - 1 : prevIndex;
          });
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (focusedIndex >= 0 && elements[focusedIndex]) {
            elements[focusedIndex].click();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setFocusedIndex(-1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [focusedIndex]);

  useEffect(() => {
    const interactiveElements = document.querySelectorAll('a, button, .glass-button, .project-card');
    const elements = Array.from(interactiveElements) as HTMLElement[];
    
    elements.forEach((element, index) => {
      if (index === focusedIndex) {
        element.focus();
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }, [focusedIndex]);

  return { focusedIndex, setFocusedIndex };
};
