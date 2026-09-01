import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookingLink from '../ui/BookingLink';
import { SectionHeader } from '../ui/SectionTypography';
import { HOME_PACKAGES, PACKAGE_MINIMUM_NOTE, ADD_ON_SERVICES } from '../../data/homeContent';
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
          eyebrow="Wedding Packages"
          title="Choose Your Package"
          subtitle="Professional photo booth experiences tailored for your wedding day."
          className="mb-10 md:mb-14"
          light
        />

        <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-8">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-roseNoir/80 border-b border-antiqueGold/30">
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Package</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Total Price</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Includes</th>
              </tr>
            </thead>
            <tbody>
              {HOME_PACKAGES.map((pkg, i) => (
                <motion.tr
                  key={pkg.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`border-b border-antiqueGold/15 align-top ${
                    pkg.featured ? 'bg-antiqueGold/10' : 'bg-charcoal/50'
                  }`}
                >
                  <td className="p-4 md:p-5 font-display text-xl font-semibold text-warmIvory">
                    {pkg.name}
                    {pkg.featured && (
                      <span className="block text-xs text-antiqueGold font-bold uppercase tracking-wider mt-1">
                        Most Popular
                      </span>
                    )}
                  </td>
                  <td className="p-4 md:p-5 font-display text-2xl text-antiqueGold font-semibold whitespace-nowrap">
                    {formatPrice(pkg.price)}
                  </td>
                  <td className="p-4 md:p-5">
                    <PackageFeatures features={pkg.features} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4 mb-8">
          {HOME_PACKAGES.map((pkg, i) => (
            <motion.article
              key={pkg.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className={`p-5 rounded-lg border ${
                pkg.featured
                  ? 'border-antiqueGold bg-antiqueGold/10'
                  : 'border-antiqueGold/25 bg-roseNoir/40'
              }`}
            >
              <div className="flex justify-between gap-3 mb-3">
                <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
                  {formatPrice(pkg.price)}
                </p>
              </div>
              <PackageFeatures features={pkg.features} />
            </motion.article>
          ))}
        </div>

        <p className="text-center text-warmIvory/90 font-semibold text-base md:text-lg mb-4 px-4">
          {PACKAGE_MINIMUM_NOTE}
        </p>
        <p className="text-center text-warmIvory/75 text-sm md:text-base font-medium mb-10 px-4 max-w-2xl mx-auto">
          {ADD_ON_SERVICES.consultationNote}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <BookingLink className="btn-primary">
            Check Your Date & Book
          </BookingLink>
          <Link to="/pricing" className="btn-secondary">
            View Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
