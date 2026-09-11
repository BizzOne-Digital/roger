import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { servicesAPI } from '../../api/client';
import { formatPrice } from '../../utils/constants';
import { LoadingSpinner } from '../../components/ui/Shared';
import LocalImageField from '../components/LocalImageField';

const emptyService = {
  title: '',
  slug: '',
  shortDescription: '',
  fullDescription: '',
  features: [],
  pricingType: 'contact',
  price: '',
  displayOrder: 0,
  isActive: true,
};

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyService);
  const [featureInput, setFeatureInput] = useState('');
  const [coverUrl, setCoverUrl] = useState(null);
  const [initialCoverUrl, setInitialCoverUrl] = useState(null);

  const fetchServices = () => {
    servicesAPI.getAll({ admin: true })
      .then(({ data }) => setServices(data.services))
      .catch(() => toast.error('Failed to load services'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchServices(); }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(emptyService);
    setCoverUrl(null);
    setInitialCoverUrl(null);
  };

  const openEdit = (service) => {
    setEditing(service._id);
    setForm({
      title: service.title,
      slug: service.slug,
      shortDescription: service.shortDescription,
      fullDescription: service.fullDescription,
      features: service.features || [],
      pricingType: service.pricingType,
      price: service.price || '',
      displayOrder: service.displayOrder,
      isActive: service.isActive,
    });
    const url = service.coverImage?.url || null;
    setCoverUrl(url);
    setInitialCoverUrl(url);
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput('');
    }
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      price: form.pricingType === 'fixed' && form.price ? parseFloat(form.price) : null,
      displayOrder: parseInt(form.displayOrder, 10) || 0,
      coverImage: coverUrl ? { url: coverUrl, alt: form.title } : undefined,
      removedCoverImageUrl:
        initialCoverUrl && initialCoverUrl !== coverUrl ? initialCoverUrl : undefined,
    };

    try {
      if (editing === 'new') {
        await servicesAPI.create(payload);
        toast.success('Service created');
      } else {
        await servicesAPI.update(editing, payload);
        toast.success('Service updated');
      }
      setEditing(null);
      fetchServices();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this service?')) return;
    try {
      await servicesAPI.delete(id);
      toast.success('Service deleted');
      fetchServices();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-warmIvory">Services</h1>
        <button onClick={openCreate} className="btn-primary text-sm">Add Service</button>
      </div>

      <div className="space-y-4">
        {services.map((s) => (
          <div key={s._id} className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-4 flex justify-between items-center">
            <div>
              <h3 className="text-warmIvory font-semibold">{s.title}</h3>
              <p className="text-warmIvory/50 text-sm">
                {s.pricingType === 'fixed' && s.price ? formatPrice(s.price) : 'Contact for Pricing'}
                · Order: {s.displayOrder}
              </p>
            </div>
            <div className="space-x-2">
              <button onClick={() => openEdit(s)} className="text-antiqueGold text-sm hover:underline">Edit</button>
              <button onClick={() => handleDelete(s._id)} className="text-velvetRed text-sm hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/80" onClick={() => setEditing(null)} />
          <div className="relative bg-roseNoir border border-antiqueGold/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl text-warmIvory mb-4">
              {editing === 'new' ? 'Add Service' : 'Edit Service'}
            </h2>
            <div className="space-y-4">
              {['title', 'slug'].map((field) => (
                <div key={field}>
                  <label className="label-luxury text-warmIvory/70">{field}</label>
                  <input className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                    value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                </div>
              ))}
              <div>
                <label className="label-luxury text-warmIvory/70">Short Description</label>
                <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full" rows={2}
                  value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury text-warmIvory/70">Full Description</label>
                <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full" rows={4}
                  value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
              </div>
              <div>
                <label className="label-luxury text-warmIvory/70">Features</label>
                <div className="flex gap-2">
                  <input className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 flex-1"
                    value={featureInput} onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} />
                  <button onClick={addFeature} className="btn-primary text-sm">Add</button>
                </div>
                <ul className="mt-2 space-y-1">
                  {form.features.map((f, i) => (
                    <li key={i} className="text-warmIvory/70 text-sm flex justify-between">
                      {f}
                      <button onClick={() => setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) })}
                        className="text-velvetRed text-xs">Remove</button>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-luxury text-warmIvory/70">Pricing Type</label>
                  <select className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                    value={form.pricingType} onChange={(e) => setForm({ ...form, pricingType: e.target.value })}>
                    <option value="contact">Contact for Pricing</option>
                    <option value="fixed">Fixed Price</option>
                  </select>
                </div>
                {form.pricingType === 'fixed' && (
                  <div>
                    <label className="label-luxury text-warmIvory/70">Price</label>
                    <input type="number" className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                      value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                  </div>
                )}
                <div>
                  <label className="label-luxury text-warmIvory/70">Display Order</label>
                  <input type="number" className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 w-full"
                    value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} />
                </div>
              </div>
              <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active
              </label>
              <LocalImageField
                label="Cover Image"
                folder="pages"
                value={coverUrl}
                onChange={setCoverUrl}
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
