/* ============================================================
   ZENTRA — Engraving library
   Original hand-drawn style SVG illustrations:
   sun rays, sacred geometry, hands, birds, golden spiral,
   compass rose, ornaments, divine eye, geometric diagrams.
   ============================================================ */

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

/* ————— Sun rays ————— */
export function SunRays({ className, rays = 26, inner = 8 }) {
  const lines = [];
  const cx = 100, cy = 100;
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const r1 = inner;
    const r2 = i % 2 === 0 ? 64 : 74;
    lines.push(
      <line
        key={i}
        x1={cx + Math.cos(a) * r1}
        y1={cy + Math.sin(a) * r1}
        x2={cx + Math.cos(a) * r2}
        y2={cy + Math.sin(a) * r2}
      />
    );
  }
  return (
    <svg className={className} viewBox="0 0 200 200" {...base}>
      {lines}
      <circle cx="100" cy="100" r="14" />
      <circle cx="100" cy="100" r="22" opacity="0.6" />
    </svg>
  );
}

/* ————— Sacred geometry ————— */
export function SacredGeometry({ className }) {
  const c = 200;
  const pt = (r, deg) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  const tri = [90, 210, 330].map((d) => pt(150, d));
  const sq = [45, 135, 225, 315].map((d) => pt(110, d));
  const pen = [90, 162, 234, 306, 18].map((d) => pt(70, d));
  const poly = (pts) => pts.map((p) => p.join(',')).join(' ');
  return (
    <svg className={className} viewBox="0 0 400 400" {...base}>
      <circle cx="200" cy="200" r="30" opacity="0.9" />
      <circle cx="200" cy="200" r="70" opacity="0.85" />
      <circle cx="200" cy="200" r="110" opacity="0.75" />
      <circle cx="200" cy="200" r="150" opacity="0.7" />
      <circle cx="200" cy="200" r="186" opacity="0.5" strokeDasharray="2 6" />
      <polygon points={poly(tri)} opacity="0.8" />
      <polygon points={poly(sq)} opacity="0.7" />
      <polygon points={poly(pen)} opacity="0.65" />
      <line x1="200" y1="50" x2="200" y2="350" opacity="0.5" />
      <line x1="50" y1="200" x2="350" y2="200" opacity="0.5" />
      {[tri[0], sq[0], pen[0], [200, 50]].map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.2" fill="currentColor" stroke="none" opacity="0.9" />
      ))}
    </svg>
  );
}

/* ————— Engraved hand study ————— */
export function HandsEngraving({ className }) {
  return (
    <svg className={className} viewBox="0 0 320 340" {...base}>
      {/* cuff */}
      <path d="M 92 330 C 92 312 98 300 108 294 L 212 294 C 222 300 228 312 228 330" opacity="0.9" />
      <path d="M 97 319 C 122 306 198 306 223 319" opacity="0.6" />
      {/* hatch on cuff */}
      {[0, 1, 2, 3, 4].map((i) => (
        <line key={i} x1={112 + i * 20} y1="332" x2={106 + i * 20} y2="298" opacity="0.45" />
      ))}
      {/* palm + fingers silhouette */}
      <path d="M 110 296
        C 96 270 96 240 108 224
        C 112 214 112 202 112 188
        C 108 140 108 108 116 92
        C 120 84 130 82 134 90
        C 142 106 144 140 142 184
        C 142 130 142 92 150 70
        C 154 62 166 62 170 70
        C 178 92 178 134 174 182
        C 172 132 174 102 182 86
        C 186 79 196 79 200 87
        C 208 104 208 136 204 184
        C 202 150 204 124 212 112
        C 216 106 226 106 230 114
        C 238 132 238 158 234 190
        C 240 210 244 232 238 252
        C 232 272 228 288 218 298 Z" opacity="0.95" />
      {/* separation lines */}
      <path d="M 141 296 C 140 250 140 210 142 186" opacity="0.7" />
      <path d="M 172 296 C 172 252 172 214 173 184" opacity="0.7" />
      <path d="M 204 296 C 204 258 205 224 207 190" opacity="0.7" />
      {/* palm lines */}
      <path d="M 118 270 C 138 260 190 258 214 272" opacity="0.55" />
      <path d="M 122 250 C 150 240 188 242 210 254" opacity="0.5" />
      <path d="M 126 230 C 142 222 168 224 184 230" opacity="0.4" />
      {/* knuckle ticks */}
      <path d="M 114 128 C 124 122 132 122 140 128" opacity="0.6" />
      <path d="M 146 106 C 156 100 164 100 172 106" opacity="0.6" />
      <path d="M 178 122 C 188 116 198 116 204 122" opacity="0.6" />
      <path d="M 210 144 C 220 138 228 138 234 144" opacity="0.6" />
      {/* thumb */}
      <path d="M 112 244 C 92 238 76 224 70 204 C 65 186 70 168 82 162 C 92 157 102 164 104 178 C 106 194 106 220 112 244 Z" opacity="0.9" />
      <path d="M 76 196 C 84 190 92 190 98 196" opacity="0.6" />
    </svg>
  );
}

