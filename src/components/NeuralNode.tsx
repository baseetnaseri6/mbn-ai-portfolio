"use client";

import { motion } from "framer-motion";

export default function NeuralNode({
  label,
  className,
}: {
  label: string;
  className: string;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -10, 0],
      }}
      transition={{
        opacity: { duration: 0.8 },
        scale: { duration: 0.8 },
        y: { duration: 4, repeat: Infinity },
      }}
      whileHover={{ scale: 1.15 }}
      className={`absolute ${className} rounded-full border border-cyan-400/40 bg-cyan-400/10 px-5 py-3 font-mono text-xs text-cyan-200 shadow-[0_0_35px_rgba(34,211,238,.35)] backdrop-blur-xl`}
    >
      {label}
    </motion.button>
  );
}
