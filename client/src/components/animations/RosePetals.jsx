import { motion } from 'framer-motion';

const petals = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 2,
  duration: 6 + Math.random() * 4,
  size: 4 + Math.random() * 8,
}));

export default function RosePetals({ count = 8, className = '' }) {
  const items = petals.slice(0, count);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {items.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-velvetRed/30"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: ['-10%', '110%'],
            x: [0, Math.random() * 40 - 20],
            rotate: [0, 360],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}
