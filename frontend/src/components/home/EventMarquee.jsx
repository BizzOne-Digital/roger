import { EVENT_TYPES } from '../../utils/constants';

export default function EventMarquee() {
  const text = EVENT_TYPES.join(' \u2022 ');

  return (
    <div className="bg-charcoal py-3 sm:py-4 border-y border-antiqueGold/20 overflow-hidden w-full">
      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex shrink-0">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="mx-4 sm:mx-8 font-display font-semibold text-sm sm:text-lg md:text-xl tracking-[0.12em] sm:tracking-[0.2em] text-champagneGold uppercase"
            >
              {text}
            </span>
          ))}
        </div>
        <div className="animate-marquee flex shrink-0">
          {[0, 1].map((i) => (
            <span
              key={i}
              className="mx-4 sm:mx-8 font-display font-semibold text-sm sm:text-lg md:text-xl tracking-[0.12em] sm:tracking-[0.2em] text-champagneGold uppercase"
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
