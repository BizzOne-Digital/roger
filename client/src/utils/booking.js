/** Set VITE_BOOKING_URL to Roger’s public BoothBook link when ready. Legacy Check Cherry URLs are ignored. */
const isDisallowedBookingUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes('checkcherry.com');
  } catch {
    return false;
  }
};

export const getBookingUrl = () => {
  const env = import.meta.env.VITE_BOOKING_URL?.trim();
  if (!env || env === '/booking') return '/booking';
  if (isDisallowedBookingUrl(env)) return '/booking';
  return env;
};

export const isExternalBooking = () => /^https?:\/\//i.test(getBookingUrl());
