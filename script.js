const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('#work .project');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    filters.forEach((item) => { item.classList.remove('active'); item.setAttribute('aria-pressed', 'false'); });
    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');
    const selected = button.dataset.filter;
    projects.forEach((project) => {
      project.classList.toggle('hidden', selected !== 'all' && project.dataset.category !== selected);
    });
    document.querySelectorAll('.work-group').forEach((group) => {
      group.hidden = !group.querySelector('.project:not(.hidden)');
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

const projectDialog = document.querySelector('#project-dialog');
let projectTrigger;
let previousOverflow;
document.querySelectorAll('.case-open').forEach((button) => {
  const project = button.closest('.project');
  button.setAttribute('aria-label', `Explore ${project.querySelector('h3').textContent}`);
  button.addEventListener('click', () => {
    projectTrigger = button;
    const content = projectDialog.querySelector('.dialog-content');
    content.replaceChildren(project.querySelector('.case-heading').cloneNode(true), project.querySelector('.case-body').cloneNode(true));
    content.querySelectorAll('.lobster-wrap').forEach((element) => element.remove());
    content.querySelector('h3').id = 'dialog-title';
    content.querySelectorAll('details').forEach((details) => { details.open = true; });
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    projectDialog.showModal();
    projectDialog.scrollTop = 0;
    projectDialog.querySelector('.dialog-close').focus();
  });
});
projectDialog.querySelector('.dialog-close').addEventListener('click', () => projectDialog.close());
projectDialog.addEventListener('click', (event) => {
  const rect = projectDialog.getBoundingClientRect();
  if (event.target === projectDialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) projectDialog.close();
});
projectDialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow || '';
  projectTrigger?.focus({ preventScroll: true });
});

const header = document.querySelector('.site-header');
const headerMenu = document.querySelector('.header-menu');
function closeHeaderMenu() { header.classList.remove('menu-open'); headerMenu.setAttribute('aria-expanded', 'false'); }
headerMenu.addEventListener('click', () => { const open = header.classList.toggle('menu-open'); headerMenu.setAttribute('aria-expanded', String(open)); });
header.querySelectorAll('nav a').forEach(link => link.addEventListener('click', closeHeaderMenu));
document.addEventListener('click', event => { if (!header.contains(event.target)) closeHeaderMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && header.classList.contains('menu-open')) { closeHeaderMenu(); headerMenu.focus(); } });
window.addEventListener('scroll', closeHeaderMenu, { passive: true });


const progressBar = document.querySelector('.scroll-progress');
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressBar?.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
}
window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const navLinks = [...document.querySelectorAll('#header-links a')];
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-45% 0px -50% 0px' });
['work', 'experience', 'about'].forEach((id) => { const el = document.getElementById(id); if (el) navObserver.observe(el); });


const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const dark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeMeta?.setAttribute('content', dark ? '#0a0b10' : '#f7f8fb');
}
applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
themeToggle?.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (error) { /* storage unavailable */ }
});
