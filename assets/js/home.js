document.addEventListener('DOMContentLoaded',()=>{
  const g=$('#wk-grid');const total=Math.max(12,WORKS.length+(WORKS.length%3?3-WORKS.length%3:0));
  for(let i=0;i<total;i++){const w=WORKS[i];
    if(w){const a=el('a','card wk');a.href=w.url;a.target='_blank';a.rel='noopener';
      a.append(el('small','',w.role+(w.pkg?' · '+w.pkg:'')),el('h3','',w.name),el('small','',w.place),el('b','','সাইট দেখুন ↗'));g.append(a)}
    else{const d=el('div','card wk e');d.append(el('b','','শীঘ্রই আসছে'),el('small','','নতুন কাজ এখানে যুক্ত হবে'));g.append(d)}}
});
