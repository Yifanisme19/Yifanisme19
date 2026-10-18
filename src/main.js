import './site.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { animate, hover, press } from 'motion';
import { projects, filterKeys } from './data/projects.js';
import { roleNumerals } from './data/experience.js';
import { languages, getLang, locale, t, setLang, applyStatic } from './i18n/index.js';
import { createZen } from './audio.js';
import { buildZenDividers } from './zen.js';
import { createLightbox } from './lightbox.js';

gsap.registerPlugin(ScrollTrigger, SplitText);
document.documentElement.classList.add('js');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const numerals = ['壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾', '拾壹'];
let lenis = null;
let activeFilter = 'all';
let openId = null;

/* ---------- marquee (language independent) ---------- */
const techs = [
  ['PHP', 'logo-php.svg'], ['Laravel', 'logo-laravel.svg'], ['MySQL', 'logo-mysql.svg'], ['MariaDB', 'logo-mariadb.svg'],
  ['JavaScript', 'logo-javascript.svg'], ['Flutter', 'logo-flutter.svg'], ['WordPress', 'logo-wordpress.svg'],
  ['OpenClaw', 'openclaw-lobster.svg'], ['ChatGPT', 'logo-openai.svg'], ['Claude', 'logo-claude.svg'],
];
const marqueeSet = techs.map(([n, f]) => `<span class="marquee-item"><img src="/assets/${f}" alt="" width="24" height="24">${n}</span>`).join('');
$('#marquee').innerHTML = marqueeSet + marqueeSet;

/* ---------- language-dependent rendering ---------- */
const text = (p) => locale().projects[p.id];       // translated copy for a project
const big = (p) => text(p).metricBig ?? p.big;     // impact figure (some are words)

function renderRows() {
  $('#rows').innerHTML = projects.map((p) => {
    const c = text(p);
    const [kind, ...rest] = c.meta.split(' · ');
    return `<button class="row" data-id="${p.id}" data-cat="${p.cat.join(' ')}" aria-haspopup="dialog">
      <span class="row-n" aria-hidden="true"></span>
      <span class="row-main"><h4>${esc(c.short || c.title)}</h4><p>${esc(c.summary)}</p></span>
      <span class="row-meta"><span>${esc(kind)}</span>${esc(rest.concat(p.tags.slice(0, 2)).join(' · '))}</span>
      <span class="row-go" aria-hidden="true">↗</span>
    </button>`;
  }).join('');
  applyFilter(activeFilter, false);
}

const tabs = $('#tabs');
const pill = document.createElement('span');
pill.className = 'tab-pill';
function renderTabs() {
  tabs.innerHTML = filterKeys.map((k) => `<button class="tab" role="tab" data-f="${k}" aria-selected="${k === activeFilter}">${esc(t('filters.' + k))}</button>`).join('');
  tabs.prepend(pill);
  movePill(true);
}
function movePill(instant) {
  const el = $('.tab[aria-selected="true"]', tabs); if (!el) return;
  const to = { x: el.offsetLeft, width: el.offsetWidth };
  if (instant || reduce) Object.assign(pill.style, { transform: `translateX(${to.x}px)`, width: to.width + 'px' });
  else animate(pill, { x: to.x, width: to.width }, { type: 'spring', stiffness: 380, damping: 32 });
}
function applyFilter(key, animateIn) {
  activeFilter = key;
  let n = 0;
  $$('.row').forEach((r) => {
    const show = key === 'all' || r.dataset.cat.split(' ').includes(key);
    r.hidden = !show;
    if (show) {
      $('.row-n', r).textContent = numerals[n++];
      if (animateIn && !reduce) animate(r, { opacity: [0, 1], y: [12, 0] }, { duration: .4, delay: n * .04, ease: 'easeOut' });
    }
  });
  ScrollTrigger.refresh();
}
tabs.addEventListener('click', (e) => {
  const b = e.target.closest('.tab'); if (!b) return;
  $$('.tab', tabs).forEach((x) => x.setAttribute('aria-selected', x === b));
  movePill();
  applyFilter(b.dataset.f, true);
});

