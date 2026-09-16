/* =====================================================================
   DÉCOR DU CHEMIN — du sous-bois à l'alpage, puis au jardin.
   Chaque spécimen a son habitat ; le décor change autour de lui.
   ===================================================================== */
const forest=$('forest'),world=$('world');
const HAB={
  bois:     {g:'#5a4122',tree:1,leaf:1,fern:1},
  prairie:  {g:'#5f8436',tree:.2,grass:1,flowers:['#f4f1ff','#f7e36a','#c9a6f0']},
  verger:   {g:'#657a38',tree:.6,apple:1,grass:.6,leaf:.4},
  conifere: {g:'#6a4a2a',conifer:1,needles:1,fern:.4},
  alpage:   {g:'#7d9d4c',grass:1,rocks:1,flowers:['#7f8cf5','#f7e36a','#f4f1ff','#b58cf0']},
  lisiere:  {g:'#6a8a3e',tree:.6,grass:1,leaf:.3,flowers:['#fff8e0']},
  chenaie:  {g:'#5b4020',tree:1,leaf:1,fern:.6},
  clairiere:{g:'#7f9a48',tree:.3,grass:1,flowers:['#f4f1ff','#f7e36a']},
  jardin:   {g:'#5f7d37',tree:.3,grass:.7,fence:1,leaf:.4}
};

