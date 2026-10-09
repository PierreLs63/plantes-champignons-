/* =====================================================================
   LES 10 SPÉCIMENS — vues d'ensemble (viewBox 300×300, sol vers y=284)
   ===================================================================== */
const ART={};

/* Feuille complète : deux moitiés ombrées différemment, nervures, reflet */
function leafSVG(g,o){
  const veins=(o.veins||[]).map(k=>`<path d="${g.line(-1,k)}${g.line(1,k)}" fill="none" stroke="${o.vein}" stroke-width="${o.vw||.8}" opacity="${o.vo||.45}"/>`).join('');
  return `<path d="${g.half(-1)}" fill="${o.lt}"/><path d="${g.half(1)}" fill="${o.dk}"/>${veins}
    <path d="${g.line(1,0,0,.98)}" fill="none" stroke="${o.rib||'#e3f3c6'}" stroke-width="${o.ribw||1.6}" opacity=".6"/>
    ${o.gloss===false?'':`<path d="${g.line(-1,.5,.14,.66)}" fill="none" stroke="#fff" stroke-width="4" opacity=".2" filter="${U('b1')}"/>`}
    <path d="${g.whole()}" fill="none" stroke="${o.edge}" stroke-width=".8" opacity=".55"/>`;
}

/* ---------------------------------------------------------------------
   1 — AIL DES OURS : feuilles elliptiques, CHACUNE SUR SON PROPRE PÉTIOLE,
   nervures parallèles, ombelle de fleurs blanches en étoile
   --------------------------------------------------------------------- */
ART.ail=(()=>{
  const prof=t=>Math.pow(Math.sin(Math.PI*Math.pow(t,.8)),.72);
  const defs=`<defs>${LG('lt',[[0,'#b4e288'],[1,'#5aa63e']],0,0,1,1)}${LG('dk',[[0,'#529a3a'],[1,'#276325']],0,0,1,1)}
    ${RG('fl',[[0,'#ffffff'],[1,'#e2e9d2']],.5,.3,.7)}${LG('pet',[[0,'#8ccf64'],[1,'#4f9138']],0,0,1,0)}</defs>`;
  // [x au sol, angle, long. pétiole, long. feuille, demi-largeur, courbure, profondeur]
  const cfg=[[138,-58,48,118,27,-24,0],[164,56,44,114,26,22,0],[144,-30,64,142,31,-14,1],[158,30,62,138,30,14,1],[150,-9,72,150,33,-8,2],[153,14,34,108,27,10,3]];
  const flower=(x,y,s,rot,sq)=>`<g transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(rot)}) scale(${s} ${r1(s*sq)})">
    ${rep(6,d=>`<g transform="rotate(${d*60})"><path d="M0 0C-2.7 -2 -2.9 -7 0 -9.6C2.9 -7 2.7 -2 0 0Z" fill="${U('fl')}" stroke="#c6d1ab" stroke-width=".3"/><path d="M0 -1.6L0 -8" stroke="#b3cc8a" stroke-width=".35"/></g>`)}
    <circle r="1.9" fill="#d6e087"/>${rep(6,d=>`<circle cx="${r1(Math.cos(d*1.047+.5)*2.9)}" cy="${r1(Math.sin(d*1.047+.5)*2.9)}" r=".6" fill="#e9d35a"/>`)}</g>`;
  let leaves='';
  cfg.forEach(([bx,a,pl,len,w,bend,dep],i)=>{
    const ar=a*Math.PI/180,tx=bx+Math.sin(ar)*pl,ty=284-Math.cos(ar)*pl;
    const g=leafGeo(len,w,bend,prof);
    leaves+=`<path d="M${bx} 286Q${r1(bx+Math.sin(ar)*pl*.3)} ${r1(284-Math.cos(ar)*pl*.6)} ${r1(tx)} ${r1(ty)}" fill="none" stroke="${U('pet')}" stroke-width="4.6" stroke-linecap="round"/>
    <path d="M${bx-1} 284Q${r1(bx+Math.sin(ar)*pl*.3-1)} ${r1(284-Math.cos(ar)*pl*.6)} ${r1(tx-1)} ${r1(ty)}" fill="none" stroke="#c9eca8" stroke-width="1.2" opacity=".55"/>
    <g transform="translate(${r1(tx)} ${r1(ty)}) rotate(${a})">
      ${leafSVG(g,{lt:U('lt'),dk:U('dk'),veins:[.28,.52,.74,.9],vein:'#d9f2b8',vo:.38,edge:'#1f5a1d'})}
      <path d="${g.whole()}" fill="#0b2408" opacity="${(3-dep)*.07}"/>
    </g>`;
  });
  let umbel='';const R=rng(5);
  for(let i=0;i<15;i++){const a=-Math.PI*(.05+.9*i/14)+(R()-.5)*.3,r=18+R()*12,x=196+Math.cos(a)*r,y=66+Math.sin(a)*r*.85;
    umbel+=`<path d="M196 70Q${r1((196+x)/2)} ${r1((70+y)/2-4)} ${r1(x)} ${r1(y)}" fill="none" stroke="#a9cf86" stroke-width="1"/>`+flower(x,y,.95+R()*.25,R()*60,.55+R()*.45)}
  return `${defs}
  ${G(litter(31,150,284,118,14)+moss(3,150,285,90,26))}
  <path d="M160 286Q186 196 196 72" fill="none" stroke="#6fae4c" stroke-width="3.6"/>
  <path d="M158 284Q184 196 194 74" fill="none" stroke="#caeba8" stroke-width="1" opacity=".5"/>
  <path d="M190 80C184 70 188 58 196 56C204 58 206 70 200 80Z" fill="#eef1de" opacity=".7" stroke="#cdd3b3" stroke-width=".6"/>
  ${leaves}${umbel}
  ${G(litter(77,150,288,100,7,false))}`;
})();

/* ---------------------------------------------------------------------
   2 — COLCHIQUE : touffe de feuilles rigides, SANS PÉTIOLE, engainées à la base,
   capsule de fruit au centre au printemps, fleurs mauves en coupe (6 tépales) sur long tube blanc
   --------------------------------------------------------------------- */
