import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SectionHeader } from '../components/ui/SectionTypography';
import HeroSection from '../components/home/HeroSection';
import EventMarquee from '../components/home/EventMarquee';
import FeaturedService from '../components/home/FeaturedService';
import HowItWorks from '../components/home/HowItWorks';
import BookingCTA from '../components/home/BookingCTA';
import TestimonialsSection from '../components/home/TestimonialsSection';
import ProductCard from '../components/shop/ProductCard';
import { productsAPI, testimonialsAPI } from '../api/client';
import { mergeHomeTestimonials } from '../data/homeTestimonials';
import { SkeletonCard } from '../components/ui/Shared';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  useEffect(() => {
    productsAPI.getAll({ featured: true, limit: 3 })
      .then(({ data }) => setProducts(data.products))
      .catch(() => {})
      .finally(() => setLoadingProducts(false));

    testimonialsAPI.getAll({ limit: 8 })
      .then(({ data }) => setTestimonials(mergeHomeTestimonials(data.testimonials)))
      .catch(() => setTestimonials(mergeHomeTestimonials([])))
      .finally(() => setLoadingTestimonials(false));
  }, []);

  return (
    <>
      <HeroSection />
      <EventMarquee />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 relative overflow-hidden pb-6 sm:pb-0">
              <div className="absolute -inset-2 sm:-inset-4 border border-antiqueGold/20 rounded-lg pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=900&q=80"
                alt="Wedding guests enjoying the Red Rose Photo Booth experience"
                className="w-full max-w-lg mx-auto rounded-lg shadow-2xl shadow-antiqueGold/15 object-cover aspect-[4/5] lg:aspect-[3/4]"
                loading="lazy"
              />
              <div className="absolute bottom-2 right-2 sm:-bottom-5 sm:-right-4 lg:-right-6 bg-charcoal text-warmIvory px-4 py-2 sm:px-5 sm:py-3 rounded border border-antiqueGold/30 shadow-lg max-w-[85%] sm:max-w-none">
                <p className="font-script text-lg sm:text-xl text-antiqueGold font-semibold">Strike & Pose</p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <SectionHeader
                align="left"
                eyebrow="The Red Rose Experience"
                title="Interactive. Memorable. Professionally Managed."
                className="mb-8"
              />
              <p className="text-body-muted mb-4">
                Red Rose Photo Booth creates interactive, memorable, and professionally managed event
                experiences for Sacramento and the greater Bay Area. From intimate weddings to grand
                corporate galas, we bring cinematic quality to every celebration.
              </p>
              <p className="text-body-muted mb-8">
                Led by owner and operator Roger Marionneaux, our team delivers elegant photo booth
                setups with custom designs, instant sharing, and attentive service that exceeds expectations.
              </p>
              <Link to="/services" className="btn-secondary">View All Services</Link>
            </div>
          </div>
        </div>
      </section>

      <FeaturedService />
      <HowItWorks />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-end justify-between mb-10 md:mb-12 gap-4 min-w-0">
            <SectionHeader eyebrow="Shop" title="Featured Products" className="mb-0 text-left" align="left" />
            <Link to="/shop" className="text-antiqueGold hover:text-richRose transition-colors text-base font-bold shrink-0">
              View All →
            </Link>
          </div>
          {loadingProducts ? (
            <div className="flex flex-wrap justify-center gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-full max-w-sm">
                  <SkeletonCard />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6 items-stretch">
              {products.map((p) => (
                <div key={p._id} className="w-full max-w-sm h-full flex">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-body-muted text-center py-8">Products coming soon. Check back shortly!</p>
          )}
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} loading={loadingTestimonials} />

      <BookingCTA />
    </>
  );
}
