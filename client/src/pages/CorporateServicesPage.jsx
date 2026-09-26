import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import TierPackageSection from '../components/services/TierPackageSection';
import BookingLink from '../components/ui/BookingLink';
import { CORPORATE_PACKAGES, CORPORATE_PAGE } from '../data/servicesContent';

export default function CorporateServicesPage() {
  usePageMeta({
    title: 'Corporate Events',
    description: CORPORATE_PAGE.intro,
  });

  return (
    <>
      <PageHero
        variant="services"
        title={
          <>
            Corporate <span className="text-gradient-gold">Events</span>
          </>
        }
        subtitle={CORPORATE_PAGE.heroSubtitle}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-6xl mx-auto">
          <p className="text-body-muted text-center text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            {CORPORATE_PAGE.intro}
          </p>

          <TierPackageSection packages={CORPORATE_PACKAGES} />

          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <BookingLink className="btn-primary">Book Corporate Event</BookingLink>
            <Link to="/services" className="btn-secondary">
              Back to Services
            </Link>
            <Link to="/contact" className="btn-secondary">
              Request Branding Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
