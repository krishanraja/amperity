/**
 * Node field geometry: the seed of the whole imagery system.
 * Dots are records, lines are matches, larger filled nodes are resolved
 * profiles. Pure and deterministic (seeded PRNG) so the same module
 * drives the live canvas hero, the story-art headers, and the static
 * OG image frames.
 */

/** mulberry32: tiny deterministic PRNG. */
export function createRng(seed) {
  let a = seed >>> 0;
  return function rng() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Hash a string slug to a numeric seed (for per-customer story art). */
export function seedFromSlug(slug) {
  let h = 2166136261;
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/**
 * Generate the node field.
 * Layers: 0 = back (small, dim, blurred), 1 = mid, 2 = front (sharp).
 *
 * @param {object} opts
 * @param {number} opts.seed
 * @param {number} opts.count total node count
 * @param {number} [opts.layers] 2 on mobile, 3 on desktop
 * @returns nodes in normalized [0,1] space
 */
export function generateNodes({ seed, count, layers = 3 }) {
  const rng = createRng(seed);
  const nodes = [];
  for (let i = 0; i < count; i++) {
    const layer = layers === 3 ? (i % 3) : (i % 2) + 1;
    nodes.push({
      x: rng(),
      y: rng(),
      // Front nodes are larger; radii in px at 1x scale
      r: layer === 0 ? 1 + rng() * 1.2 : layer === 1 ? 1.4 + rng() * 1.6 : 1.8 + rng() * 2.2,
      layer,
      // Slow drift: direction plus phase for sinusoidal wander
      angle: rng() * Math.PI * 2,
      phase: rng() * Math.PI * 2,
      speed: 0.4 + rng() * 0.6,
    });
  }
  return nodes;
}

/**
 * Pick a resolve cluster: an anchor node plus its nearest front/mid
 * neighbours within a radius, in normalized space.
 */
export function pickCluster(nodes, rng, { radius = 0.16, min = 3, max = 5 } = {}) {
  const front = nodes.filter((n) => n.layer >= 1);
  if (front.length < min) return null;
  const anchor = front[Math.floor(rng() * front.length)];
  const near = front
    .filter((n) => n !== anchor)
    .map((n) => ({ n, d: Math.hypot(n.x - anchor.x, n.y - anchor.y) }))
    .filter(({ d }) => d < radius)
    .sort((a, b) => a.d - b.d)
    .slice(0, max - 1)
    .map(({ n }) => n);
  if (near.length < min - 1) return null;
  return { anchor, members: [anchor, ...near] };
}

/**
 * Static frame for OG images and story art: nodes plus a few resolved
 * clusters with their edges, as plain geometry.
 */
export function staticFrame({ seed, count, clusterCount = 2, layers = 3 }) {
  const nodes = generateNodes({ seed, count, layers });
  const rng = createRng(seed ^ 0x9e3779b9);
  const clusters = [];
  for (let i = 0; i < clusterCount * 4 && clusters.length < clusterCount; i++) {
    const c = pickCluster(nodes, rng);
    if (!c) continue;
    // Avoid overlapping clusters
    if (
      clusters.some(
        (prev) => Math.hypot(prev.anchor.x - c.anchor.x, prev.anchor.y - c.anchor.y) < 0.25,
      )
    )
      continue;
    clusters.push(c);
  }
  return { nodes, clusters };
}

/**
 * Render a static frame to an SVG string. Used by the OG generator and
 * available for server-rendered story art.
 *
 * @param {object} opts
 * @param {number} opts.width
 * @param {number} opts.height
 * @param {number} opts.seed
 * @param {number} [opts.count]
 * @param {number} [opts.clusterCount] resolved clusters to draw
 * @param {string} [opts.background] fill or "none"
 * @param {string} [opts.dotColor]
 * @param {string} [opts.accentColor] color of resolved cluster nodes
 * @param {number} [opts.opacity] overall field opacity
 */
export function renderFieldSvg({
  width,
  height,
  seed,
  count = 90,
  clusterCount = 2,
  background = "none",
  dotColor = "#ffffff",
  accentColor = "#DFF200",
  opacity = 1,
}) {
  const { nodes, clusters } = staticFrame({ seed, count, clusterCount });
  const inCluster = new Set(clusters.flatMap((c) => c.members));
  const parts = [];
  if (background !== "none") {
    parts.push(`<rect width="${width}" height="${height}" fill="${background}"/>`);
  }
  const layerAlpha = [0.25, 0.45, 0.8];
  for (const c of clusters) {
    for (const m of c.members) {
      if (m === c.anchor) continue;
      parts.push(
        `<line x1="${(c.anchor.x * width).toFixed(1)}" y1="${(c.anchor.y * height).toFixed(1)}" x2="${(m.x * width).toFixed(1)}" y2="${(m.y * height).toFixed(1)}" stroke="${dotColor}" stroke-opacity="0.35" stroke-width="1"/>`,
      );
    }
  }
  for (const n of nodes) {
    const resolved = inCluster.has(n);
    const fill = resolved ? accentColor : dotColor;
    const alpha = resolved ? 1 : layerAlpha[n.layer];
    const r = resolved && clusters.some((c) => c.anchor === n) ? n.r * 1.9 : n.r;
    parts.push(
      `<circle cx="${(n.x * width).toFixed(1)}" cy="${(n.y * height).toFixed(1)}" r="${r.toFixed(1)}" fill="${fill}" fill-opacity="${alpha}"/>`,
    );
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"${opacity < 1 ? ` opacity="${opacity}"` : ""}>${parts.join("")}</svg>`;
}
