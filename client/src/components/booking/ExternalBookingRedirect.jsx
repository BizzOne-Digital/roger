import { useEffect } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../ui/PageHero';
import { getBookingUrl } from '../../utils/booking';

export default function ExternalBookingRedirect() {
  const bookingUrl = getBookingUrl();

  usePageMeta({
    title: 'Book Your Booth',
    description:
      'Check availability, get a quote, and pay your deposit securely through Red Rose Photo Booth online booking.',
  });

  useEffect(() => {
    window.location.replace(bookingUrl);
  }, [bookingUrl]);

  return (
    <>
      <PageHero
        variant="booking"
        title={
          <>
            Book &amp; Pay <span className="text-gradient-gold">Deposit</span>
          </>
        }
        subtitle="Secure online booking — choose your package and pay your retainer in one place."
      />
      <section className="section-padding bg-warmIvory">
        <div className="max-w-xl mx-auto text-center">
          <p className="text-body-muted text-base md:text-lg mb-6 leading-relaxed">
            Opening our secure booking page…
          </p>
          <a href={bookingUrl} className="btn-primary">
            Continue to Check Availability
          </a>
          <p className="text-sm text-body-muted mt-6">
            You&apos;ll review packages, choose your date, and complete booking on our secure online
            booking page.
          </p>
        </div>
      </section>
    </>
  );
}
