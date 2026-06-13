"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const links = ["Home", "About", "Skills", "Projects", "Experience", "Contact"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden"
        >
          <div className="flex min-h-screen flex-col justify-center px-10">
            <p className="mb-8 font-mono text-sm text-green-400">
              MOBILE CONTROL PANEL
            </p>

            <div className="flex flex-col gap-7">
              {links.map((link, index) => (
                <motion.a
                  key={link}
                  href="#"
                  onClick={onClose}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="border-b border-cyan-500/20 pb-4 text-3xl font-bold text-white"
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
