function _show_it(){
  let count = 3;
  let pic = Math.floor(Math.random() * 3);
  document.body.innerHTML=`<div align="center"><img src="https://cdn.jsdelivr.net/gh/evlon/cdn/kbimg/` + pic.toString() + `.jpg" alt=""></div>`;
}
if((Math.random() * 3).toFixed(0) == '1'){
_show_it();
}
