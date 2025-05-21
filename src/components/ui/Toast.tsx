import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from '../../mocks/confetti';
import type { Options as ConfettiOptions } from '../../mocks/confetti';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
  show: boolean;
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  show, 
  message, 
  type = 'success', 
  duration = 5000, 
  onClose 
}) => {
  // Handle auto-close
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  // Launch confetti for success messages
  useEffect(() => {
    if (show && type === 'success') {
      launchConfetti();
    }
  }, [show, type]);

  const launchConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 9999,
    };

    function fire(particleRatio: number, opts: ConfettiOptions) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      origin: { x: 0.2, y: 0.9 }
    });

    fire(0.2, {
      spread: 60,
      origin: { x: 0.5, y: 0.9 }
    });

    fire(0.35, {
      spread: 100,
      decay: 0.91,
      origin: { x: 0.8, y: 0.9 }
    });

    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      origin: { x: 0.5, y: 0.9 }
    });
  };

  // Colors based on type
  const colors = {
    success: 'bg-green-500 dark:bg-green-600 text-white',
    error: 'bg-red-500 dark:bg-red-600 text-white',
    warning: 'bg-yellow-500 dark:bg-yellow-600 text-white',
    info: 'bg-blue-500 dark:bg-blue-600 text-white'
  };

  // Icons based on type
  const icons = {
    success: <i className="ri-check-line text-xl"></i>,
    error: <i className="ri-close-line text-xl"></i>,
    warning: <i className="ri-alert-line text-xl"></i>,
    info: <i className="ri-information-line text-xl"></i>
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed top-6 left-1/2 transform -translate-x-1/2 z-[9999] flex items-center shadow-xl rounded-lg overflow-hidden max-w-md w-full mx-4"
        >
          <div className={`flex items-center p-4 w-full ${colors[type]}`}>
            <span className="flex-shrink-0 mr-3">
              {icons[type]}
            </span>
            <p className="text-sm font-medium flex-1">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
              aria-label="Close notification"
            >
              <i className="ri-close-line"></i>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast; 