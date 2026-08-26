import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { ordersAPI } from '../../api/client';
import { ORDER_STATUSES, formatDate, formatPrice } from '../../utils/constants';
import { LoadingSpinner } from '../../components/ui/Shared';

export default function AdminOrders() {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', orderType: '', search: '' });
  const [statusUpdate, setStatusUpdate] = useState({ status: '', sendEmail: false, internalNotes: '' });

  useEffect(() => {
    if (id) {
      ordersAPI.getById(id)
        .then(({ data }) => {
          setOrder(data.order);
          setStatusUpdate({
            status: data.order.status,
            sendEmail: false,
            internalNotes: data.order.internalNotes || '',
          });
        })
        .catch(() => toast.error('Order not found'))
        .finally(() => setLoading(false));
    } else {
      const params = {};
      if (filters.status) params.status = filters.status;
      if (filters.orderType) params.orderType = filters.orderType;
      if (filters.search) params.search = filters.search;

      ordersAPI.getAll(params)
        .then(({ data }) => setOrders(data.orders))
        .catch(() => toast.error('Failed to load orders'))
        .finally(() => setLoading(false));
    }
  }, [id, filters]);

  const handleStatusUpdate = async () => {
    try {
      await ordersAPI.updateStatus(id, statusUpdate);
      toast.success('Status updated');
      const { data } = await ordersAPI.getById(id);
      setOrder(data.order);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  if (id && order) {
    return (
      <div>
        <Link to="/admin/orders" className="text-antiqueGold text-sm hover:underline mb-4 block">← Back to Orders</Link>
        <h1 className="font-display text-3xl text-warmIvory mb-2">{order.orderNumber}</h1>
        <p className="text-warmIvory/50 text-sm mb-8 capitalize">{order.orderType} · {order.status}</p>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
            <h2 className="text-warmIvory font-semibold mb-4">Customer</h2>
            <p className="text-warmIvory/80 text-sm">{order.customer.fullName}</p>
            <p className="text-warmIvory/60 text-sm">{order.customer.email}</p>
            <p className="text-warmIvory/60 text-sm">{order.customer.phone}</p>
          </div>

          {order.orderType === 'booking' && order.eventDetails && (
            <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
              <h2 className="text-warmIvory font-semibold mb-4">Event Details</h2>
              <div className="text-warmIvory/70 text-sm space-y-1">
                <p>Event: {order.eventDetails.eventType}</p>
                <p>Date: {order.eventDetails.eventDate ? formatDate(order.eventDetails.eventDate) : 'N/A'}</p>
                <p>Time: {order.eventDetails.startTime}</p>
                <p>Duration: {order.eventDetails.duration}</p>
                <p>Venue: {order.eventDetails.venueName}</p>
                <p>Address: {order.eventDetails.venueAddress}</p>
                <p>Guests: {order.eventDetails.guestCount}</p>
                <p>Service: {order.eventDetails.serviceName}</p>
                {order.eventDetails.additionalNotes && <p>Notes: {order.eventDetails.additionalNotes}</p>}
              </div>
            </div>
          )}

          {order.items?.length > 0 && (
            <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
              <h2 className="text-warmIvory font-semibold mb-4">Items</h2>
              {order.items.map((item, i) => (
                <p key={i} className="text-warmIvory/70 text-sm">
                  {item.name} x{item.quantity} — {formatPrice(item.price * item.quantity)}
                </p>
              ))}
              <p className="text-antiqueGold font-semibold mt-4">Total: {formatPrice(order.total)}</p>
            </div>
          )}
        </div>

        <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6 mt-6">
          <h2 className="text-warmIvory font-semibold mb-4">Update Status</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <select className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20"
              value={statusUpdate.status} onChange={(e) => setStatusUpdate({ ...statusUpdate, status: e.target.value })}>
              {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
              <input type="checkbox" checked={statusUpdate.sendEmail}
                onChange={(e) => setStatusUpdate({ ...statusUpdate, sendEmail: e.target.checked })} />
              Send status email to customer
            </label>
          </div>
          <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full mt-4" rows={3}
            placeholder="Internal notes"
            value={statusUpdate.internalNotes}
            onChange={(e) => setStatusUpdate({ ...statusUpdate, internalNotes: e.target.value })} />
          <button onClick={handleStatusUpdate} className="btn-primary text-sm mt-4">Update Status</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-warmIvory mb-8">Orders</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        <input placeholder="Search..." className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 !w-auto"
          value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
        <select className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 !w-auto"
          value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 !w-auto"
          value={filters.orderType} onChange={(e) => setFilters({ ...filters, orderType: e.target.value })}>
          <option value="">All Types</option>
          <option value="product">Product</option>
          <option value="booking">Booking</option>
        </select>
      </div>

      <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-warmIvory/50 border-b border-antiqueGold/10">
              <th className="p-4 text-left">Order #</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-b border-antiqueGold/5 text-warmIvory/80">
                <td className="p-4">
                  <Link to={`/admin/orders/${o._id}`} className="text-antiqueGold hover:underline">{o.orderNumber}</Link>
                </td>
                <td className="p-4">{o.customer?.fullName}</td>
                <td className="p-4 capitalize">{o.orderType}</td>
                <td className="p-4 capitalize">{o.status}</td>
                <td className="p-4">{formatDate(o.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
