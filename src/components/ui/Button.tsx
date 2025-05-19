import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'text' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  fullWidth = false,
  disabled = false,
  icon,
  iconPosition = 'left',
  href,
  target,
  ariaLabel,
  type = 'button'
}) => {
  const baseClasses = 'font-mono text-xs uppercase tracking-wider transition-all duration-300 relative group flex items-center justify-center';
  
  const getVariantClasses = () => {
    return {
      primary: 'bg-accent text-white shadow-sm hover:shadow-md dark:bg-white dark:text-dark dark:hover:bg-accent dark:hover:text-white',
      outline: 'border border-ink/80 text-ink hover:bg-ink/5 dark:border-white/80 dark:text-white dark:hover:bg-white/10',
      text: 'text-ink hover:text-ink/80 underline-offset-4 hover:underline dark:text-white dark:hover:text-accent',
      ghost: 'text-ink/80 hover:text-ink hover:bg-ink/5 dark:text-white/80 dark:hover:text-white dark:hover:bg-white/10'
    }[variant];
  };
  
  const sizeClasses = {
    sm: 'px-4 py-1.5 text-[10px]',
    md: 'px-6 py-2.5',
    lg: 'px-8 py-3.5 text-sm'
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
    : 'cursor-pointer';
  
  const widthClasses = fullWidth ? 'w-full' : '';
  
  const ButtonContent = () => (
    <>
      <span className="relative z-10 flex items-center justify-center">
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </span>
      
      {variant === 'primary' && (
        <span className="absolute inset-0 w-0 h-full bg-black/20 dark:bg-white/20 transform transition-all duration-300 ease-out group-hover:w-full z-0"></span>
      )}
    </>
  );
  
  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        aria-label={ariaLabel}
        whileHover={{ y: -2 }}
        whileTap={!disabled ? { scale: 0.98 } : {}}
        onClick={!disabled ? onClick : undefined}
        className={`${baseClasses} ${getVariantClasses()} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`}
      >
        <ButtonContent />
      </motion.a>
    );
  }
  
  return (
    <motion.button
      type={type}
      whileHover={{ y: -2 }}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={!disabled ? onClick : undefined}
      className={`${baseClasses} ${getVariantClasses()} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      <ButtonContent />
    </motion.button>
  );
};

export default Button; 