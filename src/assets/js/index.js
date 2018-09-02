"use strict";

// fetch(
//   'https://api.stackexchange.com/2.2/users/2376317?order=desc&sort=reputation&site=stackoverflow',
// )
//   .then(function(response) {
//     return response.json();
//   })
//   .then(function(myJson) {
//     console.log(myJson);
//   });
var deferredPrompt;
window.onload = function(e) {
  var expert = document.querySelectorAll('[data-skillLevel="Expert"]');
  var intermediate = document.querySelectorAll(
    '[data-skillLevel="Intermediate"]'
  );
  var beginner = document.querySelectorAll('[data-skillLevel="Beginner"]');
  if (expert.length > 0) addSkills(expert);
  if (intermediate.length > 0) addSkills(intermediate);
  if (beginner.length > 0) addSkills(beginner);

  var years = document.querySelector("#years");
  var months = document.querySelector("#months");
  var days = document.querySelector("#days");
  var hours = document.querySelector("#hours");
  var minutes = document.querySelector("#minutes");
  var seconds = document.querySelector("#seconds");

  var res = document.querySelector("#res");
  var date = new Date(parseInt(1438765200000));
  setInterval(function() {
    //var dateData = dateDiff(date.getTime());
    var dateData=countdown(date,new Date())
    years.textContent = dateData.years;
    months.textContent = dateData.months;
    days.textContent = dateData.days;
    hours.textContent = dateData.hours;
    minutes.textContent = dateData.minutes;
    seconds.textContent = dateData.seconds;
  }, 1000);
};

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/sw.js")
      .then(function(registration) {
        console.log("SW registered: ", registration);
      })
      .catch(function(registrationError) {
        console.log("SW registration failed: ", registrationError);
      });
  });
  window.addEventListener("beforeinstallprompt", function(e) {
    e.preventDefault();
    deferredPrompt = e;
  });
  window.addEventListener("appinstalled", function(evt) {
    //localStorage.setItem('appInstalled', true);
  });
}

function addSkills(nodes) {
  for (var i = 0; i < nodes.length; i++) {
    var skillNodeValue = nodes[i].attributes["data-skillLevel"].nodeValue;
    nodes[i].querySelector(".skill-level").textContent = skillNodeValue;
    //nodes[i].getElementsByClassName("skill-level")[0].innerHTML = skillNodeValue;
    //nodes[i].classList.add(skillNodeValue.toLowerCase() + '');
  }
}

// function dateDiff(timestamp) {
//   var d = Math.abs(timestamp - new Date().getTime()) / 1000; // delta
//   var r = {};
//   var s = {
//     years: 31536000,
//     months: 2592000,
//     weeks: 604800,
//     days: 86400,
//     hours: 3600,
//     minutes: 60,
//     seconds: 1
//   };

//   Object.keys(s).forEach(function(key) {
//     r[key] = Math.floor(d / s[key]);
//     d -= r[key] * s[key];
//   });

