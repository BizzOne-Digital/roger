import BookingLink from '../components/ui/BookingLink';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import ServiceOfferingCard from '../components/services/ServiceOfferingCard';
import { SERVICE_OFFERINGS } from '../data/servicesContent';

export default function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description:
      'Wedding photo booth packages, parties, corporate events, and GLAM add-ons — Red Rose Photo Booth Bay Area.',
  });

  return (
    <>
      <PageHero
        variant="services"
        title={
          <>
            Photo Booth <span className="text-gradient-gold">Services</span>
          </>
        }
        subtitle="Choose your event type — see what’s included, what it costs, and book with confidence."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="What We Offer"
            title="Photo Booth Experiences"
            subtitle="Four clear paths: weddings, parties, corporate events, and our GLAM upgrade."
            className="mb-10 md:mb-14"
          />

          <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-stretch">
            {SERVICE_OFFERINGS.map((offering, i) => (
              <ServiceOfferingCard key={offering.id} offering={offering} index={i} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-12 md:mt-16">
            <BookingLink className="btn-primary">Book Your Experience</BookingLink>
            <Link to="/contact" className="btn-secondary">
              Request a Consultation
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
