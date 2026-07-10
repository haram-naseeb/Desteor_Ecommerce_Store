import { AnimatePresence, motion } from 'framer-motion';
import { FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import CartItemRow from '@/components/cart/CartItemRow';
import CartSummary from '@/components/cart/CartSummary';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { useCart } from '@/hooks/useCart';

function Cart() {
  const { cart, clear, error, loading, mutatingItemId, removeItem, updateItem } =
    useCart();
  const hasItems = cart.items.length > 0;
  const disabled = Boolean(mutatingItemId);

  return (
    <Container className="py-10 md:py-16">
      <div className="flex flex-col gap-4 border-b border-matte-black/10 pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
            Shopping Cart
          </p>
          <h1 className="mt-3 text-4xl text-matte-black md:text-5xl">
            Your selected pieces
          </h1>
        </div>
        {hasItems && (
          <button
            type="button"
            className="text-left text-sm font-semibold uppercase tracking-[0.2em] text-matte-black/58 transition hover:text-champagne-gold"
            disabled={disabled}
            onClick={clear}
          >
            Clear cart
          </button>
        )}
      </div>

      {error && (
        <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid min-h-96 place-items-center">
          <Loader label="Loading cart" />
        </div>
      ) : !hasItems ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto grid min-h-96 max-w-xl place-items-center text-center"
        >
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center border border-champagne-gold/50 text-champagne-gold">
              <FiShoppingBag size={26} aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-heading text-3xl text-matte-black">
              Your cart is empty
            </h2>
            <p className="mt-3 text-sm leading-6 text-matte-black/60">
              Explore the collection and add the pieces that feel made for your
              occasion.
            </p>
            <Link to={ROUTES.SHOP} className="mt-7 inline-block">
              <Button variant="secondary" className="rounded-none">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-4">
            <AnimatePresence initial={false}>
              {cart.items.map((item) => (
                <CartItemRow
                  key={item.id}
                  item={item}
                  disabled={mutatingItemId === item.id || mutatingItemId === 'clear'}
                  onQuantityChange={(quantity) => updateItem(item.id, quantity)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </AnimatePresence>
          </div>
          <CartSummary summary={cart.summary} disabled={disabled} />
        </div>
      )}
    </Container>
  );
}

export default Cart;
