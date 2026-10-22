import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { usePageMeta } from '../hooks/usePageMeta';
import PageHero from '../components/ui/PageHero';
import BookingLink from '../components/ui/BookingLink';
import { ABOUT_PAGE, OUR_STORY } from '../data/homeContent';
import OurStoryContent from '../components/ui/StoryRichText';

export default function AboutPage() {
  usePageMeta({
    title: 'About',
    description:
      'The story behind Red Rose Photo Booth — one red rose, Kristina, and a passion for capturing unforgettable celebrations.',
  });

  return (
    <>
      <PageHero
        variant="about"
        title={
          <>
            Our <span className="text-gradient-gold">Story</span>
          </>
        }
        subtitle="One red rose became a tradition — and the heart of Red Rose Photo Booth."
      />

      <section className="section-padding bg-warmIvory">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-antiqueGold mb-8">
              {ABOUT_PAGE.title}
            </h2>
            <OurStoryContent blocks={OUR_STORY.blocks} />

            <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-antiqueGold/20">
              <BookingLink className="btn-primary">Check Availability & Book</BookingLink>
              <Link to="/contact#inquiry-form" className="btn-secondary">
                Schedule a Consultation
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
