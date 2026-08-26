import { motion } from 'framer-motion';
import GoldFlourish, { GoldOrnamentDivider } from './GoldDecor';

const HERO_VARIANTS = {
  services: {
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=80',
    eyebrow: 'What We Offer',
    alt: 'Luxury photo booth at an elegant event',
  },
  testimonials: {
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&q=80',
    eyebrow: 'Client Love',
    alt: 'Wedding guests celebrating at photo booth',
  },
  pricing: {
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1600&q=80',
    eyebrow: 'Tailored For You',
    alt: 'Upscale corporate celebration',
  },
  shop: {
    image: 'https://images.unsplash.com/photo-1543269664-7d422f677a7d?w=1600&q=80',
    eyebrow: 'Enhance Your Event',
    alt: 'Photo booth props and party accessories',
  },
  blog: {
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1600&q=80',
    eyebrow: 'Stories & Inspiration',
    alt: 'Live event with dramatic lighting',
  },
  booking: {
    image: '/hero-bg.png',
    eyebrow: 'Reserve Your Date',
    alt: 'Red Rose Photo Booth luxury experience',
  },
  contact: {
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1600&q=80',
    eyebrow: "We'd Love To Hear From You",
    alt: 'Beautifully styled event table',
  },
  checkout: {
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1600&q=80',
    eyebrow: 'Secure Checkout',
    alt: 'Colorful birthday celebration',
  },
  confirmation: {
    image: '/hero-bg.png',
    eyebrow: 'Request Received',
    alt: 'Red Rose Photo Booth',
    compact: true,
  },
  default: {
    image: '/hero-bg.png',
    eyebrow: 'Red Rose Photo Booth',
    alt: 'Luxury photo booth experience',
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

/**
 * Cinematic inner-page hero — background image, gold accents, motion
 */
export default function PageHero({
  title,
  subtitle,
  eyebrow,
  variant = 'default',
  image,
  imageAlt,
  compact = false,
  align = 'left',
  children,
}) {
  const config = HERO_VARIANTS[variant] || HERO_VARIANTS.default;
  const bgImage = image || config.image;
  const eyebrowText = eyebrow || config.eyebrow;
  const alt = imageAlt || config.alt;
  const isCompact = compact || config.compact;
  const isCenter = align === 'center';

  return (
    <section
      className={`relative flex items-center overflow-hidden bg-charcoal w-full ${
        isCompact ? 'min-h-[30vh] md:min-h-[34vh]' : 'min-h-[44vh] md:min-h-[50vh]'
      }`}
      aria-label={alt}
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-100 sm:scale-105 brightness-[1.1] contrast-[1.03]"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/92 via-charcoal/60 to-charcoal/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-charcoal/20 to-charcoal/75" />
      <div className="absolute inset-0 bg-cinematic-radial opacity-25" />
      <div
        className="absolute inset-0 opacity-40"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(196,148,69,0.2) 0%, transparent 55%)',
        }}
      />

      <div className="absolute top-0 left-0 right-0 gold-line z-10 opacity-80" />

      <div
        className={`relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 min-w-0 ${
          isCompact ? 'pb-10 md:pb-12' : 'pb-14 md:pb-16'
        } ${isCenter ? 'text-center' : ''}`}
      >
        {eyebrowText && (
          <motion.div
            custom={0.1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={`flex items-center gap-3 mb-4 md:mb-5 ${isCenter ? 'justify-center' : ''}`}
          >
            {!isCenter && <GoldFlourish className="w-10 h-3 text-antiqueGold/70 hidden sm:block" />}
            <p className="text-antiqueGold text-xs sm:text-sm font-bold tracking-[0.12em] sm:tracking-[0.22em] uppercase leading-snug">
              {eyebrowText}
            </p>
            {!isCenter && <GoldFlourish className="w-10 h-3 text-antiqueGold/70 hidden sm:block rotate-180" />}
          </motion.div>
        )}

        <motion.h1
          custom={0.2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={`section-heading-light font-semibold break-words ${
            isCompact ? 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl' : 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl'
          } max-w-4xl ${isCenter ? 'mx-auto' : ''}`}
        >
          {title}
        </motion.h1>

        <motion.div
          custom={0.3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className={`mt-5 md:mt-6 ${isCenter ? 'flex justify-center' : ''}`}
        >
          <GoldOrnamentDivider />
        </motion.div>

        {subtitle && (
          <motion.p
            custom={0.4}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={`section-lead-light mt-5 md:mt-6 max-w-2xl text-base md:text-lg ${
              isCenter ? 'mx-auto' : ''
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            custom={0.5}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className={isCenter ? 'mt-6 flex justify-center' : 'mt-6'}
          >
            {children}
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-warmIvory to-transparent z-[5] pointer-events-none" />
    </section>
  );
}
