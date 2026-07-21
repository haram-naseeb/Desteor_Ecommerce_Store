import { useEffect, useState } from 'react';
import Modal from '@/components/ui/Modal';
import Loader from '@/components/ui/Loader';
import { getAdminOrders, updateAdminOrderStatus } from '@/services/admin.service';
import { formatPrice as formatCurrency } from '@/utils/format';
const statuses = ['PENDING', 'CONFIRMED', 'PREPARING', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const formatDate = (date) =>
  new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium' }).format(new Date(date));
function Orders() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const load = () =>
    getAdminOrders()
      .then(setData)
      .catch((err) => setError(err.message));
  useEffect(() => {
    load();
  }, []);
  const update = async (id, status) => {
    try {
      await updateAdminOrderStatus(id, status);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  if (!data) return <Loader />;

  return (
    <>
      <div className="mb-8">
        <p className="font-body text-sm uppercase tracking-[.2em] text-champagne-gold">
          Fulfilment
        </p>
        <h1 className="font-heading text-3xl">Orders</h1>
      </div>
      {error && <p className="mb-4 text-red-700">{error}</p>}
      <div className="overflow-x-auto border border-matte-black/10 bg-white">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-matte-black text-ivory-white">
            <tr>
              {['Order Number', 'Customer', 'Status', 'Date', 'Total', 'Actions'].map((h) => (
                <th key={h} className="p-4">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-4">{order.orderNumber}</td>
                <td className="p-4">
                  {order.customerName || `${order.user?.firstName || 'Guest'} ${order.user?.lastName || ''}`}
                  <span className="block text-xs opacity-60">{order.phone || order.user?.email}</span>
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => setPending({ id: order.id, status: e.target.value })}
                    className="border border-matte-black/20 bg-white px-2 py-1"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4">{formatDate(order.createdAt)}</td>
                <td className="p-4">{formatCurrency(order.total)}</td>
                <td className="p-4">
                  <button
                    type="button"
                    onClick={() => setSelectedOrder(order)}
                    className="rounded-full border border-matte-black/10 bg-white px-3 py-1 text-xs font-semibold text-matte-black transition hover:border-matte-black"
                  >
                    View details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={Boolean(selectedOrder)} onClose={() => setSelectedOrder(null)} title="Order details">
        {selectedOrder ? (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-matte-black/50">Order</p>
                <p className="mt-2 text-sm font-semibold text-matte-black">{selectedOrder.orderNumber}</p>
                <p className="text-sm text-matte-black/70">{formatDate(selectedOrder.createdAt)}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-matte-black/50">Customer</p>
                <p className="mt-2 text-sm font-semibold text-matte-black">{selectedOrder.customerName || `${selectedOrder.user?.firstName || 'Guest'} ${selectedOrder.user?.lastName || ''}`}</p>
                <p className="text-sm text-matte-black/70">{selectedOrder.phone || selectedOrder.user?.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-matte-black/50">Items</h2>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="grid gap-4 rounded-3xl border border-matte-black/10 bg-matte-black/5 p-4 sm:grid-cols-[96px_1fr_auto]">
                    <div className="aspect-square overflow-hidden rounded-3xl bg-white">
                      {item.productImageSnapshot ? (
                        <img
                          src={item.productImageSnapshot}
                          alt={item.productNameSnapshot}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="grid h-full place-items-center text-xl text-matte-black/40">No image</div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-matte-black">{item.productNameSnapshot}</p>
                      <p className="mt-1 text-xs text-matte-black/60">Quantity: {item.quantity}</p>
                      <p className="text-xs text-matte-black/60">Unit price: {formatCurrency(item.unitPrice)}</p>
                    </div>
                    <p className="text-right text-sm font-semibold text-matte-black">{formatCurrency(item.subtotal)}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 rounded-3xl border border-matte-black/10 bg-white p-4">
              <div className="flex items-center justify-between text-sm text-matte-black/70">
                <span>Subtotal</span>
                <span>{formatCurrency(selectedOrder.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-matte-black/70">
                <span>Shipping</span>
                <span>{formatCurrency(selectedOrder.shipping)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-matte-black/10 pt-4 text-base font-semibold text-matte-black">
                <span>Total</span>
                <span>{formatCurrency(selectedOrder.total)}</span>
              </div>
            </div>

            <div className="rounded-3xl border border-matte-black/10 bg-white p-4 text-sm text-matte-black/70">
              <p className="font-semibold text-matte-black">Delivery details</p>
              <p className="mt-2">{selectedOrder.customerName}</p>
              <p>{selectedOrder.phone}</p>
              <p>{selectedOrder.address}</p>
              <p>{selectedOrder.city}</p>
              {selectedOrder.notes && <p className="mt-2">Notes: {selectedOrder.notes}</p>}
            </div>
          </div>
        ) : null}
      </Modal>

      <Modal isOpen={Boolean(pending)} onClose={() => setPending(null)} title="Update order status">
        <p className="text-sm text-matte-black/65">Confirm this fulfilment update? The customer will see the new status in their order history.</p>
        <div className="mt-6 flex justify-end gap-3"><button onClick={() => setPending(null)} className="text-sm">Cancel</button><button onClick={() => { update(pending.id, pending.status); setPending(null); }} className="rounded-xl bg-matte-black px-4 py-2 text-sm text-ivory-white">Confirm</button></div>
      </Modal>
    </>
  );
}
export default Orders;
