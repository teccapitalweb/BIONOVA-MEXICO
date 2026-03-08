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
    const nombre = document.getElementById('nombre').value.trim();
    const interes = document.getElementById('interes').value.trim();
    const tipo = document.getElementById('tipo').value.trim();

    const mensaje = [
      'Hola, quiero información de BIONOVA México.',
      nombre ? `Mi nombre es: ${nombre}.` : '',
      interes ? `Me interesa: ${interes}.` : '',
      tipo ? `Solicitud: ${tipo}.` : '',
    ].filter(Boolean).join(' ');

    const url = `https://wa.me/522384092448?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
