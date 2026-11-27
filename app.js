(() => {
const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#nav');
menu?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menu.setAttribute('aria-expanded',String(open));
  menu.textContent=open?'×':'☰';
});
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menu?.setAttribute('aria-expanded','false');
  if(menu)menu.textContent='☰';
}));
let language='no';
const toggle=document.querySelector('#language-toggle');
toggle?.addEventListener('click',()=>{
  language=language==='no'?'en':'no';
  document.documentElement.lang=language;
  document.querySelectorAll('[data-no][data-en]').forEach(el=>{
    el.innerHTML=language==='no'?el.dataset.no:el.dataset.en;
  });
  toggle.textContent=language==='no'?'EN':'NO';
  document.title=language==='no'?'Kristoffer Carlin — Velkommen hjem til deg selv':'Kristoffer Carlin — Welcome home to yourself';
});
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();
})();