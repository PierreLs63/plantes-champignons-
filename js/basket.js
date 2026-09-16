/* =====================================================================
   PANIER EN OSIER — se replie en bas de l'écran, garde les récoltes
   ===================================================================== */
const Basket=(()=>{
  const root=$('basket'),btn=$('basketBtn'),slot=$('bItems'),list=$('trayList'),count=$('bCount');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let picks=[],open=false;

  const hw=y=>96-Math.pow((y-92)/82,2)*50;
  $('bBack').innerHTML=`<defs>
    <linearGradient id="bkIn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#24140a"/><stop offset="1" stop-color="#5a3514"/></linearGradient>
    <linearGradient id="bkH" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#c78c48"/><stop offset=".5" stop-color="#e8bd7c"/><stop offset="1" stop-color="#9a6530"/></linearGradient></defs>
    <path d="M40 94C34 6 206 6 200 94" fill="none" stroke="#5e3a18" stroke-width="16" stroke-linecap="round"/>
    <path d="M40 94C34 6 206 6 200 94" fill="none" stroke="url(#bkH)" stroke-width="11" stroke-linecap="round"/>
    <path d="M40 94C34 6 206 6 200 94" fill="none" stroke="#fbe0a8" stroke-width="11" stroke-dasharray="2.5 7" opacity=".45"/>
    <path d="M40 94C34 6 206 6 200 94" fill="none" stroke="#6e4520" stroke-width="11" stroke-dasharray="1.5 8.5" stroke-dashoffset="5" opacity=".5"/>
    <ellipse cx="120" cy="92" rx="96" ry="24" fill="url(#bkIn)"/>
    <path d="M24 92A96 24 0 0 1 216 92" fill="none" stroke="#9a6430" stroke-width="10"/>
    <path d="M24 92A96 24 0 0 1 216 92" fill="none" stroke="#d8a563" stroke-width="7" stroke-dasharray="5 4"/>`;
  let stakes='',weft='';
  for(let x=30;x<=210;x+=15)stakes+=`<path d="M${x} 96Q${r1(120+(x-120)*.86)} 140 ${r1(120+(x-120)*.62)} 178" stroke="#4a2c10" stroke-width="3.2" fill="none"/>`;
  for(let r=0;r<10;r++){const y=100+r*8.2,w=hw(y),ry=24*(1-r/10*.45);
    const d=`M${r1(120-w)} ${r1(y)}A${r1(w)} ${r1(ry)} 0 0 0 ${r1(120+w)} ${r1(y)}`;
    weft+=`<path d="${d}" stroke="url(#bkW)" stroke-width="7.4" fill="none" stroke-dasharray="13 3.5" stroke-dashoffset="${r%2?8:0}"/>
      <path d="${d}" transform="translate(0 -2)" stroke="#fbe0a8" stroke-width="1.3" fill="none" opacity=".45" stroke-dasharray="13 3.5" stroke-dashoffset="${r%2?8:0}"/>`}
  const body=`M24 92C26 130 44 168 72 176L168 176C196 168 214 130 216 92A96 24 0 0 1 24 92Z`;
  $('bFront').innerHTML=`<defs>
    <linearGradient id="bkW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4b673"/><stop offset="1" stop-color="#a86f34"/></linearGradient>
    <linearGradient id="bkS" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a0c02" stop-opacity=".55"/><stop offset=".3" stop-color="#1a0c02" stop-opacity="0"/><stop offset=".72" stop-color="#1a0c02" stop-opacity="0"/><stop offset="1" stop-color="#1a0c02" stop-opacity=".6"/></linearGradient>
    <linearGradient id="bkV" x1="0" y1="0" x2="0" y2="1"><stop offset=".6" stop-color="#1a0c02" stop-opacity="0"/><stop offset="1" stop-color="#1a0c02" stop-opacity=".45"/></linearGradient>
    <clipPath id="bkClip"><path d="${body}"/></clipPath></defs>
    <path d="${body}" fill="#6b4220"/>
    <g clip-path="url(#bkClip)">${stakes}${weft}</g>
    <path d="${body}" fill="url(#bkS)"/><path d="${body}" fill="url(#bkV)"/>
    <path d="M24 92A96 24 0 0 0 216 92" fill="none" stroke="#5e3a18" stroke-width="14"/>
    <path d="M24 92A96 24 0 0 0 216 92" fill="none" stroke="#c8914c" stroke-width="10"/>
    <path d="M24 92A96 24 0 0 0 216 92" fill="none" stroke="#8e5a28" stroke-width="10" stroke-dasharray="4 5"/>
    <path d="M30 96A92 22 0 0 0 210 96" fill="none" stroke="#fde3ad" stroke-width="1.6" opacity=".55"/>`;

  const thumb=i=>svgOf(ART,S[i].k,{lite:true,noGround:true});
  function render(fresh){
    count.textContent=picks.length;count.hidden=!picks.length;
    slot.innerHTML=picks.map((i,n)=>`<span class="bIt${i===fresh?' new':''}" style="left:${14+((n*29)%72)}%;--r:${((n*47)%50)-25}deg">${thumb(i)}</span>`).join('');
    list.innerHTML=picks.length?picks.map(i=>{const s=S[i];
      return `<li class="${s.edible?'good':'bad'}"><span class="th">${thumb(i)}</span><span class="nm"><b>${s.name}</b><i>${s.latin}</i></span><em>${s.edible?'+10':'−10'}<small>${s.edible?'comestible':'toxique'}</small></em></li>`}).join('')
      :`<li class="empty">Votre panier est encore vide. Examinez un spécimen, puis récoltez-le s'il est sûr.</li>`;
    $('trayCount').textContent=picks.length?`${picks.length} récolte${picks.length>1?'s':''}`:'';
    btn.setAttribute('aria-label',`Mon panier : ${picks.length} récolte${picks.length>1?'s':''}. ${open?'Replier':'Déplier'}`);
  }
  function fly(i,from){return new Promise(res=>{
    const el=document.createElement('div');el.className='flyer';el.innerHTML=thumb(i);document.body.appendChild(el);
    const to=btn.getBoundingClientRect(),size=Math.min(from.width,from.height)*.8;
    const sx=from.left+from.width/2,sy=from.top+from.height/2,dx=to.left+to.width/2-sx,dy=to.top+to.height*.35-sy;
    Object.assign(el.style,{width:size+'px',height:size+'px',left:(sx-size/2)+'px',top:(sy-size/2)+'px'});
    const a=el.animate([{transform:'translate(0,0) scale(1) rotate(0deg)'},
      {transform:`translate(${dx*.45}px,${dy*.45-180}px) scale(.7) rotate(-28deg)`,offset:.5},
      {transform:`translate(${dx}px,${dy}px) scale(.2) rotate(12deg)`}],{duration:950,easing:'cubic-bezier(.45,0,.55,1)'});
    a.onfinish=()=>{el.remove();res()};
  })}
  async function add(i,fromRect){
    if(picks.includes(i))return;
    if(fromRect&&!reduced)await fly(i,fromRect);
    picks.push(i);render(i);
    root.classList.remove('bump');void root.offsetWidth;root.classList.add('bump');
  }
  function setOpen(v){open=v;root.classList.toggle('open',v);btn.setAttribute('aria-expanded',v);$('tray').setAttribute('aria-hidden',!v);render()}
  btn.addEventListener('click',()=>setOpen(!open));
  document.addEventListener('pointerdown',e=>{if(open&&!root.contains(e.target))setOpen(false)});
  render();
  return{add,setOpen,
    reset(){picks=[];setOpen(false)},
    show(v){root.classList.toggle('hidden',!v);if(!v)setOpen(false)}};
})();
