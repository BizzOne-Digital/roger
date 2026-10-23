const DEFAULT_BOOTHBOOK_EMBED_URL =
  'https://app.boothbook.com/businesses/01a0b696-ccd1-73bf-96b4-4c35897e38f3/embed/forms/01a144ff-5652-7005-9573-1234461b3e6f';

const isDisallowedBookingUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes('checkcherry.com');
  } catch {
    return false;
  }
};

const isBoothBookIframeUrl = (url) =>
  /boothbook\.com\/embed\//i.test(url) ||
  /^https?:\/\/([a-z0-9-]+\.)*boothbook\.com\/forms\//i.test(url);

const isHttpUrl = (url) => /^https?:\/\//i.test(url);

/** Server-side BoothBook URLs (set on API host — no frontend rebuild required). */
export function resolvePublicBookingConfig(env = process.env) {
  const candidates = [
    env.BOOKING_EMBED_URL,
    env.VITE_BOOKING_EMBED_URL,
    env.BOOKING_URL,
    env.VITE_BOOKING_URL,
    DEFAULT_BOOTHBOOK_EMBED_URL,
  ]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .filter(Boolean);

  for (const url of candidates) {
    if (isDisallowedBookingUrl(url)) continue;
    if (isBoothBookIframeUrl(url)) {
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
