import { useEffect, useState } from 'react';
import { BarChart3, Boxes, PackageCheck, ShoppingBag } from 'lucide-react';

import Loader from '@/components/ui/Loader';
import { getAdminDashboard } from '@/services/admin.service';

const cards = [
  ['totalProducts', 'Total Products'],
  ['totalOrders', 'Total Orders'],
  ['pending', 'Pending Orders'],
  ['processing', 'Processing'],
  ['packed', 'Packed'],
  ['shipped', 'Shipped'],
  ['delivered', 'Delivered'],
  ['cancelled', 'Cancelled'],
  ['totalUsers', 'Users'],
  ['totalCategories', 'Categories'],
  ['totalCollections', 'Collections'],
];

const colors = ['#c5a46d', '#201e1e', '#e5d4b7', '#826d4b', '#9c8d76', '#b9914c'];

function Chart({ title, data }) {
  const maximum = Math.max(...data.map((item) => item.value), 1);

  return (
    <article className="rounded-2xl border border-matte-black/10 bg-ivory-white/95 p-6 shadow-subtle">
      <h2 className="mb-4 font-heading text-lg text-matte-black">{title}</h2>
      {data.length ? (
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.label}>
              <div className="mb-1 flex justify-between text-xs text-matte-black/60">
                <span>{item.label}</span>
                <span>{item.value}</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-matte-black/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(item.value / maximum) * 100}%`,
                    background: colors[index % colors.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-matte-black/60">No data yet.</p>
      )}
    </article>
  );
}

function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getAdminDashboard().then(setData).catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</p>;
  }

  if (!data) return <Loader />;

  return (
    <>
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-body text-sm uppercase tracking-[.2em] text-champagne-gold">Overview</p>
          <h1 className="font-heading text-3xl text-matte-black">Dashboard</h1>
        </div>
        <div className="hidden gap-3 lg:flex">
          <div className="rounded-2xl border border-matte-black/10 bg-white/80 px-4 py-3 shadow-sm">
            <BarChart3 className="mb-2 h-4 w-4 text-champagne-gold" />
            <p className="text-xs uppercase tracking-[0.2em] text-matte-black/55">Revenue</p>
          </div>
          <div className="rounded-2xl border border-matte-black/10 bg-white/80 px-4 py-3 shadow-sm">
            <ShoppingBag className="mb-2 h-4 w-4 text-champagne-gold" />
            <p className="text-xs uppercase tracking-[0.2em] text-matte-black/55">Sales</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([key, label]) => (
          <article
            key={key}
            className="rounded-2xl border border-matte-black/10 bg-white/90 p-5 shadow-subtle transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated"
          >
            <p className="font-body text-xs uppercase tracking-wider text-matte-black/55">{label}</p>
            <p className="mt-3 font-heading text-3xl text-matte-black">{data[key]}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <Chart title="Orders by status" data={data.charts?.ordersByStatus || []} />
        <Chart title="Products by category" data={data.charts?.productsByCategory || []} />
        <Chart title="Delivered revenue by month" data={data.charts?.monthlyRevenue || []} />
        <article className="rounded-2xl border border-matte-black/10 bg-ivory-white/95 p-6 shadow-subtle xl:col-span-2">
          <div className="flex items-center gap-3">
            <Boxes className="h-5 w-5 text-champagne-gold" />
            <h2 className="font-heading text-lg text-matte-black">Store snapshot</h2>
          </div>
          <p className="mt-3 text-sm leading-7 text-matte-black/60">
            A calmer, more premium admin presentation keeps focus on catalog health, order flow,
            and merchandising priorities.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-champagne-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-champagne-gold">
            <PackageCheck className="h-3.5 w-3.5" />
            Live overview
          </div>
        </article>
      </div>
    </>
  );
}

export default Dashboard;