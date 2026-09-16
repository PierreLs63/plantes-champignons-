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
  if(apples)for(let i=0;i<10;i++){const a=R()*6.28,d=h*.2*R(),ax=x+Math.cos(a)*d*1.4,ay=cy+Math.sin(a)*d*.8,ar=h*.014+2;
    s+=`<circle cx="${r1(ax)}" cy="${r1(ay)}" r="${r1(ar)}" fill="${i%3?'#c43a24':'#e2a33a'}"/>
    <ellipse cx="${r1(ax+ar*.28)}" cy="${r1(ay+ar*.28)}" rx="${r1(ar*.45)}" ry="${r1(ar*.32)}" fill="#6e1c12" opacity=".35"/>
    <ellipse cx="${r1(ax-ar*.32)}" cy="${r1(ay-ar*.38)}" rx="${r1(ar*.32)}" ry="${r1(ar*.22)}" fill="#fff6d6" opacity=".4"/>`}
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
function earth(seed,cx,y0,half,H){
  const R=rng(seed);let s='';
  const patch=['#3f2a16','#6a4524','#2a180c','#7d5530','#4e331c','#8b6340'];
  for(let i=0;i<22;i++){const x=cx+(R()*2-1)*half,y=y0+R()*(H-y0)*.9;
    s+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(16+R()*48)}" ry="${r1(5+R()*16)}" fill="${patch[i%6]}" opacity="${.22+R()*.4}"/>`}
  for(let i=0;i<16;i++){const x=cx+(R()*2-1)*half,y=y0+6+R()*(H-y0)*.82,rx=3.5+R()*8,ry=2+R()*4;
    s+=`<path d="${blob(x,y,rx,ry,seed+i,7,.16)}" fill="${i%3?'#7a6e5c':'#5c5040'}"/><path d="${blob(x-rx*.2,y-ry*.35,rx*.55,ry*.4,seed+i+3,6,.12)}" fill="#b0a490" opacity=".55"/>`}
  for(let i=0;i<12;i++){const x=cx+(R()*2-1)*half,y=y0+R()*H*.1,l=12+R()*28,a=(R()*2-1)*.55;
    s+=`<path d="M${r1(x)} ${r1(y)}q${r1(l*.45)} ${r1(a*10)} ${r1(l)} ${r1(a*16)}" stroke="${i%2?'#2c1a0c':'#5a3a1c'}" stroke-width="${r1(1.1+R()*1.6)}" fill="none" stroke-linecap="round" opacity=".75"/>`}
  for(let i=0;i<8;i++){const x=cx+(R()*2-1)*half*.9,y=y0+4+R()*10;
    s+=`<path d="M${r1(x)} ${r1(y)}c${r1(4+R()*6)} ${r1(8+R()*10)} ${r1(-3-R()*5)} ${r1(14+R()*12)} ${r1(R()*5-2)} ${r1(22+R()*16)}" stroke="#3a2412" stroke-width="1.3" fill="none" opacity=".45"/>`}
  return s;
}
/* Chalet d'alpage : base = ligne de sol (le soubassement s'enfonce un peu). */
function chalet(x,base,h){
  const L=x-h*.5,R=x+h*.44,T=base-h*.52,B=base-h*.07,pkx=x-h*.04,pky=base-h;
  const win=(wx,wy,ww,wh,box=true)=>`<rect x="${r1(wx-h*.045)}" y="${r1(wy)}" width="${r1(h*.04)}" height="${r1(wh)}" fill="#3a6a34" rx=".8"/>
    <rect x="${r1(wx+ww)}" y="${r1(wy)}" width="${r1(h*.04)}" height="${r1(wh)}" fill="#2d552a" rx=".8"/>
    <rect x="${r1(wx-1)}" y="${r1(wy-1)}" width="${r1(ww+2)}" height="${r1(wh+2)}" fill="#4a3018" rx="1"/>
    <rect x="${r1(wx)}" y="${r1(wy)}" width="${r1(ww)}" height="${r1(wh)}" fill="#dce8c8"/>
    <path d="M${r1(wx+ww/2)} ${r1(wy)}L${r1(wx+ww/2)} ${r1(wy+wh)}M${r1(wx)} ${r1(wy+wh/2)}L${r1(wx+ww)} ${r1(wy+wh/2)}" stroke="#4a3018" stroke-width="${r1(h*.018)}"/>`+(box?`
    <rect x="${r1(wx-h*.03)}" y="${r1(wy+wh)}" width="${r1(ww+h*.06)}" height="${r1(h*.028)}" fill="#6a4828"/>
    <ellipse cx="${r1(wx+ww*.28)}" cy="${r1(wy+wh+h*.05)}" rx="${r1(h*.028)}" ry="${r1(h*.022)}" fill="#c45a6a"/>
    <ellipse cx="${r1(wx+ww*.55)}" cy="${r1(wy+wh+h*.048)}" rx="${r1(h*.024)}" ry="${r1(h*.02)}" fill="#e6d056"/>
    <ellipse cx="${r1(wx+ww*.78)}" cy="${r1(wy+wh+h*.05)}" rx="${r1(h*.022)}" ry="${r1(h*.018)}" fill="#7a4a88"/>`:'');
  let s=`<ellipse cx="${r1(x)}" cy="${r1(base)}" rx="${r1(h*.7)}" ry="${r1(h*.07)}" fill="#243018" opacity=".42"/>`;
  s+=`<path d="M${r1(L-h*.03)} ${r1(base+h*.015)}L${r1(L)} ${r1(B)}L${r1(R+h*.22)} ${r1(B+h*.05)}L${r1(R+h*.26)} ${r1(base+h*.03)}Z" fill="#7c7668"/>`;
  [[.12,.55],[.32,.4],[.55,.62],[.78,.48],[.95,.4]].forEach(([t,k])=>{s+=`<ellipse cx="${r1(L+(R+h*.2-L)*t)}" cy="${r1(B+(base-B)*.55)}" rx="${r1(h*.055*k)}" ry="${r1(h*.032)}" fill="#9a9486"/>`});
  s+=`<path d="M${r1(R)} ${r1(T)}L${r1(R+h*.24)} ${r1(T+h*.1)}L${r1(R+h*.24)} ${r1(B+h*.05)}L${r1(R)} ${r1(B)}Z" fill="#6a4a2a"/>`;
  s+=`<rect x="${r1(L)}" y="${r1(T)}" width="${r1(R-L)}" height="${r1(B-T)}" fill="#c4a06a"/>`;
  s+=`<path d="M${r1(L)} ${r1(T)}L${r1(pkx)} ${r1(pky+h*.1)}L${r1(R)} ${r1(T)}Z" fill="#c4a06a"/>`;
  s+=`<path d="M${r1(R)} ${r1(T)}L${r1(pkx)} ${r1(pky+h*.1)}L${r1(R+h*.24)} ${r1(T+h*.1)}Z" fill="#7a542c"/>`;
  s+=`<circle cx="${r1(pkx)}" cy="${r1(T-h*.12)}" r="${r1(h*.045)}" fill="#4a3018"/><circle cx="${r1(pkx)}" cy="${r1(T-h*.12)}" r="${r1(h*.028)}" fill="#dce8c8"/>`;
  for(let i=1;i<7;i++){const y=T+(B-T)*i/7;s+=`<path d="M${r1(L)} ${r1(y)}L${r1(R)} ${r1(y)}" stroke="#8a6238" stroke-width="${r1(Math.max(1,h*.012))}" opacity=".5"/>`}
  s+=`<rect x="${r1(L)}" y="${r1(T)}" width="${r1(h*.035)}" height="${r1(B-T)}" fill="#8a6238"/><rect x="${r1(R-h*.03)}" y="${r1(T)}" width="${r1(h*.035)}" height="${r1(B-T)}" fill="#7a542c"/>`;
  const dx=x-h*.26,dw=h*.16,dh=h*.28;
  s+=`<rect x="${r1(dx-h*.02)}" y="${r1(B-h*.02)}" width="${r1(dw+h*.04)}" height="${r1(h*.035)}" fill="#6e685c"/>`;
  s+=`<path d="M${r1(dx)} ${r1(B)}L${r1(dx)} ${r1(B-dh)}Q${r1(dx+dw/2)} ${r1(B-dh-h*.04)} ${r1(dx+dw)} ${r1(B-dh)}L${r1(dx+dw)} ${r1(B)}Z" fill="#4a2c16"/>`;
  s+=`<path d="M${r1(dx+h*.025)} ${r1(B-h*.04)}L${r1(dx+h*.025)} ${r1(B-dh+h*.04)}Q${r1(dx+dw/2)} ${r1(B-dh)} ${r1(dx+dw-h*.025)} ${r1(B-dh+h*.04)}L${r1(dx+dw-h*.025)} ${r1(B-h*.04)}Z" fill="#3a2010" opacity=".55"/>`;
  s+=`<circle cx="${r1(dx+dw-h*.03)}" cy="${r1(B-dh*.42)}" r="${r1(h*.014)}" fill="#d4b25a"/>`;
  s+=win(dx,T+h*.02,dw,h*.1,false)+win(x+h*.02,T+h*.12,h*.18,h*.14)+win(x+h*.02,T+h*.34,h*.18,h*.12);
  const rx0=pkx,ry0=pky,rx1=R+h*.32,ry1=T+h*.12,chx=x+h*.22,chw=h*.09;
  const yAt=xx=>ry0+((xx-rx0)/Math.max(1,rx1-rx0))*(ry1-ry0);
  const yL=yAt(chx),yR=yAt(chx+chw),chtop=Math.min(yL,yR)-h*.18;
  s+=`<path d="M${r1(L-h*.18)} ${r1(T+h*.06)}L${r1(pkx)} ${r1(pky)}L${r1(R+h*.34)} ${r1(T+h*.14)}L${r1(R+h*.3)} ${r1(T+h*.22)}L${r1(pkx)} ${r1(pky+h*.1)}L${r1(L-h*.14)} ${r1(T+h*.14)}Z" fill="#4a2818"/>`;
  s+=`<path d="M${r1(L-h*.18)} ${r1(T+h*.06)}L${r1(pkx)} ${r1(pky)}L${r1(R+h*.08)} ${r1(T+h*.04)}L${r1(pkx+h*.02)} ${r1(pky+h*.06)}Z" fill="#6e4030"/>`;
  s+=`<path d="M${r1(chx)} ${r1(chtop)}L${r1(chx+chw)} ${r1(chtop)}L${r1(chx+chw)} ${r1(yR+h*.015)}L${r1(chx)} ${r1(yL+h*.015)}Z" fill="#6a5a52"/>`;
  s+=`<rect x="${r1(chx-h*.018)}" y="${r1(chtop-h*.04)}" width="${r1(chw+h*.036)}" height="${r1(h*.048)}" fill="#4a4038"/>`;
  s+=`<rect x="${r1(chx+h*.028)}" y="${r1(chtop)}" width="${r1(h*.032)}" height="${r1(h*.038)}" fill="#2a221c"/>`;
  return s;
}

