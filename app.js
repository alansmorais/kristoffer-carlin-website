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


/* Floating palette lab: one click chooses palette; one click chooses any of six color-role combinations. */
const paletteData={
 'earth-flame':{name:'01 · Earth & inner flame',colors:['#4F6B3F','#F5EDE3','#EB9C35','#C4501B','#3E2F25','#1B1B1B']},
 'deep-freedom':{name:'02 · Deep, warm & free',colors:['#5A7D5A','#F2E8D9','#D4A017','#EB6B2D','#A5523D','#4A3428']},
 'spark-happiness':{name:'03 · Spark & happiness',colors:['#133414','#4E7145','#EB9C35','#C4501B','#8A2C12','#F5EDE3']},
 'forest-sun':{name:'04 · Forest & sun',colors:['#24483A','#DDE9E0','#D8A52C','#D88908','#6B4A2E','#F5F1E8']},
 'clay-fire':{name:'05 · Clay & fire',colors:['#315C4A','#F5EDE3','#EB6B2D','#A5523D','#382818','#FCFBF7']},
 'moss-walnut':{name:'06 · Moss & walnut',colors:['#5A7D5A','#F2E8D9','#D4A017','#A5523D','#4A3428','#1B1B1B']}
};
const roleMaps=[
 [1,5,1,4,0,1,1,4,0,1,2,5],[0,4,1,4,0,1,1,4,2,5,3,1],[5,1,4,1,0,1,0,1,2,5,3,1],[2,5,1,5,4,1,0,1,2,5,3,5],[1,4,5,4,4,1,0,1,3,1,2,5],[5,1,4,1,5,1,0,1,2,5,3,1]
];
const variationNames=['A · Light & natural','B · Olive & cream','C · Forest & cream','D · Golden earth','E · Terracotta warmth','F · Dark & immersive'];
const paletteButtons=[...document.querySelectorAll('[data-palette]')],variationButtons=[...document.querySelectorAll('[data-variation]')],paletteStatus=document.querySelector('#palette-current');
let activePaletteKey='earth-flame',activeVariation=1;
function applyCombination(){
 const data=paletteData[activePaletteKey];if(!data)return;const c=data.colors,r=roleMaps[activeVariation-1];
 const vals={pageBg:c[r[0]],pageText:c[r[1]],lightSurface:c[r[2]],lightText:c[r[3]],darkSurface:c[r[4]],darkText:c[r[5]],greenSurface:c[r[6]],greenText:c[r[7]],accent:c[r[8]],accentText:c[r[9]],warmSurface:c[r[10]],warmText:c[r[11]],borderColor:c[r[4]]+'66',fieldBg:'#FFFFFF12',fieldBorder:c[r[5]]+'99'};
 Object.entries(vals).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()),v));
 document.documentElement.dataset.palette=activePaletteKey;
 paletteButtons.forEach(b=>{const on=b.dataset.palette===activePaletteKey;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 variationButtons.forEach(b=>{const on=Number(b.dataset.variation)===activeVariation;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 document.querySelectorAll('.combination-preview').forEach(el=>{el.style.setProperty('--page-bg',c[r[0]]);el.style.setProperty('--dark-surface',c[r[4]])});
 if(paletteStatus)paletteStatus.textContent='Selected: '+data.name+' · '+variationNames[activeVariation-1]+' · '+activeVariation+'/6';
 document.querySelector('meta[name="theme-color"]')?.setAttribute('content',c[r[4]]);
}
paletteButtons.forEach(b=>b.addEventListener('click',()=>{activePaletteKey=b.dataset.palette;applyCombination()}));
variationButtons.forEach(b=>b.addEventListener('click',()=>{activeVariation=Number(b.dataset.variation);applyCombination()}));
applyCombination();
