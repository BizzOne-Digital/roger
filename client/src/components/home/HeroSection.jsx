import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import BookingLink from '../ui/BookingLink';
import { HERO_BANNER } from '../../data/homeContent';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-charcoal"
      aria-label="Red Rose Photo Booth LLC"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src={HERO_BANNER}
          alt="Red Rose Photo Booth LLC — Capturing Your Story"
          className="w-full h-full object-cover object-center"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/35 via-charcoal/10 to-charcoal/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/40 via-transparent to-charcoal/40" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col justify-end px-4 sm:px-6 lg:px-8 pt-28 pb-10 sm:pb-14 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.65 }}
          className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4"
        >
          <BookingLink>
            <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-antiqueGold text-charcoal font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-champagneGold transition-colors shadow-lg shadow-antiqueGold/20">
              Book Your Experience
            </MagneticButton>
          </BookingLink>
          <Link to="/services">
            <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-antiqueGold text-antiqueGold font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-antiqueGold/10 transition-colors backdrop-blur-sm">
              Explore Services
            </MagneticButton>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 sm:h-24 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
