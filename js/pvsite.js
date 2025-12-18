function copyToClipboard(element){const textarea=document.createElement('textarea');textarea.value=element.textContent;document.body.appendChild(textarea);textarea.select();document.execCommand('copy');document.body.removeChild(textarea);}
function setDarkTheme(elem){let currentTheme=1-localStorage.getItem('curTheme');if(currentTheme==1){elem.classList.add('switched-on');document.getElementById('dark-side-id').style.setProperty('opacity',0);document.getElementById('light-side-id').style.setProperty('transition','opacity 777ms ease 0s');document.getElementById('light-side-id').style.setProperty('opacity',1);}else{document.getElementById('light-side-id').style.setProperty('opacity',0);document.getElementById('dark-side-id').style.setProperty('transition','opacity 777ms ease 0s');document.getElementById('dark-side-id').style.setProperty('opacity',1);elem.classList.remove('switched-on');}document.documentElement.style.setProperty('--neutral--50',colorSchemes[currentTheme].n50);document.documentElement.style.setProperty('--neutral--100',colorSchemes[currentTheme].n100);document.documentElement.style.setProperty('--neutral--200',colorSchemes[currentTheme].n200);document.documentElement.style.setProperty('--neutral--300',colorSchemes[currentTheme].n300);document.documentElement.style.setProperty('--neutral--400',colorSchemes[currentTheme].n400);document.documentElement.style.setProperty('--neutral--500',colorSchemes[currentTheme].n500);document.documentElement.style.setProperty('--neutral--600',colorSchemes[currentTheme].n600);document.documentElement.style.setProperty('--neutral--700',colorSchemes[currentTheme].n700);document.documentElement.style.setProperty('--neutral--800',colorSchemes[currentTheme].n800);document.documentElement.style.setProperty('--neutral--900',colorSchemes[currentTheme].n900);document.documentElement.style.setProperty('--white',colorSchemes[currentTheme].nwhite);document.documentElement.style.setProperty('--black',colorSchemes[currentTheme].nblack);}
function switchColorTheme(elem){localStorage.setItem('curTheme',localStorage.getItem('curTheme')==1?0:1);setDarkTheme(elem);}
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
  document.querySelectorAll('.email-tag').forEach(tag=>{tag.onclick=()=>copyToClipboard(tag);});document.querySelectorAll('.switch-to-dark').forEach(tag=>{tag.onclick=()=>switchColorTheme(tag);setDarkTheme(tag);});});
  window.addEventListener('load', function(){const preloaders = document.querySelectorAll('.img-preloader');        preloaders.forEach((preloader) => {preloader.style.opacity = '0';});});
  