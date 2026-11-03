import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import BookingLink from '../components/ui/BookingLink';
import { PARTY_SERVICE } from '../data/servicesContent';
import { BUSINESS, formatPrice } from '../utils/constants';

function tierLabel(tier) {
  if (tier.hoursLabel) return tier.hoursLabel;
  return `${tier.hours} Hours`;
}

export default function PartyServicesPage() {
  usePageMeta({
    title: 'Parties & Special Occasions',
    description: PARTY_SERVICE.intro,
  });

  return (
    <>
      <PageHero
        variant="services"
        title={
          <>
            Parties <span className="text-gradient-gold">& Special Occasions</span>
          </>
        }
        subtitle={PARTY_SERVICE.heroSubtitle}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto">
          <p className="text-center font-display text-lg md:text-xl text-antiqueGold font-semibold mb-6">
            {PARTY_SERVICE.startingAtLabel}
          </p>
          <p className="text-body-muted text-center text-base md:text-lg mb-4 leading-relaxed">
            {PARTY_SERVICE.intro}
          </p>
          <p className="text-body-muted text-center text-base md:text-lg mb-10 leading-relaxed">
            {PARTY_SERVICE.introHighlight}
          </p>

          <div className="rounded-lg border border-antiqueGold/30 bg-white/70 p-6 md:p-8 mb-10 text-center">
            <h2 className="font-display text-xl md:text-2xl text-charcoal font-semibold mb-4">
              {PARTY_SERVICE.consultationTitle}
            </h2>
            <p className="text-body-muted text-base md:text-lg leading-relaxed mb-6">
              {PARTY_SERVICE.consultationBody}
            </p>
            <a
              href={`tel:${BUSINESS.phoneRaw}`}
              className="font-display text-xl text-antiqueGold font-semibold hover:text-richRose transition-colors"
            >
              {BUSINESS.phone}
            </a>
          </div>

          <div className="rounded-lg border border-antiqueGold/30 bg-white/70 p-6 md:p-8 mb-8">
            <h3 className="font-display text-2xl text-center text-charcoal font-semibold mb-6">
              {PARTY_SERVICE.pricingSectionTitle}
            </h3>
            <ul className="space-y-3 max-w-md mx-auto">
              {PARTY_SERVICE.pricingTiers.map((tier) => (
                <li
                  key={tier.hours}
                  className="flex justify-between items-center border-b border-antiqueGold/15 pb-3 font-display text-lg"
                >
                  <span>{tierLabel(tier)}</span>
                  <span className="text-antiqueGold font-semibold">{formatPrice(tier.price)}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-charcoal/90 font-semibold text-base mt-6 px-2">
              {PARTY_SERVICE.minimumNote}
            </p>
          </div>

          <p className="text-center text-sm md:text-base text-charcoal font-semibold mb-12 max-w-xl mx-auto">
            {PARTY_SERVICE.schoolEventsNote}{' '}
            <Link to="/contact" className="text-antiqueGold hover:text-richRose transition-colors">
              Contact us →
            </Link>
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <BookingLink className="btn-primary">Explore Party Packages</BookingLink>
            <Link to="/services" className="btn-secondary">
              Back to Services
            </Link>
            <Link to="/contact#inquiry-form" className="btn-secondary">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
