import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { testimonialsAPI } from '../../api/client';
import { EVENT_TYPES } from '../../utils/constants';

const emptyForm = {
  customerName: '',
  eventType: '',
  rating: 5,
  review: '',
};

export default function WriteReviewFloatingCTA() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [eventPhoto, setEventPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    if (success) {
      setSuccess(false);
      setForm(emptyForm);
      setEventPhoto(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await testimonialsAPI.submitReview(form, eventPhoto);
      setSuccess(true);
      toast.success('Thank you! Roger will review your submission before it goes live.');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-4 sm:right-6 z-40 flex items-center gap-2 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full shadow-lg shadow-black/30 border border-antiqueGold bg-charcoal text-warmIvory font-bold text-sm sm:text-base tracking-wide hover:bg-richRose hover:border-antiqueGold transition-colors focus:outline-none focus:ring-2 focus:ring-antiqueGold focus:ring-offset-2 focus:ring-offset-charcoal"
        aria-label="Write a review"
      >
        <span className="text-antiqueGold text-lg leading-none" aria-hidden="true">
          ★
        </span>
        Write a Review
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 sm:p-6 bg-charcoal/80 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-labelledby="write-review-title"
            onClick={close}
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-lg border border-antiqueGold/40 bg-warmIvory shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 p-6 border-b border-antiqueGold/20">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-antiqueGold mb-1">
                    Share your experience
                  </p>
                  <h2 id="write-review-title" className="font-display text-2xl font-semibold text-charcoal">
                    Write a Review
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={close}
                  className="text-charcoal/60 hover:text-charcoal text-2xl leading-none p-1"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {success ? (
                <div className="p-6 md:p-8 text-center">
                  <p className="text-antiqueGold font-display text-xl font-semibold mb-3">Thank you!</p>
                  <p className="text-body-muted mb-6">
                    Your review was sent to Roger for approval. Once approved, it will appear on our Testimonials
                    page.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    <Link to="/testimonials" className="btn-primary" onClick={close}>
                      View Testimonials
                    </Link>
                    <button type="button" onClick={close} className="btn-secondary">
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
                  <div>
                    <label className="label-luxury" htmlFor="review-name">
                      Your name
                    </label>
                    <input
                      id="review-name"
                      required
                      minLength={2}
                      maxLength={80}
                      className="input-luxury"
                      value={form.customerName}
                      onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="label-luxury" htmlFor="review-event">
                      Event type
                    </label>
                    <select
                      id="review-event"
                      required
                      className="input-luxury"
                      value={form.eventType}
                      onChange={(e) => setForm((f) => ({ ...f, eventType: e.target.value }))}
                    >
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="label-luxury block mb-2">Rating</span>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setForm((f) => ({ ...f, rating: star }))}
                          className={`text-2xl transition-transform hover:scale-110 ${
                            star <= form.rating ? 'text-antiqueGold' : 'text-charcoal/25'
                          }`}
                          aria-label={`${star} star${star > 1 ? 's' : ''}`}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="label-luxury" htmlFor="review-text">
                      Your review
                    </label>
                    <textarea
                      id="review-text"
                      required
                      minLength={20}
                      maxLength={2000}
                      rows={5}
                      className="input-luxury resize-y min-h-[120px]"
                      placeholder="Tell us about your Red Rose Photo Booth experience…"
                      value={form.review}
                      onChange={(e) => setForm((f) => ({ ...f, review: e.target.value }))}
                    />
                  </div>

                  <div>
                    <label className="label-luxury" htmlFor="review-photo">
                      Event photo (optional)
                    </label>
                    <input
                      id="review-photo"
                      type="file"
                      accept="image/jpeg,image/png,image/webp,image/gif"
                      className="input-luxury file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-antiqueGold/20 file:text-charcoal file:font-semibold"
                      onChange={(e) => setEventPhoto(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-body-muted mt-1">JPEG, PNG, or WebP — max 8 MB.</p>
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                    {loading ? 'Submitting…' : 'Submit Review'}
                  </button>
                  <p className="text-xs text-body-muted text-center">
                    Submissions are reviewed before publishing. Roger may edit or remove inappropriate content.
                  </p>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
