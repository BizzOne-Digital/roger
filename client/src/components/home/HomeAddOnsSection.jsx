import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { ADD_ON_SERVICES } from '../../data/homeContent';

function AddOnCard({ item, index, embedded }) {
  const hasImage = Boolean(item.image);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`rounded-lg border border-antiqueGold/25 overflow-hidden ${
        embedded ? 'bg-white/80' : 'bg-white/70'
      }`}
    >
      <div className={`${hasImage ? 'grid lg:grid-cols-2 gap-0' : ''}`}>
        {hasImage && (
          <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-full bg-charcoal/5">
            <img
              src={item.image}
              alt={item.imageAlt || item.name}
              className="w-full h-full min-h-[220px] sm:min-h-[260px] object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="flex flex-wrap justify-between gap-3 mb-3">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-charcoal">
              {item.name}
            </h3>
            <p className="font-display text-lg text-antiqueGold font-semibold shrink-0">
              {item.price}
            </p>
          </div>
          <p className="text-body-muted text-base md:text-lg leading-relaxed mb-3">
            {item.description}
          </p>
          {item.note && (
            <p className="text-sm font-semibold text-charcoal/70 italic">
              Note: {item.note}
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function HomeAddOnsSection({ embedded = false }) {
  const inner = (
    <>
      <SectionHeader
        eyebrow="Enhance Your Package"
        title={ADD_ON_SERVICES.title}
        className="mb-10 md:mb-12"
        light={embedded}
      />

      <div className="space-y-6 mb-8">
        {ADD_ON_SERVICES.items.map((item, i) => (
          <AddOnCard key={item.name} item={item} index={i} embedded={embedded} />
        ))}
      </div>

      <div className="p-5 md:p-6 rounded-lg border border-antiqueGold/30 bg-charcoal text-warmIvory text-center">
        <p className="font-medium text-base md:text-lg text-warmIvory/95">
          {ADD_ON_SERVICES.consultationNote}
        </p>
        <Link to="/contact" className="btn-primary inline-flex mt-6">
          Request a Consultation
        </Link>
      </div>
    </>
  );

  if (embedded) {
    return (
      <div id="package-add-ons" className="scroll-mt-28 mb-14">
        {inner}
      </div>
    );
  }

  return (
    <section id="package-add-ons" className="section-padding bg-warmIvory scroll-mt-28">
      <div className="max-w-6xl mx-auto">{inner}</div>
    </section>
  );
}
