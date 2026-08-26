import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../api/client';
import ProductCard from '../components/shop/ProductCard';
import CartDrawer from '../components/shop/CartDrawer';
import { SkeletonCard } from '../components/ui/Shared';
import PageHero from '../components/ui/PageHero';
import { CartIcon } from '../components/icons/Icons';

export default function ShopPage() {
  usePageMeta({
    title: 'Shop',
    description: 'Shop photo booth add-ons, custom designs, and event products from Red Rose Photo Booth.',
  });

  const { setIsOpen, count } = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [availability, setAvailability] = useState('');

  const fetchProducts = () => {
    setLoading(true);
    const params = { limit: 50 };
    if (search) params.search = search;
    if (category) params.category = category;
    if (sort) params.sort = sort;
    if (availability) params.availability = availability;

    productsAPI.getAll(params)
      .then(({ data }) => {
        setProducts(data.products);
        const cats = [...new Set(data.products.map((p) => p.category))];
        setCategories(cats);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [category, sort, availability]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  return (
    <>
      <PageHero variant="shop" title={<>Shop <span className="text-gradient-gold">Add-Ons</span></>} subtitle="Custom designs, premium props, and add-ons to elevate your photo booth experience.">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 text-warmIvory hover:text-antiqueGold transition-colors mt-6 font-semibold"
          aria-label={`Open cart with ${count} items`}
        >
          <CartIcon />
          <span className="text-base">Cart ({count})</span>
        </button>
      </PageHero>

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mb-8 w-full min-w-0">
            <form onSubmit={handleSearch} className="w-full sm:flex-1 sm:min-w-[200px] min-w-0">
              <input
                type="search"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-luxury"
                aria-label="Search products"
              />
            </form>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-luxury w-full sm:w-auto sm:min-w-[160px]"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-luxury w-full sm:w-auto sm:min-w-[160px]"
              aria-label="Sort products"
            >
              <option value="">Default</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="name">Name</option>
            </select>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="input-luxury w-full sm:w-auto sm:min-w-[160px]"
              aria-label="Filter by availability"
            >
              <option value="">All</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-body-muted mb-4">No products found.</p>
              <Link to="/contact" className="btn-secondary">Contact Us</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      <CartDrawer />
    </>
  );
}
