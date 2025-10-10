import { useEffect, useRef } from 'react';

export const useTouchGestures = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let startY = 0;
    let startX = 0;
    let isScrolling = false;

    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
      startX = e.touches[0].clientX;
      isScrolling = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isScrolling) {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const diffY = Math.abs(currentY - startY);
        const diffX = Math.abs(currentX - startX);

        if (diffY > diffX) {
          isScrolling = true;
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling) return;

      const endY = e.changedTouches[0].clientY;
      const endX = e.changedTouches[0].clientX;
      const diffY = startY - endY;
      const diffX = startX - endX;

      // Swipe up - could trigger refresh or next section
      if (Math.abs(diffY) > Math.abs(diffX) && diffY > 50) {
        // Add haptic feedback if supported
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }

      // Swipe down - could trigger back or previous section
      if (Math.abs(diffY) > Math.abs(diffX) && diffY < -50) {
        if ('vibrate' in navigator) {
          navigator.vibrate(50);
        }
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return containerRef;
};