/* ————— Birds in flight ————— */
const BIRD_PATH = 'M 0 6 C 3 0 6 -1 8 2 C 10 -1 13 0 16 6 C 13 2 11 2 8 5 C 5 2 3 2 0 6 Z';
export function BirdFlocks({ className }) {
  const flock = [
    [60, 90, 1.6, -8],
    [150, 60, 2.2, 4],
    [230, 110, 1.3, -14],
    [270, 40, 0.9, 10],
    [100, 150, 1.0, 18],
  ];
  return (
    <svg className={className} viewBox="0 0 320 200" {...base}>
      {flock.map(([x, y, s, r], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} opacity={0.85 - i * 0.06}>
          <path d={BIRD_PATH} />
        </g>
      ))}
      <line x1="20" y1="170" x2="70" y2="170" opacity="0.4" />
      <line x1="90" y1="170" x2="140" y2="170" opacity="0.4" />
    </svg>
  );
}

/* ————— Golden / Fibonacci spiral ————— */
export function FibSpiral({ className }) {
  const pts = [];
  let x = 190, y = 200, r = 10;
  const dirs = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];
  for (let i = 0; i < 6; i++) {
    const [dx, dy] = dirs[i % 4];
    const nx = x + dx * r;
    const ny = y + dy * r;
    pts.push({ x, y, nx, ny, r });
    x = nx;
    y = ny;
    r = Math.round(r * 1.618);
  }
  return (
    <svg className={className} viewBox="0 0 400 400" {...base}>
      <path
        d={[
          `M ${pts[0].x} ${pts[0].y}`,
          ...pts.map((p) => `A ${p.r} ${p.r} 0 0 1 ${p.nx} ${p.ny}`),
        ].join(' ')}
        opacity="0.9"
      />
      <circle cx="190" cy="200" r="3" fill="currentColor" stroke="none" />
      <line x1="185" y1="200" x2="250" y2="200" opacity="0.35" />
      <line x1="190" y1="196" x2="190" y2="265" opacity="0.35" />
    </svg>
  );
}

/* ————— Compass rose ————— */
export function CompassRose({ className }) {
  const c = 100;
  const star = (r1, r2, off) => {
    const p = [];
    for (let i = 0; i < 8; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const a = ((i * 45 + off) * Math.PI) / 180;
      p.push([c + r * Math.cos(a), c + r * Math.sin(a)]);
    }
    return p.map((q) => q.join(',')).join(' ');
  };
  return (
    <svg className={className} viewBox="0 0 200 200" {...base}>
      <circle cx="100" cy="100" r="88" opacity="0.8" />
      <circle cx="100" cy="100" r="78" opacity="0.5" strokeDasharray="1 5" />
      <polygon points={star(70, 26, 0)} opacity="0.85" />
      <polygon points={star(52, 14, 22.5)} opacity="0.55" />
      <circle cx="100" cy="100" r="10" />
      <line x1="100" y1="6" x2="100" y2="22" opacity="0.9" />
      <line x1="100" y1="178" x2="100" y2="194" opacity="0.9" />
      <line x1="6" y1="100" x2="22" y2="100" opacity="0.9" />
      <line x1="178" y1="100" x2="194" y2="100" opacity="0.9" />
    </svg>
  );
}

