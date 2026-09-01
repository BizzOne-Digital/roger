import { useEffect, useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import HomeFeatureHighlights from '../components/home/HomeFeatureHighlights';
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

export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    testimonialsAPI.getAll({ limit: 8 })
      .then(({ data }) => setTestimonials(mergeHomeTestimonials(data.testimonials)))
      .catch(() => setTestimonials(mergeHomeTestimonials([])))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  return (
    <>
      <HeroSection />
      <HomeFeatureHighlights />
      <EventMarquee />
      <HomeIntroSection />
      <HomePackagesSection />
      <HomeIncludesSection />
      <HomeAddOnsSection />
      <HowItWorks />
      <TestimonialsSection testimonials={testimonials} loading={loadingTestimonials} />
      <BookingCTA />
    </>
  );
}
