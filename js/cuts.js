/* =====================================================================
   COUPES — les cavités sont rendues par ombres intérieures et dégradés,
   jamais par un simple aplat noir.
   ===================================================================== */
const CUT={};
const board=G(`<defs>${LG('wood',[[0,'#dcb57c'],[1,'#a8763f']])}</defs>
  <ellipse cx="150" cy="292" rx="150" ry="14" fill="#0e180c" opacity=".5" filter="${U('b5')}"/>
  <path d="M16 250Q150 236 284 250L294 280Q150 296 6 280Z" fill="${U('wood')}"/>
  <path d="M6 280Q150 296 294 280L294 287Q150 303 6 287Z" fill="#7a5028"/>
  ${rep(6,i=>`<path d="M${36+i*8} ${255+i*4.4}Q150 ${244+i*4.6} ${264-i*8} ${255+i*4.4}" fill="none" stroke="#8a5e32" stroke-width=".9" opacity=".4"/>`)}`);
const mirror=right=>{const left=right.slice(1,-1).map(([d,y])=>[-d,y]).reverse();return [...right,...left].map(([d,y])=>[150+d,y])};
const lerpY=(pts,d)=>{for(let i=0;i<pts.length-1;i++){const [a,ya]=pts[i],[b,yb]=pts[i+1];if((d-a)*(d-b)<=0)return ya+(yb-ya)*((d-a)/((b-a)||1))}return pts[pts.length-1][1]};

/* 1 — Ail des ours : lame fine + pétiole plein */
CUT.ail=(()=>{
  const A=[36,150],B=[250,128],C=[266,150],D=[54,178],c1=[86,118],c2=[176,112],d1=[104,146],d2=[194,138];
  const L=(p,q,k)=>[p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k];
  const veins=rep(9,i=>{const k=(i+1)/10;return `<path d="M${P(L(A,D,k))}C${P(L(c1,d1,k))} ${P(L(c2,d2,k))} ${P(L(B,C,k))}" fill="none" stroke="${i===4?'#dcf3bd':'#b9e396'}" stroke-width="${i===4?1.6:.7}" opacity=".6"/>`});
  return `<defs>${LG('top',[[0,'#a6dc7c'],[1,'#3f8a33']],0,0,1,1)}${LG('pet',[[0,'#c6eba0'],[.45,'#78b457'],[1,'#3b772c']])}${RG('face',[[0,'#f3fce6'],[1,'#a9d98a']],.4,.4,.7)}</defs>
  ${board}
  <ellipse cx="150" cy="190" rx="112" ry="10" fill="#1d2a10" opacity=".35" filter="${U('b5')}"/>
  <path d="M${P(A)}C${P(c1)} ${P(c2)} ${P(B)}L${P(C)}C${P(d2)} ${P(d1)} ${P(D)}Z" fill="${U('top')}" filter="${U('grain')}"/>
  ${veins}
  <path d="M50 146C96 120 170 116 236 130" fill="none" stroke="#fff" stroke-width="4" opacity=".22" filter="${U('b1')}"/>
  <path d="M${P(D)}C${P(d1)} ${P(d2)} ${P(C)}L266 154C194 142 104 150 54 182Z" fill="#dcf3c2"/>
  <path d="M54 182C104 150 194 142 266 154" fill="none" stroke="#6aa84c" stroke-width="1"/>
  <ellipse cx="158" cy="147.5" rx="4" ry="2.6" fill="#b5e093" stroke="#6aa84c" stroke-width=".6"/>
  <ellipse cx="150" cy="236" rx="90" ry="7" fill="#1d2a10" opacity=".4" filter="${U('b2')}"/>
  <path d="M74 206L226 198C236 198 238 222 226 222L74 232Z" fill="${U('pet')}" filter="${U('fiberH')}"/>
  <path d="M76 211L224 203" stroke="#e4f7cf" stroke-width="2" opacity=".5"/>
  <ellipse cx="74" cy="219" rx="8" ry="13" fill="${U('face')}" stroke="#5a9a3c" stroke-width="1.2"/>
  ${rep(6,i=>{const a=Math.PI*(.15+i*.14);return `<circle cx="${r1(74+Math.cos(a)*4)}" cy="${r1(219+Math.sin(a)*8)}" r="1.3" fill="#6fb04f"/>`})}
  <ellipse cx="71" cy="213" rx="2" ry="3.6" fill="#fff" opacity=".75"/>
  <path d="M71 232C68 238 68 243 71.5 244C75 243 75 238 71 232Z" fill="#e4f7d4" opacity=".85" stroke="#9fd07e" stroke-width=".5"/>
  ${label('lame fine · pétiole plein et juteux',288)}`;
})();

