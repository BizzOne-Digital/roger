import { SectionHeader } from '../ui/SectionTypography';
import ServiceOfferingCard from '../services/ServiceOfferingCard';
import { SERVICE_OFFERINGS } from '../../data/servicesContent';

/** Four main service paths — homepage + services page. */
export default function HomeServicesSection({ className = '', showHeader = true }) {
  return (
    <section
      id="services"
      className={`section-padding bg-warmIvory ${className}`.trim()}
    >
      <div className="max-w-7xl mx-auto min-w-0">
        {showHeader && (
          <SectionHeader
            eyebrow="What We Offer"
            title="Photo Booth Experiences"
            subtitle="Pick your event type — weddings, parties, corporate events, or add GLAM to any package."
            className="mb-10 md:mb-14"
          />
        )}

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-stretch">
          {SERVICE_OFFERINGS.map((offering, i) => (
            <ServiceOfferingCard key={offering.id} offering={offering} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
