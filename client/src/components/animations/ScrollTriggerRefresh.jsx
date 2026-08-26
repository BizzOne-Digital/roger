import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/** Recalculate ScrollTrigger after route changes and window load */
export default function ScrollTriggerRefresh() {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener('load', refresh);
    const t = setTimeout(refresh, 500);
    return () => {
      window.removeEventListener('load', refresh);
      clearTimeout(t);
    };
  }, []);

  return null;
}