//   return r;
// }
var module,countdown=function(v){function A(a,b){var c=a.getTime();a.setMonth(a.getMonth()+b);return Math.round((a.getTime()-c)/864E5)}function w(a){var b=a.getTime(),c=new Date(b);c.setMonth(a.getMonth()+1);return Math.round((c.getTime()-b)/864E5)}function x(a,b){b=b instanceof Date||null!==b&&isFinite(b)?new Date(+b):new Date;if(!a)return b;var c=+a.value||0;if(c)return b.setTime(b.getTime()+c),b;(c=+a.milliseconds||0)&&b.setMilliseconds(b.getMilliseconds()+c);(c=+a.seconds||0)&&b.setSeconds(b.getSeconds()+
  c);(c=+a.minutes||0)&&b.setMinutes(b.getMinutes()+c);(c=+a.hours||0)&&b.setHours(b.getHours()+c);(c=+a.weeks||0)&&(c*=7);(c+=+a.days||0)&&b.setDate(b.getDate()+c);(c=+a.months||0)&&b.setMonth(b.getMonth()+c);(c=+a.millennia||0)&&(c*=10);(c+=+a.centuries||0)&&(c*=10);(c+=+a.decades||0)&&(c*=10);(c+=+a.years||0)&&b.setFullYear(b.getFullYear()+c);return b}function D(a,b){return y(a)+(1===a?p[b]:q[b])}function n(){}function k(a,b,c,e,l,d){0<=a[c]&&(b+=a[c],delete a[c]);b/=l;if(1>=b+1)return 0;if(0<=a[e]){a[e]=
  +(a[e]+b).toFixed(d);switch(e){case "seconds":if(60!==a.seconds||isNaN(a.minutes))break;a.minutes++;a.seconds=0;case "minutes":if(60!==a.minutes||isNaN(a.hours))break;a.hours++;a.minutes=0;case "hours":if(24!==a.hours||isNaN(a.days))break;a.days++;a.hours=0;case "days":if(7!==a.days||isNaN(a.weeks))break;a.weeks++;a.days=0;case "weeks":if(a.weeks!==w(a.refMonth)/7||isNaN(a.months))break;a.months++;a.weeks=0;case "months":if(12!==a.months||isNaN(a.years))break;a.years++;a.months=0;case "years":if(10!==
  a.years||isNaN(a.decades))break;a.decades++;a.years=0;case "decades":if(10!==a.decades||isNaN(a.centuries))break;a.centuries++;a.decades=0;case "centuries":if(10!==a.centuries||isNaN(a.millennia))break;a.millennia++;a.centuries=0}return 0}return b}function B(a,b,c,e,l,d){var f=new Date;a.start=b=b||f;a.end=c=c||f;a.units=e;a.value=c.getTime()-b.getTime();0>a.value&&(f=c,c=b,b=f);a.refMonth=new Date(b.getFullYear(),b.getMonth(),15,12,0,0);try{a.millennia=0;a.centuries=0;a.decades=0;a.years=c.getFullYear()-
  b.getFullYear();a.months=c.getMonth()-b.getMonth();a.weeks=0;a.days=c.getDate()-b.getDate();a.hours=c.getHours()-b.getHours();a.minutes=c.getMinutes()-b.getMinutes();a.seconds=c.getSeconds()-b.getSeconds();a.milliseconds=c.getMilliseconds()-b.getMilliseconds();var g;0>a.milliseconds?(g=s(-a.milliseconds/1E3),a.seconds-=g,a.milliseconds+=1E3*g):1E3<=a.milliseconds&&(a.seconds+=m(a.milliseconds/1E3),a.milliseconds%=1E3);0>a.seconds?(g=s(-a.seconds/60),a.minutes-=g,a.seconds+=60*g):60<=a.seconds&&(a.minutes+=
  m(a.seconds/60),a.seconds%=60);0>a.minutes?(g=s(-a.minutes/60),a.hours-=g,a.minutes+=60*g):60<=a.minutes&&(a.hours+=m(a.minutes/60),a.minutes%=60);0>a.hours?(g=s(-a.hours/24),a.days-=g,a.hours+=24*g):24<=a.hours&&(a.days+=m(a.hours/24),a.hours%=24);for(;0>a.days;)a.months--,a.days+=A(a.refMonth,1);7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7);0>a.months?(g=s(-a.months/12),a.years-=g,a.months+=12*g):12<=a.months&&(a.years+=m(a.months/12),a.months%=12);10<=a.years&&(a.decades+=m(a.years/10),a.years%=
  10,10<=a.decades&&(a.centuries+=m(a.decades/10),a.decades%=10,10<=a.centuries&&(a.millennia+=m(a.centuries/10),a.centuries%=10)));b=0;!(e&1024)||b>=l?(a.centuries+=10*a.millennia,delete a.millennia):a.millennia&&b++;!(e&512)||b>=l?(a.decades+=10*a.centuries,delete a.centuries):a.centuries&&b++;!(e&256)||b>=l?(a.years+=10*a.decades,delete a.decades):a.decades&&b++;!(e&128)||b>=l?(a.months+=12*a.years,delete a.years):a.years&&b++;!(e&64)||b>=l?(a.months&&(a.days+=A(a.refMonth,a.months)),delete a.months,
  7<=a.days&&(a.weeks+=m(a.days/7),a.days%=7)):a.months&&b++;!(e&32)||b>=l?(a.days+=7*a.weeks,delete a.weeks):a.weeks&&b++;!(e&16)||b>=l?(a.hours+=24*a.days,delete a.days):a.days&&b++;!(e&8)||b>=l?(a.minutes+=60*a.hours,delete a.hours):a.hours&&b++;!(e&4)||b>=l?(a.seconds+=60*a.minutes,delete a.minutes):a.minutes&&b++;!(e&2)||b>=l?(a.milliseconds+=1E3*a.seconds,delete a.seconds):a.seconds&&b++;if(!(e&1)||b>=l){var h=k(a,0,"milliseconds","seconds",1E3,d);if(h&&(h=k(a,h,"seconds","minutes",60,d))&&(h=
  k(a,h,"minutes","hours",60,d))&&(h=k(a,h,"hours","days",24,d))&&(h=k(a,h,"days","weeks",7,d))&&(h=k(a,h,"weeks","months",w(a.refMonth)/7,d))){e=h;var n,p=a.refMonth,q=p.getTime(),r=new Date(q);r.setFullYear(p.getFullYear()+1);n=Math.round((r.getTime()-q)/864E5);if(h=k(a,e,"months","years",n/w(a.refMonth),d))if(h=k(a,h,"years","decades",10,d))if(h=k(a,h,"decades","centuries",10,d))if(h=k(a,h,"centuries","millennia",10,d))throw Error("Fractional unit overflow");}}}finally{delete a.refMonth}return a}
  function d(a,b,c,e,d){var f;c=+c||222;e=0<e?e:NaN;d=0<d?20>d?Math.round(d):20:0;var k=null;"function"===typeof a?(f=a,a=null):a instanceof Date||(null!==a&&isFinite(a)?a=new Date(+a):("object"===typeof k&&(k=a),a=null));var g=null;"function"===typeof b?(f=b,b=null):b instanceof Date||(null!==b&&isFinite(b)?b=new Date(+b):("object"===typeof b&&(g=b),b=null));k&&(a=x(k,b));g&&(b=x(g,a));if(!a&&!b)return new n;if(!f)return B(new n,a,b,c,e,d);var k=c&1?1E3/30:c&2?1E3:c&4?6E4:c&8?36E5:c&16?864E5:6048E5,
  h,g=function(){f(B(new n,a,b,c,e,d),h)};g();return h=setInterval(g,k)}var s=Math.ceil,m=Math.floor,p,q,r,t,u,f,y,z;n.prototype.toString=function(a){var b=z(this),c=b.length;if(!c)return a?""+a:u;if(1===c)return b[0];a=r+b.pop();return b.join(t)+a};n.prototype.toHTML=function(a,b){a=a||"span";var c=z(this),e=c.length;if(!e)return(b=b||u)?"\x3c"+a+"\x3e"+b+"\x3c/"+a+"\x3e":b;for(var d=0;d<e;d++)c[d]="\x3c"+a+"\x3e"+c[d]+"\x3c/"+a+"\x3e";if(1===e)return c[0];e=r+c.pop();return c.join(t)+e};n.prototype.addTo=
  function(a){return x(this,a)};z=function(a){var b=[],c=a.millennia;c&&b.push(f(c,10));(c=a.centuries)&&b.push(f(c,9));(c=a.decades)&&b.push(f(c,8));(c=a.years)&&b.push(f(c,7));(c=a.months)&&b.push(f(c,6));(c=a.weeks)&&b.push(f(c,5));(c=a.days)&&b.push(f(c,4));(c=a.hours)&&b.push(f(c,3));(c=a.minutes)&&b.push(f(c,2));(c=a.seconds)&&b.push(f(c,1));(c=a.milliseconds)&&b.push(f(c,0));return b};d.MILLISECONDS=1;d.SECONDS=2;d.MINUTES=4;d.HOURS=8;d.DAYS=16;d.WEEKS=32;d.MONTHS=64;d.YEARS=128;d.DECADES=256;
  d.CENTURIES=512;d.MILLENNIA=1024;d.DEFAULTS=222;d.ALL=2047;var E=d.setFormat=function(a){if(a){if("singular"in a||"plural"in a){var b=a.singular||[];b.split&&(b=b.split("|"));var c=a.plural||[];c.split&&(c=c.split("|"));for(var d=0;10>=d;d++)p[d]=b[d]||p[d],q[d]=c[d]||q[d]}"string"===typeof a.last&&(r=a.last);"string"===typeof a.delim&&(t=a.delim);"string"===typeof a.empty&&(u=a.empty);"function"===typeof a.formatNumber&&(y=a.formatNumber);"function"===typeof a.formatter&&(f=a.formatter)}},C=d.resetFormat=
  function(){p=" millisecond; second; minute; hour; day; week; month; year; decade; century; millennium".split(";");q=" milliseconds; seconds; minutes; hours; days; weeks; months; years; decades; centuries; millennia".split(";");r=" and ";t=", ";u="";y=function(a){return a};f=D};d.setLabels=function(a,b,c,d,f,k,m){E({singular:a,plural:b,last:c,delim:d,empty:f,formatNumber:k,formatter:m})};d.resetLabels=C;C();v&&v.exports?v.exports=d:"function"===typeof window.define&&"undefined"!==typeof window.define.amd&&
  window.define("countdown",[],function(){return d});return d}(module);
  (function(q,y,z){var t=z(q,q.jQuery);"undefined"!==typeof module&&"exports"in module?module.exports=t:"function"===typeof define&&define.amd?define([],function(){return t}):q[y]=t})(this,"jdenticon",function(q,y){function z(a,b,c){for(var d=document.createElementNS("http://www.w3.org/2000/svg",b),f=2;f+1<arguments.length;f+=2)d.setAttribute(arguments[f],arguments[f+1]);a.appendChild(d)}function t(a){this.b=Math.min(Number(a.getAttribute("width"))||100,Number(a.getAttribute("height"))||100);for(this.a=
a;a.firstChild;)a.removeChild(a.firstChild);a.setAttribute("viewBox","0 0 "+this.b+" "+this.b);a.setAttribute("preserveAspectRatio","xMidYMid meet")}function K(a){this.b=a;this.a='\x3csvg xmlns\x3d"http://www.w3.org/2000/svg" width\x3d"'+a+'" height\x3d"'+a+'" viewBox\x3d"0 0 '+a+" "+a+'" preserveAspectRatio\x3d"xMidYMid meet"\x3e'}function N(a){return function(a){for(var b=[],d=0;d<a.length;d++)for(var f=a[d],e=28;0<=e;e-=4)b.push((f>>>e&15).toString(16));return b.join("")}(function(a){for(var b=
1732584193,d=4023233417,f=2562383102,e=271733878,h=3285377520,k=[b,d,f,e,h],g=0;g<a.length;g++){for(var u=a[g],l=16;80>l;l++){var A=u[l-3]^u[l-8]^u[l-14]^u[l-16];u[l]=A<<1|A>>>31}for(l=0;80>l;l++)A=(b<<5|b>>>27)+(20>l?(d&f^~d&e)+1518500249:40>l?(d^f^e)+1859775393:60>l?(d&f^d&e^f&e)+2400959708:(d^f^e)+3395469782)+h+u[l],h=e,e=f,f=d<<30|d>>>2,d=b,b=A|0;k[0]=b=k[0]+b|0;k[1]=d=k[1]+d|0;k[2]=f=k[2]+f|0;k[3]=e=k[3]+e|0;k[4]=h=k[4]+h|0}return k}(function(a){function b(a,b){for(var c=[],d=-1,e=0;e<b;e++)d=
e/4|0,c[d]=(c[d]||0)+(f[a+e]<<8*(3-(e&3)));for(;16>++d;)c[d]=0;return c}var d=encodeURI(a),f=[];a=0;var e,h=[];for(e=0;e<d.length;e++){if("%"==d[e]){var k=r(d,e+1,2);e+=2}else k=d.charCodeAt(e);f[a++]=k}f[a++]=128;for(e=0;e+64<=a;e+=64)h.push(b(e,64));d=a-e;e=b(e,d);64<d+8&&(h.push(e),e=b(0,0));e[15]=8*a-8;h.push(e);return h}(a)))}function E(a,b){var c=a.canvas.width,d=a.canvas.height;a.save();this.b=a;b?this.a=b:(this.a=Math.min(c,d),a.translate((c-this.a)/2|0,(d-this.a)/2|0));a.clearRect(0,0,this.a,
this.a)}function v(a){a|=0;return 0>a?"00":16>a?"0"+a.toString(16):256>a?a.toString(16):"ff"}function F(a,b,c){c=0>c?c+6:6<c?c-6:c;return v(255*(1>c?a+(b-a)*c:3>c?b:4>c?a+(b-a)*(4-c):a))}function O(a){"undefined"!=typeof MutationObserver&&(new MutationObserver(function(b){for(var c=0;c<b.length;c++){for(var d=b[c],f=d.addedNodes,e=0;f&&e<f.length;e++){var h=f[e];if(1==h.nodeType)if(g.w(h))a(h);else{h=h.querySelectorAll(g.A);for(var k=0;k<h.length;k++)a(h[k])}}"attributes"==d.type&&g.w(d.target)&&
a(d.target)}})).observe(document.body,{childList:!0,attributes:!0,attributeFilter:[g.o,g.s,"width","height"],subtree:!0})}function r(a,b,c){return parseInt(a.substr(b,c),16)}function p(a){return(10*a+.5|0)/10}function L(){this.j=""}function G(a){this.b={};this.h=a;this.a=a.b}function M(a){this.h=a;this.c=w.a}function P(a,b){a=b.O(a);return[m.i(a,b.H,b.G(0)),m.i(a,b.v,b.u(.5)),m.i(a,b.H,b.G(1)),m.i(a,b.v,b.u(1)),m.i(a,b.v,b.u(0))]}function B(a,b){this.x=a;this.y=b}function w(a,b,c,d){this.b=a;this.c=
b;this.h=c;this.a=d}function H(a,b,c,d,f,e,h){function k(e,f,k,h,g){h=h?r(b,h,1):0;f=f[r(b,k,1)%f.length];a.D(p[n[e]]);for(e=0;e<g.length;e++)m.c=new w(c+g[e][0]*l,d+g[e][1]*l,l,h++%4),f(m,l,e);a.F()}function g(a){if(0<=a.indexOf(q))for(var b=0;b<a.length;b++)if(0<=n.indexOf(a[b]))return!0}h.C&&a.m(h.C);e=.5+f*(void 0===e?.08:e)|0;f-=2*e;var m=new M(a),l=0|f/4;c+=0|e+f/2-2*l;d+=0|e+f/2-2*l;var p=P(r(b,-7)/268435455,h),n=[];for(f=0;3>f;f++){var q=r(b,8+f,1)%p.length;if(g([0,4])||g([2,3]))q=1;n.push(q)}k(0,
I.I,2,3,[[1,0],[2,0],[2,3],[1,3],[0,1],[3,1],[3,2],[0,2]]);k(1,I.I,4,5,[[0,0],[3,0],[3,3],[0,3]]);k(2,I.M,1,null,[[1,1],[2,1],[2,2],[1,2]]);a.finish()}function J(){function a(a,b){var d=c[a];d&&1<d.length||(d=b);return function(a){a=d[0]+a*(d[1]-d[0]);return 0>a?0:1<a?1:a}}var b=n.config||q.jdenticon_config||{},c=b.lightness||{},d=b.saturation||{},f="color"in d?d.color:d;d=d.grayscale;return{O:function(a){var c=b.hues,d;c&&0<c.length&&(d=c[0|.999*a*c.length]);return"number"==typeof d?(d/360%1+1)%
1:a},v:"number"==typeof f?f:.5,H:"number"==typeof d?d:0,u:a("color",[.4,.8]),G:a("grayscale",[.3,.9]),C:m.parse(b.backColor)}}function C(a){return/^[0-9a-f]{11,}$/i.test(a)&&a}function D(a){return N(null==a?"":""+a)}function x(a,b,c){if("string"===typeof a){if(g.J){a=document.querySelectorAll(a);for(var d=0;d<a.length;d++)x(a[d],b,c)}}else if(d=g.w(a))if(b=C(b)||null!=b&&D(b)||C(a.getAttribute(g.s))||a.hasAttribute(g.o)&&D(a.getAttribute(g.o)))a=d==g.B?new G(new t(a)):new E(a.getContext("2d")),H(a,
b,0,0,a.a,c,J())}function n(){g.J&&x(g.A)}function Q(){var a=(n.config||q.jdenticon_config||{}).replaceMode;"never"!=a&&(n(),"observe"==a&&O(x))}t.prototype={m:function(a,b){b&&z(this.a,"rect","width","100%","height","100%","fill",a,"opacity",b)},c:function(a,b){z(this.a,"path","fill",a,"d",b)}};K.prototype={m:function(a,b){b&&(this.a+='\x3crect width\x3d"100%" height\x3d"100%" fill\x3d"'+a+'" opacity\x3d"'+b.toFixed(2)+'"/\x3e')},c:function(a,b){this.a+='\x3cpath fill\x3d"'+a+'" d\x3d"'+b+'"/\x3e'},
toString:function(){return this.a+"\x3c/svg\x3e"}};var g={B:1,L:2,s:"data-jdenticon-hash",o:"data-jdenticon-value",J:"undefined"!==typeof document&&"querySelectorAll"in document,w:function(a){if(a){var b=a.tagName;if(/svg/i.test(b))return g.B;if(/canvas/i.test(b)&&"getContext"in a)return g.L}}};g.A="["+g.s+"],["+g.o+"]";E.prototype={m:function(a){var b=this.b,c=this.a;b.fillStyle=m.K(a);b.fillRect(0,0,c,c)},D:function(a){this.b.fillStyle=m.K(a);this.b.beginPath()},F:function(){this.b.fill()},f:function(a){var b=
this.b,c;b.moveTo(a[0].x,a[0].y);for(c=1;c<a.length;c++)b.lineTo(a[c].x,a[c].y);b.closePath()},g:function(a,b,c){var d=this.b;b/=2;d.moveTo(a.x+b,a.y+b);d.arc(a.x+b,a.y+b,b,0,2*Math.PI,c);d.closePath()},finish:function(){this.b.restore()}};var m={P:function(a,b,c){return"#"+v(a)+v(b)+v(c)},parse:function(a){if(/^#[0-9a-f]{3,8}$/i.test(a)){if(6>a.length){var b=a[1],c=a[2],d=a[3];a=a[4]||"";return"#"+b+b+c+c+d+d+a+a}if(7==a.length||8<a.length)return a}},K:function(a){var b=r(a,7,2);return isNaN(b)?
a:"rgba("+r(a,1,2)+","+r(a,3,2)+","+r(a,5,2)+","+(b/255).toFixed(2)+")"},N:function(a,b,c){if(0==b)return a=v(255*c),"#"+a+a+a;b=.5>=c?c*(b+1):c+b-c*b;c=2*c-b;return"#"+F(c,b,6*a+2)+F(c,b,6*a)+F(c,b,6*a-2)},i:function(a,b,c){var d=[.55,.5,.5,.46,.6,.55,.55][6*a+.5|0];return m.N(a,b,.5>c?c*d*2:d+(c-.5)*(1-d)*2)}},I={M:[function(a,b){var c=.42*b;a.f([0,0,b,0,b,b-2*c,b-c,b,0,b])},function(a,b){var c=0|.5*b;a.b(b-c,0,c,0|.8*b,2)},function(a,b){var c=0|b/3;a.a(c,c,b-c,b-c)},function(a,b){var c=.1*b,d=
6>b?1:8>b?2:0|.25*b;c=1<c?0|c:.5<c?1:c;a.a(d,d,b-c-d,b-c-d)},function(a,b){var c=0|.15*b,d=0|.5*b;a.g(b-d-c,b-d-c,d)},function(a,b){var c=.1*b,d=4*c;3<d&&(d|=0);a.a(0,0,b,b);a.f([d,d,b-c,d,d+(b-d-c)/2,b-c],!0)},function(a,b){a.f([0,0,b,0,b,.7*b,.4*b,.4*b,.7*b,b,0,b])},function(a,b){a.b(b/2,b/2,b/2,b/2,3)},function(a,b){a.a(0,0,b,b/2);a.a(0,b/2,b/2,b/2);a.b(b/2,b/2,b/2,b/2,1)},function(a,b){var c=.14*b,d=4>b?1:6>b?2:0|.35*b;c=8>b?c:0|c;a.a(0,0,b,b);a.a(d,d,b-d-c,b-d-c,!0)},function(a,b){var c=.12*
b,d=3*c;a.a(0,0,b,b);a.g(d,d,b-c-d,!0)},function(a,b){a.b(b/2,b/2,b/2,b/2,3)},function(a,b){var c=.25*b;a.a(0,0,b,b);a.l(c,c,b-c,b-c,!0)},function(a,b,c){var d=.4*b;c||a.g(d,d,1.2*b)}],I:[function(a,b){a.b(0,0,b,b,0)},function(a,b){a.b(0,b/2,b,b/2,0)},function(a,b){a.l(0,0,b,b)},function(a,b){var c=b/6;a.g(c,c,b-2*c)}]};L.prototype={f:function(a){for(var b="M"+p(a[0].x)+" "+p(a[0].y),c=1;c<a.length;c++)b+="L"+p(a[c].x)+" "+p(a[c].y);this.j+=b+"Z"},g:function(a,b,c){c=c?0:1;var d=p(b/2),f=p(b);this.j+=
"M"+p(a.x)+" "+p(a.y+b/2)+"a"+d+","+d+" 0 1,"+c+" "+f+",0a"+d+","+d+" 0 1,"+c+" "+-f+",0"}};G.prototype={m:function(a){a=/^(#......)(..)?/.exec(a);this.h.m(a[1],a[2]?r(a[2],0)/255:1)},D:function(a){this.c=this.b[a]||(this.b[a]=new L)},F:function(){},f:function(a){this.c.f(a)},g:function(a,b,c){this.c.g(a,b,c)},finish:function(){for(var a in this.b)this.h.c(a,this.b[a].j)}};M.prototype={f:function(a,b){var c=b?-2:2,d=this.c,f=[];for(b=b?a.length-2:0;b<a.length&&0<=b;b+=c)f.push(d.l(a[b],a[b+1]));this.h.f(f)},
g:function(a,b,c,d){this.h.g(this.c.l(a,b,c,c),c,d)},a:function(a,b,c,d,f){this.f([a,b,a+c,b,a+c,b+d,a,b+d],f)},b:function(a,b,c,d,f,e){a=[a+c,b,a+c,b+d,a,b+d,a,b];a.splice((f||0)%4*2,2);this.f(a,e)},l:function(a,b,c,d,f){this.f([a+c/2,b,a+c,b+d/2,a+c/2,b+d,a,b+d/2],f)}};w.prototype={l:function(a,b,c,d){var f=this.b+this.h,e=this.c+this.h;return 1===this.a?new B(f-b-(d||0),this.c+a):2===this.a?new B(f-a-(c||0),e-b-(d||0)):3===this.a?new B(this.b+b,e-a-(c||0)):new B(this.b+a,this.c+b)}};w.a=new w(0,
0,0,0);n.drawIcon=function(a,b,c,d){if(!a)throw Error("No canvas specified.");a=new E(a,c);H(a,C(b)||D(b),0,0,c,d||0,J())};n.toSvg=function(a,b,c){var d=new K(b);H(new G(d),C(a)||D(a),0,0,b,c,J());return d.toString()};n.update=x;n.version="2.1.0";y&&(y.fn.jdenticon=function(a,b){this.each(function(c,d){x(d,a,b)});return this});"function"===typeof setTimeout&&setTimeout(Q,0);return n});
//# sourceMappingURL=jdenticon.min.js.map
