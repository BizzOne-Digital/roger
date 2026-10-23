import { Link } from 'react-router-dom';
import BookingLink from '../ui/BookingLink';
import { SectionHeader } from '../ui/SectionTypography';
import {
  HOME_PACKAGES,
  PACKAGE_MINIMUM_NOTE,
  ADD_ON_SERVICES,
  PACKAGE_PAGE_INTRO,
} from '../../data/homeContent';
import PackageTitle from '../pricing/PackageTitle';
import { PackageBookingRow, PackageBookCtaLink } from '../pricing/PackageBookingLink';
import { formatPrice } from '../../utils/constants';

function PackageFeatures({ features }) {
  return (
    <ul className="space-y-1.5">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-2 text-warmIvory/90 font-medium">
          <span className="text-antiqueGold mt-1 shrink-0">✦</span>
          <span>{feature}</span>
        </li>
      ))}
    </ul>
  );
}

export default function HomePackagesSection() {
  return (
    <section id="packages" className="section-padding bg-charcoal text-warmIvory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Photo Booth Packages"
          title="Red Rose Photo Booth Packages"
          subtitle={PACKAGE_PAGE_INTRO.lead}
          className="mb-6 md:mb-8"
          light
        />
        <p className="text-center text-warmIvory/85 text-base md:text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
          {PACKAGE_PAGE_INTRO.body}
        </p>
        <p className="text-center text-antiqueGold/90 text-sm font-semibold mb-10 md:mb-12">
          Tap any package below to check availability and book through BoothBook.
        </p>

        <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-8">
          <table className="w-full text-left border-collapse min-w-[720px]">
            <thead>
              <tr className="bg-roseNoir/80 border-b border-antiqueGold/30">
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Package</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Total Price</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Includes</th>
              </tr>
            </thead>
            <tbody>
              {HOME_PACKAGES.map((pkg) => (
                <PackageBookingRow
                  key={pkg.name}
                  pkg={pkg}
                  asTableRow
                  className={`border-b border-antiqueGold/15 align-top ${
                    pkg.featured
                      ? 'bg-antiqueGold/10'
                      : pkg.vip
                        ? 'bg-richRose/15'
                        : 'bg-charcoal/50'
                  }`}
                >
                  <td className="p-4 md:p-5 font-display text-xl font-semibold text-warmIvory">
                    <PackageTitle pkg={pkg} />
                    <span className="block text-xs font-bold text-antiqueGold mt-2 uppercase tracking-wide">
                      Book this package →
                    </span>
                  </td>
                  <td className="p-4 md:p-5 font-display text-2xl text-antiqueGold font-semibold whitespace-nowrap">
                    {formatPrice(pkg.price)}
                  </td>
                  <td className="p-4 md:p-5">
                    {pkg.summary && (
                      <p className="text-warmIvory/80 text-sm mb-3 leading-relaxed">{pkg.summary}</p>
                    )}
                    <PackageFeatures features={pkg.features} />
                    {pkg.closing && (
                      <p className="text-antiqueGold/90 text-sm font-semibold mt-3 italic">{pkg.closing}</p>
                    )}
                  </td>
                </PackageBookingRow>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 mb-8">
          {HOME_PACKAGES.map((pkg) => (
            <PackageBookingRow
              key={pkg.name}
              pkg={pkg}
              className={`p-5 rounded-lg border ${
                pkg.featured
                  ? 'border-antiqueGold bg-antiqueGold/10'
                  : pkg.vip
                    ? 'border-antiqueGold/50 bg-richRose/20'
                    : 'border-antiqueGold/25 bg-roseNoir/40'
              }`}
            >
              <div className="flex justify-between gap-3 mb-3">
                <h3 className="font-display text-xl font-semibold leading-snug pr-2">
                  <PackageTitle pkg={pkg} />
                </h3>
                <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
                  {formatPrice(pkg.price)}
                </p>
              </div>
              {pkg.summary && (
                <p className="text-warmIvory/80 text-sm md:text-base mb-3 leading-relaxed">{pkg.summary}</p>
              )}
              <PackageFeatures features={pkg.features} />
              {pkg.closing && (
                <p className="text-antiqueGold/90 text-sm font-semibold mt-4 italic">{pkg.closing}</p>
              )}
              <PackageBookCtaLink pkg={pkg} className="btn-primary w-full mt-4" />
            </PackageBookingRow>
          ))}
        </div>

        <p className="text-center text-warmIvory/90 font-semibold text-base md:text-lg mb-4 px-4">
          {PACKAGE_MINIMUM_NOTE}
        </p>
        <p className="text-center text-warmIvory/75 text-sm md:text-base font-medium mb-6 px-4 max-w-2xl mx-auto">
          {ADD_ON_SERVICES.consultationNote}
        </p>

        <div className="text-center mb-10 px-4 max-w-2xl mx-auto">
          <p className="font-display text-lg md:text-xl text-antiqueGold font-semibold mb-2">
            {PACKAGE_PAGE_INTRO.closing}
          </p>
          <p className="text-warmIvory/90 font-medium">{PACKAGE_PAGE_INTRO.closingCta}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <BookingLink className="btn-primary">
            Check Your Date & Book
          </BookingLink>
          <a href="#package-add-ons" className="btn-secondary">
            View Add-Ons
          </a>
          <Link to="/pricing" className="btn-secondary">
            View Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
