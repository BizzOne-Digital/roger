import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomeHeroBanner from '../components/home/HomeHeroBanner';
import HomeIntroSection from '../components/home/HomeIntroSection';
import HomePackagesSection from '../components/home/HomePackagesSection';
import HomeIncludesSection from '../components/home/HomeIncludesSection';
import HowItWorks from '../components/home/HowItWorks';
import BookingCTA from '../components/home/BookingCTA';
import TestimonialsSection from '../components/home/TestimonialsSection';
import { SectionHeader } from '../components/ui/SectionTypography';
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
      <HomeHeroBanner />
      <HomeIntroSection />
      <HomePackagesSection />
      <HomeIncludesSection />
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
