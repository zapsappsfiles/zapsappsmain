import { useState, useEffect } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export const useMouseFollow = (delay: number = 0.1) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    // Track mouse position
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    // Smooth follow effect
    let animationFrameId: number;
    
    const smoothFollow = () => {
      const dx = mousePosition.x - smoothPosition.x;
      const dy = mousePosition.y - smoothPosition.y;
      
      setSmoothPosition(prev => ({
        x: prev.x + dx * delay,
        y: prev.y + dy * delay
      }));
      
      animationFrameId = requestAnimationFrame(smoothFollow);
    };
    
    smoothFollow();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, smoothPosition, delay]);

  return smoothPosition;
};

export default useMouseFollow; 