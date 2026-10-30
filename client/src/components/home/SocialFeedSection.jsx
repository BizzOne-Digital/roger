import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '../ui/SectionTypography';
import SocialLinks from '../ui/SocialLinks';
import {
  getFacebookPagePluginSrc,
  INSTAGRAM_FEED_IFRAME_SRC,
  SOCIAL_LINKS,
} from '../../utils/constants';

function useContainerWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(500);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const update = () => setWidth(Math.min(Math.max(el.offsetWidth, 280), 640));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, width };
}

export default function SocialFeedSection() {
  const { ref, width } = useContainerWidth();
  const instagramHref = SOCIAL_LINKS.find((l) => l.id === 'instagram')?.href;

  return (
    <section className="section-padding bg-charcoal text-warmIvory border-t border-antiqueGold/20">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Stay Connected"
          title="Follow Red Rose Photo Booth"
          subtitle="See our latest events, setups, and celebration moments on Facebook and Instagram."
          className="mb-10 md:mb-12"
          light
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          <div ref={ref} className="min-w-0">
            <h3 className="font-display text-xl text-antiqueGold font-semibold mb-4 text-center lg:text-left">
              Facebook
            </h3>
            <div className="rounded-lg overflow-hidden border border-antiqueGold/25 bg-warmIvory/5 min-h-[320px]">
              <iframe
                title="Red Rose Photo Booth on Facebook"
                src={getFacebookPagePluginSrc(width)}
                width={width}
                height={620}
                style={{ border: 'none', overflow: 'hidden', width: '100%', maxWidth: '100%' }}
                scrolling="no"
                allow="encrypted-media"
                loading="lazy"
              />
            </div>
          </div>

          <div className="min-w-0">
            <h3 className="font-display text-xl text-antiqueGold font-semibold mb-4 text-center lg:text-left">
              Instagram
            </h3>
            {INSTAGRAM_FEED_IFRAME_SRC ? (
              <div className="rounded-lg overflow-hidden border border-antiqueGold/25 bg-warmIvory/5">
                <iframe
                  title="Red Rose Photo Booth on Instagram"
                  src={INSTAGRAM_FEED_IFRAME_SRC}
                  className="w-full min-h-[620px] border-0"
                  loading="lazy"
                />
              </div>
            ) : (
              <div className="rounded-lg border border-antiqueGold/25 bg-roseNoir/40 p-8 md:p-10 text-center flex flex-col items-center justify-center min-h-[320px]">
                <SocialLinks variant="large" className="justify-center mb-6" />
                <p className="text-warmIvory/90 text-base md:text-lg leading-relaxed max-w-md mb-6">
                  Follow{' '}
                  <a
                    href={instagramHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-antiqueGold font-semibold hover:text-warmIvory"
                  >
                    @redrosephotoboothllc
                  </a>{' '}
                  for our newest photo booth setups, event highlights, and behind-the-scenes moments.
                </p>
                <a
                  href={instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary inline-flex"
                >
                  View on Instagram
                </a>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <SocialLinks variant="large" />
        </div>
      </div>
    </section>
  );
}
