import { Variants } from 'framer-motion';

// Common animation variants
export const fadeIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up', delay: number = 0): Variants => {
  return {
    hidden: {
      y: direction === 'up' ? 80 : direction === 'down' ? -80 : 0,
      x: direction === 'left' ? 80 : direction === 'right' ? -80 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        type: 'tween',
        duration: 0.8,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };
};

export const staggerContainer = (staggerChildren?: number, delayChildren?: number): Variants => {
  return {
    hidden: {},
    show: {
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  };
};

export const textVariant = (delay?: number): Variants => {
  return {
    hidden: {
      y: 50,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 1.25,
        delay,
      },
    },
  };
};

export const slideIn = (direction: 'left' | 'right' | 'up' | 'down', type: string, delay: number, duration: number): Variants => {
  return {
    hidden: {
      x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
      y: direction === 'up' ? '100%' : direction === 'down' ? '100%' : 0,
    },
    show: {
      x: 0,
      y: 0,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

export const zoomIn = (delay: number, duration: number): Variants => {
  return {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    show: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'tween',
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  };
};

// Utility function to determine if device is touch-enabled
export const isTouchDevice = (): boolean => {
  return ('ontouchstart' in window) || 
    (navigator.maxTouchPoints > 0) || 
    // @ts-ignore
    (navigator.msMaxTouchPoints > 0);
};

// Utility function to determine if device is mobile
export const isMobile = (): boolean => {
  return window.innerWidth < 768;
};

// Kinetic text effect - splits text into individual letters
export const splitText = (text: string): string[] => {
  return text.split('');
};

// Animate numbers from 0 to target
export const animateNumber = (
  element: HTMLElement, 
  start: number = 0, 
  end: number, 
  duration: number = 1000
): void => {
  let startTimestamp: number | null = null;
  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.innerHTML = currentValue.toString();
    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      element.innerHTML = end.toString();
    }
  };
  window.requestAnimationFrame(step);
}; 