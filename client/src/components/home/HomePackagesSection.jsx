import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { HOME_PACKAGES } from '../../data/homeContent';
import { formatPrice } from '../../utils/constants';

export default function HomePackagesSection() {
  return (
    <section id="packages" className="section-padding bg-charcoal text-warmIvory">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Packages"
          title="Choose Your Rose Package"
          subtitle="Every package includes our full feature suite and professional on-site support."
          className="mb-10 md:mb-14"
          light
        />

        <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30">
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="bg-roseNoir/80 border-b border-antiqueGold/30">
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Package</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Duration</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Price</th>
                <th className="p-4 md:p-5 font-display text-lg text-antiqueGold">Core Features</th>
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
                  className={`border-b border-antiqueGold/15 ${
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
                  <td className="p-4 md:p-5 font-semibold">{pkg.duration}</td>
                  <td className="p-4 md:p-5 font-display text-2xl text-antiqueGold font-semibold">
                    {formatPrice(pkg.price)}
                  </td>
                  <td className="p-4 md:p-5 text-warmIvory/90 font-medium">{pkg.features}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden space-y-4">
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
              <div className="flex justify-between items-start gap-3 mb-3">
                <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
                  {formatPrice(pkg.price)}
                </p>
              </div>
              <p className="text-antiqueGold font-bold text-sm mb-2">{pkg.duration}</p>
              <p className="text-warmIvory/90 font-medium">{pkg.features}</p>
            </motion.article>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <Link to="/booking" className="btn-primary">
            Check Your Date & Book
          </Link>
          <Link to="/pricing" className="btn-secondary">
            View Full Pricing
          </Link>
        </div>
      </div>
    </section>
  );
}
