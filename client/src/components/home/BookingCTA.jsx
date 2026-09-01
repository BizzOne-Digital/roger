import BookingLink from '../ui/BookingLink';
import MagneticButton from '../ui/MagneticButton';
import RosePetals from '../animations/RosePetals';

export default function BookingCTA() {
  return (
    <section className="relative section-padding overflow-hidden">
      <div className="absolute inset-0 bg-velvet-gradient" />
      <RosePetals count={5} />
      <div className="absolute inset-0 bg-charcoal/40" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <h2 className="section-heading-light text-3xl md:text-4xl lg:text-5xl mb-6">
          Your Event Deserves More Than Ordinary Photos.
        </h2>
        <p className="section-lead-light text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          Reserve Your Date with Red Rose Photo Booth for an unforgettable event!
        </p>
        <BookingLink>
          <MagneticButton className="btn-primary text-lg !px-10 !py-4">
            Reserve Your Date
          </MagneticButton>
        </BookingLink>
      </div>
    </section>
  );
}
