/* =====================================================================
   FINAL — date qui danse, champignons et plantes qui dansent autour, façon disco
   ===================================================================== */
const Finale=(()=>{
  let built=false;

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
    // ail des ours : deux grandes feuilles pour corps, ombelle d'étoiles blanches en chapeau
    `${limbs(90,14,'#6fb04c')}<path d="M50 30L50 8" stroke="#8cc86a" stroke-width="3"/>
     ${[[50,4],[40,8],[60,8],[44,-1],[56,-1],[34,1],[66,1]].map(([x,y])=>`<g transform="translate(${x} ${y+6})">${[0,60,120,180,240,300].map(r=>`<ellipse cx="0" cy="-3" rx="1.6" ry="3" fill="#fff" transform="rotate(${r})"/>`).join('')}<circle r="1.3" fill="#e9d35a"/></g>`).join('')}
     <path d="M50 124C24 110 22 60 44 26C48 60 50 100 50 124Z" fill="#5aa63e"/><path d="M50 124C76 110 78 60 56 26C52 60 50 100 50 124Z" fill="#3f8a33"/>
     <path d="M50 124C36 100 30 70 34 44C44 58 50 92 50 124Z" fill="#8fd16a"/><path d="M50 124C64 100 70 70 66 44C56 58 50 92 50 124Z" fill="#6fb04c"/>
     <path d="M50 122L50 40" stroke="#d9f2b8" stroke-width="1.4" opacity=".7"/>${face(50,82,.9)}`,
    // morille
    `${limbs(94,18,'#efe2c4')}<path d="M34 72C30 100 32 118 38 124L62 124C68 118 70 100 66 72Z" fill="#f3e7cc"/>
     <path d="M50 6C74 10 78 44 74 72C66 80 34 80 26 72C22 44 26 10 50 6Z" fill="#b07a40"/>
     ${[[40,24],[56,22],[34,40],[50,38],[66,40],[38,56],[54,56],[68,58]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="6.5" fill="#6a4020"/>`).join('')}${face(50,98)}`,
    // gentiane jaune : tige verte dodue, paires de feuilles bleutées, couronne d'étoiles jaunes
    `${limbs(84,10,'#7aa35a')}<path d="M36 124C34 100 34 60 38 34C42 26 58 26 62 34C66 60 66 100 64 124Z" fill="#8db26a"/>
     <path d="M40 34C42 70 42 100 42 122" stroke="#c7df9e" stroke-width="3" fill="none" opacity=".6"/>
     <path d="M38 112C24 108 12 98 8 88C22 90 34 100 40 106ZM62 112C76 108 88 98 92 88C78 90 66 100 60 106Z" fill="#6f9f78"/>
     ${[[50,14],[34,22],[66,22],[42,28],[58,28],[26,30],[74,30]].map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(${i*17})">${[0,72,144,216,288].map(r=>`<path d="M0 0L-2.6 -8L0 -11L2.6 -8Z" fill="#f7c831" transform="rotate(${r})"/>`).join('')}<circle r="2" fill="#d98a1c"/></g>`).join('')}${face(50,76,.85)}`,
    // champignon de Paris, lunettes de soleil
    `${limbs(92,18,'#f5efe2')}<path d="M34 62C32 92 34 116 38 124L62 124C66 116 68 92 66 62Z" fill="#fbf7ee"/>
     <path d="M12 64C10 32 28 14 50 14C72 14 90 32 88 64C72 72 28 72 12 64Z" fill="#f4ede0"/><path d="M26 34C34 24 44 20 54 20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>${face(50,92,1,true)}`,
    // colchique : coupe mauve en guise de tête, long tube blanc pour corps
    `${limbs(94,6,'#f1e9ee')}<path d="M44 58C42 90 44 116 46 124L54 124C56 116 58 90 56 58Z" fill="#f7f1f3"/>
     <path d="M46 62C45 90 46 112 48 122" stroke="#d8cbd2" stroke-width="1.4" fill="none"/>
     <path d="M50 64C22 60 14 30 24 8C36 16 44 34 50 64Z" fill="#9b4c94"/><path d="M50 64C78 60 86 30 76 8C64 16 56 34 50 64Z" fill="#9b4c94"/>
     <path d="M50 66C30 62 22 34 32 10C44 18 50 40 50 66Z" fill="#c77cc0"/><path d="M50 66C70 62 78 34 68 10C56 18 50 40 50 66Z" fill="#b86aae"/>
     <path d="M50 68C38 64 34 30 50 4C66 30 62 64 50 68Z" fill="#e2a8d8"/><path d="M50 62L50 12" stroke="#a5579d" stroke-width="1" opacity=".6"/>
     <path d="M38 20C36 30 38 42 42 50" stroke="#fff" stroke-width="2" fill="none" opacity=".45" stroke-linecap="round"/>${face(50,42,.72)}`
  ];
  function build(){
    if(built)return;built=true;
    const svg=i=>`<svg class="dancer d${i}" viewBox="0 0 100 132" style="--i:${i}">${DANCERS[i]}</svg>`;
    $('crewTop').innerHTML=[0,1,2].map(svg).join('');
    $('crewBot').innerHTML=[3,4,5].map(svg).join('');
    $('dancefloor').insertAdjacentHTML('beforeend',rep(6,i=>`<span class="sparkle" aria-hidden="true" style="left:${[38,60,30,68,44,56][i]}%;top:${[14,10,40,36,56,52][i]}px;animation-delay:${(i*.2).toFixed(1)}s">✦</span>`)+rep(8,i=>`<span class="mnote" aria-hidden="true" style="left:${6+i*12}%;animation-delay:${(i*.45).toFixed(2)}s">${'♪♫♬'[i%3]}</span>`));
    $('dancefloor').querySelectorAll('.dancer').forEach(d=>d.addEventListener('click',()=>{d.classList.remove('yay');void d.getBoundingClientRect();d.classList.add('yay')}));
    const bd=$('bigDate');
    let n=0;bd.innerHTML=bd.textContent.trim().split('').map(c=>c===' '?'<span class="sp"> </span>':`<span class="ch" style="--i:${n++}">${c}</span>`).join('');
  }
  function start(){
    build();
    const party=$('party');party.classList.remove('pop');void party.offsetWidth;party.classList.add('pop');
  }
  function stop(){$('party').classList.remove('pop')}
  return{start,stop};
})();
