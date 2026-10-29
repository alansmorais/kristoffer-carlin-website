(() => {
const menuButton=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-nav'),langButtons=[document.querySelector('#language-toggle'),document.querySelector('#footer-language')].filter(Boolean);let language='no';
menuButton?.addEventListener('click',()=>{const open=nav.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(open))});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('is-open');menuButton?.setAttribute('aria-expanded','false')}));
function setLanguage(next){language=next;document.documentElement.lang=language;document.querySelectorAll('[data-no][data-en]').forEach(el=>el.innerHTML=language==='no'?el.dataset.no:el.dataset.en);langButtons.forEach(b=>{b.textContent=language==='no'?'EN':'NO';b.setAttribute('aria-label',language==='no'?'Switch to English':'Bytt til norsk')});document.title=language==='no'?'Kristoffer Carlin — Mer levende. Mer deg.':'Kristoffer Carlin — More alive. More you.';loadContent()}
langButtons.forEach(b=>b.addEventListener('click',()=>setLanguage(language==='no'?'en':'no')));document.querySelector('#year').textContent=new Date().getFullYear();
const endpoint=window.KRISTOFFER_CONFIG?.appsScriptUrl;
async function loadContent(){if(!endpoint)return;for(const [action,target] of [['events','#events-list'],['blog','#blog-list'],['gallery','#gallery-grid'],['testimonials','#testimonials-list']]){try{const res=await fetch(endpoint+'?action='+action+'&lang='+language,{cache:'no-store'});if(!res.ok)continue;const data=await res.json();if(!data.ok||!Array.isArray(data[action]))continue;const container=document.querySelector(target);container.replaceChildren();data[action].forEach(item=>{if(action==='gallery'){const img=document.createElement('img');img.src=item.imageUrl;img.alt=item.alt||'';container.append(img);return}const article=document.createElement('article');article.className=action==='events'?'event-row':'blog-row';const heading=document.createElement('h3');heading.textContent=item.title||item.name||'';const desc=document.createElement('p');desc.textContent=item.summary||item.text||'';if(action==='testimonials'){article.append(desc);container.append(article);return}if(action==='events'){const date=document.createElement('div');date.className='event-date';date.textContent=item.dateLabel||'';const details=document.createElement('div');details.append(heading,desc);const link=document.createElement('a');link.href=item.bookingUrl||'#contact';link.textContent=language==='no'?'Les mer / meld deg på ↗':'Details / reserve ↗';article.append(date,details,link)}else{article.append(heading,desc);if(item.url){const link=document.createElement('a');link.href=item.url;link.textContent=language==='no'?'Les artikkelen ↗':'Read article ↗';article.append(link)}}container.append(article)})}catch(e){console.warn('Content load failed:',action)}}}
const form=document.querySelector('#contact-form'),status=document.querySelector('#contact-status');form?.addEventListener('submit',async e=>{e.preventDefault();if(!endpoint){status.textContent=language==='no'?'Skjemaet er ikke aktivert ennå.':'The form is not enabled yet.';return}const button=form.querySelector('button[type=submit]');button.disabled=true;try{const data=Object.fromEntries(new FormData(form));const res=await fetch(endpoint,{method:'POST',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({action:'contact',...data,lang:language})});const result=await res.json();if(!res.ok||result.ok!==true)throw Error('Submission failed');form.reset();status.textContent=language==='no'?'Takk — meldingen er sendt.':'Thank you — your message has been sent.'}catch(_){status.textContent=language==='no'?'Meldingen kunne ikke sendes. Prøv igjen senere.':'Your message could not be sent. Please try again later.'}finally{button.disabled=false}});
loadContent();
})();




