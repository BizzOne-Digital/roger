export const blogPosts = [
  {
    id: 'wedding-photo-booth-trends',
    slug: 'wedding-photo-booth-trends-2026',
    title: 'Wedding Photo Booth Trends for 2026',
    category: 'Weddings',
    excerpt:
      'Discover the latest trends in luxury wedding photo booths—from custom templates to instant social sharing that keeps guests engaged all night.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    author: 'Red Rose Team',
    date: '2026-01-15',
    content: `
      <p>Luxury weddings in Sacramento are embracing photo booths as essential entertainment. In 2026, couples are prioritizing custom-designed photo strips that match their wedding palette, elegant prop collections, and seamless digital sharing.</p>
      <p>At Red Rose Photo Booth, we craft bespoke templates featuring your names, date, and floral motifs. Our touch-screen kiosks deliver instant prints and SMS sharing, ensuring every guest captures the magic.</p>
      <p>Consider adding our premium prop collection and extended digital gallery for a complete experience your guests will remember.</p>
    `,
  },
  {
    id: 'corporate-event-ideas',
    slug: 'corporate-event-photo-booth-ideas',
    title: '5 Corporate Event Photo Booth Ideas',
    category: 'Corporate Events',
    excerpt:
      'Elevate your next corporate gala, conference, or team celebration with branded photo experiences that boost engagement and social reach.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    author: 'Red Rose Team',
    date: '2026-02-01',
    content: `
      <p>Corporate events demand professionalism and brand alignment. Here are five ideas to make your photo booth a centerpiece:</p>
      <p><strong>1. Branded Templates:</strong> Incorporate your company logo and event hashtag on every photo strip.</p>
      <p><strong>2. Green Screen Backdrops:</strong> Transport guests to custom branded environments.</p>
      <p><strong>3. Instant Social Sharing:</strong> Drive engagement with real-time posts tagged to your event.</p>
      <p><strong>4. Executive Props:</strong> Curated accessories that match your brand aesthetic.</p>
      <p><strong>5. Data Collection:</strong> Optional email capture for follow-up marketing.</p>
    `,
  },
  {
    id: 'photo-booth-tips',
    slug: 'photo-booth-tips-perfect-photos',
    title: '10 Tips for Perfect Photo Booth Photos',
    category: 'Photo Booth Tips',
    excerpt:
      'Simple tips to help your guests look their best and create stunning memories at any celebration.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
    author: 'Red Rose Team',
    date: '2026-02-10',
    content: `
      <p>Great photo booth photos start with great preparation. Encourage guests to gather in groups, use props creatively, and strike natural poses.</p>
      <p>Our professional attendants guide guests through the experience, ensuring everyone feels comfortable and confident. Good lighting, quality props, and a fun atmosphere make all the difference.</p>
      <p>Book early for peak season dates and customize your template to match your event theme.</p>
    `,
  },
  {
    id: 'event-inspiration-gala',
    slug: 'luxury-gala-event-inspiration',
    title: 'Luxury Gala Event Inspiration',
    category: 'Event Inspiration',
    excerpt:
      'Create an unforgettable gala atmosphere with cinematic lighting, velvet accents, and a photo booth that matches the elegance of your venue.',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    author: 'Red Rose Team',
    date: '2026-02-20',
    content: `
      <p>Luxury galas demand attention to every detail. Pair deep burgundy and gold décor with our Red Rose photo booth experience for a cohesive, cinematic atmosphere.</p>
      <p>From red carpet arrivals to midnight celebrations, our booth keeps the energy high while delivering polished, shareable memories.</p>
    `,
  },
  {
    id: 'behind-the-scenes',
    slug: 'behind-the-scenes-red-rose',
    title: 'Behind the Scenes: A Day with Red Rose',
    category: 'Behind the Scenes',
    excerpt:
      'Follow our team from setup to strike-a-pose as we bring the luxury photo booth experience to a Sacramento wedding.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
    author: 'Roger Marionneaux',
    date: '2026-03-01',
    content: `
      <p>Every Red Rose event begins hours before guests arrive. We transport our premium kiosk, set up custom lighting, arrange props, and test every detail.</p>
      <p>Our professional attendants greet guests, manage the queue, and ensure the experience feels effortless. When the last photo is printed, we carefully pack up—leaving your venue spotless.</p>
      <p>It's this dedication that makes Red Rose Photo Booth Sacramento's choice for luxury celebrations.</p>
    `,
  },
];

export const blogCategories = [
  'All',
  'Event Inspiration',
  'Photo Booth Tips',
  'Weddings',
  'Corporate Events',
  'Behind the Scenes',
];

export const getBlogPost = (slug) => blogPosts.find((p) => p.slug === slug);
