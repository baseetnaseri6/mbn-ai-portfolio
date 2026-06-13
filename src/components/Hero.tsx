"use client";

import { motion } from "framer-motion";
import HologramGlobe from "./HologramGlobe";

const skills = [
  ["Cisco Networking", "90%"],
  ["Microsoft Azure", "80%"],
  ["AI / Machine Learning", "75%"],
  ["TypeScript", "85%"],
];

const stats = [
  ["3+", "Years Experience"],
  ["20+", "Projects Completed"],
  ["10+", "Certifications"],
  ["100%", "Commitment"],
];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#020617] px-5 pb-8 pt-28 text-white">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,180,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(0,180,255,.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,140,255,.22),transparent_35%),radial-gradient(circle_at_80%_45%,rgba(147,51,234,.22),transparent_35%),#020617]" />

      <div className="relative z-10 mx-auto max-w-7xl rounded-3xl border border-cyan-500/25 bg-black/45 p-6 shadow-[0_0_120px_rgba(0,180,255,.22)] backdrop-blur-xl">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.15fr_.75fr]">
          <div>
            <div className="mb-8 font-mono text-xs leading-6 text-green-400">
              &gt; INITIALIZING PORTFOLIO...<br />
              &gt; LOADING RESOURCES...<br />
              &gt; CHECKING SYSTEMS...<br />
              &gt; ACCESS GRANTED ✓
            </div>

            <p className="text-cyan-300">Hi, I&apos;m</p>

            <motion.h1
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 text-5xl font-black leading-tight md:text-6xl"
            >
              Mohamad Basit{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Naseri
              </span>
            </motion.h1>

            <div className="mt-6 w-fit rounded-lg border border-purple-500/60 bg-black/60 px-5 py-3 font-mono text-xs text-gray-300">
              NETWORK ENGINEER | AI ENTHUSIAST | TYPESCRIPT DEVELOPER
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-300">
              I build secure, scalable and intelligent solutions that connect
              networks, people and ideas.
            </p>

            <div className="mt-8 flex gap-4">
              <button className="rounded-xl bg-blue-600 px-7 py-4 text-sm font-bold shadow-[0_0_35px_rgba(37,99,235,.85)]">
                Explore Projects →
              </button>
              <button className="rounded-xl border border-purple-500/60 bg-black/50 px-7 py-4 text-sm font-bold">
                Contact Me ↗
              </button>
            </div>

            <p className="mt-10 font-mono text-sm text-cyan-300">TECH STACK</p>
            <div className="mt-4 flex gap-3">
              {["TS", "JS", "AI", "N", "☁", "..."].map((t) => (
                <div key={t} className="flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-500/30 bg-cyan-500/10 font-bold text-cyan-300">
                  {t}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <HologramGlobe />
          </div>

          <div className="grid gap-5">
            <div className="rounded-2xl border border-cyan-500/25 bg-black/60 p-6 backdrop-blur-xl">
              <p className="mb-5 font-mono text-sm text-cyan-300">CORE EXPERTISE</p>
              <div className="relative mx-auto h-52 w-52">
                <div className="absolute inset-0 rounded-full border border-purple-500/40 bg-purple-500/10" />
                <div className="absolute inset-8 rotate-45 border border-cyan-400/40 bg-cyan-400/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-sm text-gray-300">
                  <span>Networking</span>
                  <span>AI / ML</span>
                  <span>Cloud</span>
                  <span>Security</span>
                  <span>DevOps</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-cyan-500/25 bg-black/60 p-6 backdrop-blur-xl">
              <p className="font-mono text-sm text-green-400">SYSTEM STATUS ●</p>
              <p className="mt-4 text-sm text-gray-400">Everything is running perfectly.</p>
              <p className="mt-2 font-mono text-sm text-green-400">Let&apos;s build the future together.</p>
              <div className="mt-4 h-1 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-2xl border border-cyan-500/25 bg-black/60 p-5">
            <p className="mb-4 font-mono text-sm text-cyan-300">SKILLS LOADING...</p>
            {skills.map(([name, value]) => (
              <div key={name} className="mb-4">
                <div className="mb-1 flex justify-between text-xs text-gray-300">
                  <span>{name}</span><span>{value}</span>
                </div>
                <div className="h-2 rounded-full bg-gray-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_18px_rgba(34,211,238,.9)]" style={{ width: value }} />
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map(([num, label]) => (
              <div key={label} className="rounded-2xl border border-cyan-500/20 bg-black/60 p-5 text-center">
                <h3 className="text-3xl font-black text-cyan-300">{num}</h3>
                <p className="text-xs text-gray-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