function renderLists() {
  const L = locale();
  $('#roles').innerHTML = L.experience.map((r, i) => `
    <li class="role"><div><span class="role-n" aria-hidden="true">${roleNumerals[L.experience.length - 1 - i]}</span><span class="role-period">${esc(r.period)}</span></div>
      <div><h3>${esc(r.title)}</h3><p class="role-co">${esc(r.company)}</p><p>${esc(r.summary)}</p>
      <ul>${r.wins.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div></li>`).join('');
  $('#skills').innerHTML = L.skills.map((g, i) => `
    <div class="skill-group"><h4><b>0${i + 1}</b>${esc(g.group)}</h4>
      ${g.items.map(([s, w]) => `<div class="skill"><b>${esc(s)}</b><span>${esc(w)}</span></div>`).join('')}</div>`).join('');
  $('#edu').innerHTML = L.education.map((e) => `
    <div class="edu-card"><span class="period">${esc(e.period)} · ${esc(e.level)}</span><h4>${esc(e.name)}</h4>
      <p>${esc(e.school)}</p><div class="cgpa"><b>${e.cgpa}</b><span>${esc(t('misc.cgpa'))} · ${esc(e.honours)}</span></div></div>`).join('');
}

/* ---------- mobile menu ---------- */
const menuBtn = $('#menu-btn'), menu = $('#mobile-menu');
async function setMenu(open) {
  if (open === !menu.hidden) return;
  menuBtn.setAttribute('aria-expanded', open);
  if (open) {
    menu.hidden = false;
    if (!reduce) animate(menu, { opacity: [0, 1], y: [-10, 0] }, { duration: .3, ease: 'easeOut' });
  } else {
    if (!reduce) await animate(menu, { opacity: 0, y: -10 }, { duration: .2 }).finished;
    menu.hidden = true; menu.removeAttribute('style');
  }
}
menuBtn.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
addEventListener('pointerdown', (e) => { if (!menu.hidden && !e.target.closest('#mobile-menu, #menu-btn')) setMenu(false); });
matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });

/* ---------- language switcher ---------- */
function renderLang() {
  $('#lang').innerHTML = languages.map((l) => `<button type="button" data-lang="${l.code}" lang="${l.code}" aria-pressed="${l.code === getLang()}">${l.label}</button>`).join('');
}
$('#lang').addEventListener('click', (e) => {
  const b = e.target.closest('[data-lang]'); if (!b || !setLang(b.dataset.lang)) return;
  switchLanguage();
});

/* ---------- case-study sheet ---------- */
const modal = $('#modal'), panel = $('.modal-panel', modal);
panel.setAttribute('data-lenis-prevent', ''); // the sheet scrolls natively while Lenis drives the page
let lastRow = null;

