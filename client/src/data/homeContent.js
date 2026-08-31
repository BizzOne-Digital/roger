import { BUSINESS } from '../utils/constants';

export const RED_ROSE_BIO = {
  title: 'About Red Rose Photo Booth',
  paragraphs: [
    'Red Rose Photo Booth LLC is owned and operated by Roger Marionneaux, delivering high-end, customizable photo booth experiences throughout the Bay Area and beyond.',
    'We combine top-tier camera technology, instant digital sharing, and custom-branded prints so every guest leaves with memories they will treasure — and share — long after the celebration ends.',
  ],
};

export const HOME_INTRO = {
  paragraphs: [
    'Ready to make your event unforgettable? Red Rose Photo Booth delivers high-end, customizable photo booth experiences that bring the fun and save every epic moment. By combining top-tier camera technology, instant digital sharing, and custom-branded prints, we capture memories your guests will talk about long after the party ends!',
    `Whether you're planning a wedding, corporate showcase, or private celebration, checking availability and securing your spot is effortless. Visit our website to check your date and book online instantly, or give us a call or text to set up a personalized consultation today!`,
  ],
};

export const HOME_PACKAGES = [
  {
    name: 'Package 1',
    price: 950,
    features: [
      'Full setup and props',
      'Instant email sharing',
    ],
  },
  {
    name: 'Package 2',
    price: 1300,
    featured: true,
    features: [
      'Full setup and props (included from Package 1)',
      'Instant email sharing',
      'One extra hour of service',
      'Audio guestbook for recorded voice messages',
      'Choice of custom photo keychains OR photo magnets for guests',
    ],
  },
];

export const PACKAGE_MINIMUM_NOTE =
  '4-hour event minimum. $250 for each additional hour after your initial booking.';

export const PACKAGE_INCLUDES = [
  {
    title: 'Setup & On-Site Support',
    description:
      'Professional set up & tear down, plus a dedicated booth attendant on-site for the duration of your event.',
  },
  {
    title: 'Instant Sharing & Digital Access',
    description:
      "Instant file downloads straight to guests' phones, unlimited GIFs, and a complete online gallery post-event.",
  },
  {
    title: 'Custom Branding & Visuals',
    description:
      'Custom tap-to-start screen and custom-designed photo template and/or overlay.',
  },
  {
    title: 'Printing & Photo Captures',
    description: 'Unlimited sessions with unlimited professional prints.',
  },
  {
    title: 'Props & Add-Ons',
    description: 'LED lighting, and a choice from a selection of backdrops.',
  },
];

export const BOOKING_TERMS = [
  {
    title: 'Retainer',
    description: '25% non-refundable retainer required to lock in your date.',
  },
  {
    title: 'Final Balance',
    description: 'Remaining balance is due 7 days prior to your event.',
  },
];

export const HOME_QUICK_LINKS = [
  { label: 'Check Availability & Book', path: '/booking', variant: 'primary' },
  { label: 'View All Services', path: '/services', variant: 'secondary' },
  { label: 'Full Pricing Details', path: '/pricing', variant: 'secondary' },
  { label: 'Contact & Consultation', path: '/contact', variant: 'secondary' },
  { label: 'Client Testimonials', path: '/testimonials', variant: 'secondary' },
  { label: 'Shop Add-Ons', path: '/shop', variant: 'secondary' },
];

export const HOME_CONTACT_LINKS = [
  {
    label: `Call or Text ${BUSINESS.phone}`,
    href: `tel:${BUSINESS.phoneRaw}`,
    variant: 'primary',
  },
  {
    label: `Email ${BUSINESS.email}`,
    href: `mailto:${BUSINESS.email}`,
    variant: 'secondary',
  },
];
