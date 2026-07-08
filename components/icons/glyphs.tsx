import type { ReactNode } from "react";

/**
 * The Amperity icon language: one original set drawn on a 24px grid,
 * 1.75px stroke, rounded caps, consistent corner radius. Every icon
 * incorporates one filled node-dot from the ampersand's language where
 * natural: dots are records, resolved things are filled.
 *
 * Strokes inherit from the Icon wrapper; filled node dots set their own
 * fill and carry data-node so the accent color can target them.
 */

const dot = (cx: number, cy: number, r = 1.6): ReactNode => (
  <circle cx={cx} cy={cy} r={r} fill="currentColor" stroke="none" data-node="" />
);

export const glyphs = {
  /* Capabilities */
  identity: (
    <>
      <circle cx="9.25" cy="12" r="5.25" />
      <circle cx="14.75" cy="12" r="5.25" />
      {dot(12, 12)}
    </>
  ),
  profile: (
    <>
      <circle cx="12" cy="8.5" r="3.5" />
      <path d="M5.5 19.5c0-3.6 2.9-6.5 6.5-6.5s6.5 2.9 6.5 6.5" />
      {dot(12, 8.5, 1.4)}
    </>
  ),
  realtime: (
    <>
      <path d="M3.5 12h4.5l2.5-5 3 10 2.5-5h4.5" />
      {dot(16, 12, 1.5)}
    </>
  ),
  prediction: (
    <>
      <path d="M4 17.5l6-6.5 3.5 3.5 6.5-7.5" />
      {dot(20, 7, 1.6)}
    </>
  ),
  assistant: (
    <>
      <path d="M6.5 5h11a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3h-5L8 20.2V16h-1.5a3 3 0 0 1-3-3V8a3 3 0 0 1 3-3z" />
      {dot(12, 10.5, 1.5)}
    </>
  ),
  journey: (
    <>
      <path d="M6.4 16.9L10.3 13.5" />
      <path d="M14 11.4l3.6-3.1" />
      <path d="M13.9 13.2l3.7 3.2" />
      {dot(5, 18.1, 1.9)}
      <circle cx="12.1" cy="12.4" r="2.4" />
      {dot(19, 7.1, 1.9)}
      <circle cx="19" cy="17.6" r="1.7" />
    </>
  ),
  activation: (
    <>
      {dot(6.5, 12, 1.8)}
      <path d="M11.5 7.5a6.4 6.4 0 0 1 0 9" />
      <path d="M15.5 4.5a11 11 0 0 1 0 15" />
    </>
  ),
  audience: (
    <>
      <circle cx="6.5" cy="9.5" r="2.6" />
      <circle cx="17.5" cy="9.5" r="2.6" />
      {dot(12, 8.25, 2.1)}
      <path d="M3.5 19.5c1.7-3.9 4.8-5.7 8.5-5.7s6.8 1.8 8.5 5.7" />
    </>
  ),
  governance: (
    <>
      <path d="M12 3.25L19 6v6c0 4.5-3 7.6-7 9.25C8 19.6 5 16.5 5 12V6l7-2.75z" />
      {dot(12, 11, 1.75)}
    </>
  ),
  pipeline: (
    <>
      <path d="M3.5 6.5h4c4 0 4 5.5 8 5.5" />
      <path d="M3.5 12h12" />
      <path d="M3.5 17.5h4c4 0 4-5.5 8-5.5h3" />
      {dot(19.75, 12, 1.75)}
    </>
  ),
  bridge: (
    <>
      <rect x="3.25" y="8.5" width="5.5" height="7" rx="1.5" />
      <rect x="15.25" y="8.5" width="5.5" height="7" rx="1.5" />
      <path d="M8.75 12h6.5" />
      {dot(12, 12, 1.5)}
    </>
  ),
  agent: (
    <>
      <rect x="3.25" y="4.75" width="17.5" height="14.5" rx="2" />
      <path d="M7 9.5l3 2.75L7 15" />
      {dot(13.75, 15, 1.5)}
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.75" rx="7" ry="2.5" />
      <path d="M5 5.75V18.25c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V5.75" />
      <path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5" />
      {dot(12, 17.5, 1.4)}
    </>
  ),
  lakehouse: (
    <>
      <path d="M5.75 10.75L12 5l6.25 5.75v6.5H5.75v-6.5z" />
      <path d="M3 20.75c1.5-1.4 3-1.4 4.5 0s3 1.4 4.5 0 3-1.4 4.5 0 3 1.4 4.5 0" />
      {dot(12, 13.25, 1.6)}
    </>
  ),
  api: (
    <>
      <path d="M8.5 7L4 12l4.5 5" />
      <path d="M15.5 7L20 12l-4.5 5" />
      {dot(12, 12, 1.6)}
    </>
  ),
  monetization: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M14.9 9.4c-.6-1-1.7-1.6-2.9-1.6-1.8 0-3 .9-3 2.2 0 3 6 1.7 6 4.6 0 1.3-1.2 2.2-3 2.2-1.3 0-2.4-.6-3-1.6" />
      <path d="M12 6.25v11.5" />
    </>
  ),
  personalization: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.25" />
      {dot(12, 12, 1.6)}
    </>
  ),
  paidmedia: (
    <>
      <path d="M4.25 10v4.5h2.75l5 4V6l-5 4H4.25z" />
      <path d="M15.5 9.25a5.4 5.4 0 0 1 0 5.5" />
      {dot(19.5, 12, 1.5)}
    </>
  ),
  insight: (
    <>
      <path d="M3.75 20.25h16.5" />
      <path d="M6.5 20.25V13" />
      <path d="M12 20.25V8.5" />
      <path d="M17.5 20.25V15.5" />
      {dot(12, 5.5, 1.6)}
    </>
  ),
  segment: (
    <>
      <path d="M12 3.75A8.25 8.25 0 1 1 3.75 12H12V3.75z" />
      {dot(6.75, 6.75, 1.9)}
    </>
  ),
  /* Industries */
  retail: (
    <>
      <path d="M5.5 8.5h13l-.95 10.4a2 2 0 0 1-2 1.85h-7.1a2 2 0 0 1-2-1.85L5.5 8.5z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
      {dot(12, 14.75, 1.6)}
    </>
  ),
  travel: (
    <>
      <path d="M3.5 11L20.5 4.5 14 20.5l-3-7-7.5-2.5z" />
      <path d="M20.5 4.5L11 13.5" />
      {dot(11, 13.5, 1.5)}
    </>
  ),
  hotel: (
    <>
      <path d="M3.5 8.5v12" />
      <path d="M3.5 15.75h17v4.75" />
      <path d="M9.5 12.25h8.5a2.5 2.5 0 0 1 2.5 2.5v1" />
      {dot(6.4, 12.4, 1.8)}
    </>
  ),
  bank: (
    <>
      <path d="M3.75 9L12 4.25 20.25 9H3.75z" />
      <path d="M6.25 12.25v5" />
      <path d="M12 12.25v5" />
      <path d="M17.75 12.25v5" />
      <path d="M4.5 20.25h15" />
      {dot(12, 6.9, 1.3)}
    </>
  ),
  restaurant: (
    <>
      <path d="M7 3.75v4.5a2.25 2.25 0 0 0 4.5 0v-4.5" />
      <path d="M9.25 10.5v9.75" />
      <path d="M16.75 3.75c1.9 2.6 1.9 6.9 0 9.5v7" />
      {dot(9.25, 3.75, 1.3)}
    </>
  ),
  sports: (
    <>
      <path d="M8 4.5h8v4a4 4 0 0 1-8 0v-4z" />
      <path d="M8 6H5.4a2.6 2.6 0 0 0 2.7 3.1" />
      <path d="M16 6h2.6a2.6 2.6 0 0 1-2.7 3.1" />
      <path d="M12 12.5V16" />
      <path d="M8.75 19.5h6.5" />
      <path d="M9.5 16h5" />
      {dot(12, 7, 1.5)}
    </>
  ),
  /* Functions */
  marketing: (
    <>
      <path d="M5.5 20.5v-17" />
      <path d="M5.5 4.5H18l-3 3.75 3 3.75H5.5" />
      {dot(5.5, 3.5, 1.5)}
    </>
  ),
  analytics: (
    <>
      <path d="M4 4.5v15h16" />
      <path d="M7.5 15.5l3.5-5 3 2.5 5-6.5" />
      {dot(19, 6.5, 1.6)}
    </>
  ),
  server: (
    <>
      <rect x="4" y="4.75" width="16" height="5.75" rx="1.5" />
      <rect x="4" y="13.5" width="16" height="5.75" rx="1.5" />
      {dot(7.5, 7.6, 1.3)}
      {dot(7.5, 16.4, 1.3)}
      <path d="M13.5 7.6H17" />
      <path d="M13.5 16.4H17" />
    </>
  ),
  /* UI chrome */
  "arrow-right": (
    <>
      <path d="M4.75 12H19" />
      <path d="M13.5 6.5l6 5.5-6 5.5" />
      {dot(4.75, 12, 1.4)}
    </>
  ),
  "arrow-up-right": (
    <>
      <path d="M6.75 17.25L17 7" />
      <path d="M9 6.5h8.5V15" />
      {dot(6.75, 17.25, 1.4)}
    </>
  ),
  "chevron-down": <path d="M6 9.5l6 6 6-6" />,
  filter: (
    <>
      <path d="M4 7.5h16" />
      <path d="M6.5 12h11" />
      <path d="M9 16.5h6" />
      {dot(9, 7.5, 1.6)}
      {dot(14.5, 12, 1.6)}
      {dot(12, 16.5, 1.6)}
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M15.8 15.8l4.7 4.7" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5 10-11" />,
  close: (
    <>
      <path d="M5.75 5.75l12.5 12.5" />
      <path d="M18.25 5.75L5.75 18.25" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  play: <path d="M8.75 5.5v13l10.5-6.5-10.5-6.5z" />,
  bolt: <path d="M13 3.5L6.5 13.5H11L10 20.5l7.5-10h-4.5l1.5-7z" />,
} as const;

export type IconName = keyof typeof glyphs;
export const iconNames = Object.keys(glyphs) as IconName[];