const sec = (h, body, cls = '') => body ? `<div class="sec ${cls}"><h5>${h}</h5>${body}</div>` : '';
function modalHTML(p) {
  const c = text(p), m = t('modal');
  const n = String(projects.indexOf(p) + 1).padStart(2, '0');
  const dl = (k, v) => v ? `<div><dt>${k}</dt><dd>${v}</dd></div>` : '';
  return `
  <div class="sheet-head"><span>${esc(m.label.replace('{n}', n))}</span><button class="modal-close" data-close>${esc(m.close)}</button></div>
  <h2 class="sheet-title" id="modal-title">${esc(c.title)}</h2>
  <p class="sheet-meta">${esc(c.meta)}</p>
  <p class="sheet-sum">${esc(c.summary)}</p>
  <div class="sheet-grid">
    <dl class="sheet-aside">
      ${p.big ? `<div><dt>${m.impact}</dt><dd><div class="big">${esc(big(p))}</div><div class="big-note">${esc(c.metricText || '')}</div></dd></div>` : ''}
      ${dl(m.role, c.role && esc(c.role))}${dl(m.scale, c.scale && esc(c.scale))}${dl(m.output, c.output && esc(c.output))}
      ${c.flow ? dl(m.flow, esc(c.flow.join(' → '))) : ''}
      ${dl(m.stack, `<div class="tags">${p.tags.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`)}
    </dl>
    <div class="cs">
      ${c.intro ? sec(esc(c.intro.q), `<p>${esc(c.intro.a)}</p>`, 'note') : ''}
      ${sec(c.myRole ? m.problem : m.idea, `<p>${esc(c.problem)}</p>`)}
      ${sec(m.myRole, c.myRole && `<p>${esc(c.myRole)}</p>`)}
      ${sec(m.how, c.how && `<ol class="steps">${c.how.map(([a, b]) => `<li><span><strong>${esc(a)}:</strong> ${esc(b)}</span></li>`).join('')}</ol>`)}
      ${sec(m.built, c.built && `<ul>${c.built.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>`)}
      ${c.note ? sec(esc(c.note.q), `<p>${esc(c.note.a)}</p>`, 'note') : ''}
      ${sec(m.result, c.result && `<p>${esc(c.result)}</p>`, 'result')}
      ${sec(m.tech, c.tech && `<p>${esc(c.tech)}</p>`)}
      ${sec(m.screens, p.images.length && `<div class="shots${p.images.length > 1 ? ' multi' : ''}">${p.images.map((src, i) => `<figure><a class="shot" href="${src}" data-shot data-caption="${esc(c.captions[i])}"><img src="${src}" alt="${esc(c.captions[i])}" loading="lazy"><span class="zoom" aria-hidden="true"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5M10.5 8v5M8 10.5h5"/></svg></span></a><figcaption>${esc(c.captions[i])}</figcaption></figure>`).join('')}</div>`)}
    </div>
  </div>`;
}
function openModal(row) {
  const p = projects.find((x) => x.id === row.dataset.id); if (!p) return;
  lastRow = row; openId = p.id;
  panel.innerHTML = modalHTML(p);
  modal.hidden = false;
  document.body.classList.add('modal-open');
  lenis?.stop();
  panel.scrollTop = 0;
  panel.focus({ preventScroll: true });
  if (reduce) return;
  animate($('.modal-backdrop', modal), { opacity: [0, 1] }, { duration: .3 });
  animate(panel, { x: ['100%', 0] }, { type: 'spring', stiffness: 220, damping: 30 });
  animate($$('.sheet-title, .sheet-meta, .sheet-sum, .sec', panel), { opacity: [0, 1], y: [14, 0] }, { delay: (i) => .15 + i * .04, duration: .5 });
}
async function closeModal() {
  if (modal.hidden) return;
  if (!reduce) {
    animate($('.modal-backdrop', modal), { opacity: 0 }, { duration: .25 });
    await animate(panel, { x: '100%' }, { duration: .3, ease: [.4, 0, 1, 1] }).finished;
  }
  modal.hidden = true; openId = null;
  panel.removeAttribute('style');
  document.body.classList.remove('modal-open');
  lenis?.start();
  lastRow?.focus({ preventScroll: true });
}
$('#rows').addEventListener('click', (e) => { const r = e.target.closest('.row'); if (r) openModal(r); });
modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
// click a screenshot to preview it full-size (Fancybox), as a gallery of the project's screens
const lightbox = createLightbox(() => t('lightbox'), reduce);
panel.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-shot]'); if (!a) return;
  e.preventDefault();
  const all = $$('a[data-shot]', panel);
  lightbox.open(all.map((el) => ({ src: el.href, caption: el.dataset.caption })), all.indexOf(a), a);
});
const previewOpen = () => lightbox.isOpen();
addEventListener('keydown', (e) => {
  if (modal.hidden || previewOpen()) return; // the image preview handles its own Esc and Tab
  if (e.key === 'Escape') closeModal();
  if (e.key === 'Tab') { // keep focus inside the sheet
    const f = $$('button, a[href]', panel); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

/* ---------- headline splitting (re-done after a language change) ---------- */
let splits = [];
function splitHeadlines(intro) {
  splits.forEach((s) => s.revert());
  splits = [];
  const showUnderline = () => $$('.hero-title em').forEach((e) => e.style.setProperty('--u', 1));
  if (reduce) { showUnderline(); return; }
  $$('[data-split]').forEach((el) => {
    const hero = !!el.closest('.hero');
    splits.push(SplitText.create(el, {
      type: hero ? 'lines,chars' : 'lines', mask: 'lines', autoSplit: true,
      onSplit: (self) => {
        if (!intro) { if (hero) showUnderline(); return null; }
        if (!hero) return gsap.from(self.lines, { yPercent: 110, duration: 1, ease: 'power4.out', stagger: .1, scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
        // hero: each character settles like ink soaking into paper, then a brush stroke underlines the accent line
        const tl = gsap.timeline({ delay: .25 });
        tl.from(self.chars, { yPercent: 55, opacity: 0, filter: 'blur(12px)', duration: 1.1, ease: 'power3.out', stagger: { each: .028, ease: 'power1.in' } })
          .to($$('em', el), { '--u': 1, duration: 1, ease: 'power2.inOut' }, '-=.5');
        return tl;
      },
    }));
  });
}

function renderAll() {
  applyStatic();
  renderLang();
  renderTabs();
  renderRows();
  renderLists();
  if (openId && !modal.hidden) panel.innerHTML = modalHTML(projects.find((p) => p.id === openId));
}
function switchLanguage() {
  syncSoundLabel();
  splits.forEach((x) => x.revert()); splits = []; // restore plain markup before the text is replaced
  renderAll();
  splitHeadlines(false);
  gsap.set('.role, .skill-group, .edu-card, .row', { clearProps: 'opacity,transform' });
  document.fonts.ready.then(() => { movePill(true); ScrollTrigger.refresh(); });
}

/* ---------- motion layer ---------- */
function initMotion() {
  if (reduce) { // static page: just the nav state
    ScrollTrigger.create({ start: 24, end: 'max', onToggle: (st) => $('#nav').classList.toggle('scrolled', st.isActive) });
    return;
  }
  lenis = new Lenis({ lerp: .1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  $$('a[href^="#"]').forEach((a) => a.addEventListener('click', (e) => {
    const id = a.getAttribute('href'); const target = id === '#top' ? 0 : $(id);
    if (target === null) return; e.preventDefault(); lenis.scrollTo(target, { offset: id === '#top' ? 0 : -8, duration: 1.2 });
  }));

  splitHeadlines(true);

  // hero: the ink circle is drawn, the character bleeds in, the seal is stamped
  gsap.timeline({ delay: .2 })
    .from('.hero .pill, .hero .lead, .hero-cta .btn', { opacity: 0, y: 18, duration: .8, stagger: .08, ease: 'power3.out' }, .45)
    .fromTo('.enso-stroke', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, .2)
    .from('.hero-kanji', { opacity: 0, scale: 1.12, filter: 'blur(24px)', duration: 1.6, ease: 'power2.out' }, .7)
    .from('.ring', { opacity: 0, duration: 1.4, ease: 'power2.out' }, 1)
    .from('.lobster', { opacity: 0, scale: .6, rotate: -14, duration: 1, ease: 'back.out(2.2)' }, 1.6)
    .fromTo('.seal', { opacity: 0, scale: 1.9, rotate: -14 }, { opacity: 1, scale: 1, rotate: -4, duration: .6, ease: 'back.out(2.4)' }, 1.9);
  gsap.to('.ring', { rotation: 360, svgOrigin: '250 250', duration: 90, repeat: -1, ease: 'none' });
  gsap.to('.lobster', { rotate: 6, duration: 2.6, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 3 });

  // hero: depth parallax following the pointer
  const layers = $$('#hero-visual [data-depth]').map((el) => ({ x: gsap.quickTo(el, 'x', { duration: 1, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1, ease: 'power3' }), d: +el.dataset.depth }));
  addEventListener('pointermove', (e) => {
    const nx = e.clientX / innerWidth - .5, ny = e.clientY / innerHeight - .5;
    layers.forEach((l) => { l.x(-nx * l.d); l.y(-ny * l.d); });
  });

  // zen: the ink circle breathes; raked lines are drawn as the stones come into view
  gsap.to('.enso', { scale: 1.02, transformOrigin: '50% 50%', duration: 5, repeat: -1, yoyo: true, ease: 'sine.inOut' });
  $$('.zen-divider').forEach((d) => {
    const st = { trigger: d, start: 'top 88%', once: true };
    gsap.from($$('.dz-lines path', d), { opacity: 0, y: 6, duration: 1.4, stagger: .07, ease: 'power2.out', scrollTrigger: st });
    gsap.from($$('.dz-rings ellipse', d), { opacity: 0, scale: .6, duration: 1.6, stagger: .09, ease: 'power3.out', scrollTrigger: st });
    gsap.from($$('.dz-stone', d), { opacity: 0, y: -22, duration: 1.1, stagger: .16, ease: 'bounce.out', scrollTrigger: st });
    gsap.from($$('.dz-seal', d), { opacity: 0, scale: 1.8, rotate: -14, duration: .6, delay: .9, ease: 'back.out(2.4)', scrollTrigger: st });
    // the water barely moves: ripples breathe in turn
    $$('.dz-rings', d).forEach((g, i) => gsap.to(g, { scale: 1.035, duration: 4 + i, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * .7 }));
  });

  // marquee
  const track = $('#marquee');
  const loop = gsap.to(track, { xPercent: -50, duration: 32, ease: 'none', repeat: -1 });
  ScrollTrigger.create({ trigger: '.marquee', start: 'top bottom', end: 'bottom top', onUpdate: (s) => gsap.to(loop, { timeScale: 1 + Math.min(Math.abs(s.getVelocity()) / 400, 5), duration: .3, overwrite: true }) });
  track.parentElement.addEventListener('mouseenter', () => gsap.to(loop, { timeScale: .2 }));
  track.parentElement.addEventListener('mouseleave', () => gsap.to(loop, { timeScale: 1 }));

  // section kanji + brush rules
  $$('.kanji').forEach((k) => {
    gsap.fromTo(k, { opacity: 0, filter: 'blur(18px)' }, { opacity: 1, filter: 'blur(0px)', duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: k, start: 'top 90%', once: true } });
    gsap.to(k, { yPercent: -16, ease: 'none', scrollTrigger: { trigger: k.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
  $$('.brush-rule path').forEach((pa) => gsap.fromTo(pa, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.out', scrollTrigger: { trigger: pa, start: 'top 92%', once: true } }));

  // reveals
  const reveal = (sel, y, start, dur) => {
    gsap.set(sel, { opacity: 0, y });
    ScrollTrigger.batch(sel, { start, once: true, onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, stagger: .08, duration: dur, ease: 'power3.out', clearProps: 'opacity,transform' }) });
  };
  reveal('.role, .skill-group, .edu-card', 28, 'top 90%', .8);
  reveal('.row', 24, 'top 94%', .7);

  // ink atmosphere: blobs drift with the scroll, a brush stroke fills as you read
  gsap.to('.ink.i1', { y: -240, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 1.5 } });
  gsap.to('.ink.i3', { y: 320, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 2 } });
  gsap.fromTo('.sb-ink', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: .6 } });

  // nav state
  ScrollTrigger.create({ start: 24, end: 'max', onToggle: (st) => $('#nav').classList.toggle('scrolled', st.isActive) });
  ['work', 'experience', 'about', 'contact'].forEach((id) => {
    ScrollTrigger.create({ trigger: '#' + id, start: 'top 50%', end: 'bottom 50%', onToggle: (s) => $(`.nav-links a[href="#${id}"]`).classList.toggle('active', s.isActive) });
  });
}

/* ---------- micro-interactions (Motion) ---------- */
function initMicro() {
  if (reduce) return;
  // a soft ink drop where you click (purely decorative, never blocks input)
  addEventListener('pointerdown', (e) => {
    if (!modal.hidden || e.button !== 0) return;
    const drop = document.createElement('i');
    drop.className = 'ink-drop';
    drop.style.left = e.clientX + 'px'; drop.style.top = e.clientY + 'px';
    document.body.append(drop);
    animate(drop, { scale: [0.2, 7], opacity: [0.35, 0] }, { duration: 1.1, ease: [.2, .6, .3, 1] }).finished.then(() => drop.remove());
  });
  hover('.row', (el) => {
    const title = $('.row-main', el), go = $('.row-go', el);
    animate(title, { x: 8 }, { type: 'spring', stiffness: 320, damping: 26 });
    animate(go, { rotate: 45 }, { type: 'spring', stiffness: 300, damping: 18 });
    return () => {
      animate(title, { x: 0 }, { type: 'spring', stiffness: 320, damping: 26 });
      animate(go, { rotate: 0 }, { type: 'spring', stiffness: 300, damping: 22 });
    };
  });
  press('.btn, .tab, .row, .lang button', (el) => {
    animate(el, { scale: .98 }, { duration: .12 });
    return () => animate(el, { scale: 1 }, { type: 'spring', stiffness: 400, damping: 20 });
  });
  if (!matchMedia('(hover: hover)').matches) return; // no pointer-follow effects on touch screens
  $$('.magnetic').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      animate(el, { x: (e.clientX - r.left - r.width / 2) * .22, y: (e.clientY - r.top - r.height / 2) * .3 }, { type: 'spring', stiffness: 200, damping: 15 });
    });
    el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 200, damping: 12 }));
  });
}

