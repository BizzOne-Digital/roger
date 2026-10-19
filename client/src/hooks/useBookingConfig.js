import { useEffect, useState } from 'react';
import { configAPI } from '../api/client';
import { getBookingEmbedUrl, getBookingUrl } from '../utils/booking';

const buildTimeEmbed = getBookingEmbedUrl();
const buildTimeExternal =
  !buildTimeEmbed && /^https?:\/\//i.test(getBookingUrl()) ? getBookingUrl() : '';

export default function useBookingConfig() {
  const [state, setState] = useState({
    loading: !buildTimeEmbed && !buildTimeExternal,
    embedUrl: buildTimeEmbed,
    externalUrl: buildTimeExternal,
  });

  useEffect(() => {
    if (buildTimeEmbed || buildTimeExternal) return undefined;

    let cancelled = false;

    configAPI
      .getBooking()
      .then(({ data }) => {
        if (cancelled) return;
        setState({
          loading: false,
          embedUrl: data.embedUrl || '',
          externalUrl: data.externalUrl || '',
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ loading: false, embedUrl: '', externalUrl: '' });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
