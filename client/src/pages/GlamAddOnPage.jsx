import { Link } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { GLAM_PAGE } from '../data/servicesContent';

export default function GlamAddOnPage() {
  usePageMeta({
    title: 'GLAM Filter Add-On',
    description: GLAM_PAGE.body,
  });

  return (
    <>
      <PageHero
        variant="services"
        title={
          <>
            GLAM Filter <span className="text-gradient-gold">Add-On</span>
          </>
        }
        subtitle={GLAM_PAGE.heroSubtitle}
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-body-muted text-base md:text-lg leading-relaxed mb-8">{GLAM_PAGE.body}</p>
          <ul className="text-left max-w-md mx-auto space-y-3 mb-8">
            {GLAM_PAGE.features.map((item) => (
              <li key={item} className="flex items-start gap-2 font-medium text-charcoal">
                <span className="text-antiqueGold shrink-0">✦</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="font-display text-xl text-antiqueGold font-semibold mb-8">{GLAM_PAGE.pricingNote}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Add GLAM to Your Experience
            </Link>
            <Link to="/shop" className="btn-secondary">
              View Shop Add-Ons
            </Link>
            <Link to="/services" className="btn-secondary">
              Back to Services
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
