import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-charcoal w-full pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20"
      aria-label="Red Rose Photo Booth LLC"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-roseNoir/40 to-charcoal" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <img
          src="/banner-hero.png"
          alt="Red Rose Photo Booth LLC — Capturing Your Story. Owner and Operator Roger Marionneaux."
          className="w-full h-auto max-h-[min(72vh,760px)] object-contain mx-auto drop-shadow-2xl"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.65 }}
        className="relative z-10 flex flex-wrap justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4"
      >
        <Link to="/booking">
          <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 bg-antiqueGold text-charcoal font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-champagneGold transition-colors shadow-lg shadow-antiqueGold/20">
            Book Your Experience
          </MagneticButton>
        </Link>
        <Link to="/services">
          <MagneticButton className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 border-2 border-antiqueGold text-antiqueGold font-bold text-sm sm:text-base tracking-[0.12em] uppercase rounded-none hover:bg-antiqueGold/10 transition-colors">
            Explore Services
          </MagneticButton>
        </Link>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
