document.addEventListener('DOMContentLoaded',()=>{
  $$('select.wards').forEach(s=>{for(let i=1;i<=9;i++)s.add(new Option('ওয়ার্ড '+bn(i),i))});
  const vf=$('#vl-f');for(let i=1;i<=9;i++)vf.add(new Option('ওয়ার্ড '+bn(i),i));
  /* অ্যাডমিন প্যানেল */
  const nm=$('#hero-name'),it=$('#hero-intro'),ph=$('#hero-photo'),a1=$('#ad-1'),a2=$('#ad-2'),a3=$('#ad-3');
  const S0=st.get('pr_site',null);if(S0){if(S0.n)nm.textContent=S0.n;if(S0.i)it.textContent=S0.i}
  $('#ad-send').onclick=()=>{if(!/^\S+@\S+\.\S+$/.test($('#ad-mail').value.trim()))return toast('সঠিক Gmail ঠিকানা লিখুন');a1.hidden=true;a2.hidden=false;toast('ডেমো OTP: ১২৩৪৫৬')};
  $('#ad-ok').onclick=()=>{if($('#ad-otp').value.trim()!=='123456')return toast('OTP মেলেনি। ডেমো OTP: 123456');a2.hidden=true;a3.hidden=false;$('#ad-title').value=nm.textContent;$('#ad-intro').value=it.textContent};
  $('#ad-title').oninput=e=>nm.textContent=e.target.value||'[প্রার্থীর নাম]';
  $('#ad-intro').oninput=e=>it.textContent=e.target.value;
  $('#ad-ph').onchange=e=>{const f=e.target.files[0];if(f)ph.style.background='url('+URL.createObjectURL(f)+') center/cover'};
  $('#ad-save').onclick=()=>{st.set('pr_site',{n:nm.textContent,i:it.textContent});toast('সংরক্ষণ হয়েছে')};
  $('#ad-out').onclick=()=>{a3.hidden=true;a1.hidden=false;toast('লগআউট হয়েছে')};
  /* সমস্যা ট্র্যাকার */
  const SS=['নতুন','চলছে','সমাধান হয়েছে'];
  let T=st.get('pr_t',[{n:1,w:3,t:'রাস্তার বাতি নষ্ট (নমুনা)',s:0},{n:2,w:5,t:'নলকূপ মেরামত দরকার (নমুনা)',s:1}]);
  const rt=()=>{const l=$('#tr-list');l.replaceChildren();T.forEach(x=>{const c=el('div','card it');c.append(el('b','','সমস্যা #'+bn(String(x.n).padStart(3,'0'))),el('span','','ওয়ার্ড '+bn(x.w)),el('p','',x.t));
    const s=document.createElement('select');s.setAttribute('aria-label','স্ট্যাটাস');SS.forEach((v,k)=>s.add(new Option(v,k)));s.value=x.s;s.onchange=()=>{x.s=+s.value;st.set('pr_t',T);toast('স্ট্যাটাস: '+SS[x.s])};c.append(s);l.append(c)})};
  $('#tr-form').onsubmit=e=>{e.preventDefault();const t=$('#tr-t').value.trim();if(!t)return;T.push({n:Math.max(0,...T.map(x=>x.n))+1,w:+$('#tr-w').value,t,s:0});st.set('pr_t',T);$('#tr-t').value='';rt();toast('সমস্যা নথিভুক্ত হয়েছে')};rt();
  /* স্বেচ্ছাসেবক */
  let V=st.get('pr_v',[{n:'[স্বেচ্ছাসেবকের নাম]',p:'০১XXXXXXXXX',w:1},{n:'[স্বেচ্ছাসেবকের নাম]',p:'০১XXXXXXXXX',w:3}]);
  const rv=()=>{const l=$('#vl-list');l.replaceChildren();const f=+vf.value;const a=V.filter(x=>!f||x.w===f);
    if(!a.length)l.append(el('p','','এই ওয়ার্ডে এখনও কেউ নেই। উপরের ফর্ম থেকে যোগ করুন।'));
    a.forEach(x=>{const r=el('div','vi'),d=el('div');d.append(el('b','',x.n),el('small','','ওয়ার্ড '+bn(x.w)+' · '+x.p));const b=el('button','btn o s','মুছুন');b.onclick=()=>{V=V.filter(y=>y!==x);st.set('pr_v',V);rv()};r.append(d,b);l.append(r)})};
  $('#vl-form').onsubmit=e=>{e.preventDefault();V.push({n:$('#vl-n').value.trim(),p:$('#vl-p').value.trim(),w:+$('#vl-w').value});st.set('pr_v',V);e.target.reset();rv();toast('স্বেচ্ছাসেবক যোগ হয়েছে')};vf.onchange=rv;rv();
  /* চ্যাটবট */
  const box=$('#cbox'),cl=$('#cl'),KB=[[/কেন্দ্র|কোথায়/,'আপনার ভোটকেন্দ্র ভোটার স্লিপে লেখা থাকে। "ওয়ার্ড" অংশে ওয়ার্ড বেছে কেন্দ্রের নাম দেখুন।'],[/স্লিপ/,'"ভোটার স্লিপ" অংশে নাম ও ভোটার নম্বর লিখলে স্লিপ তৈরি হবে, সেখান থেকে প্রিন্ট করুন।'],[/তারিখ|কবে|সময়|কাউন্টডাউন/,'ভোটের দিন ও সময় "কাউন্টডাউন" অংশে দেখতে পাবেন (ডেমোতে নমুনা তারিখ)।'],[/সমস্যা|অভিযোগ|রাস্তা|বাতি/,'"সমস্যা ট্র্যাকার" অংশে সমস্যা লিখলে একটি নম্বর পাবেন, স্ট্যাটাস সেখানেই দেখা যাবে।'],[/যোগাযোগ|ফোন|নম্বর|কল/,'নিচের "যোগাযোগ" অংশে কল ও WhatsApp বাটন আছে।'],[/স্বেচ্ছাসেবক|ভলান্টিয়ার/,'"স্বেচ্ছাসেবক" অংশে নাম, মোবাইল ও ওয়ার্ড দিয়ে যোগ দিন।']];
  const say=(t,u)=>{cl.append(el('p',u?'u':'',t));cl.scrollTop=cl.scrollHeight};
  const ask=q=>{say(q,1);const h=KB.find(k=>k[0].test(q));setTimeout(()=>say(h?h[1]:'দুঃখিত, বুঝতে পারিনি। নিচের বাটন থেকে বেছে নিন বা যোগাযোগ অংশে কল করুন।'),300)};
  ['ভোটকেন্দ্র কোথায়?','ভোটার স্লিপ কীভাবে পাব?','ভোট কবে?','সমস্যা জানাতে চাই'].forEach(q=>{const b=el('button','',q);b.onclick=()=>ask(q);$('#cq').append(b)});
  $('#cb').onclick=()=>{box.hidden=!box.hidden;if(!cl.children.length)say('আসসালামু আলাইকুম! ভোট সংক্রান্ত কী জানতে চান?')};
  $('#cx').onclick=()=>box.hidden=true;
  $('#cf').onsubmit=e=>{e.preventDefault();const q=$('#ci').value.trim();if(q){ask(q);$('#ci').value=''}};
  /* ইনস্টল */
  let dp=null;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
  $('#install').onclick=()=>{if(dp){dp.prompt();dp=null}else toast('ব্রাউজার মেনু থেকে "Add to Home screen" বেছে নিন')};
  if('serviceWorker' in navigator)navigator.serviceWorker.register('sw.js').catch(()=>{});
});
