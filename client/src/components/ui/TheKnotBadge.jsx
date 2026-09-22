const THE_KNOT_PROFILE_URL =
  'https://www.theknot.com/marketplace/redirect-2108056?utm_source=vendor_website&utm_medium=banner&utm_term=2b20bffc-474e-47d0-9102-ba7e67352b9e&utm_campaign=vendor_badge_assets';

const THE_KNOT_BADGE_SRC =
  'https://d13ns7kbjmbjip.cloudfront.net/For_Your_Website/TK-badge_AsSeen.png';

export default function TheKnotBadge({ className = '', width = 190 }) {
  return (
    <a
      href={THE_KNOT_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-antiqueGold focus:ring-offset-2 focus:ring-offset-charcoal rounded-sm ${className}`}
      aria-label="View Red Rose Photo Booth on The Knot"
    >
      <img
        src={THE_KNOT_BADGE_SRC}
        alt="As seen on The Knot"
        width={width}
        height={Math.round(width * 0.35)}
        className="h-auto max-w-full"
        loading="lazy"
        decoding="async"
      />
    </a>
  );
}
