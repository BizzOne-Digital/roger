import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { HOME_INTRO, HOME_CONTACT_LINKS } from '../../data/homeContent';
import { BUSINESS } from '../../utils/constants';

export default function HomeIntroSection() {
  return (
    <section className="section-padding bg-warmIvory">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto lg:mx-0 lg:sticky lg:top-28"
          >
            <img
              src="/logo.png"
              alt={`${BUSINESS.name} logo`}
              className="w-full max-w-[260px] drop-shadow-2xl"
              width={520}
              height={520}
            />
          </motion.div>

          <div>
            <SectionHeader
              align="left"
              eyebrow="Sacramento's Luxury Photo Booth"
              title="High-End Experiences. Unforgettable Memories."
              className="mb-8"
            />
            {HOME_INTRO.paragraphs.map((text, i) => (
              <p key={i} className="text-body-muted text-base md:text-lg mb-5 leading-relaxed">
                {text}
              </p>
            ))}

            <div className="flex flex-wrap gap-3 mt-8">
              <Link to="/booking" className="btn-primary">
                Book Online Instantly
              </Link>
              <Link to="/contact" className="btn-secondary">
                Personalized Consultation
              </Link>
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {HOME_CONTACT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={link.variant === 'primary' ? 'btn-primary' : 'btn-secondary'}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