/* Single floating button cycles through 72 complete colour themes on every click. */
(() => {
const themes=[
['Earth & flame',['#4F6B3F','#F5EDE3','#EB9C35','#C4501B','#3E2F25','#1B1B1B']],
['Deep freedom',['#5A7D5A','#F2E8D9','#D4A017','#EB6B2D','#A5523D','#4A3428']],
['Spark & happiness',['#133414','#4E7145','#EB9C35','#C4501B','#8A2C12','#F5EDE3']],
['Forest & sun',['#24483A','#DDE9E0','#D8A52C','#D88908','#6B4A2E','#F5F1E8']],
['Clay & fire',['#315C4A','#F5EDE3','#EB6B2D','#A5523D','#382818','#FCFBF7']],
['Moss & walnut',['#5A7D5A','#F2E8D9','#D4A017','#A5523D','#4A3428','#1B1B1B']],
['Meadow & honey',['#6B8052','#FFF4D6','#E8B33A','#D36B3D','#354A35','#202A24']],
['Ocean forest',['#2F6F62','#E6F1E8','#E4B95B','#D87952','#24453F','#172B2A']],
['Rosewood earth',['#657653','#F4E7DC','#D9A441','#B85C4A','#604238','#292321']],
['Wild botanical',['#426B50','#F1F0D8','#D5B83E','#C66C39','#304B3C','#1D2821']],
['Sunlit sage',['#82966A','#FFF7E8','#F0BD4A','#D86F45','#435344','#222923']],
['Midnight grove',['#42634B','#E9E5D5','#E6B84A','#D56B43','#182E27','#F7F2E7']]
];
const variants=[
{name:'Light',r:[1,5,1,5,0,1,0,1,2,5,3,1]},
{name:'Olive',r:[1,5,0,5,0,1,0,1,2,5,3,1]},
{name:'Forest',r:[5,1,4,1,0,1,0,1,2,5,3,1]},
{name:'Golden',r:[2,5,1,5,4,1,0,1,2,5,3,5]},
{name:'Terracotta',r:[1,5,4,1,4,1,0,1,3,1,2,5]},
{name:'Dark',r:[5,1,4,1,5,1,0,1,2,5,3,1]}
];
const button=document.querySelector('#palette-launcher'),label=document.querySelector('#palette-launcher-label'),status=document.querySelector('#palette-current');
if(!button)return;
const all=[];
themes.forEach(theme=>variants.forEach(variant=>all.push({number:all.length+1,theme:theme[0],colors:theme[1],variant:variant.name,r:variant.r})));
let current=0;
function apply(option){
const c=option.colors,r=option.r;
const vals={pageBg:c[r[0]],pageText:c[r[1]],lightSurface:c[r[2]],lightText:c[r[3]],darkSurface:c[r[4]],darkText:c[r[5]],greenSurface:c[r[6]],greenText:c[r[7]],accent:c[r[8]],accentText:c[r[9]],warmSurface:c[r[10]],warmText:c[r[11]],borderColor:c[r[4]]+'66',fieldBg:c[r[4]]+'18',fieldBorder:c[r[5]]+'99'};
Object.entries(vals).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v));
const aliases={forest:vals.darkSurface,moss:vals.greenSurface,leaf:vals.greenSurface,ivory:vals.darkText,cream:vals.pageBg,ochre:vals.accent,gold:vals.accent,terracotta:vals.warmSurface,rust:vals.warmSurface,earth:vals.darkSurface,ink:vals.pageText,muted:vals.darkText,line:vals.borderColor};
Object.entries(aliases).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k,v));
document.documentElement.dataset.palette='option-'+String(option.number).padStart(2,'0');
document.querySelector('meta[name="theme-color"]')?.setAttribute('content',vals.darkSurface);
if(label)label.textContent='Next colour · '+String(option.number).padStart(2,'0')+'/72';
if(status)status.textContent='Theme '+String(option.number).padStart(2,'0')+' of 72 · '+option.theme+' · '+option.variant;
}
button.style.pointerEvents='auto';
button.onclick=(event)=>{event.preventDefault();event.stopPropagation();current=(current+1)%all.length;apply(all[current]);};
apply(all[0]);
})();
