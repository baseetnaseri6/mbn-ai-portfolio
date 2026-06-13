"use client";

import { motion } from "framer-motion";
import NeuralNode from "./NeuralNode";

export default function AICore() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020617] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,217,255,.22),transparent_35%),radial-gradient(circle_at_70%_40%,rgba(139,92,246,.25),transparent_35%),#020617]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />

      <div className="absolute left-6 top-6 z-20 font-mono text-xs text-cyan-300 md:text-sm">
        MBN_SYSTEM v2035
      </div>

      <div className="absolute right-6 top-6 z-20 font-mono text-xs text-green-400 md:text-sm">
        STATUS: ONLINE ●
      </div>

      <div className="relative z-10 h-[620px] w-[620px] max-w-[95vw]">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[520px] max-w-[85vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] max-w-[70vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-400/20" />
        <div className="absolute left-1/2 top-1/2 h-[260px] w-[260px] max-w-[55vw] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/30" />

        <NeuralNode label="AI LAB" className="left-1/2 top-6 -translate-x-1/2" />
        <NeuralNode label="EXPERIENCE" className="left-2 top-1/3" />
        <NeuralNode label="PROJECTS" className="right-2 top-1/3" />
        <NeuralNode label="CERTIFICATIONS" className="bottom-24 left-8" />
        <NeuralNode label="CONTACT" className="bottom-24 right-8" />

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{
            scale: [1, 1.04, 1],
            opacity: 1,
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity },
            opacity: { duration: 1 },
          }}
          className="absolute left-1/2 top-1/2 flex h-56 w-56 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-400/10 shadow-[0_0_120px_rgba(34,211,238,.65)] backdrop-blur-xl"
        >
          <div className="absolute inset-4 animate-spin rounded-full border border-dashed border-cyan-300/60" />
          <div className="absolute inset-10 rounded-full border border-purple-400/50" />

          <div className="text-center">
            <p className="font-mono text-xs text-cyan-300">AI CORE ACTIVE</p>
            <h1 className="mt-2 text-5xl font-black tracking-widest">MBN</h1>
            <p className="mt-2 text-xs text-gray-300">2035 INTERFACE</p>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 w-[90%] max-w-xl -translate-x-1/2 rounded-2xl border border-cyan-400/20 bg-black/40 p-4 text-center font-mono text-xs text-cyan-200 backdrop-blur-xl md:text-sm">
        Ask the system what you want to explore.
      </div>
    </section>
  );
}
