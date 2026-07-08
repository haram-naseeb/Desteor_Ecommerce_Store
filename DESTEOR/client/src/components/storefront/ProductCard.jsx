import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import { formatPrice } from '@/utils/format';

function ProductCard({ product }) {
  return (
    <article className="group overflow-hidden border border-matte-black/10 bg-ivory-white shadow-subtle transition duration-300 hover:-translate-y-1 hover:shadow-elevated">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-matte-black/5">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 bg-matte-black px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory-white">
              {product.badge}
            </span>
          )}
        </div>
        <div className="p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-champagne-gold">
            {product.category}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="text-lg leading-snug text-matte-black">{product.name}</h3>
            <FiArrowUpRight
              className="mt-1 shrink-0 text-matte-black/40 transition group-hover:text-champagne-gold"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-matte-black">
            {product.salePrice ? (
              <>
                <span>{formatPrice(product.salePrice)}</span>
                <span className="text-xs font-medium text-matte-black/45 line-through">
                  {formatPrice(product.price)}
                </span>
              </>
            ) : (
              <span>{formatPrice(product.price)}</span>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

export default ProductCard;
