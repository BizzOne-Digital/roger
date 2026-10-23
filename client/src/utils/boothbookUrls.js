export const DEFAULT_BOOTHBOOK_EMBED_URL =
  'https://app.boothbook.com/businesses/01a0b696-ccd1-73bf-96b4-4c35897e38f3/embed/forms/01a144ff-5652-7005-9573-1234461b3e6f';

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
