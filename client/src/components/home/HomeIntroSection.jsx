import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { HOME_INTRO, HOME_CONTACT_LINKS, HOME_QUICK_LINKS } from '../../data/homeContent';

export default function HomeIntroSection() {
  const secondaryLinks = HOME_QUICK_LINKS.filter((l) => l.variant === 'secondary');

  return (
    <section className="bg-warmIvory w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="w-full bg-charcoal"
      >
        <img
          src="/banner-hero.png"
          alt="Red Rose Photo Booth LLC — Capturing Your Story. Owner and Operator Roger Marionneaux."
          className="w-full h-auto max-h-[min(85vh,820px)] object-contain object-center mx-auto block"
          width={1920}
          height={1080}
          loading="lazy"
        />
      </motion.div>

      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            align="left"
            eyebrow="Sacramento's Luxury Photo Booth"
            title="High-End Experiences. Unforgettable Memories."
            className="mb-8 !mb-8"
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

          <div className="flex flex-wrap gap-2 sm:gap-3 mt-8 pt-8 border-t border-antiqueGold/20">
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-bold text-antiqueGold hover:text-richRose transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
