import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import { BRIDAL_EXPO_RESET_DELAY_MS } from '../utils/bridalExpo';

const REDIRECT_SECONDS = Math.round(BRIDAL_EXPO_RESET_DELAY_MS / 1000);

export default function BridalExpoThankYouPage() {
  const navigate = useNavigate();
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  usePageMeta({
    title: 'Thank You — Bridal Expo Registration',
    description: 'Thank you for registering with Red Rose Photo Booth at the bridal expo.',
  });

  useEffect(() => {
    if (window.self !== window.top) {
      window.top.location.replace(window.location.href);
      return undefined;
    }

    const tick = window.setInterval(() => {
      setSecondsLeft((s) => (s > 0 ? s - 1 : 0));
    }, 1000);

    const redirect = window.setTimeout(() => {
      navigate(`/bridal-expo?fresh=${Date.now()}`, { replace: true });
    }, BRIDAL_EXPO_RESET_DELAY_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <>
      <PageHero
        variant="contact"
        align="center"
        title={
          <>
            Thank <span className="text-gradient-gold">You!</span>
          </>
        }
        subtitle="Your registration has been received."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-2xl mx-auto text-center px-4">
          <div className="rounded-lg border border-antiqueGold/30 bg-white/80 p-8 md:p-10 shadow-sm">
            <p className="font-display text-xl md:text-2xl text-charcoal font-semibold mb-4">
              We&apos;re glad you stopped by Red Rose Photo Booth!
            </p>
            <p className="text-body-muted text-base md:text-lg leading-relaxed mb-6">
              Roger and the team will follow up after the expo. Enjoy the rest of the show!
            </p>
            <p className="text-sm font-semibold text-charcoal/80" aria-live="polite">
              Next guest registration opens in{' '}
              <span className="text-antiqueGold font-bold">{secondsLeft}</span> second
              {secondsLeft === 1 ? '' : 's'}…
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
