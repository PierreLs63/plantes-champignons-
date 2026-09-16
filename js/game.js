/* =====================================================================
   DÉROULÉ DU JEU
   ===================================================================== */
const newState=()=>({done:{},picked:{},pts:0,ok:0,zero:0,ko:0,cur:null,used:{}});
let state=newState();
function hud(){$('score').textContent=state.pts+' pt'+(Math.abs(state.pts)>1?'s':'');
  $('dots').innerHTML=S.map((_,i)=>`<i class="${state.done[i]||''}"></i>`).join('')}

/* ===================== INSPECTION ===================== */
const stage=$('stage'),loupe=$('loupe'),inner=loupe.querySelector('.inner'),scent=$('scent'),notes=$('notes');const Z=2.7;
function openInspect(i){
  const s=S[i];state.cur=i;state.used={};
  Basket.setOpen(false);
  showArt(ART,s.k);
  loupe.classList.remove('on');scent.classList.remove('on');stage.classList.remove('grab');
  $('pStep').textContent=`Spécimen ${i+1} sur ${S.length}`;
  $('pTitle').textContent=s.title;
  $('stageCap').textContent='Choisissez un outil pour examiner le spécimen';
  notes.innerHTML=`<li class="ph">Vos indices s'afficheront ici, au fil de l'enquête.</li>`;
  $('tools').innerHTML=TOOLS.map(([k,e,n,d])=>s.t[k]?
    `<button class="tool" data-t="${k}"><em>${e}</em><span>${n}<span class="sub">${d}</span></span></button>`:'').join('');
  $('tools').querySelectorAll('.tool').forEach(b=>b.onclick=()=>useTool(b.dataset.t,b));
  $('pickBtn').textContent=s.pick;
  noteCount();
  $('inspect').classList.add('open');$('inspect').scrollTop=0;notes.scrollTop=0;requestAnimationFrame(fadeNotes);
}
function useTool(k,btn){
  const s=S[state.cur],[,e,n]=TOOLS.find(t=>t[0]===k);
  let li=notes.querySelector(`li[data-t="${k}"]`);
  if(!li){
    state.used[k]=1;btn.classList.add('used');notes.querySelector('.ph')?.remove();
    notes.insertAdjacentHTML('beforeend',`<li data-t="${k}"><em>${e}</em><span><span class="k">${n}</span><b>${s.t[k]}</b></span></li>`);
    li=notes.lastElementChild;noteCount();
  }
  notes.querySelectorAll('li.cur').forEach(x=>x.classList.remove('cur'));li.classList.add('cur');
  scrollToNote(li);
  scent.classList.remove('on');loupe.classList.remove('on');stage.classList.remove('grab');
  if(k==='loupe'){showArt(ART,s.k);loupe.classList.add('on');stage.classList.add('grab');primeLoupe(ART,s.k);
    $('stageCap').textContent='Glissez le doigt : la loupe suit et grossit ce qui est dessous'}
  else if(k==='coupe'){showArt(CUT,s.k);$('stageCap').textContent=''}
  else if(k==='odorat'){showArt(ART,s.k);
    scent.innerHTML=`<div class="note">${s.t.odorat}</div>`+rep(3,i=>`<div class="waft" style="animation-delay:${i*1.1}s"></div>`);
    scent.classList.add('on');$('stageCap').textContent=''}
  else{showArt(ART,s.k);$('stageCap').textContent=s.t.habitat}
}

/* Indices : liste défilante, l'indice consulté est amené au centre */
function noteCount(){const n=Object.keys(state.used).length,t=$('tools').children.length;$('notesCount').textContent=`${n} / ${t}`}
function scrollToNote(li){requestAnimationFrame(()=>{
  const top=li.offsetTop-Math.max(0,(notes.clientHeight-li.offsetHeight)/2);
  notes.scrollTo({top:Math.max(0,top),behavior:'smooth'});setTimeout(fadeNotes,420)})}
