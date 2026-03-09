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


const modal = document.getElementById('course-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalImage = document.getElementById('modal-image');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalClose = document.querySelector('.modal-close');

const openModal = key => {
  if (!modal || !window.courseModalData || !window.courseModalData[key]) return;
  const data = window.courseModalData[key];
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  modalImage.src = data.image;
  modalImage.alt = 'Contenido incluido en ' + data.title;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
};

modalTriggers.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });
}
window.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});
