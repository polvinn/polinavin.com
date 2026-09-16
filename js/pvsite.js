function copyToClipboard(element){const textarea=document.createElement('textarea');textarea.value=element.textContent;document.body.appendChild(textarea);textarea.select();document.execCommand('copy');document.body.removeChild(textarea);}
// Preserve the existing curTheme storage convention: 0 = dark, 1 = light.
let themePreference;
try { themePreference = localStorage.getItem('curTheme'); } catch (_) {}
let currentTheme = themePreference === '1' ? 0 : 1;
function setDarkTheme() {
  const colors = colorSchemes[currentTheme];
  for (const shade of [50,100,200,300,400,500,600,700,800,900]) {
    document.documentElement.style.setProperty('--neutral--'+shade, colors['n'+shade]);
  }
  document.documentElement.style.setProperty('--white', colors.nwhite);
  document.documentElement.style.setProperty('--black', colors.nblack);
  document.querySelectorAll('.theme-button').forEach(button => {
    const label = currentTheme === 1 ? 'Switch to light mode' : 'Switch to dark mode';
    button.classList.toggle('is-light', currentTheme === 0);
    button.setAttribute('aria-label', label);
    button.title = label;
  });
}
function switchColorTheme() {
  currentTheme = 1 - currentTheme;
  try { localStorage.setItem('curTheme', String(1-currentTheme)); } catch (_) {}
  setDarkTheme();
}
const colorSchemes=[{n50:'#f9fafb',n100:'#f3f4f6',n200:'#e5e7eb',n300:'#d1d5db',n400:'#9ca3af',n500:'#6b7280',n600:'#4b5563',n700:'#374151',n800:'#1f2937',n900:'#111827',nwhite:'white',nblack:'black'},{n50:'#111827',n100:'#1f2937',n200:'#374151',n300:'#4b5563',n400:'#6b7280',n500:'#9ca3af',n600:'#d1d5db',n700:'#e5e7eb',n800:'#f3f4f6',n900:'#f9fafb',nwhite:'black',nblack:'white'}];
document.addEventListener("DOMContentLoaded",function(){
document.querySelectorAll('.no-fs-video').forEach(tag=>{
      tag.addEventListener('webkitbeginfullscreen', function (e) {
        e.preventDefault();tag.webkitExitFullscreen();});
      tag.addEventListener('fullscreenchange', function (e) {
        if (document.fullscreenElement) {
          document.exitFullscreen();}});
      tag.addEventListener('mozfullscreenchange', function (e) {
        if (document.mozFullScreenElement) {
          document.mozCancelFullScreen();}});
      tag.addEventListener('MSFullscreenChange', function (e) {
        if (document.msFullscreenElement) {
          document.msExitFullscreen();}});});		
  document.querySelectorAll('.email-tag').forEach(tag=>{tag.onclick=()=>copyToClipboard(tag);});document.querySelectorAll('.theme-button').forEach(tag=>{tag.onclick=switchColorTheme;});setDarkTheme();});
  window.addEventListener('load', function(){const preloaders = document.querySelectorAll('.img-preloader');        preloaders.forEach((preloader) => {preloader.style.opacity = '0';});});
  
// Explicit menu state avoids off-screen positioning and legacy animation races.
document.addEventListener('DOMContentLoaded', () => {
  const menu = document.querySelector('.menu-home');
  if (!menu) return;
  const openers = [...document.querySelectorAll('[data-menu-action="open"]')];
  const closers = [...document.querySelectorAll('[data-menu-action="close"]')];
  let returnFocus;
  menu.id = 'site-menu';
  menu.setAttribute('role', 'dialog');
  menu.setAttribute('aria-label', 'Navigation menu');
  menu.setAttribute('aria-modal', 'true');
  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    menu.inert = !open;
    menu.setAttribute('aria-hidden', String(!open));
    document.documentElement.classList.toggle('menu-open', open);
    openers.forEach(el => el.setAttribute('aria-expanded', String(open)));
    if (open) { returnFocus = document.activeElement; menu.scrollTop = 0; closers[0]?.focus(); }
    else returnFocus?.focus();
  }
  [...openers, ...closers].forEach(el => {
    if (el.tagName !== 'A' && el.tagName !== 'BUTTON') {
      el.setAttribute('role', 'button'); el.tabIndex = 0;
      el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); } });
    }
    const open = openers.includes(el);
    if (open) el.setAttribute('aria-controls', menu.id);
    if (el.tagName !== 'A') el.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
    el.addEventListener('click', () => setOpen(open));
  });
  document.addEventListener('keydown', e => {
    if (!menu.classList.contains('is-open')) return;
    if (e.key === 'Escape') setOpen(false);
    if (e.key === 'Tab') {
      const items = [...menu.querySelectorAll('a[href], button, [tabindex="0"]')].filter(el => el.getClientRects().length);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
    }
  });
  // Dismiss on downward scroll intent even while background scrolling is locked.
  window.addEventListener('wheel', e => {
    if (e.deltaY > 0 && menu.classList.contains('is-open')) setOpen(false);
  }, { passive: true });
  let touchStartY = null;
  window.addEventListener('touchstart', e => {
    touchStartY = e.touches.length === 1 ? e.touches[0].clientY : null;
  }, { passive: true });
  window.addEventListener('touchmove', e => {
    if (touchStartY !== null && e.touches.length === 1 &&
        touchStartY - e.touches[0].clientY > 16 && menu.classList.contains('is-open')) {
      setOpen(false);
      touchStartY = null;
    }
  }, { passive: true });
  window.addEventListener('touchend', () => { touchStartY = null; }, { passive: true });
  setOpen(false);
  window.addEventListener('pageshow', () => setOpen(false));
});
