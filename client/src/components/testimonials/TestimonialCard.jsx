import { StarIcon } from '../icons/Icons';
import { getImageUrlFromObject } from '../../utils/imageUrl';

export default function TestimonialCard({
  testimonial,
  large = false,
  equalHeight = true,
}) {
  return (
    <div
      className={`card-luxury p-6 ${large ? 'md:p-8' : ''} ${
        equalHeight ? 'h-full flex flex-col' : ''
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4 shrink-0">
        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <StarIcon
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? 'text-antiqueGold' : 'text-charcoal/20'}`}
            />
          ))}
        </div>
        {testimonial.customerImage?.url && (
          <img
            src={getImageUrlFromObject(testimonial.customerImage)}
            alt={testimonial.customerName}
            className="w-10 h-10 rounded-full object-cover shrink-0 border border-antiqueGold/20"
          />
        )}
      </div>

      <p
        className={`text-charcoal font-medium leading-relaxed mb-6 ${
          equalHeight ? 'flex-1' : ''
        } ${large ? 'text-lg' : 'text-base'}`}
      >
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div className="flex items-center gap-3 shrink-0 mt-auto">
        <div>
          <p className="font-bold text-base">{testimonial.customerName}</p>
          <p className="text-antiqueGold text-sm font-semibold">{testimonial.eventType}</p>
        </div>
      </div>
    </div>
  );
}
