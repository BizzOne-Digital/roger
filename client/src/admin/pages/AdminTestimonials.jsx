import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { testimonialsAPI } from '../../api/client';
import { LoadingSpinner } from '../../components/ui/Shared';
import LocalImageField from '../components/LocalImageField';

const emptyTestimonial = {
  customerName: '',
  eventType: '',
  rating: 5,
  review: '',
  featured: false,
  isActive: true,
};

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyTestimonial);
  const [customerImageUrl, setCustomerImageUrl] = useState(null);
  const [eventImageUrl, setEventImageUrl] = useState(null);
  const [initialCustomerUrl, setInitialCustomerUrl] = useState(null);
  const [initialEventUrl, setInitialEventUrl] = useState(null);

  const fetchTestimonials = () => {
    testimonialsAPI.getAll({ admin: true, limit: 100 })
      .then(({ data }) => setTestimonials(data.testimonials))
      .catch(() => toast.error('Failed to load testimonials'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(emptyTestimonial);
    setCustomerImageUrl(null);
    setEventImageUrl(null);
    setInitialCustomerUrl(null);
    setInitialEventUrl(null);
  };

  const openEdit = (t) => {
    setEditing(t._id);
    setForm({
      customerName: t.customerName,
      eventType: t.eventType,
      rating: t.rating,
      review: t.review,
      featured: t.featured,
      isActive: t.isActive,
    });
    const customerUrl = t.customerImage?.url || null;
    const eventUrl = t.eventImage?.url || null;
    setCustomerImageUrl(customerUrl);
    setEventImageUrl(eventUrl);
    setInitialCustomerUrl(customerUrl);
    setInitialEventUrl(eventUrl);
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      rating: parseInt(form.rating, 10),
      customerImage: customerImageUrl
        ? { url: customerImageUrl, alt: form.customerName }
        : undefined,
      eventImage: eventImageUrl
        ? { url: eventImageUrl, alt: form.eventType }
        : undefined,
      removedCustomerImageUrl:
        initialCustomerUrl && initialCustomerUrl !== customerImageUrl
          ? initialCustomerUrl
          : undefined,
      removedEventImageUrl:
        initialEventUrl && initialEventUrl !== eventImageUrl
          ? initialEventUrl
          : undefined,
    };

    try {
      if (editing === 'new') {
        await testimonialsAPI.create(payload);
        toast.success('Testimonial created');
      } else {
        await testimonialsAPI.update(editing, payload);
        toast.success('Testimonial updated');
      }
      setEditing(null);
      fetchTestimonials();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await testimonialsAPI.delete(id);
      toast.success('Testimonial deleted');
      fetchTestimonials();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-warmIvory">Testimonials</h1>
        <button onClick={openCreate} className="btn-primary text-sm">Add Testimonial</button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t._id} className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-warmIvory font-semibold">{t.customerName}</h3>
                <p className="text-warmIvory/50 text-sm">{t.eventType} · {t.rating}/5</p>
                <p className="text-warmIvory/70 text-sm mt-2 line-clamp-2">{t.review}</p>
              </div>
              <div className="space-x-2 shrink-0">
                <button onClick={() => openEdit(t)} className="text-antiqueGold text-sm hover:underline">Edit</button>
                <button onClick={() => handleDelete(t._id)} className="text-velvetRed text-sm hover:underline">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/80" onClick={() => setEditing(null)} />
          <div className="relative bg-roseNoir border border-antiqueGold/30 rounded-lg p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl text-warmIvory mb-4">
              {editing === 'new' ? 'Add Testimonial' : 'Edit Testimonial'}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="label-luxury text-warmIvory/70">Customer Name</label>
                <input className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                  value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury text-warmIvory/70">Event Type</label>
                <input className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                  value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury text-warmIvory/70">Rating (1-5)</label>
                <input type="number" min="1" max="5" className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                  value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury text-warmIvory/70">Review</label>
                <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full" rows={4}
                  value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} />
              </div>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
                  <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                  Featured
                </label>
                <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
                  <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                  Active
                </label>
              </div>
              <LocalImageField
                label="Customer Image"
                folder="gallery"
                value={customerImageUrl}
                onChange={setCustomerImageUrl}
              />
              <LocalImageField
                label="Event Image"
                folder="gallery"
                value={eventImageUrl}
                onChange={setEventImageUrl}
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary text-sm">Save</button>
              <button onClick={() => setEditing(null)} className="btn-secondary text-sm !text-warmIvory">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
