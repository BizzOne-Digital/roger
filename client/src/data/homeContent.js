import { BUSINESS } from '../utils/constants';

export const HOME_INTRO = {
  paragraphs: [
    'Ready to make your event unforgettable? Red Rose Photo Booth delivers high-end, customizable photo booth experiences that bring the fun and save every epic moment. By combining top-tier camera technology, instant digital sharing, and custom-branded prints, we capture memories your guests will talk about long after the party ends!',
    `Whether you're planning a wedding, corporate showcase, or private celebration, checking availability and securing your spot is effortless. Visit our website to check your date and book online instantly, or give us a call or text to set up a personalized consultation today!`,
  ],
};

export const HOME_PACKAGES = [
  {
    name: 'The One Rose',
    duration: '3 Hours',
    price: 900,
    features: 'Standard booth setup, full feature suite, and select fabric backdrop.',
  },
  {
    name: 'The Half Dozen',
    duration: '4 Hours',
    price: 1200,
    features: 'Extended event coverage, full feature suite, and upgraded prop options.',
    featured: true,
  },
  {
    name: 'The Full Dozen',
    duration: '5 Hours',
    price: 1400,
    features: 'Maximum event runtime, full feature suite, and priority customization.',
  },
];

export const PACKAGE_INCLUDES = [
  {
    title: 'Setup & On-Site Support',
    description:
      'Professional set up & tear down, plus a dedicated booth attendant on-site for the duration of your event.',
  },
  {
    title: 'Instant Sharing & Digital Access',
    description:
      "Instant file downloads straight to guests' phones, unlimited GIFs and boomerangs (by request), and a complete online gallery post-event.",
  },
  {
    title: 'Custom Branding & Visuals',
    description:
      'Custom tap-to-start screen, custom-designed photo template and/or overlay, custom LED lighting, and a choice from our selection of fabric backdrops.',
  },
  {
    title: 'Printing & Photo Captures',
    description: 'Unlimited sessions with unlimited professional prints.',
  },
  {
    title: 'Props & Add-Ons',
    description: 'High-quality props included. (Ask us about our GLAM filter!)',
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