/* 2 — Colchique : feuille épaisse gorgée d'eau */
CUT.colchique=(()=>{
  const bz=(t,a,b,c,d)=>[0,1].map(j=>(1-t)**3*a[j]+3*(1-t)**2*t*b[j]+3*(1-t)*t*t*c[j]+t**3*d[j]);
  const A=[40,122],c1=[90,90],c2=[180,86],B=[256,104],D=[58,156],d1=[108,124],d2=[198,116],C=[270,130];
  let cells='';
  for(let r=0;r<3;r++)for(let t=.03+r*.012;t<.98;t+=.034){const p=bz(t,D,d1,d2,C),rr=3.2+((t*97+r*3)%1.6);
    cells+=`<circle cx="${r1(p[0])}" cy="${r1(p[1]+7+r*8.5)}" r="${r1(rr)}" fill="${U('cell')}" stroke="#5d9a45" stroke-width=".6"/><circle cx="${r1(p[0]-1)}" cy="${r1(p[1]+6+r*8.5)}" r=".9" fill="#fff" opacity=".85"/>`}
  const drops=[.28,.53,.78].map((t,i)=>{const p=bz(t,[58,186],[108,154],[198,146],[270,160]),h=10+i*3;
    return `<path d="M${r1(p[0])} ${r1(p[1])}C${r1(p[0]-4.5)} ${r1(p[1]+h*.5)} ${r1(p[0]-4.5)} ${r1(p[1]+h)} ${r1(p[0])} ${r1(p[1]+h+1)}C${r1(p[0]+4.5)} ${r1(p[1]+h)} ${r1(p[0]+4.5)} ${r1(p[1]+h*.5)} ${r1(p[0])} ${r1(p[1])}Z" fill="#dff4fb" opacity=".8" stroke="#8fc5d8" stroke-width=".6"/><ellipse cx="${r1(p[0]-1.5)}" cy="${r1(p[1]+h*.7)}" rx="1" ry="2" fill="#fff"/>`});
  return `<defs>${LG('top',[[0,'#7fc062'],[1,'#1f5a20']],0,0,1,1)}${LG('face',[[0,'#d2f0b8'],[1,'#84c268']])}${RG('cell',[[0,'#f6fff0'],[.6,'#cdeeb8'],[1,'#8fcb74']],.4,.35,.6)}</defs>
  ${board}
  <ellipse cx="150" cy="206" rx="118" ry="12" fill="#1d2a10" opacity=".35" filter="${U('b5')}"/>
  <path d="M${P(A)}C${P(c1)} ${P(c2)} ${P(B)}L${P(C)}C${P(d2)} ${P(d1)} ${P(D)}Z" fill="${U('top')}" filter="${U('grain')}"/>
  ${rep(7,i=>{const k=(i+1)/8;const L=(p,q)=>[p[0]+(q[0]-p[0])*k,p[1]+(q[1]-p[1])*k];return `<path d="M${P(L(A,D))}C${P(L(c1,d1))} ${P(L(c2,d2))} ${P(L(B,C))}" fill="none" stroke="#0f3d10" stroke-width=".7" opacity=".4"/>`})}
  <path d="M60 128C104 102 180 96 246 110" fill="none" stroke="#fff" stroke-width="6" opacity=".22" filter="${U('b2')}"/>
  <path d="M${P(D)}C${P(d1)} ${P(d2)} ${P(C)}L270 160C198 146 108 154 58 186Z" fill="${U('face')}"/>
  ${cells}
  <path d="M${P(D)}C${P(d1)} ${P(d2)} ${P(C)}" fill="none" stroke="#2f6d2a" stroke-width="1.6"/>
  <path d="M58 186C108 154 198 146 270 160" fill="none" stroke="#2f6d2a" stroke-width="1.2"/>
  ${drops.join('')}
  ${label('épais, gorgé d’eau, sans cavité',288)}`;
})();

