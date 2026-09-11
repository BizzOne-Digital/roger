export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Red Rose Photo Booth LLC',
    image: '/logo.png',
    '@id': 'https://www.redrosephotobooth.com',
    url: 'https://www.redrosephotobooth.com',
    telephone: '+19162870870',
    email: 'Roger@redrosephotobooth.com',
    priceRange: '$$',
    description:
      'Red Rose Photo Booth brings unforgettable photo booth experiences to weddings, corporate events, and celebrations across the Bay Area.',
    founder: {
      '@type': 'Person',
      name: 'Roger Marionneaux',
    },
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'San Francisco Bay Area' },
      { '@type': 'State', name: 'California' },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductSchema({ product }) {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription,
    image: product.images?.[0]?.url,
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      price: product.salePrice ?? product.price,
      priceCurrency: 'USD',
      availability:
        product.stockQuantity > 0
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function LoadingSpinner({ size = 'md' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' };
  return (
    <div
      className={`${sizes[size]} border-2 border-antiqueGold/30 border-t-antiqueGold rounded-full animate-spin`}
      role="status"
      aria-label="Loading"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="card-luxury p-4 animate-pulse">
      <div className="bg-softBlush h-48 rounded mb-4" />
      <div className="bg-softBlush h-4 rounded w-3/4 mb-2" />
      <div className="bg-softBlush h-3 rounded w-1/2" />
    </div>
  );
}
