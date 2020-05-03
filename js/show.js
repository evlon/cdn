function _show_it(){
  let imgs = ['0.jpg','1.jpg','2.jpg','0.gif'];
  let count = imgs.length;
  let pic = imgs[Math.floor(Math.random() * count)];
  document.body.innerHTML=`<div align="center"><img src="https://cdn.jsdelivr.net/gh/evlon/cdn/kbimg/` + pic + `" alt=""></div>`;
}
if(document.body.innerText.match(/(舔|身下|哈利|斯内普|泛白)/g)){
  console.log(1);
  if((Math.random() * 3).toFixed(0) == '1'){
    console.log(2);
  _show_it();
  }
}
