import './style.css';
import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate, hover, press, stagger } from 'motion';
import { content } from './content.js';
import { stack, aiTools } from './icons.js';

inject();
injectSpeedInsights();
gsap.registerPlugin(ScrollTrigger);

const EMAIL = 'leeyifan19@gmail.com';
const LINKEDIN = 'https://www.linkedin.com/in/yifan-lee/';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

let filter = 'all';
if (localStorage.getItem('theme') === 'dark') document.documentElement.classList.add('dark');

const app = document.getElementById('app');

function nav(t) {
  return `
  <header id="nav" class="fixed inset-x-0 top-0 z-40 transition-all">
    <div class="mx-3 mt-3 flex max-w-6xl items-center justify-between rounded-full border border-transparent px-4 py-2 sm:mx-auto sm:px-6 sm:py-2.5 max-sm:!border-line max-sm:bg-panel/80 max-sm:backdrop-blur" id="nav-inner">
      <a href="#top" class="font-display text-lg font-bold text-fg">YF<span class="text-accent">.</span></a>
      <nav class="hidden gap-8 text-sm text-muted md:flex">
        ${['about', 'projects', 'experience', 'contact'].map((k) => `<a href="#${k}" class="transition hover:text-fg">${t.nav[k]}</a>`).join('')}
      </nav>
      <div class="flex items-center gap-2">
        <button id="theme-btn" class="rounded-full border border-line p-2 text-fg2" aria-label="Toggle theme">
          <svg class="dark:hidden" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 10.5A6.5 6.5 0 0 1 7.5 3 6.5 6.5 0 1 0 15 10.5z"/></svg>
          <svg class="hidden dark:block" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="9" r="3.5"/><path d="M9 1v2M9 15v2M1 9h2M15 9h2M3.3 3.3l1.4 1.4M13.3 13.3l1.4 1.4M3.3 14.7l1.4-1.4M13.3 4.7l1.4-1.4"/></svg>
        </button>
        <button id="menu-btn" class="rounded-full border border-line p-2 md:hidden" aria-label="Menu">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 5h14M2 13h14"/></svg>
        </button>
      </div>
    </div>
    <div id="mobile-menu" class="mx-3 mt-2 hidden flex-col gap-1 rounded-2xl border border-line bg-panel/95 p-3 backdrop-blur md:hidden">
      ${['about', 'projects', 'experience', 'contact'].map((k) => `<a href="#${k}" class="rounded-xl px-4 py-3 text-fg2 hover:bg-fg/5">${t.nav[k]}</a>`).join('')}
    </div>
  </header>`;
}

