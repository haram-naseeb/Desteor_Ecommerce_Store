/**
 * Card
 *
 * Generic content container. Knows nothing about "products" or any
 * feature — just provides consistent surface, padding, and elevation
 * for whatever is composed inside it.
 */
function Card({ children, className = '', hoverable = false, ...rest }) {
  return (
    <div
      className={`
        rounded-2xl border border-matte-black/10 bg-ivory-white/95 p-6 shadow-subtle
        ${hoverable ? 'transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
