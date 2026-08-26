import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { servicesAPI } from '../api/client';
import { LoadingSpinner } from '../components/ui/Shared';
import PageHero from '../components/ui/PageHero';
import { formatPrice } from '../utils/constants';
import { getImageUrlFromObject } from '../utils/imageUrl';
import { ChevronIcon } from '../components/icons/Icons';

export default function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description: 'Luxury photo booth rental services for weddings, corporate events, and celebrations in Sacramento.',
  });

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    servicesAPI.getAll()
      .then(({ data }) => setServices(data.services))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHero
        variant="services"
        title={<>Our <span className="text-gradient-gold">Services</span></>}
        subtitle="Premium photo booth experiences tailored to your celebration."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
          ) : services.length === 0 ? (
            <p className="text-body-muted text-center py-20">Services coming soon.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {services.map((service, i) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-luxury group cursor-pointer h-full flex flex-col"
                  onClick={() => setSelected(service)}
                >
                  <div className="h-48 overflow-hidden bg-softBlush shrink-0">
                    {service.coverImage?.url ? (
                      <img
                        src={getImageUrlFromObject(service.coverImage)}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-antiqueGold/50 font-semibold">
                        Red Rose Photo Booth
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="card-title mb-2 group-hover:text-antiqueGold transition-colors">
                      {service.title}
                    </h2>
                    <p className="card-text mb-4 line-clamp-2 flex-1">{service.shortDescription}</p>
                    <p className="text-antiqueGold font-bold text-lg shrink-0">
                      {service.pricingType === 'fixed' && service.price
                        ? formatPrice(service.price)
                        : 'Contact for Pricing'}
                    </p>
                    <button className="mt-4 pt-2 text-base font-semibold text-charcoal flex items-center gap-1 group-hover:text-antiqueGold shrink-0">
                      View Details <ChevronIcon className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" role="dialog" aria-label="Service details">
          <div className="absolute inset-0 bg-charcoal/70" onClick={() => setSelected(null)} />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-warmIvory rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-antiqueGold/30"
          >
            <h2 className="section-heading text-3xl mb-4">{selected.title}</h2>
            <p className="section-lead mb-6">{selected.fullDescription}</p>
            {selected.features?.length > 0 && (
              <ul className="space-y-2 mb-6">
                {selected.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-base font-medium">
                    <span className="w-1.5 h-1.5 bg-antiqueGold rounded-full shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
            <p className="text-antiqueGold font-bold text-xl mb-6">
              {selected.pricingType === 'fixed' && selected.price
                ? formatPrice(selected.price)
                : 'Contact for Pricing'}
            </p>
            <div className="flex gap-3">
              <Link to="/booking" className="btn-primary">Book This Service</Link>
              <button onClick={() => setSelected(null)} className="btn-secondary">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