/* 3 — Morille : UNE cavité continue, du sommet du chapeau à la base du pied */
CUT.morille=(()=>{
  const top=24,bot=170,cx=150,RX=62,wAt=y=>morelW(y,top,bot,RX);
  const sw=y=>{const t=(y-bot)/(248-bot);return 22+t*4+(t>.7?(t-.7)*30:0)};
  const outline=(off,offS)=>{const L=[],Rr=[];
    for(let y=top+(off?4:0);y<=bot;y+=3){const w=Math.max(0,wAt(y)-off),b=(w>6&&!off)?2.6*Math.abs(Math.sin(y*.36)):0;L.push([cx-w-b,y]);Rr.push([cx+w+b*.8,y])}
    const wb=wAt(bot)-14-off;L.push([cx-wb,bot+4]);Rr.push([cx+wb,bot+4]);
    for(let y=bot+10;y<=248;y+=6){const w=sw(y)-offS;L.push([cx-w,y]);Rr.push([cx+w,y])}
    return smooth([...L,[cx,252-offS],...Rr.reverse()])};
  const cav=(()=>{const L=[],Rr=[];
    for(let y=top+16;y<=bot;y+=4){const w=wAt(y)-8;if(w<2)continue;L.push([cx-w,y]);Rr.push([cx+w,y])}
    L.push([cx-(wAt(bot)-8)*.55,bot+5]);Rr.push([cx+(wAt(bot)-8)*.55,bot+5]);
    for(let y=bot+12;y<=234;y+=6){const w=sw(y)-9;L.push([cx-w,y]);Rr.push([cx+w,y])}
    return smooth([[cx,top+12],...Rr,[cx,240],...L.reverse()])})();
  const notches=rep(15,i=>{const y=top+20+i*9.4,w=wAt(y);return w<8?'':`<path d="M${r1(cx-w)} ${r1(y)}l5 1.5M${r1(cx+w)} ${r1(y)}l-5 1.5" stroke="#6f4520" stroke-width="1.6" opacity=".55"/>`});
  const R=rng(3);
  return `<defs>${LG('fl',[[0,'#f8f0de'],[1,'#e6d6b6']],0,0,1,0)}${RG('cv',[[0,'#f1e6cd'],[.5,'#d3bd96'],[1,'#8d7150']],.45,.42,.62)}
    <clipPath id="§cc"><path d="${cav}"/></clipPath></defs>
  ${board}
  <ellipse cx="150" cy="256" rx="44" ry="8" fill="#2a1a0a" opacity=".45" filter="${U('b2')}"/>
  <path d="${outline(0,0)}" fill="#76491f"/>
  <path d="${outline(2.8,1.4)}" fill="${U('fl')}" filter="${U('grain')}"/>
  ${notches}
  <path d="${cav}" fill="${U('cv')}" filter="${U('cav')}"/>
  <g clip-path="url(#§cc)">${rep(70,()=>`<circle cx="${r1(100+R()*100)}" cy="${r1(30+R()*210)}" r="${r1(.5+R()*.8)}" fill="#fff" opacity=".4"/>`)}
    ${rep(8,i=>`<path d="M${128+i*6} 40C${124+i*7} 110 ${128+i*6} 170 ${140+i*2.6} 236" fill="none" stroke="#7a6040" stroke-width="1" opacity=".22"/>`)}</g>
  <path d="M150 46L150 222" stroke="#fffdf4" stroke-width="1.6" stroke-dasharray="5 5" opacity=".75"/>
  <path d="M145 52L150 44L155 52M145 216L150 224L155 216" fill="none" stroke="#fffdf4" stroke-width="1.6" opacity=".75"/>
  ${label('une seule cavité, du sommet au pied',288)}`;
})();