/* Panneau d'information en bois, façon sentier de montagne. Base (x,base), hauteur h. */
function trailSign(x,base,h,lines){
  const k=h/100,T=(dx,dy)=>`${r1(x+dx*k)} ${r1(base+dy*k)}`;
  const plank=(y0,y1,c)=>`<path d="M${T(-50,y0)}L${T(50,y0)}L${T(50,y1)}L${T(-50,y1)}Z" fill="${c}"/>`;
  const grain=rep(9,i=>{const y=-92+i*6.6,w=(i%3-1)*1.4;return `<path d="M${T(-48,y)}C${T(-20,y+w)} ${T(10,y-w)} ${T(48,y+w*.5)}" stroke="#5a3a1c" stroke-width="${r1(.6*k)}" fill="none" opacity=".35"/>`});
  const knot=(dx,dy)=>`<ellipse cx="${r1(x+dx*k)}" cy="${r1(base+dy*k)}" rx="${r1(2.6*k)}" ry="${r1(1.3*k)}" fill="none" stroke="#5a3a1c" stroke-width="${r1(.6*k)}" opacity=".5"/>`;
  /* lettres défoncées dans le bois puis peintes : creux sombre en haut à gauche, arête claire en bas à droite */
  const txt=(t,dy,fs,extra='')=>{const at=(ox,oy,fill,op)=>`<text x="${r1(x+ox*k)}" y="${r1(base+(dy+oy)*k)}" font-size="${r1(fs*k)}" text-anchor="middle" fill="${fill}" opacity="${op}" ${extra}>${t}</text>`;
    return at(-.45,-.45,'#2a1608',.75)+at(.4,.4,'#f0cf98',.55)+at(0,0,'#f6ecd2',1)};
  const post=dx=>`<path d="M${T(dx-4,4)}L${T(dx-3.4,-104)}L${T(dx+3.4,-104)}L${T(dx+4,4)}Z" fill="url(#post)"/>
    <path d="M${T(dx-1.5,0)}L${T(dx-1.2,-100)}" stroke="#3a2412" stroke-width="${r1(.7*k)}" opacity=".5"/>`;
  const f=`font-family="'Nunito','Arial Rounded MT Bold','Verdana',sans-serif" font-weight="800"`;   // lettrage de sentier gravé
  return `<ellipse cx="${r1(x)}" cy="${r1(base+3*k)}" rx="${r1(58*k)}" ry="${r1(6*k)}" fill="#1d1408" opacity=".45"/>
  ${post(-38)}${post(38)}
  <!-- balisage GR (blanc/rouge) sur le poteau gauche -->
  <rect x="${r1(x-41.6*k)}" y="${r1(base-22*k)}" width="${r1(7.2*k)}" height="${r1(2.4*k)}" fill="#f4f0e6"/>
  <rect x="${r1(x-41.6*k)}" y="${r1(base-19.6*k)}" width="${r1(7.2*k)}" height="${r1(2.4*k)}" fill="#c8321e"/>
  <!-- toit à deux pans -->
  <path d="M${T(-60,-100)}L${T(0,-118)}L${T(60,-100)}L${T(56,-96)}L${T(0,-112)}L${T(-56,-96)}Z" fill="#4a2c16"/>
  <path d="M${T(-60,-100)}L${T(0,-118)}L${T(0,-114)}L${T(-58,-98)}Z" fill="#7a4e2a"/>
  <!-- cadre et planches -->
  <path d="M${T(-55,-99)}L${T(55,-99)}L${T(55,-27)}L${T(-55,-27)}Z" fill="#4e2f15"/>
  ${plank(-95,-72,'#b98a52')}${plank(-72,-50,'#a97a45')}${plank(-50,-31,'#b3834c')}
  <path d="M${T(-50,-72)}L${T(50,-72)}M${T(-50,-50)}L${T(50,-50)}" stroke="#4e2f15" stroke-width="${r1(1.2*k)}"/>
  ${grain}${knot(-34,-60)}${knot(30,-86)}
  <path d="M${T(-50,-95)}L${T(50,-95)}" stroke="#e6c48e" stroke-width="${r1(1*k)}" opacity=".6"/>
  ${[[-51,-96],[51,-96],[-51,-30],[51,-30]].map(([a,b])=>`<circle cx="${r1(x+a*k)}" cy="${r1(base+b*k)}" r="${r1(1.4*k)}" fill="#2a1a0c"/>`).join('')}
  ${txt(lines[0],-79.5,10.5,`${f} textLength="${r1(88*k)}" lengthAdjust="spacingAndGlyphs"`)}
  ${txt(lines[1],-56,13,`${f} letter-spacing="${r1(.6*k)}"`)}
  ${txt(lines[2],-35.5,12,`${f} letter-spacing="${r1(3.5*k)}"`)}
  <path d="M${T(-30,-66.5)}L${T(30,-66.5)}" stroke="#fbf1d6" stroke-width="${r1(.7*k)}" opacity=".5"/>
  ${rep(14,i=>{const dx=-54+i*8.3+(i%3)*1.5,hh=6+(i*7)%9;return `<path d="M${T(dx-1.6,4)}Q${T(dx,4-hh*.6)} ${T(dx+(i%2?2.5:-2.5),4-hh)}Q${T(dx+.6,4-hh*.5)} ${T(dx+1.6,4)}Z" fill="${['#4f7d30','#6a9a3e','#3f6a28'][i%3]}"/>`})}`;
}

