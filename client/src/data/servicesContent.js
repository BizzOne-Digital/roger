/** Photo Booth Services — four main offerings (Roger 2026). */

export const SERVICE_OFFERINGS = [
  {
    id: 'wedding',
    title: 'Wedding Photo Booth',
    startingAt: 950,
    pricingLabel: 'Starting at $950',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    description:
      'Elegant, wedding-ready photo booth experiences featuring professional DSLR photography, studio-quality lighting, unlimited photo sessions, professional onsite prints, personalized wedding templates, instant digital sharing, fun props, and a professional booth attendant.',
    buttonLabel: 'View Wedding Packages',
    buttonTo: '/pricing',
  },
  {
    id: 'parties',
    title: 'Parties & Special Occasions',
    startingAt: 500,
    pricingLabel: 'Starting at $500 • 2-Hour Minimum',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80',
    description:
      'You bring the party. We\'ll capture the memories! Perfect for birthdays, graduations, anniversaries, Bar & Bat Mitzvahs, retirement parties, reunions, baby showers, engagement parties, holiday parties, school events, family celebrations, and more.',
    buttonLabel: 'View Party Details',
    buttonTo: '/services/parties',
  },
  {
    id: 'corporate',
    title: 'Corporate Events',
    startingAt: 950,
    pricingLabel: 'Starting at $950',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80',
    description:
      'Professional. Branded. Engaging. Memorable. A professional DSLR photo booth experience for company celebrations, employee appreciation events, holiday parties, conferences, trade shows, grand openings, fundraisers, galas, promotional events, and more.',
    buttonLabel: 'View Corporate Packages',
    buttonTo: '/services/corporate',
  },
  {
    id: 'glam',
    title: 'GLAM Filter Add-On',
    startingAt: null,
    pricingLabel: 'Contact for Pricing',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80',
    description:
      'Add a sophisticated, studio-inspired GLAM finish to your photo booth experience for smooth, elegant, magazine-worthy photos. A beautiful upgrade for weddings, milestone celebrations, corporate events, and other special occasions.',
    buttonLabel: 'Add GLAM to Your Experience',
    buttonTo: '/services/glam',
  },
];

export const PARTY_SERVICE = {
  heroTitle: 'Parties & Special Occasions',
  heroSubtitle: '$250 per hour — one price, your celebration, your way.',
  callout: '🎉 YOU BRING THE PARTY. WE\'LL CAPTURE THE MEMORIES! 📸',
  intro:
    'No complicated packages. Choose the number of hours you need and let Red Rose Photo Booth bring the fun. $250 per hour. Simple. Fun. Memorable. 🌹',
  eventTypes:
    'Birthdays • Graduations • Anniversaries • Bar & Bat Mitzvahs • Retirement Parties • Reunions • Baby Showers • Engagement Parties • Holiday Parties • School Events • Family Celebrations & More',
  experienceTitle: 'The Red Rose Party Experience — $250/Hour',
  includes: [
    '24-Megapixel DSLR Photography',
    'Studio-Quality Lighting',
    'Unlimited Photo Booth Sessions',
    'Professional Onsite Prints',
    'Fun Photo Booth Props',
    'Personalized Event Photo Template',
    'Instant Digital Sharing',
    'Friendly Professional Booth Attendant',
  ],
  pricingTiers: [
    { hours: 2, price: 500 },
    { hours: 3, price: 750 },
    { hours: 4, price: 1000 },
    { hours: 5, price: 1250 },
  ],
  additionalHourNote: 'Additional Hours — $250 each',
  minimumNote: '2-hour minimum • Starting at $500',
};

export const CORPORATE_PACKAGES = [
  {
    name: 'Corporate Essential',
    price: 950,
    hours: 3,
    summary: 'A polished photo booth experience for your event.',
    features: [
      '3 Hours of Service',
      '24-Megapixel DSLR Photography',
      'Studio-Quality Professional Lighting',
      'Unlimited Photo Booth Sessions',
      'High-Quality Onsite Prints',
      'Custom Company/Event Photo Template',
      'Company Logo & Event Branding',
      'Instant Digital Sharing',
      'Professional Booth Attendant & Props',
    ],
  },
  {
    name: 'Corporate Signature',
    price: 1150,
    hours: 4,
    featured: true,
    badge: 'Most Popular',
    summary: 'Take your company event to the next level.',
    features: [
      '4 Hours of Service',
      'Everything in Corporate Essential, PLUS:',
      'Premium Backdrop Selection',
      'Custom-Branded Welcome Screen',
      'Enhanced Company/Event Branding',
      'Premium Photo Booth Props',
      'Digital Event Photo Gallery',
      'GIF & Digital Sharing Experience',
      'Choice of Photo Keychains OR Magnets',
    ],
  },
  {
    name: 'Corporate Premier',
    price: 1400,
    hours: 5,
    vip: true,
    summary: 'The complete Red Rose VIP corporate experience.',
    features: [
      '5 Hours of Service',
      'Everything in Corporate Signature, PLUS:',
      'VIP Red-Carpet Experience',
      'Gold Stanchions & Red Velvet Ropes',
      'Premium Backdrop Selection',
      'Audio Guestbook for Recorded Messages',
      'Photo Keychains AND Photo Magnets',
      'Complete Digital Event Gallery',
      'Premium Red Rose Event Experience',
    ],
  },
];

export const CORPORATE_PAGE = {
  heroTitle: 'Corporate Events',
  heroSubtitle: 'Professional. Branded. Engaging. Memorable.',
  intro:
    'Bring the Red Rose experience to company celebrations, employee events, holiday parties, grand openings, conferences, fundraisers, galas, and promotional events. Our corporate experiences combine professional DSLR photography with custom branding and instant guest engagement.',
};

export const GLAM_PAGE = {
  heroTitle: 'GLAM Filter Add-On',
  heroSubtitle: 'Studio-inspired elegance for every guest.',
  body:
    'Upgrade any Red Rose package with our GLAM filter — a sophisticated, studio-inspired finish for smooth, elegant, magazine-worthy photos. Perfect for weddings, milestone celebrations, corporate events, and upscale occasions.',
  features: [
    'Professional beauty-inspired retouching filter',
    'Works with prints and digital sharing',
    'Add to wedding, party, or corporate packages',
    'Guest-favorite upgrade for formal events',
  ],
  pricingNote: 'Contact Roger for GLAM pricing on your event date and package.',
};
