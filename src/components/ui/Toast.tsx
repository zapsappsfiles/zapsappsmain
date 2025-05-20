import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

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
      zIndex: 999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
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
    success: 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-700',
    error: 'bg-red-500 dark:bg-red-600 border-red-600 dark:border-red-700',
    warning: 'bg-yellow-500 dark:bg-yellow-600 border-yellow-600 dark:border-yellow-700',
    info: 'bg-blue-500 dark:bg-blue-600 border-blue-600 dark:border-blue-700'
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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-center shadow-xl rounded-lg overflow-hidden"
        >
          <div className={`flex items-center p-4 text-white ${colors[type]}`}>
            <span className="flex-shrink-0 mr-2">
              {icons[type]}
            </span>
            <p className="text-sm font-medium">{message}</p>
            <button
              onClick={onClose}
              className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
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