/* =====================================================================
   OUTILS DE DESSIN SVG PARTAGÉS
   Les identifiants internes (dégradés, filtres) utilisent le préfixe « § ».
   svgOf() le remplace à chaque insertion par un préfixe unique, pour que
   plusieurs copies d'un même dessin cohabitent dans la page sans conflit.
   ===================================================================== */
const $=id=>document.getElementById(id);
const rep=(n,f)=>Array.from({length:n},(_,i)=>f(i)).join('');
const r1=v=>Math.round(v*10)/10;
const rng=seed=>{let s=seed;return()=>(s=(s*9301+49297)%233280)/233280};
const U=id=>`url(#§${id})`;
const P=p=>`${r1(p[0])} ${r1(p[1])}`;

const stops=a=>a.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op===undefined?'':` stop-opacity="${op}"`}/>`).join('');
const LG=(id,s,x1=0,y1=0,x2=0,y2=1)=>`<linearGradient id="§${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops(s)}</linearGradient>`;
const RG=(id,s,cx=.5,cy=.5,r=.5,fx=cx,fy=cy)=>`<radialGradient id="§${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${stops(s)}</radialGradient>`;

/* Courbe lissée (Catmull-Rom → Bézier) passant par tous les points */
function curve(pts,closed){
  const n=pts.length;if(n<2)return '';
  const g=i=>closed?pts[(i+n)%n]:pts[Math.max(0,Math.min(n-1,i))];
  let d='';
  for(let i=0;i<(closed?n:n-1);i++){
    const a=g(i-1),b=g(i),c=g(i+1),e=g(i+2);
    d+=`C${P([b[0]+(c[0]-a[0])/6,b[1]+(c[1]-a[1])/6])} ${P([c[0]-(e[0]-b[0])/6,c[1]-(e[1]-b[1])/6])} ${P(c)}`;
  }
  return d;
}
const smooth=(pts,closed=true)=>`M${P(pts[0])}${curve(pts,closed)}${closed?'Z':''}`;

/* Forme organique fermée autour d'un centre */
function blob(cx,cy,rx,ry,seed,n=9,jit=.22,rot=0){
  const R=rng(seed),pts=[];
  for(let i=0;i<n;i++){const a=i/n*Math.PI*2,k=1+(R()*2-1)*jit;
    const x=Math.cos(a)*rx*k,y=Math.sin(a)*ry*k;
    pts.push([cx+x*Math.cos(rot)-y*Math.sin(rot),cy+x*Math.sin(rot)+y*Math.cos(rot)])}
  return smooth(pts);
}

/* Géométrie de feuille : nervure médiane courbe, bords définis par un profil de largeur.
   Base en (0,0), pointe vers le haut en (bend,-len). */
function leafGeo(len,w,bend,prof,n=22,ctrl=.55){
  const cx=bend*.12,cy=-len*ctrl;
  const Q=t=>[2*(1-t)*t*cx+t*t*bend,2*(1-t)*t*cy-t*t*len];
  const N=t=>{const dx=2*(1-t)*cx+2*t*(bend-cx),dy=2*(1-t)*cy+2*t*(-len-cy),m=Math.hypot(dx,dy)||1;return[-dy/m,dx/m]};
  const edge=(sg,k=1,t0=0,t1=1)=>{const a=[];for(let i=0;i<=n;i++){const t=t0+(t1-t0)*i/n,q=Q(t),nn=N(t),o=w*prof(t)*k*sg;a.push([q[0]+nn[0]*o,q[1]+nn[1]*o])}return a};
  const join=(a,b)=>`M${P(a[0])}${curve(a)}L${P(b[0])}${curve(b)}Z`;
  return{
    half:sg=>join(edge(sg),edge(1,0).reverse()),
    whole:()=>join(edge(-1),edge(1).reverse()),
    band:(sg,k1,k2)=>join(edge(sg,k1),edge(sg,k2).reverse()),
    line:(sg,k,t0=.03,t1=.97)=>{const e=edge(sg,k,t0,t1);return `M${P(e[0])}${curve(e)}`},
  };
}