function hero(t) {
  const h = t.hero;
  const orbit = [...aiTools, ...stack.filter(([n]) => ['PHP', 'Python', 'Laravel', 'FastAPI', 'MySQL'].includes(n))];
  return `
  <section id="top" class="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-28 pb-20 sm:px-6 sm:pt-32 sm:pb-24">
    <div class="grid-bg absolute inset-0"></div>
    <div class="blob h-96 w-96 bg-accent -left-32 top-10 hero-blob"></div>
    <div class="blob h-80 w-80 bg-cyan right-[-6rem] bottom-0 hero-blob"></div>
    <div id="hero-content" class="relative mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      <div class="min-w-0">
        <div class="hero-in chip inline-flex items-center gap-2 !bg-panel !text-sm">
          <span class="relative flex h-2 w-2"><span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75"></span><span class="relative inline-flex h-2 w-2 rounded-full bg-lime"></span></span>
          ${h.badge}
        </div>
        <p class="hero-in mt-7 text-lg text-muted">${h.hi}</p>
        <h1 class="font-display text-[clamp(3rem,8vw,6.25rem)] font-bold leading-[0.95] tracking-tight">
          ${h.name.split('').map((c) => `<span class="hero-char inline-block grad-text">${c === ' ' ? '&nbsp;' : c}</span>`).join('')}
        </h1>
        <p class="hero-in mt-6 font-display text-2xl text-fg sm:text-3xl">
          ${h.build}
          <span class="relative inline-block h-[1.2em] overflow-hidden align-bottom"><span id="word" class="inline-block text-accent">${h.words[0]}</span></span>
        </p>
        <p class="hero-in mt-2 text-subtle">${h.role} · ${h.loc}</p>
        <p class="hero-in mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">${h.lead}</p>
        <div class="hero-in mt-9 flex flex-wrap gap-3">
          <a href="#projects" class="btn btn-grad rounded-full px-6 py-3 font-medium">${h.cta1} →</a>
          <a href="#contact" class="btn rounded-full border border-line bg-panel px-6 py-3 font-medium text-fg">${h.cta2}</a>
        </div>
        <div class="hero-in mt-9 flex flex-wrap items-center gap-2">
          <span class="mr-1 w-full text-xs uppercase sm:w-auto tracking-widest text-subtle">${h.tools}</span>
          ${aiTools.map(([n, i]) => `<span class="chip inline-flex items-center gap-2 !bg-panel !py-1.5 !text-sm">${i}${n}</span>`).join('')}
        </div>
      </div>

      <div id="hero-visual" class="hero-visual relative mx-auto aspect-square w-[88%] max-w-[480px] sm:w-full">
        <div class="orbit-ring absolute inset-0 rounded-full border border-dashed border-line">
          ${orbit.map(([n, i], k) => `
            <div class="absolute left-1/2 top-1/2" style="transform:rotate(${(360 / orbit.length) * k}deg) translateY(-50%) translateY(calc(-1 * min(240px, 40vw)))">
              <div class="orbit-item -translate-x-1/2 -translate-y-1/2" style="--r:${(360 / orbit.length) * k}deg">
                <div class="grid h-9 w-9 place-items-center rounded-xl sm:h-11 sm:w-11 sm:rounded-2xl border border-line bg-panel shadow-lg" title="${n}">${i}</div>
              </div>
            </div>`).join('')}
        </div>

        <div data-depth="12" class="layer absolute right-0 top-[6%] w-[64%] sm:right-[2%] sm:top-[8%] sm:w-[62%] rotate-[4deg] overflow-hidden rounded-xl border border-line bg-panel shadow-2xl">
          <div class="flex gap-1.5 border-b border-line px-3 py-2"><i class="h-2 w-2 rounded-full bg-red-400"></i><i class="h-2 w-2 rounded-full bg-amber-400"></i><i class="h-2 w-2 rounded-full bg-green-400"></i></div>
          <img src="/images/auto-upload-queue.webp" alt="" class="block h-auto w-full" />
        </div>

        <div data-depth="28" class="layer absolute bottom-[4%] left-0 w-[92%] rounded-2xl sm:bottom-[8%] sm:left-[2%] sm:w-[78%] border border-line bg-panel/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
          <div class="flex items-center justify-between gap-2">
            <span class="truncate font-mono text-[11px] text-subtle sm:text-xs">▸ ${h.run}</span>
            <span class="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-lime/15 px-2 py-0.5 text-[11px] font-medium text-lime"><i class="h-1.5 w-1.5 rounded-full bg-lime"></i>${h.live}</span>
          </div>
          <ul class="mt-3 space-y-2 font-mono text-[11px] leading-snug sm:text-[13px]">
            ${h.log.map((l, k) => `
              <li class="log-line flex items-center gap-2 text-fg2">
                <span class="log-dot grid h-4 w-4 shrink-0 place-items-center rounded-full border border-line text-[9px]"></span>
                <span class="${k === h.log.length - 1 ? 'text-accent font-semibold' : ''}">${l}</span>
              </li>`).join('')}
          </ul>
          <div class="mt-4 h-1.5 overflow-hidden rounded-full bg-fg/10"><div id="log-bar" class="h-full w-0 rounded-full btn-grad"></div></div>
        </div>

        <div data-depth="40" class="layer absolute left-[2%] top-[14%] hidden rounded-2xl sm:block border border-line bg-panel px-3 py-2 sm:left-[6%] sm:top-[10%] sm:px-4 sm:py-3 shadow-xl">
          <div class="font-display text-2xl font-bold grad-text">~10s</div>
          <div class="text-[11px] text-subtle">/ product</div>
        </div>
      </div>
    </div>
    <div class="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
      <div class="scroll-hint h-10 w-6 rounded-full border border-line p-1"><div class="h-2 w-full rounded-full bg-muted"></div></div>
    </div>
  </section>`;
}

