import { ArrowUpRight, Heart, ShoppingBag } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Button from '@/components/ui/Button';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/hooks/useCart';
import { useWishlist } from '@/hooks/useWishlist';
import { useToast } from '@/hooks/useToast';
import { formatPrice } from '@/utils/format';

function ProductCard({ product }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const { addItem, mutatingItemId } = useCart();
  const { hasItem, mutatingProductId, toggleItem } = useWishlist();
  const { showToast } = useToast();
  const isAdding = mutatingItemId === product.id;

  const handleAddToCart = async () => {
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
      showToast('Added to cart.', 'success');
    } catch (requestError) {
      showToast(requestError.message || 'Unable to add item.', 'error');
    }
  };

  const handleWishlist = async () => {
    if (!isAuthenticated) { navigate(ROUTES.LOGIN, { state: { from: { pathname: location.pathname, search: location.search }, pendingWishlistProductId: product.id } }); return; }
    try { const added = await toggleItem(product.id); showToast(added ? 'Saved to your wishlist.' : 'Removed from your wishlist.', 'success'); } catch (requestError) { showToast(requestError.message || 'Unable to update wishlist.', 'error'); }
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-matte-black/10 bg-ivory-white/95 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-glow">
      <Link to={`/shop/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-matte-black/5">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            loading="lazy"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-matte-black/88 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ivory-white shadow-lg backdrop-blur-sm">
              {product.badge}
            </span>
          )}
          <button type="button" onClick={(event) => { event.preventDefault(); handleWishlist(); }} disabled={mutatingProductId === product.id} aria-label={hasItem(product.id) ? 'Remove from wishlist' : 'Add to wishlist'} className={`absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-white/60 bg-white/95 shadow-lg backdrop-blur-sm transition hover:-translate-y-0.5 hover:text-champagne-gold ${hasItem(product.id) ? 'text-champagne-gold' : 'text-matte-black'}`}><Heart className="h-4 w-4" fill={hasItem(product.id) ? 'currentColor' : 'none'} /></button>
        </div>
      </Link>
      <div className="p-6">
        <Link to={`/shop/${product.slug}`} className="block">
          <p className="text-xs uppercase tracking-[0.22em] text-champagne-gold">
            {product.category}
          </p>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h3 className="text-lg leading-snug text-matte-black">{product.name}</h3>
            <ArrowUpRight
              className="mt-1 shrink-0 text-matte-black/35 transition group-hover:text-champagne-gold"
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
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link to={`/shop/${product.slug}`} className="block">
            <Button variant="ghost" size="sm" className="w-full">
              Details
            </Button>
          </Link>
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full"
            disabled={product.stock < 1 || isAdding}
            onClick={handleAddToCart}
          >
            <ShoppingBag className="mr-2 h-4 w-4" aria-hidden="true" />
            {isAdding ? 'Adding' : 'Add'}
          </Button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