/* ---------- Filtres communs à chaque dessin ---------- */
const noiseF=(id,freq,oct,seed,amt,off)=>`<filter id="§${id}" x="0" y="0" width="1" height="1" color-interpolation-filters="sRGB">
<feTurbulence type="fractalNoise" baseFrequency="${freq}" numOctaves="${oct}" seed="${seed}"/>
<feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  ${amt} 0 0 0 ${off}"/>
<feComposite in2="SourceAlpha" operator="in" result="n"/>
<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="n"/></feMerge></filter>`;
/* Ombre intérieure : bord haut-gauche assombri, bord bas-droit éclairé → donne du creux */
const insetF=(id,blur,dx,dy,col,op,hl)=>`<filter id="§${id}" x="-.2" y="-.2" width="1.4" height="1.4" color-interpolation-filters="sRGB">
<feGaussianBlur in="SourceAlpha" stdDeviation="${blur}" result="bl"/>
<feOffset in="bl" dx="${dx}" dy="${dy}" result="o1"/><feComposite in="SourceAlpha" in2="o1" operator="out" result="r1"/>
<feFlood flood-color="${col}" flood-opacity="${op}"/><feComposite in2="r1" operator="in" result="s1"/>
<feOffset in="bl" dx="${-dx*.55}" dy="${-dy*.55}" result="o2"/><feComposite in="SourceAlpha" in2="o2" operator="out" result="r2"/>
<feFlood flood-color="#fff4d8" flood-opacity="${hl}"/><feComposite in2="r2" operator="in" result="s2"/>
<feMerge><feMergeNode in="SourceGraphic"/><feMergeNode in="s1"/><feMergeNode in="s2"/></feMerge></filter>`;
const blurF=(id,sd)=>`<filter id="§${id}" filterUnits="userSpaceOnUse" x="-300" y="-300" width="900" height="900"><feGaussianBlur stdDeviation="${sd}"/></filter>`;

const FX=`<defs>
${noiseF('grain','2.2',2,4,.8,-.44)}${noiseF('fiber','1.4 .04',2,9,1,-.5)}${noiseF('fiberH','.04 1.4',2,5,1,-.5)}
${insetF('pit',2.4,2,3,'#1a0d04',.85,.4)}${insetF('cav',5,3,6,'#2e1c0b',.75,.35)}${insetF('soft',3.5,1.6,2.6,'#3a2a14',.35,.45)}
${blurF('b1',1)}${blurF('b2',2.2)}${blurF('b5',5)}
</defs>`;

let UID=0;
/* Insère un dessin : lite = sans filtres de texture (décor, miniatures), noGround = sans le sol */
function svgOf(set,k,o={}){
  let s=set[k];
  if(o.lite)s=s.replace(/ filter="url\(#§(grain|fiber|fiberH|pit|cav|soft)\)"/g,'');
  if(o.noGround)s=s.replace(/<!--g-->[\s\S]*?<!--\/g-->/g,'');
  const p='u'+(++UID)+'_';
  return `<svg class="art" viewBox="0 0 300 300" ${o.w?`width="${o.w}" height="${o.h}"`:''} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">${FX}${s}</svg>`.replace(/§/g,p);
}