function stats(t) {
  return `
  <section class="px-4 pt-4 sm:px-6">
    <div class="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      ${t.stats.map((s) => `
        <div class="card reveal p-4 sm:p-6">
          <div class="font-display text-[1.75rem] font-bold text-fg sm:text-4xl">${s.p || ''}<span class="counter" data-to="${s.n}">0</span>${s.s}</div>
          <p class="mt-1.5 text-[13px] leading-snug text-muted sm:text-sm">${s.l}</p>
        </div>`).join('')}
    </div>
  </section>`;
}

function bring(t) {
  return `
  <section id="about" class="px-4 py-12 sm:px-6 sm:py-16">
    <div class="mx-auto max-w-6xl">
      <p class="reveal text-xs uppercase sm:text-sm tracking-widest text-subtle">${t.bring.stack}</p>
    </div>
    <div class="relative mt-5 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div class="marquee flex w-max gap-3">
        ${[...stack, ...stack].map(([n, i]) => `<span class="chip inline-flex items-center gap-2 whitespace-nowrap !bg-panel !px-5 !py-2.5 !text-sm">${i}${n}</span>`).join('')}
      </div>
    </div>
  </section>`;
}

function projectCard(p, t, i) {
  const L = t.projects.labels;
  return `
  <article class="project card group flex flex-col overflow-hidden" data-cat="${p.cat}">
    ${p.imgs ? `
      <button class="open-gallery relative block aspect-[3/2] overflow-hidden bg-black/40" data-i="${i}" aria-label="${p.title}">
        <img src="${p.imgs[0]}" alt="${p.title}" loading="lazy" class="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105" />
        ${p.imgs.length > 1 ? `<span class="chip absolute right-3 top-3 !bg-black/60 !text-white">+${p.imgs.length - 1}</span>` : ''}
      </button>` : `
      <div class="relative flex aspect-[3/2] items-center justify-center overflow-hidden bg-gradient-to-br from-accent/30 via-panel to-cyan/20">
        <div class="grid-bg absolute inset-0"></div>
        <span class="relative font-display text-2xl font-bold text-fg/90 px-6 text-center">${p.metric || p.title}</span>
      </div>`}
    <div class="flex flex-1 flex-col p-5 sm:p-6">
      <div class="flex flex-col-reverse items-start gap-2 sm:flex-row sm:justify-between sm:gap-3">
        <h3 class="font-display text-xl font-semibold text-fg">${p.title}</h3>
        ${p.metric ? `<span class="shrink-0 rounded-full bg-lime/10 px-2.5 py-1 text-xs font-medium text-lime">${p.metric}</span>` : ''}
      </div>
      <p class="mt-1 text-sm text-subtle">${L.role}: ${p.role}</p>
      <dl class="mt-4 space-y-3 text-sm leading-relaxed">
        ${['problem', 'solution', 'result'].map((k) => `<div><dt class="text-xs font-semibold uppercase tracking-wider ${k === 'result' ? 'text-cyan' : 'text-subtle'}">${L[k]}</dt><dd class="mt-0.5 text-fg2">${p[k]}</dd></div>`).join('')}
      </dl>
      <div class="mt-auto flex flex-wrap gap-1.5 pt-5">${p.tags.map((x) => `<span class="chip">${x}</span>`).join('')}</div>
    </div>
  </article>`;
}

