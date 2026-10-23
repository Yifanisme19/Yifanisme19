import { siPhp, siLaravel, siLivewire, siPython, siFastapi, siMysql, siMariadb, siJavascript, siFlutter, siDart, siWordpress, siGooglechrome, siClaude } from 'simple-icons';

const svg = (path, color) =>
  `<svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="${color}" aria-hidden="true"><path d="${path}"/></svg>`;
const si = (icon) => svg(icon.path, `#${icon.hex}`);

// simple-icons ships no OpenAI/ChatGPT or OpenClaw marks
const chatgpt = `<svg viewBox="0 0 24 24" class="h-5 w-5 shrink-0" fill="none" stroke="#10a37f" stroke-width="1.8" aria-hidden="true">${[0, 60, 120].map((r) => `<ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(${r} 12 12)"/>`).join('')}</svg>`;
const openclaw = `<span class="text-lg leading-none" aria-hidden="true">🦞</span>`;
const browser = si(siGooglechrome);

export const aiTools = [
  ['ChatGPT', chatgpt],
  ['Claude', si(siClaude)],
  ['OpenClaw', openclaw],
];

export const stack = [
  ['PHP', si(siPhp)], ['Laravel', si(siLaravel)], ['Livewire', si(siLivewire)], ['Python', si(siPython)],
  ['FastAPI', si(siFastapi)], ['MySQL', si(siMysql)], ['MariaDB', si(siMariadb)], ['JavaScript', si(siJavascript)],
  ['Flutter', si(siFlutter)], ['Dart', si(siDart)], ['WordPress', si(siWordpress)], ['Browser Automation', browser],
  ...aiTools,
];
