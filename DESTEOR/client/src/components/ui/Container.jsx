/**
 * Container
 *
 * Constrains content to a consistent max-width and centers it with
 * responsive horizontal padding. Used inside Sections/pages so every
 * part of the app shares the same content width instead of each page
 * picking its own.
 */
function Container({ children, className = '' }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-6 ${className}`}>{children}</div>
  );
}

export default Container;
