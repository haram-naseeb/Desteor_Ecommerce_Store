import { useState } from 'react';
import { FiArrowUpRight, FiShoppingBag } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/utils/format';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItem, mutatingItemId } = useCart();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const isAdding = mutatingItemId === product.id;

  const handleAddToCart = async () => {
    setMessage('');
    setError('');

    if (!isAuthenticated) {
      navigate(ROUTES.LOGIN, {
        state: {
          from: {
            pathname: location.pathname,
            search: location.search,
          },
          pendingCartItem: {
            productId: product.id,
            quantity: 1,
          },
        },
      });
      return;
    }

    try {
      await addItem({ productId: product.id, quantity: 1 });
      setMessage('Added to cart.');
    } catch (requestError) {
      setError(requestError.message || 'Unable to add item.');
    }
  };

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
      </Link>
      <div className="p-5">
        <Link to={`/shop/${product.slug}`} className="block">
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
        </Link>
        {(message || error) && (
          <p
            className={`mt-4 text-xs font-medium ${
              error ? 'text-red-600' : 'text-matte-black/58'
            }`}
          >
            {error || message}
          </p>
        )}
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/shop/${product.slug}`} className="block">
            <Button variant="ghost" size="sm" className="w-full rounded-none">
              Details
            </Button>
          </Link>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full rounded-none"
            disabled={product.stock < 1 || isAdding}
            onClick={handleAddToCart}
          >
            <FiShoppingBag className="mr-2" aria-hidden="true" />
            {isAdding ? 'Adding' : 'Add'}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
