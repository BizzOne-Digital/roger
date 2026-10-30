export const BUSINESS = {
  name: 'Red Rose Photo Booth LLC',
  shortName: 'Red Rose Photo Booth',
  tagline: 'Capturing Your Story',
  owner: 'Roger Marionneaux',
  phone: '(916) 287-0870',
  phoneRaw: '9162870870',
  email: 'Roger@redrosephotobooth.com',
  serviceArea: 'Sacramento, Bay Area & Northern California',
  website: 'https://www.redrosephotobooth.com',
  websiteDisplay: 'www.redrosephotobooth.com',
  state: 'CA',
  googleReviewUrl: 'https://g.page/r/CeM2bTloU4n0EAI/review',
};

/** Official Red Rose social profiles (Roger 2026). */
export const SOCIAL_LINKS = [
  {
    id: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61595907396456',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/redrosephotoboothllc/',
  },
];

/** Meta Facebook Page Plugin — timeline tab for /booking feed section. */
export function getFacebookPagePluginSrc(width = 500) {
  const pageUrl = encodeURIComponent(SOCIAL_LINKS.find((l) => l.id === 'facebook').href);
  return `https://www.facebook.com/plugins/page.php?href=${pageUrl}&tabs=timeline&width=${width}&height=620&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`;
}

/** Optional SnapWidget / LightWidget iframe src for Instagram grid (set in Vite env). */
export const INSTAGRAM_FEED_IFRAME_SRC = import.meta.env.VITE_INSTAGRAM_FEED_IFRAME_URL || '';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
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
