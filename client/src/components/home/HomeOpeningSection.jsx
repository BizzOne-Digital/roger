import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import HomeServicesSection from './HomeServicesSection';
import { HERO_BANNER, PACKAGE_PAGE_INTRO, RED_ROSE_BIO, RED_ROSE_PROMISE, BRIDAL_EXPO_ANNOUNCEMENT } from '../../data/homeContent';
import { BUSINESS } from '../../utils/constants';

export default function HomeOpeningSection() {
  return (
    <>
      {/* Original logo banner */}
      <section
        className="relative w-full overflow-hidden bg-charcoal"
        aria-label="Red Rose Photo Booth LLC"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-roseNoir/50 via-charcoal to-charcoal" aria-hidden="true" />
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-10 sm:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={HERO_BANNER}
              alt="Red Rose Photo Booth LLC — Capturing Your Story"
              className="w-full h-auto max-h-[min(58vh,620px)] sm:max-h-[min(62vh,680px)] object-contain object-center mx-auto block drop-shadow-2xl"
              width={1920}
              height={1080}
              fetchPriority="high"
            />
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
      </section>

      {/* Value proposition */}
      <section className="section-padding bg-warmIvory pt-10 md:pt-12">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            title={RED_ROSE_PROMISE.title}
            className="mb-6"
          />
          {RED_ROSE_PROMISE.paragraphs.map((text, i) => (
            <p
              key={i}
              className={`text-body-muted text-base md:text-lg leading-relaxed font-medium ${
                i === 0 ? 'mb-4' : 'mb-0'
              }`}
            >
              {text}
            </p>
          ))}
        </div>
      </section>

      <section className="section-padding bg-softBlush pt-0 pb-10 md:pb-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="rounded-lg border border-antiqueGold/35 bg-warmIvory/90 p-6 md:p-8 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-antiqueGold mb-2">
              {BRIDAL_EXPO_ANNOUNCEMENT.eyebrow}
            </p>
            <h2 className="font-display text-xl md:text-2xl font-semibold text-charcoal mb-2">
              {BRIDAL_EXPO_ANNOUNCEMENT.title}
            </h2>
            <p className="text-charcoal font-semibold">{BRIDAL_EXPO_ANNOUNCEMENT.when}</p>
            <p className="text-body-muted text-sm md:text-base mt-1">{BRIDAL_EXPO_ANNOUNCEMENT.where}</p>
            <p className="text-body-muted text-sm md:text-base mt-4 leading-relaxed">
              {BRIDAL_EXPO_ANNOUNCEMENT.detail}
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="section-padding bg-warmIvory pt-0 md:pt-4 border-t border-antiqueGold/15">
        <div className="max-w-4xl mx-auto">
          <SectionHeader align="left" eyebrow="Our Story" title={RED_ROSE_BIO.title} className="mb-6" />
          {RED_ROSE_BIO.paragraphs.map((text, i) => (
            <p key={i} className="text-body-muted text-base md:text-lg mb-4 leading-relaxed last:mb-0">
              {text}
            </p>
          ))}
          <Link
            to="/about"
            className="inline-block mt-4 text-sm font-bold text-antiqueGold hover:text-richRose transition-colors"
          >
            Read our full story →
          </Link>
        </div>
      </section>

      {/* Packages intro copy (details live on each service page) */}
      <section className="section-padding bg-warmIvory pt-0 border-t border-antiqueGold/15">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            eyebrow="Red Rose Photo Booth LLC"
            title="Red Rose Photo Booth Packages"
            subtitle={PACKAGE_PAGE_INTRO.lead}
            className="mb-6"
          />
          <p className="text-body-muted text-base md:text-lg leading-relaxed font-medium">
            {PACKAGE_PAGE_INTRO.body}
          </p>
        </div>
      </section>

      {/* Choose your event type */}
      <section className="section-padding bg-warmIvory pt-0 md:pt-4">
        <div className="max-w-7xl mx-auto text-center mb-10 md:mb-12">
          <p className="text-antiqueGold font-bold text-xs sm:text-sm uppercase tracking-[0.25em] mb-3">
            {BUSINESS.name}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-charcoal leading-tight">
            Choose Your <span className="text-gradient-gold">Photo Booth</span> Experience
          </h2>
          <p className="mt-4 text-body-muted text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Select the service that fits your event below. Simple pricing, clear packages, and Red Rose quality on
            every celebration.
          </p>
        </div>
        <HomeServicesSection showHeader={false} className="!py-0 !pt-0" />
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-4 mt-10 md:mt-12 px-4">
          <Link to="/contact" className="btn-secondary">
            Schedule a Consultation
          </Link>
          <Link to="/pricing" className="text-sm font-bold text-antiqueGold hover:text-richRose transition-colors self-center">
            View wedding package details →
          </Link>
        </div>
      </section>
    </>
  );
}
