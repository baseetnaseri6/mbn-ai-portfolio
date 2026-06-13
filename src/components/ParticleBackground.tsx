"use client";

import { motion } from "framer-motion";

const particles = Array.from({ length: 36 }, (_, i) => ({
  left: `${(i * 37) % 100}%`,
  top: `${(i * 53) % 100}%`,
  duration: 3 + (i % 5),
  delay: (i % 6) * 0.25,
}));

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, index) => (
        <motion.span
          key={index}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/70"
          style={{
            left: p.left,
            top: p.top,
          }}
          animate={{
            y: [0, -35, 0],
            opacity: [0.2, 1, 0.2],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}
