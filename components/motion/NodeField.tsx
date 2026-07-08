"use client";

import { useEffect, useRef } from "react";
import { createRng, generateNodes, pickCluster, staticFrame } from "@/lib/node-field.mjs";
import { chartreuse, white } from "@/styles/tokens";

type FieldNode = {
  x: number;
  y: number;
  r: number;
  layer: number;
  angle: number;
  phase: number;
  speed: number;
};

type Cluster = {
  anchor: FieldNode;
  members: FieldNode[];
};

type ResolveEvent = {
  cluster: Cluster;
  start: number; // ms timestamp
  cx: number;
  cy: number;
};

export type NodeFieldProps = {
  /** Approximate nodes per 100,000 px^2. Homepage hero: sparse (~1.1). */
  density?: number;
  /** Drift speed multiplier. */
  speed?: number;
  seed?: number;
  dotColor?: string;
  className?: string;
};

const RESOLVE_MS = 1500;
const DECAY_MS = 3000;
const POINTER_RADIUS = 160;
const FRAME_MS = 1000 / 30; // 30fps cap

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * The live-data hero texture: scattered dots (fragmented records) that
 * periodically draw connecting lines and merge into brighter nodes
 * (resolved profiles). Three parallax depth layers, a defined rhythm of
 * drift and resolve, pointer-proximity response on pointer devices.
 * Renders a single static frame under prefers-reduced-motion or
 * Save-Data. Paused while off-screen.
 */
