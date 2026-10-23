import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';
import { CUSTOM_PRINTS } from '../../data/homeContent';
import { StoryRichText } from '../ui/StoryRichText';

export default function CustomPrintsSection({ className = '' }) {
  return (
    <section className={`section-padding bg-warmIvory border-t border-antiqueGold/15 ${className}`}>
      <div className="max-w-3xl mx-auto text-center">
        <SectionHeader title={CUSTOM_PRINTS.title} className="mb-6" />
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-body-muted text-base md:text-lg leading-relaxed font-medium"
        >
          <StoryRichText text={CUSTOM_PRINTS.body} />
        </motion.p>
      </div>
    </section>
  );
}
