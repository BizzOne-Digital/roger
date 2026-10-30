import { FacebookIcon, InstagramIcon } from '../icons/Icons';
import { SOCIAL_LINKS } from '../../utils/constants';

const ICONS = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
};

/**
 * @param {'header' | 'footer' | 'large'} variant
 */
export default function SocialLinks({ variant = 'footer', className = '' }) {
  const isHeader = variant === 'header';
  const isLarge = variant === 'large';

  const linkClass = isLarge
    ? 'w-12 h-12 rounded-full border-2 border-antiqueGold/40 flex items-center justify-center text-antiqueGold hover:bg-antiqueGold hover:text-charcoal transition-colors'
    : isHeader
      ? 'w-9 h-9 rounded-full border border-antiqueGold/40 flex items-center justify-center text-antiqueGold hover:bg-antiqueGold hover:text-charcoal transition-colors'
      : 'w-10 h-10 rounded-full border border-antiqueGold/35 flex items-center justify-center text-antiqueGold hover:bg-antiqueGold hover:text-charcoal transition-colors';

  const iconClass = isLarge ? 'w-6 h-6' : isHeader ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className={`flex items-center gap-2.5 ${className}`} role="list" aria-label="Social media">
      {SOCIAL_LINKS.map((item) => {
        const Icon = ICONS[item.id];
        return (
          <a
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
            aria-label={`Follow Red Rose Photo Booth on ${item.label}`}
            role="listitem"
          >
            {Icon ? <Icon className={iconClass} /> : item.label[0]}
          </a>
        );
      })}
    </div>
  );
}