function projects(t) {
  const f = t.projects.filters;
  return `
  <section id="projects" class="px-4 py-20 sm:px-6 sm:py-28">
    <div class="mx-auto max-w-6xl">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 class="section-title reveal">${t.projects.title}</h2>
          <p class="reveal mt-3 text-muted">${t.projects.sub}</p>
        </div>
        <div class="reveal flex w-full gap-1 self-start overflow-x-auto rounded-full border border-line bg-fg/5 p-1 text-sm sm:w-auto">
          ${Object.entries(f).map(([k, v]) => `<button class="filter-btn flex-1 whitespace-nowrap rounded-full px-4 py-2 text-fg2 transition sm:flex-none" data-f="${k}" aria-pressed="${filter === k}">${v}</button>`).join('')}
        </div>
      </div>
      <div id="project-grid" class="mt-10 grid gap-4 sm:mt-12 sm:gap-5 md:grid-cols-2">
        ${t.projects.items.map((p, i) => projectCard(p, t, i)).join('')}
      </div>
    </div>
  </section>`;
}

function work(t) {
  const w = t.work;
  return `
  <section id="services" class="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28">
    <div class="blob h-96 w-96 bg-accent left-1/2 top-1/3 -translate-x-1/2 !opacity-20"></div>
    <div class="relative mx-auto max-w-6xl">
      <h2 class="section-title reveal">${w.title}</h2>
      <p class="reveal mt-3 text-muted">${w.sub}</p>
      <div class="mt-10 grid gap-4 sm:mt-12 md:grid-cols-2 lg:grid-cols-3">
        ${w.items.map(([h, best, get, hire]) => `
          <div class="card reveal flex flex-col p-5 sm:p-6 ${hire ? 'relative overflow-hidden !border-accent/40 lg:row-span-2' : ''}">
            ${hire ? `<div class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl"></div><span class="relative mb-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-lime/15 px-2.5 py-1 text-xs font-medium text-lime"><i class="h-1.5 w-1.5 rounded-full bg-lime"></i>${t.hero.badge}</span>` : ''}
            <h3 class="relative font-display text-lg font-semibold text-fg ${hire ? 'sm:text-2xl' : ''}">${h}</h3>
            <p class="relative mt-3 text-xs font-semibold uppercase tracking-wider text-subtle">${w.best}</p>
            <p class="relative mt-1 text-sm leading-relaxed text-fg2">${best}</p>
            <p class="relative mt-3 text-xs font-semibold uppercase tracking-wider text-cyan">${w.get}</p>
            <p class="relative mt-1 text-sm leading-relaxed text-muted">${get}</p>
            ${hire ? `<a href="#contact" class="btn btn-grad relative mt-auto w-fit rounded-full px-5 py-2.5 text-sm font-medium max-lg:mt-6">${t.hero.cta2} →</a>` : ''}
          </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function experience(t) {
  return `
  <section id="experience" class="px-4 py-20 sm:px-6 sm:py-28">
    <div class="mx-auto grid max-w-6xl gap-20 lg:gap-16 lg:grid-cols-[1.4fr_1fr]">
      <div>
        <h2 class="section-title reveal">${t.exp.title}</h2>
        <ol class="relative mt-10 ml-1.5 border-l sm:mt-12 border-line pl-8">
          <div id="timeline-bar" class="absolute -left-px top-0 w-px origin-top bg-gradient-to-b from-accent to-cyan" style="height:100%;transform:scaleY(0)"></div>
          ${t.exp.items.map(([r, c, d, x], i) => `
            <li class="reveal relative pb-12 last:pb-0">
              <span class="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 ${i === 0 ? 'border-lime bg-lime' : 'border-accent bg-ink'}"></span>
              <p class="text-sm text-subtle">${d}</p>
              <h3 class="mt-1 font-display text-xl font-semibold text-fg">${r}</h3>
              <p class="text-accent">${c}</p>
              <p class="mt-2 leading-relaxed text-muted">${x}</p>
            </li>`).join('')}
        </ol>
      </div>
      <div>
        <h2 class="section-title reveal">${t.edu.title}</h2>
        <div class="mt-10 space-y-4 sm:mt-12">
          ${t.edu.items.map(([h, s, g]) => `
            <div class="card reveal p-5 sm:p-6">
              <h3 class="font-display text-lg font-semibold text-fg">${h}</h3>
              <p class="mt-1 text-sm text-subtle">${s}</p>
              <p class="mt-3 text-sm text-lime">${g}</p>
            </div>`).join('')}
        </div>
        <div class="card reveal mt-4 p-6 sm:p-8">
          <p class="text-sm uppercase tracking-widest text-subtle">${t.think.title}</p>
          <p class="mt-4 font-display text-2xl font-semibold leading-snug text-fg">“${t.think.quote}”</p>
          <p class="mt-4 text-muted">${t.think.body}</p>
        </div>
      </div>
    </div>
  </section>`;
}

function contact(t) {
  return `
  <section id="contact" class="px-4 pb-10 sm:px-6 sm:pb-12">
    <div class="reveal relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-accent/25 via-panel to-cyan/15 px-5 py-12 text-center sm:p-16">
      <div class="grid-bg absolute inset-0"></div>
      <div class="relative">
        <h2 class="font-display text-[2.5rem] font-bold leading-tight text-fg sm:text-6xl">${t.contact.title}</h2>
        <p class="mx-auto mt-5 max-w-xl text-fg2">${t.contact.body}</p>
        <p class="mt-3 text-sm font-medium text-accent sm:hidden">${EMAIL}</p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="mailto:${EMAIL}" class="btn btn-grad w-full rounded-full px-7 py-3.5 font-medium sm:w-auto">${t.contact.email}<span class="hidden sm:inline"> · ${EMAIL}</span></a>
          <a href="${LINKEDIN}" target="_blank" rel="noopener" class="btn w-full rounded-full border border-line bg-fg/5 px-7 py-3.5 font-medium text-fg sm:w-auto">LinkedIn ↗</a>
        </div>
      </div>
    </div>
    <footer class="mx-auto mt-10 max-w-6xl text-center text-sm text-subtle">© ${new Date().getFullYear()} ${t.footer}</footer>
  </section>`;
}

const toTop = () => `
  <a href="#top" id="to-top" class="btn btn-grad pointer-events-none fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full opacity-0 transition-opacity duration-300" aria-label="Back to top">
    <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 15V3M3.5 8.5 9 3l5.5 5.5"/></svg>
  </a>`;

const lightbox = () => `
  <div id="lightbox" class="fixed inset-0 z-50 hidden items-center justify-center bg-black/85 p-4 backdrop-blur" role="dialog" aria-modal="true">
    <button id="lb-close" class="absolute right-4 top-4 rounded-full bg-fg/10 px-4 py-2 text-white" aria-label="Close">✕</button>
    <button id="lb-prev" class="absolute left-2 rounded-full bg-fg/10 px-4 py-3 text-white sm:left-6" aria-label="Previous">‹</button>
    <img id="lb-img" class="max-h-[85vh] max-w-full rounded-xl shadow-2xl" alt="" />
    <button id="lb-next" class="absolute right-2 rounded-full bg-fg/10 px-4 py-3 text-white sm:right-6" aria-label="Next">›</button>
  </div>`;

function render() {
  const t = content;
  app.innerHTML = nav(t) + `<main>${hero(t)}${bring(t)}${projects(t)}${work(t)}${experience(t)}${contact(t)}</main>` + toTop() + lightbox();
  bind(t);
  animateIn();
  applyFilter(false);
}

/* ---------- interactions ---------- */
function bind(t) {
  document.getElementById('theme-btn').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  });

  const menu = document.getElementById('mobile-menu');
  document.getElementById('menu-btn').addEventListener('click', () => {
    const open = menu.classList.toggle('hidden') === false;
    menu.classList.toggle('flex', open);
    if (open) animate(menu.children, { opacity: [0, 1], y: [-8, 0] }, { delay: stagger(0.05) });
  });
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));

  // Motion springs for buttons + cards
  hover('.btn', (el) => {
    animate(el, { scale: 1.04 }, { type: 'spring', stiffness: 400, damping: 20 });
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 400, damping: 20 });
  });
  press('.btn, .filter-btn', (el) => {
    animate(el, { scale: 0.95 }, { duration: 0.1 });
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 500 });
  });
  if (matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.tilt, .project').forEach((el) => {
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
        animate(el, { rotateX: -y * 5, rotateY: x * 5, transformPerspective: 900 }, { duration: 0.3 });
      });
      el.addEventListener('pointerleave', () => animate(el, { rotateX: 0, rotateY: 0 }, { type: 'spring', stiffness: 200, damping: 15 }));
    });
  }

  document.querySelectorAll('.filter-btn').forEach((b) =>
    b.addEventListener('click', () => {
      filter = b.dataset.f;
      document.querySelectorAll('.filter-btn').forEach((x) => x.setAttribute('aria-pressed', x === b));
      applyFilter(true);
    })
  );

  // Lightbox
  const lb = document.getElementById('lightbox'), lbImg = document.getElementById('lb-img');
  let imgs = [], idx = 0;
  const show = () => { lbImg.src = imgs[idx]; animate(lbImg, { opacity: [0, 1], scale: [0.96, 1] }, { duration: 0.3 }); };
  const close = () => animate(lb, { opacity: 0 }, { duration: 0.2 }).then(() => { lb.classList.replace('flex', 'hidden'); document.body.style.overflow = ''; });
  document.querySelectorAll('.open-gallery').forEach((b) =>
    b.addEventListener('click', () => {
      imgs = t.projects.items[b.dataset.i].imgs; idx = 0;
      lb.classList.replace('hidden', 'flex'); document.body.style.overflow = 'hidden';
      ['lb-prev', 'lb-next'].forEach((id) => (document.getElementById(id).style.display = imgs.length > 1 ? '' : 'none'));
      animate(lb, { opacity: [0, 1] }, { duration: 0.25 }); show();
    })
  );
  document.getElementById('lb-close').onclick = close;
  lb.onclick = (e) => e.target === lb && close();
  document.getElementById('lb-prev').onclick = () => { idx = (idx - 1 + imgs.length) % imgs.length; show(); };
  document.getElementById('lb-next').onclick = () => { idx = (idx + 1) % imgs.length; show(); };
  document.onkeydown = (e) => { if (lb.classList.contains('flex') && e.key === 'Escape') close(); };
}

