import { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { BRIDAL_EXPO_ANNOUNCEMENT } from '../data/homeContent';
import { BRIDAL_EXPO_FORM_URL, getBridalExpoEmbedUrl } from '../utils/bridalExpo';

const BOOTHBOOK_WIDGET_SRC = 'https://cdn.system-assets.com/plugins/widget.js';

export default function BridalExpoPage() {
  const [searchParams] = useSearchParams();
  const freshKey = searchParams.get('fresh') || 'initial';
  const embedUrl = getBridalExpoEmbedUrl();

  usePageMeta({
    title: 'Bridal Expo Registration',
    description:
      'Register with Red Rose Photo Booth at the California Bridal & Wedding Expo. Quick sign-up for expo guests.',
  });

  useEffect(() => {
    const existing = document.querySelector(`script[src="${BOOTHBOOK_WIDGET_SRC}"]`);
    if (existing) return;
    const script = document.createElement('script');
    script.src = BOOTHBOOK_WIDGET_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      <PageHero
        variant="contact"
        title={
          <>
            Bridal Expo <span className="text-gradient-gold">Registration</span>
          </>
        }
        subtitle="Welcome! Share your details below — we'll follow up after the California Bridal & Wedding Expo."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-3xl mx-auto min-w-0 px-4 sm:px-6">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-antiqueGold mb-2">
              {BRIDAL_EXPO_ANNOUNCEMENT.eyebrow}
            </p>
            <p className="font-display text-lg text-charcoal font-semibold">{BRIDAL_EXPO_ANNOUNCEMENT.when}</p>
            <p className="text-body-muted text-sm md:text-base mt-1">{BRIDAL_EXPO_ANNOUNCEMENT.where}</p>
          </div>

          <iframe
            key={freshKey}
            id="bridal-expo-boothbook-embed"
            widget="true"
            src={embedUrl}
            title="Red Rose Photo Booth — Bridal Expo registration"
            width="100%"
            height="320"
            frameBorder="0"
            scrolling="no"
            className="w-full border-0 rounded-lg bg-white shadow-sm border border-antiqueGold/20 min-h-[400px] md:min-h-[520px]"
            allow="fullscreen"
            style={{ display: 'block' }}
          />

          <p className="text-sm text-body-muted text-center mt-6 max-w-xl mx-auto leading-relaxed">
            Form not loading?{' '}
            <a
              href={BRIDAL_EXPO_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-antiqueGold font-semibold hover:underline"
            >
              Open the registration form in a new tab
            </a>
            . Questions?{' '}
            <Link to="/contact" className="text-antiqueGold font-semibold hover:underline">
              Contact Roger
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
