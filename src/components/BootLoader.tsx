"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "Initializing MBN OS...",
  "Loading Network Skills...",
  "Loading Azure Cloud...",
  "Loading AI Projects...",
  "Access Granted...",
];

export default function BootLoader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
        >
          <div className="w-[90%] max-w-xl rounded-2xl border border-cyan-500/30 bg-cyan-500/5 p-6 font-mono shadow-[0_0_80px_rgba(34,211,238,0.15)]">
            <div className="mb-5 flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-red-500" />
              <span className="h-3 w-3 rounded-full bg-yellow-500" />
              <span className="h-3 w-3 rounded-full bg-green-500" />
              <span className="ml-3 text-xs text-gray-400">terminal.mbn</span>
            </div>

            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.45 }}
                className="mb-3 text-sm text-green-400"
              >
                &gt; {line}
              </motion.p>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
