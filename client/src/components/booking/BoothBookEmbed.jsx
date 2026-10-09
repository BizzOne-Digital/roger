import { useEffect } from 'react';
import { usePageMeta } from '../../hooks/usePageMeta';
import PageHero from '../ui/PageHero';
import { getBookingEmbedUrl } from '../../utils/booking';

const BOOTHBOOK_WIDGET_SRC = 'https://cdn.system-assets.com/plugins/widget.js';

export default function BoothBookEmbed() {
  const embedUrl = getBookingEmbedUrl();

  usePageMeta({
    title: 'Book Your Booth',
    description:
      'Check availability, choose your package, and complete your booking with Red Rose Photo Booth.',
  });

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
        subtitle="Check availability, select your package, and complete your booking securely below."
      />
      <section className="section-padding bg-warmIvory">
        <div className="max-w-4xl mx-auto min-w-0">
          <iframe
            widget="true"
            src={embedUrl}
            title="Red Rose Photo Booth — online booking"
            width="100%"
            height="300"
            frameBorder="0"
            scrolling="no"
            className="w-full border-0 rounded-lg bg-white/80 shadow-sm min-h-[320px]"
            style={{ display: 'block' }}
          />
          <p className="text-sm text-body-muted text-center mt-6 max-w-2xl mx-auto">
            Secure booking powered by BoothBook. Questions?{' '}
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
