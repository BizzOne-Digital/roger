import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { productsAPI } from '../../api/client';
import { formatPrice } from '../../utils/constants';
import { LoadingSpinner } from '../../components/ui/Shared';
import LocalImageGalleryField from '../components/LocalImageGalleryField';

const emptyProduct = {
  name: '',
  slug: '',
  category: '',
  shortDescription: '',
  fullDescription: '',
  price: '',
  salePrice: '',
  sku: '',
  stockQuantity: 0,
  featured: false,
  isActive: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyProduct);
  const [imageUrls, setImageUrls] = useState([]);
  const [initialImageUrls, setInitialImageUrls] = useState([]);

  const fetchProducts = () => {
    productsAPI.getAll({ admin: true, limit: 100 })
      .then(({ data }) => setProducts(data.products))
      .catch(() => toast.error('Failed to load products'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const openCreate = () => {
    setEditing('new');
    setForm(emptyProduct);
    setImageUrls([]);
    setInitialImageUrls([]);
  };

  const openEdit = (product) => {
    setEditing(product._id);
    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      price: product.price,
      salePrice: product.salePrice || '',
      sku: product.sku,
      stockQuantity: product.stockQuantity,
      featured: product.featured,
      isActive: product.isActive,
    });
    const urls = (product.images || []).map((img) => img.url);
    setImageUrls(urls);
    setInitialImageUrls(urls);
  };

  const handleSave = async () => {
    const removedImageUrls = initialImageUrls.filter((url) => !imageUrls.includes(url));
    const payload = {
      ...form,
      price: parseFloat(form.price),
      salePrice: form.salePrice ? parseFloat(form.salePrice) : null,
      stockQuantity: parseInt(form.stockQuantity, 10),
      images: imageUrls.map((url) => ({ url, alt: form.name })),
      removedImageUrls,
    };

    try {
      if (editing === 'new') {
        await productsAPI.create(payload);
        toast.success('Product created');
      } else {
        await productsAPI.update(editing, payload);
        toast.success('Product updated');
      }
      setEditing(null);
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    try {
      await productsAPI.delete(id);
      toast.success('Product deleted');
      fetchProducts();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="font-display text-3xl text-warmIvory">Products</h1>
        <button onClick={openCreate} className="btn-primary text-sm">Add Product</button>
      </div>

      <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-warmIvory/50 border-b border-antiqueGold/10">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Stock</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="border-b border-antiqueGold/5 text-warmIvory/80">
                <td className="p-4">{p.name}</td>
                <td className="p-4">{p.category}</td>
                <td className="p-4">{formatPrice(p.salePrice ?? p.price)}</td>
                <td className="p-4">{p.stockQuantity}</td>
                <td className="p-4">
                  <span className={p.isActive ? 'text-green-400' : 'text-velvetRed'}>
                    {p.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => openEdit(p)} className="text-antiqueGold text-xs hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-velvetRed text-xs hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-charcoal/80" onClick={() => setEditing(null)} />
          <div className="relative bg-roseNoir border border-antiqueGold/30 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="font-display text-xl text-warmIvory mb-4">
              {editing === 'new' ? 'Add Product' : 'Edit Product'}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {['name', 'slug', 'category', 'sku'].map((field) => (
                <div key={field}>
                  <label className="label-luxury text-warmIvory/70">{field}</label>
                  <input className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20"
                    value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                </div>
              ))}
              {['price', 'salePrice', 'stockQuantity'].map((field) => (
                <div key={field}>
                  <label className="label-luxury text-warmIvory/70">{field}</label>
                  <input type="number" className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20"
                    value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} />
                </div>
              ))}
            </div>
            <div className="mt-4">
              <label className="label-luxury text-warmIvory/70">Short Description</label>
              <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20" rows={2}
                value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} />
            </div>
            <div className="mt-4">
              <label className="label-luxury text-warmIvory/70">Full Description</label>
              <textarea className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20" rows={4}
                value={form.fullDescription} onChange={(e) => setForm({ ...form, fullDescription: e.target.value })} />
            </div>
            <div className="flex gap-4 mt-4">
              <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
                <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                Featured
              </label>
              <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
                <input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} />
                Active
              </label>
            </div>
            <div className="mt-4">
              <LocalImageGalleryField
                label="Product Images"
                folder="products"
                value={imageUrls}
                onChange={setImageUrls}
                max={10}
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
