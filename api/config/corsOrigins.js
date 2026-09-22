/** Origins allowed for credentialed browser API calls (FRONTEND_URL + www/apex variants). */
export function getAllowedCorsOrigins() {
  const origins = new Set();
  const add = (raw) => {
    const url = String(raw || '').trim().replace(/\/$/, '');
    if (!url) return;
    origins.add(url);
    try {
      const { protocol, hostname } = new URL(url);
      if (hostname.startsWith('www.')) {
        origins.add(`${protocol}//${hostname.slice(4)}`);
      } else if (hostname !== 'localhost' && !/^\d+\.\d+\.\d+\.\d+$/.test(hostname)) {
        origins.add(`${protocol}//www.${hostname}`);
      }
    } catch {
      /* ignore invalid URL */
    }
  };

  add(process.env.FRONTEND_URL || 'http://localhost:5173');
  add('https://www.redrosephotobooth.com');
  add('https://redrosephotobooth.com');

  const extra = process.env.CORS_EXTRA_ORIGINS;
  if (extra) {
    extra.split(',').forEach((part) => add(part.trim()));
  }

  return [...origins];
}

export function createCorsOriginValidator(allowedOrigins) {
  const allowed = new Set(allowedOrigins);
  return (origin, callback) => {
    if (!origin || allowed.has(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin not allowed by CORS: ${origin}`));
  };
}