/* ————— Ornament divider ————— */
export function OrnamentDivider({ className }) {
  return (
    <svg className={className} viewBox="0 0 400 40" {...base}>
      <line x1="10" y1="20" x2="176" y2="20" opacity="0.6" />
      <line x1="224" y1="20" x2="390" y2="20" opacity="0.6" />
      <path d="M 30 20 C 62 10 96 10 122 20" opacity="0.7" />
      <path d="M 278 20 C 304 10 338 10 370 20" opacity="0.7" />
      <path d="M 96 20 C 110 6 130 4 140 14 C 148 22 136 34 126 30 C 120 27 122 20 130 20" opacity="0.6" />
      <path d="M 304 20 C 290 6 270 4 260 14 C 252 22 264 34 274 30 C 280 27 278 20 270 20" opacity="0.6" />
      <path d="M 200 8 L 212 20 L 200 32 L 188 20 Z" opacity="0.9" />
      <circle cx="200" cy="20" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="20" r="1.8" fill="currentColor" stroke="none" opacity="0.7" />
      <circle cx="390" cy="20" r="1.8" fill="currentColor" stroke="none" opacity="0.7" />
    </svg>
  );
}

/* ————— Divine eye in triangle ————— */
export function EyeDivine({ className }) {
  return (
    <svg className={className} viewBox="0 0 200 200" {...base}>
      <polygon points="100,18 176,164 24,164" opacity="0.85" />
      <polygon points="100,34 164,154 36,154" opacity="0.45" />
      <path d="M 52 150 L 68 138" opacity="0.5" />
      <path d="M 148 150 L 132 138" opacity="0.5" />
      <path d="M 100 164 L 100 186" opacity="0.6" />
      <circle cx="100" cy="102" r="40" opacity="0.75" />
      <path d="M 100 74 C 128 74 140 96 100 112 C 60 96 72 74 100 74 Z" opacity="0.95" />
      <circle cx="100" cy="98" r="13" opacity="0.9" />
      <circle cx="100" cy="98" r="4" fill="currentColor" stroke="none" opacity="0.9" />
      <path d="M 100 84 C 106 90 106 106 100 112" opacity="0.5" />
    </svg>
  );
}

/* ————— Geometric diagram (proof figure) ————— */
export function GeoDiagram({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 300" {...base}>
      <circle cx="120" cy="150" r="92" opacity="0.85" />
      <circle cx="180" cy="150" r="92" opacity="0.85" />
      <line x1="120" y1="150" x2="300" y2="150" opacity="0.6" />
      <line x1="28" y1="150" x2="120" y2="150" opacity="0.6" />
      <line x1="120" y1="58" x2="120" y2="242" opacity="0.4" />
      <line x1="120" y1="150" x2="212" y2="72" opacity="0.5" />
      <line x1="120" y1="150" x2="212" y2="228" opacity="0.5" />
      {/* intersection marks */}
      <line x1="136" y1="136" x2="144" y2="144" opacity="0.9" />
      <line x1="144" y1="136" x2="136" y2="144" opacity="0.9" />
      <line x1="136" y1="164" x2="144" y2="156" opacity="0.9" />
      <line x1="144" y1="164" x2="136" y2="156" opacity="0.9" />
      {/* angle arc */}
      <path d="M 150 150 A 30 30 0 0 1 180 120" opacity="0.6" />
      {/* small ticks */}
      <line x1="150" y1="150" x2="150" y2="145" opacity="0.7" />
      <line x1="185" y1="150" x2="185" y2="145" opacity="0.7" />
    </svg>
  );
}

/* ————— Z monogram mark ————— */
export function ZMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" {...base}>
      <circle cx="32" cy="32" r="30" opacity="0.9" />
      <circle cx="32" cy="32" r="24" opacity="0.4" strokeDasharray="2 4" />
      <path d="M 21 23 H 43 L 21 41 H 43" opacity="0.95" />
      <line x1="46" y1="14" x2="46" y2="19" opacity="0.6" />
      <line x1="51" y1="17" x2="51" y2="22" opacity="0.6" />
      <line x1="48" y1="12" x2="52" y2="16" opacity="0.6" />
    </svg>
  );
}
