// Procedural zen-garden section break: sand raked in flowing waves, irregular stones with
// concentric ripples, and a small red seal. Two variants so consecutive dividers differ.
const W = 1200, H = 140;

const rng = (seed) => { let s = seed; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

// closed, slightly irregular stone outline (Catmull-Rom -> cubic bezier)
function stonePath(cx, cy, rx, ry, seed) {
  const r = rng(seed), n = 9, pts = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2, j = 0.86 + r() * 0.28;
    pts.push([cx + Math.cos(a) * rx * j, cy + Math.sin(a) * ry * j * (a > Math.PI ? 0.9 : 1)]);
  }
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return d + 'Z';
}

const VARIANTS = {
  a: { stones: [{ x: 700, y: 72, rx: 48, ry: 27, rings: 3, seed: 7 }, { x: 790, y: 88, rx: 22, ry: 13, rings: 2, seed: 19 }, { x: 646, y: 94, rx: 12, ry: 7, rings: 2, seed: 31 }], seal: 1112 },
  b: { stones: [{ x: 470, y: 70, rx: 40, ry: 24, rings: 3, seed: 11 }, { x: 392, y: 90, rx: 18, ry: 11, rings: 2, seed: 23 }, { x: 540, y: 96, rx: 10, ry: 6, rings: 2, seed: 41 }], seal: 42 },
};

function build(el, id, variant) {
  const { stones, seal } = VARIANTS[variant];
  // flowing sand: sine-wave rake lines, period 120 so a 120px slide loops seamlessly
  const lines = Array.from({ length: 8 }, (_, i) => {
    const y = 20 + i * 14, a = 3.4;
    return `<path d="M-120 ${y} q30 ${-a} 60 0${' t60 0'.repeat(24)}"/>`;
  }).join('');
  const hole = stones.map((s) => `<ellipse cx="${s.x}" cy="${s.y}" rx="${s.rx + (s.rings + 0.6) * 18}" ry="${s.ry + (s.rings + 0.6) * 10}" fill="#000"/>`).join('');
  const rings = stones.map((s) => `<g class="dz-rings">${Array.from({ length: s.rings }, (_, k) =>
    `<ellipse cx="${s.x}" cy="${s.y}" rx="${s.rx + (k + 1) * 18}" ry="${s.ry + (k + 1) * 10}" style="stroke-opacity:${[.3, .2, .12][k]}"/>`).join('')}</g>`).join('');
  const rocks = stones.map((s) => `<g class="dz-stone">
      <ellipse cx="${s.x + 4}" cy="${s.y + s.ry * 0.85}" rx="${s.rx * 1.08}" ry="${s.ry * 0.4}" fill="rgba(20,17,15,.22)" filter="url(#dzb${id})"/>
      <path d="${stonePath(s.x, s.y, s.rx, s.ry, s.seed)}" fill="url(#dzg${id})"/>
      <ellipse cx="${s.x - s.rx * 0.28}" cy="${s.y - s.ry * 0.4}" rx="${s.rx * 0.34}" ry="${s.ry * 0.18}" fill="#fff" fill-opacity=".13"/>
    </g>`).join('');
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" focusable="false">
    <defs>
      <mask id="dzm${id}"><rect width="${W}" height="${H}" fill="#fff"/>${hole}</mask>
      <radialGradient id="dzg${id}" cx="35%" cy="28%" r="80%"><stop offset="0" stop-color="#6b655d"/><stop offset=".55" stop-color="#2b2723"/><stop offset="1" stop-color="#151311"/></radialGradient>
      <filter id="dzb${id}" x="-30%" y="-60%" width="160%" height="240%"><feGaussianBlur stdDeviation="4"/></filter>
      <linearGradient id="dzf${id}" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".12" stop-color="#fff"/><stop offset=".88" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
      <mask id="dzx${id}"><rect width="${W}" height="${H}" fill="url(#dzf${id})"/></mask>
    </defs>
    <g mask="url(#dzx${id})">
      <g mask="url(#dzm${id})"><g class="dz-lines">${lines}</g></g>
      ${rings}
    </g>
    ${rocks}
    <g class="dz-seal" transform="rotate(-4 ${seal + 23} 70)">
      <g filter="url(#rough-sm)"><rect x="${seal}" y="47" width="46" height="46" rx="3" fill="#b8312f"/><text x="${seal + 23}" y="82" text-anchor="middle" font-size="32" fill="#fcfbf8" style="font-family:var(--brush)">静</text></g>
    </g>
  </svg>`;
}

export function buildZenDividers() {
  document.querySelectorAll('.zen-divider').forEach((el, i) => build(el, i, i % 2 ? 'b' : 'a'));
}
