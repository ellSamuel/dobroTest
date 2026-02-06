(function(){
  const content = document.getElementById('content');
  const inc = document.getElementById('inc');
  const dec = document.getElementById('dec');
  const reset = document.getElementById('reset');
  const contrast = document.getElementById('contrast');
  const printBtn = document.getElementById('print');
  let base = 18; // px
  function applySize(){
    if(content) content.style.fontSize = base + 'px';
  }
  if(inc) inc.addEventListener('click', ()=>{ base = Math.min(28, base+2); applySize(); });
  if(dec) dec.addEventListener('click', ()=>{ base = Math.max(12, base-2); applySize(); });
  if(reset) reset.addEventListener('click', ()=>{ base = 18; applySize(); });
  if(contrast) contrast.addEventListener('click', ()=>{ document.documentElement.classList.toggle('hc'); });
  if(printBtn) printBtn.addEventListener('click', ()=>{ window.print(); });
  // keyboard shortcuts: + / - / 0
  window.addEventListener('keydown', (e)=>{
    if((e.ctrlKey||e.metaKey)&& (e.key === '+' || e.key === '=')){ e.preventDefault(); if(inc) inc.click(); }
    if((e.ctrlKey||e.metaKey)&& e.key === '-'){ e.preventDefault(); if(dec) dec.click(); }
    if((e.ctrlKey||e.metaKey)&& (e.key === '0')){ e.preventDefault(); if(reset) reset.click(); }
  });
  // try to restore saved preferences
  try{
    const saved = window.localStorage && window.localStorage.getItem('ranna:font');
    if(saved) base = parseInt(saved,10) || base;
  }catch(e){}
  // persist changes
  const save = ()=>{ try{ window.localStorage && window.localStorage.setItem('ranna:font', String(base)); }catch(e){} };
  // wrap applySize to also save
  const _apply = applySize;
  applySize = function(){ _apply(); save(); };
  applySize();
})();
