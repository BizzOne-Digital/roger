import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const INTRO_DURATION_MS = 5000;

export default function CinematicIntro({ onComplete }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setExiting(true);
    }, INTRO_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  const handleExitComplete = () => {
    if (exiting) onComplete();
  };

  const handleSkip = () => {
    setExiting(true);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-charcoal flex flex-col items-center justify-center overflow-hidden"
          role="dialog"
          aria-label="Red Rose Photo Booth introduction"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-roseNoir to-charcoal" />

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-6xl px-4 sm:px-6"
          >
            <img
              src="/banner-hero.png"
              alt="Red Rose Photo Booth LLC — Capturing Your Story"
              className="w-full h-auto max-h-[min(82vh,780px)] object-contain mx-auto drop-shadow-2xl"
              width={1920}
              height={1080}
              fetchPriority="high"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="relative z-10 mt-8 w-48 h-0.5 bg-antiqueGold/30 rounded-full overflow-hidden"
            aria-hidden="true"
          >
            <motion.div
              className="h-full bg-antiqueGold origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: INTRO_DURATION_MS / 1000, ease: 'linear' }}
            />
          </motion.div>

          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-8 right-6 sm:right-10 z-20 text-champagneGold/80 text-xs sm:text-sm tracking-[0.2em] uppercase font-bold hover:text-antiqueGold transition-colors focus:outline-none focus:ring-2 focus:ring-antiqueGold px-3 py-2"
            aria-label="Skip introduction"
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
