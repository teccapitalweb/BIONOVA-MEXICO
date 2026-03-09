const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const form = document.getElementById('whatsappForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = document.getElementById('nombre')?.value.trim() || '';
    const interes = document.getElementById('interes')?.value.trim() || '';
    const tipo = document.getElementById('tipo')?.value.trim() || '';

    const mensaje = [
      'Hola, quiero información de BIONOVA México.',
      nombre ? `Mi nombre es ${nombre}.` : '',
      interes ? `Me interesa ${interes}.` : '',
      tipo ? `Solicitud: ${tipo}.` : '',
    ].filter(Boolean).join(' ');

    const url = `https://wa.me/522384092448?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

const filterButtons = document.querySelectorAll('.filter-btn');
const programCards = document.querySelectorAll('.program-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');

    programCards.forEach((card) => {
      const categories = (card.dataset.category || '').split(' ');
      const show = filter === 'all' || categories.includes(filter);
      card.classList.toggle('is-hidden', !show);
    });
  });
});

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealItems.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const counters = document.querySelectorAll('[data-counter]');
if ('IntersectionObserver' in window && counters.length) {
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const endValue = Number(el.dataset.counter || 0);
      const duration = 1100;
      const startTime = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * endValue);
        el.textContent = `+${current}`;
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          el.textContent = `+${endValue}`;
        }
      };

      requestAnimationFrame(animate);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.8 });

  counters.forEach((counter) => counterObserver.observe(counter));
}
