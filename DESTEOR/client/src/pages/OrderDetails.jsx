import { useEffect, useState } from 'react';
import { FiAlertTriangle, FiArrowLeft, FiX } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@/components/storefront/Breadcrumbs';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { cancelOrder, getOrderById } from '@/services/order.service';
import { createReview } from '@/services/review.service';
import { useToast } from '@/hooks/useToast';
import { formatPrice } from '@/utils/format';

const TIMELINE = ['PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED'];

function SummaryLine({ label, value, strong = false }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 ${
        strong ? 'text-base font-semibold text-matte-black' : 'text-sm text-matte-black/68'
      }`}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const { showToast } = useToast();

  async function handleCancel() {
    setCancelling(true);
    try {
      const cancelledOrder = await cancelOrder(id);
      setOrder(cancelledOrder);
      setShowCancelDialog(false);
      showToast('Your order has been cancelled.', 'success');
    } catch (requestError) {
      showToast(requestError.message || 'Unable to cancel this order.', 'error');
    } finally {
      setCancelling(false);
    }
  }

  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      setLoading(true);
      setError('');

      try {
        const data = await getOrderById(id);
        if (isMounted) setOrder(data);
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load order.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Container className="grid min-h-[60vh] place-items-center py-20">
        <Loader label="Loading order" />
      </Container>
    );
  }

  if (!order) {
    return (
      <Container className="py-20 text-center">
        <h1 className="font-heading text-4xl text-matte-black">Order not found</h1>
        <p className="mt-4 text-matte-black/60">
          {error || 'This order could not be loaded.'}
        </p>
        <Link
          to={ROUTES.ORDERS}
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-matte-black transition hover:text-champagne-gold"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to orders
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Orders', to: ROUTES.ORDERS },
          { label: order.orderNumber },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        <section>
          <div className="border-b border-matte-black/10 pb-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
              {order.status}
            </p>
            <h1 className="mt-3 text-4xl text-matte-black md:text-5xl">
              {order.orderNumber}
            </h1>
            <p className="mt-3 text-sm text-matte-black/58">{order.dateLabel}</p>
          </div>

          {order.status !== 'CANCELLED' && (
            <ol className="mt-7 grid grid-cols-5 gap-2" aria-label="Order progress">
              {TIMELINE.map((status) => {
                const active = TIMELINE.indexOf(status) <= TIMELINE.indexOf(order.status);
                return <li key={status} className="text-center"><span className={`mx-auto block h-3 w-3 rounded-full ${active ? 'bg-champagne-gold' : 'bg-matte-black/15'}`} /><span className={`mt-2 block text-[10px] font-semibold tracking-wide ${active ? 'text-matte-black' : 'text-matte-black/40'}`}>{status}</span></li>;
              })}
            </ol>
          )}

          <div className="mt-8 space-y-4">
            {order.items.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 border border-matte-black/10 bg-white p-4 sm:grid-cols-[96px_1fr_auto]"
              >
                <div className="aspect-square overflow-hidden bg-matte-black/5">
                  {item.productImageSnapshot ? (
                    <img
                      src={item.productImageSnapshot}
                      alt={item.productNameSnapshot}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-heading text-3xl text-champagne-gold">
                      D
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="font-heading text-xl text-matte-black">
                    {item.productNameSnapshot}
                  </h2>
                  <p className="mt-2 text-sm text-matte-black/58">
                    Quantity {item.quantity} x {formatPrice(item.unitPrice)}
                  </p>
                </div>
                <p className="text-lg font-semibold text-matte-black">
                  {formatPrice(item.subtotal)}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="h-fit border border-matte-black/10 bg-white p-6">
          <h2 className="font-heading text-2xl text-matte-black">Order Total</h2>
          <div className="mt-6 space-y-4">
            <SummaryLine label="Subtotal" value={formatPrice(order.subtotal)} />
            <SummaryLine label="Shipping" value={formatPrice(order.shipping)} />
          </div>
          <div className="mt-6 border-t border-matte-black/10 pt-5">
            <SummaryLine label="Total" value={formatPrice(order.total)} strong />
          </div>
          <div className="mt-6 border-t border-matte-black/10 pt-5 text-sm leading-6 text-matte-black/65">
            <p className="font-semibold text-matte-black">Delivery details</p>
            <p className="mt-2">{order.customerName}<br />{order.phone}<br />{order.address}, {order.city}</p>
            <p className="mt-3"><span className="font-semibold">Payment:</span> {order.paymentMethod === 'ONLINE' ? 'Online Payment' : 'Cash on Delivery'}</p>
            {order.notes && <p className="mt-2"><span className="font-semibold">Notes:</span> {order.notes}</p>}
          </div>
          {order.status === 'DELIVERED' && order.items[0]?.productSlug && (
            <Link
              to={`/shop/${order.items[0].productSlug}`}
              state={{ orderId: order.id }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-champagne-gold/20 bg-champagne-gold/10 px-4 py-2 text-sm font-semibold text-matte-black transition hover:bg-champagne-gold/15"
            >
              Leave product feedback
            </Link>
          )}
          {order.status === 'PENDING' && (
            <button type="button" onClick={() => setShowCancelDialog(true)} className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition hover:border-red-300 hover:bg-red-50">
              <FiX aria-hidden="true" />
              Cancel order
            </button>
          )}
          <Link
            to={ROUTES.ORDERS}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-matte-black/62 transition hover:text-champagne-gold"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to orders
          </Link>
        </aside>
      </div>

      {showCancelDialog && (
        <div className="fixed inset-0 z-[80] grid place-items-center bg-matte-black/45 p-4" role="presentation">
          <div className="w-full max-w-md bg-white p-6 shadow-2xl" role="dialog" aria-modal="true" aria-labelledby="cancel-order-title">
            <FiAlertTriangle className="text-xl text-champagne-gold" aria-hidden="true" />
            <h2 id="cancel-order-title" className="mt-4 font-heading text-2xl text-matte-black">Cancel this order?</h2>
            <p className="mt-3 text-sm leading-6 text-matte-black/65">This will cancel order {order.orderNumber}. It cannot be undone.</p>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setShowCancelDialog(false)} disabled={cancelling} className="rounded-full px-4 py-2 text-sm font-semibold text-matte-black/65 transition hover:text-matte-black disabled:cursor-not-allowed">Keep order</button>
              <button type="button" onClick={handleCancel} disabled={cancelling} className="rounded-full bg-red-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60">{cancelling ? 'Cancelling...' : 'Cancel order'}</button>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

export default OrderDetails;
