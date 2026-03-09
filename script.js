const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');
if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => menu.classList.remove('open')));
}

const revealItems = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });
revealItems.forEach(item => revealObserver.observe(item));

const statNumbers = document.querySelectorAll('[data-count]');
const animateValue = el => {
  const target = Number(el.dataset.count || 0);
  const start = 0;
  const duration = 1200;
  const startTime = performance.now();
  const tick = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * (1 - Math.pow(1 - progress, 3)));
    el.textContent = value;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.dataset.animated) {
      animateValue(entry.target);
      entry.target.dataset.animated = 'true';
    }
  });
}, { threshold: 0.6 });
statNumbers.forEach(item => statObserver.observe(item));

const chips = document.querySelectorAll('.chip');
const courseCards = document.querySelectorAll('.course-card');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.dataset.filter;
    courseCards.forEach(card => {
      const category = card.dataset.category;
      const show = filter === 'all' || filter === category;
      card.classList.toggle('hidden-card', !show);
    });
  });
});
