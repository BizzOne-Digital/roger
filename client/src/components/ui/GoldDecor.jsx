import { Link } from 'react-router-dom';

/** Small gold flourish used beside hero eyebrow text */
export default function GoldFlourish({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 6h10M14 6c0-2 2-4 4-4s4 2 4 4s-2 4-4 4s-4-2-4-4zM26 6h22"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
      />
      <path d="M20 6l2-2 2 2-2 2-2-2z" fill="currentColor" />
    </svg>
  );
}

/** Ornamental gold divider below hero heading */
export function GoldOrnamentDivider({ className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 sm:w-20 bg-gradient-to-r from-transparent to-antiqueGold/80" />
      <svg viewBox="0 0 24 24" className="w-5 h-5 text-antiqueGold shrink-0" fill="currentColor">
        <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" />
      </svg>
      <div className="h-px w-12 sm:w-20 bg-gradient-to-l from-transparent to-antiqueGold/80" />
    </div>
  );
}
