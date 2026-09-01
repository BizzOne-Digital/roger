import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import BookingLink from '../ui/BookingLink';
import { HERO_BANNER } from '../../data/homeContent';

export default function HeroSection() {
  return (
    <section
      className="relative w-full overflow-hidden bg-charcoal"
      aria-label="Red Rose Photo Booth LLC"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-roseNoir/50 via-charcoal to-charcoal" aria-hidden="true" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full"
        >
          <img
            src={HERO_BANNER}
            alt="Red Rose Photo Booth LLC — Capturing Your Story"
            className="w-full h-auto max-h-[min(58vh,620px)] sm:max-h-[min(62vh,680px)] object-contain object-center mx-auto block drop-shadow-2xl"
            width={1920}
            height={1080}
            fetchPriority="high"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10"
        >
          <BookingLink>
            <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-antiqueGold text-charcoal font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-champagneGold transition-colors shadow-lg shadow-antiqueGold/20">
              Book Your Experience
            </MagneticButton>
          </BookingLink>
          <Link to="/services">
            <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-antiqueGold text-antiqueGold font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-antiqueGold/10 transition-colors">
              Explore Services
            </MagneticButton>
          </Link>
          <Link to="#package-add-ons">
            <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-warmIvory/40 text-warmIvory font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-warmIvory/10 transition-colors">
              View Add-Ons
            </MagneticButton>
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
