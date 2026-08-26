import { Link, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';

export default function BookingConfirmationPage() {
  const { orderNumber } = useParams();
  usePageMeta({ title: 'Booking Request Received' });

  return (
    <>
      <PageHero
        variant="confirmation"
        align="center"
        title={<>Booking <span className="text-gradient-gold">Confirmed</span></>}
        subtitle={`Reference: ${orderNumber}`}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-2xl mx-auto">
          <div className="bg-softBlush border border-antiqueGold/20 rounded-lg p-6 md:p-8 mb-8 text-left">
            <p className="section-lead">
              Thank you for choosing Red Rose Photo Booth! Your booking request has been submitted
              and a confirmation email has been sent to your inbox.
            </p>
            <p className="text-velvetRed font-bold text-base mt-4">
              Important: Your date is pending confirmation from Red Rose Photo Booth.
              Roger will review your request and contact you within 24–48 hours to confirm availability.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">Back to Home</Link>
            <Link to="/contact" className="btn-secondary">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}
