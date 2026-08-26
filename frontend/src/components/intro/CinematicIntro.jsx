import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + (i * 8)}%`,
  delay: i * 0.3,
  duration: 4 + (i % 3),
}));

export default function CinematicIntro({ onComplete, onSkip }) {
  const containerRef = useRef(null);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setFlash(true);
          setTimeout(() => onComplete(), 400);
        },
      });

      tl.from('.intro-aperture-line', {
        scale: 0,
        rotation: -180,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      })
        .from('.intro-letter', {
          opacity: 0,
          y: 40,
          duration: 0.4,
          stagger: 0.08,
          ease: 'power3.out',
        }, '-=0.3')
        .from('.intro-subtitle', {
          opacity: 0,
          letterSpacing: '0.5em',
          duration: 0.8,
          ease: 'power2.out',
        }, '-=0.2')
        .from('.intro-tagline', {
          opacity: 0,
          y: 20,
          duration: 0.6,
        }, '-=0.4')
        .to('.intro-curtain-left', {
          x: '-100%',
          duration: 1,
          ease: 'power4.inOut',
        }, '+=0.5')
        .to('.intro-curtain-right', {
          x: '100%',
          duration: 1,
          ease: 'power4.inOut',
        }, '<');
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const letters = 'Red Rose'.split('');

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] bg-roseNoir overflow-hidden"
      role="dialog"
      aria-label="Website introduction"
    >
      <div className="absolute inset-0 bg-cinematic-radial opacity-80" />

      {petals.map((p) => (
        <div
          key={p.id}
          className="absolute w-3 h-3 bg-velvetRed/60 rounded-full blur-[1px] animate-float"
          style={{
            left: p.left,
            top: '-10%',
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="relative w-24 h-24 mb-8">
          {[0, 45, 90, 135].map((rot, i) => (
            <div
              key={i}
              className="intro-aperture-line absolute inset-0 border border-antiqueGold/80 rounded-full"
              style={{ transform: `rotate(${rot}deg)` }}
            />
          ))}
          <div className="intro-aperture-line absolute inset-4 border-2 border-antiqueGold rounded-full" />
          <div className="intro-aperture-line absolute inset-8 bg-antiqueGold rounded-full" />
        </div>

        <h1 className="font-display text-5xl md:text-7xl text-warmIvory mb-2">
          {letters.map((letter, i) => (
            <span key={i} className="intro-letter inline-block">
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        <p className="intro-subtitle font-display text-sm md:text-base tracking-[0.3em] text-champagneGold uppercase mb-4">
          Photo Booth LLC
        </p>

        <p className="intro-tagline font-script text-2xl md:text-3xl text-antiqueGold">
          Capturing Your Story
        </p>
      </div>

      <button
        onClick={onSkip}
        className="absolute bottom-8 right-8 z-20 text-champagneGold/70 text-sm tracking-widest uppercase hover:text-antiqueGold transition-colors focus:outline-none focus:ring-2 focus:ring-antiqueGold"
        aria-label="Skip introduction"
      >
        Skip Intro
      </button>

      <div className="intro-curtain-left absolute top-0 left-0 w-1/2 h-full bg-velvetRed z-30" />
      <div className="intro-curtain-right absolute top-0 right-0 w-1/2 h-full bg-deepBurgundy z-30" />

      {flash && (
        <div className="absolute inset-0 bg-warmIvory z-40 animate-pulse" />
      )}
    </div>
  );
}
