"use client";

import { useState } from "react";
import BootScreen from "./BootScreen";
import AICore from "./AICore";

export default function OperatingSystem() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      {!booted && <BootScreen onComplete={() => setBooted(true)} />}
      {booted && <AICore />}
    </>
  );
}
