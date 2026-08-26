import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { CloseIcon } from '../icons/Icons';
import { formatPrice } from '../../utils/constants';
import { resolveImageUrl } from '../../utils/imageUrl';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/60 z-[70]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-warmIvory z-[80] shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between p-6 border-b border-antiqueGold/20">
              <h2 className="font-display text-xl font-semibold">Your Cart ({count})</h2>
              <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 max-h-[calc(100vh-200px)]">
              {items.length === 0 ? (
                <p className="text-body-muted text-center py-12">Your cart is empty</p>
              ) : (
                <ul className="space-y-4">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 border-b border-antiqueGold/10 pb-4">
                      {item.image && (
                        <img src={resolveImageUrl(item.image)} alt="" className="w-16 h-16 object-cover rounded" />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-base">{item.name}</h3>
                        <p className="text-antiqueGold font-bold text-base">{formatPrice(item.price)}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                            className="w-6 h-6 border border-antiqueGold/30 rounded text-sm font-bold"
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="text-base font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-6 h-6 border border-antiqueGold/30 rounded text-sm font-bold"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-velvetRed text-sm font-semibold ml-auto"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-antiqueGold/20">
                <div className="flex justify-between mb-4">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-antiqueGold">{formatPrice(total)}</span>
                </div>
                <Link
                  to="/shop/checkout"
                  onClick={() => setIsOpen(false)}
                  className="btn-primary w-full text-center block"
                >
                  Proceed to Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
