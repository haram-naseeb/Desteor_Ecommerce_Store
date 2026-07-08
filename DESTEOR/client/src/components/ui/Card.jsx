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
        rounded-card border border-matte-black/10 bg-ivory-white p-6 shadow-subtle
        ${hoverable ? 'transition-shadow duration-300 hover:shadow-elevated' : ''}
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}

export default Card;
