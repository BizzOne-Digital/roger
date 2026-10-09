import { useEffect, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { testimonialsAPI } from '../api/client';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { LoadingSpinner } from '../components/ui/Shared';
import PageHero from '../components/ui/PageHero';
import { motion } from 'framer-motion';
import { TESTIMONIALS_UPDATED_EVENT } from '../utils/testimonialsEvents';
import { BUSINESS } from '../utils/constants';

export default function TestimonialsPage() {
  usePageMeta({
    title: 'Testimonials',
    description: 'Read what Bay Area clients say about Red Rose Photo Booth event experiences.',
  });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTestimonials = () => {
    setLoading(true);
    testimonialsAPI
      .getAll({ limit: 50 })
      .then(({ data }) => setTestimonials(data.testimonials))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadTestimonials();
  }, []);

  useEffect(() => {
    const onUpdate = () => loadTestimonials();
    window.addEventListener(TESTIMONIALS_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(TESTIMONIALS_UPDATED_EVENT, onUpdate);
  }, []);

  return (
    <>
      <PageHero
        variant="testimonials"
        title={<>Client <span className="text-gradient-gold">Testimonials</span></>}
        subtitle="Real stories from weddings, corporate events, and celebrations across the Bay Area."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 md:mb-12 p-6 md:p-8 rounded-lg border border-antiqueGold/30 bg-white/80 text-center max-w-2xl mx-auto">
            <p className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-2">
              Loved your experience?
            </p>
            <p className="text-body-muted text-base md:text-lg mb-6">
              Leave us a review on Google — it helps other couples and event hosts find Red Rose Photo Booth.
            </p>
            <a
              href={BUSINESS.googleReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex"
            >
              Leave a Google Review
            </a>
          </div>

          {loading ? (
            <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
          ) : testimonials.length === 0 ? (
            <p className="text-body-muted text-center py-20">No testimonials yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
              {testimonials.map((t, i) => (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="h-full"
                >
                  <TestimonialCard testimonial={t} large={t.featured} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
