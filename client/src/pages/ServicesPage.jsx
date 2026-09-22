import BookingLink from '../components/ui/BookingLink';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import HomeServicesSection from '../components/home/HomeServicesSection';

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

      <HomeServicesSection className="!pt-0" />

      <section className="section-padding pt-0 bg-warmIvory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-4">
          <BookingLink className="btn-primary">Book Your Experience</BookingLink>
          <Link to="/contact" className="btn-secondary">
            Request a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
