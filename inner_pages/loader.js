(() => { // define and run, with private scope, same of <script type="module"
  // ***** elements & state *****
  const activities = document.querySelector('.activities');
  const buttons = document.querySelectorAll('.activities .activity-btn');
  const app = document.querySelector('#app');

  // state helpers
  // cleanup function for outside‑section click-listener
  let removeOutsideClick = null;  

  // ----- utilities -------------------------------------------------------
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function fetchHTML(url) {
    const res = await fetch(url);
    return res.text();
  }

  // ----- view helpers ----------------------------------------------------
  function fadeIn(root)  { requestAnimationFrame(() => root.classList.add('visible')); }
  function fadeOut(root) { root.classList.remove('visible'); }
  function collapseHero() { document.body.classList.add('activity-active'); }
  function restoreHero() { document.body.classList.remove('activity-active'); }


  async function hideActivities() {
    activities.classList.add('expand');
    await wait (400);
    activities.style.display = 'none';
  }
  async function showActivities() {
    await wait (400);
    activities.classList.remove('expand');
    activities.style.display = '';
  }

  async function shockwaveAnimation(btn) {
    //get color from button
    //const colour = getComputedStyle(btn).borderColor || '#0ff';
    //btn.style.setProperty('--neon-color', colour);
    btn.classList.add('animate');    // play
    await wait (600);
    btn.classList.remove('animate'); // reset
    void btn.offsetWidth;            // reflow
  }

  // ----- content loading -------------------------------------------------
  async function loadView(url) {
    const html = await fetchHTML(url);
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const section = doc.querySelector('section');

    app.innerHTML = '';
    app.appendChild(section);
    fadeIn(section);

    initInnerPage(section);
    removeOutsideClick = setupOutsideClick(section);
  }

  async function removeView() {
    const section = app.querySelector('section');
    if (!section) return;

    fadeOut(section);

    showActivities();
    restoreHero();

    if (removeOutsideClick) {
      removeOutsideClick();
      removeOutsideClick = null;
    }

    await wait(400);
    section.remove();
  }

  function setupOutsideClick(section) {
    const handler = e => {
      if (!section.contains(e.target)) {
        removeView();
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }

  // ----- inner‑page setup ------------------------------------------------
  function initInnerPage(root) {
    const backBtn = root.querySelector('.back-btn');
    if (backBtn) backBtn.addEventListener('click', removeView);
    
    const boxes = root.querySelectorAll('.inner-box');
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        boxes.forEach(other => {
          if (other !== box) other.classList.remove('zoom');
        });
        box.classList.toggle('zoom');
      });
    });
  }

  // ----- event binding --------------------------------------------------
  function handleButtonClick(e) {
    const btn = e.currentTarget;
    const url = btn.dataset.content;

    shockwaveAnimation(btn);
    loadView(url).then(() => {
      hideActivities();
      collapseHero();
    });
  }

  function bindEvents() {
    buttons.forEach(btn => btn.addEventListener('click', handleButtonClick));
  }

  // ----- entry point -----------------------------------------------------
  function init() {
    bindEvents();
  }

  init();
})();
