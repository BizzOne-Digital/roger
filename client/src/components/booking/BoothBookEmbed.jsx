import { useEffect, useMemo } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../ui/PageHero';
import PackageBookingBanner from '../pricing/PackageBookingBanner';
import { getBookingEmbedUrl } from '../../utils/booking';
import { DEFAULT_BOOTHBOOK_EMBED_URL } from '../../utils/boothbookUrls';
import { buildBoothBookEmbedSrc, findPackageBySlug } from '../../utils/packageBooking';
import { getPackageTitleLine } from '../../data/homeContent';

const BOOTHBOOK_WIDGET_SRC = 'https://cdn.system-assets.com/plugins/widget.js';

export default function BoothBookEmbed({ embedUrl: embedUrlProp, packageSlug = '' }) {
  const baseEmbedUrl = embedUrlProp || getBookingEmbedUrl();
  const selectedPackage = findPackageBySlug(packageSlug);
  const embedUrl = useMemo(
    () => buildBoothBookEmbedSrc(baseEmbedUrl, selectedPackage),
    [baseEmbedUrl, selectedPackage],
  );

  usePageMeta({
    title: 'Book Your Booth',
    description:
      'Check availability, choose your package, and complete your booking with Red Rose Photo Booth.',
  });

  useEffect(() => {
    if (!selectedPackage) return undefined;
    const banner = document.getElementById('selected-package-banner');
    banner?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return undefined;
  }, [selectedPackage]);

  useEffect(() => {
    if (!embedUrl) return;
    const existing = document.querySelector(`script[src="${BOOTHBOOK_WIDGET_SRC}"]`);
    if (existing) return;
    const script = document.createElement('script');
    script.src = BOOTHBOOK_WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, [embedUrl]);

  if (!embedUrl) {
    return null;
  }

  return (
    <>
      <PageHero
        variant="booking"
        title={
          <>
            Book Your <span className="text-gradient-gold">Experience</span>
          </>
        }
        subtitle={
          selectedPackage
            ? `You're booking ${getPackageTitleLine(selectedPackage)} — choose your date and complete checkout below.`
            : 'Check availability, select your package, and complete your booking securely below.'
        }
      />
      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto min-w-0">
          <PackageBookingBanner pkg={selectedPackage} />
          <iframe
            id="boothbook-embed"
            widget="true"
            src={embedUrl}
            title="Red Rose Photo Booth — online booking"
            width="100%"
            height="300"
            frameBorder="0"
            scrolling="no"
            className="w-full border-0 rounded-lg bg-white/80 shadow-sm min-h-[320px]"
            allow="payment *; fullscreen"
            style={{ display: 'block' }}
          />
          <p className="text-sm text-body-muted text-center mt-6 max-w-2xl mx-auto">
            Secure booking powered by BoothBook &amp; Stripe.{' '}
            <a
              href={embedUrl || DEFAULT_BOOTHBOOK_EMBED_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-antiqueGold font-semibold hover:underline"
            >
              Open full booking page
            </a>
            {' '}if the form does not display. Questions?{' '}
            <a href="/contact" className="text-antiqueGold font-semibold hover:underline">
              Contact us
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
