import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import BookingLink from '../components/ui/BookingLink';
import { ENGAGEMENT_PACKAGES, ENGAGEMENT_ADDITIONAL_HOUR_NOTE } from '../data/homeContent';
import { PackageBookCtaLink } from '../components/pricing/PackageBookingLink';
import PackageTitle from '../components/pricing/PackageTitle';
import { formatPrice } from '../utils/constants';

export default function EngagementServicesPage() {
  const pkg = ENGAGEMENT_PACKAGES[0];

  usePageMeta({
    title: 'Engagement Celebrations — The First Bloom',
    description:
      'The First Bloom engagement photo booth package — 3 hours for $650. Where every love story begins. Red Rose Photo Booth LLC.',
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
        subtitle={pkg.tagline}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto">
          {pkg.callouts?.map((line) => (
            <p
              key={line}
              className="text-center font-display text-xl md:text-2xl text-charcoal font-semibold mb-3"
            >
              {line}
            </p>
          ))}

          <div className="space-y-4 mb-10 text-body-muted text-center text-base md:text-lg leading-relaxed">
            {pkg.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <SectionHeader title={pkg.featuresHeading || "What's Included"} className="mb-6" />
          <ul className="grid sm:grid-cols-2 gap-3 mb-8 max-w-2xl mx-auto">
            {pkg.features.map((item) => (
              <li key={item} className="flex items-start gap-2 text-charcoal/90 font-medium">
                <span className="text-antiqueGold shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="text-center p-6 md:p-8 rounded-lg border border-antiqueGold/30 bg-white/70 mb-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-charcoal mb-2">
              <PackageTitle pkg={pkg} />
            </h2>
            <p className="font-display text-3xl text-antiqueGold font-semibold mb-2">
              {formatPrice(pkg.price)}
              <span className="text-lg text-charcoal/80 font-medium"> · {pkg.hours} hours</span>
            </p>
            <p className="text-antiqueGold font-semibold italic text-lg mb-4">{pkg.closing}</p>
            <p className="text-body-muted text-sm md:text-base mb-6">{ENGAGEMENT_ADDITIONAL_HOUR_NOTE}</p>
            <PackageBookCtaLink pkg={pkg} className="btn-primary inline-flex" label="Book The First Bloom" />
          </div>

          <p className="text-center text-sm text-charcoal/75 mb-8 max-w-xl mx-auto">
            Wedding reception packages (One Rose, Dozen, Bouquet) and the four-hour reception minimum are listed
            separately on our{' '}
            <Link to="/pricing" className="text-antiqueGold font-semibold hover:text-richRose">
              pricing page
            </Link>
            .
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <BookingLink className="btn-primary">Check Availability &amp; Book</BookingLink>
            <Link to="/pricing" className="btn-secondary">
              View Wedding Packages
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
