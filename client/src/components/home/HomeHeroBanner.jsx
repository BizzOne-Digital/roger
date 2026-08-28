import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HOME_QUICK_LINKS } from '../../data/homeContent';

export default function HomeHeroBanner() {
  const primaryLinks = HOME_QUICK_LINKS.filter((l) => l.variant === 'primary');
  const secondaryLinks = HOME_QUICK_LINKS.filter((l) => l.variant === 'secondary');

  return (
    <section className="relative bg-charcoal w-full overflow-hidden" aria-label="Red Rose Photo Booth">
      <div className="w-full bg-charcoal">
        <motion.img
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
          src="/banner-hero.png"
          alt="Red Rose Photo Booth LLC — Capturing Your Story. Owner Roger Marionneaux, Sacramento luxury photo booth."
          className="w-full h-auto max-h-[min(92vh,920px)] object-contain object-center mx-auto"
          width={1920}
          height={1080}
          fetchPriority="high"
        />
      </div>

      <div className="section-padding !pt-8 !pb-10 md:!pb-14 bg-gradient-to-b from-charcoal via-roseNoir to-charcoal border-t border-antiqueGold/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-antiqueGold text-sm md:text-base font-bold tracking-[0.2em] uppercase mb-6">
            Explore Red Rose Photo Booth
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            {primaryLinks.map((link) => (
              <Link key={link.path} to={link.path} className="btn-primary text-sm sm:text-base">
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {secondaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="btn-secondary text-xs sm:text-sm !px-4 !py-2.5 sm:!px-5"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
