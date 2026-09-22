import { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import EventMarquee from '../components/home/EventMarquee';
import HomeIntroSection from '../components/home/HomeIntroSection';
import HomePackagesSection from '../components/home/HomePackagesSection';
import HomeIncludesSection from '../components/home/HomeIncludesSection';
import HomeAddOnsSection from '../components/home/HomeAddOnsSection';
import HowItWorks from '../components/home/HowItWorks';
import BookingCTA from '../components/home/BookingCTA';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { testimonialsAPI } from '../api/client';
import { mergeHomeTestimonials } from '../data/homeTestimonials';
import { TESTIMONIALS_UPDATED_EVENT } from '../utils/testimonialsEvents';
import TheKnotBadge from '../components/ui/TheKnotBadge';

export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  const loadTestimonials = () => {
    setLoadingTestimonials(true);
    testimonialsAPI
      .getAll({ limit: 8 })
      .then(({ data }) => setTestimonials(mergeHomeTestimonials(data.testimonials)))
      .catch(() => setTestimonials(mergeHomeTestimonials([])))
      .finally(() => setLoadingTestimonials(false));
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
      <HeroSection />
      <EventMarquee />
      <HomeIntroSection />
      <HomePackagesSection />
      <HomeAddOnsSection />
      <HomeIncludesSection />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} loading={loadingTestimonials} />
      <section className="section-padding bg-warmIvory border-t border-antiqueGold/15">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-4">
          <p className="font-display text-xl md:text-2xl text-charcoal font-semibold">
            Planning your wedding?
          </p>
          <p className="text-body-muted text-base md:text-lg max-w-xl">
            See our profile, reviews, and availability on The Knot.
          </p>
          <TheKnotBadge />
        </div>
      </section>
      <BookingCTA />
    </>
  );
}