/* 4 — Gyromitre : intérieur cloisonné en multiples petites loges ; pied creux */
CUT.gyromitre=(()=>{
  const ch=[[116,88,20,11,.3,1],[172,78,24,10,-.2,2],[100,122,12,18,.1,3],[146,112,20,10,.4,4],[196,116,14,20,-.3,5],[122,150,22,10,-.1,6],[174,148,20,11,.2,7],[150,86,8,6,0,8],[210,90,9,12,.5,9],[92,92,8,11,-.4,10],[150,138,9,5,0,11],[218,142,7,9,.2,12],[84,146,7,9,-.2,13]];
  const st=[[150,210,8,14,0,21],[150,236,7,12,.15,22],[150,258,8,10,-.1,23]];
  const cham=a=>a.map(([x,y,rx,ry,rot,sd])=>`<path d="${blob(x,y,rx,ry,sd,9,.28,rot)}"/>`).join('');
  const R=rng(5);
  const threads=rep(16,i=>{const [x,y,rx,ry]=ch[i%ch.length];return `<path d="M${r1(x-rx*.7)} ${r1(y+(R()-.5)*ry)}Q${x} ${r1(y+(R()-.5)*ry*1.5)} ${r1(x+rx*.7)} ${r1(y+(R()-.5)*ry)}" stroke="#fff" stroke-width=".6" fill="none" opacity=".5"/>`});
  const folds=rep(12,i=>{const a=ch[i%ch.length],b=ch[(i*5+3)%ch.length];return `<path d="M${a[0]} ${a[1]}Q${r1((a[0]+b[0])/2+(R()-.5)*30)} ${r1((a[1]+b[1])/2+(R()-.5)*30)} ${b[0]} ${b[1]}" stroke="#5a3018" stroke-width="1.8" fill="none" opacity=".4"/>`});
  return `<defs>${RG('fl',[[0,'#f7ede2'],[1,'#dcc4b0']],.4,.35,.8)}${RG('ch',[[0,'#dbc6b2'],[.6,'#a0846e'],[1,'#654a38']],.5,.58,.65)}${LG('stem',[[0,'#fbf1e6'],[1,'#dcc7b4']],0,0,1,0)}</defs>
  ${board}
  <ellipse cx="150" cy="266" rx="40" ry="8" fill="#2a1a0a" opacity=".45" filter="${U('b2')}"/>
  <path d="M134 160C128 200 126 242 132 262C134 274 166 274 168 262C174 242 172 200 166 160Z" fill="#c4a78e"/>
  <path d="M138 160C132 200 130 242 136 260C138 270 162 270 164 260C170 242 168 200 162 160Z" fill="${U('stem')}" filter="${U('fiber')}"/>
  <g fill="${U('ch')}" filter="${U('cav')}">${cham(st)}</g>
  <path d="${gyroCap}" fill="#4a2410"/>
  <path d="${gyroCap}" transform="translate(150 110) scale(.94) translate(-150 -110)" fill="${U('fl')}" filter="${U('grain')}"/>
  ${folds}
  <g fill="${U('ch')}" filter="${U('cav')}">${cham(ch)}</g>
  ${threads}
  ${label('cloisonné en petites cavités',288)}`;
})();

/* Tronçon de tige coupé net, vu de trois quarts */
function stemCyl(face,defs){
  const cx=150,ty=110,by=226,rx=66,ry=22;
  return `<defs>${LG('side',[[0,'#a2c97f'],[.35,'#7aa75a'],[1,'#3a672a']],0,0,1,0)}${defs}</defs>
  ${board}
  <ellipse cx="150" cy="${by+20}" rx="86" ry="14" fill="#2a1a0a" opacity=".45" filter="${U('b5')}"/>
  <path d="M${cx-rx} ${ty}L${cx-rx} ${by}A${rx} ${ry} 0 0 0 ${cx+rx} ${by}L${cx+rx} ${ty}Z" fill="${U('side')}" filter="${U('fiber')}"/>
  ${rep(10,i=>{const a=-1.35+i*.3,x=cx+rx*Math.sin(a),dy=ry*Math.cos(a);return `<path d="M${r1(x)} ${r1(ty+dy)}L${r1(x)} ${r1(by+dy)}" stroke="#2f5220" stroke-width="1" opacity=".3"/>`})}
  <path d="M${cx-rx+8} ${ty+10}L${cx-rx+8} ${by+8}" stroke="#e1f3c4" stroke-width="6" opacity=".3" filter="${U('b2')}"/>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx}" ry="${ry}" fill="#40692b"/>
  ${face(cx,ty,rx,ry)}`;
}

