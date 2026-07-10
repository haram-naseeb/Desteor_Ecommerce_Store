import { useEffect, useState } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useParams } from 'react-router-dom';

import Breadcrumbs from '@/components/storefront/Breadcrumbs';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { getOrderById } from '@/services/order.service';
import { formatPrice } from '@/utils/format';

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
          <Link
            to={ROUTES.ORDERS}
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-matte-black/62 transition hover:text-champagne-gold"
          >
            <FiArrowLeft aria-hidden="true" />
            Back to orders
          </Link>
        </aside>
      </div>
    </Container>
  );
}

export default OrderDetails;
