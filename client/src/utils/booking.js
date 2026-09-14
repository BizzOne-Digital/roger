/** Secure online booking & deposits via Check Cherry */
export const CHECK_CHERRY_BOOKING_URL =
  'https://red-rose-photo-booth-llc.checkcherry.com/reservation';

/** Override with VITE_BOOKING_URL; set to `/booking` to use the on-site request form only */
export const getBookingUrl = () => {
  const env = import.meta.env.VITE_BOOKING_URL?.trim();
  if (env === '/booking') return '/booking';
  if (env) return env;
  return CHECK_CHERRY_BOOKING_URL;
};

export const isExternalBooking = () => /^https?:\/\//i.test(getBookingUrl());