/* 5 — Gentiane : tige nettement creuse */
CUT.gentiane=stemCyl((cx,ty,rx,ry)=>`
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-3}" ry="${ry-1.2}" fill="${U('cortex')}" filter="${U('grain')}"/>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-15}" ry="${ry-5.2}" fill="none" stroke="#79a54f" stroke-width="2.2" stroke-dasharray="3 2.5"/>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-22}" ry="${ry-7.4}" fill="${U('hole')}" filter="${U('cav')}"/>
  <clipPath id="§hc"><ellipse cx="${cx}" cy="${ty}" rx="${rx-22}" ry="${ry-7.4}"/></clipPath>
  <g clip-path="url(#§hc)">${rep(15,i=>`<path d="M${cx-42+i*6} ${ty-16}L${cx-42+i*6} ${ty+3}" stroke="#d3e5b3" stroke-width=".8" opacity=".35"/>`)}</g>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-22}" ry="${ry-7.4}" fill="none" stroke="#f1f8e0" stroke-width="1" opacity=".5"/>
  ${label('tige nettement creuse',288)}`,
  `${RG('cortex',[[0,'#e6f2ca'],[1,'#a6c982']],.45,.4,.7)}${LG('hole',[[0,'#a9c282'],[.45,'#6a8448'],[1,'#33441f']])}`);

