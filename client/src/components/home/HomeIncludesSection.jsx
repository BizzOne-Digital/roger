import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { PACKAGE_INCLUDES, BOOKING_TERMS } from '../../data/homeContent';

export default function HomeIncludesSection() {
  return (
    <section className="section-padding bg-warmIvory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="All Packages"
          title="What Is Included in ALL Packages"
          className="mb-10 md:mb-12"
        />

        <ul className="grid md:grid-cols-2 gap-5 mb-14">
          {PACKAGE_INCLUDES.map((item, i) => (
            <motion.li
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="p-5 md:p-6 rounded-lg border border-antiqueGold/25 bg-white/50 h-full"
            >
              <h3 className="font-display text-xl font-semibold text-charcoal mb-2 flex items-start gap-2">
                <span className="text-antiqueGold mt-1">✦</span>
                {item.title}
              </h3>
              <p className="text-body-muted font-medium">{item.description}</p>
            </motion.li>
          ))}
        </ul>

        <div className="rounded-lg border border-antiqueGold/30 bg-charcoal text-warmIvory p-6 md:p-8">
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
            <Link to="/booking" className="btn-primary">
              Reserve Your Date
            </Link>
            <Link to="/contact" className="btn-secondary">
              Ask a Question
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
