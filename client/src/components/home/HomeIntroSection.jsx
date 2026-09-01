import { Link } from 'react-router-dom';
import BookingLink from '../ui/BookingLink';
import { SectionHeader } from '../ui/SectionTypography';
import {
  HOME_WELCOME,
  HOME_CONTACT_LINKS,
  HOME_QUICK_LINKS,
  RED_ROSE_BIO,
} from '../../data/homeContent';

export default function HomeIntroSection() {
  const secondaryLinks = HOME_QUICK_LINKS.filter((l) => l.variant === 'secondary');

  return (
    <section className="bg-warmIvory w-full overflow-hidden">
      <div className="section-padding">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            align="left"
            eyebrow="Red Rose Photo Booth"
            title={HOME_WELCOME.title}
            className="mb-8"
          />
          <p className="text-body-muted text-base md:text-lg mb-8 leading-relaxed">
            {HOME_WELCOME.body}
          </p>

          <div className="mt-10 pt-8 border-t border-antiqueGold/20">
            <h3 className="font-display text-xl md:text-2xl font-semibold text-antiqueGold mb-4">
              {RED_ROSE_BIO.title}
            </h3>
            {RED_ROSE_BIO.paragraphs.map((text, i) => (
              <p key={i} className="text-body-muted text-base md:text-lg mb-4 leading-relaxed last:mb-0">
                {text}
              </p>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-8">
            <BookingLink className="btn-primary">
              Check Availability & Book
            </BookingLink>
            <Link to="/contact" className="btn-secondary">
              Schedule a Consultation
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
