import { useEffect, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { testimonialsAPI } from '../api/client';
import TestimonialCard from '../components/testimonials/TestimonialCard';
import { LoadingSpinner } from '../components/ui/Shared';
import PageHero from '../components/ui/PageHero';
import { motion } from 'framer-motion';

export default function TestimonialsPage() {
  usePageMeta({
    title: 'Testimonials',
    description: 'Read what Sacramento clients say about Red Rose Photo Booth luxury event experiences.',
  });

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsAPI.getAll({ limit: 50 })
      .then(({ data }) => setTestimonials(data.testimonials))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        variant="testimonials"
        title={<>Client <span className="text-gradient-gold">Testimonials</span></>}
        subtitle="Real stories from weddings, corporate events, and celebrations across Sacramento."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
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
