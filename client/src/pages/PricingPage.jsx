import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import BookingLink from '../components/ui/BookingLink';
import {
  HOME_PACKAGES,
  PACKAGE_INCLUDES,
  PACKAGE_MINIMUM_NOTE,
  BOOKING_TERMS,
  PACKAGE_PAGE_INTRO,
} from '../data/homeContent';
import HomeAddOnsSection from '../components/home/HomeAddOnsSection';
import { formatPrice } from '../utils/constants';

const faqs = [
  {
    q: 'How do I lock in my date?',
    a: 'Use our secure BoothBook online booking page to check availability, select your package, and pay your 20% non-refundable retainer. You can also contact Roger directly for a consultation.',
  },
  {
    q: 'When is the final balance due?',
    a: 'The remaining balance is due 7 days prior to your event.',
  },
  {
    q: 'Do you travel outside the Bay Area?',
    a: 'Yes! We serve the Bay Area and surrounding regions. Travel fees may apply for distant venues.',
  },
  {
    q: 'What is the minimum booking time?',
    a: PACKAGE_MINIMUM_NOTE,
  },
];

function PackageFeatures({ features }) {
  return (
    <ul className="space-y-1">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-charcoal/90 font-medium text-sm">
          <span className="text-antiqueGold shrink-0">✦</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PricingPage() {
  usePageMeta({
    title: 'Pricing',
    description:
      'Red Rose Photo Booth packages — 1/2 Dozen, Dozen, and Baker\'s Dozen. Bay Area photo booth rental.',
  });

  return (
    <>
      <PageHero
        variant="pricing"
        title={<>Photo Booth <span className="text-gradient-gold">Packages</span></>}
        subtitle={PACKAGE_PAGE_INTRO.lead}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Package Overview" className="mb-4" />
          <p className="text-body-muted text-center text-base md:text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
            {PACKAGE_PAGE_INTRO.body}
          </p>

          <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-6">
            <table className="w-full text-left border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-charcoal text-warmIvory border-b border-antiqueGold/30">
                  <th className="p-4 font-display text-lg text-antiqueGold">Package</th>
                  <th className="p-4 font-display text-lg text-antiqueGold">Total Price</th>
                  <th className="p-4 font-display text-lg text-antiqueGold">Includes</th>
                </tr>
              </thead>
              <tbody>
                {HOME_PACKAGES.map((pkg) => (
                  <tr
                    key={pkg.name}
                    className={`border-b border-antiqueGold/15 align-top ${
                      pkg.featured ? 'bg-antiqueGold/10' : pkg.vip ? 'bg-antiqueGold/5' : 'bg-white/60'
                    }`}
                  >
                    <td className="p-4 font-display text-xl font-semibold">
                      {pkg.name}
                      {pkg.tagline && (
                        <span className="block text-base text-antiqueGold/90 font-medium mt-0.5">{pkg.tagline}</span>
                      )}
                      {pkg.featured && (
                        <span className="block text-xs text-antiqueGold font-bold uppercase tracking-wider mt-2">
                          {pkg.badge || 'Most Popular'}
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-display text-2xl text-antiqueGold font-semibold whitespace-nowrap">
                      {formatPrice(pkg.price)}
                    </td>
                    <td className="p-4">
                      {pkg.summary && <p className="text-sm text-charcoal/80 mb-3">{pkg.summary}</p>}
                      <PackageFeatures features={pkg.features} />
                      {pkg.closing && (
                        <p className="text-sm text-antiqueGold font-semibold mt-3 italic">{pkg.closing}</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4 mb-6">
            {HOME_PACKAGES.map((pkg) => (
              <article
                key={pkg.name}
                className={`p-5 rounded-lg border ${
                  pkg.featured
                    ? 'border-antiqueGold bg-antiqueGold/10'
                    : pkg.vip
                      ? 'border-antiqueGold/40 bg-antiqueGold/5'
                      : 'border-antiqueGold/25 bg-white/60'
                }`}
              >
                <div className="flex justify-between gap-3 mb-1">
                  <div>
                    <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                    {pkg.tagline && (
                      <p className="text-antiqueGold/90 text-sm font-medium mt-0.5">{pkg.tagline}</p>
                    )}
                  </div>
                  <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
                    {formatPrice(pkg.price)}
                  </p>
                </div>
                {pkg.featured && (
                  <p className="text-xs text-antiqueGold font-bold uppercase tracking-wider mb-3">
                    {pkg.badge || 'Most Popular'}
                  </p>
                )}
                {pkg.summary && <p className="text-body-muted text-sm mb-3">{pkg.summary}</p>}
                <PackageFeatures features={pkg.features} />
                {pkg.closing && (
                  <p className="text-sm text-antiqueGold font-semibold mt-3 italic">{pkg.closing}</p>
                )}
              </article>
            ))}
          </div>

          <p className="text-center text-charcoal/90 font-semibold text-base md:text-lg mb-8 px-4">
            {PACKAGE_MINIMUM_NOTE}
          </p>

          <div className="text-center mb-14 px-4 max-w-2xl mx-auto">
            <p className="font-display text-lg md:text-xl text-antiqueGold font-semibold mb-2">
              {PACKAGE_PAGE_INTRO.closing}
            </p>
            <p className="text-body-muted font-medium">{PACKAGE_PAGE_INTRO.closingCta}</p>
          </div>

          <HomeAddOnsSection embedded />

          <SectionHeader title="Included in All Packages" align="left" className="mb-6" />
          <ul className="grid sm:grid-cols-2 gap-4 mb-12">
            {PACKAGE_INCLUDES.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-4 border border-antiqueGold/20 rounded-lg bg-white/50"
              >
                <h3 className="font-display font-semibold text-lg mb-1">{item.title}</h3>
                <p className="card-text">{item.description}</p>
              </motion.li>
            ))}
          </ul>

          <div className="p-6 md:p-8 rounded-lg bg-charcoal text-warmIvory border border-antiqueGold/30 mb-12">
            <h3 className="font-display text-2xl text-antiqueGold font-semibold mb-4 text-center">
              Booking & Payment Terms
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
              {BOOKING_TERMS.map((term) => (
                <div key={term.title} className="text-center p-4 border border-antiqueGold/20 rounded">
                  <p className="font-semibold text-antiqueGold mb-1">{term.title}</p>
                  <p className="text-sm font-medium text-warmIvory/90">{term.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mb-12">
            <div className="flex flex-wrap justify-center gap-4">
              <BookingLink className="btn-primary">Check Availability & Book</BookingLink>
              <Link to="/contact" className="btn-secondary">Request a Consultation</Link>
            </div>
          </div>

          <SectionHeader title="Frequently Asked Questions" align="left" className="mb-8" />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 border border-antiqueGold/20 rounded-lg bg-white/50">
                <h3 className="font-display text-lg font-semibold mb-2">{faq.q}</h3>
                <p className="card-text">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
