/** Set VITE_BOOKING_URL to Roger’s public BoothBook booking/checkout link when ready. */
export const getBookingUrl = () => {
  const env = import.meta.env.VITE_BOOKING_URL?.trim();
  if (!env || env === '/booking') return '/booking';
  return env;
};

export const isExternalBooking = () => /^https?:\/\//i.test(getBookingUrl());
