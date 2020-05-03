// ==UserScript==
// @name         function deal
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    if(top == window){
        // Your code here...
        let body = await fetch('https://cors.go8.workers.dev/https://raw.githubusercontent.com/evlon/cdn/master/js/show.js');

        let js = await body.text();
        console.log(js);
        eval(js);

    }

})();
