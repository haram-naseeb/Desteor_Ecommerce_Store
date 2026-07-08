import { motion } from 'framer-motion';

const VARIANT_CLASSES = {
  primary: 'bg-matte-black text-ivory-white hover:bg-matte-black/90',
  secondary:
    'bg-champagne-gold text-matte-black hover:bg-champagne-gold-light',
  ghost:
    'bg-transparent text-matte-black border border-matte-black/20 hover:border-matte-black/40',
};

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
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
        inline-flex items-center justify-center rounded-full font-body font-medium
        tracking-wide transition-colors duration-200
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
