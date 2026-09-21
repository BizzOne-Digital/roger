import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon } from '../icons/Icons';
import BrandLogo from '../ui/BrandLogo';
import BookingLink from '../ui/BookingLink';
import { NAV_LINKS, NAV_LINKS_EXTENDED } from '../../utils/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const onDarkHero = !scrolled && (
    isHome ||
    ['/about', '/services', '/testimonials', '/pricing', '/shop', '/blog', '/booking', '/contact'].includes(
      location.pathname
    )
  );
  const headerSolid = scrolled || isHome;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && !location.hash;
    }
    return location.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          headerSolid
            ? 'glass-header py-3 shadow-lg shadow-black/20'
            : 'bg-transparent py-4 md:py-5'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4 min-w-0 w-full">
          {/* Logo — brand artwork only, no extra text */}
          <Link
            to="/"
            className="shrink-0 flex items-center group"
            aria-label="Red Rose Photo Booth LLC — Home"
          >
            <BrandLogo size="header" className="transition-opacity group-hover:opacity-90" />
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden xl:flex items-center justify-center gap-8 flex-1"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative font-display font-semibold text-base lg:text-lg tracking-wide transition-colors pb-1 ${
                  isActive(link.path)
                    ? 'text-antiqueGold'
                    : onDarkHero
                    ? 'text-warmIvory/90 hover:text-antiqueGold'
                    : scrolled
                    ? 'text-warmIvory/80 hover:text-antiqueGold'
                    : 'text-charcoal/80 hover:text-antiqueGold'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-antiqueGold" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <BookingLink
              className={`hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm lg:text-base font-bold tracking-[0.18em] uppercase border transition-all duration-300 ${
                onDarkHero || scrolled
                  ? 'border-antiqueGold text-antiqueGold hover:bg-antiqueGold hover:text-charcoal'
                  : 'border-antiqueGold text-antiqueGold hover:bg-antiqueGold hover:text-charcoal'
              }`}
            >
              Book Now
            </BookingLink>

            <button
              onClick={() => setMobileOpen(true)}
              className={`xl:hidden p-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-antiqueGold ${
                onDarkHero || scrolled ? 'text-warmIvory' : 'text-charcoal'
              }`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[100] flex flex-col bg-charcoal xl:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Site menu"
              >
                <div className="flex shrink-0 justify-between items-center px-4 py-4 sm:p-6 border-b border-antiqueGold/30 bg-charcoal">
                  <BrandLogo size="header" />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="text-warmIvory p-3 -mr-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-antiqueGold"
                    aria-label="Close menu"
                  >
                    <CloseIcon />
                  </button>
                </div>

                <nav
                  className="flex-1 overflow-y-auto overscroll-contain px-4 py-8 sm:py-10"
                  aria-label="Mobile navigation"
                >
                  <ul className="flex flex-col items-center gap-1 max-w-md mx-auto">
                    {NAV_LINKS_EXTENDED.map((link, i) => (
                      <motion.li
                        key={link.path}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="w-full text-center"
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className={`block w-full py-3.5 font-display font-semibold text-xl sm:text-2xl tracking-wide transition-colors ${
                            isActive(link.path)
                              ? 'text-antiqueGold'
                              : 'text-warmIvory hover:text-antiqueGold'
                          }`}
                        >
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                    <motion.li
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: NAV_LINKS_EXTENDED.length * 0.04 }}
                      className="w-full pt-6 mt-4 border-t border-antiqueGold/25 text-center"
                    >
                      <BookingLink
                        onClick={() => setMobileOpen(false)}
                        className="inline-flex w-full max-w-xs justify-center px-8 py-3.5 border-2 border-antiqueGold text-antiqueGold text-sm font-bold tracking-[0.2em] uppercase hover:bg-antiqueGold hover:text-charcoal transition-colors"
                      >
                        Book Now
                      </BookingLink>
                    </motion.li>
                  </ul>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
