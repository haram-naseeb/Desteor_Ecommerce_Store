/**
 * Typography
 *
 * Enforces the brand's type scale and font pairing (Cinzel headings,
 * Poppins body) in one place, so no page hand-rolls its own heading
 * classes and accidentally drifts off-brand.
 */
const VARIANT_MAP = {
  h1: 'font-heading text-4xl md:text-5xl tracking-wide',
  h2: 'font-heading text-3xl md:text-4xl tracking-wide',
  h3: 'font-heading text-2xl md:text-3xl tracking-wide',
  h4: 'font-heading text-xl md:text-2xl tracking-wide',
  subtitle: 'font-body text-lg text-matte-black/70',
  body: 'font-body text-base text-matte-black/90',
  caption: 'font-body text-sm text-matte-black/60',
};

const DEFAULT_ELEMENT = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle: 'p',
  body: 'p',
  caption: 'span',
};

function Typography({ variant = 'body', as, className = '', children, ...rest }) {
  const Component = as || DEFAULT_ELEMENT[variant];

  return (
    <Component className={`${VARIANT_MAP[variant]} ${className}`} {...rest}>
      {children}
    </Component>
  );
}

export default Typography;