export function NodeField({
  density = 1.1,
  speed = 1,
  seed = 7,
  dotColor = white,
  className,
}: NodeFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData =
      "connection" in navigator &&
      Boolean((navigator as { connection?: { saveData?: boolean } }).connection?.saveData);
    const pointerFine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const isMobile = !window.matchMedia("(min-width: 768px)").matches;
    const staticOnly = reducedMotion || saveData;

    const layers = isMobile ? 2 : 3;
    const effectiveDensity = isMobile ? density * (2 / 3) : density;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const [dr, dg, db] = hexToRgb(dotColor);
    const [ar, ag, ab] = hexToRgb(chartreuse);

    let width = 0;
    let height = 0;
    let nodes: FieldNode[] = [];
    let raf = 0;
    let running = false;
    let lastFrame = 0;
    let nextResolveAt = 0;
    let active: ResolveEvent | null = null;
    /** Freshly resolved profile dots decaying chartreuse -> dot color. */
    let resolved: { x: number; y: number; r: number; born: number }[] = [];
    const rng = createRng(seed ^ 0xc0ffee);
    const pointer = { x: -1e4, y: -1e4 };
    let scrollOffset = 0;

    // Pre-rendered dot sprites per layer (index 0 gets the 2px blur)
    const sprites: HTMLCanvasElement[] = [];
    const SPRITE = 32;
    const layerAlpha = [0.28, 0.5, 0.85];
    for (let l = 0; l < 3; l++) {
      const s = document.createElement("canvas");
      s.width = SPRITE * dpr;
      s.height = SPRITE * dpr;
      const sctx = s.getContext("2d")!;
      sctx.scale(dpr, dpr);
      if (l === 0) sctx.filter = "blur(2px)";
      sctx.fillStyle = `rgba(${dr}, ${dg}, ${db}, ${layerAlpha[l]})`;
      sctx.beginPath();
      sctx.arc(SPRITE / 2, SPRITE / 2, SPRITE / 4, 0, Math.PI * 2);
      sctx.fill();
      sprites.push(s);
    }

    function regenerate() {
      const count = Math.round(((width * height) / 100000) * effectiveDensity * 10);
      nodes = generateNodes({ seed, count: Math.max(24, count), layers }) as FieldNode[];
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      if (rect.width === width && rect.height === height && canvas!.width > 0) return;
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      regenerate();
      if (staticOnly) drawStaticFrame();
    }

    function drawSprite(n: FieldNode, x: number, y: number, scale = 1) {
      const size = n.r * 4 * scale;
      ctx!.drawImage(sprites[n.layer], x - size / 2, y - size / 2, size, size);
    }

    /** Parallax: back layer drifts slower and shifts less with scroll. */
    const parallax = [0.35, 0.65, 1];

    function nodePos(n: FieldNode, t: number) {
      const drift = 0.008 * n.speed * speed;
      const px =
        (n.x + Math.cos(n.angle) * drift * t + 0.006 * Math.sin(t * 0.5 + n.phase)) % 1;
      const py = (n.y + Math.sin(n.angle) * drift * t * 0.6) % 1;
      const wrapX = px < 0 ? px + 1 : px;
      const wrapY = py < 0 ? py + 1 : py;
      return {
        x: wrapX * width,
        y: wrapY * height + scrollOffset * (1 - parallax[n.layer]) * 0.3,
      };
    }

    function drawStaticFrame() {
      ctx!.clearRect(0, 0, width, height);
      const frame = staticFrame({
        seed,
        count: nodes.length,
        clusterCount: 2,
        layers,
      }) as { nodes: FieldNode[]; clusters: Cluster[] };
      const inCluster = new Set(frame.clusters.flatMap((c) => c.members));
      for (const c of frame.clusters) {
        ctx!.strokeStyle = `rgba(${dr}, ${dg}, ${db}, 0.3)`;
        ctx!.lineWidth = 1;
        for (const m of c.members) {
          if (m === c.anchor) continue;
          ctx!.beginPath();
          ctx!.moveTo(c.anchor.x * width, c.anchor.y * height);
          ctx!.lineTo(m.x * width, m.y * height);
          ctx!.stroke();
        }
      }
      for (const n of frame.nodes) {
        if (inCluster.has(n)) {
          ctx!.fillStyle = `rgba(${ar}, ${ag}, ${ab}, 0.95)`;
          ctx!.beginPath();
          ctx!.arc(n.x * width, n.y * height, n.r * 1.4, 0, Math.PI * 2);
          ctx!.fill();
        } else {
          drawSprite(n, n.x * width, n.y * height);
        }
      }
    }

    function frame(now: number) {
      raf = requestAnimationFrame(frame);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      const t = now / 1000;
      ctx!.clearRect(0, 0, width, height);

      if (!nextResolveAt) nextResolveAt = now + 2000 + rng() * 3000;

      // Kick off a resolve event on the rhythm: 8 to 12 seconds of
      // drift, then a 1.5s resolve somewhere in the field.
      if (!active && now >= nextResolveAt) {
        const cluster = pickCluster(nodes, rng) as Cluster | null;
        if (cluster) {
          let cx = 0;
          let cy = 0;
          for (const m of cluster.members) {
            const p = nodePos(m, t);
            cx += p.x;
            cy += p.y;
          }
          active = {
            cluster,
            start: now,
            cx: cx / cluster.members.length,
            cy: cy / cluster.members.length,
          };
        }
        nextResolveAt = now + 8000 + rng() * 4000;
      }

      // Pointer proximity: faint connecting lines to nearby records
      if (pointerFine) {
        ctx!.lineWidth = 1;
        for (const n of nodes) {
          if (n.layer === 0) continue;
          const p = nodePos(n, t);
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d < POINTER_RADIUS) {
            const a = (1 - d / POINTER_RADIUS) * 0.3;
            ctx!.strokeStyle = `rgba(${dr}, ${dg}, ${db}, ${a})`;
            ctx!.beginPath();
            ctx!.moveTo(pointer.x, pointer.y);
            ctx!.lineTo(p.x, p.y);
            ctx!.stroke();
          }
        }
      }

      // Active resolve event: edges draw in, members pull toward the
      // centroid, then a brighter resolved node is born.
      if (active) {
        const progress = Math.min(1, (now - active.start) / RESOLVE_MS);
        const ease = 1 - Math.pow(1 - progress, 3);
        ctx!.lineWidth = 1;
        for (const m of active.cluster.members) {
          if (m === active.cluster.anchor) continue;
          const p = nodePos(m, t);
          const anchor = nodePos(active.cluster.anchor, t);
          ctx!.strokeStyle = `rgba(${dr}, ${dg}, ${db}, ${0.5 * (1 - progress * 0.4)})`;
          ctx!.beginPath();
          ctx!.moveTo(anchor.x, anchor.y);
          ctx!.lineTo(anchor.x + (p.x - anchor.x) * ease, anchor.y + (p.y - anchor.y) * ease);
          ctx!.stroke();
        }
        if (progress >= 1) {
          resolved.push({ x: active.cx, y: active.cy, r: 3.4, born: now });
          active = null;
        }
      }

      // Drifting records
      for (const n of nodes) {
        const p = nodePos(n, t);
        let dx = 0;
        let dy = 0;
        if (pointerFine && n.layer > 0) {
          const d = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (d < POINTER_RADIUS && d > 0.001) {
            const pull = (1 - d / POINTER_RADIUS) * 3;
            dx = ((pointer.x - p.x) / d) * pull;
            dy = ((pointer.y - p.y) / d) * pull;
          }
        }
        drawSprite(n, p.x + dx, p.y + dy);
      }

      // Freshly resolved profiles: chartreuse decaying to the dot color
      resolved = resolved.filter((rn) => now - rn.born < DECAY_MS + 4000);
      for (const rn of resolved) {
        const age = (now - rn.born) / DECAY_MS;
        const mix = Math.min(1, age);
        const r = Math.round(ar + (dr - ar) * mix);
        const g = Math.round(ag + (dg - ag) * mix);
        const b = Math.round(ab + (db - ab) * mix);
        const alpha = age < 1 ? 0.95 : Math.max(0, 0.95 - (age - 1) * 0.6);
        ctx!.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx!.beginPath();
        ctx!.arc(rn.x, rn.y, rn.r, 0, Math.PI * 2);
        ctx!.fill();
      }
    }

    function start() {
      if (running || staticOnly) return;
      running = true;
      lastFrame = 0;
      raf = requestAnimationFrame(frame);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.01 },
    );
    io.observe(canvas);

    const onVisibility = () => {
      if (document.hidden) stop();
      else if (!staticOnly) start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -1e4;
      pointer.y = -1e4;
    };
    const onScroll = () => {
      scrollOffset = window.scrollY;
    };
    if (pointerFine && !staticOnly) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerleave", onLeave);
    }
    if (!staticOnly) window.addEventListener("scroll", onScroll, { passive: true });

    if (staticOnly) drawStaticFrame();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, [density, speed, seed, dotColor]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