function buildScene(){
  const H=forest.clientHeight,VW=forest.clientWidth,sz=Math.min(H*.24,220);
  const gap=Math.max(H*.41,VW*.255),pad=sz/2+18,specX=i=>Math.max(VW*.14,pad)+i*gap;
  const W=Math.round(specX(S.length-1)+sz/2+12);
  world.style.width=W+'px';
  const R=rng(11);
  const zx=(f,i)=>VW/2+(1-f)*(specX(i)-VW/2);   // position dans une couche de parallaxe f
  const hillY=x=>H*(.655+.02*Math.sin(x/W*Math.PI*2.15)+.01*Math.sin(x/W*Math.PI*5.1));
  const zoneOf=x=>Math.max(0,Math.min(S.length-1,Math.round((x-specX(0))/gap)));

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
  let tl=`M0 ${r1(H*(.56))}`;for(let x=0;x<=W;x+=34)tl+=`L${x} ${r1(H*(.56+.025*Math.sin(x*.02)+.015*Math.sin(x*.057)))}`;
  far+=`<path d="${tl}L${W} ${r1(H*(.56+.025*Math.sin(W*.02)+.015*Math.sin(W*.057)))}L${W} ${H}L0 ${H}Z" fill="#88a676" opacity=".85"/><rect width="${W}" height="${H}" fill="url(#haze)"/></svg>`;
  $('lFar').innerHTML=far;

  /* ---------- Plan moyen : arbres selon l'habitat, rayons de lumière ---------- */
  let mid=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff8d8" stop-opacity=".28"/><stop offset="1" stop-color="#fff8d8" stop-opacity="0"/></linearGradient>
    <linearGradient id="hill" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${S.map((s,i)=>`<stop offset="${r1(Math.min(1,Math.max(0,zx(.38,i)/W))*1000)/1000}" stop-color="${HAB[s.hab].tree>=.6||HAB[s.hab].conifer?'#3e5a31':'#6a8a46'}"/>`).join('')}</linearGradient></defs>`;
  const pal={trunk:'#46603a',leaf:['#4f7040','#5c7e4a','#46663b'],hi:'#86a568'};
  S.forEach((s,i)=>{const h=HAB[s.hab],cx=zx(.38,i),spread=W*.055;
    const n=Math.round((h.tree||0)*5);
    for(let k=0;k<n;k++){const x=cx+(R()*2-1)*spread,th=H*(.38+R()*.18),y=hillY(x)+H*.012;mid+=decidTree(x,y,th,R,pal,h.apple&&k%2===0)}
    if(h.conifer)for(let k=0;k<7;k++){const x=cx+(R()*2-1)*spread*1.2,y=hillY(x)+H*.014;mid+=conifer(x,y,H*(.36+R()*.2),'#2f5234','#5d8a5a')}
    if(h.fence)for(let k=0;k<3;k++){const x=cx+(k-1)*spread*.9;mid+=decidTree(x,hillY(x)+H*.012,H*.32,R,{trunk:'#4d5f3a',leaf:['#5f8a44','#6d9550'],hi:'#9cc07a'})}
    if((h.tree||0)>=.6||h.conifer)for(let k=0;k<2;k++){const x=cx+(R()*2-1)*spread;mid+=`<path d="M${r1(x)} 0L${r1(x+30+R()*40)} 0L${r1(x+H*.42)} ${r1(H*.72)}L${r1(x+H*.3)} ${r1(H*.72)}Z" fill="url(#ray)"/>`}
  });
  let hp=`M0 ${r1(hillY(0))}`;for(let x=0;x<=W;x+=36)hp+=`L${x} ${r1(hillY(x))}`;
  mid+=`<path d="${hp}L${W} ${r1(hillY(W))}L${W} ${H}L0 ${H}Z" fill="url(#hill)"/>`;
  const hx=zx(.38,4)+W*.038,hy=hillY(hx)+H*.006,hh=H*.17;
  mid+=chalet(hx,hy,hh)+grass(21,hx,hy+2,hh*.62,28,hh*.09)+'</svg>';
  $('lMid').innerHTML=mid;

  /* ---------- Premier plan : sol, troncs, fougères, herbes, rochers, clôture ---------- */
  let near=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <linearGradient id="bark" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5e4832"/><stop offset=".4" stop-color="#3d2d1c"/><stop offset="1" stop-color="#1e150c"/></linearGradient>
    <linearGradient id="soil" x1="0" y1="0" x2="${W}" y2="0" gradientUnits="userSpaceOnUse">${S.map((s,i)=>`<stop offset="${r1(specX(i)/W*1000)/1000}" stop-color="${HAB[s.hab].g}"/>`).join('')}<stop offset="1" stop-color="${HAB[S[S.length-1].hab].g}"/></linearGradient>
    <linearGradient id="deep" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#140d05" stop-opacity=".5"/></linearGradient>
    <pattern id="humus" width="28" height="18" patternUnits="userSpaceOnUse">
      <circle cx="6" cy="8" r="1.4" fill="#2a180c" opacity=".35"/><circle cx="18" cy="4" r="1" fill="#8a6240" opacity=".3"/>
      <circle cx="22" cy="13" r="1.6" fill="#1a1008" opacity=".28"/><circle cx="11" cy="15" r=".8" fill="#c4a070" opacity=".22"/>
    </pattern>
    <radialGradient id="dap"><stop offset="0" stop-color="#fff2b0" stop-opacity=".35"/><stop offset="1" stop-color="#fff2b0" stop-opacity="0"/></radialGradient></defs>`;
  S.forEach((s,i)=>{if(i===S.length-1)return;const a=HAB[s.hab],b=HAB[S[i+1].hab];
    if((a.tree||0)>=.6||(b.tree||0)>=.6||a.conifer||b.conifer)near+=bigTrunk((specX(i)+specX(i+1))/2+(R()-.5)*30+(i===0?gap*.3:0),0,H*.78,42+R()*24,R)});   // entre 1 et 2 : décalé pour laisser voir le panneau
  const gy=x=>H*.74+Math.sin(x*.004)*H*.012+Math.sin(x*.011)*H*.006;let gp=`M0 ${r1(gy(0))}`;
  for(let x=0;x<=W;x+=40)gp+=`L${x} ${r1(gy(x))}`;
  near+=`<path d="${gp}L${W} ${r1(gy(W))}L${W} ${H}L0 ${H}Z" fill="url(#soil)"/><path d="${gp}L${W} ${r1(gy(W))}L${W} ${H}L0 ${H}Z" fill="url(#deep)"/>`;
  S.forEach((s,i)=>{const h=HAB[s.hab],cx=specX(i);
    const x0=i===0?0:(specX(i-1)+specX(i))/2,x1=i===S.length-1?W:(specX(i)+specX(i+1))/2,half=(x1-x0)/2,midX=(x0+x1)/2;
    const rx=()=>x0+R()*(x1-x0),ry=()=>gy(cx)+R()*(H-gy(cx));
    if(!h.grass)near+=`<path d="M${r1(x0)} ${r1(gy(x0))}L${r1(x1)} ${r1(gy(x1))}L${r1(x1)} ${H}L${r1(x0)} ${H}Z" fill="url(#humus)"/>`+earth(i*17+4,midX,gy(cx),half,H);
    if(h.tree>=.6||h.conifer)for(let k=0;k<4;k++)near+=`<ellipse cx="${r1(rx())}" cy="${r1(ry())}" rx="${r1(40+R()*60)}" ry="${r1(10+R()*12)}" fill="url(#dap)"/>`;
    if(h.leaf)for(let k=0;k<70*h.leaf;k++){const x=rx(),y=ry(),c=['#8a5a26','#a3702f','#6e4a22','#b98a3a','#7d5f2a'][k%5],l=6+R()*8;
      near+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${r1(l)}" ry="${r1(l*.4)}" transform="rotate(${r1(R()*180)} ${r1(x)} ${r1(y)})" fill="${c}"/>`}
    if(h.needles)for(let k=0;k<160;k++){const x=rx(),y=ry(),a=R()*3.14;near+=`<path d="M${r1(x)} ${r1(y)}l${r1(Math.cos(a)*9)} ${r1(Math.sin(a)*3)}" stroke="${k%2?'#9a6a3a':'#7a5028'}" stroke-width="1.2"/>`}
    if(h.fern)for(let k=0;k<3*h.fern;k++){const x=rx(),y=gy(x)+H*.04+R()*H*.1;near+=fern(x,y,H*(.1+R()*.06),R()<.5?-1:1,R)+fern(x,y,H*(.08+R()*.05),R()<.5?-1:1,R)}
    if(h.rocks)for(let k=0;k<4;k++){const x=rx(),y=ry();near+=rock(x,y,14+R()*26,8+R()*12,Math.floor(R()*99))}
    if(h.fence){let f='';for(let k=0;k<7;k++){const x=x0+k*(x1-x0)/6;f+=`<rect x="${r1(x)}" y="${r1(gy(x)-H*.09)}" width="9" height="${r1(H*.1)}" fill="#8a6a44"/><path d="M${r1(x)} ${r1(gy(x)-H*.09)}l4.5 -8l4.5 8Z" fill="#8a6a44"/>`}
      near+=f+`<path d="M${r1(x0)} ${r1(gy(x0)-H*.065)}L${r1(x1)} ${r1(gy(x1)-H*.065)}M${r1(x0)} ${r1(gy(x0)-H*.03)}L${r1(x1)} ${r1(gy(x1)-H*.03)}" stroke="#7a5a38" stroke-width="5"/>`}
    if(h.grass){const n=Math.round(140*h.grass);
      near+=grass(i*13+5,cx,gy(cx)+H*.02,half,n,H*.05,['#5f8f3a','#7aa84a','#46702c','#8cb85a'])+grass(i*7+2,cx,H*.97,half,Math.round(n*.6),H*.06,['#4d7a2e','#6a9a3e','#3a6424'])}
    if(h.flowers)for(let k=0;k<40;k++){const x=rx(),y=ry()-4,c=h.flowers[k%h.flowers.length];near+=`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(2.2+R()*1.6)}" fill="${c}"/><circle cx="${r1(x)}" cy="${r1(y)}" r="1" fill="#e9b53a"/>`}
  });
  /* Panneau de l'expo, un peu en retrait entre les spécimens 1 et 2 */
  {const sx=(specX(0)+specX(1))/2-gap*.05,sh=Math.min(H*.13,115);
    near+=`<defs><linearGradient id="post" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a5230"/><stop offset=".5" stop-color="#5a3a1e"/><stop offset="1" stop-color="#3a2410"/></linearGradient></defs>`+
      `<g opacity=".88">${trailSign(sx,gy(sx)+H*.022,sh,['EXPO MYCO &amp; BOTA','13 OCTOBRE','ISPB'])}</g>`}
  $('lNear').innerHTML=near+'</svg>';

  /* ---------- Avant-plan flou ---------- */
  $('lFront').innerHTML=`<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none"><defs>
    <filter id="dof" x="-25%" y="-25%" width="150%" height="150%"><feGaussianBlur stdDeviation="7"/></filter></defs>
    ${rep(9,()=>{const x=R()*W,y=H*(.87+R()*.13);return `<path d="M${r1(x)} ${H}Q${r1(x+46)} ${r1(y)} ${r1(x+128)} ${r1(y-32)}Q${r1(x+54)} ${r1(y+42)} ${r1(x)} ${H}Z" fill="#2c4724" filter="url(#dof)"/>`})}
    ${rep(5,()=>{const x=R()*W;return `<path d="M${r1(x)} 0Q${r1(x+64)} ${r1(H*.13)} ${r1(x+156)} ${r1(H*.05)}Q${r1(x+74)} ${r1(H*.22)} ${r1(x)} 0Z" fill="#223719" filter="url(#dof)"/>`})}</svg>`;

  /* ---------- Spécimens ---------- */
  document.querySelectorAll('.spec').forEach(e=>e.remove());
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
function maxScroll(){return Math.max(0,world.offsetWidth-forest.clientWidth)}
function goTo(left,smooth){
  const x=Math.max(0,Math.min(left,maxScroll()));
  try{forest.scrollTo({left:x,behavior:smooth?'smooth':'auto'})}catch(e){forest.scrollLeft=x}}
function parallax(){const x=Math.min(forest.scrollLeft,maxScroll());
  $('lFar').style.transform=`translateX(${x*.74}px)`;$('lMid').style.transform=`translateX(${x*.38}px)`;
  $('lFront').style.transform=`translateX(${-x*.14}px)`}
forest.addEventListener('scroll',()=>{
  const m=maxScroll();
  if(forest.scrollLeft>m)forest.scrollLeft=m;
  parallax();if(forest.scrollLeft>50)$('hint').style.opacity=0},{passive:true});
