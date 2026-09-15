export const CHECK_CHERRY_HOST =
  import.meta.env.VITE_CHECKCHERRY_HOST?.trim() ||
  'https://red-rose-photo-booth-llc.checkcherry.com';

export const CHECK_CHERRY_WIDGET_SCRIPT = `${CHECK_CHERRY_HOST}/api/checkcherry_widgets`;

export const CHECK_CHERRY_API_KEY =
  import.meta.env.VITE_CHECKCHERRY_API_KEY?.trim() || 'RYR-K44P-C3G';

/** Props for Check Cherry “add-on gallery” embed (Website Integration) */
export const CHECK_CHERRY_ADDON_GALLERY_PROPS = {
  apiKey: CHECK_CHERRY_API_KEY,
  iframe: false,
  host: CHECK_CHERRY_HOST,
  showBookNowButton: true,
  bookNowButtonText: 'Book Now',
  showPrice: true,
};

let widgetScriptPromise = null;

export function loadCheckCherryWidgetScript() {
  if (widgetScriptPromise) return widgetScriptPromise;

  widgetScriptPromise = new Promise((resolve, reject) => {
    const src = CHECK_CHERRY_WIDGET_SCRIPT;
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === 'true') {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Check Cherry widgets failed to load')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;
    script.dataset.loaded = 'false';
    script.onload = () => {
      script.dataset.loaded = 'true';
      resolve();
    };
    script.onerror = () => {
      widgetScriptPromise = null;
      reject(new Error('Check Cherry widgets failed to load'));
    };
    document.body.appendChild(script);
  });

  return widgetScriptPromise;
}
