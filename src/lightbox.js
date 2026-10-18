import { animate } from 'motion';

// Our own image preview: gallery, swipe, click-to-zoom with drag-to-pan, keyboard, focus trap.
const icon = {
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  prev: '<path d="M15 5l-7 7 7 7"/>',
  next: '<path d="M9 5l7 7-7 7"/>',
  zoomIn: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5M10.5 8v5M8 10.5h5"/>',
  zoomOut: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5M8 10.5h5"/>',
};
const svg = (name) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icon[name]}</svg>`;

export function createLightbox(getLabels, reduce) {
  let root, img, capEl, countEl, thumbsEl, btnZoom, btnPrev, btnNext, btnClose, stage;
  let items = [], index = 0, openState = false, origin = null;
  let zoom = 1, tx = 0, ty = 0, drag = null;
  const ZOOM = 2.4;

  function build() {
    root = document.createElement('div');
    root.className = 'lb'; root.hidden = true;
    root.setAttribute('role', 'dialog'); root.setAttribute('aria-modal', 'true');
    root.setAttribute('data-lenis-prevent', '');
    root.innerHTML = `
      <div class="lb-backdrop" data-lb-close></div>
      <div class="lb-top"><span class="lb-count" aria-live="polite"></span>
        <div class="lb-actions"><button type="button" class="lb-btn" data-lb="zoom"></button><button type="button" class="lb-btn" data-lb="close"></button></div></div>
      <div class="lb-stage"><button type="button" class="lb-btn lb-nav lb-prev" data-lb="prev"></button>
        <img class="lb-img" alt="" draggable="false"><button type="button" class="lb-btn lb-nav lb-next" data-lb="next"></button></div>
      <div class="lb-foot"><p class="lb-caption"></p><div class="lb-thumbs"></div></div>`;
    document.body.append(root);
    img = root.querySelector('.lb-img'); stage = root.querySelector('.lb-stage');
    capEl = root.querySelector('.lb-caption'); countEl = root.querySelector('.lb-count'); thumbsEl = root.querySelector('.lb-thumbs');
    btnZoom = root.querySelector('[data-lb=zoom]'); btnClose = root.querySelector('[data-lb=close]');
    btnPrev = root.querySelector('[data-lb=prev]'); btnNext = root.querySelector('[data-lb=next]');

    root.addEventListener('click', (e) => {
      if (e.target.closest('[data-lb-close]') || e.target === stage) return close();
      const b = e.target.closest('[data-lb]'); if (!b) return;
      ({ close, prev: () => go(-1), next: () => go(1), zoom: () => toggleZoom() })[b.dataset.lb]?.();
    });
    thumbsEl.addEventListener('click', (e) => { const t = e.target.closest('[data-i]'); if (t) show(+t.dataset.i, +t.dataset.i > index ? 1 : -1); });

    // pointer: swipe to navigate, click to zoom, drag to pan when zoomed
    img.addEventListener('pointerdown', (e) => { img.setPointerCapture(e.pointerId); drag = { x: e.clientX, y: e.clientY, tx, ty, moved: false }; });
    img.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 6) drag.moved = true;
      if (zoom > 1) { tx = drag.tx + dx; ty = drag.ty + dy; clamp(); paint(); }
      else if (drag.moved) { img.style.transform = `translate(${dx * .5}px, ${Math.max(0, dy) * .5}px)`; }
    });
    img.addEventListener('pointerup', (e) => {
      if (!drag) return;
      const dx = e.clientX - drag.x, dy = e.clientY - drag.y, moved = drag.moved; drag = null;
      if (zoom > 1) { if (!moved) toggleZoom(e); return; }
      if (!moved) return toggleZoom(e);
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) { img.style.transform = ''; go(dx < 0 ? 1 : -1); }
      else if (dy > 100) close();
      else animate(img, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 26 }).finished.then(() => { img.style.transform = ''; });
    });
    img.addEventListener('pointercancel', () => { drag = null; });
    // the wheel only keeps the page behind from scrolling; it must never change the image
    // (leftover scroll momentum from reaching the screenshot used to flip to the next image on open)
    root.addEventListener('wheel', (e) => e.preventDefault(), { passive: false });

    // keyboard (capture phase so Esc closes only the preview, not the case study beneath)
    addEventListener('keydown', (e) => {
      if (!openState) return;
      const k = e.key;
      if (k === 'Escape') { e.stopImmediatePropagation(); e.preventDefault(); close(); }
      else if (k === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (k === 'ArrowLeft') { e.preventDefault(); go(-1); }
      else if (k === '+' || k === '=' || k === '-' || k === '_') { e.preventDefault(); toggleZoom(); }
      else if (k === 'Tab') {
        const f = [...root.querySelectorAll('button:not([hidden]):not([disabled])')];
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        else if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      }
      e.stopPropagation();
    }, true);
    addEventListener('resize', () => { if (openState) resetZoom(); });
  }

  function paint() { img.style.transform = `translate(${tx}px, ${ty}px) scale(${zoom})`; img.style.cursor = zoom > 1 ? 'grab' : 'zoom-in'; }
  function clamp() {
    const w = img.offsetWidth, h = img.offsetHeight;
    const mx = Math.max(0, (w * zoom - stage.clientWidth) / 2 + 40), my = Math.max(0, (h * zoom - stage.clientHeight) / 2 + 40);
    tx = Math.max(-mx, Math.min(mx, tx)); ty = Math.max(-my, Math.min(my, ty));
  }
  function resetZoom() { zoom = 1; tx = ty = 0; img.style.transform = ''; img.style.cursor = 'zoom-in'; syncButtons(); }
  function toggleZoom(e) {
    if (zoom > 1) {
      zoom = 1; const from = [tx, ty]; tx = ty = 0;
      if (reduce) paint(); else animate(img, { x: [from[0], 0], y: [from[1], 0], scale: [ZOOM, 1] }, { duration: .3, ease: 'easeOut' }).finished.then(paint);
    } else {
      const r = img.getBoundingClientRect();
      const cx = e ? e.clientX : r.left + r.width / 2, cy = e ? e.clientY : r.top + r.height / 2;
      zoom = ZOOM; tx = -(cx - (r.left + r.width / 2)) * (ZOOM - 1); ty = -(cy - (r.top + r.height / 2)) * (ZOOM - 1); clamp();
      if (reduce) paint(); else animate(img, { x: [0, tx], y: [0, ty], scale: [1, ZOOM] }, { duration: .32, ease: 'easeOut' }).finished.then(paint);
    }
    syncButtons();
  }
  function syncButtons() {
    const L = getLabels();
    btnZoom.innerHTML = svg(zoom > 1 ? 'zoomOut' : 'zoomIn'); btnZoom.setAttribute('aria-label', zoom > 1 ? L.zoomOut : L.zoomIn); btnZoom.title = btnZoom.getAttribute('aria-label');
    img.style.cursor = zoom > 1 ? 'grab' : 'zoom-in';
  }
  function labels() {
    const L = getLabels();
    root.setAttribute('aria-label', L.label);
    btnClose.innerHTML = svg('close'); btnClose.setAttribute('aria-label', L.close); btnClose.title = L.close;
    btnPrev.innerHTML = svg('prev'); btnPrev.setAttribute('aria-label', L.prev); btnPrev.title = L.prev;
    btnNext.innerHTML = svg('next'); btnNext.setAttribute('aria-label', L.next); btnNext.title = L.next;
    syncButtons();
  }
  function renderThumbs() {
    thumbsEl.hidden = items.length < 2;
    thumbsEl.innerHTML = items.map((it, i) => `<button type="button" data-i="${i}" class="lb-thumb" aria-label="${i + 1}"><img src="${it.src}" alt="" draggable="false"></button>`).join('');
  }
  function mark() {
    countEl.textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
    capEl.textContent = items[index].caption || '';
    [...thumbsEl.children].forEach((b, i) => { b.classList.toggle('on', i === index); if (i === index) b.setAttribute('aria-current', 'true'); else b.removeAttribute('aria-current'); });
    const multi = items.length > 1;
    btnPrev.hidden = btnNext.hidden = !multi;
    btnPrev.disabled = index === 0; btnNext.disabled = index === items.length - 1;
  }
  const preload = (i) => { const it = items[i]; if (it) { const im = new Image(); im.src = it.src; } };

  async function show(i, dir = 0) {
    if (i < 0 || i >= items.length || i === index && dir !== 0) return;
    const out = dir !== 0 && !reduce;
    if (out) await animate(img, { opacity: 0, x: -30 * dir }, { duration: .16 }).finished;
    index = i; resetZoom();
    img.src = items[i].src; img.alt = items[i].caption || '';
    mark(); preload(i + 1); preload(i - 1);
    try { await img.decode(); } catch { /* shown anyway */ }
    if (out) animate(img, { opacity: [0, 1], x: [30 * dir, 0] }, { duration: .28, ease: 'easeOut' }).finished.then(() => { img.style.transform = ''; img.style.opacity = ''; });
  }
  const go = (d) => show(index + d, d);

  async function open(list, start, originEl) {
    if (!root) build();
    items = list; index = start; origin = originEl; openState = true;
    labels(); renderThumbs(); resetZoom();
    root.hidden = false;
    img.src = items[index].src; img.alt = items[index].caption || '';
    mark(); preload(index + 1); preload(index - 1);
    btnClose.focus({ preventScroll: true });
    try { await img.decode(); } catch { /* ignore */ }
    if (reduce) return;
    animate(root.querySelector('.lb-backdrop'), { opacity: [0, 1] }, { duration: .3 });
    animate([root.querySelector('.lb-top'), root.querySelector('.lb-foot')], { opacity: [0, 1], y: [-8, 0] }, { duration: .4, delay: .1 });
    const from = origin?.querySelector('img')?.getBoundingClientRect(), to = img.getBoundingClientRect();
    if (from && to.width) {
      animate(img, { x: [from.left + from.width / 2 - (to.left + to.width / 2), 0], y: [from.top + from.height / 2 - (to.top + to.height / 2), 0], scale: [from.width / to.width, 1] }, { type: 'spring', stiffness: 220, damping: 28 }).finished.then(() => { img.style.transform = ''; });
    } else animate(img, { opacity: [0, 1], scale: [.96, 1] }, { duration: .3 });
  }
  async function close() {
    if (!openState) return;
    openState = false;
    if (!reduce) {
      animate(root.querySelector('.lb-backdrop'), { opacity: 0 }, { duration: .22 });
      animate([root.querySelector('.lb-top'), root.querySelector('.lb-foot')], { opacity: 0 }, { duration: .18 });
      await animate(img, { opacity: 0, scale: .95 }, { duration: .22 }).finished;
    }
    root.hidden = true;
    root.querySelectorAll('.lb-backdrop, .lb-top, .lb-foot').forEach((el) => el.removeAttribute('style'));
    img.removeAttribute('style'); img.removeAttribute('src');
    origin?.focus({ preventScroll: true });
  }
  return { open, close, isOpen: () => openState };
}
