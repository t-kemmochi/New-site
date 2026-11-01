const toggle = document.querySelector('.menu-toggle');
const dialog = document.querySelector('.menu-dialog');
const panel = dialog.querySelector('.menu-panel');
const desktop = window.matchMedia('(min-width: 75rem)');
let scrollY = 0;
let closeTimer;

document.documentElement.classList.add('has-menu-js');
toggle.hidden = false;

function openMenu() {
  if (desktop.matches || dialog.open) return;
  scrollY = window.scrollY;
  document.body.style.top = `-${scrollY}px`;
  document.body.classList.add('menu-is-open');
  dialog.showModal();
  // 開く前の位置を確定し、移動そのものはCSSに任せる。
  panel.getBoundingClientRect();
  dialog.classList.add('is-open');
  toggle.setAttribute('aria-expanded', 'true');
}

function finishClose() {
  dialog.close();
  toggle.setAttribute('aria-expanded', 'false');
  document.body.classList.remove('menu-is-open');
  document.body.style.top = '';
  window.scrollTo(0, scrollY);
  if (!desktop.matches) toggle.focus({ preventScroll: true });
}

function closeMenu(animate = true) {
  if (!dialog.open) return;
  window.clearTimeout(closeTimer);
  dialog.classList.remove('is-open');
  const duration = animate ? parseFloat(getComputedStyle(panel).transitionDuration) * 1000 : 0;
  if (duration) closeTimer = window.setTimeout(finishClose, duration);
  else finishClose();
}

toggle.addEventListener('click', openMenu);
dialog.querySelector('.menu-close').addEventListener('click', () => closeMenu());
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) closeMenu();
  else if (event.target.closest('a[href]')) closeMenu(false);
});
dialog.addEventListener('cancel', (event) => {
  event.preventDefault();
  closeMenu();
});
dialog.addEventListener('keydown', (event) => {
  if (event.key !== 'Tab') return;
  const controls = dialog.querySelectorAll('a[href], button');
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
desktop.addEventListener('change', () => {
  if (desktop.matches) closeMenu(false);
});
