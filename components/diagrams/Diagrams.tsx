import { chartreuse, gray, white } from "@/styles/tokens";

/**
 * Hand-built SVG system diagrams. 8px-grid geometry, mono labels, 1.5px
 * strokes, chartreuse only on the resolved or live element. These carry
 * the argument the current site's screenshots carried.
 *
 * Rendered on a dark surface; colors come from tokens.
 */

const MONO = "ui-monospace, monospace";
const stroke = gray[600];
const label = gray[400];

function Node({
  x,
  y,
  w = 120,
  h = 40,
  text,
  live = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  text: string;
  live?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        fill="none"
        stroke={live ? chartreuse : stroke}
        strokeWidth={1.5}
      />
      <text
        x={x + w / 2}
        y={y + h / 2 + 4}
        textAnchor="middle"
        fontFamily={MONO}
        fontSize={12}
        fill={live ? chartreuse : white}
      >
        {text}
      </text>
    </g>
  );
}

/** Sources flow into the resolution layer; profiles flow out to channels and agents. */
export function ArchitectureDiagram({ className }: { className?: string }) {
  const sources = ["POS", "ECOMM", "LOYALTY", "SERVICE"];
  const outputs = ["JOURNEYS", "PAID MEDIA", "AGENTS"];
  return (
    <svg viewBox="0 0 640 360" className={className} role="img" aria-label="Sources flow into the resolution layer and resolved profiles flow out to channels and agents">
      <title>How context flows: sources resolve into profiles, profiles activate</title>
      {sources.map((s, i) => (
        <g key={s}>
          <Node x={16} y={24 + i * 80} w={112} text={s} />
          <line x1={128} y1={44 + i * 80} x2={256} y2={180} stroke={stroke} strokeWidth={1.5} />
        </g>
      ))}
      <rect x={256} y={148} width={128} height={64} rx={8} fill="none" stroke={chartreuse} strokeWidth={1.5} />
      <text x={320} y={176} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={chartreuse}>
        RESOLVE
      </text>
      <text x={320} y={194} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={label}>
        AmpID
      </text>
      {outputs.map((o, i) => (
        <g key={o}>
          <line x1={384} y1={180} x2={512} y2={64 + i * 96} stroke={stroke} strokeWidth={1.5} />
          <Node x={512} y={44 + i * 96} w={112} text={o} live={o === "AGENTS"} />
        </g>
      ))}
    </svg>
  );
}

/** Zero-copy Bridge: one resolved store, shared live to lakehouse and warehouse. */
export function BridgeDiagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 280" className={className} role="img" aria-label="Amperity Bridge shares live resolved profiles to your lakehouse and warehouse with zero copies">
      <title>Amperity Bridge: live profiles shared with zero copies</title>
      <rect x={240} y={112} width={160} height={56} rx={8} fill="none" stroke={chartreuse} strokeWidth={1.5} />
      <text x={320} y={136} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={chartreuse}>
        RESOLVED PROFILES
      </text>
      <text x={320} y={154} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={label}>
        one live store
      </text>
      <Node x={32} y={116} w={120} text="LAKEHOUSE" />
      <Node x={488} y={116} w={120} text="WAREHOUSE" />
      <line x1={152} y1={144} x2={240} y2={140} stroke={chartreuse} strokeWidth={1.5} strokeDasharray="4 4" />
      <line x1={400} y1={140} x2={488} y2={144} stroke={chartreuse} strokeWidth={1.5} strokeDasharray="4 4" />
      <text x={320} y={224} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={label}>
        no exports. no copies. no drift.
      </text>
    </svg>
  );
}

/** MCP Server: one context layer, many agents. */
export function McpDiagram({ className }: { className?: string }) {
  const agents = ["ASSISTANT", "COPILOT", "AGENT"];
  return (
    <svg viewBox="0 0 640 300" className={className} role="img" aria-label="One governed context layer serves many AI agents through the MCP Server">
      <title>MCP Server: one governed context layer, many agents</title>
      <rect x={32} y={116} width={168} height={64} rx={8} fill="none" stroke={chartreuse} strokeWidth={1.5} />
      <text x={116} y={144} textAnchor="middle" fontFamily={MONO} fontSize={12} fill={chartreuse}>
        CONTEXT LAYER
      </text>
      <text x={116} y={162} textAnchor="middle" fontFamily={MONO} fontSize={11} fill={label}>
        governed profiles
      </text>
      <Node x={280} y={124} w={120} h={48} text="MCP SERVER" live />
      <line x1={200} y1={148} x2={280} y2={148} stroke={chartreuse} strokeWidth={1.5} />
      {agents.map((a, i) => (
        <g key={a}>
          <line x1={400} y1={148} x2={488} y2={44 + i * 96} stroke={stroke} strokeWidth={1.5} />
          <Node x={488} y={24 + i * 96} w={120} text={a} />
        </g>
      ))}
    </svg>
  );
}
