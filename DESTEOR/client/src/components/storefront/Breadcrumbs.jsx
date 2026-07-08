import { Link } from 'react-router-dom';

function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-[0.22em]">
      <ol className="flex flex-wrap items-center gap-2 text-matte-black/55">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={item.label} className="flex items-center gap-2">
              {item.to && !isLast ? (
                <Link to={item.to} className="hover:text-champagne-gold">
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? 'text-matte-black' : ''}>{item.label}</span>
              )}
              {!isLast && <span aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
