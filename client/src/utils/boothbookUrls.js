export const DEFAULT_BOOTHBOOK_FORM_URL =
  'https://redrosephotobooth.boothbook.com/forms/booking-form-1';

export const isDisallowedBookingUrl = (url) => {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return host.includes('checkcherry.com');
  } catch {
    return false;
  }
};

/** URLs that can load inside the on-site /booking iframe. */
export const isBoothBookIframeUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return (
    /boothbook\.com\/embed\//i.test(url) ||
    /^https?:\/\/([a-z0-9-]+\.)*boothbook\.com\/forms\//i.test(url)
  );
};
