import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';
import {
  HOME_PACKAGES,
  PACKAGE_INCLUDES,
  BOOKING_TERMS,
} from '../data/homeContent';
import { formatPrice } from '../utils/constants';

const faqs = [
  {
    q: 'How do I lock in my date?',
    a: 'Submit a booking request online or contact Roger directly. A 25% non-refundable retainer secures your event date.',
  },
  {
    q: 'When is the final balance due?',
    a: 'The remaining balance is due 7 days prior to your event.',
  },
  {
    q: 'Do you travel outside Sacramento?',
    a: 'Yes! We serve Sacramento and surrounding areas. Travel fees may apply for distant venues.',
  },
];

export default function PricingPage() {
  usePageMeta({
    title: 'Pricing',
    description: 'Red Rose Photo Booth packages — The One Rose, Half Dozen, and Full Dozen. Sacramento luxury photo booth rental.',
  });

  return (
    <>
      <PageHero
        variant="pricing"
        title={<>Rose Packages & <span className="text-gradient-gold">Pricing</span></>}
        subtitle="High-end photo booth experiences with transparent packages and full feature suites."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Package Overview" className="mb-8" />

          <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-14">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-charcoal text-warmIvory border-b border-antiqueGold/30">
                  <th className="p-4 font-display text-lg text-antiqueGold">Package</th>
                  <th className="p-4 font-display text-lg text-antiqueGold">Duration</th>
                  <th className="p-4 font-display text-lg text-antiqueGold">Price</th>
                  <th className="p-4 font-display text-lg text-antiqueGold">Core Features</th>
                </tr>
              </thead>
              <tbody>
                {HOME_PACKAGES.map((pkg) => (
                  <tr key={pkg.name} className="border-b border-antiqueGold/15 bg-white/60">
                    <td className="p-4 font-display text-xl font-semibold">{pkg.name}</td>
                    <td className="p-4 font-semibold">{pkg.duration}</td>
                    <td className="p-4 font-display text-2xl text-antiqueGold font-semibold">
                      {formatPrice(pkg.price)}
                    </td>
                    <td className="p-4 font-medium text-charcoal/90">{pkg.features}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4 mb-14">
            {HOME_PACKAGES.map((pkg) => (
              <article key={pkg.name} className="p-5 rounded-lg border border-antiqueGold/25 bg-white/60">
                <div className="flex justify-between gap-3 mb-2">
                  <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                  <p className="font-display text-2xl text-antiqueGold font-semibold">{formatPrice(pkg.price)}</p>
                </div>
                <p className="text-antiqueGold font-bold text-sm mb-2">{pkg.duration}</p>
                <p className="font-medium text-charcoal/90">{pkg.features}</p>
              </article>
            ))}
          </div>

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
              <Link to="/booking" className="btn-primary">Check Availability & Book</Link>
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
