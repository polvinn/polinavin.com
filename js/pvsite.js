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
  