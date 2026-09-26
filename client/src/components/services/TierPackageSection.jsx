import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/constants';

function PackageFeatures({ features, light = false }) {
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

/** Wedding / corporate tier tables with “Most Popular” styling. */
export default function TierPackageSection({ packages, light = false }) {
  const rowBg = (pkg) => {
    if (pkg.featured) return light ? 'bg-antiqueGold/10' : 'bg-antiqueGold/10';
    if (pkg.vip) return light ? 'bg-richRose/15' : 'bg-antiqueGold/5';
    return light ? 'bg-charcoal/50' : 'bg-white/60';
  };

  return (
    <>
      <div className="hidden md:block overflow-x-auto rounded-lg border border-antiqueGold/30 mb-8">
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
            {packages.map((pkg, i) => (
              <motion.tr
                key={pkg.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`border-b border-antiqueGold/15 align-top ${rowBg(pkg)}`}
              >
                <td className={`p-4 font-display text-xl font-semibold ${light ? 'text-warmIvory' : ''}`}>
                  {pkg.name}
                  {pkg.summary && (
                    <span className="block text-base text-antiqueGold/90 font-medium mt-1">{pkg.summary}</span>
                  )}
                  {pkg.featured && (
                    <span className="block text-xs text-antiqueGold font-bold uppercase tracking-wider mt-2">
                      {pkg.badge || 'Most Popular'}
                    </span>
                  )}
                </td>
                <td className="p-4 font-display text-2xl text-antiqueGold font-semibold whitespace-nowrap">
                  {formatPrice(pkg.price)}
                </td>
                <td className="p-4">
                  <PackageFeatures features={pkg.features} light={light} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden space-y-4 mb-8">
        {packages.map((pkg, i) => (
          <motion.article
            key={pkg.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`p-5 rounded-lg border ${
              pkg.featured
                ? 'border-antiqueGold bg-antiqueGold/10'
                : pkg.vip
                  ? 'border-antiqueGold/50 bg-antiqueGold/5'
                  : 'border-antiqueGold/25 bg-white/60'
            }`}
          >
            <div className="flex justify-between gap-3 mb-1">
              <div>
                <h3 className="font-display text-xl font-semibold">{pkg.name}</h3>
                {pkg.summary && (
                  <p className="text-antiqueGold/90 text-sm font-medium mt-0.5">{pkg.summary}</p>
                )}
              </div>
              <p className="font-display text-2xl text-antiqueGold font-semibold shrink-0">
                {formatPrice(pkg.price)}
              </p>
            </div>
            {pkg.featured && (
              <p className="text-xs text-antiqueGold font-bold uppercase tracking-wider mb-3">
                {pkg.badge || 'Most Popular'}
              </p>
            )}
            <PackageFeatures features={pkg.features} />
          </motion.article>
        ))}
      </div>
    </>
  );
}