ART.colchique=(()=>{
  const prof=t=>t<.12?.62+.38*(t/.12):t<.8?1:Math.sqrt(Math.max(0,1-Math.pow((t-.8)/.2,2)));
  const defs=`<defs>${LG('lt',[[0,'#8fce6c'],[1,'#2f7a2e']],0,0,1,1)}${LG('dk',[[0,'#3f8a36'],[1,'#164d1a']],0,0,1,1)}
    ${RG('cap',[[0,'#eaeaa2'],[.5,'#bcbf64'],[1,'#7d8438']],.36,.3,.7)}${LG('sh',[[0,'#e7ecd0'],[.5,'#c5d3a0'],[1,'#8ea468']],0,0,1,0)}
</defs>`;
  const leaf=(a,len,w,bend,bx)=>{const g=leafGeo(len,w,bend,prof,26,.5);
    return `<g transform="translate(${bx} 282) rotate(${a})">${leafSVG(g,{lt:U('lt'),dk:U('dk'),veins:[.18,.36,.54,.72,.88],vein:'#12400f',vo:.3,vw:.7,edge:'#0f3a10',rib:'#0f3d10',ribw:1.8})}
      <path d="${g.line(1,.1,.05,.95)}" fill="none" stroke="#b6e79a" stroke-width="1" opacity=".45"/></g>`};
  return `${defs}
  ${G(grass(12,150,286,130,60,34,['#6f9a3e','#86b04d','#5a8534','#9cc05e'])+`<ellipse cx="150" cy="287" rx="120" ry="14" fill="#2a3a18" opacity=".45" filter="${U('b5')}"/>`)}
  ${leaf(-6,214,26,-6,148)}${leaf(9,206,25,8,152)}
  <path d="M150 262L150 214" stroke="#9fb46a" stroke-width="5"/>
  <g transform="translate(150 190)">
    <path d="M0 -32C15 -32 21 -15 21 3C21 19 12 27 0 27C-12 27 -21 19 -21 3C-21 -15 -15 -32 0 -32Z" fill="${U('cap')}" filter="${U('grain')}"/>
    <path d="M-7 -31C-12 -12 -11 12 -4 26M8 -31C12 -11 12 12 5 26" fill="none" stroke="#6a6a2a" stroke-width="1.4" opacity=".7"/>
    <path d="M0 -30C3 -10 3 10 0 26" fill="none" stroke="#8a8a3a" stroke-width="1" opacity=".45"/>
    <path d="M-7 -30C-10 -22 -11 -14 -10 -8" fill="none" stroke="#4a4a18" stroke-width="2.4" opacity=".55" filter="${U('b1')}"/>
    <path d="M-13 -18C-17 -6 -16 8 -12 16" fill="none" stroke="#f2f3c6" stroke-width="3" opacity=".5" filter="${U('b1')}"/>
    <path d="M-3 -31l-4 -9M0 -32l0 -10M3 -31l4 -9" stroke="#8a7a3a" stroke-width="1.4" stroke-linecap="round" fill="none"/>
  </g>
  ${leaf(-19,188,24,-20,144)}${leaf(22,182,23,18,156)}
  <path d="M130 286C130 268 136 252 142 246L158 246C164 252 170 268 170 286Z" fill="${U('sh')}"/>
  <path d="M132 272C142 262 158 256 168 258M134 282C146 270 160 268 169 270M140 250C146 256 156 258 162 250" fill="none" stroke="#7f955a" stroke-width="1" opacity=".7"/>
  ${G(grass(44,150,290,110,34,24,['#7aa54a','#94bd5a','#5f8c36']))}`;
})();

/* ---------------------------------------------------------------------
   VIGNETTES D'INDICE — illustration jointe à une note du carnet
   Colchique en fleur : à l'automne, 6 tépales roses et aucune feuille
   --------------------------------------------------------------------- */
const VIG={},VIGCAP={colchique_habitat:'À l’automne, le colchique fleurit seul : 6 tépales roses, sans la moindre feuille.'};
VIG.colchique_habitat=(()=>{
  /* Fleur : coupe à 6 tépales (3 derrière, 3 devant), étamines orangées, long tube blanc sortant du sol */
  const tepal=(x,y,a,len,w,fill)=>`<path transform="translate(${x} ${y}) rotate(${a})" d="M0 0C${-w} ${r1(-len*.25)} ${r1(-w*1.05)} ${r1(-len*.8)} 0 ${-len}C${r1(w*1.05)} ${r1(-len*.8)} ${w} ${r1(-len*.25)} 0 0Z" fill="${fill}" stroke="#7a3a74" stroke-width=".5"/>
    <path transform="translate(${x} ${y}) rotate(${a})" d="M0 -2L0 ${r1(-len*.85)}" stroke="#a5579d" stroke-width=".6" opacity=".6"/>`;
  /* le tube part du cœur de la touffe (caché par la gaine) et s'arque vers la fleur */
  const flower=(bx,x,y,s,lean)=>{const tube=`M${bx} 270C${bx} ${r1(y+50)} ${r1(x-lean*.3)} ${r1(y+34)} ${x} ${y}`;
    return `<path d="${tube}" fill="none" stroke="#9aa79a" stroke-width="${r1(4.4*s+1)}" stroke-linecap="round"/>
    <path d="${tube}" fill="none" stroke="${U('tube')}" stroke-width="${r1(4.4*s)}" stroke-linecap="round"/>
    <path d="${tube}" transform="translate(-.8 0)" fill="none" stroke="#fff" stroke-width=".9" opacity=".6"/>
    <g transform="translate(${x} ${y}) rotate(${r1(lean*.6)}) scale(${s})">
      ${tepal(0,3,-62,43,9.5,U('tpB'))}${tepal(0,3,62,43,9.5,U('tpB'))}${tepal(0,1,0,45,10,U('tpB'))}
      ${rep(6,i=>`<path d="M${-5+i*2} -6L${-7+i*2.8} -22" stroke="#e8dcc0" stroke-width=".8"/><ellipse cx="${-7+i*2.8}" cy="-23.5" rx="1.1" ry="2.4" fill="#e89a2a"/>`)}
      <path d="M0 -4L0 -28" stroke="#f3eee8" stroke-width=".7"/>
      ${tepal(-2,5,-34,39,10.5,U('tpF'))}${tepal(2,5,34,39,10.5,U('tpF'))}${tepal(0,7,8,23,9,U('tpF'))}
      <path d="M-14 -24C-10 -30 -6 -32 -2 -32" fill="none" stroke="#fff" stroke-width="1.6" opacity=".5" stroke-linecap="round"/>
      <path d="M-5 4C-3 8 3 8 5 4L4 -2L-4 -2Z" fill="#e6dce2"/>
    </g>`};
  const mound=x=>`<ellipse cx="${x}" cy="287" rx="16" ry="5" fill="#4a3a1c" opacity=".55" filter="${U('b2')}"/>`;
  return `<defs>${LG('tpF',[[0,'#e9b8e0'],[.55,'#c77cc0'],[1,'#f4e6f0']],0,0,0,1)}${LG('tpB',[[0,'#b86aae'],[.6,'#95488e'],[1,'#d9b4d4']],0,0,0,1)}
    ${LG('tube',[[0,'#fbf6f4'],[.5,'#ece3e6'],[1,'#c9bcc2']],0,0,1,0)}</defs>
  ${G(grass(5,150,288,138,44,20,['#8a9a52','#a3ac5e','#6f8440','#b5b06a'])+litter(23,150,288,118,12,false)
    +mound(150)+mound(226)+mound(74))}
  <g transform="translate(0 17)">
    ${flower(226,232,196,1.15,8)}
    ${flower(74,68,214,.95,-9)}
    ${flower(150,150,128,1.95,-3)}
  </g>
  ${G(grass(9,150,292,128,24,14,['#7f9048','#99a257']))}`;
})();

/* ---------------------------------------------------------------------
   3 — MORILLE : chapeau conique à ALVÉOLES OUVERTES en creux, séparées par des côtes
   --------------------------------------------------------------------- */
