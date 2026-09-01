import { BUSINESS } from '../utils/constants';

export const HERO_BANNER = '/banner-hero-top.jpg';

export const HERO_FEATURE_HIGHLIGHTS = [
  {
    title: 'Tailored Event Prints',
    description:
      'Custom-tailored to you and your event. Choose 2×6 photo strips, classic 4×6 prints, or enjoy both!',
  },
  {
    title: 'Instant Digital Sharing',
    description:
      'Guests can instantly receive and share their photos digitally, making it effortless to save and post every moment.',
  },
];

export const HOME_WELCOME = {
  title: 'Welcome to Red Rose Photo Booth',
  body:
    'We appreciate your interest in Red Rose Photo Booth for your special occasion! We are dedicated to collaborating with you to deliver an exceptional, unforgettable photo booth experience for you and your guests on your big day.',
};

export const RED_ROSE_BIO = {
  title: 'About Red Rose Photo Booth',
  paragraphs: [
    'Red Rose Photo Booth LLC is owned and operated by Roger Marionneaux, delivering high-end, customizable photo booth experiences throughout the Bay Area and beyond.',
    'We combine top-tier camera technology, instant digital sharing, and custom-branded prints so every guest leaves with memories they will treasure — and share — long after the celebration ends.',
  ],
};

export const EVENT_EXPERIENCE = {
  title: 'Your Event Experience',
  features: [
    '24 Megapixel DSLR Camera',
    'Studio-Quality Lighting',
    'High-Quality Professional Prints',
    'Black & White or Color Photo Options',
    '2×6 Photo Strips or 4×6 Prints',
    'Bonus: 1.5 Hours Included for Early Setup & Breakdown (at no extra charge to your active booth time)',
  ],
};

export const ADD_ON_SERVICES = {
  title: 'Package Upgrades & Add-Ons',
  items: [
    {
      name: 'Digital Guest Phone — Audio Guestbook',
      price: '$250 bundled with booth packages',
      image: '/addon-audio-guestbook.jpg',
      imageAlt: 'Red Rose Photo Booth vintage guest phone audio guestbook station at a wedding',
      description:
        'Our digital guest phone lets guests leave you a personal voice message — a modern audio guestbook your clients will treasure. Typically priced up to $450 elsewhere; bundle it with your existing booth package for $250.',
      note: 'Available when added to 1/2 Dozen. Consultation required.',
    },
    {
      name: 'On-Site Custom Acrylic Keychains',
      price: '$175 for 50 Keychains',
      image: '/addon-keychains.jpg',
      imageAlt: 'Red Rose Photo Booth on-site keychain station with custom photo keychains',
      description:
        'Using our on-site keychain maker, guests take their photo and we print it live onto a 1-inch clear circle acrylic keychain. Includes a stylish leather wristlet — a keepsake they can take home the same night.',
      note: 'Distributed on a first-come, first-served basis. Consultation required.',
    },
    {
      name: 'Photo Strip Magnet Keepsakes',
      price: '$175 for 50 Magnets',
      description:
        'Guests snap their photo at the booth, then we add it on-site to a photo strip magnet — the same great keepsake experience as our keychains, priced the same. A fun takeaway they can stick on the fridge and enjoy every day.',
      note: 'Distributed on a first-come, first-served basis. Consultation required.',
    },
  ],
  consultationNote:
    'Any package upgrades, add-ons, or custom edits require a consultation so we can tailor everything to your event.',
};

export const HOME_PACKAGES = [
  {
    name: '1/2 Dozen',
    price: 950,
    features: [
      'Full setup and props',
      'Instant email sharing',
      'Basic backdrops',
      'Red-carpet treatment and a prop table that your guests will love',
    ],
  },
  {
    name: 'Dozen',
    price: 1300,
    featured: true,
    badge: 'Featured — Most Popular',
    features: [
      'Full setup and props (included from Package 1: 1/2 Dozen)',
      'Instant email sharing',
      'One extra hour of service',
      'Audio guestbook for recorded voice messages',
      'Choice of custom photo keychains OR photo magnets for guests',
      'Choice of premium backdrops',
      'Red-carpet treatment and a prop table that your guests will love',
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
