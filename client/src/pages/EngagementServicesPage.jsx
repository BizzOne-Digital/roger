import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import {
  ENGAGEMENT_PACKAGES,
  ENGAGEMENT_ADDITIONAL_HOUR_NOTE,
  ENGAGEMENT_PAGE_COPY,
} from '../data/homeContent';
import { PackageBookCtaLink } from '../components/pricing/PackageBookingLink';
import { BUSINESS, formatPrice } from '../utils/constants';

function tierLabel(tier) {
  if (tier.hoursLabel) return tier.hoursLabel;
  return `${tier.hours} Hours`;
}

export default function EngagementServicesPage() {
  const pkg = ENGAGEMENT_PACKAGES[0];

  usePageMeta({
    title: 'Engagement Celebrations — The First Bloom',
    description:
      'The First Bloom engagement photo booth — starting at $650 for 3 hours. Where every love story begins. Red Rose Photo Booth LLC.',
  });

  return (
    <>
      <PageHero
        variant="services"
        title={
          <>
            Engagement <span className="text-gradient-gold">Celebrations</span>
          </>
        }
        subtitle={ENGAGEMENT_PAGE_COPY.titleLine}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 rounded-lg overflow-hidden border border-antiqueGold/30 shadow-md">
            <img
              src={ENGAGEMENT_PAGE_COPY.heroImage}
              alt={ENGAGEMENT_PAGE_COPY.heroImageAlt}
              className="w-full h-auto max-h-[480px] object-cover"
              loading="eager"
            />
          </div>

          <p className="text-center font-display text-lg md:text-xl text-antiqueGold font-semibold mb-4">
            {ENGAGEMENT_PAGE_COPY.startingLabel}
          </p>

          <h2 className="font-display text-2xl md:text-3xl text-center text-charcoal font-semibold mb-6">
            {ENGAGEMENT_PAGE_COPY.callout}
          </h2>

          <div className="space-y-4 mb-10 text-body-muted text-center text-base md:text-lg leading-relaxed">
            {ENGAGEMENT_PAGE_COPY.introParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}
          </div>

          <SectionHeader title={ENGAGEMENT_PAGE_COPY.includesHeading} className="mb-6" />
          <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-3xl mx-auto">
            {pkg.features.map((item) => (
              <li key={item} className="flex items-start gap-2 text-charcoal/90 font-medium text-sm md:text-base">
                <span className="text-antiqueGold shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-antiqueGold/30 bg-white/70 p-6 md:p-8 mb-10">
            <h3 className="font-display text-2xl text-center text-charcoal font-semibold mb-6">
              {ENGAGEMENT_PAGE_COPY.pricingSectionTitle}
            </h3>
            <ul className="space-y-3 max-w-md mx-auto mb-6">
              {(pkg.pricingTiers || [{ hours: pkg.hours, price: pkg.price }]).map((tier) => (
                <li
                  key={tier.hours}
                  className="flex justify-between items-center border-b border-antiqueGold/15 pb-3 font-display text-lg"
                >
                  <span>{tierLabel(tier)}</span>
                  <span className="text-antiqueGold font-semibold">{formatPrice(tier.price)}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-body-muted text-base font-semibold">{ENGAGEMENT_ADDITIONAL_HOUR_NOTE}</p>
          </div>

          <div className="rounded-lg border border-antiqueGold/30 bg-white/70 p-6 md:p-8 mb-10 text-center">
            <h2 className="font-display text-xl md:text-2xl text-charcoal font-semibold mb-4">
              {ENGAGEMENT_PAGE_COPY.consultationTitle}
            </h2>
            <p className="text-body-muted text-base md:text-lg leading-relaxed mb-4">
              {ENGAGEMENT_PAGE_COPY.consultationBody}
            </p>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="font-display text-xl text-antiqueGold font-semibold hover:text-richRose transition-colors"
            >
              {BUSINESS.phone}
            </a>
          </div>

          <p className="text-center text-sm text-charcoal/75 italic mb-8 max-w-xl mx-auto">
            {ENGAGEMENT_PAGE_COPY.weddingReceptionNote}{' '}
            <Link to="/pricing" className="text-antiqueGold font-semibold hover:text-richRose not-italic">
              View wedding packages →
            </Link>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <PackageBookCtaLink
              pkg={pkg}
              className="btn-primary inline-flex"
              label="Book Your Engagement Celebration"
            />
            <Link to="/contact#inquiry-form" className="btn-secondary">
              Request a Consultation
            </Link>
            <Link to="/services" className="btn-secondary">
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