function decidTree(x,base,h,R,pal,apples){
  const tw=h*.045+R()*h*.02;
  let s=`<path d="M${r1(x-tw)} ${base}C${r1(x-tw*.6)} ${r1(base-h*.4)} ${r1(x-tw*.4)} ${r1(base-h*.6)} ${r1(x-tw*.2)} ${r1(base-h*.72)}L${r1(x+tw*.2)} ${r1(base-h*.72)}C${r1(x+tw*.4)} ${r1(base-h*.6)} ${r1(x+tw*.6)} ${r1(base-h*.4)} ${r1(x+tw)} ${base}Z" fill="${pal.trunk}"/>
  <path d="M${r1(x)} ${r1(base-h*.52)}L${r1(x-h*.16)} ${r1(base-h*.8)}M${r1(x)} ${r1(base-h*.6)}L${r1(x+h*.14)} ${r1(base-h*.84)}" stroke="${pal.trunk}" stroke-width="${r1(tw*.5)}" stroke-linecap="round"/>`;
  const cy=base-h*.8;
  for(let i=0;i<10;i++){const a=R()*6.28,rr=h*(.11+R()*.12),d=h*.17*R();
    s+=`<circle cx="${r1(x+Math.cos(a)*d*1.5)}" cy="${r1(cy+Math.sin(a)*d*.8)}" r="${r1(rr)}" fill="${pal.leaf[i%pal.leaf.length]}"/>`}
  for(let i=0;i<6;i++){const a=3.6+R()*1.6,rr=h*(.05+R()*.06),d=h*.2*R();
    s+=`<circle cx="${r1(x+Math.cos(a)*d*1.3)}" cy="${r1(cy+Math.sin(a)*d-h*.04)}" r="${r1(rr)}" fill="${pal.hi}" opacity=".55"/>`}
  if(apples)for(let i=0;i<10;i++){const a=R()*6.28,d=h*.2*R();s+=`<circle cx="${r1(x+Math.cos(a)*d*1.4)}" cy="${r1(cy+Math.sin(a)*d*.8)}" r="${r1(h*.014+2)}" fill="${i%3?'#c8402a':'#e3a53a'}"/>`}
  return s;
}
function conifer(x,base,h,col,hi){
  let s=`<rect x="${r1(x-h*.02)}" y="${r1(base-h*.2)}" width="${r1(h*.04)}" height="${r1(h*.2)}" fill="#3a2a1a"/>`;
  for(let t=0;t<7;t++){const y=base-h*.1-t*h*.125,w=h*.25*(1-t/7.5);
    s+=`<path d="M${r1(x-w)} ${r1(y)}Q${r1(x-w*.3)} ${r1(y-h*.05)} ${r1(x)} ${r1(y-h*.2)}Q${r1(x+w*.3)} ${r1(y-h*.05)} ${r1(x+w)} ${r1(y)}Q${r1(x)} ${r1(y-h*.03)} ${r1(x-w)} ${r1(y)}Z" fill="${col}"/>
    <path d="M${r1(x-w*.1)} ${r1(y-h*.17)}Q${r1(x-w*.35)} ${r1(y-h*.06)} ${r1(x-w*.85)} ${r1(y-h*.005)}" stroke="${hi}" stroke-width="2" fill="none" opacity=".5"/>`}
  return s;
}
function bigTrunk(x,top,base,w,R){
  let s=`<path d="M${r1(x-w/2)} ${top}L${r1(x+w/2)} ${top}L${r1(x+w*.52)} ${r1(base-34)}C${r1(x+w*.7)} ${r1(base-10)} ${r1(x+w*1.1)} ${base} ${r1(x+w*1.35)} ${base+8}L${r1(x-w*1.35)} ${base+8}C${r1(x-w*1.1)} ${base} ${r1(x-w*.7)} ${r1(base-10)} ${r1(x-w*.52)} ${r1(base-34)}Z" fill="url(#bark)"/>`;
  for(let i=0;i<7;i++){const xx=x-w*.42+i*w*.14+(R()-.5)*6;let d=`M${r1(xx)} ${top}`;
    for(let y=top+40;y<base-20;y+=40)d+=`L${r1(xx+(R()-.5)*6)} ${r1(y)}`;
    s+=`<path d="${d}" stroke="#1a120a" stroke-width="${r1(2+R()*2)}" fill="none" opacity=".6"/><path d="${d}" transform="translate(3 0)" stroke="#7a6044" stroke-width="1" fill="none" opacity=".35"/>`}
  s+=`<path d="M${r1(x-w*.8)} ${base}C${r1(x-w*.6)} ${r1(base-50)} ${r1(x-w*.2)} ${r1(base-70)} ${r1(x-w*.1)} ${r1(base-40)}C${r1(x)} ${r1(base-10)} ${r1(x-w*.3)} ${base} ${r1(x-w*.8)} ${base}Z" fill="#5b7d32" opacity=".85"/>`;
  return s;
}
function fern(x,y,len,dir,R){
  const pts=[],n=14;let s='';
  for(let i=0;i<=n;i++){const t=i/n;pts.push([x+dir*len*.55*t+dir*len*.25*t*t,y-len*.8*t+len*.45*t*t])}
  s+=`<path d="M${P(pts[0])}${curve(pts)}" stroke="#3f6a2a" stroke-width="2.4" fill="none"/>`;
  for(let i=1;i<n;i++){const [px,py]=pts[i],l=len*.26*(1-i/n)+4,d=Math.atan2(pts[i+1][1]-py,pts[i+1][0]-px);
    [1,-1].forEach(sg=>{const a=d+sg*1.15;
      s+=`<path d="M${r1(px)} ${r1(py)}Q${r1(px+Math.cos(a)*l*.6)} ${r1(py+Math.sin(a)*l*.6-3)} ${r1(px+Math.cos(a)*l)} ${r1(py+Math.sin(a)*l)}" stroke="${sg>0?'#5a8f3a':'#4a7d30'}" stroke-width="${r1(4.5*(1-i/n)+1.2)}" stroke-linecap="round" fill="none"/>`})}
  return s;
}
function rock(x,y,rx,ry,seed){
  return `<path d="${blob(x,y,rx,ry,seed,8,.15)}" fill="#7d7c70"/><path d="${blob(x-rx*.15,y-ry*.3,rx*.7,ry*.5,seed+2,7,.12)}" fill="#a9a898"/><path d="${blob(x+rx*.2,y+ry*.35,rx*.6,ry*.25,seed+3,7,.1)}" fill="#5b5a50" opacity=".6"/>`;
}