function fadeNotes(){const t=notes.scrollTop,m=notes.scrollHeight-notes.clientHeight;
  notes.style.setProperty('--ft',t>2?'26px':'0px');notes.style.setProperty('--fb',m-t>2?'34px':'0px');
  $('notesMore').hidden=!(m-t>12)}
notes.addEventListener('scroll',fadeNotes,{passive:true});
$('notesMore').onclick=()=>notes.scrollBy({top:notes.clientHeight*.7,behavior:'smooth'});

function showArt(set,k){stage.querySelectorAll(':scope > svg').forEach(e=>e.remove());
  stage.insertAdjacentHTML('afterbegin',svgOf(set,k))}
const artBox=()=>{const r=stage.getBoundingClientRect(),art=Math.min(r.width,r.height)*.92;return{r,art,ox:(r.width-art)/2,oy:(r.height-art)/2}};
function primeLoupe(set,k){const {r,art}=artBox();
  inner.innerHTML=svgOf(set,k,{w:art*Z,h:art*Z});moveLoupe(r.width/2,r.height*.48)}
function moveLoupe(px,py){
  const {r,ox,oy}=artBox(),half=loupe.offsetWidth/2;
  px=Math.max(0,Math.min(r.width,px));py=Math.max(0,Math.min(r.height,py));
  loupe.style.left=px+'px';loupe.style.top=py+'px';
  inner.style.transform=`translate(${half-(px-ox)*Z}px,${half-(py-oy)*Z}px)`}
const pt=e=>{const r=stage.getBoundingClientRect();return [e.clientX-r.left,e.clientY-r.top]};
stage.addEventListener('pointerdown',e=>{if(!loupe.classList.contains('on'))return;
  stage.setPointerCapture(e.pointerId);moveLoupe(...pt(e))});
stage.addEventListener('pointermove',e=>{if(!loupe.classList.contains('on'))return;
  if(e.buttons||e.pointerType==='touch')moveLoupe(...pt(e))});

/* ===================== VERDICT ===================== */
function decide(picked){
  const i=state.cur,s=S[i],right=picked===s.edible;let cls,v,pts;
  const from=stage.getBoundingClientRect();
  if(right){cls='ok';v=s.ok;pts=10;state.ok++;state.done[i]='ok';if(picked)spores()}
  else if(picked&&!s.edible){cls='ko';v=s.ko;pts=-10;state.ko++;state.done[i]='ko';
    $('flash').classList.remove('go');void $('flash').offsetWidth;$('flash').classList.add('go')}
  else{cls='zero';v=s.ko;pts=0;state.zero++;state.done[i]='zero'}
  state.pts+=pts;
  if(picked){state.picked[i]=true;Basket.add(i,from)}
  $('vSheet').className='sheet '+cls;
  $('vTitle').textContent=v.t;$('vSub').textContent=v.s;
  $('vPts').textContent=pts>0?'+10':pts<0?'−10':'0';
  $('vName').textContent=s.name;$('vLatin').textContent=s.latin;
  $('vMain').textContent=v.m;$('vWhy').textContent=s.why;
  $('nextBtn').textContent=(S.length-Object.keys(state.done).length)?'Spécimen suivant':'Voir mon bilan';
  $('inspect').classList.remove('open');$('verdict').classList.add('open');
  const el=document.querySelectorAll('.spec')[i];el.classList.add('done');if(picked)el.classList.add('picked');
  hud();
}
function spores(){const cx=innerWidth/2,cy=innerHeight/2;
  for(let k=0;k<24;k++){const d=document.createElement('div');d.className='spore';
    const a=Math.random()*6.283,r=130+Math.random()*210;
    d.style.cssText=`left:${cx}px;top:${cy}px;background:${['#e39a1c','#c9d3a0','#fcfcf5','#7b4a25'][k%4]};--dx:${Math.cos(a)*r}px;--dy:${Math.sin(a)*r}px`;
    document.body.appendChild(d);setTimeout(()=>d.remove(),1200)}}
