import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize GSAP defaults
export const initGSAP = (): void => {
  // Set default ease
  gsap.defaults({
    ease: 'power3.out',
    duration: 1
  });
};

// Smooth scroll to target
export const scrollToSection = (target: string): void => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: 80 // Account for fixed header
    },
    ease: 'power3.inOut'
  });
};

// Parallax effect for background elements
export const createParallaxEffect = (element: string, speed: number = 0.5): ScrollTrigger => {
  const el = document.querySelector(element);
  if (!el) return {} as ScrollTrigger;
  
  return ScrollTrigger.create({
    trigger: el,
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
    onUpdate: (self) => {
      gsap.to(el, {
        y: (self.progress * 100 * speed),
        ease: 'none',
        overwrite: 'auto'
      });
    }
  });
};

// Staggered reveal animation for elements
export const revealElements = (elements: string, stagger: number = 0.1): gsap.core.Timeline => {
  const els = gsap.utils.toArray<HTMLElement>(elements);
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: els[0] as HTMLElement,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .from(els, {
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: stagger,
    ease: 'power3.out'
  });
};

// Text splitting animation
export const animateSplitText = (element: string): gsap.core.Timeline => {
  const el = document.querySelector(element);
  if (!el) return gsap.timeline();
  
  const text = el.textContent || '';
  const chars = text.split('');
  
  // Clear the element and create spans for each character
  el.innerHTML = '';
  chars.forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
    span.style.display = 'inline-block';
    el.appendChild(span);
  });
  
  return gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })
  .from(el.children, {
    y: 100,
    opacity: 0,
    rotateX: -90,
    stagger: 0.03,
    duration: 0.8,
    ease: 'back.out(1.7)'
  });
};

// Set up scroll-triggered animations
export const setupScrollAnimations = (): void => {
  // General reveal animations
  revealElements('.reveal');
  
  // Title animations
  document.querySelectorAll('.animate-title').forEach(el => {
    animateSplitText(`#${el.id}`);
  });
  
  // Parallax effects
  document.querySelectorAll('.parallax-bg').forEach((el, index) => {
    createParallaxEffect(`#${el.id}`, 0.3 + (index * 0.1));
  });
};

// Clean up GSAP animations
export const cleanupGSAP = (): void => {
  ScrollTrigger.getAll().forEach(st => st.kill());
  gsap.globalTimeline.clear();
}; 