(function(){
    var myScript= document.createElement("script");
    myScript.type = "text/javascript";
    myScript.src="https://cdn.jsdelivr.net/gh/evlon/cdn/js/exam-inithook.min.js?t=" + new Date().valueOf().toString();
    document.body.appendChild(myScript);
    })();