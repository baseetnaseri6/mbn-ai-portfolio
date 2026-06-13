"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav className="mx-auto max-w-7xl px-6">
          <div className="mt-5 flex h-16 items-center justify-between rounded-2xl border border-cyan-500/20 bg-black/40 px-6 backdrop-blur-xl">
            <div className="text-xl font-bold tracking-wider">
              <span className="text-cyan-400">MBN</span>
              <span className="text-white">.DEV</span>
            </div>

            <div className="hidden items-center gap-8 text-sm text-gray-300 md:flex">
              <a href="#" className="transition hover:text-cyan-400">Home</a>
              <a href="#" className="transition hover:text-cyan-400">About</a>
              <a href="#" className="transition hover:text-cyan-400">Skills</a>
              <a href="#" className="transition hover:text-cyan-400">Projects</a>
              <a href="#" className="transition hover:text-cyan-400">Contact</a>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="relative z-50 text-cyan-400 md:hidden"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
