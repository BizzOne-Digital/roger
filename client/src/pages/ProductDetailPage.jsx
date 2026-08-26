import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import { useCart } from '../context/CartContext';
import { productsAPI } from '../api/client';
import { ProductSchema, LoadingSpinner } from '../components/ui/Shared';
import { formatPrice } from '../utils/constants';
import { getImageUrlFromObject } from '../utils/imageUrl';
import CartDrawer from '../components/shop/CartDrawer';
import PageHero from '../components/ui/PageHero';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    productsAPI.getBySlug(slug)
      .then(({ data }) => setProduct(data.product))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  usePageMeta({
    title: product?.name,
    description: product?.shortDescription,
    image: product?.images?.[0]?.url,
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-32">
        <h1 className="heading-display text-2xl mb-4">Product Not Found</h1>
        <Link to="/shop" className="btn-secondary">Back to Shop</Link>
      </div>
    );
  }

  const price = product.salePrice ?? product.price;
  const inStock = product.stockQuantity > 0;
  const heroImage = product.images?.[0]?.url
    ? getImageUrlFromObject(product.images[0])
    : undefined;

  return (
    <>
      <ProductSchema product={product} />
      <PageHero
        variant="shop"
        image={heroImage}
        imageAlt={product.name}
        eyebrow={product.category}
        title={product.name}
        subtitle={product.shortDescription}
        compact
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-softBlush rounded-lg overflow-hidden mb-4">
                {product.images?.[activeImage]?.url ? (
                  <img
                    src={getImageUrlFromObject(product.images[activeImage])}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-antiqueGold/30">
                    No Image
                  </div>
                )}
              </div>
              {product.images?.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`w-16 h-16 rounded overflow-hidden border-2 ${
                        activeImage === i ? 'border-antiqueGold' : 'border-transparent'
                      }`}
                    >
                      <img src={getImageUrlFromObject(img)} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div>
              <p className="text-2xl font-bold text-antiqueGold mb-4">
                {formatPrice(price)}
                {product.salePrice && (
                  <span className="text-charcoal/50 text-lg line-through ml-2 font-medium">
                    {formatPrice(product.price)}
                  </span>
                )}
              </p>
              <p className={`text-base font-semibold mb-6 ${inStock ? 'text-green-700' : 'text-velvetRed'}`}>
                {inStock ? `${product.stockQuantity} in stock` : 'Out of stock'}
              </p>
              <p className="section-lead mb-8">{product.fullDescription}</p>

              {inStock && (
                <div className="flex items-center gap-4 mb-6">
                  <label className="label-luxury">Quantity</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 border border-antiqueGold/30 rounded"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                      className="w-8 h-8 border border-antiqueGold/30 rounded"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => addItem(product, quantity)}
                  disabled={!inStock}
                  className="btn-primary disabled:opacity-50"
                >
                  Add to Cart
                </button>
                <Link to="/shop" className="btn-secondary">Back to Shop</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CartDrawer />
    </>
  );
}
