import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronIcon } from '../icons/Icons';

export default function ServiceOfferingCard({ offering, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="w-full max-w-sm flex"
    >
      <div className="card-luxury group h-full flex flex-col flex-1 w-full min-w-0 overflow-hidden">
        <div className="h-52 shrink-0 overflow-hidden bg-softBlush">
          <img
            src={offering.image}
            alt={offering.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            loading="lazy"
          />
        </div>
        <div className="p-6 flex flex-col flex-1">
          <h2 className="card-title mb-2 group-hover:text-antiqueGold transition-colors">{offering.title}</h2>
          <p className="text-antiqueGold font-bold text-lg mb-3 shrink-0">{offering.pricingLabel}</p>
          <p className="card-text mb-4 flex-1">{offering.description}</p>
          {offering.footnote && (
            <p className="text-sm font-semibold text-charcoal/85 mb-4 border-l-2 border-antiqueGold pl-3">
              {offering.footnote}
            </p>
          )}
          <Link
            to={offering.buttonTo}
            className="btn-primary w-full text-center mt-auto shrink-0 inline-flex items-center justify-center gap-2"
          >
            {offering.buttonLabel}
            <ChevronIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
