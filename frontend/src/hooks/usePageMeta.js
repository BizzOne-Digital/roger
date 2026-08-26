import { useEffect } from 'react';

export const usePageMeta = ({ title, description, image }) => {
  useEffect(() => {
    const fullTitle = title
      ? `${title} | Red Rose Photo Booth LLC`
      : 'Red Rose Photo Booth LLC | Sacramento Luxury Photo Booth';

    document.title = fullTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    if (description) {
      setMeta('description', description);
      setMeta('og:description', description, true);
    }
    setMeta('og:title', fullTitle, true);
    if (image) setMeta('og:image', image, true);
  }, [title, description, image]);
};
