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
  // Separa prefijo (ej. "+") y número del data-count, para conservarlos al animar
  const raw = String(el.dataset.count || '0');
  const match = raw.match(/^(\D*)(\d[\d,]*)(\D*)$/);
  const prefix = match ? match[1] : '';
  const suffix = match ? match[3] : '';
  const target = match ? parseInt(match[2].replace(/,/g, ''), 10) : 0;
  const duration = 1600;
  const startTime = performance.now();
  el.classList.add('is-counting');
  const tick = now => {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
    el.textContent = prefix + value.toLocaleString('es-MX') + suffix;
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      el.textContent = prefix + target.toLocaleString('es-MX') + suffix;
    }
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
const modalList = document.getElementById('modal-list');
const modalImage = document.getElementById('modal-image');
const modalTriggers = document.querySelectorAll('.modal-trigger');
const modalClose = document.querySelector('.modal-close');

const openModal = key => {
  if (!modal || !window.courseModalData || !window.courseModalData[key]) return;
  const data = window.courseModalData[key];
  modalTitle.textContent = data.title;
  modalDescription.textContent = data.description;
  if (modalList) modalList.innerHTML = (data.items || []).map(item => `<li>${item}</li>`).join('');
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