const morelW=(y,top,bot,RX)=>{const t=(y-top)/(bot-top);if(t<=0)return 0;
  return t<.78?RX*Math.pow(Math.sin(t/.78*Math.PI/2),.72):RX*(1-.1*Math.pow((t-.78)/.22,2))};
ART.morille=(()=>{
  const top=30,bot=192,cx=150,RX=58,wAt=y=>morelW(y,top,bot,RX);
  const L=[],Rr=[];
  for(let y=top;y<=bot;y+=4){L.push([cx-wAt(y),y]);Rr.push([cx+wAt(y),y])}
  const cap=smooth([...L,...Rr.reverse()]);
  const R=rng(7),NC=7;let pits='',ribs='';
  for(let c=0;c<=NC;c++){   // côtes verticales saillantes
    const a=-Math.PI/2+c*Math.PI/NC,pts=[];
    for(let y=top+6;y<=bot-4;y+=6){const w=wAt(y);if(w>4)pts.push([cx+w*Math.sin(a),y])}
    if(pts.length>2){const d=`M${P(pts[0])}${curve(pts)}`;
      ribs+=`<path d="${d}" stroke="#f0d09a" stroke-width="3.4" fill="none" opacity=".5" filter="${U('b1')}"/>
        <path d="${d}" transform="translate(2.5 1)" stroke="#6d451c" stroke-width="2" fill="none" opacity=".4" filter="${U('b1')}"/>`}
  }
  for(let c=0;c<NC;c++){
    const a0=-Math.PI/2+c*Math.PI/NC,a1=a0+Math.PI/NC;
    let y=top+4+R()*12;
    while(y<bot-6){
      const h=20+R()*14,y1=Math.min(bot-2,y+h),g=3.4;
      const w0=wAt(y+g),w1=wAt(y1-g);
      if(w0>6&&w1>6){
        const X=(a,yy)=>cx+wAt(yy)*Math.sin(a),da=yy=>g/Math.max(8,wAt(yy));
        const pts=[],ya=y+g+R()*1.5,yb=y1-g-R()*1.5;
        for(let s=0;s<=3;s++){const yy=ya+(yb-ya)*s/3;pts.push([X(a1-da(yy),yy),yy])}
        pts.push([X((a0+a1)/2,yb+1.5),yb+1.5]);
        for(let s=3;s>=0;s--){const yy=ya+(yb-ya)*s/3;pts.push([X(a0+da(yy),yy),yy])}
        pts.push([X((a0+a1)/2,ya-1.2),ya-1.2]);
        if(Math.abs(pts[0][0]-pts[5][0])>2.4)pits+=`<path d="${smooth(pts)}"/>`;
      }
      y=y1-R()*2;
    }
  }
  return `<defs>${LG('rib',[[0,'#e7c78e'],[.5,'#c79a5c'],[1,'#8a5f31']],0,0,1,.3)}
    ${RG('mpit',[[0,'#8c5c2e'],[.55,'#5c3718'],[1,'#33200d']],.58,.74,.75,.6,.9)}
    ${LG('vol',[[0,'#fff',.2],[.35,'#fff',0],[.62,'#000',0],[1,'#1a0c02',.55]],0,0,1,0)}
    ${LG('stem',[[0,'#fffaf0'],[.45,'#efe3c8'],[1,'#c2ad86']],0,0,1,0)}
    ${RG('apple',[[0,'#e7b04a'],[.6,'#b5541f'],[1,'#6f2a10']],.35,.3,.7)}</defs>
  ${G(litter(19,150,282,118,20)+moss(8,120,284,60,18)+grass(4,150,284,120,24,20)+
    `<g transform="translate(60 268)"><circle r="13" fill="${U('apple')}"/><path d="M0 -12q2 -6 5 -8" stroke="#4a3018" stroke-width="1.6" fill="none"/><ellipse cx="-4" cy="-5" rx="4" ry="2.5" fill="#fff" opacity=".35"/><path d="M6 4a6 5 0 1 0 1 -1" fill="#5b3b1a" opacity=".45"/></g>`)}
  <path d="M126 178C122 212 118 246 115 266C116 280 184 280 185 266C182 246 178 212 174 178Z" fill="${U('stem')}" filter="${U('grain')}"/>
  ${rep(40,i=>{const R2=rng(i+3),x=120+R2()*60,y=200+R2()*70;return `<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(.6+R2()*.9)}" fill="#c9b58c" opacity=".7"/>`})}
  <path d="M124 250C132 244 134 262 128 272M176 248C168 246 168 262 174 272M150 256C146 266 152 272 150 278" fill="none" stroke="#b39c74" stroke-width="2" opacity=".6" filter="${U('b1')}"/>
  <ellipse cx="150" cy="194" rx="30" ry="9" fill="#5a4222" opacity=".55" filter="${U('b2')}"/>
  <path d="${cap}" fill="${U('rib')}" filter="${U('grain')}"/>
  <g fill="${U('mpit')}" filter="${U('pit')}">${pits}</g>
  ${ribs}
  <path d="${cap}" fill="${U('vol')}"/>
  <path d="${cap}" fill="none" stroke="#3d2711" stroke-width="1.6" opacity=".45"/>
  <path d="M112 90C118 66 132 46 148 36" fill="none" stroke="#fff1cf" stroke-width="3" stroke-linecap="round" opacity=".35" filter="${U('b1')}"/>
  ${G(litter(55,150,286,96,6,false))}`;
})();

/* ---------------------------------------------------------------------
   4 — GYROMITRE : tête globuleuse bosselée et asymétrique, plis CÉRÉBRAUX
   sinueux (crêtes plus foncées que les fossettes), marge plus pâle et
   irrégulière, hyménium crème bien visible dessous, pied fin et creux (cou).
   --------------------------------------------------------------------- */
const GYRO={cx:150,cy:110,rx:74,ry:66};
/* Rayon du chapeau selon l'angle : lobes arrondis, jamais symétriques */
const gyroR=a=>1+.06*Math.sin(3*a+1.1)+.045*Math.sin(5*a+.3)+.025*Math.sin(8*a+2.2)
  +.05*Math.exp(-((a+1.5)**2)*6)                                  // apex légèrement pointu
  -.035*Math.max(0,Math.sin(a))*(1+Math.sin(11*a));              // marge basse ondulée
const gyroCap=(()=>{const {cx,cy,rx,ry}=GYRO,pts=[];
  for(let i=0;i<64;i++){const a=i/64*Math.PI*2,k=gyroR(a);const lo=Math.max(0,Math.sin(a));pts.push([cx+Math.cos(a)*rx*k*(1+.1*lo),cy+Math.sin(a)*ry*k*(1-.1*lo)])}
  return smooth(pts)})();
ART.gyromitre=(()=>{
  const {cx,cy,rx,ry}=GYRO,R=rng(19);
  /* Plis cérébraux : crêtes qui poussent dans un champ de flux sinueux et
     s'arrêtent avant d'en toucher une autre → labyrinthe sans croisement.
     Générés à plat (u,v) puis projetés sur une sphère (compression au bord). */
  const SP=.058,ST=.02,cell=SP,grid=new Map(),key=(u,v)=>Math.floor(u/cell)+','+Math.floor(v/cell);
  const flow=(u,v)=>2.1*Math.sin(1.9*u+.7)+1.8*Math.cos(2.3*v-.4)+1.2*Math.sin(3.4*(u-v)+1.3)+.9*Math.cos(4.1*u*v);
  const free=(u,v,id,idx)=>{const gu=Math.floor(u/cell),gv=Math.floor(v/cell);
    for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){const c=grid.get((gu+i)+','+(gv+j));if(!c)continue;
      for(const p of c)if((p[2]!==id||p[3]<idx-7)&&Math.hypot(p[0]-u,p[1]-v)<SP)return false}
    return true};
  const inside=(u,v)=>u*u+v*v<1.3;
  const ridges=[];
  for(let s=0;s<6000;s++){
    const u0=(R()*2-1)*1.15,v0=(R()*2-1)*1.15,id=ridges.length;
    if(!inside(u0,v0)||!free(u0,v0,-1,0))continue;
    let u=u0,v=v0,ang=flow(u,v)+R()*6.28,turn=0;const pts=[[u,v]];
    for(let k=1;k<110;k++){
      turn=turn*.7+(R()-.5)*.9;
      ang+=(flow(u,v)-ang)*.08+turn;
      const nu=u+Math.cos(ang)*ST,nv=v+Math.sin(ang)*ST;
      if(!inside(nu,nv)||!free(nu,nv,id,k))break;
      u=nu;v=nv;pts.push([u,v]);
    }
    if(pts.length<3)continue;
    pts.forEach((p,i)=>{const kk=key(p[0],p[1]);if(!grid.has(kk))grid.set(kk,[]);grid.get(kk).push([p[0],p[1],id,i])});
    ridges.push(pts);
  }
  const proj=([u,v])=>{const lon=u*1.32,lat=v*1.3,cl=Math.cos(Math.min(1.5,Math.abs(lat)));
    return [cx+rx*1.05*Math.sin(Math.max(-1.55,Math.min(1.55,lon)))*cl,cy+ry*1.05*Math.sin(Math.max(-1.5,Math.min(1.5,lat))),
      Math.max(0,Math.cos(Math.min(1.55,Math.abs(lon)))*cl)]};
  let shade='',body='',hl='';
  ridges.forEach(pts=>{
    const q=pts.map(proj),f=q.reduce((s,p)=>s+p[2],0)/q.length,w=r1((4.6+R()*1.2)*(.4+.6*Math.sqrt(f)));
    const d=`M${P(q[0])}${curve(q)}`;
    shade+=`<path d="${d}" stroke-width="${r1(w+1.2)}"/>`;
    body+=`<path d="${d}" stroke-width="${w}" stroke="${['#3e1a0e','#4a2314','#351509'][Math.floor(R()*3)]}"/>`;
    hl+=`<path d="${d}" stroke-width="${r1(w*.3)}"/>`;
  });
  /* Pied : fin, légèrement renflé, évasé sous le chapeau, rosé à la base */
  const sw=y=>{const t=(y-164)/112;return 25-9*Math.min(1,t/.3)**.8+3*Math.sin(Math.PI*Math.max(0,(t-.3)/.7))+(t>.88?(t-.88)*30:0)};
  const sL=[],sR=[];for(let y=164;y<=276;y+=6){const lean=Math.sin((y-164)/112*2.4)*3;sL.push([cx-sw(y)+lean,y]);sR.push([cx+sw(y)+lean,y])}
  const stem=`M${P(sL[0])}${curve(sL)}C${cx-16} 284 ${cx+16} 284 ${P(sR[sR.length-1])}${curve(sR.slice().reverse())}Z`;
  const grooves=rep(7,i=>{const o=(i-3)*3.2+(i%2?.8:-.8);return `<path d="M${r1(cx+o*1.4)} 176C${r1(cx+o*.9)} 206 ${r1(cx+o*1.05+2)} 240 ${r1(cx+o*1.2+1)} 272" fill="none" stroke="${i%2?'#b7ab98':'#fffaf0'}" stroke-width="${i%2?1.1:.9}" opacity="${i%2?.55:.5}"/>`});
  return `<defs>${RG('cap',[[0,'#a4633f'],[.45,'#84472a'],[.8,'#62301a'],[1,'#3e1c0d']],.4,.34,.72)}
    ${LG('margin',[[0,'#c9b8a0',0],[.62,'#c9b8a0',0],[.86,'#bfae96',.38],[1,'#d8cbb4',.62]],0,0,0,1)}
    ${LG('vol',[[0,'#ffe8d0',.26],[.36,'#fff',0],[.62,'#000',0],[1,'#0e0402',.6]],0,0,1,.55)}
    ${LG('shTop',[[0,'#3a2412',.5],[.22,'#3a2412',0]])}
    ${LG('stem',[[0,'#fbf7ee'],[.35,'#efe7d8'],[.75,'#d6cbb8'],[1,'#a99c88']],0,0,1,0)}
    ${LG('pink',[[0,'#e6b4aa',0],[.7,'#e0aca2',0],[1,'#d8a39a',.55]],0,0,0,1)}
    <clipPath id="§clip"><path d="${gyroCap}"/></clipPath></defs>
  ${G(`<ellipse cx="150" cy="286" rx="122" ry="17" fill="#3a2a16" opacity=".6" filter="${U('b5')}"/><ellipse cx="150" cy="284" rx="104" ry="11" fill="#b99a6a" opacity=".55" filter="${U('b2')}"/>`+
    rep(70,i=>{const R2=rng(i*7+1),x=40+R2()*220,y=276+R2()*16,a=R2()*3.14,l=8+R2()*8;return `<path d="M${r1(x)} ${r1(y)}l${r1(Math.cos(a)*l)} ${r1(Math.sin(a)*l*.35)}" stroke="${['#9a6a3a','#b88a52','#7a5028'][i%3]}" stroke-width="1"/>`})+
    `<g transform="translate(238 270) rotate(-18)"><ellipse rx="18" ry="11" fill="#6b4524"/>${rep(12,i=>`<path d="M${-15+i*2.6} ${i%2?-8:-4}q3 -3 6 0q-3 6 -6 0" fill="#8a5c30" stroke="#4a2c12" stroke-width=".6"/>`)}</g>`)}
  <path d="${stem}" fill="${U('stem')}" filter="${U('fiber')}"/>
  <path d="${stem}" fill="${U('pink')}"/>
  ${grooves}
  <path d="M${cx-7} 190C${cx-9} 218 ${cx-7} 246 ${cx-5} 268" fill="none" stroke="#fff" stroke-width="4" opacity=".35" filter="${U('b1')}"/>
  <path d="${stem}" fill="${U('shTop')}"/>
  <path d="${stem}" fill="none" stroke="#8f826c" stroke-width=".9" opacity=".6"/>
  <path d="${gyroCap}" fill="${U('cap')}" filter="${U('grain')}"/>
  <g clip-path="url(#§clip)">
    <g fill="none" stroke-linecap="round" stroke-linejoin="round">
      <g stroke="#1a0804" opacity=".55" transform="translate(1 1.8)">${shade}</g>
      <g>${body}</g>
      <g stroke="#9c5f40" opacity=".55" transform="translate(-.7 -1)">${hl}</g>
    </g>
    <path d="${gyroCap}" fill="${U('vol')}"/>
    <path d="${gyroCap}" fill="${U('margin')}"/>
  </g>
  <path d="${gyroCap}" fill="none" stroke="#24100a" stroke-width="1.6" opacity=".6"/>
  <path d="M${cx-60} ${cy+44}C${cx-40} ${cy+66} ${cx+40} ${cy+68} ${cx+62} ${cy+42}" fill="none" stroke="#e2d4ba" stroke-width="1.4" opacity=".55" clip-path="url(#§clip)"/>
  <path d="M${cx-54} ${cy-20}C${cx-48} ${cy-44} ${cx-28} ${cy-60} ${cx-8} ${cy-64}" fill="none" stroke="#ffe2c4" stroke-width="5" stroke-linecap="round" opacity=".16" filter="${U('b2')}"/>
  ${G(litter(91,150,288,90,5,false))}`;
})();

/* ---------------------------------------------------------------------
   5 — GENTIANE JAUNE : feuilles OPPOSÉES par paires, bleutées, nervures arquées
   --------------------------------------------------------------------- */
ART.gentiane=(()=>{
  const prof=t=>Math.min(1,Math.max(0,.34*(1-t/.18))+Math.pow(Math.sin(Math.PI*Math.pow(t,.72)),.62));
  const defs=`<defs>${LG('lt',[[0,'#aed49b'],[1,'#5e9864']],0,0,1,1)}${LG('dk',[[0,'#5b9163'],[1,'#2b5e3e']],0,0,1,1)}
    ${LG('stem',[[0,'#b9d690'],[.5,'#8db26a'],[1,'#557d3e']],0,0,1,0)}</defs>`;
  const nodes=[[254,88,104,24,-16],[206,62,92,22,-12],[160,84,76,19,-14],[118,58,58,15,-10],[82,78,42,11,-12]];
  let leaves='';
  nodes.forEach(([y,sp,len,w,bend],i)=>{
    const g=leafGeo(len,w,bend,prof,22,.5);
    const o={lt:U('lt'),dk:U('dk'),veins:[.3,.56,.8],vein:'#e3f2d6',vo:.42,vw:.9,edge:'#224a30',rib:'#e8f5dc',ribw:2};
    leaves+=`<g transform="translate(146 ${y}) rotate(${-sp})">${leafSVG(g,o)}</g>
    <g transform="translate(154 ${y}) scale(-1 1) rotate(${-sp})">${leafSVG(g,o)}</g>
    <ellipse cx="150" cy="${y}" rx="${9-i*.6}" ry="3.6" fill="#7aa35a" stroke="#48703a" stroke-width=".8"/>`;
  });
  return `${defs}
  ${G(grass(61,150,286,132,70,30,['#7a9f48','#93b85a','#62883a','#a9c86d'])+pebble(236,278,24,12,4)+pebble(62,282,16,8,9)+
    rep(6,i=>`<circle cx="${40+i*44}" cy="${270+(i%2)*10}" r="2.4" fill="${['#f2f0ff','#d7c8f5','#fff8c8'][i%3]}"/>`))}
  <path d="M144 286L146 64C146 52 154 52 154 64L156 286Z" fill="${U('stem')}" filter="${U('fiber')}"/>
  ${leaves}
  <path d="M150 70C142 58 144 40 150 30C156 40 158 58 150 70Z" fill="#8fbf7e"/><path d="M150 68C147 56 148 44 150 36" stroke="#dcefd0" stroke-width=".9" fill="none"/>
  <g transform="translate(150 44)">${rep(5,i=>`<circle cx="${(i-2)*4}" cy="${-Math.abs(i-2)*1.5-2}" r="3" fill="#d9d36a" stroke="#8a8a3a" stroke-width=".5"/>`)}</g>
  ${G(grass(83,150,292,120,30,18,['#86ad52','#6a9540']))}`;
})();

/* ---------------------------------------------------------------------
   6 — VÉRATRE BLANC : feuilles ALTERNES (une par niveau, en spirale), fortement PLISSÉES
   --------------------------------------------------------------------- */
ART.veratre=(()=>{
  const prof=t=>Math.min(1,Math.max(0,.3*(1-t/.2))+Math.pow(Math.sin(Math.PI*t),.68));
  const defs=`<defs>${LG('a',[[0,'#c3dc8e'],[1,'#86ad55']],0,0,1,1)}${LG('b',[[0,'#79a049'],[1,'#3f6a29']],0,0,1,1)}
    ${LG('stem',[[0,'#c7d99a'],[.5,'#95b066'],[1,'#5c7d3a']],0,0,1,0)}${LG('sheath',[[0,'#d8e6ae'],[.5,'#a9c27a'],[1,'#6d8c48']],0,0,1,0)}</defs>`;
  const L=[[268,-86,118,33,-10],[240,80,116,32,10],[210,-50,102,28,-12],[180,70,94,26,10],[150,-80,82,22,-10],[122,58,68,19,8],[96,-46,54,15,-6],[72,66,42,12,5]];
  const ks=[0,.16,.32,.48,.64,.8,.93,1];
  let leaves='';
  L.forEach(([y,a,len,w,bend])=>{
    const g=leafGeo(len,w,bend,prof,22,.5);let pl='';
    [-1,1].forEach(sg=>{for(let j=0;j<ks.length-1;j++)pl+=`<path d="${g.band(sg,ks[j],ks[j+1])}" fill="${U((j+(sg>0?1:0))%2?'a':'b')}"/>`;
      ks.slice(1,-1).forEach(k=>pl+=`<path d="${g.line(sg,k)}" fill="none" stroke="#2c4e1c" stroke-width=".9" opacity=".5"/>`)});
    leaves+=`<g transform="translate(150 ${y}) rotate(${a})">${pl}
      <path d="${g.line(1,0,0,.98)}" fill="none" stroke="#e7f2c8" stroke-width="1.6" opacity=".55"/>
      <path d="${g.whole()}" fill="none" stroke="#2b4a1b" stroke-width=".9" opacity=".6"/></g>
      <path d="M142 ${y+3}L142 ${y-11}Q150 ${y-15} 158 ${y-11}L158 ${y+3}Z" fill="${U('sheath')}"/><path d="M142 ${y-11}Q150 ${y-15} 158 ${y-11}" fill="none" stroke="#5f7d3c" stroke-width=".9"/>`;
  });
  return `${defs}
  ${G(grass(29,150,286,132,70,30,['#7a9f48','#93b85a','#62883a','#a9c86d'])+pebble(54,280,22,10,2)+pebble(250,284,14,7,6))}
  <path d="M143 286L144 58C144 48 156 48 156 58L157 286Z" fill="${U('stem')}" filter="${U('fiber')}"/>
  ${leaves}
  <path d="M150 58C144 48 146 34 150 26C154 34 156 48 150 58Z" fill="#a6c476"/>
  ${G(grass(71,150,292,120,30,18,['#86ad52','#6a9540']))}`;
})();

/* ---------------------------------------------------------------------
   7 — TRICHOLOME DE LA SAINT-GEORGES : chapeau crème charnu, MARGE ENROULÉE,
   LAMES TRÈS SERRÉES échancrées, pied trapu ; pousse en ronds dans l'herbe
   --------------------------------------------------------------------- */
function capUnder(cx,my,rx,ry,domeH,wav){
  const E=(a,k=1,dy=0)=>[cx+Math.cos(a)*rx*k*wav(a),my+dy+Math.sin(a)*ry*k*wav(a)];
  const rim=[];for(let i=0;i<60;i++)rim.push(E(i/60*Math.PI*2));
  const back=[];for(let i=0;i<=30;i++)back.push(E(Math.PI+i/30*Math.PI));
  const dome=`M${P(back[0])}C${r1(cx-rx*1.03)} ${r1(my-domeH*.62)} ${r1(cx-rx*.58)} ${my-domeH} ${cx} ${my-domeH}C${r1(cx+rx*.58)} ${my-domeH} ${r1(cx+rx*1.03)} ${r1(my-domeH*.62)} ${P(back[30])}L${P(back[30])}${curve(back.slice().reverse())}Z`;
  return{E,rim:smooth(rim),dome};
}
ART.tricholome=(()=>{
  const cx=150,my=150,rx=90,ry=30,wav=a=>1+.035*Math.sin(a*5+.7)+.02*Math.sin(a*9);
  const c=capUnder(cx,my,rx,ry,94,wav);
  let gills='';
  for(let i=0;i<130;i++){const a=i/130*Math.PI*2,short=i%2,ki=short?.55:.2;
    const p0=[cx+Math.cos(a)*rx*ki,my+8+Math.sin(a)*ry*ki],p1=c.E(a,.93),back=Math.sin(a)<0;
    gills+=`<path d="M${P(p0)}L${P(p1)}" stroke="${back?'#cdbd97':'#dccfae'}" stroke-width="${back?.9:.7}" opacity=".9"/>`}
  const small=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M-16 0C-18 30 -14 52 -4 60L20 60C28 50 22 30 18 0Z" fill="${U('stem')}"/>
    <path d="M-70 4C-72 -46 -36 -74 0 -74C36 -74 72 -46 70 4C50 18 -50 18 -70 4Z" fill="${U('cap')}" filter="${U('grain')}"/>
    <path d="M-70 4C-50 20 50 20 70 4" fill="none" stroke="#d6c6a0" stroke-width="5"/><path d="M-48 -44C-34 -60 -16 -66 0 -66" fill="none" stroke="#fff" stroke-width="7" opacity=".5" filter="${U('b2')}" stroke-linecap="round"/></g>`;
  return `<defs>${RG('cap',[[0,'#fffef8'],[.5,'#f4ecd8'],[1,'#d5c49c']],.38,.26,.78)}
    ${RG('gill',[[0,'#c9b891'],[.5,'#ebe0c6'],[1,'#f8f2e2']],.5,.32,.62)}
    ${LG('stem',[[0,'#fffcf3'],[.45,'#f2e9d5'],[1,'#c6b48e']],0,0,1,0)}
    ${LG('vol',[[0,'#fff',.25],[.4,'#fff',0],[.7,'#000',0],[1,'#3a2a0a',.35]],0,0,1,0)}</defs>
  ${G(`<ellipse cx="150" cy="287" rx="130" ry="15" fill="#2f3f1c" opacity=".5" filter="${U('b5')}"/>`+grass(17,150,288,138,80,34))}
  ${small(236,226,.42)}${small(62,246,.3)}
  <path d="${c.rim}" fill="${U('gill')}"/>
  ${gills}
  <path d="${c.rim}" fill="none" stroke="#efe5cc" stroke-width="8"/>
  <path d="${c.rim}" fill="none" stroke="#b9a67c" stroke-width="1.2" transform="translate(150 ${my+4}) scale(.93) translate(-150 ${-my-4})" opacity=".8"/>
  <path d="M132 ${my+10}C127 196 124 236 121 260C120 278 180 278 179 260C176 236 173 196 168 ${my+10}Z" fill="${U('stem')}" filter="${U('fiber')}"/>
  <ellipse cx="150" cy="${my+14}" rx="20" ry="6" fill="#8e7c54" opacity=".45" filter="${U('b2')}"/>
  <path d="${c.dome}" fill="${U('cap')}" filter="${U('grain')}"/>
  <ellipse cx="150" cy="80" rx="42" ry="14" fill="#e3cf9f" opacity=".35" filter="${U('b5')}"/>
  <path d="${c.dome}" fill="${U('vol')}"/>
  <path d="M86 108C100 84 124 68 150 64" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".55" filter="${U('b2')}"/>
  <path d="M64 ${my}C70 ${my+14} 90 ${my+24} 118 ${my+28}M236 ${my}C230 ${my+14} 210 ${my+24} 182 ${my+28}" fill="none" stroke="#fff" stroke-width="2" opacity=".6"/>
  ${G(grass(58,150,292,120,40,22,['#6c9a3e','#88b34f','#557f31']))}`;
})();

