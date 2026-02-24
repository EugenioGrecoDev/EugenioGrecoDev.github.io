document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav-link');

  // Tracciamo hero, activities, about e footer
  const sections = document.querySelectorAll('section[id]');

  const setActive = (id) => {
    links.forEach(link => {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === `#${id}`);
    });
  };

  // CLICK: scroll smooth + active immediato
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', targetId);
        setActive(targetId.replace('#', ''));
      }
    });
  });

  // SCROLL: aggiorna active in base alla sezione visibile
  window.addEventListener('scroll', () => {
    let current = null;
    const scrollPos = window.scrollY + window.innerHeight/2;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        current = sec.id;
      }
    });

    if (current) {
      setActive(current);
    }
  });

  // Attiva link da hash iniziale
  if (location.hash) {
    setActive(location.hash.replace('#', ''));
  }

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
  const fadeStart = 0;
  const fadeEnd = window.innerHeight * 0.3;

  const scroll = window.scrollY;

  // Calc and clamp
  let opacity = 1 - (scroll - fadeStart) / (fadeEnd - fadeStart);
  opacity = Math.max(0, Math.min(1, opacity));

  hero.style.opacity = opacity;
});



});
