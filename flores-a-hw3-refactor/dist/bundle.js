(()=>{"use strict";var e,t,o,n,r,a,c,i,l=function(e,t,o,n){return void 0===n&&(n=1),"rgba(".concat(e,",").concat(t,",").concat(o,",").concat(n,")")},s=function(e,t,o,n,r,a){void 0===a&&(a=1),e.save(),e.fillStyle=r,e.beginPath(),e.arc(t,o,n*a,0,2*Math.PI),e.closePath(),e.fill(),e.restore()},u=function(e,t,o,n){return new(o||(o=Promise))((function(r,a){function c(e){try{l(n.next(e))}catch(e){a(e)}}function i(e){try{l(n.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,i)}l((n=n.apply(e,t||[])).next())}))},h=function(e,t){var o,n,r,a,c={label:0,sent:function(){if(1&r[0])throw r[1];return r[1]},trys:[],ops:[]};return a={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function i(i){return function(l){return function(i){if(o)throw new TypeError("Generator is already executing.");for(;a&&(a=0,i[0]&&(c=0)),c;)try{if(o=1,n&&(r=2&i[0]?n.return:i[0]?n.throw||((r=n.return)&&r.call(n),0):n.next)&&!(r=r.call(n,i[1])).done)return r;switch(n=0,r&&(i=[2&i[0],r.value]),i[0]){case 0:case 1:r=i;break;case 4:return c.label++,{value:i[1],done:!1};case 5:c.label++,n=i[1],i=[0];continue;case 7:i=c.ops.pop(),c.trys.pop();continue;default:if(!((r=(r=c.trys).length>0&&r[r.length-1])||6!==i[0]&&2!==i[0])){c=0;continue}if(3===i[0]&&(!r||i[1]>r[0]&&i[1]<r[3])){c.label=i[1];break}if(6===i[0]&&c.label<r[1]){c.label=r[1],r=i;break}if(r&&c.label<r[2]){c.label=r[2],c.ops.push(i);break}r[2]&&c.ops.pop(),c.trys.pop();continue}i=t.call(e,c)}catch(e){i=[6,e],n=0}finally{o=r=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,l])}}},v=Object.seal({gain:.5,numSamples:256,hasReverb:!0}),d=function(e){t.src=e},f=function(){function e(e){var t=e.type,o=e.pivotX,n=e.pivotY,r=e.radius,a=e.rotation,c=e.rotRadius,i=e.color,l=e.speed,s=void 0===l?10:l;Object.assign(this,{type:t,pivotX:o,pivotY:n,radius:r,rotation:a,rotRadius:c,color:i,speed:s}),this.x=this.pivotX+Math.cos(this.rotation)*this.rotRadius,this.y=this.pivotY+Math.sin(this.rotation)*this.rotRadius,this.scale=1}return e.prototype.update=function(e){this.scale=e,this.rotation+=.01*this.speed,this.rotation>360&&(this.rotation-=360),this.x=this.pivotX+Math.cos(this.rotation)*this.rotRadius*this.scale,this.y=this.pivotY+Math.sin(this.rotation)*this.rotRadius*this.scale},e.prototype.draw=function(e){e.save(),"circle"===this.type&&s(e,this.x,this.y,this.radius,this.color,this.scale),e.restore()},e}();const p=f;var y,g,m,w,b,S=[],q=[],R=[],M=[],P=[],k=[],I=function(e,t){console.log(P);for(var o=0,n=P[e-1];o<n.length;o++)n[o].color=t},C=!1,D={useFrequencyData:!0,useWaveformData:!1,showBars:!0,showCircles:!0,showInvert:!1},x=Object.seal({defaultSound:"media/New Adventure Theme.mp3",volume:0,impulseResponse:"",distortion:0,hasReverb:!0,layerColors:[]}),E=function(e){var t=e.target.responseText;t||console.log("Error in JSON response");var o,n=JSON.parse(t);document.querySelector("title").innerHTML=n.title;var r=(o=n.soundOptions).map((function(e){return'<option value="'.concat(e.url,'">').concat(e.name,"</option>")})).join("");document.querySelector("#select-track").innerHTML=r,x.defaultSound=o[0].url,x.volume=n.volume,x.impulseResponse=n.impulseResponse,x.hasReverb=n.hasReverb,D.useFrequencyData=n.useFrequency,D.useWaveformData=!n.useFrequency,x.layerColors=n.layerStartingColors,F()},F=function(){var l,s;v.hasReverb=x.hasReverb,l=x.defaultSound,s=x.impulseResponse,u(void 0,void 0,void 0,(function(){var f;return h(this,(function(p){switch(p.label){case 0:return f=window.AudioContext,e=new f,t=new Audio,d(l),o=e.createMediaElementSource(t),(n=e.createAnalyser()).fftSize=v.numSamples,r=e.createWaveShaper(),(c=e.createGain()).gain.value=v.gain,[4,(y=s,u(void 0,void 0,void 0,(function(){var t,o,n;return h(this,(function(r){switch(r.label){case 0:return t=e.createConvolver(),[4,fetch(y)];case 1:return[4,r.sent().arrayBuffer()];case 2:return o=r.sent(),n=t,[4,e.decodeAudioData(o)];case 3:return n.buffer=r.sent(),[2,t]}}))})))];case 1:return a=p.sent(),(i=v.hasReverb)?(o.connect(a),a.connect(r),r.connect(n),n.connect(c),c.connect(e.destination)):(o.connect(r),r.connect(n),n.connect(c),c.connect(e.destination)),[2]}var y}))}));var f=document.querySelector("canvas");T(f),function(e,t,o){y=e.getContext("2d"),g=e.width,m=e.height,y.globalCompositeOperation="source-over",w=t,b=new Uint8Array(w.fftSize/2),k=o,function(){for(var e=0;e<5;e++)S.push(new p({type:"circle",pivotX:g/2,pivotY:m/2,radius:50,rotation:2*Math.PI*e/5,rotRadius:200,color:k[0],speed:10}));for(e=0;e<5;e++)q.push(new p({type:"circle",pivotX:g/2,pivotY:m/2,radius:50,rotation:2*Math.PI*e/5,rotRadius:300,color:k[1],speed:-10}));for(e=0;e<5;e++)R.push(new p({type:"circle",pivotX:g/2,pivotY:m/2,radius:50,rotation:2*Math.PI*e/5,rotRadius:400,color:k[2],speed:10}));for(e=0;e<5;e++)M.push(new p({type:"circle",pivotX:g/2,pivotY:m/2,radius:50,rotation:2*Math.PI*e/5,rotRadius:500,color:k[3],speed:-10}));P=[S,q,R,M]}()}(f,n,x.layerColors),window.onblur=function(){C=!0},window.onfocus=function(){C=!1,O()},O()},T=function(n){var l=document.querySelector("#btn-play");document.querySelector("#btn-fullscreen").onclick=function(e){var t;console.log("goFullscreen() called"),(t=n).requestFullscreen&&t.requestFullscreen()},l.onclick=function(o){console.log("audioCtx.state before = ".concat(e.state));var n=o.target;"suspended"==e.state&&e.resume(),console.log("audioCtx.state after = ".concat(e.state)),"no"==n.dataset.playing?(t.play(),n.dataset.playing="yes"):(t.pause(),n.dataset.playing="no")};var s=document.querySelector("#slider-volume"),u=document.querySelector("#lbl-volume");s.oninput=function(e){var t,o=Number(e.target.value);t=o,c.gain.value=t,console.log(o),u.innerHTML="".concat(Math.round(o/2*100))},s.value=String(x.volume),console.log(s),s.dispatchEvent(new Event("input"));var h=document.querySelector("#select-track");h.onchange=function(e){var t=e.target.value;d(t),"yes"==l.dataset.playing&&l.dispatchEvent(new MouseEvent("click"))},h.dispatchEvent(new Event("change"));var v=document.querySelector("#select-data-type");v.onchange=function(e){"frequency"==e.target.value?(D.useFrequencyData=!0,D.useWaveformData=!1):(D.useFrequencyData=!1,D.useWaveformData=!0)},v.selectedIndex=D.useFrequencyData?0:1,v.dispatchEvent(new Event("change"));var f=document.querySelector("#slider-distortion");f.value="".concat(x.distortion),f.onchange=function(e){var t,o=e.target;t=Number(o.value),r.curve=t?function(e){void 0===e&&(e=20);for(var t=new Float32Array(256),o=0;o<256;++o){var n=2*o/256-1;t[o]=(Math.PI+e)*n/(Math.PI+e*Math.abs(n))}return t}(t):null};var p=document.querySelector("#cb-reverb");p.onchange=function(e){i?(o.disconnect(a),a.disconnect(r),o.connect(r),i=!1):(o.disconnect(r),o.connect(a),a.connect(r),i=!0)},p.checked=x.hasReverb;var y=document.querySelector("#cb-bars");y.onchange=function(e){var t=e.target;D.showBars=t.checked},y.checked=D.showBars;var g=document.querySelector("#cb-circles");g.onchange=function(e){var t=e.target;D.showCircles=t.checked},g.checked=D.showCircles;var m=document.querySelector("#cb-invert");m.onchange=function(e){var t=e.target;D.showInvert=t.checked},m.checked=D.showInvert;for(var w=1;w<=x.layerColors.length;w++)document.querySelector("#color-layer".concat(w)).value=x.layerColors[w];document.querySelector("#color-layer1").oninput=function(e){I(2,e.target.value)},document.querySelector("#color-layer2").oninput=function(e){I(3,e.target.value)},document.querySelector("#color-layer3").oninput=function(e){I(4,e.target.value)},document.querySelector("#color-layer4").oninput=function(e){I(1,e.target.value)}},O=function(){C||(setTimeout(O,1e3/60),function(e){e.useFrequencyData?w.getByteFrequencyData(b):e.useWaveformData&&w.getByteTimeDomainData(b),y.save(),y.fillStyle="black",y.globalAlpha=.1,y.fillRect(0,0,g,m),y.restore(),y.globalCompositeOperation="lighter";for(var t=b[b.length/4-1]/128,o=0,n=S;o<n.length;o++)(v=n[o]).update(t),v.draw(y);t=b[2*b.length/4-1]/128;for(var r=0,a=q;r<a.length;r++)(v=a[r]).update(t),v.draw(y);t=b[3*b.length/4-1]/128;for(var c=0,i=R;c<i.length;c++)(v=i[c]).update(t),v.draw(y);t=b[4*b.length/4-1]/128;for(var u=0,h=R;u<h.length;u++){var v;(v=h[u]).update(t),v.draw(y)}if(y.globalCompositeOperation="source-over",s(y,g/2,m/2,200,"black"),s(y,g/2,m/2,190,"white"),e.showBars){var d=9.5*b.length/(2*Math.PI);y.fillStyle="black",y.save(),y.translate(g/2,m/2-d);for(var f=0;f<b.length;f++)(M=b[f]/255)<.02&&(M=.02),y.translate(6,0),y.rotate(2*Math.PI/b.length),y.save(),y.scale(1,1),y.fillRect(0,0,6,100*M),y.restore(),y.translate(3.5,0);y.restore()}if(e.showCircles){var p=m/4;for(y.save(),y.globalAlpha=.5,f=0;f<b.length;f++){var M,P=(M=b[f]/255)*p;y.beginPath(),y.fillStyle=l(0,255,255,.34-M/3),y.arc(g/2,m/2,P,0,2*Math.PI,!1),y.fill(),y.closePath(),y.beginPath(),y.fillStyle=l(200,200,200,.1-M/10),y.arc(g/2,m/2,1.5*P,0,2*Math.PI,!1),y.fill(),y.closePath(),y.save(),y.beginPath(),y.fillStyle=l(0,0,255,.5-M/5),y.arc(g/2,m/2,.5*P,0,2*Math.PI,!1),y.fill(),y.closePath(),y.restore()}y.restore()}var k=y.getImageData(0,0,g,m),I=k.data,C=I.length;if(k.width,e.showInvert)for(f=0;f<C;f+=4){var D=I[f],x=I[f+1],E=I[f+2];I[f]=255-D,I[f+1]=255-x,I[f+2]=255-E}y.putImageData(k,0,0)}(D))},A=document.querySelector("#burger"),X=document.querySelector("#nav-links");window.onload=function(){var e,t;console.log("window.onload called"),console.log(window),A.addEventListener("click",(function(){X.classList.toggle("is-active")})),-1!==window.location.href.indexOf("about")||(e=E,(t=new XMLHttpRequest).onload=e,t.onerror=function(e){return console.log("In onerror - HTTP Status Code = ".concat(e.target.status))},t.open("GET","./data/av-data.json"),t.send())}})();
//# sourceMappingURL=bundle.js.map