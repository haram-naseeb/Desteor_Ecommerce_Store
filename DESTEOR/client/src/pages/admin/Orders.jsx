import { useEffect, useState } from 'react';
import Loader from '@/components/ui/Loader';
import { getAdminOrders, updateAdminOrderStatus } from '@/services/admin.service';
import { formatPrice as formatCurrency } from '@/utils/format';
const statuses = ['PENDING', 'PROCESSING', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED'];
const formatDate = (date) =>
  new Intl.DateTimeFormat('en-PK', { dateStyle: 'medium' }).format(new Date(date));
function Orders() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
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
              {['Order Number', 'Customer', 'Status', 'Date', 'Total'].map((h) => (
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
                  {order.user.firstName} {order.user.lastName}
                  <span className="block text-xs opacity-60">{order.user.email}</span>
                </td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => update(order.id, e.target.value)}
                    className="border border-matte-black/20 bg-white px-2 py-1"
                  >
                    {statuses.map((status) => (
                      <option key={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-4">{formatDate(order.createdAt)}</td>
                <td className="p-4">{formatCurrency(order.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Orders;
