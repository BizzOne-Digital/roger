import PageView from '../models/PageView.js';
import AppError from '../utils/AppError.js';

const parseReferrerHost = (referrer) => {
  if (!referrer) return '';
  try {
    return new URL(referrer).hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
};

export const recordPageView = async (req, res, next) => {
  try {
    const path = String(req.body.path || '').trim();
    if (!path || !path.startsWith('/')) {
      return next(new AppError('Invalid page path.', 400));
    }

    const referrer = String(req.body.referrer || '').trim().slice(0, 2048);
    const sessionId = String(req.body.sessionId || '').trim().slice(0, 64);
    const userAgent = String(req.headers['user-agent'] || '').slice(0, 512);

    await PageView.create({
      path: path.slice(0, 512),
      referrer,
      referrerHost: parseReferrerHost(referrer),
      sessionId,
      userAgent,
    });

    res.status(201).json({ success: true });
  } catch (error) {
    next(error);
  }
};

export const getAnalyticsSummary = async (req, res, next) => {
  try {
    const days = Math.min(Math.max(parseInt(req.query.days, 10) || 30, 1), 365);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    const match = { createdAt: { $gte: since } };

    const [totals, topPages, topReferrers, uniqueSessions] = await Promise.all([
      PageView.countDocuments(match),
      PageView.aggregate([
        { $match: match },
        { $group: { _id: '$path', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 12 },
      ]),
      PageView.aggregate([
        { $match: { ...match, referrerHost: { $ne: '' } } },
        { $group: { _id: '$referrerHost', views: { $sum: 1 } } },
        { $sort: { views: -1 } },
        { $limit: 12 },
      ]),
      PageView.distinct('sessionId', { ...match, sessionId: { $ne: '' } }),
    ]);

    res.json({
      success: true,
      days,
      summary: {
        totalPageViews: totals,
        uniqueSessions: uniqueSessions.length,
        topPages: topPages.map((row) => ({ path: row._id, views: row.views })),
        topReferrers: topReferrers.map((row) => ({ source: row._id, views: row.views })),
      },
    });
  } catch (error) {
    next(error);
  }
};
