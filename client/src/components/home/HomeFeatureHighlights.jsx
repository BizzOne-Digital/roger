import { motion } from 'framer-motion';
import { HERO_FEATURE_HIGHLIGHTS } from '../../data/homeContent';

export default function HomeFeatureHighlights() {
  return (
    <section className="bg-warmIvory border-b border-antiqueGold/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {HERO_FEATURE_HIGHLIGHTS.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="p-6 md:p-8 rounded-lg border border-antiqueGold/25 bg-white/70 h-full"
            >
              <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-3 flex items-start gap-2">
                <span className="text-antiqueGold shrink-0">✦</span>
                {item.title}
              </h2>
              <p className="text-body-muted text-base md:text-lg leading-relaxed font-medium">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