/* ---------- Éléments de sol (marqués pour pouvoir être retirés) ---------- */
const G=s=>`<!--g-->${s}<!--/g-->`;
function litter(seed,cx=150,cy=284,rx=118,n=18,shadow=true){
  const R=rng(seed),cols=['#8a5a26','#a3702f','#6e4a22','#b98a3a','#7d5f2a','#5b3d1c'];
  let s=shadow?`<ellipse cx="${cx}" cy="${cy+3}" rx="${rx}" ry="${r1(rx*.15)}" fill="#1f1509" opacity=".55" filter="${U('b5')}"/>
    <ellipse cx="${cx}" cy="${cy}" rx="${r1(rx*.78)}" ry="${r1(rx*.08)}" fill="#4a3318" opacity=".85" filter="${U('b2')}"/>`:'';
  for(let i=0;i<3&&shadow;i++){const x=cx+(R()*2-1)*rx*.7,y=cy+(R()*2-1)*rx*.04,l=18+R()*26,a=(R()*2-1)*.35;
    s+=`<path d="M${r1(x)} ${r1(y)}l${r1(l*Math.cos(a))} ${r1(l*Math.sin(a))}l${r1(6*Math.cos(a-.6))} ${r1(6*Math.sin(a-.6))}" stroke="#4a3520" stroke-width="1.8" fill="none" stroke-linecap="round"/>`}
  for(let i=0;i<n;i++){
    const x=cx+(R()*2-1)*rx*.92,y=cy+(R()*2-1)*rx*.075,a=R()*360,l=10+R()*13,c=cols[Math.floor(R()*6)];
    s+=`<g transform="translate(${r1(x)} ${r1(y)}) scale(1 .42) rotate(${r1(a)})"><path d="M${-l/2} 0C${r1(-l*.2)} ${r1(-l*.4)} ${r1(l*.25)} ${r1(-l*.38)} ${l/2} 0C${r1(l*.25)} ${r1(l*.38)} ${r1(-l*.2)} ${r1(l*.4)} ${-l/2} 0Z" fill="${c}"/><path d="M${-l/2} 0L${r1(l*.44)} 0" stroke="#3b2812" stroke-width="1" opacity=".55"/></g>`;
  }
  return s;
}
function grass(seed,cx,cy,spread,n,h,cols=['#5f8f3a','#7aa84a','#46702c','#8cb85a']){
  const R=rng(seed);let s='';
  for(let i=0;i<n;i++){
    const x=cx+(R()*2-1)*spread,y=cy+R()*4,hh=h*(.45+R()*.7),lean=(R()*2-1)*h*.5,w=1.2+R()*2;
    s+=`<path d="M${r1(x-w)} ${r1(y)}Q${r1(x-w*.2+lean*.35)} ${r1(y-hh*.6)} ${r1(x+lean)} ${r1(y-hh)}Q${r1(x+w*.4+lean*.35)} ${r1(y-hh*.55)} ${r1(x+w)} ${r1(y)}Z" fill="${cols[Math.floor(R()*cols.length)]}"/>`;
  }
  return s;
}
function moss(seed,cx,cy,rx,n){
  const R=rng(seed);let s='';
  for(let i=0;i<n;i++){const x=cx+(R()*2-1)*rx,y=cy+(R()*2-1)*rx*.1,r=1.5+R()*3;
    s+=`<circle cx="${r1(x)}" cy="${r1(y)}" r="${r1(r)}" fill="${['#5e8a35','#7aa343','#4a722b'][i%3]}"/>`}
  return s;
}
function pebble(x,y,rx,ry,seed){
  return `<path d="${blob(x,y,rx,ry,seed,8,.14)}" fill="#8b8a7c"/><path d="${blob(x-rx*.2,y-ry*.3,rx*.6,ry*.45,seed+1,7,.1)}" fill="#b4b3a4" opacity=".7" filter="${U('b1')}"/>`;
}
/* Pastille de légende en bas des coupes */
const label=(t,y=284)=>{const w=t.length*6.9+30;
  return `<g><rect x="${r1(150-w/2)}" y="${y-15}" width="${r1(w)}" height="24" rx="12" fill="#142214" opacity=".72"/>
  <text x="150" y="${y+1.5}" text-anchor="middle" font-size="13" fill="#f4f1de" font-family="Georgia,serif" font-style="italic">${t}</text></g>`};
