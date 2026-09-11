import { useState } from 'react';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import { contactAPI } from '../api/client';
import { BUSINESS, EVENT_TYPES } from '../utils/constants';
import PageHero from '../components/ui/PageHero';
import { PhoneIcon, EmailIcon } from '../components/icons/Icons';
import { RED_ROSE_BIO } from '../data/homeContent';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact',
    description: `Contact Red Rose Photo Booth LLC. Call ${BUSINESS.phone} or email ${BUSINESS.email} for pricing and consultation.`,
  });

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await contactAPI.submit(form);
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', eventType: '', eventDate: '', message: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHero
        variant="contact"
        title={<>Get in <span className="text-gradient-gold">Touch</span></>}
        subtitle="Call, email, or send a message — Roger and the Red Rose team are here to help."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="section-heading text-2xl md:text-3xl mb-6">Contact Information</h2>

            <div className="space-y-6 mb-8">
              <a href={`tel:${BUSINESS.phoneRaw}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-antiqueGold/30 flex items-center justify-center text-antiqueGold group-hover:bg-antiqueGold/10">
                  <PhoneIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal/70">Phone</p>
                  <p className="font-bold text-lg group-hover:text-antiqueGold transition-colors">{BUSINESS.phone}</p>
                </div>
              </a>

              <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full border border-antiqueGold/30 flex items-center justify-center text-antiqueGold group-hover:bg-antiqueGold/10">
                  <EmailIcon />
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal/70">Email</p>
                  <p className="font-bold text-lg group-hover:text-antiqueGold transition-colors">{BUSINESS.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full border border-antiqueGold/30 flex items-center justify-center text-antiqueGold text-lg font-bold">
                  ✦
                </div>
                <div>
                  <p className="text-sm font-semibold text-charcoal/70">Service Area</p>
                  <p className="font-bold text-lg">{BUSINESS.serviceArea}</p>
                </div>
              </div>
            </div>

            <div className="card-luxury p-6 mb-8">
              <h3 className="font-display text-xl font-semibold mb-2">{BUSINESS.owner}</h3>
              <p className="text-body-muted">Owner & Operator</p>
              <p className="text-body-muted mt-4">
                Hours: Monday–Saturday 9:00 AM – 6:00 PM
              </p>
            </div>

            <div className="card-luxury p-6 md:p-8">
              <h3 className="font-display text-xl md:text-2xl font-semibold text-antiqueGold mb-4">
                {RED_ROSE_BIO.title}
              </h3>
              {RED_ROSE_BIO.paragraphs.map((paragraph, i) => (
                <p key={i} className="text-body-muted text-base leading-relaxed mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-antiqueGold/20 rounded-lg p-6 md:p-8"
          >
            <h2 className="section-heading text-2xl md:text-3xl mb-6">Send a Message</h2>

            {success ? (
              <div className="text-center py-12">
                <p className="text-antiqueGold font-bold text-xl mb-2">Message Sent!</p>
                <p className="text-body-muted">We&apos;ll get back to you within 24–48 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label-luxury" htmlFor="name">Name *</label>
                  <input id="name" required className="input-luxury" value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label className="label-luxury" htmlFor="email">Email *</label>
                  <input id="email" type="email" required className="input-luxury" value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="label-luxury" htmlFor="phone">Phone</label>
                  <input id="phone" type="tel" className="input-luxury" value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label className="label-luxury" htmlFor="eventType">Event Type</label>
                  <select id="eventType" className="input-luxury" value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}>
                    <option value="">Select</option>
                    {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-luxury" htmlFor="eventDate">Preferred Event Date</label>
                  <input id="eventDate" type="date" className="input-luxury" value={form.eventDate}
                    onChange={(e) => setForm({ ...form, eventDate: e.target.value })} />
                </div>
                <div>
                  <label className="label-luxury" htmlFor="message">Message *</label>
                  <textarea id="message" required rows={4} className="input-luxury" value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                {error && <p className="text-velvetRed text-base font-semibold">{error}</p>}
                <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
