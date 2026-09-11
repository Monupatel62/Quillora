"use client";

import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function onScroll() {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      setProgress(Math.min((scrollTop / docHeight) * 100, 100));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-16 left-0 right-0 z-40 h-0.5"
    >
      <div
        className="h-full bg-gradient-to-r from-[var(--accent)] to-cyan-400 rounded-r-full transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
