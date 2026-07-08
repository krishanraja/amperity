"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/content/nav";
import { Icon } from "@/components/icons";
import { Button } from "@/components/ui/Button";
import { easingArray } from "@/styles/tokens";

/** Routes whose hero is a dark section: header starts transparent-light. */
const DARK_HERO_ROUTES = new Set(["/"]);

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change; scroll restoration stays instant.
  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [pathname]);

  // Escape closes any open surface
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const overDark = DARK_HERO_ROUTES.has(pathname) && !scrolled && !openMenu && !mobileOpen;
  const solid = !overDark;

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-40 px-safe transition-colors duration-ui ease-out-quad ${
        solid ? "border-b border-gray-200 bg-white" : "border-b border-transparent"
      }`}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-site items-center justify-between gap-6 px-gutter lg:px-gutter-lg">
        <Link href="/" aria-label="Amperity home" className="shrink-0">
          <Image
            src={solid ? "/brand/amperity-logo-black.svg" : "/brand/amperity-logo.svg"}
            alt="Amperity"
            width={128}
            height={32}
            priority
            className="h-6 w-auto lg:h-8"
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.label}>
                {item.columns ? (
                  <button
                    type="button"
                    aria-expanded={openMenu === item.label}
                    aria-controls={`menu-${item.label}`}
                    onMouseEnter={() => setOpenMenu(item.label)}
                    onClick={() =>
                      setOpenMenu(openMenu === item.label ? null : item.label)
                    }
                    className={`group relative flex min-h-12 items-center gap-1 text-body-sm font-medium ${
                      solid ? "text-gray-700 hover:text-black" : "text-gray-100 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      size={14}
                      className={`transition-transform duration-ui ease-in-out-quart ${
                        openMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                    <NavUnderline active={openMenu === item.label} />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onMouseEnter={() => setOpenMenu(null)}
                    className={`group relative flex min-h-12 items-center text-body-sm font-medium ${
                      solid ? "text-gray-700 hover:text-black" : "text-gray-100 hover:text-white"
                    }`}
                  >
                    {item.label}
                    <NavUnderline active={pathname === item.href} />
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href="https://login.amperity.com/"
            target="_blank"
            rel="noreferrer noopener"
            className={`text-body-sm font-medium ${
              solid ? "text-gray-700 hover:text-black" : "text-gray-100 hover:text-white"
            }`}
          >
            Login
          </a>
          <Button href="/resources/demo/request" magnetic className="min-h-10 px-6 text-body-sm">
            Request a demo
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className={`flex h-12 w-12 items-center justify-center lg:hidden ${
            solid ? "text-gray-900" : "text-white"
          }`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          <Icon name={mobileOpen ? "close" : "menu"} size={22} />
        </button>
      </div>

      {/* Mega menu panel */}
      <AnimatePresence>
        {openMenu && (
          <MegaPanel
            key={openMenu}
            label={openMenu}
            onClose={() => setOpenMenu(null)}
          />
        )}
      </AnimatePresence>

      {/* Mobile full-screen sheet */}
      <AnimatePresence>{mobileOpen && <MobileSheet onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </header>
  );
}

function NavUnderline({ active }: { active: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute inset-x-0 bottom-2 block origin-left bg-chartreuse transition-transform duration-ui ease-out-quad ${
        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
      }`}
      style={{ height: "1.5px" }}
    />
  );
}

function MegaPanel({ label, onClose }: { label: string; onClose: () => void }) {
  const item = nav.find((n) => n.label === label);
  if (!item?.columns) return null;
  return (
    <motion.div
      id={`menu-${label}`}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.3, ease: easingArray.inOutQuart }}
      className="absolute inset-x-0 top-16 hidden border-b border-gray-200 bg-white shadow-card lg:block"
    >
      <div className="mx-auto grid max-w-site grid-cols-3 gap-12 px-gutter-lg py-12">
        {item.columns.map((col) => (
          <div key={col.heading}>
            <p className="font-mono text-eyebrow uppercase text-gray-500">{col.heading}</p>
            <ul className="mt-6 space-y-2">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="group block rounded-card px-2 py-2 transition-colors duration-micro ease-out-quad hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2 text-body font-medium text-gray-900">
                      {link.label}
                      <Icon
                        name="arrow-right"
                        size={14}
                        className="opacity-0 transition-all duration-micro ease-out-quad group-hover:translate-x-1 group-hover:opacity-100"
                      />
                    </span>
                    {link.note && (
                      <span className="text-body-sm text-gray-500">{link.note}</span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function MobileSheet({ onClose }: { onClose: () => void }) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const touchStartY = useRef<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>("Platform");

  // Body scroll lock while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Simple focus trap
  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;
    const focusables = () =>
      sheet.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const list = [...focusables()];
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    sheet.addEventListener("keydown", onKey);
    return () => sheet.removeEventListener("keydown", onKey);
  }, []);

  const listVariants = {
    open: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
  };
  const itemVariants = {
    closed: { opacity: 0, y: 16 },
    open: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easingArray.outExpo } },
  };

  return (
    <motion.div
      ref={sheetRef}
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: easingArray.inOutQuart }}
      className="fixed inset-0 top-16 z-40 overflow-y-auto bg-gray-900 pb-safe text-white lg:hidden"
      onTouchStart={(e) => {
        touchStartY.current = e.touches[0].clientY;
      }}
      onTouchMove={(e) => {
        const el = e.currentTarget;
        if (
          touchStartY.current !== null &&
          el.scrollTop <= 0 &&
          e.touches[0].clientY - touchStartY.current > 80
        ) {
          onClose();
          touchStartY.current = null;
        }
      }}
    >
      <motion.nav
        aria-label="Mobile"
        initial="closed"
        animate="open"
        variants={listVariants}
        className="px-gutter py-8"
      >
        <ul className="space-y-2">
          {nav.map((item) => (
            <motion.li key={item.label} variants={itemVariants} className="border-b border-gray-800">
              {item.columns ? (
                <div>
                  <button
                    type="button"
                    aria-expanded={expanded === item.label}
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    className="flex min-h-14 w-full items-center justify-between font-display text-h4 font-medium"
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      size={20}
                      className={`transition-transform duration-ui ease-in-out-quart ${
                        expanded === item.label ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {expanded === item.label && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: easingArray.inOutQuart }}
                        className="overflow-hidden"
                      >
                        <div className="grid gap-8 pb-6 pt-2 sm:grid-cols-2">
                          {item.columns.map((col) => (
                            <div key={col.heading}>
                              <p className="font-mono text-eyebrow uppercase text-gray-500">
                                {col.heading}
                              </p>
                              <ul className="mt-4 space-y-1">
                                {col.links.map((link) => (
                                  <li key={link.label}>
                                    <Link
                                      href={link.href}
                                      onClick={onClose}
                                      className="block min-h-11 py-2 text-body text-gray-200 hover:text-white"
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="flex min-h-14 items-center font-display text-h4 font-medium"
                >
                  {item.label}
                </Link>
              )}
            </motion.li>
          ))}
        </ul>
        <motion.div variants={itemVariants} className="mt-8 flex flex-col gap-4">
          <Button href="/resources/demo/request" className="w-full">
            Request a demo
          </Button>
          <a
            href="https://login.amperity.com/"
            target="_blank"
            rel="noreferrer noopener"
            className="flex min-h-11 items-center justify-center text-body text-gray-200"
          >
            Login
          </a>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}
