import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { SectionHeader } from '../components/ui/SectionTypography';

const factors = [
  'Event date and season',
  'Event duration',
  'Venue location and logistics',
  'Estimated guest count',
  'Custom photo design requirements',
  'Optional upgrades and add-ons',
  'Special event requirements',
];

const faqs = [
  {
    q: 'How do custom quotes work?',
    a: 'After you submit a booking request or contact form, Roger will review your event details and provide a personalized quote within 24–48 hours.',
  },
  {
    q: 'Is there a minimum booking duration?',
    a: 'Most events book 3–4 hours, but we accommodate shorter and longer durations based on your needs.',
  },
  {
    q: 'Do you travel outside Sacramento?',
    a: 'Yes! We serve Sacramento and surrounding areas. Travel fees may apply for distant venues.',
  },
];

export default function PricingPage() {
  usePageMeta({
    title: 'Pricing',
    description: 'Custom pricing for luxury photo booth rentals in Sacramento. Every celebration is unique.',
  });

  return (
    <>
      <PageHero
        variant="pricing"
        title={<>Every Celebration Is <span className="text-gradient-gold">Unique</span></>}
        subtitle="We believe every event deserves a tailored experience. Contact us for a custom quote."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto">
          <SectionHeader title="Pricing Depends On" className="mb-8" />

          <ul className="grid sm:grid-cols-2 gap-4 mb-12 items-stretch">
            {factors.map((f, i) => (
              <motion.li
                key={f}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 p-4 border border-antiqueGold/20 rounded-lg"
              >
                <span className="w-2 h-2 bg-antiqueGold rounded-full shrink-0" />
                <span className="text-base font-semibold text-charcoal">{f}</span>
              </motion.li>
            ))}
          </ul>

          <div className="text-center mb-16">
            <p className="font-display text-3xl md:text-4xl font-semibold text-antiqueGold mb-6">Contact for Pricing</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">Request a Custom Quote</Link>
              <Link to="/booking" className="btn-secondary">Book a Consultation</Link>
            </div>
          </div>

          <SectionHeader title="Frequently Asked Questions" align="left" className="mb-8" />
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="p-6 border border-antiqueGold/20 rounded-lg">
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
