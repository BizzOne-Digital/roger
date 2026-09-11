/** External booking/POS URL — set VITE_BOOKING_URL when Roger connects HoneyBook, Square, etc. */
export const getBookingUrl = () => import.meta.env.VITE_BOOKING_URL || '/booking';

export const isExternalBooking = () => Boolean(import.meta.env.VITE_BOOKING_URL);
