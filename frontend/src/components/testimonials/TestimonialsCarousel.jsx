import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import TestimonialCard from './TestimonialCard';

const AUTO_PLAY_MS = 4500;

function useSlidesPerView() {
  const [slidesPerView, setSlidesPerView] = useState(1);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)');
    const update = () => setSlidesPerView(media.matches ? 2 : 1);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return slidesPerView;
}

export default function TestimonialsCarousel({ testimonials }) {
  const slidesPerView = useSlidesPerView();
  const [index, setIndex] = useState(0);
  const maxIndex = Math.max(0, testimonials.length - slidesPerView);

  useEffect(() => {
    setIndex(0);
  }, [slidesPerView, testimonials.length]);

  useEffect(() => {
    if (testimonials.length <= slidesPerView) return undefined;

    const timer = window.setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_PLAY_MS);

    return () => window.clearInterval(timer);
  }, [testimonials.length, slidesPerView, maxIndex]);

  if (!testimonials.length) return null;

  const trackWidthPercent = (testimonials.length / slidesPerView) * 100;
  const slideWidthPercent = 100 / testimonials.length;
  const translatePercent = index * slideWidthPercent;

  return (
    <div className="max-w-5xl mx-auto w-full min-w-0 px-1">
      <div className="overflow-hidden w-full max-w-full">
        <motion.div
          className="flex items-stretch"
          style={{ width: `${trackWidthPercent}%` }}
          animate={{ x: `-${translatePercent}%` }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial._id}
              className="box-border flex-shrink-0 px-3 h-auto"
              style={{ width: `${slideWidthPercent}%` }}
            >
              <TestimonialCard testimonial={testimonial} equalHeight />
            </div>
          ))}
        </motion.div>
      </div>

      {testimonials.length > slidesPerView && (
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                dotIndex === index
                  ? 'w-8 bg-antiqueGold'
                  : 'w-2.5 bg-antiqueGold/35 hover:bg-antiqueGold/60'
              }`}
              aria-label={`Show testimonial slide ${dotIndex + 1}`}
              aria-current={dotIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}