function applyFilter(animated) {
  const cards = [...document.querySelectorAll('.project')];
  const visible = cards.filter((c) => filter === 'all' || c.dataset.cat === filter);
  cards.forEach((c) => (c.style.display = visible.includes(c) ? '' : 'none'));
  if (animated) {
    animate(visible, { opacity: [0, 1], y: [24, 0], scale: [0.97, 1] }, { delay: stagger(0.06), type: 'spring', stiffness: 220, damping: 24 });
    ScrollTrigger.refresh();
  }
}

/* ---------- hero visual ---------- */
function heroVisual() {
  gsap.from('.hero-visual .layer', { y: 60, opacity: 0, scale: 0.92, duration: 1.2, ease: 'expo.out', stagger: 0.15, delay: 0.4 });
  gsap.from('.orbit-ring', { scale: 0.6, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.2 });
  gsap.to('.orbit-ring', { rotate: 360, duration: 60, ease: 'none', repeat: -1 });
  gsap.to('.orbit-item', { rotate: -360, duration: 60, ease: 'none', repeat: -1 });
  gsap.to('.hero-visual .layer', { y: '+=10', duration: 3, ease: 'sine.inOut', yoyo: true, repeat: -1, stagger: 0.6 });

  // agent log loop
  const lines = gsap.utils.toArray('.log-line'), dots = gsap.utils.toArray('.log-dot');
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.8, delay: 1.2 });
  tl.set(lines, { opacity: 0.25 }).set(dots, { textContent: '', backgroundColor: 'transparent', color: 'inherit' }).set('#log-bar', { width: '0%' });
  lines.forEach((l, k) => {
    tl.to(l, { opacity: 1, x: 0, duration: 0.25, ease: 'power2.out' })
      .to('#log-bar', { width: `${((k + 1) / lines.length) * 100}%`, duration: 0.6, ease: 'power2.inOut' }, '<')
      .set(dots[k], { textContent: '✓', backgroundColor: 'var(--lime)', color: '#fff', borderColor: 'transparent' }, '+=0.35');
  });

  // rotating word
  const word = document.getElementById('word'), words = content.hero.words;
  let w = 0;
  gsap.timeline({ repeat: -1, delay: 2 }).to({}, { duration: 2.2 }).add(() => {
    gsap.to(word, { yPercent: -110, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => {
      w = (w + 1) % words.length; word.textContent = words[w];
      gsap.fromTo(word, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    } });
  });

  // pointer parallax (Motion)
  const vis = document.getElementById('hero-visual');
  if (matchMedia('(hover: hover)').matches) {
    vis.closest('section').addEventListener('pointermove', (e) => {
      const x = e.clientX / innerWidth - 0.5, y = e.clientY / innerHeight - 0.5;
      vis.querySelectorAll('[data-depth]').forEach((el) => {
        const d = +el.dataset.depth;
        animate(el, { translate: `${-x * d}px ${-y * d}px` }, { duration: 0.6, ease: 'easeOut' });
      });
    });
  }
}

