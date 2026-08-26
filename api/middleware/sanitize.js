import xss from 'xss';

export const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') return xss(obj.trim());
    if (Array.isArray(obj)) return obj.map(sanitize);
    if (obj && typeof obj === 'object') {
      const cleaned = {};
      for (const key of Object.keys(obj)) {
        cleaned[key] = sanitize(obj[key]);
      }
      return cleaned;
    }
    return obj;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  next();
};
