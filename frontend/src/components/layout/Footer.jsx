import { Link } from 'react-router-dom';
import { PhoneIcon, EmailIcon, MapPinIcon } from '../icons/Icons';
import { BUSINESS } from '../../utils/constants';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-warmIvory">
      <div className="gold-line" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 md:pt-14 pb-4 md:pb-5 min-w-0 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="block mb-4 group" aria-label="Red Rose Photo Booth LLC — Home">
              <div className="relative h-16 sm:h-20 w-[200px] sm:w-[240px] overflow-hidden rounded-sm transition-opacity group-hover:opacity-90">
                <img
                  src="/header-logo.png"
                  alt="Red Rose Photo Booth LLC"
                  className="absolute top-0 left-0 w-full h-auto pointer-events-none select-none"
                />
              </div>
            </Link>
            <p className="text-body-muted-light text-base">
              Sacramento&apos;s luxury photo booth experience for weddings, corporate events, and celebrations.
            </p>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-antiqueGold mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {['Services', 'Pricing', 'Shop', 'Booking', 'Contact'].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase()}`}
                    className="text-warmIvory/90 hover:text-antiqueGold transition-colors text-base font-semibold"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-antiqueGold mb-4">Contact</h3>
            <ul className="space-y-3 text-base">
              <li className="flex items-start gap-2 text-warmIvory/90 font-medium">
                <PhoneIcon className="w-4 h-4 text-antiqueGold mt-0.5 shrink-0" />
                <a href={`tel:${BUSINESS.phoneRaw}`} className="hover:text-antiqueGold font-semibold">
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-2 text-warmIvory/90 font-medium">
                <EmailIcon className="w-4 h-4 text-antiqueGold mt-0.5 shrink-0" />
                <a href={`mailto:${BUSINESS.email}`} className="hover:text-antiqueGold font-semibold break-all">
                  {BUSINESS.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-warmIvory/90 font-medium">
                <MapPinIcon className="w-4 h-4 text-antiqueGold mt-0.5 shrink-0" />
                <span className="font-semibold">{BUSINESS.address}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-antiqueGold mb-4">Owner & Operator</h3>
            <p className="text-warmIvory font-bold text-base mb-2">{BUSINESS.owner}</p>
            <p className="text-body-muted-light mb-4">
              Hours: Mon–Sat 9AM–6PM
            </p>
            <div className="flex gap-3">
              {['Facebook', 'Instagram', 'Pinterest'].map((social) => (
                <span
                  key={social}
                  className="w-9 h-9 rounded-full border border-antiqueGold/30 flex items-center justify-center text-sm font-bold text-antiqueGold/80"
                  aria-label={`${social} link`}
                >
                  {social[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="gold-line my-5 md:my-6" />
        <p className="text-center text-warmIvory/70 text-sm md:text-base font-medium pb-1">
          &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved. Sacramento, CA.
        </p>
      </div>
    </footer>
  );
}
