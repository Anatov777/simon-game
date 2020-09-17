(function(e){function t(t){for(var i,o,a=t[0],r=t[1],u=t[2],h=0,p=[];h<a.length;h++)o=a[h],Object.prototype.hasOwnProperty.call(s,o)&&s[o]&&p.push(s[o][0]),s[o]=0;for(i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i]);l&&l(t);while(p.length)p.shift()();return c.push.apply(c,u||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],i=!0,a=1;a<n.length;a++){var r=n[a];0!==s[r]&&(i=!1)}i&&(c.splice(t--,1),e=o(o.s=n[0]))}return e}var i={},s={app:0},c=[];function o(t){if(i[t])return i[t].exports;var n=i[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)o.d(n,i,function(t){return e[t]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/simon-game/";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],r=a.push.bind(a);a.push=t,a=a.slice();for(var u=0;u<a.length;u++)t(a[u]);var l=r;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("Game")],1)},c=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"game"},[n("h1",[e._v("Simon Game")]),n("div",{staticClass:"game__content"},[n("div",{staticClass:"game__item game__item_1",class:{lit:e.isLit[1]},on:{click:function(t){return e.clicked(1)}}}),n("div",{staticClass:"game__item game__item_2",class:{lit:e.isLit[2]},on:{click:function(t){return e.clicked(2)}}}),n("div",{staticClass:"game__item game__item_3",class:{lit:e.isLit[3]},on:{click:function(t){return e.clicked(3)}}}),n("div",{staticClass:"game__item game__item_4",class:{lit:e.isLit[4]},on:{click:function(t){return e.clicked(4)}}})]),n("div",{staticClass:"game__start-btn",on:{click:e.startGame}},[e._v(e._s(e.centerButton)+" "),n("span",{directives:[{name:"show",rawName:"v-show",value:e.playing,expression:"playing"}]},[e._v(e._s(e.showScore))])]),n("div",{staticClass:"game__mode"},[n("p",[e._v("Mode")]),n("button",{class:{active:"btn1"===e.activeBtn},on:{click:function(t){e.gameMode="easy",e.activeBtn="btn1"}}},[e._v("Easy")]),n("button",{class:{active:"btn2"===e.activeBtn},on:{click:function(t){e.gameMode="normal",e.activeBtn="btn2"}}},[e._v("Normal")]),n("button",{class:{active:"btn3"===e.activeBtn},on:{click:function(t){e.gameMode="hard",e.activeBtn="btn3"}}},[e._v("Hard")])])])},a=[],r={name:"SimonGame",data:function(){return{centerButton:"START",playing:!1,isClickable:!1,isWon:!1,isWrong:!1,gameMode:"normal",activeBtn:"btn2",score:0,sequence:[],sequenceInterval:null,playerSequence:[],sounds:{1:"sounds/plip.mp3",2:"sounds/govilive.mp3",3:"sounds/error.mp3",4:"sounds/sswitch1.mp3",5:"sounds/haa.mp3",6:"sounds/good.mp3"},isLit:{1:!1,2:!1,3:!1,4:!1}}},computed:{showScore:function(){return this.isWon?"Play Again?":"Score: "+this.score}},methods:{playSound:function(e){if(this.sounds[e]){var t=new Audio(this.sounds[e]);t.play()}},startGame:function(){this.playing=!0,this.sequence=[],this.playSound(5),this.playerSequence=[],this.centerButton="RESET",this.isWon=!1,this.isWrong=!1,this.score=0,clearInterval(this.sequenceInterval),this.showSequence()},clicked:function(e){this.isClickable&&(this.playSound(e),this.lightUp(e),this.playerSequence.push(e),this.checkWinLose())},checkWinLose:function(){for(var e=this,t=0;t<this.playerSequence.length;t++)this.playerSequence[t]!==this.sequence[t]&&(this.playerSequence=[],this.centerButton="Wrong!",this.isWrong=!0,setTimeout((function(){e.centerButton="RESET",e.isWrong=!1}),1e3),this.showSequence(!0));this.playerSequence.length===this.sequence.length&&(this.playerSequence=[],this.score++,5===this.score?(this.centerButton="Winner!",setTimeout((function(){return e.playSound(6)}),600),this.isClickable=!1,this.isWon=!0):this.showSequence())},lightUp:function(e){var t=this;this.isLit[e]=!0,setTimeout((function(){t.isLit[e]=!1}),300)},showSequence:function(e){var t=this,n=0,i=0===this.sequence.length?1e3:this.getModeSpeed(this.gameMode);this.isClickable=!1,e||this.sequence.push(Math.floor(4*Math.random()+1)),this.sequenceInterval=setInterval((function(){if(n>=t.sequence.length)return clearInterval(t.sequenceInterval),t.isClickable=!0;t.playSound(t.sequence[n]),t.lightUp(t.sequence[n]),n++}),i)},getModeSpeed:function(e){return"easy"===e?1500:"normal"===e?1e3:400}}},u=r,l=n("2877"),h=Object(l["a"])(u,o,a,!1,null,null,null),p=h.exports,d={name:"App",components:{Game:p}},f=d,m=(n("5c0b"),Object(l["a"])(f,s,c,!1,null,null,null)),v=m.exports;i["a"].config.productionTip=!1,i["a"].config.devtools=!0,new i["a"]({render:function(e){return e(v)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";var i=n("9c0c"),s=n.n(i);s.a},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.5223ce11.js.map