/* 6 — Vératre : tige pleine, faisceaux dispersés, gaines emboîtées */
CUT.veratre=stemCyl((cx,ty,rx,ry)=>{
  let b='';for(let i=0;i<90;i++){const r=Math.sqrt((i+.5)/90)*(rx-14),a=i*2.39996,x=cx+Math.cos(a)*r,y=ty+Math.sin(a)*r*(ry/rx);
    b+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="2.3" ry="1.1" fill="#6f8f48"/><ellipse cx="${r1(x-.4)}" cy="${r1(y-.3)}" rx="1" ry=".45" fill="#eef5d6"/>`}
  return `<ellipse cx="${cx}" cy="${ty}" rx="${rx-3}" ry="${ry-1}" fill="#8aad5f"/>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-6}" ry="${ry-2}" fill="#6f9446"/>
  <ellipse cx="${cx}" cy="${ty}" rx="${rx-8}" ry="${ry-2.7}" fill="${U('pith')}" filter="${U('grain')}"/>
  ${b}
  <path d="M${cx-rx+14} ${ty-4}A${rx-14} ${ry-5} 0 0 1 ${cx+10} ${ty-ry+5}" fill="none" stroke="#fff" stroke-width="2" opacity=".3"/>
  ${label('tige pleine et compacte',288)}`},
  `${RG('pith',[[0,'#f5f7de'],[.7,'#dde8b8'],[1,'#b9cf8a']],.45,.4,.7)}`);

/* 7 — Tricholome : chair épaisse, ferme et blanche, lames serrées échancrées */
CUT.tricholome=(()=>{
  const right=[[0,54],[36,57],[66,68],[88,90],[99,118],[100,144],[95,160],[85,166],[77,160],[79,150],[68,142],[48,137],[30,137],[22,144],[21,166],[23,200],[26,236],[30,254],[22,264],[0,267]];
  const sec=smooth(mirror(right));
  const topPts=[[-100,144],[-99,118],[-88,90],[-66,68],[-36,57],[0,54],[36,57],[66,68],[88,90],[99,118],[100,144]].map(([d,y])=>[150+d,y]);
  const edge=d=>d<34?150+(d-24)*1.4:164-(d-34)*.05;
  const gills=[-1,1].map(sg=>`<path d="M${150+sg*23} 139L${150+sg*78} 146L${150+sg*78} ${r1(edge(78))}L${150+sg*34} ${edge(34)}L${150+sg*24} 150Z" fill="#f1e8d1"/>`+
    rep(24,i=>{const d=24+i*2.25;return `<path d="M${r1(150+sg*d)} 139L${r1(150+sg*d)} ${r1(edge(d))}" stroke="#d6c7a2" stroke-width=".8"/>`})).join('');
  return `<defs>${LG('fl',[[0,'#fffdf7'],[1,'#efe6d0']])}</defs>
  ${board}
  <ellipse cx="150" cy="268" rx="52" ry="8" fill="#2a1a0a" opacity=".45" filter="${U('b2')}"/>
  ${gills}
  <g filter="${U('soft')}"><path d="${sec}" fill="${U('fl')}" filter="${U('grain')}"/></g>
  ${rep(9,i=>`<path d="M${133+i*4.3} 150L${132+i*4.6} 258" stroke="#cdbb95" stroke-width=".7" opacity=".3"/>`)}
  <path d="M${P(topPts[0])}${curve(topPts)}" fill="none" stroke="#e0cfa4" stroke-width="3"/>
  ${label('chair ferme et blanche, immuable',288)}`;
})();

/* 8 — Amanite phalloïde : pied séparable, anneau, bulbe dans une volve en sac */
CUT.phalloide=(()=>{
  const capR=[[0,40],[40,44],[72,58],[92,80],[100,104],[98,116],[84,112],[56,104],[30,101],[12,103],[0,103]];
  const cap=smooth(mirror(capR)),flesh=smooth(mirror(capR.map(([d,y],i)=>i<=5?[d*.955,y+4.5]:[d,y-.6])));
  const stem=smooth(mirror([[0,108],[14,108],[15,150],[17,196],[20,216],[27,232],[30,248],[23,263],[0,268]]));
  const volve=smooth(mirror([[0,284],[28,280],[42,266],[46,244],[42,218],[37,216],[34,236],[35,252],[27,268],[0,273]]));
  const gap=smooth(mirror([[0,214],[37,217],[34,236],[35,252],[27,268],[0,273]]));
  const under=[[26,101],[56,104],[84,112],[96,116]];
  const gills=[-1,1].map(sg=>rep(30,i=>{const d=26+i*2.3,y0=lerpY(under,d);return `<path d="M${r1(150+sg*d)} ${r1(y0)}L${r1(150+sg*d)} ${r1(y0+Math.min(11,(d-26)*.7+4)-(d>86?(d-86)*.9:0))}" stroke="#dedbca" stroke-width="1.4"/>`})).join('');
  const flap=`<path d="M164 143C177 145 187 150 190 156C189 168 186 178 182 185C178 183 177 172 176 163C172 155 168 150 164 150Z" fill="#faf9f1" stroke="#c9c6b0" stroke-width=".8"/>
    <path d="M170 150C176 158 178 170 179 180M182 154C185 161 186 170 186 177" fill="none" stroke="#d8d4c2" stroke-width="1"/>`;
  return `<defs>${LG('stem',[[0,'#ffffff'],[1,'#e8e5d6']],0,0,1,0)}${RG('gp',[[0,'#b6b09a'],[1,'#6e6a56']],.5,.3,.7)}${LG('vl',[[0,'#fbf9ef'],[1,'#cfc9b2']],0,0,1,0)}</defs>
  ${board}
  <ellipse cx="150" cy="280" rx="60" ry="9" fill="#2a1a0a" opacity=".45" filter="${U('b2')}"/>
  <path d="${volve}" fill="${U('vl')}" filter="${U('grain')}"/>
  <path d="${gap}" fill="${U('gp')}" filter="${U('cav')}"/>
  <path d="${stem}" fill="${U('stem')}" filter="${U('fiber')}"/>
  <path d="${blob(150,178,4.5,48,3,10,.08)}" fill="#e7e3d2" filter="${U('soft')}"/>
  ${flap}<g transform="translate(300 0) scale(-1 1)">${flap}</g>
  <path d="M${150-96} 116L${150-26} 101L${150+26} 101L${150+96} 116L${150+96} 124L${150-96} 124Z" fill="#f4f3ea" opacity="0"/>
  ${gills}
  <path d="${cap}" fill="#7f8b40"/>
  <path d="${flesh}" fill="#fbfaf3" filter="${U('grain')}"/>
  <path d="M134 106L166 106" stroke="#3f3622" stroke-width="2.6" opacity=".5" filter="${U('b1')}"/>
  ${label('chair fibreuse, pied détachable',290)}`;
})();

/* 9 — Coulemelle : chapeau mince, pied creux et fibreux, anneau libre */
CUT.coulemelle=(()=>{
  const capR=[[0,56],[12,57],[22,66],[44,72],[80,80],[110,92],[124,101],[120,105],[96,97],[62,89],[34,85],[18,87],[0,87]];
  const cap=smooth(mirror(capR)),flesh=smooth(mirror(capR.map(([d,y],i)=>i<=6?[d*.98,y+3]:[d,y-.4])));
  const topR=capR.slice(0,7),under=capR.slice(7).reverse();
  const scales=[-1,1].map(sg=>rep(9,i=>{const d=30+i*10.5,y=lerpY(topR,d);return `<ellipse cx="${r1(150+sg*d)}" cy="${r1(y-1)}" rx="4.5" ry="2.4" fill="#7a5434" transform="rotate(${r1(sg*8)} ${r1(150+sg*d)} ${r1(y)})"/>`})).join('');
  const gills=[-1,1].map(sg=>rep(36,i=>{const d=30+i*2.5,y0=lerpY(under,d),h=d<44?(d-30)*.7+4:d>104?Math.max(2,14-(d-104)*.9):14;return `<path d="M${r1(150+sg*d)} ${r1(y0)}L${r1(150+sg*d)} ${r1(y0+h)}" stroke="#e5dcc6" stroke-width="1.3"/>`})).join('');
  const stem=smooth(mirror([[0,88],[9,90],[10,160],[12,226],[22,244],[24,260],[14,272],[0,274]]));
  const cav=smooth(mirror([[0,100],[5,102],[5.5,160],[7,226],[14,246],[12,260],[0,264]]));
  const ring=`<ellipse cx="170" cy="150" rx="8" ry="5.5" fill="#f3ead6" stroke="#b9a888" stroke-width=".8"/><ellipse cx="162" cy="150" rx="2.2" ry="5" fill="#3a2a14" opacity=".45" filter="${U('b1')}"/>`;
  const R=rng(9);
  return `<defs>${LG('stem',[[0,'#f3e8d2'],[1,'#d8c6a4']],0,0,1,0)}${LG('cv',[[0,'#bfa888'],[.5,'#e2d3b8'],[1,'#a48c6a']],0,0,1,0)}<clipPath id="§cl"><path d="${cav}"/></clipPath></defs>
  ${board}
  <ellipse cx="150" cy="274" rx="40" ry="7" fill="#2a1a0a" opacity=".45" filter="${U('b2')}"/>
  ${gills}
  <path d="${stem}" fill="${U('stem')}" filter="${U('fiber')}"/>
  ${rep(12,i=>`<path d="M141 ${168+i*5}l3 2M159 ${168+i*5}l-3 2" stroke="#7a5536" stroke-width="1.4" opacity=".6"/>`)}
  <path d="${cav}" fill="${U('cv')}" filter="${U('cav')}"/>
  <g clip-path="url(#§cl)">${rep(22,()=>{const y=104+R()*150;return `<path d="M${r1(144+R()*4)} ${r1(y)}Q150 ${r1(y+6+R()*8)} ${r1(152+R()*4)} ${r1(y+R()*10)}" stroke="#fffaf0" stroke-width=".6" fill="none" opacity=".55"/>`})}</g>
  ${ring}<g transform="translate(300 0) scale(-1 1)">${ring}</g>
  <path d="M200 136L200 164M196 141L200 135L204 141M196 159L200 165L204 159" stroke="#fffdf4" stroke-width="1.6" fill="none" opacity=".85"/>
  <path d="${cap}" fill="#cdb893"/>
  <path d="${flesh}" fill="#fcf8ee" filter="${U('grain')}"/>
  <path d="M128 60C136 50 164 50 172 60C164 66 136 66 128 60Z" fill="#7a5434"/>
  ${scales}
  ${label('pied haut, creux et fibreux',288)}`;
})();

/* 10 — Arum : baie ouverte + zoom sur les raphides */
CUT.arum=(()=>{
  const R=rng(17);
  const needles=rep(30,()=>{const l=44+R()*24,a=-.35+(R()-.5)*.14,ox=(R()-.5)*16,oy=(R()-.5)*8,x=216+ox,y=196+oy,dx=Math.cos(a)*l/2,dy=Math.sin(a)*l/2;
    return `<path d="M${r1(x-dx)} ${r1(y-dy)}L${r1(x+dx)} ${r1(y+dy)}" stroke="#5a3a3a" stroke-width="1.8" opacity=".35"/><path d="M${r1(x-dx)} ${r1(y-dy)}L${r1(x+dx)} ${r1(y+dy)}" stroke="#ffffff" stroke-width=".9"/>`});
  const walls=rep(9,i=>`<path d="${blob(170+(i%3)*46,150+Math.floor(i/3)*46,26,20,i+40,7,.18)}" fill="none" stroke="#d99a80" stroke-width="1.4" opacity=".6"/>`);
  return `<defs>${RG('pulp',[[0,'#ffe6a8'],[.55,'#f8a44e'],[1,'#d65a22']],.42,.4,.62)}${RG('seed',[[0,'#fff8e4'],[1,'#d4c096']],.4,.35,.7)}
    ${RG('tis',[[0,'#fff1e4'],[1,'#efbfa4']],.45,.4,.7)}<clipPath id="§lp"><circle cx="216" cy="196" r="54"/></clipPath></defs>
  ${board}
  <ellipse cx="118" cy="214" rx="64" ry="12" fill="#2a1a0a" opacity=".45" filter="${U('b5')}"/>
  <circle cx="118" cy="140" r="66" fill="#8e150d"/>
  <circle cx="118" cy="140" r="60" fill="${U('pulp')}" filter="${U('grain')}"/>
  ${rep(40,()=>`<circle cx="${r1(118+(R()-.5)*96)}" cy="${r1(140+(R()-.5)*96)}" r="${r1(2+R()*3)}" fill="#ffd28a" opacity=".35"/>`)}
  <path d="${blob(102,134,13,9,3,8,.1,.4)}" fill="${U('seed')}" filter="${U('soft')}"/>
  <path d="${blob(134,152,11,8,5,8,.1,-.3)}" fill="${U('seed')}" filter="${U('soft')}"/>
  <path d="M72 104C86 86 108 80 126 82" fill="none" stroke="#fff" stroke-width="6" opacity=".45" stroke-linecap="round" filter="${U('b2')}"/>
  <path d="M168 170L176 180M150 196L170 222" stroke="#fffdf4" stroke-width="1.2" stroke-dasharray="3 3" opacity=".7"/>
  <circle cx="216" cy="196" r="54" fill="${U('tis')}"/>
  <g clip-path="url(#§lp)">${walls}
    <ellipse cx="216" cy="196" rx="42" ry="17" transform="rotate(-20 216 196)" fill="#fbe2d6" stroke="#c77b62" stroke-width="1.4"/>
    ${needles}</g>
  <circle cx="216" cy="196" r="54" fill="none" stroke="#6b5220" stroke-width="9"/>
  <circle cx="216" cy="196" r="54" fill="none" stroke="#d9c28d" stroke-width="6"/>
  <path d="M176 164A54 54 0 0 1 238 146" fill="none" stroke="#fff6d6" stroke-width="2" opacity=".7"/>
  ${label('aiguilles d’oxalate (raphides)',288)}`;
})();
