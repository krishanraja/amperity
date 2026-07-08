"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { footerColumns } from "@/content/nav";

const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/amperity" },
  { label: "X", href: "https://x.com/amperity" },
  { label: "YouTube", href: "https://www.youtube.com/c/amperity" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Enter a valid work email.";

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-gray-300">
      <div className="relative z-10 mx-auto max-w-site px-gutter py-20 lg:px-gutter-lg">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Image
              src="/brand/amperity-logo.svg"
              alt="Amperity"
              width={128}
              height={32}
              className="h-8 w-auto"
            />
            <p className="mt-6 max-w-measure text-body-sm text-gray-400">
              The customer context platform. Identity-resolved profiles, live
              signals, governed access for every team and every AI agent.
            </p>
            <form
              className="mt-8"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const err = validate(email);
                setError(err);
                if (!err) setSubscribed(true);
              }}
            >
              <label htmlFor="footer-email" className="font-mono text-eyebrow uppercase text-gray-400">
                Newsletter
              </label>
              {subscribed ? (
                <p className="mt-4 text-body-sm text-chartreuse">
                  Subscribed. Watch your inbox.
                </p>
              ) : (
                <>
                  <div className="mt-4 flex gap-2">
                    <input
                      id="footer-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      onBlur={() => email && setError(validate(email))}
                      placeholder="you@company.com"
                      className="min-h-12 w-full rounded-card border border-gray-700 bg-transparent px-4 text-body-sm text-white placeholder:text-gray-500 focus:border-chartreuse focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="min-h-12 shrink-0 rounded-pill bg-white px-6 text-body-sm font-medium text-black transition duration-micro ease-out-quad hover:bg-chartreuse active:scale-98"
                    >
                      Subscribe
                    </button>
                  </div>
                  {error && <p className="mt-2 text-body-sm text-white">{error}</p>}
                </>
              )}
            </form>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.heading} aria-label={col.heading}>
              <p className="font-mono text-eyebrow uppercase text-gray-400">{col.heading}</p>
              <ul className="mt-6 space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="flex min-h-11 items-center text-body-sm text-gray-300 transition-colors duration-micro ease-out-quad hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-gray-800 pt-8 md:flex-row md:items-center">
          <p className="text-body-sm text-gray-400">
            &copy; {new Date().getFullYear()} Amperity, Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex min-h-11 min-w-11 items-center justify-center text-body-sm text-gray-400 hover:text-white"
              >
                {s.label}
              </a>
            ))}
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center text-body-sm text-gray-400 hover:text-white"
            >
              Privacy
            </Link>
            <Link
              href="/about"
              className="inline-flex min-h-11 items-center text-body-sm text-gray-400 hover:text-white"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* The mark, as itself: one oversized instance cropped at the bottom edge */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end overflow-hidden"
        aria-hidden="true"
      >
        <Image
          src="/brand/ampersand.svg"
          alt=""
          width={254}
          height={317}
          className="translate-y-1/3 opacity-10"
          style={{ width: "min(38vw, 480px)", height: "auto", color: "white", filter: "invert(1)" }}
        />
      </div>
    </footer>
  );
}
