import { Link } from 'react-router-dom';
import { SectionHeader } from '../ui/SectionTypography';
import TestimonialsCarousel from '../testimonials/TestimonialsCarousel';
import { LoadingSpinner } from '../ui/Shared';

export default function TestimonialsSection({
  testimonials,
  loading,
}) {
  return (
    <section className="section-padding bg-softBlush overflow-hidden">
      <div className="max-w-7xl mx-auto min-w-0 w-full">
        <div className="flex flex-wrap items-end justify-between mb-10 md:mb-12 gap-4 min-w-0">
          <SectionHeader
            eyebrow="Testimonials"
            title="What Our Clients Say"
            className="mb-0 text-left"
            align="left"
          />
          <Link
            to="/testimonials"
            className="text-antiqueGold hover:text-richRose transition-colors text-base font-bold shrink-0"
          >
            Read More →
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : testimonials.length > 0 ? (
          <TestimonialsCarousel testimonials={testimonials} />
        ) : (
          <p className="text-body-muted text-center py-8">Client testimonials coming soon.</p>
        )}
      </div>
    </section>
  );
}
