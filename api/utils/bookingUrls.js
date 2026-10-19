const isDisallowedBookingUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes('checkcherry.com');
  } catch {
    return false;
  }
};

const isBoothBookEmbedUrl = (url) => /boothbook\.com\/embed\//i.test(url);

const isHttpUrl = (url) => /^https?:\/\//i.test(url);

/** Server-side BoothBook URLs (set on API host — no frontend rebuild required). */
export function resolvePublicBookingConfig(env = process.env) {
  const candidates = [
    env.BOOKING_EMBED_URL,
    env.VITE_BOOKING_EMBED_URL,
    env.BOOKING_URL,
    env.VITE_BOOKING_URL,
  ]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean);

  for (const url of candidates) {
    if (isDisallowedBookingUrl(url)) continue;
    if (isBoothBookEmbedUrl(url)) {
      return { embedUrl: url, externalUrl: '' };
    }
  }

  for (const url of candidates) {
    if (isDisallowedBookingUrl(url)) continue;
    if (isHttpUrl(url)) {
      return { embedUrl: '', externalUrl: url };
    }
  }

  return { embedUrl: '', externalUrl: '' };
}
