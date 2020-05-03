function _show_it(){
  let imgs = ['0.jpg','1,jpg','2,jpg','0,gif','1,gif','2.gif'];
  let count = imgs.length;
  let pic = imgs[Math.floor(Math.random() * count)];
  document.body.innerHTML=`<div align="center"><img src="https://cdn.jsdelivr.net/gh/evlon/cdn/kbimg/` + pic + `" alt=""></div>`;
}
if(document.body.innerText.match(/(舔|身下|哈利|斯内普|泛白)/g)){
  if((Math.random() * 3).toFixed(0) == '1'){
  _show_it();
  }
}
