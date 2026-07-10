import { motion } from 'framer-motion';
import { FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import QuantityStepper from '@/components/cart/QuantityStepper';
import { formatPrice } from '@/utils/format';

function CartItemRow({ item, disabled, onQuantityChange, onRemove }) {
  const image = item.product.images[0];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="grid gap-5 border border-matte-black/10 bg-white p-4 sm:grid-cols-[120px_1fr] md:p-5"
    >
      <Link
        to={`/shop/${item.product.slug}`}
        className="aspect-square overflow-hidden bg-matte-black/5"
      >
        {image ? (
          <img
            src={image}
            alt={item.product.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="grid h-full place-items-center font-heading text-3xl text-champagne-gold">
            D
          </div>
        )}
      </Link>

      <div className="grid gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-gold">
              {item.product.collectionName || item.product.categoryName}
            </p>
            <Link
              to={`/shop/${item.product.slug}`}
              className="mt-2 block font-heading text-xl text-matte-black transition hover:text-champagne-gold"
            >
              {item.product.name}
            </Link>
            <p className="mt-2 text-sm text-matte-black/58">
              {formatPrice(item.unitPrice)} each
            </p>
          </div>
          <p className="text-lg font-semibold text-matte-black">
            {formatPrice(item.subtotal)}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <QuantityStepper
            value={item.quantity}
            min={0}
            max={item.product.stock}
            disabled={disabled}
            onChange={onQuantityChange}
          />
          <button
            type="button"
            className="inline-flex items-center gap-2 text-sm font-semibold text-matte-black/62 transition hover:text-champagne-gold disabled:cursor-not-allowed disabled:opacity-45"
            disabled={disabled}
            onClick={onRemove}
          >
            <FiTrash2 aria-hidden="true" />
            Remove
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default CartItemRow;
