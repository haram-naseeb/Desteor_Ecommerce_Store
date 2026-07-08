/**
 * Loader
 *
 * Brand-consistent loading indicator. Used anywhere the app awaits an
 * async result (API calls in later sprints) — kept as a single shared
 * component so loading states look identical across the whole app.
 */
function Loader({ size = 'md', label = 'Loading' }) {
  const SIZE_CLASSES = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  return (
    <div role="status" className="flex items-center justify-center gap-3">
      <span
        className={`
          inline-block animate-spin rounded-full border-matte-black/20
          border-t-champagne-gold
          ${SIZE_CLASSES[size]}
        `}
      />
      <span className="sr-only">{label}</span>
    </div>
  );
}

export default Loader;
