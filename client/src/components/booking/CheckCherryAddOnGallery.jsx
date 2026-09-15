import { useEffect, useState } from 'react';
import {
  CHECK_CHERRY_ADDON_GALLERY_PROPS,
  loadCheckCherryWidgetScript,
} from '../../utils/checkCherry';

export default function CheckCherryAddOnGallery({ className = '' }) {
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    loadCheckCherryWidgetScript()
      .then(() => {
        if (cancelled) return;
        setLoadError(false);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <p className="text-body-muted text-center text-sm py-6">
        Add-on booking gallery is temporarily unavailable. Please use{' '}
        <a
          href={`${CHECK_CHERRY_ADDON_GALLERY_PROPS.host}/reservation`}
          className="text-antiqueGold font-semibold hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check Availability &amp; Book
        </a>
        .
      </p>
    );
  }

  return (
    <div
      className={`checkcherry_widget_add-on-gallery w-full min-h-[240px] ${className}`}
      data-props={encodeURIComponent(JSON.stringify(CHECK_CHERRY_ADDON_GALLERY_PROPS))}
    />
  );
}
