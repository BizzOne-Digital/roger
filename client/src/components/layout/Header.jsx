import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuIcon, CloseIcon } from '../icons/Icons';
import { NAV_LINKS, NAV_LINKS_EXTENDED } from '../../utils/constants';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const onDarkHero = !scrolled && (
    isHome ||
    ['/services', '/testimonials', '/pricing', '/shop', '/blog', '/booking', '/contact'].includes(
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
            <img
              src="/header-logo.png"
              alt="Red Rose Photo Booth LLC"
              className="h-11 sm:h-14 md:h-[4.25rem] w-auto max-w-[min(200px,38vw)] sm:max-w-[240px] object-contain object-left transition-opacity group-hover:opacity-90"
              fetchPriority="high"
            />
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
            <Link
              to="/booking"
              className={`hidden sm:inline-flex items-center justify-center px-6 py-2.5 text-sm lg:text-base font-bold tracking-[0.18em] uppercase border transition-all duration-300 ${
                onDarkHero || scrolled
                  ? 'border-antiqueGold text-antiqueGold hover:bg-antiqueGold hover:text-charcoal'
                  : 'border-antiqueGold text-antiqueGold hover:bg-antiqueGold hover:text-charcoal'
              }`}
            >
              Book Now
            </Link>

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

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/98 backdrop-blur-sm"
          >
            <div className="flex justify-between items-center p-6 border-b border-antiqueGold/20">
              <img
                src="/header-logo.png"
                alt="Red Rose Photo Booth LLC"
                className="h-12 w-auto max-w-[200px] object-contain object-left"
              />
              <button
                onClick={() => setMobileOpen(false)}
                className="text-warmIvory p-2"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
            </div>

            <nav className="flex flex-col items-center justify-center min-h-[70vh] gap-5" aria-label="Mobile navigation">
              {NAV_LINKS_EXTENDED.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={link.path}
                    className="font-display font-semibold text-2xl text-warmIvory hover:text-antiqueGold transition-colors tracking-wide"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_LINKS_EXTENDED.length * 0.06 }}
              >
                <Link
                  to="/booking"
                  className="inline-flex px-8 py-3 border border-antiqueGold text-antiqueGold text-sm font-bold tracking-[0.2em] uppercase hover:bg-antiqueGold hover:text-charcoal transition-colors mt-4"
                >
                  Book Now
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
