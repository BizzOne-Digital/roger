import { Link, useNavigate } from 'react-router-dom';
import { getPackageBookingPath, getPackageBookingLabel } from '../../utils/packageBooking';

/** Clickable package row/card — opens /booking with package context for BoothBook. */
export function PackageBookingRow({
  pkg,
  children,
  className = '',
  asTableRow = false,
}) {
  const navigate = useNavigate();
  const to = getPackageBookingPath(pkg);
  const label = getPackageBookingLabel(pkg);

  const sharedClass = `${className} cursor-pointer transition-colors hover:bg-antiqueGold/5 focus-within:ring-2 focus-within:ring-antiqueGold/40 outline-none`;

  if (asTableRow) {
    return (
      <tr
        className={sharedClass}
        onClick={() => navigate(to)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigate(to);
          }
        }}
        tabIndex={0}
        role="link"
        aria-label={label}
      >
        {children}
      </tr>
    );
  }

  return (
    <article
      className={sharedClass}
      onClick={() => navigate(to)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigate(to);
        }
      }}
      tabIndex={0}
      role="link"
      aria-label={label}
    >
      {children}
    </article>
  );
}

export function PackageBookCtaLink({
  pkg,
  className = 'btn-primary w-full sm:w-auto mt-4',
  label = 'Book this package',
}) {
  return (
    <Link
      to={getPackageBookingPath(pkg)}
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {label}
    </Link>
  );
}
