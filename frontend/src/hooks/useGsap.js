import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGsapReveal = (options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y: options.y ?? 60, x: options.x ?? 0 });

    const ctx = gsap.context(() => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: options.duration ?? 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, el);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [options.y, options.x, options.duration, options.start]);

  return ref;
};

export const useStaggerReveal = (selector = '.stagger-item', options = {}) => {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll(selector);
    if (!items.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      gsap.set(items, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(items, { opacity: 0, y: options.y ?? 40 });

    const ctx = gsap.context(() => {
      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: options.duration ?? 0.8,
        stagger: options.stagger ?? 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: options.start ?? 'top 90%',
          toggleActions: 'play none none none',
          once: true,
        },
      });
    }, container);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [selector, options.y, options.duration, options.stagger, options.start]);

  return ref;
};

export const useParallax = (speed = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: speed * 100,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed]);

  return ref;
};
