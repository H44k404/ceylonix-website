import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

/**
 * Button
 * -----------------------------------------------------------------------
 * Primary CTA component for the luxury redesign. Variants:
 *  - primary:   solid gold/brand gradient, dark text
 *  - outline:   1px border, fills on hover
 *  - ghost:     text-only, underline grows on hover
 * -----------------------------------------------------------------------
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  showArrow = true,
  ...props
}) => {
  const sizes = {
    small: 'px-5 py-2.5 text-xs',
    medium: 'px-7 py-3.5 text-sm',
    large: 'px-9 py-4 text-sm',
  };

  const base =
    'relative inline-flex items-center justify-center gap-2 font-medium uppercase tracking-[0.2em] transition-colors duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group';

  const variants = {
    primary: 'bg-gradient-to-r from-gold-300 via-brand-500 to-gold-400 text-ink-950 rounded-full',
    outline: 'border border-white/25 text-white rounded-full hover:border-brand-400',
    ghost: 'text-white rounded-none',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {variant === 'outline' && (
        <span className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 rounded-full" />
      )}
      <span className="relative z-10">{children}</span>
      {showArrow && (
        <ArrowUpRight
          className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
        />
      )}
    </motion.button>
  );
};

export default Button;
