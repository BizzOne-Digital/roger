import { ENGAGEMENT_PACKAGES, HOME_PACKAGES, getPackageTitleLine } from '../data/homeContent';

export function findPackageBySlug(slug) {
  if (!slug) return null;
  return (
    ENGAGEMENT_PACKAGES.find((pkg) => pkg.slug === slug) ||
    HOME_PACKAGES.find((pkg) => pkg.slug === slug) ||
    null
  );
}

/** On-site booking path with package pre-selection for BoothBook embed. */
export function getPackageBookingPath(pkgOrSlug) {
  const slug = typeof pkgOrSlug === 'string' ? pkgOrSlug : pkgOrSlug?.slug;
  if (!slug) return '/booking';
  return `/booking?package=${encodeURIComponent(slug)}`;
}

/** Append BoothBook URL query params from package config (hidden event type links, etc.). */
export function buildBoothBookEmbedSrc(baseEmbedUrl, pkg) {
  if (!baseEmbedUrl) return '';
  if (pkg?.boothBookDirectUrl) return pkg.boothBookDirectUrl;

  try {
    const url = new URL(baseEmbedUrl);
    const query = pkg?.boothBookQuery?.trim();
    if (query) {
      const normalized = query.startsWith('?') ? query.slice(1) : query;
      const extra = new URLSearchParams(normalized);
      extra.forEach((value, key) => {
        url.searchParams.set(key, value);
      });
    }
    return url.toString();
  } catch {
    return baseEmbedUrl;
  }
}

export function getPackageBookingLabel(pkg) {
  return `Book ${getPackageTitleLine(pkg)}`;
}
