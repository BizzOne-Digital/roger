export const BUSINESS = {
  name: 'Red Rose Photo Booth LLC',
  shortName: 'Red Rose Photo Booth',
  tagline: 'Capturing Your Story',
  owner: 'Roger Marionneaux',
  phone: '(916) 287-0870',
  phoneRaw: '9162870870',
  email: 'Roger@redrosephotobooth.com',
  serviceArea: 'Bay Area & Northern California',
  website: 'www.redrosephotobooth.com',
  state: 'CA',
};

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Shop', path: '/shop' },
  { name: 'Contact', path: '/contact' },
];

/** Extended nav for mobile / footer — includes pages not in main header */
export const NAV_LINKS_EXTENDED = [
  ...NAV_LINKS,
  { name: 'Pricing', path: '/pricing' },
  { name: 'Blog', path: '/blog' },
  { name: 'Booking', path: '/booking' },
];

export const EVENT_TYPES = [
  'Weddings',
  'Birthdays',
  'Corporate Events',
  'Graduations',
  'Anniversaries',
  'Private Parties',
  'Holiday Events',
  'Community Celebrations',
];

export const ORDER_STATUSES = [
  'pending',
  'contacted',
  'confirmed',
  'processing',
  'completed',
  'cancelled',
];

export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const formatDate = (date) =>
  new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