/* ---------------------------------------------------------------------
   8 — AMANITE PHALLOÏDE : chapeau olive fibrilleux, lames blanches libres,
   ANNEAU EN JUPE, pied chiné, VOLVE EN SAC à la base
   --------------------------------------------------------------------- */
ART.phalloide=(()=>{
  const cx=150,my=104,rx=90,ry=22,wav=()=>1;
  const c=capUnder(cx,my,rx,ry,62,wav);
  let gills='';
  for(let i=0;i<110;i++){const a=i/110*Math.PI*2,ki=i%2?.5:.24;
    gills+=`<path d="M${P([cx+Math.cos(a)*rx*ki,my+6+Math.sin(a)*ry*ki])}L${P(c.E(a,.96))}" stroke="${Math.sin(a)<0?'#dedbcc':'#ecebe0'}" stroke-width=".7"/>`}
  let fib='';const R=rng(13);
  for(let i=0;i<46;i++){const t=i/45,x=cx-rx+t*rx*2+(R()-.5)*4;fib+=`<path d="M${r1(cx+(x-cx)*.12)} ${my-76}Q${r1(cx+(x-cx)*.7)} ${my-60} ${r1(x)} ${r1(my-Math.sqrt(Math.max(0,1-((x-cx)/rx)**2))*ry+1)}" stroke="#46521f" stroke-width="${r1(.4+R()*.7)}" opacity="${r1(.18+R()*.25)}" fill="none"/>`}
  const zig=rep(9,i=>{const y=196+i*6.4,w=15+i*.5;return `<path d="M${cx-w} ${r1(y)}l${r1(w/3)} 2.6l${r1(w/3)} -2.6l${r1(w/3)} 2.6l${r1(w/3)} -2.6l${r1(w/3)} 2.6l${r1(w/3)} -2.6" fill="none" stroke="#b9c296" stroke-width="1.3" opacity=".75"/>`});
  return `<defs>${RG('cap',[[0,'#5f6b2a'],[.35,'#86913f'],[.8,'#b5b86b'],[1,'#cfcf93']],.5,.02,1.05)}
    ${LG('vol',[[0,'#fff',.22],[.38,'#fff',0],[.65,'#000',0],[1,'#152000',.45]],0,0,1,0)}
    ${RG('gill',[[0,'#d3cfbd'],[.6,'#f1efe4'],[1,'#fbfaf3']],.5,.3,.62)}
    ${LG('stem',[[0,'#ffffff'],[.5,'#f1efe3'],[1,'#c9c6b0']],0,0,1,0)}
    ${LG('ring',[[0,'#fffffb'],[.55,'#f0eee2'],[1,'#c4c0a8']],0,0,1,0)}
    ${RG('volIn',[[0,'#8d8870'],[1,'#d9d4c0']],.5,.2,.7)}
    ${LG('volve',[[0,'#fbf9ef'],[.5,'#eeeadb'],[1,'#b9b39b']],0,0,1,0)}</defs>
  ${G(litter(41,150,282,124,22)+moss(12,100,284,50,14))}
  <path d="${c.rim}" fill="${U('gill')}"/>${gills}
  <path d="${c.rim}" fill="none" stroke="#d6d3c0" stroke-width="1.6"/>
  <path d="M141 ${my+8}L159 ${my+8}L165 238L135 238Z" fill="${U('stem')}" filter="${U('fiber')}"/>${zig}
  <ellipse cx="150" cy="${my+11}" rx="13" ry="4" fill="#8a876e" opacity=".5" filter="${U('b1')}"/>
  <ellipse cx="150" cy="222" rx="40" ry="10" fill="${U('volIn')}"/>
  <path d="M124 214C122 236 132 256 150 258C168 256 178 236 176 214C170 206 130 206 124 214Z" fill="${U('stem')}" filter="${U('fiber')}"/>
  <ellipse cx="150" cy="218" rx="30" ry="8" fill="#6c6852" opacity=".35" filter="${U('b2')}"/>
  <path d="M110 214C98 236 102 264 118 276C136 288 164 288 182 276C198 264 202 236 190 214C184 226 176 232 170 228C164 240 152 242 146 236C138 242 128 236 124 226C118 228 112 222 110 214Z" fill="${U('volve')}" filter="${U('grain')}"/>
  <path d="M112 216C114 224 120 228 124 226C128 236 138 242 146 236C152 242 164 240 170 228C176 232 184 226 188 216" fill="none" stroke="#fffef7" stroke-width="2.2" opacity=".85"/>
  <path d="M118 244C122 262 136 272 150 274M182 244C178 262 164 272 150 274" fill="none" stroke="#a9a38a" stroke-width="1.4" opacity=".5"/>
  <path d="M136 148C132 160 120 174 116 186C124 196 176 196 184 186C180 174 168 160 164 148C156 144 144 144 136 148Z" fill="${U('ring')}"/>
  ${rep(7,i=>`<path d="M${128+i*7.5} 156C${126+i*7.5} 170 ${122+i*9} 182 ${120+i*10} 190" fill="none" stroke="#bdb9a2" stroke-width="${i%2?1.4:.8}" opacity=".6"/>`)}
  <path d="M116 186C124 196 176 196 184 186C176 192 168 186 160 192C152 186 146 194 138 188C132 194 124 188 116 186Z" fill="#fbfaf2" stroke="#c9c5ae" stroke-width=".8"/>
  <path d="${c.dome}" fill="${U('cap')}" filter="${U('grain')}"/>${fib}
  <path d="${c.dome}" fill="${U('vol')}"/>
  <path d="M92 80C108 60 128 48 150 46" fill="none" stroke="#f1f5c6" stroke-width="7" stroke-linecap="round" opacity=".38" filter="${U('b2')}"/>
  ${G(litter(97,150,286,80,9,false)+`<g transform="translate(176 270) rotate(-24)"><path d="M-22 0C-18 -8 -10 -6 -8 -10C-4 -14 2 -8 6 -12C10 -14 14 -6 22 0C14 6 10 14 6 12C2 8 -4 14 -8 10C-10 6 -18 8 -22 0Z" fill="#8a5a26"/><path d="M-20 0L20 0" stroke="#4a3018" stroke-width="1"/></g>`)}`;
})();