const zen = createZen();
const soundBtn = $('#sound');
const wantsSound = () => { try { return localStorage.getItem('sound') !== 'off'; } catch { return true; } };
const rememberSound = (v) => { try { localStorage.setItem('sound', v ? 'on' : 'off'); } catch { /* ignore */ } };
const soundUI = (state) => { soundBtn.setAttribute('aria-pressed', state === 'on'); soundBtn.classList.toggle('waiting', state === 'waiting'); };
async function startSound() { const ok = await zen.start(); soundUI(ok ? 'on' : 'waiting'); return ok; }
// Sound is on by default. Browsers only allow audio after a first interaction, so if the
// automatic start is blocked we wait for the first click, tap or key press anywhere.
function armFirstGesture() {
  const go = (e) => {
    if (e.target.closest?.('#sound')) return;
    ['pointerdown', 'keydown', 'touchend'].forEach((ev) => removeEventListener(ev, go, true));
    if (wantsSound()) startSound();
  };
  ['pointerdown', 'keydown', 'touchend'].forEach((ev) => addEventListener(ev, go, { capture: true }));
}
soundBtn.addEventListener('click', async () => {
  if (zen.isOn()) { zen.stop(); rememberSound(false); soundUI('off'); return; }
  rememberSound(true);
  await startSound();
});
if (wantsSound()) { soundUI('waiting'); startSound().then((ok) => { if (!ok) armFirstGesture(); }); }
// back to top: appears after the first screen, ring shows how far you have read
const toTopWrap = $('#to-top-wrap'), toTop = $('#to-top');
let ticking = false;
function syncToTop() {
  ticking = false;
  const max = document.documentElement.scrollHeight - innerHeight, y = scrollY;
  toTop.style.setProperty('--p', max > 0 ? (1 - Math.min(1, y / max)).toFixed(3) : 1);
  const show = y > innerHeight * 0.6;
  toTopWrap.classList.toggle('on', show);
  toTop.tabIndex = show ? 0 : -1;
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(syncToTop); } }, { passive: true });
addEventListener('resize', syncToTop);
toTop.addEventListener('click', () => {
  if (lenis && !reduce) lenis.scrollTo(0, { duration: 1.4 });
  else scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
});
syncToTop();

function syncSoundLabel() { $('#sound').title = t('misc.sound'); }

buildZenDividers();
renderAll();
syncSoundLabel();
document.fonts.ready.then(() => {
  movePill(true);
  initMotion();
  initMicro();
  ScrollTrigger.refresh();
});
