import { isBoothBookIframeUrl } from './boothbookUrls';

export const BRIDAL_EXPO_FORM_URL = 'https://redrosephotobooth.boothbook.com/forms/bridal-expo';

export const DEFAULT_BRIDAL_EXPO_EMBED_URL =
  'https://redrosephotobooth.boothbook.com/embed/forms/bridal-expo';

/** Where BoothBook should send guests after a successful lead (configure in BoothBook form settings). */
export const BRIDAL_EXPO_THANK_YOU_URL = 'https://www.redrosephotobooth.com/bridal-expo/thank-you';

export const BRIDAL_EXPO_RESET_DELAY_MS = 8000;

/** BoothBook embed URL for the on-site registration iframe. */
export function getBridalExpoEmbedUrl() {
  const fromEnv = import.meta.env.VITE_BRIDAL_EXPO_EMBED_URL?.trim();
  if (fromEnv && isBoothBookIframeUrl(fromEnv)) return fromEnv;
  return DEFAULT_BRIDAL_EXPO_EMBED_URL;
}
