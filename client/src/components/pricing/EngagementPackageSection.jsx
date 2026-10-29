import { SectionHeader } from '../ui/SectionTypography';
import PackageTitle from './PackageTitle';
import { PackageBookingRow, PackageBookCtaLink } from './PackageBookingLink';
import {
  ENGAGEMENT_PACKAGES,
  ENGAGEMENT_ADDITIONAL_HOUR_NOTE,
  ENGAGEMENT_PAGE_COPY,
} from '../../data/homeContent';
import { formatPrice } from '../../utils/constants';

function PackageFeatures({ features, light }) {
  return (
    <ul className="space-y-1.5">
      {features.map((feature) => (
        <li
          key={feature}
          className={`flex items-start gap-2 font-medium text-sm ${
            light ? 'text-warmIvory/90' : 'text-charcoal/90'
          }`}
        >
          <span className="text-antiqueGold shrink-0">✦</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

/** Single engagement package block — pricing, home, and engagement service page. */
export default function EngagementPackageSection({
  light = false,
  showSectionHeader = true,
  className = 'mb-10 md:mb-12',
}) {
  const pkg = ENGAGEMENT_PACKAGES[0];
  if (!pkg) return null;

  const cardBorder = light
    ? 'border-antiqueGold/30 bg-charcoal/50'
    : 'border-antiqueGold/25 bg-white/60';

  return (
    <div className={className}>
      {showSectionHeader && (
        <SectionHeader
          title={ENGAGEMENT_PAGE_COPY.sectionTitle}
          subtitle={ENGAGEMENT_PAGE_COPY.sectionLead}
          className="mb-6 md:mb-8"
          light={light}
          align="left"
        />
      )}

      <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-4">
        <table className="w-full text-left border-collapse min-w-[720px]">
          <thead>
            <tr
              className={`border-b border-antiqueGold/30 ${
                light ? 'bg-roseNoir/80 text-warmIvory' : 'bg-charcoal text-warmIvory'
              }`}
            >
              <th className="p-4 font-display text-lg text-antiqueGold">Package</th>
              <th className="p-4 font-display text-lg text-antiqueGold">Total Price</th>
              <th className="p-4 font-display text-lg text-antiqueGold">Includes</th>
            </tr>
          </thead>
          <tbody>
            <PackageBookingRow pkg={pkg} asTableRow className={`border-b border-antiqueGold/15 align-top ${cardBorder}`}>
              <td className={`p-4 font-display text-xl font-semibold ${light ? 'text-warmIvory' : ''}`}>
                <PackageTitle pkg={pkg} badgeClassName={light ? 'text-antiqueGold' : 'text-richRose'} />
                <span className="block text-xs font-bold text-antiqueGold mt-2 uppercase tracking-wide">
                  Book engagement experience →
                </span>
              </td>
              <td className="p-4 font-display text-2xl text-antiqueGold font-semibold whitespace-nowrap">
                {formatPrice(pkg.price)}
              </td>
              <td className="p-4">
                <PackageFeatures features={pkg.features} light={light} />
                {pkg.closing && (
                  <p className="text-sm text-antiqueGold font-semibold mt-3 italic">{pkg.closing}</p>
                )}
              </td>
            </PackageBookingRow>
          </tbody>
        </table>
      </div>

      <PackageBookingRow pkg={pkg} className={`md:hidden p-5 rounded-lg border ${cardBorder} mb-4`}>
        <div className="flex justify-between gap-3 mb-3">
          <h3 className={`font-display text-xl font-semibold leading-snug pr-2 ${light ? 'text-warmIvory' : ''}`}>
            <PackageTitle pkg={pkg} badgeClassName={light ? 'text-antiqueGold' : 'text-richRose'} />
          </h3>
          <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
            {formatPrice(pkg.price)}
          </p>
        </div>
        <PackageFeatures features={pkg.features} light={light} />
        {pkg.closing && (
          <p className="text-sm text-antiqueGold font-semibold mt-3 italic">{pkg.closing}</p>
        )}
        <PackageBookCtaLink pkg={pkg} className="btn-primary w-full mt-4" label="Book The First Bloom" />
      </PackageBookingRow>

      <p
        className={`text-center font-semibold text-base md:text-lg px-4 ${
          light ? 'text-warmIvory/90' : 'text-charcoal/90'
        }`}
      >
        {ENGAGEMENT_ADDITIONAL_HOUR_NOTE}
      </p>
    </div>
  );
}
