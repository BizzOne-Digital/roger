import { Link, useParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';

export default function OrderConfirmationPage() {
  const { orderNumber } = useParams();
  usePageMeta({ title: 'Order Confirmation' });

  return (
    <>
      <PageHero
        variant="confirmation"
        align="center"
        title={<>Thank <span className="text-gradient-gold">You!</span></>}
        subtitle={`Order reference: ${orderNumber}`}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-lead mb-6">
            Your order request has been submitted successfully. A confirmation email has been sent
            to your inbox. Our team will review your order and contact you within 24–48 hours to
            confirm details and arrange payment. Your order status is currently <strong>pending</strong>.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/shop" className="btn-primary">Continue Shopping</Link>
            <Link to="/" className="btn-secondary">Back to Home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
