import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ordersAPI } from '../../api/client';
import { formatDate } from '../../utils/constants';
import { LoadingSpinner } from '../../components/ui/Shared';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ordersAPI.getStats()
      .then(({ data }) => {
        setStats(data.stats);
        setRecentOrders(data.recentOrders);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;
  }

  const cards = [
    { label: 'Products', value: stats?.totalProducts, color: 'text-antiqueGold' },
    { label: 'Services', value: stats?.totalServices, color: 'text-champagneGold' },
    { label: 'Total Orders', value: stats?.totalOrders, color: 'text-warmIvory' },
    { label: 'Pending Orders', value: stats?.pendingOrders, color: 'text-velvetRed' },
    { label: 'Testimonials', value: stats?.totalTestimonials, color: 'text-antiqueGold' },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-warmIvory mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
            <p className="text-warmIvory/50 text-sm">{card.label}</p>
            <p className={`text-3xl font-bold mt-2 ${card.color}`}>{card.value ?? 0}</p>
          </div>
        ))}
      </div>

      <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
        <h2 className="font-display text-xl text-warmIvory mb-4">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="text-warmIvory/50 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-warmIvory/50 border-b border-antiqueGold/10">
                  <th className="pb-3 text-left">Order #</th>
                  <th className="pb-3 text-left">Customer</th>
                  <th className="pb-3 text-left">Type</th>
                  <th className="pb-3 text-left">Status</th>
                  <th className="pb-3 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id} className="border-b border-antiqueGold/5 text-warmIvory/80">
                    <td className="py-3">
                      <Link to={`/admin/orders/${order._id}`} className="text-antiqueGold hover:underline">
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="py-3">{order.customer?.fullName}</td>
                    <td className="py-3 capitalize">{order.orderType}</td>
                    <td className="py-3 capitalize">{order.status}</td>
                    <td className="py-3">{formatDate(order.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
