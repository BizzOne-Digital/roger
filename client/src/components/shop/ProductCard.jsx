import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/constants';
import { useCart } from '../../context/CartContext';
import { getImageUrlFromObject } from '../../utils/imageUrl';
import MagneticButton from '../ui/MagneticButton';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const price = product.salePrice ?? product.price;
  const inStock = product.stockQuantity > 0;

  return (
    <div className="card-luxury group h-full flex flex-col">
      <Link to={`/shop/${product.slug}`} className="block shrink-0">
        <div className="relative h-56 overflow-hidden bg-softBlush">
          {product.images?.[0]?.url ? (
            <img
              src={getImageUrlFromObject(product.images[0])}
              alt={product.images[0].alt || product.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-antiqueGold/50 font-semibold">
              No Image
            </div>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-antiqueGold text-charcoal text-sm font-bold px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>
      </Link>

      <div className="p-5 flex flex-col flex-1">
        <Link to={`/shop/${product.slug}`}>
          <h3 className="card-title mb-2 group-hover:text-antiqueGold transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="card-text mb-3 line-clamp-2 flex-1">{product.shortDescription}</p>
        <div className="flex items-center justify-between mb-4 shrink-0">
          <span className="font-bold text-lg text-antiqueGold">{formatPrice(price)}</span>
          <span className={`text-sm font-semibold ${inStock ? 'text-green-700' : 'text-velvetRed'}`}>
            {inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>
        <div className="flex gap-2 shrink-0 min-w-0">
          <Link to={`/shop/${product.slug}`} className="btn-secondary text-sm !py-2 !px-3 flex-1 min-w-0 text-center">
            View
          </Link>
          <MagneticButton
            className="btn-primary text-sm !py-2 !px-3 flex-1 min-w-0"
            onClick={() => addItem(product)}
            disabled={!inStock}
          >
            Add to Cart
          </MagneticButton>
        </div>
      </div>
    </div>
  );
}