/* ---------------------------------------------------------------------
   9 — COULEMELLE : grand parasol à mamelon brun, ÉCAILLES concentriques,
   ANNEAU DOUBLE COULISSANT, pied élancé CHINÉ comme une peau de serpent
   --------------------------------------------------------------------- */
ART.coulemelle=(()=>{
  const cx=150,my=98,rx=112,ry=32;
  const Y=(a,k)=>my+Math.sin(a)*ry*k-20*(1-k*k);
  const R=rng(29);let scales='',fib='';
  for(let i=0;i<80;i++){const a=i/80*Math.PI*2,k=.24+R()*.74;fib+=`<path d="M${P([cx+Math.cos(a)*rx*.2,Y(a,.2)])}L${P([cx+Math.cos(a)*rx*.99,Y(a,.99)])}" stroke="#c7b390" stroke-width=".6" opacity=".7"/>`}
  [[.3,8],[.42,12],[.54,16],[.66,20],[.78,24],[.9,26]].forEach(([k,n],ri)=>{
    for(let j=0;j<n;j++){const a=j/n*Math.PI*2+ri*.4+(R()-.5)*.2,kk=k+(R()-.5)*.04,s=9.5-k*5.5+R()*2;
      const x=cx+Math.cos(a)*rx*kk,y=Y(a,kk),rot=Math.cos(a)*25;
      scales+=`<g transform="translate(${r1(x)} ${r1(y)}) scale(1 .5) rotate(${r1(rot)})"><path d="M${r1(-s*.7)} 0C${r1(-s*.5)} ${r1(-s*.6)} ${r1(s*.5)} ${r1(-s*.62)} ${r1(s*.7)} 0C${r1(s*.4)} ${r1(s*.55)} ${r1(-s*.4)} ${r1(s*.55)} ${r1(-s*.7)} 0Z" fill="${U('scale')}"/><path d="M${r1(-s*.55)} ${r1(-s*.2)}C${r1(-s*.3)} ${r1(-s*.5)} ${r1(s*.3)} ${r1(-s*.5)} ${r1(s*.55)} ${r1(-s*.2)}" stroke="#b8926a" stroke-width="1" fill="none" opacity=".7"/></g>`}
  });
  const rim=[];for(let i=0;i<72;i++){const a=i/72*Math.PI*2,f=1+(i%2?.012:-.01);rim.push([cx+Math.cos(a)*rx*f,my+Math.sin(a)*ry*f])}
  const under=[];for(let i=0;i<=36;i++){const a=i/36*Math.PI;under.push([cx+Math.cos(a)*rx,my+Math.sin(a)*ry])}
  const under2=under.map(([x,y])=>[cx+(x-cx)*.86,my+(y-my)*.86+16]).reverse();
  const snake=rep(16,i=>{const y=172+i*5.6,w=8.6+i*.18;return `<path d="M${r1(cx-w)} ${r1(y)}l${r1(w/2)} 3l${r1(w/2)} -3l${r1(w/2)} 3l${r1(w/2)} -3" fill="none" stroke="#7a5536" stroke-width="2.2" opacity="${r1(.5+i*.02)}"/>`});
  return `<defs>${RG('cap',[[0,'#fbf7ee'],[.6,'#eee3cf'],[1,'#c9b692']],.45,.3,.75)}
    ${LG('scale',[[0,'#9b724c'],[1,'#5c3e24']])}${RG('umbo',[[0,'#9a7048'],[.7,'#6a4628'],[1,'#4a2e18']],.4,.3,.7)}
    ${LG('stem',[[0,'#f7efe0'],[.5,'#e3d4ba'],[1,'#b09a78']],0,0,1,0)}${LG('ring',[[0,'#fffaf0'],[.6,'#eadfca'],[1,'#b9a888']],0,0,1,0)}
    ${LG('vol',[[0,'#fff',.2],[.4,'#fff',0],[.7,'#000',0],[1,'#2a1a08',.35]],0,0,1,.4)}</defs>
  ${G(`<ellipse cx="150" cy="287" rx="126" ry="15" fill="#2f3f1c" opacity=".5" filter="${U('b5')}"/>`+grass(33,150,288,138,86,36,['#7f9f45','#98b95a','#64863a','#b4c974']))}
  <path d="M143 104L157 104L159 244L141 244Z" fill="${U('stem')}" filter="${U('fiber')}"/>${snake}
  <path d="M150 272C130 272 126 258 132 246C136 238 164 238 168 246C174 258 170 272 150 272Z" fill="${U('stem')}"/>
  ${rep(4,i=>`<path d="M${134+i*2} ${250+i*5}l8 3l8 -3l8 3l8 -3" fill="none" stroke="#7a5536" stroke-width="2" opacity=".55"/>`)}
  <ellipse cx="150" cy="160" rx="18" ry="6" fill="#4a3a22" opacity=".55" filter="${U('b2')}"/>
  <path d="M129 146C129 158 171 158 171 146L171 152C171 164 129 164 129 152Z" fill="#a8977a"/>
  <ellipse cx="150" cy="150" rx="22" ry="8" fill="${U('ring')}"/>
  <path d="M128 150C130 158 170 158 172 150" fill="none" stroke="#fff" stroke-width="1.4" opacity=".7"/>
  <ellipse cx="150" cy="146" rx="19" ry="5.5" fill="#f6efe0" stroke="#c9b797" stroke-width=".8"/>
  <ellipse cx="150" cy="146" rx="8.5" ry="2.6" fill="#8f7a5a" filter="${U('b1')}"/>
  <path d="M143 104L157 104L157 146C157 149 143 149 143 146Z" fill="${U('stem')}"/>
  ${rep(4,i=>`<path d="M143 ${116+i*7}l3.5 2l3.5 -2l3.5 2l3.5 -2" fill="none" stroke="#9a7a58" stroke-width="1.1" opacity=".5"/>`)}
  <path d="M${P(under[0])}${curve(under)}L${P(under2[0])}${curve(under2)}Z" fill="#efe6d2"/>
  ${rep(40,i=>{const a=i/39*Math.PI;return `<path d="M${P([cx+Math.cos(a)*rx*.97,my+Math.sin(a)*ry*.97])}L${P([cx+Math.cos(a)*rx*.86,my+Math.sin(a)*ry*.86+14])}" stroke="#d2c3a4" stroke-width=".8"/>`})}
  <path d="${smooth(rim)}" fill="${U('cap')}" filter="${U('grain')}"/>${fib}${scales}
  <ellipse cx="150" cy="76" rx="24" ry="11" fill="${U('umbo')}"/>
  <path d="M136 72C140 66 150 64 158 66" fill="none" stroke="#c99f72" stroke-width="2.4" opacity=".6" stroke-linecap="round"/>
  <path d="${smooth(rim)}" fill="${U('vol')}"/>
  <path d="${smooth(rim)}" fill="none" stroke="#b9a37e" stroke-width="1" opacity=".8"/>
  ${G(grass(66,150,292,124,40,24,['#7f9f45','#98b95a','#64863a']))}`;
})();

