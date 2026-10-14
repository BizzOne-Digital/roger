import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { formatPrice } from '../../utils/constants';
import { getPackageTitleLine } from '../../data/homeContent';

function FlyerFigure({ src, alt, caption }) {
  if (!src) return null;

  return (
    <figure className="rounded-lg border border-antiqueGold/30 overflow-hidden bg-charcoal/5 shadow-md">
      <img
        src={src}
        alt={alt}
        className="w-full h-auto block"
        loading="lazy"
        decoding="async"
      />
      {caption && (
        <figcaption className="px-3 py-2 text-xs text-charcoal/65 italic bg-white/80 border-t border-antiqueGold/15 text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function PackageFlyerBlock({ pkg, index, light = false }) {
  const title = getPackageTitleLine(pkg);

  return (
    <motion.article
      id={`package-flyer-${pkg.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.06 }}
      className={`rounded-xl border overflow-hidden ${
        light
          ? 'border-antiqueGold/25 bg-roseNoir/30'
          : 'border-antiqueGold/30 bg-white/70'
      } ${pkg.featured ? 'ring-2 ring-antiqueGold/40' : ''}`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-antiqueGold/20 ${
          light ? 'bg-charcoal/40' : 'bg-charcoal text-warmIvory'
        }`}
      >
        <h3 className={`font-display text-xl md:text-2xl font-semibold ${light ? 'text-warmIvory' : ''}`}>
          {title}
        </h3>
        <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
          {formatPrice(pkg.price)}
          {pkg.hours ? (
            <span className={`block text-sm font-medium ${light ? 'text-warmIvory/80' : 'text-warmIvory/85'}`}>
              {pkg.hours} hours
            </span>
          ) : null}
        </p>
      </div>

      <div className="p-4 md:p-6 space-y-4">
        <FlyerFigure src={pkg.flyer} alt={pkg.flyerAlt || title} />
        {pkg.detailFlyer && (
          <FlyerFigure
            src={pkg.detailFlyer}
            alt={pkg.detailFlyerAlt || `${title} — package details`}
            caption="Package highlights & keepsakes"
          />
        )}
      </div>
    </motion.article>
  );
}

export function PartyHourlyFlyer({ className = '' }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-xl border border-antiqueGold/30 overflow-hidden bg-white/80 shadow-md ${className}`}
    >
      <img
        src="/packages/package-hourly-250-flyer.jpg"
        alt="Red Rose Photo Booth — Elevate Your Next Event with premium hourly photo booth service at $250 per hour"
        className="w-full h-auto block"
        loading="lazy"
        decoding="async"
      />
    </motion.figure>
  );
}

export default function PackageFlyersGallery({
  packages,
  light = false,
  showHeader = true,
  className = '',
}) {
  return (
    <div className={className}>
      {showHeader && (
        <SectionHeader
          eyebrow="Visual Package Guide"
          title="Client Package Flyers"
          subtitle="Official Red Rose package graphics — same pricing and inclusions as your booking sheet."
          className="mb-8 md:mb-10"
          light={light}
        />
      )}
      <div className="space-y-8 md:space-y-10">
        {packages.map((pkg, i) => (
          <PackageFlyerBlock key={pkg.slug || pkg.name} pkg={pkg} index={i} light={light} />
        ))}
      </div>
    </div>
  );
}
