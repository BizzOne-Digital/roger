import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CUSTOM_PACKAGES } from '../../data/homeContent';

export default function CustomPackagesSection({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`bg-softBlush/80 border-t border-antiqueGold/35 px-5 py-8 md:px-10 md:py-10 text-center ${className}`}
    >
      <p className="text-antiqueGold tracking-[0.12em] uppercase text-xs md:text-sm font-bold mb-3">
        {CUSTOM_PACKAGES.eyebrow}
      </p>
      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-charcoal font-semibold mb-5 md:mb-6 leading-snug">
        {CUSTOM_PACKAGES.title}
      </h3>

      <div className="max-w-2xl mx-auto space-y-4 text-charcoal/90 text-base md:text-lg leading-relaxed font-medium">
        {CUSTOM_PACKAGES.paragraphs.map((text) => (
          <p key={text.slice(0, 32)}>{text}</p>
        ))}
        <p className="font-display text-xl md:text-2xl text-charcoal font-semibold pt-2">
          {CUSTOM_PACKAGES.startingAt}
        </p>
        <p>{CUSTOM_PACKAGES.quotePrompt}</p>
        <p className="text-sm md:text-base text-charcoal/75 italic pt-1">{CUSTOM_PACKAGES.note}</p>
      </div>

      <Link
        to="/contact#inquiry-form"
        className="btn-velvet mt-8 md:mt-10 uppercase tracking-wide text-sm md:text-base"
      >
        {CUSTOM_PACKAGES.ctaLabel}
      </Link>
    </motion.div>
  );
}