/* ---------------------------------------------------------------------
   10 — ARUM TACHETÉ : épi dense de baies luisantes rouge-orangé, SANS FEUILLES
   --------------------------------------------------------------------- */
ART.arum=(()=>{
  const berries=[];
  for(let r=0;r<12;r++){
    const y=206-r*13.2,Rc=15-Math.max(0,r-7)*2.6,n=6;
    for(let j=0;j<n;j++){const ph=j/n*Math.PI*2+(r%2)*Math.PI/n,z=Math.cos(ph);
      if(z<-.35)continue;berries.push({x:150+Rc*Math.sin(ph),y:y-z*2.5,z,r:(10.5-r*.22)*(.84+.16*z),ripe:r})}
  }
  berries.sort((a,b)=>a.z-b.z);
  const cols=[['#ff8a5c','#d2301a','#7a0f08'],['#ffb15c','#e05a1c','#8a2a0a'],['#e8d060','#b8a030','#6a6018']];
  let defs='';cols.forEach((c,i)=>defs+=RG('b'+i,[[0,c[0]],[.55,c[1]],[1,c[2]]],.36,.32,.72));
  const b=berries.map(o=>{const k=o.ripe>10?2:o.ripe>8?1:0;
    return `<circle cx="${r1(o.x+1.5)}" cy="${r1(o.y+2.5)}" r="${r1(o.r)}" fill="#3a0a04" opacity=".45" filter="${U('b1')}"/>
    <circle cx="${r1(o.x)}" cy="${r1(o.y)}" r="${r1(o.r)}" fill="${U('b'+k)}"/>
    <circle cx="${r1(o.x)}" cy="${r1(o.y)}" r="${r1(o.r)}" fill="#000" opacity="${r1((1-o.z)*.25)}"/>
    <ellipse cx="${r1(o.x-o.r*.34)}" cy="${r1(o.y-o.r*.4)}" rx="${r1(o.r*.3)}" ry="${r1(o.r*.2)}" fill="#fff" opacity=".75"/>
    <circle cx="${r1(o.x+o.r*.1)}" cy="${r1(o.y+o.r*.05)}" r=".9" fill="#4a0c06" opacity=".7"/>`}).join('');
  return `<defs>${defs}${LG('stalk',[[0,'#b8cf7a'],[.5,'#8aa656'],[1,'#566f30']],0,0,1,0)}${LG('spathe',[[0,'#c9a46a'],[1,'#6f4e26']],0,0,1,0)}</defs>
  ${G(litter(63,150,282,120,20)+moss(17,190,284,60,16))}
  <path d="M142 288C142 256 145 234 146 214L156 214C156 236 158 258 160 288Z" fill="${U('stalk')}" filter="${U('fiber')}"/>
  ${rep(9,i=>`<ellipse cx="${146+(i*37)%12}" cy="${226+i*6.5}" rx="1.6" ry="2.6" fill="#5a2a3a" opacity=".6"/>`)}
  <path d="M136 226C126 216 128 204 138 198C136 210 140 218 146 222ZM166 226C176 214 172 202 162 198C166 210 160 218 154 222Z" fill="${U('spathe')}" opacity=".9"/>
  ${b}
  ${G(litter(88,150,288,92,7,false))}`;
})();
