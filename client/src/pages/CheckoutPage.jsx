import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useCart } from '../context/CartContext';
import { ordersAPI } from '../api/client';
import { formatPrice } from '../utils/constants';
import PageHero from '../components/ui/PageHero';

export default function CheckoutPage() {
  usePageMeta({ title: 'Checkout' });

  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    notes: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await ordersAPI.createProductOrder({
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        },
        items: items.map((i) => ({
          productId: i.productId,
          quantity: i.quantity,
        })),
        notes: form.notes,
      });

      clearCart();
      window.location.href = `/shop/order-confirmation/${data.order.orderNumber}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <>
        <PageHero
          variant="checkout"
          compact
          align="center"
          title="Your Cart is Empty"
          subtitle="Browse our shop to find add-ons and enhancements for your event."
        />
        <div className="text-center py-16 section-padding bg-warmIvory">
          <Link to="/shop" className="btn-primary">Browse Products</Link>
        </div>
      </>
    );
  }

  return (
    <>
      <PageHero
        variant="checkout"
        title={<>Place Your <span className="text-gradient-gold">Order Request</span></>}
        subtitle="Submit your details below. Our team will contact you to confirm and arrange payment — no payment is collected now."
        compact
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="label-luxury" htmlFor="fullName">Full Name *</label>
                <input id="fullName" required className="input-luxury" value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury" htmlFor="email">Email *</label>
                <input id="email" type="email" required className="input-luxury" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury" htmlFor="phone">Phone</label>
                <input id="phone" type="tel" className="input-luxury" value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury" htmlFor="notes">Order Notes</label>
                <textarea id="notes" rows={3} className="input-luxury" value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })} />
              </div>
              {error && <p className="text-velvetRed text-base font-semibold">{error}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                {loading ? 'Submitting...' : 'Place Order Request'}
              </button>
            </form>

            <div className="bg-white border border-antiqueGold/20 rounded-lg p-6">
              <h2 className="font-display text-xl font-semibold mb-4">Order Summary</h2>
              <ul className="space-y-3 mb-6">
                {items.map((item) => (
                  <li key={item.productId} className="flex justify-between text-base font-medium">
                    <span>{item.name} x{item.quantity}</span>
                    <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-antiqueGold/20 pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span className="text-antiqueGold">{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
