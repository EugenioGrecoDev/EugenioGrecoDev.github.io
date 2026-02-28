const hero = document.querySelector('.hero');
const fancybgwaves = document.querySelector('.fancy-bg-waves');

const computeOpacity = (scrollY, fadeEnd) => {
  const raw = 1 - scrollY / fadeEnd;
  return Math.max(0, Math.min(1, raw));
};

const fadeEnd = window.innerHeight * 0.3;

window.addEventListener('scroll', () => {
  const opacity = computeOpacity(window.scrollY, fadeEnd);
  hero.style.opacity = opacity;
  fancybgwaves.style.opacity = opacity;
});