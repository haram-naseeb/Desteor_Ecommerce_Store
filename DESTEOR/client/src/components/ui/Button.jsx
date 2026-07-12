import { motion } from 'framer-motion';

const VARIANT_CLASSES = {
  primary:
    'bg-matte-black text-ivory-white shadow-sm hover:bg-matte-black/90 hover:shadow-lg',
  secondary:
    'bg-champagne-gold text-matte-black shadow-sm hover:bg-champagne-gold-light hover:shadow-lg',
  ghost:
    'border border-matte-black/15 bg-white/60 text-matte-black hover:border-champagne-gold hover:bg-white',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-5 py-3 text-sm',
  lg: 'px-7 py-4 text-base',
};

/**
 * Button
 *
 * Presentation-only primitive. No feature awareness (no "AddToCart"
 * naming) — feature-specific behavior is composed on top of this by
 * pages in later sprints.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  ...rest
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: disabled ? 1 : 0.97 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ duration: 0.15 }}
      className={`
        inline-flex items-center justify-center rounded-xl font-body font-medium
        tracking-wide shadow-sm ring-0 transition-all duration-300
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-champagne-gold/20
        disabled:cursor-not-allowed disabled:opacity-50
        ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}
      `}
      {...rest}
    >
      {children}
    </motion.button>
  );
}

export default Button;
