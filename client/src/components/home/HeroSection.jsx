import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import GoldFlourish, { GoldOrnamentDivider } from '../ui/GoldDecor';

const filmPhotos = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=120&q=80',
  'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=120&q=80',
  'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=120&q=80',
  'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=120&q=80',
  'https://images.unsplash.com/photo-1522673606300-7944f4471a7c?w=120&q=80',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=120&q=80',
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-charcoal w-full" aria-label="Luxury photo booth at elegant gala event">
      {/* Background — SS2 hero image (brightened) */}
      <div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 sm:scale-105 brightness-[1.15] contrast-[1.05]"
          style={{ backgroundImage: 'url(/hero-bg.png)' }}
        />
      </div>

      {/* Light overlays — keep left readable, show more of the photo on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/75 via-charcoal/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/45" />
      <div className="absolute inset-0 bg-cinematic-radial opacity-20" />

      {/* Content — left aligned like SS1 */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 min-w-0">
        <div className="max-w-xl lg:max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="flex items-center gap-3 mb-6 md:mb-8"
          >
            <GoldFlourish className="w-10 h-3 text-antiqueGold/70 hidden sm:block" />
            <p className="text-antiqueGold text-xs sm:text-sm md:text-base font-bold tracking-[0.12em] sm:tracking-[0.22em] uppercase leading-snug">
              Sacramento&apos;s Luxury Photo Booth Experience
            </p>
            <GoldFlourish className="w-10 h-3 text-antiqueGold/70 hidden sm:block rotate-180" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-display font-semibold text-[2rem] leading-tight sm:text-5xl md:text-6xl lg:text-[4.25rem] mb-5 md:mb-6"
          >
            <span className="text-richRose">Capture</span>
            <span className="text-warmIvory"> the Moment.</span>
            <br />
            <span className="text-warmIvory">Keep the </span>
            <span className="text-richRose">Story.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
          >
            <GoldOrnamentDivider className="mb-6 md:mb-8" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="text-warmIvory/90 text-base sm:text-lg md:text-xl leading-relaxed mb-8 md:mb-10 max-w-md lg:max-w-lg font-medium"
          >
            Turn weddings, celebrations, and corporate events into unforgettable experiences
            with stylish photos, instant sharing, and professional service.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-wrap gap-3 sm:gap-4"
          >
            <Link to="/booking">
              <MagneticButton
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-antiqueGold text-charcoal font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-champagneGold transition-colors shadow-lg shadow-antiqueGold/20"
              >
                Book Your Experience
              </MagneticButton>
            </Link>
            <Link to="/services">
              <MagneticButton
                className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-antiqueGold text-antiqueGold font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-antiqueGold/10 transition-colors"
              >
                Explore Services
              </MagneticButton>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Curved film strip — bottom */}
      <div
        className="absolute bottom-8 md:bottom-12 left-0 right-0 z-10 overflow-hidden pointer-events-none opacity-90"
        aria-hidden="true"
      >
        <div
          className="mx-auto max-w-4xl transform -rotate-2 translate-y-2"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          }}
        >
          <div className="flex gap-2 filmstrip-track py-2 px-4 bg-charcoal/40 border-y-2 border-antiqueGold/50 rounded-sm">
            {filmPhotos.concat(filmPhotos).map((src, i) => (
              <div
                key={i}
                className="w-16 h-11 sm:w-20 sm:h-14 shrink-0 rounded-sm border border-antiqueGold/40 bg-cover bg-center shadow-inner"
                style={{ backgroundImage: `url(${src})` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
