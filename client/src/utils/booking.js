/** Set VITE_BOOKING_EMBED_URL (or VITE_BOOKING_URL) to Roger’s BoothBook form or embed URL. */

import {
  DEFAULT_BOOTHBOOK_EMBED_URL,
  isBoothBookIframeUrl,
  isDisallowedBookingUrl,
} from './boothbookUrls.js';

const resolveEnvBookingUrl = () => {
  const embedEnv = import.meta.env.VITE_BOOKING_EMBED_URL?.trim();
  const bookingEnv = import.meta.env.VITE_BOOKING_URL?.trim();
  return embedEnv || bookingEnv || '';
};

/** BoothBook iframe `src` — embed path on /booking. */
export const getBookingEmbedUrl = () => {
  const candidates = [resolveEnvBookingUrl(), DEFAULT_BOOTHBOOK_EMBED_URL].filter(Boolean);
  for (const url of candidates) {
    if (!isDisallowedBookingUrl(url) && isBoothBookIframeUrl(url)) {
      return url;
    }
  }
  return '';
};

export const hasBoothBookEmbed = () => Boolean(getBookingEmbedUrl());

/** Legacy full-page BoothBook (non-embed) redirect URL. */
export const getBookingUrl = () => {
  const env = resolveEnvBookingUrl();
  if (!env || env === '/booking') return '/booking';
  if (isDisallowedBookingUrl(env)) return '/booking';
  if (isBoothBookIframeUrl(env)) return '/booking';
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
