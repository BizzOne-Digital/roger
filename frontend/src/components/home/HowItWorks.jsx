import { motion } from 'framer-motion';
import { SectionHeader } from '../ui/SectionTypography';

const steps = [
  { num: '01', title: 'Choose Your Event', desc: 'Tell us about your celebration—wedding, corporate gala, birthday, or private party.' },
  { num: '02', title: 'Customize Your Experience', desc: 'Select templates, props, and features tailored to your event theme.' },
  { num: '03', title: 'Strike a Pose', desc: 'Our attendant guides guests through an effortless, fun photo booth experience.' },
  { num: '04', title: 'Share and Celebrate', desc: 'Instant prints and digital sharing keep the memories alive long after the event.' },
];

const cardMotion = {
  hidden: { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HowItWorks() {
  return (
    <section className="section-padding bg-charcoal text-warmIvory">
      <div className="max-w-7xl mx-auto">
        <SectionHeader light eyebrow="The Process" title="How It Works" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardMotion}
              className="step-card group p-6 border border-antiqueGold/20 rounded-lg bg-roseNoir/40 hover:border-antiqueGold/50 transition-colors duration-500 hover:-translate-y-2 h-full flex flex-col"
            >
              <span className="font-display text-4xl md:text-5xl font-semibold text-antiqueGold/50 group-hover:text-antiqueGold transition-colors shrink-0">
                {step.num}
              </span>
              <h3 className="font-display text-xl md:text-2xl font-semibold mt-4 mb-3 text-champagneGold shrink-0">{step.title}</h3>
              <p className="text-body-muted-light text-base flex-1">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
