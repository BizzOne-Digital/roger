import { useEffect, useState } from 'react';

const INTRO_KEY = 'rr_intro_seen';

export const useIntroSeen = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem(INTRO_KEY);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!seen && !prefersReduced) {
      setShowIntro(true);
    }
    setReady(true);
  }, []);

  const completeIntro = () => {
    sessionStorage.setItem(INTRO_KEY, 'true');
    setShowIntro(false);
  };

  const skipIntro = () => {
    sessionStorage.setItem(INTRO_KEY, 'true');
    setShowIntro(false);
  };

  return { showIntro, ready, completeIntro, skipIntro };
};
