import React from 'react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  id?: string;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.6,
  once = true,
  threshold = 0.1,
  id,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: once,
    threshold,
  });

  const getDirectionVariants = (): Variants => {
    const variants: Variants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: 'easeOut',
        }
      }
    };

    switch (direction) {
      case 'up':
        variants.hidden = { ...variants.hidden, y: distance };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case 'down':
        variants.hidden = { ...variants.hidden, y: -distance };
        variants.visible = { ...variants.visible, y: 0 };
        break;
      case 'left':
        variants.hidden = { ...variants.hidden, x: distance };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      case 'right':
        variants.hidden = { ...variants.hidden, x: -distance };
        variants.visible = { ...variants.visible, x: 0 };
        break;
      default:
        break;
    }

    return variants;
  };

  return (
    <motion.div
      id={id}
      ref={ref}
      className={className}
      variants={getDirectionVariants()}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection; 