function buildScene(){
  const H=forest.clientHeight,VW=forest.clientWidth,W=Math.round(Math.max(H*4.2,VW*2.6));
  world.style.width=W+'px';
  const R=rng(11),specX=i=>(.055+i*.098)*W;
  const zx=(f,i)=>VW/2+(1-f)*(specX(i)-VW/2);   // position dans une couche de parallaxe f
  const zoneOf=x=>Math.max(0,Math.min(S.length-1,Math.round((x/W-.055)/.098)));

  /* ---------- Lointain : ciel, soleil, montagnes de l'alpage ---------- */
  let far=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b6d4cf"/><stop offset=".42" stop-color="#e7ecca"/><stop offset=".72" stop-color="#bccd94"/><stop offset="1" stop-color="#6f8f55"/></linearGradient>
    <radialGradient id="sun"><stop offset="0" stop-color="#fffbe6" stop-opacity="1"/><stop offset=".25" stop-color="#fff2bf" stop-opacity=".55"/><stop offset="1" stop-color="#fff2bf" stop-opacity="0"/></radialGradient>
    <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8ea6b0"/><stop offset="1" stop-color="#a9bcae"/></linearGradient>
    <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#eef3dc" stop-opacity="0"/><stop offset="1" stop-color="#eef3dc" stop-opacity=".5"/></linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#sky)"/>
    <circle cx="${r1(VW*.8)}" cy="${r1(H*.14)}" r="${r1(H*.42)}" fill="url(#sun)"/>`;
  const mc=zx(.74,4.5);
  [[-.95,.3,.5],[-.55,.2,.62],[-.15,.12,.7],[.25,.18,.58],[.7,.28,.5],[1.05,.36,.45]].forEach(([o,top,w])=>{
    const x=mc+o*VW,yt=H*top,hw=VW*w*.5,yb=H*.62;
    far+=`<path d="M${r1(x-hw)} ${yb}L${r1(x-hw*.3)} ${r1(yt+H*.1)}L${r1(x)} ${r1(yt)}L${r1(x+hw*.25)} ${r1(yt+H*.08)}L${r1(x+hw)} ${yb}Z" fill="url(#mt)"/>
      <path d="M${r1(x)} ${r1(yt)}L${r1(x+hw*.25)} ${r1(yt+H*.08)}L${r1(x+hw)} ${yb}L${r1(x)} ${yb}Z" fill="#6f8894" opacity=".35"/>
      <path d="M${r1(x-hw*.22)} ${r1(yt+H*.07)}L${r1(x)} ${r1(yt)}L${r1(x+hw*.2)} ${r1(yt+H*.065)}L${r1(x+hw*.08)} ${r1(yt+H*.05)}L${r1(x-hw*.02)} ${r1(yt+H*.08)}L${r1(x-hw*.12)} ${r1(yt+H*.055)}Z" fill="#f6f8f4"/>`});
  let tl=`M0 ${H}`;for(let x=0;x<=W;x+=34)tl+=`L${x} ${r1(H*(.56+.025*Math.sin(x*.02)+.015*Math.sin(x*.057)))}`;
  far+=`<path d="${tl}L${W} ${H}Z" fill="#88a676" opacity=".85"/><rect width="${W}" height="${H}" fill="url(#haze)"/></svg>`;
  $('lFar').innerHTML=far;

  /* ---------- Plan moyen : arbres selon l'habitat, rayons de lumière ---------- */
  let mid=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8d8" stop-opacity=".28"/><stop offset="1" stop-color="#fff8d8" stop-opacity="0"/></linearGradient>
    <linearGradient id="hill" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${S.map((s,i)=>`<stop offset="${r1(Math.min(1,Math.max(0,zx(.38,i)/W))*1000)/1000}" stop-color="${HAB[s.hab].tree>=.6||HAB[s.hab].conifer?'#3e5a31':'#6a8a46'}"/>`).join('')}</linearGradient></defs>`;
  const pal={trunk:'#46603a',leaf:['#4f7040','#5c7e4a','#46663b'],hi:'#86a568'};
  S.forEach((s,i)=>{const h=HAB[s.hab],cx=zx(.38,i),spread=W*.055;
    const n=Math.round((h.tree||0)*5);
    for(let k=0;k<n;k++){const x=cx+(R()*2-1)*spread,th=H*(.38+R()*.18);mid+=decidTree(x,H*.66,th,R,pal,h.apple&&k%2===0)}
    if(h.conifer)for(let k=0;k<7;k++){const x=cx+(R()*2-1)*spread*1.2;mid+=conifer(x,H*.67,H*(.36+R()*.2),'#2f5234','#5d8a5a')}
    if(h.fence)for(let k=0;k<3;k++)mid+=decidTree(cx+(k-1)*spread*.9,H*.66,H*.32,R,{trunk:'#4d5f3a',leaf:['#5f8a44','#6d9550'],hi:'#9cc07a'});
    if(s.hab==='alpage'&&i===4)mid+=`<g transform="translate(${r1(cx+spread*.7)} ${r1(H*.6)})"><rect x="-38" y="-30" width="76" height="36" fill="#7a5a3a"/><path d="M-50 -28L0 -62L50 -28Z" fill="#5a4030"/><rect x="-10" y="-16" width="14" height="22" fill="#3a2a1a"/><rect x="14" y="-22" width="14" height="10" fill="#e8d9a8"/></g>`;
    if((h.tree||0)>=.6||h.conifer)for(let k=0;k<2;k++){const x=cx+(R()*2-1)*spread;mid+=`<path d="M${r1(x)} 0L${r1(x+30+R()*40)} 0L${r1(x+H*.42)} ${r1(H*.72)}L${r1(x+H*.3)} ${r1(H*.72)}Z" fill="url(#ray)"/>`}
  });
  mid+=`<path d="M0 ${H*.64}Q${W*.2} ${H*.6} ${W*.45} ${H*.66}T${W} ${H*.63}V${H}H0Z" fill="url(#hill)"/></svg>`;
  $('lMid').innerHTML=mid;

  /* ---------- Premier plan : sol, troncs, fougères, herbes, rochers, clôture ---------- */
  let near=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e4832"/><stop offset=".4" stop-color="#3d2d1c"/><stop offset="1" stop-color="#1e150c"/></linearGradient>
    <linearGradient id="soil" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${S.map((s,i)=>`<stop offset="${r1(specX(i)/W*1000)/1000}" stop-color="${HAB[s.hab].g}"/>`).join('')}</linearGradient>
    <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140d05" stop-opacity=".5"/></linearGradient>
    <radialGradient id="dap"><stop offset="0" stop-color="#fff2b0" stop-opacity=".35"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient></defs>`;
  S.forEach((s,i)=>{if(i===S.length-1)return;const a=HAB[s.hab],b=HAB[S[i+1].hab];
    if((a.tree||0)>=.6||(b.tree||0)>=.6||a.conifer||b.conifer)near+=bigTrunk((specX(i)+specX(i+1))/2+(R()-.5)*30,0,H*.78,42+R()*24,R)});
  let gp=`M0 ${H}`;const gy=x=>H*.74+Math.sin(x*.004)*H*.012+Math.sin(x*.011)*H*.006;
  for(let x=0;x<=W;x+=50)gp+=`L${x} ${r1(gy(x))}`;
  near+=`<path d="${gp}L${W} ${H}Z" fill="url(#soil)"/><path d="${gp}L${W} ${H}Z" fill="url(#deep)"/>`;
  S.forEach((s,i)=>{const h=HAB[s.hab],cx=specX(i),half=W*.049,x0=cx-half;
    const rx=()=>x0+R()*half*2,ry=()=>gy(cx)+R()*(H-gy(cx));
    if(h.tree>=.6||h.conifer)for(let k=0;k<4;k++)near+=`<ellipse cx="${r1(rx())}" cy="${r1(ry())}" rx="${r1(40+R()*60)}" ry="${r1(10+R()*12)}" fill="url(#dap)"/>`;
    if(h.leaf)for(let k=0;k<70*h.leaf;k++){const x=rx(),y=ry(),c=['#8a5a26','#a3702f','#6e4a22','#b98a3a','#7d5f2a'][k%5],l=6+R()*8;
      near+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(l)}" ry="${r1(l*.4)}" transform="rotate(${r1(R()*180)} ${r1(x)} ${r1(y)})" fill="${c}"/>`}
    if(h.needles)for(let k=0;k<160;k++){const x=rx(),y=ry(),a=R()*3.14;near+=`<path d="M${r1(x)} ${r1(y)}l${r1(Math.cos(a)*9)} ${r1(Math.sin(a)*3)}" stroke="${k%2?'#9a6a3a':'#7a5028'}" stroke-width="1.2"/>`}
    if(h.fern)for(let k=0;k<3*h.fern;k++){const x=rx(),y=gy(x)+H*.04+R()*H*.1;near+=fern(x,y,H*(.1+R()*.06),R()<.5?-1:1,R)+fern(x,y,H*(.08+R()*.05),R()<.5?-1:1,R)}
    if(h.rocks)for(let k=0;k<4;k++){const x=rx(),y=ry();near+=rock(x,y,14+R()*26,8+R()*12,Math.floor(R()*99))}
    if(h.fence){let f='';for(let k=0;k<7;k++){const x=x0+k*half*.33;f+=`<rect x="${r1(x)}" y="${r1(gy(x)-H*.09)}" width="9" height="${r1(H*.1)}" fill="#8a6a44"/><path d="M${r1(x)} ${r1(gy(x)-H*.09)}l4.5 -8l4.5 8Z" fill="#8a6a44"/>`}
      near+=f+`<path d="M${r1(x0)} ${r1(gy(x0)-H*.065)}L${r1(x0+half*2)} ${r1(gy(x0)-H*.065)}M${r1(x0)} ${r1(gy(x0)-H*.03)}L${r1(x0+half*2)} ${r1(gy(x0)-H*.03)}" stroke="#7a5a38" stroke-width="5"/>`}
    if(h.grass){const n=Math.round(140*h.grass);
      near+=grass(i*13+5,cx,gy(cx)+H*.02,half,n,H*.05,['#5f8f3a','#7aa84a','#46702c','#8cb85a'])+grass(i*7+2,cx,H*.97,half,Math.round(n*.6),H*.06,['#4d7a2e','#6a9a3e','#3a6424'])}
    if(h.flowers)for(let k=0;k<40;k++){const x=rx(),y=ry()-4,c=h.flowers[k%h.flowers.length];near+=`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(2.2+R()*1.6)}" fill="${c}"/><circle cx="${r1(x)}" cy="${r1(y)}" r="1" fill="#e9b53a"/>`}
  });
  $('lNear').innerHTML=near+'</svg>';

  /* ---------- Avant-plan flou ---------- */
  $('lFront').innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <filter id="dof" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="7"/></filter></defs>
    ${rep(9,()=>{const x=R()*W,y=H*(.87+R()*.13);return `<path d="M${r1(x)} ${H}Q${r1(x+46)} ${r1(y)} ${r1(x+128)} ${r1(y-32)}Q${r1(x+54)} ${r1(y+42)} ${r1(x)} ${H}Z" fill="#2c4724" filter="url(#dof)"/>`})}
    ${rep(5,()=>{const x=R()*W;return `<path d="M${r1(x)} 0Q${r1(x+64)} ${r1(H*.13)} ${r1(x+156)} ${r1(H*.05)}Q${r1(x+74)} ${r1(H*.22)} ${r1(x)} 0Z" fill="#223719" filter="url(#dof)"/>`})}</svg>`;

  /* ---------- Spécimens ---------- */
  document.querySelectorAll('.spec').forEach(e=>e.remove());
  const sz=Math.min(H*.24,220);
  S.forEach((s,i)=>{
    const b=document.createElement('button');
    b.className='spec'+(state.done[i]!==undefined?' done':'')+(state.picked[i]?' picked':'');
    b.style.cssText=`left:${specX(i)}px;bottom:${H*.05+(i%3)*H*.045}px;width:${sz}px;height:${sz}px`;
    b.setAttribute('aria-label',`Examiner le spécimen ${i+1}`);
    b.innerHTML=svgOf(ART,s.k,{lite:true})+`<span class="num">${i+1}</span>`;
    b.onclick=()=>openInspect(i);world.appendChild(b);
  });
  parallax();
}
function goTo(left,smooth){try{forest.scrollTo({left,behavior:smooth?'smooth':'auto'})}catch(e){forest.scrollLeft=left}}
function parallax(){const x=forest.scrollLeft;
  $('lFar').style.transform=`translateX(${x*.74}px)`;$('lMid').style.transform=`translateX(${x*.38}px)`;
  $('lFront').style.transform=`translateX(${-x*.14}px)`}
forest.addEventListener('scroll',()=>{parallax();if(forest.scrollLeft>50)$('hint').style.opacity=0},{passive:true});
