import { getPackageTitleLine } from '../../data/homeContent';
import { formatPrice } from '../../utils/constants';

export default function PackageBookingBanner({ pkg }) {
  if (!pkg) return null;

  return (
    <div
      className="mb-6 md:mb-8 p-5 md:p-6 rounded-lg border border-antiqueGold/35 bg-softBlush/60 text-center"
      id="selected-package-banner"
    >
      <p className="text-xs font-bold uppercase tracking-[0.18em] text-antiqueGold mb-2">
        {pkg.category === 'engagement' ? 'Selected engagement package' : 'Selected wedding package'}
      </p>
      <p className="font-display text-xl md:text-2xl font-semibold text-charcoal">
        {getPackageTitleLine(pkg)}
      </p>
      <p className="font-display text-lg text-antiqueGold font-semibold mt-1">
        {formatPrice(pkg.price)}
        {pkg.hours ? ` · ${pkg.hours} hours` : ''}
      </p>
      <p className="text-body-muted text-sm md:text-base mt-3 max-w-lg mx-auto leading-relaxed">
        Pick your event date and time below, then add this package in the booking form to check
        availability and complete your reservation.
      </p>
    </div>
  );
}
