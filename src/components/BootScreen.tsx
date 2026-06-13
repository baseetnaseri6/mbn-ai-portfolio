"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const lines = [
  "Initializing MBN_OS...",
  "Connecting Neural Engine...",
  "Analyzing Visitor...",
  "Access Granted.",
];

export default function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      onComplete();
    }, 4200);

    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-green-400"
        >
          <div className="w-[90%] max-w-2xl font-mono">
            {lines.map((line, index) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.8 }}
                className="mb-5 text-lg md:text-2xl"
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
