import { isBoothBookIframeUrl } from './boothbookUrls';

/** Full-page fallback (same Bridal Expo form Roger shared from BoothBook). */
export const BRIDAL_EXPO_FORM_URL =
  'https://app.boothbook.com/businesses/01a0b696-ccd1-73bf-96b4-4c35897e38f3/forms/01a1acfc-79f1-7138-8366-35a5bff70773';

/** Embed Whole Form — Leads → Bridal Expo → Share → Embed (Roger / Chris BoothBook). */
export const DEFAULT_BRIDAL_EXPO_EMBED_URL =
  'https://app.boothbook.com/businesses/01a0b696-ccd1-73bf-96b4-4c35897e38f3/embed/forms/01a1acfc-79f1-7138-8366-35a5bff70773';

/** Where BoothBook should send guests after a successful lead (configure in BoothBook form settings). */
export const BRIDAL_EXPO_THANK_YOU_URL = 'https://www.redrosephotobooth.com/bridal-expo/thank-you';

export const BRIDAL_EXPO_RESET_DELAY_MS = 8000;

/** BoothBook embed URL for the on-site registration iframe. */
export function getBridalExpoEmbedUrl() {
  const fromEnv = import.meta.env.VITE_BRIDAL_EXPO_EMBED_URL?.trim();
  if (fromEnv && isBoothBookIframeUrl(fromEnv)) return fromEnv;
  return DEFAULT_BRIDAL_EXPO_EMBED_URL;
}