/* ---------- GSAP scroll choreography ---------- */
function animateIn() {
  if (reduced) { gsap.set('.counter', { textContent: (i, el) => (+el.dataset.to).toLocaleString() }); gsap.set('#timeline-bar', { scaleY: 1 }); return; }

  gsap.timeline({ defaults: { ease: 'power4.out' } })
    .from('.hero-char', { yPercent: 110, opacity: 0, rotate: 8, duration: 1, stagger: 0.04 })
    .from('.hero-in', { y: 30, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.7');
  gsap.to('.hero-blob', { x: 'random(-60,60)', y: 'random(-40,40)', duration: 6, repeat: -1, yoyo: true, ease: 'sine.inOut', stagger: 1 });
  gsap.to('.scroll-hint div', { y: 18, opacity: 0, duration: 1.4, repeat: -1, ease: 'power2.in' });
  heroVisual();
  gsap.to('#hero-content', { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '#top', start: 'top top', end: 'bottom top', scrub: true } });

  ScrollTrigger.batch('.reveal', {
    start: 'top 88%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.08 }),
  });
  gsap.set('.reveal', { opacity: 0 });

  ScrollTrigger.batch('.project', {
    start: 'top 90%', once: true,
    onEnter: (els) => gsap.fromTo(els, { y: 60, opacity: 0, clipPath: 'inset(10% 0 0 0 round 16px)' }, { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0 round 16px)', duration: 1, ease: 'expo.out', stagger: 0.1 }),
  });

  document.querySelectorAll('.counter').forEach((el) => {
    const o = { v: 0 };
    gsap.to(o, { v: +el.dataset.to, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(o.v).toLocaleString()) });
  });

  gsap.to('#timeline-bar', { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '#experience ol', start: 'top 70%', end: 'bottom 60%', scrub: true } });
}

/* ---------- global ---------- */
const glow = document.getElementById('cursor-glow');
addEventListener('pointermove', (e) => { glow.style.setProperty('--x', e.clientX + 'px'); glow.style.setProperty('--y', e.clientY + 'px'); });
addEventListener('scroll', () => {
  const inner = document.getElementById('nav-inner');
  if (inner) inner.classList.toggle('scrolled', scrollY > 40);
  inner?.classList.toggle('bg-panel/80', scrollY > 40);
  inner?.classList.toggle('backdrop-blur', scrollY > 40);
  inner?.classList.toggle('!border-line', scrollY > 40);
  const top = document.getElementById('to-top');
  top?.classList.toggle('opacity-0', scrollY < 600);
  top?.classList.toggle('pointer-events-none', scrollY < 600);
}, { passive: true });

render();
