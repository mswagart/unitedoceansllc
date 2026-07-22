document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path) link.classList.add('active');
  });

  const tapGlobe = document.querySelector('.tap-rotate');
  if (tapGlobe) {
    const cx = 300;
    const cy = 240;
    const peak = 14;
    const duration = 650;
    let animId = null;

    const step = (start) => {
      const t = Math.min((performance.now() - start) / duration, 1);
      const angle = Math.sin(t * Math.PI) * peak;
      tapGlobe.setAttribute('transform', `rotate(${angle} ${cx} ${cy})`);
      if (t < 1) {
        animId = requestAnimationFrame(() => step(start));
      } else {
        tapGlobe.setAttribute('transform', `rotate(0 ${cx} ${cy})`);
        animId = null;
      }
    };

    tapGlobe.addEventListener('click', () => {
      if (animId) cancelAnimationFrame(animId);
      const start = performance.now();
      animId = requestAnimationFrame(() => step(start));
    });
  }
});
