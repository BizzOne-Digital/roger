import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import BookingLink from '../components/ui/BookingLink';
import { PARTY_SERVICE } from '../data/servicesContent';
import { formatPrice } from '../utils/constants';

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
          <p className="text-center font-display text-xl md:text-2xl text-charcoal font-semibold mb-4">
            {PARTY_SERVICE.callout}
          </p>
          <p className="text-body-muted text-center text-base md:text-lg mb-6 leading-relaxed">{PARTY_SERVICE.intro}</p>
          <p className="text-center text-sm md:text-base text-charcoal/80 font-medium mb-6">{PARTY_SERVICE.eventTypes}</p>
          <p className="text-center text-sm md:text-base text-charcoal font-semibold mb-12 max-w-xl mx-auto">
            {PARTY_SERVICE.schoolEventsNote}{' '}
            <Link to="/contact" className="text-antiqueGold hover:text-richRose transition-colors">
              Contact us →
            </Link>
          </p>

          <SectionHeader title={PARTY_SERVICE.experienceTitle} className="mb-6" />
          <p className="text-center font-display text-lg md:text-xl font-semibold text-charcoal uppercase tracking-wide mb-6">
            {PARTY_SERVICE.includesHeading}
          </p>
          <ul className="grid sm:grid-cols-2 gap-3 mb-10 max-w-2xl mx-auto">
            {PARTY_SERVICE.includes.map((item) => (
              <li key={item} className="flex items-start gap-2 text-charcoal font-medium">
                <span className="text-antiqueGold shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-antiqueGold/30 bg-white/70 p-6 md:p-8 mb-8">
            <h3 className="font-display text-2xl text-center text-charcoal font-semibold mb-2">Choose your hours</h3>
            <p className="text-center text-body-muted text-sm mb-6 max-w-lg mx-auto">
              Pick how long you want Red Rose at your event — all eight features above are included with every booking.
            </p>
            <ul className="space-y-3 max-w-md mx-auto">
              {PARTY_SERVICE.pricingTiers.map(({ hours, price }) => (
                <li
                  key={hours}
                  className="flex justify-between items-center border-b border-antiqueGold/15 pb-3 font-display text-lg"
                >
                  <span>{hours} Hours</span>
                  <span className="text-antiqueGold font-semibold">{formatPrice(price)}</span>
                </li>
              ))}
            </ul>
            <p className="text-center text-antiqueGold font-bold mt-6">{PARTY_SERVICE.additionalHourNote}</p>
            <p className="text-center text-body-muted text-sm mt-3">{PARTY_SERVICE.minimumNote}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <BookingLink className="btn-primary">Book Your Party</BookingLink>
            <Link to="/services" className="btn-secondary">
              Back to Services
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
