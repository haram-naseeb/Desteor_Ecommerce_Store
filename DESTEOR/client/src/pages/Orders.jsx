import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import { ROUTES } from '@/constants/routes';
import { getOrders } from '@/services/order.service';
import { formatPrice } from '@/utils/format';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadOrders() {
      setLoading(true);
      setError('');

      try {
        const data = await getOrders();
        if (isMounted) setOrders(data);
      } catch (requestError) {
        if (isMounted) {
          setError(requestError.message || 'Unable to load orders.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container className="py-10 md:py-16">
      <div className="border-b border-matte-black/10 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
          Orders
        </p>
        <h1 className="mt-3 text-4xl text-matte-black md:text-5xl">
          Your order history
        </h1>
      </div>

      {error && (
        <div className="mt-6 border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid min-h-96 place-items-center">
          <Loader label="Loading orders" />
        </div>
      ) : orders.length === 0 ? (
        <div className="mx-auto grid min-h-96 max-w-xl place-items-center text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center border border-champagne-gold/50 text-champagne-gold">
              <FiShoppingBag size={26} aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-heading text-3xl text-matte-black">
              No orders yet
            </h2>
            <p className="mt-3 text-sm leading-6 text-matte-black/60">
              Your placed orders will appear here.
            </p>
            <Link to={ROUTES.SHOP} className="mt-7 inline-block">
              <Button variant="secondary">
                Shop Collection
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden border border-matte-black/10 bg-white">
          <div className="hidden grid-cols-[1.2fr_1fr_1fr_1fr_48px] border-b border-matte-black/10 px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-matte-black/55 md:grid">
            <span>Order</span>
            <span>Date</span>
            <span>Status</span>
            <span>Total</span>
            <span />
          </div>
          {orders.map((order) => (
            <Link
              key={order.id}
              to={`${ROUTES.ORDERS}/${order.id}`}
              className="grid gap-3 border-b border-matte-black/10 px-5 py-5 transition last:border-b-0 hover:bg-ivory-white md:grid-cols-[1.2fr_1fr_1fr_1fr_48px] md:items-center"
            >
              <span className="font-semibold text-matte-black">{order.orderNumber}</span>
              <span className="text-sm text-matte-black/62">{order.dateLabel}</span>
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-champagne-gold">
                {order.status}
              </span>
              <span className="font-semibold text-matte-black">
                {formatPrice(order.total)}
              </span>
              <FiArrowUpRight className="hidden text-matte-black/35 md:block" />
            </Link>
          ))}
        </div>
      )}
    </Container>
  );
}

export default Orders;
