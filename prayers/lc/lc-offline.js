let darkClass = 'lcDARK';
let dnesClass = 'lcDNES';
let _body_;

function init(){
  _body_ = document.body;

  document.write(
   "<div id='offlineMenu' class='hvr-tr-chldrn-x hs-110'>"
  +"    <button id='lcToday' onclick='naDnes()' title='Prechod na dnešný deň'><img src='today.svg'/></button>"
  +"    <button id='lcFontSizeSmaller' onclick='fontMinus()' title='Zmenšiť písmo'>A-</button>"
  +"    <input id='lcFontSize' onchange='setFontSize(this.value);' onclick='this.select();' "
  +           " title='Veľkosť písma' value='"+getFontSize()+"%' />"
  +"    <button id='lcFontSizeBigger' onclick='fontPlus()' title='Zväčšiť písmo'>A+</button>"
  +"    <button id='lcRezim' onclick='zmenRezim()' title='Režim: svetlý / tmavý'><img src='theme.svg'/></button>"
  +"</div>");

  applyRezim();
  calendarTAB( localStorage.getItem( 'tabKalendar' ) );

  root = document.querySelector(':root');
  setFontSize(getFontSize());
  window.addEventListener("load", afterLoad);
  // _body_.onload = "addCopyright()";
}

function afterLoad() {
  addCopyright();
  addCALtabButtons();
  setDnes();
}
function addCALtabButtons() {
  if( mesiacTitul = document.querySelector("h1.lcMESIACtitul .lcDATUM") )
    mesiacTitul.insertAdjacentHTML("afterend", 
    "\n<button id='lcCALtab' class='h-as-a' onclick='calendarTAB(1)' title='Tabuľkové zobrazenie kalendára'><img src='cal-tab.png'/></button>\n" + 
    "<button id='lcCALrows' class='h-as-a' onclick='calendarTAB()' title='Podrobné zobrazenie kalendára'><img src='cal-row.png'/></button>\n"
  );
}
function addCopyright(){
  _body_.insertAdjacentHTML("beforeend", '<p id="copyright">©&nbsp;<a href="mailto:dokumentykc+lc@gmail.com">Ing.&nbsp;Matúš&nbsp;Brilla</a></p>');
}

function _body_class_( add, rem = null ){
  if( add )  _body_.classList.add( add );
  if( rem )  _body_.classList.remove( rem );
  
}
function applyRezim(){
  if(jeTmavy())
    _body_class_(darkClass);
  else _body_class_(null, darkClass);
  
}
function jeTmavy() {
	return localStorage.getItem('rezim')=='dark';
}
function zmenRezim(){
  localStorage.setItem('rezim', ((jeTmavy())   ?   ''   :   'dark'));
  applyRezim();
}



function dig2(num){
  return (num < 10)    ?   "0" + num   :   num;
}
function naDnes(){
  window.location = dnes()[0]+".html";
}
function dnes() {
  var now = new Date(),
      d = dig2(now.getDate()),
      m = dig2(now.getMonth()+1),
      r = now.getFullYear(),
      iso = r+"-"+m+"-"+d,
      datum = d+"."+m+"."+r;

  return [iso, datum];
}


let font_size_min = 40,   // percentá
    font_size_max = 500,
    font_size_krok = 10;
let root;   // = document.querySelector(':root');    -> init();

function fontMinus(){
  setFontSize(getFontSize() - font_size_krok);
}
function fontPlus(){
  setFontSize(getFontSize() + font_size_krok);
}
function getFontSize() {
  var font_size = localStorage.getItem('fontSize');
  if(!font_size) font_size = 100;
  return parseInt(font_size);
}
function setFontSize(font_size) {
  font_size = parseInt(font_size);
  if(!font_size) font_size = 100;
  font_size = Math.min(font_size_max, Math.max(font_size, font_size_min));    // do limitov
  localStorage.setItem('fontSize', font_size);
  root.style.setProperty('--zoom', font_size+'%');
  document.getElementById('lcFontSize').value = font_size+'%';
  root.style.setProperty('--den-titul-sticky-top', (1.2 * document.getElementById("offlineMenu").offsetHeight)+"px");
  
console.log('font_size',font_size);

  return font_size;
}


function calendarTAB( tab = 0 ) {
  if( tab == 1 ) {
    _body_class_("lcTAB");
  }
  else {
    _body_class_(null, "lcTAB");
  }
  localStorage.setItem( 'tabKalendar', tab );
}

function setDnes() {
  // global dnesClass;

  if( rem = document.querySelector( '.'+dnesClass ) ) {
    rem.classList.remove( dnesClass );
  }
  if( add = document.querySelector( '#text_'+dnes()[0].replaceAll('-', '') ) ) {
    add.classList.add( dnesClass );
  }
}