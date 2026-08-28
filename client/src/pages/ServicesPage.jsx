import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { servicesAPI } from '../api/client';
import { LoadingSpinner } from '../components/ui/Shared';
import PageHero from '../components/ui/PageHero';
import FeaturedService from '../components/home/FeaturedService';
import { SectionHeader } from '../components/ui/SectionTypography';
import { formatPrice } from '../utils/constants';
import { getImageUrlFromObject } from '../utils/imageUrl';
import { ChevronIcon } from '../components/icons/Icons';

const SERVICE_IMAGES = {
  'photo-booth-rental': 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
  'wedding-photo-booth': 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  'corporate-events': 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
  'private-celebrations': 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
  'glam-filter-addon': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
};

const getServiceImage = (service) => {
  if (service.coverImage?.url) return getImageUrlFromObject(service.coverImage);
  return SERVICE_IMAGES[service.slug] || SERVICE_IMAGES['photo-booth-rental'];
};

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

      <FeaturedService />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto min-w-0">
          <SectionHeader
            eyebrow="What We Offer"
            title="All Services"
            subtitle="Browse our full range of luxury photo booth experiences for every occasion."
            className="mb-10 md:mb-14"
          />

          {loading ? (
            <div className="flex justify-center py-20"><LoadingSpinner size="lg" /></div>
          ) : services.length === 0 ? (
            <p className="text-body-muted text-center py-20">Services coming soon.</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-6 md:gap-8 items-stretch">
              {services.map((service, i) => (
                <div key={service._id} className="w-full max-w-sm h-full flex">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="card-luxury group cursor-pointer h-full flex flex-col flex-1 w-full min-w-0"
                    onClick={() => setSelected(service)}
                  >
                    <div className="h-52 overflow-hidden bg-softBlush shrink-0">
                      <img
                        src={getServiceImage(service)}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h2 className="card-title mb-2 group-hover:text-antiqueGold transition-colors">
                        {service.title}
                      </h2>
                      <p className="card-text mb-4 line-clamp-3 flex-1">{service.shortDescription}</p>
                      <p className="text-antiqueGold font-bold text-lg shrink-0">
                        {service.pricingType === 'fixed' && service.price
                          ? formatPrice(service.price)
                          : 'Contact for Pricing'}
                      </p>
                      <button
                        type="button"
                        className="mt-4 pt-2 text-base font-semibold text-charcoal flex items-center gap-1 group-hover:text-antiqueGold shrink-0"
                      >
                        View Details <ChevronIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap justify-center gap-4 mt-12 md:mt-16">
            <Link to="/booking" className="btn-primary">Book Your Experience</Link>
            <Link to="/pricing" className="btn-secondary">View Package Pricing</Link>
          </div>
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
            <div className="h-48 -mx-8 -mt-8 mb-6 overflow-hidden rounded-t-lg">
              <img
                src={getServiceImage(selected)}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
            </div>
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
            <div className="flex flex-wrap gap-3">
              <Link to="/booking" className="btn-primary">Book This Service</Link>
              <button type="button" onClick={() => setSelected(null)} className="btn-secondary">Close</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
