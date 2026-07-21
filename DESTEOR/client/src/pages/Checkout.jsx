import { useMemo, useState } from 'react';
import { FiArrowLeft, FiCheckCircle, FiCreditCard, FiTruck } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import Breadcrumbs from '@/components/storefront/Breadcrumbs';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';
import Loader from '@/components/ui/Loader';
import Input from '@/components/ui/Input';
import { ROUTES } from '@/constants/routes';
import { useCart } from '@/hooks/useCart';
import { checkout as checkoutOrder } from '@/services/order.service';
import { formatPrice } from '@/utils/format';

const FREE_SHIPPING_THRESHOLD = 5000;
const STANDARD_SHIPPING = 100;

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

function Checkout() {
  const navigate = useNavigate();
  const { cart, loading, refreshCart } = useCart();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ customerName: '', phone: '', address: '', city: '', postalCode: '', notes: '', paymentMethod: 'COD' });
  const hasItems = cart.items.length > 0;
  const summary = useMemo(() => {
    const subtotal = cart.summary.subtotal;
    const shipping =
      subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING;

    return {
      subtotal,
      shipping,
      total: subtotal + shipping,
    };
  }, [cart.summary.subtotal]);

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError('');

    try {
      const order = await checkoutOrder(form);
      await refreshCart();
      navigate(`${ROUTES.ORDERS}/${order.id}`, { replace: true });
    } catch (requestError) {
      setError(requestError.message || 'Unable to place order.');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <Container className="py-10 md:py-16">
      <Breadcrumbs
        items={[
          { label: 'Home', to: ROUTES.HOME },
          { label: 'Cart', to: ROUTES.CART },
          { label: 'Checkout' },
        ]}
      />

      <div className="mt-8 border-b border-matte-black/10 pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-champagne-gold">
          Checkout
        </p>
        <h1 className="mt-3 text-4xl text-matte-black md:text-5xl">
          Confirm your order
        </h1>
      </div>

      {loading ? (
        <div className="grid min-h-96 place-items-center">
          <Loader label="Loading checkout" />
        </div>
      ) : !hasItems ? (
        <div className="mx-auto grid min-h-96 max-w-xl place-items-center text-center">
          <div>
            <div className="mx-auto grid h-16 w-16 place-items-center border border-champagne-gold/50 text-champagne-gold">
              <FiCheckCircle size={26} aria-hidden="true" />
            </div>
            <h2 className="mt-6 font-heading text-3xl text-matte-black">
              Your cart is empty
            </h2>
            <p className="mt-3 text-sm leading-6 text-matte-black/60">
              Add a piece to your cart before placing an order.
            </p>
            <Link to={ROUTES.SHOP} className="mt-7 inline-block">
              <Button variant="secondary">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-matte-black/10 bg-white p-6 shadow-subtle">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-champagne-gold">Customer information</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {[['customerName', 'Full Name *'], ['phone', 'Phone Number *'], ['city', 'City *'], ['postalCode', 'Postal Code (optional)']].map(([key, label]) => <Input key={key} required={key !== 'postalCode'} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={label} />)}
                <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Complete Address *" rows="3" className="sm:col-span-2 rounded-xl border border-matte-black/15 bg-ivory-white px-4 py-3 text-sm" />
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Additional notes (optional)" rows="2" className="sm:col-span-2 rounded-xl border border-matte-black/15 bg-ivory-white px-4 py-3 text-sm" />
              </div>
            </div>
            <div className="rounded-3xl border border-matte-black/10 bg-white p-6 shadow-subtle">
              <p className="text-xs font-semibold uppercase tracking-[.25em] text-champagne-gold">Payment method</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[['COD', FiTruck, 'Cash on Delivery', 'Pay when your order arrives.'], ['ONLINE', FiCreditCard, 'Online Payment', 'Transfer payment before shipment.']].map(([value, Icon, title, description]) => <button key={value} type="button" onClick={() => setForm({ ...form, paymentMethod: value })} className={`rounded-3xl border p-5 text-left transition ${form.paymentMethod === value ? 'border-champagne-gold bg-champagne-gold/10' : 'border-matte-black/10'}`}><Icon className="text-champagne-gold" /><p className="mt-3 font-semibold">{title}</p><p className="mt-1 text-sm text-matte-black/60">{description}</p></button>)}
              </div>
              {form.paymentMethod === 'ONLINE' && <div className="mt-4 rounded-2xl border border-champagne-gold/40 bg-champagne-gold/10 p-4 text-sm leading-6 text-matte-black/75"><strong>Online Payment Instructions</strong><br />JazzCash / Easypaisa: <strong>03094178401</strong><br />After placing your order, send the payment screenshot on WhatsApp. Your order is confirmed once payment is verified.</div>}
            </div>
            {cart.items.map((item) => (
              <article
                key={item.id}
                className="grid gap-4 border border-matte-black/10 bg-white p-4 sm:grid-cols-[96px_1fr_auto]"
              >
                <div className="aspect-square overflow-hidden bg-matte-black/5">
                  {item.product.images[0] ? (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="grid h-full place-items-center font-heading text-3xl text-champagne-gold">
                      D
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-champagne-gold">
                    {item.product.categoryName}
                  </p>
                  <h2 className="mt-2 font-heading text-xl text-matte-black">
                    {item.product.name}
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
          </section>

          <aside className="h-fit border border-matte-black/10 bg-white p-6">
            <h2 className="font-heading text-2xl text-matte-black">Order Summary</h2>
            <div className="mt-6 space-y-4">
              <SummaryLine label="Subtotal" value={formatPrice(summary.subtotal)} />
              <SummaryLine label="Shipping" value={formatPrice(summary.shipping)} />
            </div>
            <div className="mt-6 border-t border-matte-black/10 pt-5">
              <SummaryLine label="Total" value={formatPrice(summary.total)} strong />
            </div>
            {summary.shipping === 0 && (
              <p className="mt-4 text-xs leading-5 text-matte-black/55">
                Your order qualifies for complimentary shipping.
              </p>
            )}
            {error && (
              <div className="mt-5 border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {error}
              </div>
            )}
            <Button type="button" variant="secondary" className="mt-6 w-full" disabled={placing} onClick={handlePlaceOrder}>
              {placing ? <Loader size="sm" label="Placing order" /> : 'Place Order'}
            </Button>
            <Link
              to={ROUTES.CART}
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-matte-black/62 transition hover:text-champagne-gold"
            >
              <FiArrowLeft aria-hidden="true" />
              Return to cart
            </Link>
          </aside>
        </div>
      )}
    </Container>
  );
}

export default Checkout;
