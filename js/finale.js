/* =====================================================================
   FINAL — confettis, date qui danse, champignons qui dansent
   ===================================================================== */
const Finale=(()=>{
  const cv=$('confetti'),ctx=cv.getContext('2d');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const COLS=['#ffc53d','#ff7a45','#ff5fa2','#b48cff','#5fe0a0','#fcfcf5','#e39a1c','#a8d06a','#e2533d'];
  let parts=[],raf=0,timers=[],io=null,built=false;

  function size(){const d=Math.min(2,devicePixelRatio||1);cv.width=innerWidth*d;cv.height=innerHeight*d;ctx.setTransform(d,0,0,d,0,0)}
  function spawn(x,y,n,{angle=-Math.PI/2,spread=Math.PI*2,speed=[6,16]}={}){
    if(reduced)return;
    for(let i=0;i<n;i++){const a=angle+(Math.random()-.5)*spread,v=speed[0]+Math.random()*(speed[1]-speed[0]);
      parts.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,rot:Math.random()*6.28,vr:(Math.random()-.5)*.3,s:6+Math.random()*8,
        c:COLS[Math.floor(Math.random()*COLS.length)],k:'rrcmmls'[Math.floor(Math.random()*7)],ph:Math.random()*6.28,t:0})}
    if(!raf)raf=requestAnimationFrame(loop);
  }
  const cannons=(p=1)=>{spawn(-10,innerHeight+10,Math.round(70*p),{angle:-Math.PI*.3,spread:.7,speed:[14,26]});
    spawn(innerWidth+10,innerHeight+10,Math.round(70*p),{angle:-Math.PI*.7,spread:.7,speed:[14,26]})};
  const rain=n=>{for(let i=0;i<n;i++)spawn(Math.random()*innerWidth,-20-Math.random()*innerHeight*.7,1,{angle:Math.PI/2,spread:.6,speed:[1,3]})};
  const burstAt=el=>{const r=el.getBoundingClientRect();spawn(r.left+r.width/2,r.top+r.height/2,110,{speed:[5,15]})};

  function draw(p){
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot);ctx.scale(1,Math.cos(p.ph));ctx.fillStyle=p.c;const s=p.s;
    if(p.k==='r')ctx.fillRect(-s/2,-s/4,s,s/2);
    else if(p.k==='c'){ctx.beginPath();ctx.arc(0,0,s/2.4,0,6.28);ctx.fill()}
    else if(p.k==='m'){ // petit champignon
      ctx.beginPath();ctx.arc(0,0,s*.72,Math.PI,0);ctx.closePath();ctx.fill();
      ctx.fillStyle='#fcf6e6';ctx.fillRect(-s*.22,0,s*.44,s*.72);
      ctx.fillStyle='rgba(255,255,255,.9)';ctx.beginPath();ctx.arc(-s*.28,-s*.34,s*.12,0,6.28);ctx.arc(s*.18,-s*.26,s*.1,0,6.28);ctx.fill()}
    else if(p.k==='l'){ctx.beginPath();ctx.ellipse(0,0,s*.8,s*.34,0,0,6.28);ctx.fill();ctx.strokeStyle='rgba(0,0,0,.25)';ctx.beginPath();ctx.moveTo(-s*.7,0);ctx.lineTo(s*.7,0);ctx.stroke()}
    else{ctx.beginPath();for(let i=0;i<10;i++){const r=i%2?s*.24:s*.6,a=i*Math.PI/5;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r)}ctx.fill()}
    ctx.restore();
  }
  function loop(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    parts=parts.filter(p=>p.y<innerHeight+60&&p.t<900);
    for(const p of parts){p.t++;p.vy=Math.min(p.vy+.22,3.6);p.vx*=.982;p.x+=p.vx+Math.sin(p.t*.05+p.ph)*.7;p.y+=p.vy;p.rot+=p.vr;p.ph+=.11;draw(p)}
    raf=parts.length?requestAnimationFrame(loop):0;
  }

  /* ---------- Les danseurs ---------- */
  const face=(x,y,k=1,shades)=>`<g transform="translate(${x} ${y}) scale(${k})">
    ${shades?`<path d="M-17 -5H-2Q-1 5 -9 6Q-17 5 -17 -5ZM2 -5H17Q17 5 9 6Q1 5 2 -5ZM-2 -4H2" fill="#1a1a1a" stroke="#1a1a1a" stroke-width="1.5"/><path d="M-14 -3l4 0" stroke="#fff" stroke-width="1.2" opacity=".7"/>`
    :`<g class="eyes"><ellipse cx="-8" cy="0" rx="3.4" ry="4.4" fill="#2a1a10"/><ellipse cx="8" cy="0" rx="3.4" ry="4.4" fill="#2a1a10"/><circle cx="-6.8" cy="-1.6" r="1.3" fill="#fff"/><circle cx="9.2" cy="-1.6" r="1.3" fill="#fff"/></g>`}
    <ellipse cx="-14" cy="7" rx="4" ry="2.4" fill="#ff7f7f" opacity=".55"/><ellipse cx="14" cy="7" rx="4" ry="2.4" fill="#ff7f7f" opacity=".55"/>
    <path d="M-6 7Q0 15 6 7Z" fill="#7a2a1a"/></g>`;
  const limbs=(y,half,col)=>`<g class="arm l"><path d="M${50-half} ${y}Q${40-half} ${y-2} ${34-half} ${y-14}" stroke="${col}" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="${34-half}" cy="${y-15}" r="4.2" fill="${col}"/></g>
    <g class="arm r"><path d="M${50+half} ${y}Q${60+half} ${y-2} ${66+half} ${y-14}" stroke="${col}" stroke-width="4.5" fill="none" stroke-linecap="round"/><circle cx="${66+half}" cy="${y-15}" r="4.2" fill="${col}"/></g>
    <ellipse class="foot l" cx="40" cy="126" rx="9" ry="4.5" fill="#5a3a20"/><ellipse class="foot r" cx="60" cy="126" rx="9" ry="4.5" fill="#5a3a20"/>`;
  const DANCERS=[
    // cèpe
    `${limbs(92,20,'#e8d6b0')}<path d="M30 70C24 100 26 118 34 124L66 124C74 118 76 100 70 70Z" fill="#f1e3c2"/>
     <path d="M34 80l32 0M33 90l34 0" stroke="#d9c49a" stroke-width="1" stroke-dasharray="3 3"/>
     <path d="M8 72C6 36 26 16 50 16C74 16 94 36 92 72C80 80 20 80 8 72Z" fill="#8b5a2b"/><path d="M22 40C30 28 40 24 52 24" stroke="#c28a54" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>${face(50,98)}`,
    // girolle
    `${limbs(96,12,'#f2b04a')}<path d="M40 68C38 94 42 116 46 124L54 124C58 116 62 94 60 68Z" fill="#f0b650"/>
     <path d="M8 38C18 52 36 58 42 72L58 72C64 58 82 52 92 38C84 30 16 30 8 38Z" fill="#f2a431"/><ellipse cx="50" cy="37" rx="42" ry="7" fill="#f7c35a"/>
     <path d="M20 46C30 54 38 58 44 66M80 46C70 54 62 58 56 66" stroke="#d98a1c" stroke-width="1.2" fill="none"/>${face(50,52,.85)}`,
    // morille
    `${limbs(94,18,'#efe2c4')}<path d="M34 72C30 100 32 118 38 124L62 124C68 118 70 100 66 72Z" fill="#f3e7cc"/>
     <path d="M50 6C74 10 78 44 74 72C66 80 34 80 26 72C22 44 26 10 50 6Z" fill="#b07a40"/>
     ${[[40,24],[56,22],[34,40],[50,38],[66,40],[38,56],[54,56],[68,58]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="6.5" fill="#6a4020"/>`).join('')}${face(50,98)}`,
    // coulemelle
    `${limbs(84,8,'#eadcc2')}<path d="M45 40L55 40L58 124L42 124Z" fill="#efe3cc"/>
     ${[60,72,86,100,112].map(y=>`<path d="M44 ${y}l4 3l4 -3l4 3" stroke="#8d6644" stroke-width="1.6" fill="none"/>`).join('')}
     <ellipse cx="50" cy="66" rx="11" ry="4" fill="#fbf4e4" stroke="#c9b797"/>
     <path d="M2 44C12 24 32 12 50 12C68 12 88 24 98 44C70 38 30 38 2 44Z" fill="#f2e8d6"/><ellipse cx="50" cy="16" rx="9" ry="5" fill="#7a5434"/>
     ${[[26,30],[40,24],[60,24],[74,30],[16,38],[86,38],[50,32]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="4" ry="2" fill="#8d6644"/>`).join('')}${face(50,96,.62)}`,
    // champignon de Paris, lunettes de soleil
    `${limbs(92,18,'#f5efe2')}<path d="M34 62C32 92 34 116 38 124L62 124C66 116 68 92 66 62Z" fill="#fbf7ee"/>
     <path d="M12 64C10 32 28 14 50 14C72 14 90 32 88 64C72 72 28 72 12 64Z" fill="#f4ede0"/><path d="M26 34C34 24 44 20 54 20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>${face(50,92,1,true)}`
  ];
  function build(){
    if(built)return;built=true;
    const floor=$('dancefloor');
    floor.innerHTML=DANCERS.map((d,i)=>`<svg class="dancer d${i}" viewBox="0 0 100 132" style="--i:${i}">${d}</svg>`).join('')+
      rep(8,i=>`<span class="mnote" style="left:${6+i*12}%;animation-delay:${(i*.45).toFixed(2)}s">${'♪♫♬'[i%3]}</span>`);
    floor.querySelectorAll('.dancer').forEach(d=>d.addEventListener('click',()=>{d.classList.remove('yay');void d.getBoundingClientRect();d.classList.add('yay');burstAt(d)}));
    const bd=$('bigDate');
    let n=0;bd.innerHTML=bd.textContent.trim().split('').map(c=>c===' '?'<span class="sp"> </span>':`<span class="ch" style="--i:${n++}">${c}</span>`).join('');
    $('dateRow').addEventListener('click',()=>burstAt($('dateRow')));
  }
  function start(){
    build();cv.hidden=false;size();
    const party=$('party');party.classList.remove('pop');
    timers.push(setTimeout(()=>cannons(1),250),setTimeout(()=>rain(90),700));
    io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){party.classList.add('pop');
      timers.push(setTimeout(()=>{burstAt($('dateRow'));cannons(.6)},350));io.disconnect()}}),{threshold:.55});
    io.observe($('dateRow'));
    timers.push(setInterval(()=>{if(!$('end').classList.contains('open'))return;rain(26)},4200));
  }
  function stop(){timers.forEach(t=>{clearTimeout(t);clearInterval(t)});timers=[];io&&io.disconnect();parts=[];
    cancelAnimationFrame(raf);raf=0;ctx.clearRect(0,0,innerWidth,innerHeight);cv.hidden=true}
  addEventListener('resize',()=>{if(!cv.hidden)size()});
  return{start,stop};
})();
