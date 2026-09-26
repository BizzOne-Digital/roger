import { useEffect, useState } from 'react';
import { analyticsAPI } from '../../api/client';
import { LoadingSpinner } from '../../components/ui/Shared';
import toast from 'react-hot-toast';

export default function AdminAnalytics() {
  const [days, setDays] = useState(30);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    analyticsAPI
      .getSummary({ days })
      .then(({ data }) => setSummary(data.summary))
      .catch(() => toast.error('Failed to load analytics'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [days]);

  if (loading && !summary) {
    return (
      <div className="flex justify-center py-20">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl text-warmIvory">Site Analytics</h1>
        <label className="flex items-center gap-2 text-warmIvory/70 text-sm">
          Period
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="input-luxury bg-charcoal/50 text-warmIvory border-antiqueGold/20 py-2"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </label>
      </div>

      <p className="text-warmIvory/60 text-sm mb-6 max-w-2xl">
        Private visitor stats for your site — not shown to the public. Referrer data depends on the visitor&apos;s
        browser; direct visits often appear as blank or your own domain.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-10">
        <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
          <p className="text-warmIvory/50 text-sm">Page views</p>
          <p className="text-3xl font-bold text-antiqueGold mt-2">{summary?.totalPageViews ?? 0}</p>
        </div>
        <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
          <p className="text-warmIvory/50 text-sm">Estimated sessions</p>
          <p className="text-3xl font-bold text-champagneGold mt-2">{summary?.uniqueSessions ?? 0}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
          <h2 className="font-display text-xl text-warmIvory mb-4">Top pages</h2>
          {summary?.topPages?.length ? (
            <ul className="space-y-2 text-sm">
              {summary.topPages.map((row) => (
                <li key={row.path} className="flex justify-between gap-4 text-warmIvory/80">
                  <span className="truncate">{row.path}</span>
                  <span className="text-antiqueGold font-semibold shrink-0">{row.views}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-warmIvory/50 text-sm">No data yet — browse the public site to collect views.</p>
          )}
        </div>

        <div className="bg-roseNoir border border-antiqueGold/20 rounded-lg p-6">
          <h2 className="font-display text-xl text-warmIvory mb-4">Top referrers</h2>
          {summary?.topReferrers?.length ? (
            <ul className="space-y-2 text-sm">
              {summary.topReferrers.map((row) => (
                <li key={row.source} className="flex justify-between gap-4 text-warmIvory/80">
                  <span className="truncate">{row.source}</span>
                  <span className="text-antiqueGold font-semibold shrink-0">{row.views}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-warmIvory/50 text-sm">No external referrers recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
