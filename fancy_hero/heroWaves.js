const neonColors = ['var(--neon1)', 'var(--neon2)', 'var(--neon3)'];

function spawnBgWave() {
  const container = document.querySelector('.fancy-bg-waves');
  if (!container) return;

  const wave = document.createElement('div');
  wave.classList.add('fancy-bg-wave');

  // random color
  const color = neonColors[Math.floor(Math.random() * neonColors.length)];
  wave.style.border = `2px solid ${color}`;
  wave.style.boxShadow = `0 0 40px ${color}`;

  // random size
  const size = 40 + Math.random() * 150;
  wave.style.width = size + 'px';
  wave.style.height = size + 'px';

  // random position upper view
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.3);
  wave.style.left = x + 'px';
  wave.style.top = y + 'px';

  container.appendChild(wave);

  // lifetime
  wave.addEventListener('animationend', () => wave.remove());

}

// new wave time
setInterval(spawnBgWave, 1000);
