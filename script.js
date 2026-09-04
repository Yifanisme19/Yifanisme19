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
