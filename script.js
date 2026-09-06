const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle('hidden', selected !== 'all' && project.dataset.category !== selected);
    });
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.project, .timeline article').forEach((element) => {
  element.classList.add('reveal');
  observer.observe(element);
});

const gallery = document.querySelector('.ui-gallery');
if (gallery) {
  const slides = [...gallery.querySelectorAll('.ui-slide')];
  const selectors = [...gallery.querySelectorAll('.ui-selector')];
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pauseButton = gallery.querySelector('.ui-pause');
  let current = 0;
  let paused = motion.matches;
  let visible = false;
  let timer;

  function schedule() {
    clearInterval(timer);
    if (!paused && visible && !document.hidden && !gallery.matches(':hover') && !gallery.contains(document.activeElement)) {
      timer = setInterval(() => show(current + 1), 5500);
    }
  }

  function show(index, announce = false) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === current);
      slide.classList.toggle('is-before', i === (current + slides.length - 1) % slides.length);
      slide.classList.toggle('is-after', i === (current + 1) % slides.length);
      slide.setAttribute('aria-hidden', String(i !== current));
      selectors[i].classList.toggle('is-active', i === current);
      selectors[i].setAttribute('aria-pressed', String(i === current));
    });
    const { title, category, description } = slides[current].dataset;
    gallery.querySelector('.ui-title').textContent = title;
    gallery.querySelector('.ui-category').textContent = category;
    gallery.querySelector('.ui-description').textContent = description;
    gallery.querySelector('.ui-count').innerHTML = `${String(current + 1).padStart(2, '0')} <span>/ 06</span>`;
    if (announce) gallery.querySelector('.ui-announcement').textContent = `${current + 1} of ${slides.length}: ${title}`;
    schedule();
  }

  function updatePause() {
    pauseButton.textContent = paused ? '▷' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? 'Play slideshow' : 'Pause slideshow');
    pauseButton.setAttribute('aria-pressed', String(paused));
    schedule();
  }
  selectors.forEach((button, i) => button.addEventListener('click', () => show(i, true)));
  gallery.querySelector('.ui-prev').addEventListener('click', () => show(current - 1, true));
  gallery.querySelector('.ui-next').addEventListener('click', () => show(current + 1, true));
  pauseButton.addEventListener('click', () => { paused = !paused; updatePause(); });
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1), true);
    }
  });
  let touchStart;
  const stage = gallery.querySelector('.ui-stage');
  stage.addEventListener('touchstart', (event) => { touchStart = event.touches[0]; }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.clientX;
    const dy = event.changedTouches[0].clientY - touchStart.clientY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1), true);
    touchStart = null;
  }, { passive: true });
  gallery.addEventListener('mouseenter', () => clearInterval(timer));
  gallery.addEventListener('mouseleave', schedule);
  gallery.addEventListener('focusin', () => clearInterval(timer));
  gallery.addEventListener('focusout', () => setTimeout(schedule, 0));
  document.addEventListener('visibilitychange', schedule);
  motion.addEventListener('change', () => { paused = motion.matches; updatePause(); });
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; schedule(); }, { threshold: .2 }).observe(gallery);
  updatePause();
  show(0);
}
