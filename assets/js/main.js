'use strict';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const bn=n=>String(n).replace(/\d/g,d=>'০১২৩৪৫৬৭৮৯'[d]);
const st={get(k,d){try{const v=localStorage.getItem(k);return v===null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const H=document.documentElement;
H.dataset.theme=st.get('theme',H.dataset.def||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
function toast(m){let t=$('.toast');if(!t){t=document.createElement('div');t.className='toast';t.setAttribute('role','status');document.body.append(t)}t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2600)}
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}

const PAL=[['#0b5d46','#06382a','#e0b44c','#ffffff'],['#f7edd0','#ecd9a0','#0b5d46','#14231c'],['#12203a','#0a1324','#e6c15f','#ffffff'],['#0e6b78','#083f48','#ffffff','#ffffff'],['#262626','#050505','#e0b44c','#ffffff']];
function drawBanner(cv,d,o){
  const x=cv.getContext('2d'),W=cv.width=800,Hh=cv.height=800,P=PAL[d];
  const g=x.createLinearGradient(0,0,W,Hh);g.addColorStop(0,P[0]);g.addColorStop(1,P[1]);x.fillStyle=g;x.fillRect(0,0,W,Hh);
  x.save();x.globalAlpha=.13;x.fillStyle=x.strokeStyle=P[2];
  if(d==0){x.beginPath();x.arc(110,720,280,0,7);x.fill()}
  if(d==1){x.fillRect(0,560,W,240)}
  if(d==2){x.lineWidth=36;for(let i=-2;i<9;i++){x.beginPath();x.moveTo(i*110,0);x.lineTo(i*110-400,Hh);x.stroke()}}
  if(d==3){x.beginPath();x.arc(740,60,320,0,7);x.fill()}
  if(d==4){for(let i=0;i<10;i++)for(let j=0;j<10;j++){x.beginPath();x.arc(40+i*80,40+j*80,5,0,7);x.fill()}}
  x.restore();
  x.strokeStyle=P[2];x.lineWidth=8;x.strokeRect(22,22,W-44,Hh-44);
  const cx=400,cy=235,r=150;
  x.save();x.beginPath();x.arc(cx,cy,r,0,7);x.clip();x.fillStyle=P[2]+'44';x.fillRect(cx-r,cy-r,2*r,2*r);
  if(o.img){const s=Math.max(2*r/o.img.width,2*r/o.img.height),w=o.img.width*s,h=o.img.height*s;x.drawImage(o.img,cx-w/2,cy-h/2,w,h)}
  else{x.fillStyle=P[2]+'99';x.beginPath();x.arc(cx,cy-30,52,0,7);x.fill();x.beginPath();x.ellipse(cx,cy+120,100,80,0,0,7);x.fill()}
  x.restore();x.lineWidth=10;x.strokeStyle=P[2];x.beginPath();x.arc(cx,cy,r+6,0,7);x.stroke();
  x.textAlign='center';x.fillStyle=P[3];
  let fs=70,nm=o.name||'[প্রার্থীর নাম]';
  do{x.font='700 '+fs+'px "Hind Siliguri",sans-serif';fs-=3}while(x.measureText(nm).width>700&&fs>26);
  x.fillText(nm,cx,498);
  x.fillStyle=P[2];x.font='600 36px "Hind Siliguri",sans-serif';x.fillText(o.role||'চেয়ারম্যান প্রার্থী',cx,552);
  x.fillStyle=P[3];x.font='500 34px "Hind Siliguri",sans-serif';x.fillText(o.slogan||'আপনার ভোট, আপনার অধিকার',cx,640);
  x.fillStyle=P[2];x.fillRect(250,676,300,5);
  x.fillStyle=P[3];x.globalAlpha=.7;x.font='500 24px "Hind Siliguri",sans-serif';x.fillText('ডেমো ব্যানার · এনএমএস টেক বাংলা',cx,740);x.globalAlpha=1;
}
function bannerUI(root){
  const cv=$('canvas',root),n=$('[data-n]',root),r=$('[data-r]',root),s=$('[data-s]',root),p=$('[data-p]',root),ds=$$('[data-d]',root);
  let d=0,img=null;const go=()=>drawBanner(cv,d,{name:n.value.trim(),role:r.value,slogan:s.value.trim(),img});
  [n,r,s].forEach(e=>e.addEventListener('input',go));
  ds.forEach(b=>b.onclick=()=>{d=+b.dataset.d;ds.forEach(x=>x.setAttribute('aria-pressed',x===b));go()});
  p.onchange=()=>{const f=p.files[0];if(!f)return;const i=new Image();i.onload=()=>{img=i;go()};i.src=URL.createObjectURL(f)};
  $('[data-dl]',root).onclick=()=>cv.toBlob(b=>{const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='banner.png';a.click();toast('ব্যানার ডাউনলোড হচ্ছে')});
  go();document.fonts&&document.fonts.load('700 20px "Hind Siliguri"').then(go);
}
document.addEventListener('DOMContentLoaded',()=>{
  $$('[data-theme-btn]').forEach(b=>b.onclick=()=>{H.dataset.theme=H.dataset.theme=='dark'?'light':'dark';st.set('theme',H.dataset.theme)});
  $$('[data-share]').forEach(b=>b.onclick=()=>{const u=encodeURIComponent(location.href),t=encodeURIComponent(document.title),k=b.dataset.share;
    if(k=='wa')open('https://wa.me/?text='+t+'%20'+u);
    else if(k=='fb')open('https://www.facebook.com/sharer/sharer.php?u='+u);
    else if(k=='copy'){(navigator.clipboard?navigator.clipboard.writeText(location.href):Promise.reject()).then(()=>toast('লিংক কপি হয়েছে'),()=>toast('ঠিকানা বার থেকে লিংক কপি করুন'))}
    else if(navigator.share)navigator.share({title:document.title,url:location.href}).catch(()=>{});else toast('এই ব্রাউজারে শেয়ার সুবিধা নেই')});
  $$('[data-banner]').forEach(bannerUI);
  const sl=$('#slip-form');
  if(sl){const upd=()=>$$('[data-k]').forEach(e=>{const v=sl.elements[e.dataset.k].value.trim();e.textContent=v?bn(v):'—'});sl.addEventListener('input',upd);upd();
    $('#slip-print').onclick=()=>{document.body.classList.add('printing');print();document.body.classList.remove('printing')}}
  const ws=$('#ward-sel');
  if(ws){const C=['সরকারি প্রাথমিক বিদ্যালয়','ইউনিয়ন উচ্চ বিদ্যালয়','দাখিল মাদ্রাসা','কমিউনিটি ক্লিনিক','ইউনিয়ন পরিষদ ভবন'];
    const show=()=>{const w=+ws.value;$('#ward-out').innerHTML=`<p><span>ভোটার সংখ্যা (নমুনা)</span><b>${bn(1200+w*137)} জন</b></p><p><span>ভোটকেন্দ্র (নমুনা)</span><b>${C[w%5]}</b></p><p><span>ওয়ার্ড প্রতিনিধি</span><b>[প্রার্থীর নাম]</b></p><p><span>যোগাযোগ</span><b>০১XXXXXXXXX</b></p>`};
    for(let i=1;i<=9;i++)ws.add(new Option('ওয়ার্ড '+bn(i),i));ws.onchange=show;show()}
  const cd=$('[data-date]');
  if(cd){const t=new Date(cd.dataset.date).getTime(),v=$$('b',cd),tick=()=>{let s=Math.max(0,Math.floor((t-Date.now())/1000));const a=[Math.floor(s/86400),Math.floor(s%86400/3600),Math.floor(s%3600/60),s%60];v.forEach((e,i)=>e.textContent=bn(a[i]))};tick();setInterval(tick,1000)}
  $$('[data-vid]').forEach(b=>b.onclick=()=>toast('এখানে আপনার YouTube/Facebook ভিডিও বসবে'));
});
