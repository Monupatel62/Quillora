"use client";

import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    /* In production: call your email API here */
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  }

  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-[var(--surface)] border border-[var(--border)] p-10 md:p-16 text-center"
      aria-labelledby="newsletter-heading"
    >
      {/* Background orb */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[var(--accent)] animate-orb pointer-events-none"
        style={{ filter: "blur(100px)", opacity: 0.12 }}
        aria-hidden
      />

      <p className="text-xs font-bold uppercase tracking-widest text-[var(--accent2)] mb-3">
        ✦ Stay Updated
      </p>
      <h2
        id="newsletter-heading"
        className="font-serif font-bold text-3xl md:text-4xl text-[var(--text)] mb-4"
      >
        Never miss a post.
      </h2>
      <p className="text-[var(--text2)] mb-8 max-w-md mx-auto">
        Get the best articles delivered straight to your inbox, every week.
        No spam — just ideas.
      </p>

      {status === "success" ? (
        <div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-sm"
          role="status"
          aria-live="polite"
        >
          ✓ You&apos;re subscribed!
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          noValidate
        >
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            autoComplete="email"
            className="
              flex-1 px-5 py-3 rounded-full
              bg-[var(--bg2)] border border-[var(--border)]
              text-[var(--text)] placeholder:text-[var(--text3)]
              text-sm outline-none
              focus:border-[var(--accent)] transition-colors duration-200
            "
          />
          <button
            type="submit"
            className="
              px-6 py-3 rounded-full text-sm font-semibold text-white shrink-0
              bg-gradient-to-r from-[var(--accent)] to-[var(--accent2)]
              shadow-[0_4px_14px_var(--glow)]
              hover:shadow-[0_6px_20px_var(--glow)] hover:-translate-y-0.5
              transition-all duration-200
            "
          >
            Subscribe →
          </button>
        </form>
      )}

      <p className="text-xs text-[var(--text3)] mt-4">
        Unsubscribe anytime. No spam, ever.
      </p>
    </section>
  );
}
