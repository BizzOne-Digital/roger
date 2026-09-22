import { Link } from 'react-router-dom';
import HomeServicesSection from './HomeServicesSection';
import { BUSINESS } from '../../utils/constants';

export default function HeroSection() {
  return (
    <>
      <section
        className="relative w-full overflow-hidden bg-charcoal"
        aria-label="Red Rose Photo Booth LLC"
      >
        <div
          className="absolute inset-0 bg-gradient-to-b from-roseNoir/60 via-charcoal to-charcoal"
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12 text-center">
          <p className="text-antiqueGold font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-4">
            {BUSINESS.name}
          </p>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-warmIvory leading-tight">
            Choose Your <span className="text-gradient-gold">Photo Booth</span> Experience
          </h1>
          <p className="mt-4 text-warmIvory/85 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select the service that fits your event below. Simple pricing, clear packages, and Red Rose quality
            on every celebration.
          </p>
          <Link
            to="/contact"
            className="inline-block mt-6 text-sm font-bold text-antiqueGold hover:text-champagneGold transition-colors"
          >
            Questions? Contact Roger →
          </Link>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
      </section>

      <HomeServicesSection showHeader={false} className="!pt-8 md:!pt-10" />
    </>
  );
}
