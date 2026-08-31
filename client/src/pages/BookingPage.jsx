import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { ordersAPI, servicesAPI } from '../api/client';
import { EVENT_TYPES } from '../utils/constants';
import PageHero from '../components/ui/PageHero';

const STEPS = ['Contact', 'Event Details', 'Service & Features', 'Review'];

export default function BookingPage() {
  usePageMeta({
    title: 'Book Your Booth',
    description: 'Request a Red Rose Photo Booth booking for your Bay Area event.',
  });

  const [step, setStep] = useState(0);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    startTime: '',
    duration: '',
    venueName: '',
    venueAddress: '',
    guestCount: '',
    serviceId: '',
    requestedFeatures: [],
    additionalNotes: '',
  });

  useEffect(() => {
    servicesAPI.getAll().then(({ data }) => setServices(data.services)).catch(() => {});
  }, []);

  const update = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleFeature = (feature) => {
    setForm((prev) => ({
      ...prev,
      requestedFeatures: prev.requestedFeatures.includes(feature)
        ? prev.requestedFeatures.filter((f) => f !== feature)
        : [...prev.requestedFeatures, feature],
    }));
  };

  const canProceed = () => {
    if (step === 0) return form.fullName && form.email && form.phone;
    if (step === 1) return form.eventType && form.eventDate && form.venueName;
    if (step === 2) return form.serviceId;
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await ordersAPI.createBooking({
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
        },
        eventType: form.eventType,
        eventDate: form.eventDate,
        startTime: form.startTime,
        duration: form.duration,
        venueName: form.venueName,
        venueAddress: form.venueAddress,
        guestCount: parseInt(form.guestCount, 10) || undefined,
        serviceId: form.serviceId,
        requestedFeatures: form.requestedFeatures,
        additionalNotes: form.additionalNotes,
      });
      window.location.href = `/booking/confirmation/${data.order.orderNumber}`;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const selectedService = services.find((s) => s._id === form.serviceId);
  const featureOptions = [
    'Custom photo strip template',
    'Premium prop collection',
    'Digital gallery extension',
    'Green screen backdrop',
    'Social media sharing station',
  ];

  return (
    <>
      <PageHero
        variant="booking"
        title={<>Book Your <span className="text-gradient-gold">Experience</span></>}
        subtitle="Tell us about your event and we will craft a Red Rose photo booth experience for you."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-3xl mx-auto min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div
                key={s}
                className={`text-center py-2 sm:py-2.5 px-1 text-xs sm:text-sm md:text-base font-bold rounded leading-tight ${
                  i <= step ? 'bg-antiqueGold text-charcoal' : 'bg-softBlush text-charcoal/50'
                }`}
              >
                {s}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white border border-antiqueGold/20 rounded-lg p-6 md:p-8"
            >
              {step === 0 && (
                <div className="space-y-4">
                  <h2 className="section-heading text-2xl mb-4">Contact Information</h2>
                  <div>
                    <label className="label-luxury" htmlFor="fullName">Full Name *</label>
                    <input id="fullName" required className="input-luxury" value={form.fullName}
                      onChange={(e) => update('fullName', e.target.value)} />
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="email">Email *</label>
                    <input id="email" type="email" required className="input-luxury" value={form.email}
                      onChange={(e) => update('email', e.target.value)} />
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="phone">Phone *</label>
                    <input id="phone" type="tel" required className="input-luxury" value={form.phone}
                      onChange={(e) => update('phone', e.target.value)} />
                  </div>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="section-heading text-2xl mb-4">Event Details</h2>
                  <div>
                    <label className="label-luxury" htmlFor="eventType">Event Type *</label>
                    <select id="eventType" required className="input-luxury" value={form.eventType}
                      onChange={(e) => update('eventType', e.target.value)}>
                      <option value="">Select event type</option>
                      {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-luxury" htmlFor="eventDate">Event Date *</label>
                      <input id="eventDate" type="date" required className="input-luxury" value={form.eventDate}
                        onChange={(e) => update('eventDate', e.target.value)} />
                    </div>
                    <div>
                      <label className="label-luxury" htmlFor="startTime">Start Time</label>
                      <input id="startTime" type="time" className="input-luxury" value={form.startTime}
                        onChange={(e) => update('startTime', e.target.value)} />
                    </div>
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="duration">Duration</label>
                    <select id="duration" className="input-luxury" value={form.duration}
                      onChange={(e) => update('duration', e.target.value)}>
                      <option value="">Select duration</option>
                      <option value="2 hours">2 hours</option>
                      <option value="3 hours">3 hours</option>
                      <option value="4 hours">4 hours</option>
                      <option value="5+ hours">5+ hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="venueName">Venue Name *</label>
                    <input id="venueName" required className="input-luxury" value={form.venueName}
                      onChange={(e) => update('venueName', e.target.value)} />
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="venueAddress">Venue Address</label>
                    <input id="venueAddress" className="input-luxury" value={form.venueAddress}
                      onChange={(e) => update('venueAddress', e.target.value)} />
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="guestCount">Estimated Guest Count</label>
                    <input id="guestCount" type="number" min="1" className="input-luxury" value={form.guestCount}
                      onChange={(e) => update('guestCount', e.target.value)} />
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="section-heading text-2xl mb-4">Service & Features</h2>
                  <div>
                    <label className="label-luxury" htmlFor="serviceId">Select Service *</label>
                    <select id="serviceId" required className="input-luxury" value={form.serviceId}
                      onChange={(e) => update('serviceId', e.target.value)}>
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s._id} value={s._id}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className="label-luxury">Requested Features</p>
                    <div className="space-y-2">
                      {featureOptions.map((f) => (
                        <label key={f} className="flex items-center gap-2 text-base font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.requestedFeatures.includes(f)}
                            onChange={() => toggleFeature(f)}
                            className="accent-antiqueGold"
                          />
                          {f}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="label-luxury" htmlFor="additionalNotes">Additional Notes</label>
                    <textarea id="additionalNotes" rows={4} className="input-luxury" value={form.additionalNotes}
                      onChange={(e) => update('additionalNotes', e.target.value)} />
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="section-heading text-2xl mb-4">Booking Summary</h2>
                  <div className="space-y-3 text-base font-medium">
                    <p><strong>Name:</strong> {form.fullName}</p>
                    <p><strong>Email:</strong> {form.email}</p>
                    <p><strong>Phone:</strong> {form.phone}</p>
                    <p><strong>Event:</strong> {form.eventType} on {form.eventDate}</p>
                    <p><strong>Venue:</strong> {form.venueName}</p>
                    <p><strong>Service:</strong> {selectedService?.title || 'N/A'}</p>
                    {form.requestedFeatures.length > 0 && (
                      <p><strong>Features:</strong> {form.requestedFeatures.join(', ')}</p>
                    )}
                  </div>
                  <p className="mt-6 text-body-muted border-t border-antiqueGold/20 pt-4">
                    By submitting, you acknowledge that your booking date is <strong>pending confirmation</strong>
                    from Red Rose Photo Booth. We will contact you within 24–48 hours.
                  </p>
                </div>
              )}

              {error && <p className="text-velvetRed text-base font-semibold mt-4">{error}</p>}
            </motion.div>
          </AnimatePresence>

          <div className="flex flex-wrap justify-between gap-3 mt-6">
            {step > 0 ? (
              <button onClick={() => setStep(step - 1)} className="btn-secondary">Back</button>
            ) : (
              <div />
            )}
            {step < STEPS.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-50"
              >
                Continue
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="btn-primary disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Booking Request'}
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
