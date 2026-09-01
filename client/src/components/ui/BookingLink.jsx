import { Link } from 'react-router-dom';
import { getBookingUrl } from '../../utils/booking';

export default function BookingLink({ className, children, ...props }) {
  const url = getBookingUrl();
  const isExternal = /^https?:\/\//i.test(url);

  if (isExternal) {
    return (
      <a href={url} className={className} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={url} className={className} {...props}>
      {children}
    </Link>
  );
}
