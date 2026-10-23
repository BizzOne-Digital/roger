import { BUSINESS } from '../utils/constants';

export const HERO_BANNER = '/banner-hero-top.jpg';

export const CUSTOM_PRINTS = {
  title: 'Custom Prints – Your Memories, Your Way!',
  body:
    '**Why choose one when you can have both?** Enjoy our classic **2x6 photo strips**, our beautiful **4x6 postcard-style prints**, or **BOTH!** Every print is professionally produced and personalized for your celebration, giving your guests a fun, picture-perfect keepsake they\'ll treasure long after the party ends!',
};

export const HERO_FEATURE_HIGHLIGHTS = [
  {
    title: CUSTOM_PRINTS.title,
    description:
      'Classic 2x6 photo strips, beautiful 4x6 postcard-style prints, or both — professionally produced and personalized for your celebration.',
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

export const OUR_STORY = {
  title: 'Our Story – Red Rose Photo Booth 🌹',
  blocks: [
    {
      type: 'lead',
      text:
        'Every love story has a beginning. Ours began with a beautiful connection, a special spirit, and one single red rose.',
    },
    {
      type: 'p',
      text:
        'Years ago, when I asked my now-wife, Kristina, to be my girlfriend, I gave her one single red rose. It was a simple gesture that became a lasting tradition, symbolizing our love, happiness, and the beautiful journey we would share together.',
    },
    {
      type: 'p',
      text:
        'That special rose eventually became the inspiration behind **Red Rose Photo Booth**, a business created from love and a passion for helping others capture their own unforgettable moments.',
    },
    {
      type: 'p',
      text:
        'We believe every celebration tells a story worth remembering. Whether it\'s a wedding, birthday, anniversary, school event, or corporate celebration, our goal is to bring joy, excitement, and plenty of laughter to your special day.',
    },
    {
      type: 'p',
      text:
        'With over a decade of professional event and media experience, we combine high-quality photography, beautiful prints, modern technology, and personalized service to create a fun and memorable experience.',
    },
    {
      type: 'emphasis',
      text:
        '**Because it\'s more than just pictures and props.** It\'s about capturing genuine smiles, heartfelt connections, and memories you\'ll treasure for a lifetime.',
    },
    {
      type: 'p',
      text:
        'At Red Rose Photo Booth, your celebration is our priority. We take pride in making every experience personal, enjoyable, and truly unforgettable.',
    },
    {
      type: 'p',
      text: '**Our story began with one red rose. Now, we\'d love to help capture yours.**',
    },
    {
      type: 'signoff',
      text: '🌹 **Red Rose Photo Booth – Let\'s Capture Your Story!**',
    },
  ],
};

/** @deprecated Use OUR_STORY — kept for imports that expect title only */
export const RED_ROSE_BIO = {
  title: OUR_STORY.title,
  paragraphs: [],
};

export const OUR_STORY_HOME_EXCERPT = OUR_STORY.blocks.slice(0, 3);

export const OUR_STORY_CONTACT_EXCERPT = OUR_STORY.blocks.slice(0, 3);

/** Opening value proposition — home page (below logo banner). */
export const RED_ROSE_PROMISE = {
  title: 'More Than a Photo Booth — It\'s a Red Rose.',
  paragraphs: [
    'At Red Rose Photo Booth, we don\'t just set up a booth and walk away. We\'re there to help your guests have fun, keep everything running smoothly, and make sure your photo booth experience feels like a special part of your celebration.',
    'We provide professional photo-booth experiences for weddings, birthdays, celebrations, corporate events, school events, and special occasions throughout Sacramento and the Bay Area.',
  ],
};

export const BRIDAL_EXPO_ANNOUNCEMENT = {
  eyebrow: 'Meet us in person',
  title: 'California Bridal & Wedding Expo',
  when: 'Sunday, November 15, 2026',
  where: 'SAFE Credit Union Convention Center · Sacramento, CA',
  detail:
    'Red Rose Photo Booth will be an exhibitor — stop by our booth to see the experience and chat about your wedding day.',
};

export const ABOUT_PAGE = {
  title: OUR_STORY.title,
};

export const EVENT_EXPERIENCE = {
  title: 'Your Event Experience',
  features: [
    '24 Megapixel DSLR Camera',
    'Studio-Quality Lighting',
    'High-Quality Professional Prints',
    'Black & White or Color Photo Options',
    '2x6 Photo Strips, 4x6 Postcard-Style Prints, or Both',
    'Bonus: 1.5 Hours Included for Early Setup & Breakdown (at no extra charge to your active booth time)',
  ],
};

export const ADD_ON_SERVICES = {
  title: 'Package Upgrades & Add-Ons',
  items: [
    {
      name: 'Inflatable LED Photo Booth Experience',
      price: '$150 Add-On',
      image: '/addon-inflatable-led-booth.jpg',
      imageAlt:
        'Large black inflatable LED photo booth enclosure with blue interior lighting at an event venue',
      imageCaption:
        'Floral arrangements and event décor shown for display purposes only and are not included.',
      description:
        'Transform your photo booth experience with our large inflatable LED enclosure featuring vibrant LED lighting for a fun, immersive, and unforgettable experience. Perfect for weddings, parties, corporate events, and special occasions.',
    },
    {
      name: 'Digital Guest Phone — Audio Guestbook',
      price: '$150.00 add-on with booth packages',
      image: '/addon-audio-guestbook.jpg',
      imageAlt: 'Red Rose Photo Booth vintage guest phone audio guestbook station at a wedding',
      description:
        'Our digital guest phone lets guests leave you a personal voice message — a modern audio guestbook your clients will treasure. Available as an add-on with your booth package.',
      note: 'Included in Bouquet; available as an add-on for other packages. Consultation required.',
    },
    {
      name: 'Custom Name Sign — Wedding Package Backdrop',
      price: '$200.00 Add-On',
      image: '/addon-custom-name-sign.jpg',
      imageAlt:
        'Gold script custom name sign on a wedding photo booth backdrop with floral accents',
      imageCaption:
        'Floral arrangements and event décor shown for display purposes only and are not included.',
      description:
        'Personalize your wedding package backdrop with a custom 3D name sign — a keepsake you take home after your event. Standard size is approximately 35.5″ (about 90 cm); other sizes are available upon consultation. Choose from Black, Gold, White, Silver, Red, or Rose Gold.',
      note: 'Consultation required for names, size, and finish.',
    },
    {
      name: 'On-Site Custom Acrylic Keychains',
      price: '$150.00 for 50 Keychains',
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

export const PACKAGE_PAGE_INTRO = {
  brandLine: 'Red Rose Photo Booth LLC — Photo Booth Packages',
  lead: 'Step into the camera spotlight and let Red Rose Photo Booth capture your story!',
  body:
    'We bring lots of fun, professional-quality photography, and memorable experiences to weddings, birthdays, anniversaries, school events, corporate celebrations, and more.',
  closing: 'Your Event. Your Memories. Your Story.',
  closingCta: 'Let Red Rose Photo Booth capture your story!',
};

export const CUSTOM_PACKAGES = {
  eyebrow: 'Custom Packages',
  title: "Love a Package? Let's Make It Yours! 🌹",
  paragraphs: [
    'Every celebration is unique, and we want your photo booth experience to be just as special!',
    "Choose any of our available packages, and we'll do our very best to customize it to fit your event, style, and vision.",
    "Whether you're planning a wedding, corporate event, birthday celebration, or special occasion, we'd love to discuss your ideas and create something memorable.",
  ],
  startingAt: 'Custom Packages Starting at $500 for Eligible Special Events',
  quotePrompt:
    'Tell us about your event, including your date, venue, and special requests, and we\'ll provide a personalized quote.',
  note: 'Please note: Standard wedding packages retain their existing pricing and four-hour minimum.',
  ctaLabel: 'Request Your Custom Quote',
};

export const HOME_PACKAGES = [
  {
    slug: 'one-rose',
    name: 'One Rose',
    price: 950,
    hours: 4,
    tagline: 'The Classic',
    /** Optional BoothBook URL params (e.g. hidden event type from BoothBook Settings). */
    boothBookQuery: '',
    /** Optional full BoothBook embed URL for this package only (overrides query). */
    boothBookDirectUrl: '',
    summary:
      'A complete open-air photo booth experience with everything you need to get the celebration started! Great photos, lots of fun, and unforgettable memories.',
    closing: 'Everything you need to capture the fun and create lasting memories!',
    features: [
      'Professional Open Air Photo Booth Setup',
      '24MP DSLR Camera with Professional Studio Lighting',
      'High-Quality Professional Onsite Prints',
      'Fun Photo Booth Props and Prop Table',
      'Instant Email Photo Sharing',
      'Choice of Four (4) Basic Backdrops',
      'Red-Carpet Runner Treatment',
      'Personalized Event Photo Template',
    ],
  },
  {
    slug: 'dozen',
    name: 'Dozen',
    price: 1150,
    hours: 5,
    featured: true,
    tagline: 'The Favorite',
    badge: 'MOST POPULAR',
    boothBookQuery: '',
    boothBookDirectUrl: '',
    summary:
      'More time, upgraded options, and personalized keepsakes for your guests. The perfect balance of elegance, excitement, and unforgettable memories.',
    closing: 'More time. More memories. More fun!',
    features: [
      'Everything in the One Rose Package, PLUS:',
      'One (1) Additional Hour of Photo Booth Service',
      'Choice of Custom Photo Keepsakes: Photo Keychains OR Photo Magnets',
      'Choice of Premium Backdrops',
    ],
  },
  {
    slug: 'bouquet',
    name: 'Bouquet',
    price: 1400,
    hours: 6,
    tagline: 'The Red Rose VIP Experience',
    vip: true,
    boothBookQuery: '',
    boothBookDirectUrl: '',
    summary:
      'Our premium experience for celebrations that deserve the full Red Rose treatment.',
    closing:
      'The complete Red Rose experience—more fun, more keepsakes, and more ways to capture your story.',
    features: [
      'Everything in Dozen, PLUS:',
      '1 Additional Hour of Booth Service (2 Extra Hours total over One Rose)',
      'Audio Guestbook for Recorded Messages',
      'BOTH Keepsakes Included: Custom Photo Keychains AND Photo Magnets',
      'VIP Upgrade: Gold Stanchions & Velvet Ropes added to Red Carpet Treatment',
      'Full Digital Gallery Access',
      'Upgrade to Premium Props Set',
    ],
  },
];

/** Single-line package title: `One Rose | The Classic` or `Dozen | The Favorite`. */
export function getPackageTitleLine(pkg) {
  if (pkg.tagline) return `${pkg.name} | ${pkg.tagline}`;
  if (pkg.featured && pkg.badge) return `${pkg.name} | ${pkg.badge}`;
  return pkg.name;
}

/** Optional badge line under the title (e.g. MOST POPULAR). */
export function getPackageBadgeLine(pkg) {
  if (pkg.featured && pkg.badge && pkg.tagline) return pkg.badge;
  return '';
}

export const PACKAGE_MINIMUM_NOTE =
  '4-hour event minimum. $150 for each additional hour after your initial booking.';

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
    title: 'Booking Retainer',
    description: '$100 non-refundable booking retainer required to lock in your date (via BoothBook & Stripe).',
  },
  {
    title: 'Final Balance',
    description: 'Remaining balance is due 14 days prior to your event.',
  },
];

export const HOME_QUICK_LINKS = [
  { label: 'Check Availability & Book', path: '/booking', variant: 'primary' },
  { label: 'Our Story', path: '/about', variant: 'secondary' },
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
