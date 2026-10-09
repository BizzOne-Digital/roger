/** Set VITE_BOOKING_EMBED_URL (or VITE_BOOKING_URL) to Roger’s BoothBook embed form. Legacy Check Cherry URLs are ignored. */

const isDisallowedBookingUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes('checkcherry.com');
  } catch {
    return false;
  }
};

const isBoothBookEmbedUrl = (url) => /boothbook\.com\/embed\//i.test(url);

const resolveEnvBookingUrl = () => {
  const embedEnv = import.meta.env.VITE_BOOKING_EMBED_URL?.trim();
  const bookingEnv = import.meta.env.VITE_BOOKING_URL?.trim();
  return embedEnv || bookingEnv || '';
};

/** BoothBook iframe `src` — embed path on /booking. */
export const getBookingEmbedUrl = () => {
  const env = resolveEnvBookingUrl();
  if (env && !isDisallowedBookingUrl(env) && isBoothBookEmbedUrl(env)) {
    return env;
  }
  return '';
};

export const hasBoothBookEmbed = () => Boolean(getBookingEmbedUrl());

/** Legacy full-page BoothBook (non-embed) redirect URL. */
export const getBookingUrl = () => {
  const env = resolveEnvBookingUrl();
  if (!env || env === '/booking') return '/booking';
  if (isDisallowedBookingUrl(env)) return '/booking';
  if (isBoothBookEmbedUrl(env)) return '/booking';
  return env;
};

export const isExternalBooking = () => hasBoothBookEmbed() || /^https?:\/\//i.test(getBookingUrl());

/** Where “Book” buttons should navigate. */
export const getBookingLinkHref = () => {
  if (hasBoothBookEmbed()) return '/booking';
  const url = getBookingUrl();
  return url;
};

export const isBookingLinkExternal = () => /^https?:\/\//i.test(getBookingLinkHref());
