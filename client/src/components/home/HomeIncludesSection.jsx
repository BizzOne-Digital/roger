import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingLink from '../ui/BookingLink';
import { SectionHeader } from '../ui/SectionTypography';
import { EVENT_EXPERIENCE, BOOKING_TERMS } from '../../data/homeContent';

export default function HomeIncludesSection() {

  return (
    <section className="section-padding bg-charcoal text-warmIvory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Included Features"
          title={EVENT_EXPERIENCE.title}
          className="mb-10 md:mb-12"
          light
        />

        <ul className="grid sm:grid-cols-2 gap-4 mb-14">
          {EVENT_EXPERIENCE.features.map((feature, i) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-3 p-5 rounded-lg border border-antiqueGold/25 bg-roseNoir/30"
            >
              <span className="text-antiqueGold mt-0.5 shrink-0">✦</span>
              <span className="font-medium text-warmIvory/95">{feature}</span>
            </motion.li>
          ))}
        </ul>

        <div className="rounded-lg border border-antiqueGold/30 bg-roseNoir/40 p-6 md:p-8">
          <h3 className="font-display text-2xl md:text-3xl text-antiqueGold font-semibold mb-6 text-center">
            Booking & Payment Terms
          </h3>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {BOOKING_TERMS.map((term) => (
              <div key={term.title} className="text-center sm:text-left p-4 rounded border border-antiqueGold/20">
                <p className="font-display text-lg text-antiqueGold font-semibold mb-2">{term.title}</p>
                <p className="text-warmIvory/90 font-medium">{term.description}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <BookingLink className="btn-primary">
              Reserve Your Date
            </BookingLink>
            <Link to="/contact" className="btn-secondary">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