function next(){$('verdict').classList.remove('open');
  if(Object.keys(state.done).length===S.length)showEnd();
  else{const n=S.findIndex((_,i)=>state.done[i]===undefined),el=document.querySelectorAll('.spec')[n];
    if(el)goTo(Math.max(0,el.offsetLeft-forest.clientWidth/2),true)}}

/* ===================== BILAN ===================== */
/* Un niveau par tranche de 10 points (index = points / 10), plus un pour les scores négatifs */
const LEVELS=Object.assign([
  ['🍂 Cueilleur imprudent','Autant de pièges évités que de pièges tombés dans le panier. En vrai, cela ne pardonne pas : à revoir avec un expert.'],
  ['🌱 Pousse timide','Quelques bons réflexes émergent, mais trop d’erreurs graves. Ne cueillez jamais sans avis qualifié.'],
  ['🥾 Randonneur distrait','Vous commencez à regarder de plus près, mais les sosies toxiques vous ont encore piégé.'],
  ['🔎 Curieux de nature','L’envie d’observer est là. Il manque encore de la méthode pour trancher sans risque.'],
  ['📖 Apprenti naturaliste','Vous connaissez quelques critères clés. Utilisez-les tous, systématiquement, avant de décider.'],
  ['🌿 Promeneur averti','Une bonne moitié de décisions justes. Quelques confusions dangereuses restent à corriger.'],
  ['🧺 Amateur prudent','Bonnes connaissances, mais quelques hésitations et des pièges non détectés.'],
  ['🍃 Cueilleur éclairé','Vos observations sont solides. Encore un ou deux réflexes à ancrer pour être sûr de vous.'],
  ['🌳 Botaniste confirmé','Très bon niveau : la loupe, la coupe et l’odorat n’ont presque plus de secret pour vous.'],
  ['🎓 Mycologue en herbe','Presque parfait ! Aucun piège ne vous a eu, seule une prudence de trop vous sépare du sans-faute.'],
  ['🏆 Expert botaniste','Sans-faute ! Vous maîtrisez les critères de sécurité de terrain. Bravo !'],
],{neg:['⚠️ Danger en forêt','Plusieurs intoxications graves évitées de justesse… à l’écran seulement. La pratique est à renforcer avant toute cueillette.']});
function showEnd(){
  const p=state.pts;
  $('final').innerHTML=`${p} <span>/ 100</span>`;
  $('bOk').textContent=state.ok;$('bZero').textContent=state.zero;$('bKo').textContent=state.ko;
  const lv=p<0?LEVELS.neg:LEVELS[Math.min(10,Math.floor(p/10))];
  $('level').textContent=lv[0];$('levelTxt').textContent=lv[1];
  const errs=S.map((s,i)=>({s,r:state.done[i]})).filter(o=>o.r!=='ok');
  $('review').hidden=true;$('reviewBtn').hidden=!errs.length;
  $('reviewBtn').onclick=()=>{const r=$('review');
    r.innerHTML='<h3>À revoir</h3>'+errs.map(o=>`<p><b>${o.s.name}</b> <span>(${o.s.latin})</span><br>${o.s.why}</p>`).join('');
    r.hidden=false;$('reviewBtn').hidden=true;r.scrollIntoView({behavior:'smooth',block:'start'})};
  Basket.show(false);document.body.classList.remove('playing');
  $('end').classList.add('open');$('end').scrollTop=0;
  Finale.start();
}
function reset(){state=newState();
  $('end').classList.remove('open');Finale.stop();
  Basket.reset();Basket.show(true);document.body.classList.add('playing');
  hud();buildScene();goTo(0);$('hint').style.opacity=1}

$('startBtn').onclick=()=>{$('intro').classList.remove('open');Basket.show(true);document.body.classList.add('playing')};
$('pickBtn').onclick=()=>decide(true);$('leaveBtn').onclick=()=>decide(false);
$('nextBtn').onclick=next;$('replayBtn').onclick=reset;
$('inspect').addEventListener('click',e=>{if(e.target.id==='inspect')$('inspect').classList.remove('open')});
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(buildScene,160)});
Basket.show(false);hud();buildScene();
