import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { analyticsAPI } from '../api/client';

const SESSION_KEY = 'rrpb_analytics_session';

function getSessionId() {
  try {
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return '';
  }
}

/** Sends anonymous page views to the admin analytics dashboard (not shown on the public site). */
export default function usePageAnalytics() {
  const location = useLocation();
  const lastPath = useRef('');

  useEffect(() => {
    const path = `${location.pathname}${location.search}`;
    if (path === lastPath.current) return;
    lastPath.current = path;

    analyticsAPI
      .recordPageView({
        path,
        referrer: document.referrer || '',
        sessionId: getSessionId(),
      })
      .catch(() => {});
  }, [location]);
}
