import{_ as K,o as G,c as W,j as w,r as ee,t as te,u as ne,p as z,G as $,w as M,k as T}from"./framework.Bh2a4ahF.js";import{_ as re}from"./theme.BqZ55nrO.js";const ie=500,oe=20,se=300,ce="https://stackblitz.com",F=["angular-cli","create-react-app","html","javascript","node","polymer","typescript","vue"],ae=["project","search","ports","settings"],le=["light","dark"],de=["editor","preview"],q={clickToLoad:e=>E("ctl",e),devToolsHeight:e=>H("devtoolsheight",e),forceEmbedLayout:e=>E("embed",e),hideDevTools:e=>E("hidedevtools",e),hideExplorer:e=>E("hideExplorer",e),hideNavigation:e=>E("hideNavigation",e),openFile:e=>x("file",e),showSidebar:e=>pe("showSidebar",e),sidebarView:e=>I("sidebarView",e,ae),startScript:e=>x("startScript",e),terminalHeight:e=>H("terminalHeight",e),theme:e=>I("theme",e,le),view:e=>I("view",e,de),zenMode:e=>E("zenMode",e),organization:e=>`${x("orgName",e==null?void 0:e.name)}&${x("orgProvider",e==null?void 0:e.provider)}`,crossOriginIsolated:e=>E("corp",e)};function J(e={}){const t=Object.entries(e).map(([n,r])=>r!=null&&q.hasOwnProperty(n)?q[n](r):"").filter(Boolean);return t.length?`?${t.join("&")}`:""}function E(e,t){return t===!0?`${e}=1`:""}function pe(e,t){return typeof t=="boolean"?`${e}=${t?"1":"0"}`:""}function H(e,t){if(typeof t=="number"&&!Number.isNaN(t)){const n=Math.min(100,Math.max(0,t));return`${e}=${encodeURIComponent(Math.round(n))}`}return""}function I(e,t="",n=[]){return n.includes(t)?`${e}=${encodeURIComponent(t)}`:""}function x(e,t){return(Array.isArray(t)?t:[t]).filter(r=>typeof r=="string"&&r.trim()!=="").map(r=>`${e}=${encodeURIComponent(r)}`).join("&")}function V(){return Math.random().toString(36).slice(2,6)+Math.random().toString(36).slice(2,6)}function D(e,t){return`${X(t)}${e}${J(t)}`}function U(e,t){const n={forceEmbedLayout:!0};return t&&typeof t=="object"&&Object.assign(n,t),`${X(n)}${e}${J(n)}`}function X(e={}){return(typeof e.origin=="string"?e.origin:ce).replace(/\/$/,"")}function N(e,t,n){if(!t||!e||!e.parentNode)throw new Error("Invalid Element");e.id&&(t.id=e.id),e.className&&(t.className=e.className),ue(t,n),fe(e,t,n),e.replaceWith(t)}function B(e){if(typeof e=="string"){const t=document.getElementById(e);if(!t)throw new Error(`Could not find element with id '${e}'`);return t}else if(e instanceof HTMLElement)return e;throw new Error(`Invalid element: ${e}`)}function R(e){return e&&e.newWindow===!1?"_self":"_blank"}function ue(e,t={}){const n=Object.hasOwnProperty.call(t,"height")?`${t.height}`:`${se}`,r=Object.hasOwnProperty.call(t,"width")?`${t.width}`:void 0;e.setAttribute("height",n),r?e.setAttribute("width",r):e.setAttribute("style","width:100%;")}function fe(e,t,n={}){var u,_;const r=((_=(u=e.allow)==null?void 0:u.split(";"))==null?void 0:_.map(y=>y.trim()))??[];n.crossOriginIsolated&&!r.includes("cross-origin-isolated")&&r.push("cross-origin-isolated"),r.length>0&&(t.allow=r.join("; "))}class he{constructor(t){this.pending={},this.port=t,this.port.onmessage=this.messageListener.bind(this)}request({type:t,payload:n}){return new Promise((r,u)=>{const _=V();this.pending[_]={resolve:r,reject:u},this.port.postMessage({type:t,payload:{...n,__reqid:_}})})}messageListener(t){var h;if(typeof((h=t.data.payload)==null?void 0:h.__reqid)!="string")return;const{type:n,payload:r}=t.data,{__reqid:u,__success:_,__error:y}=r;this.pending[u]&&(_?this.pending[u].resolve(this.cleanResult(r)):this.pending[u].reject(y?`${n}: ${y}`:n),delete this.pending[u])}cleanResult(t){const n={...t};return delete n.__reqid,delete n.__success,delete n.__error,Object.keys(n).length?n:null}}class me{constructor(t,n){this.editor={openFile:r=>this._rdc.request({type:"SDK_OPEN_FILE",payload:{path:r}}),setCurrentFile:r=>this._rdc.request({type:"SDK_SET_CURRENT_FILE",payload:{path:r}}),setTheme:r=>this._rdc.request({type:"SDK_SET_UI_THEME",payload:{theme:r}}),setView:r=>this._rdc.request({type:"SDK_SET_UI_VIEW",payload:{view:r}}),showSidebar:(r=!0)=>this._rdc.request({type:"SDK_TOGGLE_SIDEBAR",payload:{visible:r}})},this.preview={origin:"",getUrl:()=>this._rdc.request({type:"SDK_GET_PREVIEW_URL",payload:{}}).then(r=>(r==null?void 0:r.url)??null),setUrl:(r="/")=>{if(typeof r!="string"||!r.startsWith("/"))throw new Error(`Invalid argument: expected a path starting with '/', got '${r}'`);return this._rdc.request({type:"SDK_SET_PREVIEW_URL",payload:{path:r}})}},this._rdc=new he(t),Object.defineProperty(this.preview,"origin",{value:typeof n.previewOrigin=="string"?n.previewOrigin:null,writable:!1})}applyFsDiff(t){const n=r=>r!==null&&typeof r=="object";if(!n(t)||!n(t.create))throw new Error("Invalid diff object: expected diff.create to be an object.");if(!Array.isArray(t.destroy))throw new Error("Invalid diff object: expected diff.destroy to be an array.");return this._rdc.request({type:"SDK_APPLY_FS_DIFF",payload:t})}getDependencies(){return this._rdc.request({type:"SDK_GET_DEPS_SNAPSHOT",payload:{}})}getFsSnapshot(){return this._rdc.request({type:"SDK_GET_FS_SNAPSHOT",payload:{}})}}const A=[];class _e{constructor(t){this.id=V(),this.element=t,this.pending=new Promise((n,r)=>{const u=({data:i,ports:a})=>{(i==null?void 0:i.action)==="SDK_INIT_SUCCESS"&&i.id===this.id&&(this.vm=new me(a[0],i.payload),n(this.vm),y())},_=()=>{var i;(i=this.element.contentWindow)==null||i.postMessage({action:"SDK_INIT",id:this.id},"*")};function y(){window.clearInterval(s),window.removeEventListener("message",u)}window.addEventListener("message",u),_();let h=0;const s=window.setInterval(()=>{if(this.vm){y();return}if(h>=oe){y(),r("Timeout: Unable to establish a connection with the StackBlitz VM"),A.forEach((i,a)=>{i.id===this.id&&A.splice(a,1)});return}h++,_()},ie)}),A.push(this)}}const Le=e=>{const t=e instanceof Element?"element":"id";return A.find(n=>n[t]===e)??null};function ge(e,t){const n=document.createElement("input");return n.type="hidden",n.name=e,n.value=t,n}function we(e){return e.replace(/\[/g,"%5B").replace(/\]/g,"%5D")}function Y({template:e,title:t,description:n,dependencies:r,files:u,settings:_}){if(!F.includes(e)){const i=F.map(a=>`'${a}'`).join(", ");console.warn(`Unsupported project.template: must be one of ${i}`)}const y=[],h=(i,a,c="")=>{y.push(ge(i,typeof a=="string"?a:c))};h("project[title]",t),typeof n=="string"&&n.length>0&&h("project[description]",n),h("project[template]",e,"javascript"),r&&(e==="node"?console.warn("Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."):h("project[dependencies]",JSON.stringify(r))),_&&h("project[settings]",JSON.stringify(_)),Object.entries(u).forEach(([i,a])=>{h(`project[files][${we(i)}]`,a)});const s=document.createElement("form");return s.method="POST",s.setAttribute("style","display:none!important;"),s.append(...y),s}function ye(e,t){const n=Y(e);return n.action=U("/run",t),n.id="sb_run",`<!doctype html>
<html>
<head><title></title></head>
<body>
  ${n.outerHTML}
  <script>document.getElementById('${n.id}').submit();<\/script>
</body>
</html>`}function ve(e,t){const n=Y(e);n.action=D("/run",t),n.target=R(t),document.body.appendChild(n),n.submit(),document.body.removeChild(n)}function O(e){return e!=null&&e.contentWindow?(Le(e)??new _e(e)).pending:Promise.reject("Provided element is not an iframe.")}function Ce(e,t){ve(e,t)}function Se(e,t){const n=D(`/edit/${e}`,t),r=R(t);window.open(n,r)}function be(e,t){const n=D(`/github/${e}`,t),r=R(t);window.open(n,r)}function je(e,t,n){var y;const r=B(e),u=ye(t,n),_=document.createElement("iframe");return N(r,_,n),(y=_.contentDocument)==null||y.write(u),O(_)}function Ee(e,t,n){const r=B(e),u=document.createElement("iframe");return u.src=U(`/edit/${t}`,n),N(r,u,n),O(u)}function $e(e,t,n){const r=B(e),u=document.createElement("iframe");return u.src=U(`/github/${t}`,n),N(r,u,n),O(u)}const Me={connect:O,embedGithubProject:$e,embedProject:je,embedProjectId:Ee,openGithubProject:be,openProject:Ce,openProjectId:Se};var k={},Z={exports:{}};Z.exports;(function(e){var t=function(){var n=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",_={};function y(s,i){if(!_[s]){_[s]={};for(var a=0;a<s.length;a++)_[s][s.charAt(a)]=a}return _[s][i]}var h={compressToBase64:function(s){if(s==null)return"";var i=h._compress(s,6,function(a){return r.charAt(a)});switch(i.length%4){default:case 0:return i;case 1:return i+"===";case 2:return i+"==";case 3:return i+"="}},decompressFromBase64:function(s){return s==null?"":s==""?null:h._decompress(s.length,32,function(i){return y(r,s.charAt(i))})},compressToUTF16:function(s){return s==null?"":h._compress(s,15,function(i){return n(i+32)})+" "},decompressFromUTF16:function(s){return s==null?"":s==""?null:h._decompress(s.length,16384,function(i){return s.charCodeAt(i)-32})},compressToUint8Array:function(s){for(var i=h.compress(s),a=new Uint8Array(i.length*2),c=0,d=i.length;c<d;c++){var v=i.charCodeAt(c);a[c*2]=v>>>8,a[c*2+1]=v%256}return a},decompressFromUint8Array:function(s){if(s==null)return h.decompress(s);for(var i=new Array(s.length/2),a=0,c=i.length;a<c;a++)i[a]=s[a*2]*256+s[a*2+1];var d=[];return i.forEach(function(v){d.push(n(v))}),h.decompress(d.join(""))},compressToEncodedURIComponent:function(s){return s==null?"":h._compress(s,6,function(i){return u.charAt(i)})},decompressFromEncodedURIComponent:function(s){return s==null?"":s==""?null:(s=s.replace(/ /g,"+"),h._decompress(s.length,32,function(i){return y(u,s.charAt(i))}))},compress:function(s){return h._compress(s,16,function(i){return n(i)})},_compress:function(s,i,a){if(s==null)return"";var c,d,v={},b={},S="",j="",L="",C=2,g=3,f=2,m=[],o=0,p=0,l;for(l=0;l<s.length;l+=1)if(S=s.charAt(l),Object.prototype.hasOwnProperty.call(v,S)||(v[S]=g++,b[S]=!0),j=L+S,Object.prototype.hasOwnProperty.call(v,j))L=j;else{if(Object.prototype.hasOwnProperty.call(b,L)){if(L.charCodeAt(0)<256){for(c=0;c<f;c++)o=o<<1,p==i-1?(p=0,m.push(a(o)),o=0):p++;for(d=L.charCodeAt(0),c=0;c<8;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1}else{for(d=1,c=0;c<f;c++)o=o<<1|d,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=0;for(d=L.charCodeAt(0),c=0;c<16;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1}C--,C==0&&(C=Math.pow(2,f),f++),delete b[L]}else for(d=v[L],c=0;c<f;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1;C--,C==0&&(C=Math.pow(2,f),f++),v[j]=g++,L=String(S)}if(L!==""){if(Object.prototype.hasOwnProperty.call(b,L)){if(L.charCodeAt(0)<256){for(c=0;c<f;c++)o=o<<1,p==i-1?(p=0,m.push(a(o)),o=0):p++;for(d=L.charCodeAt(0),c=0;c<8;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1}else{for(d=1,c=0;c<f;c++)o=o<<1|d,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=0;for(d=L.charCodeAt(0),c=0;c<16;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1}C--,C==0&&(C=Math.pow(2,f),f++),delete b[L]}else for(d=v[L],c=0;c<f;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1;C--,C==0&&(C=Math.pow(2,f),f++)}for(d=2,c=0;c<f;c++)o=o<<1|d&1,p==i-1?(p=0,m.push(a(o)),o=0):p++,d=d>>1;for(;;)if(o=o<<1,p==i-1){m.push(a(o));break}else p++;return m.join("")},decompress:function(s){return s==null?"":s==""?null:h._decompress(s.length,32768,function(i){return s.charCodeAt(i)})},_decompress:function(s,i,a){var c=[],d=4,v=4,b=3,S="",j=[],L,C,g,f,m,o,p,l={val:a(0),position:i,index:1};for(L=0;L<3;L+=1)c[L]=L;for(g=0,m=Math.pow(2,2),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;switch(g){case 0:for(g=0,m=Math.pow(2,8),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;p=n(g);break;case 1:for(g=0,m=Math.pow(2,16),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;p=n(g);break;case 2:return""}for(c[3]=p,C=p,j.push(p);;){if(l.index>s)return"";for(g=0,m=Math.pow(2,b),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;switch(p=g){case 0:for(g=0,m=Math.pow(2,8),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;c[v++]=n(g),p=v-1,d--;break;case 1:for(g=0,m=Math.pow(2,16),o=1;o!=m;)f=l.val&l.position,l.position>>=1,l.position==0&&(l.position=i,l.val=a(l.index++)),g|=(f>0?1:0)*o,o<<=1;c[v++]=n(g),p=v-1,d--;break;case 2:return j.join("")}if(d==0&&(d=Math.pow(2,b),b++),c[p])S=c[p];else if(p===v)S=C+C.charAt(0);else return null;j.push(S),c[v++]=C+S.charAt(0),d--,C=S,d==0&&(d=Math.pow(2,b),b++)}}};return h}();e!=null?e.exports=t:typeof angular<"u"&&angular!=null&&angular.module("LZString",[]).factory("LZString",function(){return t})})(Z);var Te=Z.exports;Object.defineProperty(k,"__esModule",{value:!0});k.getParameters=void 0;var xe=Te;function Pe(e){return xe.compressToBase64(e).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Ae(e){return Pe(JSON.stringify(e))}k.getParameters=Ae;var Q=void 0,Oe=k;Q=Oe.getParameters;const ke={class:"tooltip"},Ie={class:"body"},De={class:"tip-container"},Ue={class:"tip"},Ne={__name:"Tooltip",props:["tip"],setup(e){const t=e;return(n,r)=>(G(),W("div",ke,[w("span",Ie,[ee(n.$slots,"default",{},void 0,!0)]),w("div",De,[w("span",Ue,te(t.tip),1)])]))}},P=K(Ne,[["__scopeId","data-v-4f0d6bd1"]]),Be={class:"chart sample-chart"},Re={class:"code-action-container"},Ze={action:"https://codesandbox.io/api/v1/sandboxes/define",method:"POST",target:"_blank"},ze=["value"],Fe={type:"submit"},qe={action:"https://codepen.io/pen/define",method:"POST",target:"_blank"},He=["value"],Ke={type:"submit"},Ge=["href"],We={__name:"Chart",props:["js","css","html","title","description"],setup(e){const{lang:t}=ne(),n=z(),r=e,u=z("9.5.0");function _(){const s={"index.js":r.js,"index.html":r.html};r.css&&(s["index.css"]=r.css),Me.openProject({title:`${r.title} - klinecharts@${u.value}`,description:r.description,template:"javascript",dependencies:{klinecharts:u.value},files:s})}function y(){const s=r.js,i={title:`${r.title} - klinecharts@${u.value}`,description:r.description,html:r.html,js:s.replace(/import\s+{(\s+[^}]*\s+)}\s+from\s+'klinecharts'/,"const {$1} = klinecharts").replace(/import.*\'\.\/index\.css\'/,""),js_external:`https://unpkg.com/klinecharts@${u.value}/dist/klinecharts.min.js`};return r.css&&(i.css=r.css),JSON.stringify(i)}function h(){const s={"index.js":{content:r.js},"index.html":{content:r.html},"index.css":{content:r.css},"package.json":{content:{title:`${r.title} - klinecharts@${u.value}`,dependencies:{klinecharts:u.value}}}};return r.css&&(s["index.css"]={content:r.css}),Q({files:s})}return(s,i)=>(G(),W("div",Be,[$(re,{js:r.js,css:r.css},null,8,["js","css"]),w("div",Re,[w("form",Ze,[w("input",{type:"hidden",name:"parameters",value:h()},null,8,ze),w("button",Fe,[$(P,{tip:T(t)==="zh-CN"?"在 CodeSandbox 中打开":"Open in CodeSandbox"},{default:M(()=>i[1]||(i[1]=[w("svg",{width:"14",height:"16",viewBox:"0 0 14 16"},[w("path",{d:"M10.8369,2.19231L10.8447,2.18846L10.8485,2.18846L7,0L3.1534,2.18846L3.14951,2.18846L3.16311,2.19423L0,4L0,12L7,16L14,12L14,4L10.8369,2.19231ZM6.43107,14.3769L3.65243,12.7885L3.65243,10.1038L1.13592,8.68846L1.13592,5.325L6.43107,8.35L6.43107,14.3769ZM1.6835,4.33654L4.29903,2.84038L6.99612,4.37308L9.69709,2.83654L12.3223,4.33654L7.00389,7.375L1.6835,4.33654ZM12.8641,8.69808L10.3631,10.1038L10.3631,12.7788L7.56893,14.375L7.56893,8.35385L12.8641,5.32885L12.8641,8.69808Z"})],-1)])),_:1},8,["tip"])])]),w("form",qe,[w("input",{type:"hidden",name:"data",value:y()},null,8,He),w("button",Ke,[$(P,{tip:T(t)==="zh-CN"?"在 CodePen 中打开":"Open in CodePen"},{default:M(()=>i[2]||(i[2]=[w("svg",{width:"16",height:"16",viewBox:"0 0 16 16"},[w("path",{d:"M15.988,5.46909L15.982,5.43907C15.978,5.41906,15.976,5.40104,15.97,5.38103C15.966,5.36902,15.962,5.35902,15.96,5.34701C15.954,5.331,15.95,5.31299,15.942,5.29698C15.938,5.28497,15.932,5.27496,15.926,5.26295C15.918,5.24694,15.91,5.23293,15.9021,5.21692C15.8961,5.20692,15.8901,5.19491,15.8821,5.1849C15.8661,5.16089,15.8481,5.13687,15.8301,5.11285C15.8201,5.10085,15.8081,5.08684,15.7961,5.07483C15.7881,5.06482,15.7781,5.05682,15.7681,5.04881C15.7561,5.03681,15.7421,5.0268,15.7301,5.01679C15.7201,5.00879,15.7101,5.00078,15.6982,4.99278C15.6942,4.99077,15.6902,4.98677,15.6862,4.98477L8.37981,0.115576C8.14993,-0.0385253,7.84808,-0.0385253,7.61819,0.115576L0.307846,4.98877C0.303848,4.99077,0.29985,4.99478,0.295852,4.99678C0.285857,5.00478,0.275862,5.01279,0.263868,5.02079C0.249875,5.0308,0.237881,5.04281,0.225887,5.05282C0.215892,5.06082,0.207896,5.07083,0.197901,5.07883C0.185907,5.09084,0.173913,5.10285,0.163918,5.11686C0.143928,5.13887,0.127936,5.16289,0.111944,5.1889C0.105947,5.19891,0.0979512,5.20892,0.0919542,5.22093C0.0839581,5.23494,0.0759621,5.25095,0.0679662,5.26696C0.0619691,5.27696,0.0579712,5.28897,0.0519741,5.30098C0.0459771,5.31699,0.0399802,5.335,0.0339831,5.35101C0.0299852,5.36302,0.0259871,5.37303,0.0239881,5.38503C0.0199902,5.40305,0.0159921,5.42306,0.0119941,5.44307L0.00599706,5.47309C0.00199912,5.50311,0,5.53313,0,5.56315L0,10.4363C0,10.4664,0.00199897,10.4964,0.00599706,10.5264L0.0119941,10.5564C0.0159921,10.5764,0.0199902,10.5945,0.0239881,10.6145C0.027986,10.6265,0.0299852,10.6365,0.0339831,10.6485C0.0399802,10.6665,0.0459771,10.6825,0.0519741,10.6985C0.0559721,10.7105,0.0619691,10.7205,0.0679662,10.7325C0.0759622,10.7486,0.0819592,10.7626,0.0919542,10.7786C0.0979512,10.7886,0.103948,10.8006,0.111944,10.8106C0.121939,10.8246,0.129935,10.8386,0.141929,10.8526L0.165917,10.8826C0.175912,10.8946,0.187906,10.9087,0.1999,10.9207C0.207896,10.9307,0.217891,10.9387,0.227886,10.9467C0.23988,10.9587,0.253873,10.9687,0.265867,10.9787C0.275862,10.9867,0.285857,10.9947,0.297851,11.0027C0.301849,11.0047,0.305847,11.0087,0.309845,11.0107L7.61819,15.8839C7.73014,15.96,7.86407,16,8,16C8.13194,16,8.26587,15.962,8.38181,15.8839L15.6902,11.0107C15.6942,11.0087,15.6982,11.0047,15.7022,11.0027C15.7121,10.9947,15.7221,10.9867,15.7341,10.9787C15.7481,10.9687,15.7601,10.9567,15.7721,10.9467C15.7821,10.9387,15.7901,10.9287,15.8001,10.9207C15.8121,10.9087,15.8241,10.8967,15.8341,10.8826L15.8581,10.8526L15.8881,10.8106C15.8941,10.8006,15.9021,10.7906,15.908,10.7786C15.916,10.7626,15.924,10.7486,15.932,10.7325C15.938,10.7225,15.942,10.7105,15.948,10.6985C15.954,10.6825,15.96,10.6645,15.966,10.6485C15.97,10.6385,15.974,10.6265,15.976,10.6145C15.982,10.5965,15.984,10.5764,15.988,10.5564L15.994,10.5264C15.998,10.4964,16,10.4664,16,10.4363L16,5.55915C15.994,5.52913,15.992,5.49911,15.988,5.46909ZM8.68566,1.97079L14.071,5.56115L11.6662,7.17021L8.68766,5.1769L8.68766,1.97079L8.68566,1.97079ZM7.31035,1.97079L7.31035,5.1769L4.33184,7.17021L1.92704,5.56115L7.31035,1.97079ZM1.37531,6.84599L3.09445,7.99675L1.37531,9.1475L1.37531,6.84599ZM7.31035,14.0207L1.92704,10.4303L4.33184,8.82129L7.31035,10.8146L7.31035,14.0207ZM7.998,9.62181L5.56722,7.99675L7.998,6.36968L10.4288,7.99475L7.998,9.62181ZM8.68566,14.0207L8.68566,10.8146L11.6642,8.82129L14.069,10.4303L8.68566,14.0207ZM14.6207,9.1455L12.9016,7.99475L14.6207,6.84399L14.6207,9.1455Z"})],-1)])),_:1},8,["tip"])])]),w("button",{onClick:i[0]||(i[0]=a=>_())},[$(P,{tip:T(t)==="zh-CN"?"在 StackBlitz 中打开":"Open in StackBlitz"},{default:M(()=>i[3]||(i[3]=[w("svg",{width:"12",height:"16",viewBox:"0 0 12 16"},[w("path",{d:"M5.13686,9.45472L0,9.45472L9.39094,0L6.86314,6.54528L12,6.54528L2.60837,16L5.13686,9.45472L5.13686,9.45472Z"})],-1)])),_:1},8,["tip"])]),w("a",{target:"_blank",href:n.value},[$(P,{tip:T(t)==="zh-CN"?"在新窗口中打开":"Open in a new window"},{default:M(()=>i[4]||(i[4]=[w("svg",{width:"15",height:"15",viewBox:"0 0 16 16"},[w("path",{d:"M3.63636,3.63636L3.63636,1.81818C3.63636,0.814546,4.45164,3.90139e-7,5.45455,3.90139e-7L14.1818,3.90139e-7C15.1855,3.90139e-7,16,0.815273,16,1.81818L16,10.5455C16,11.5491,15.1847,12.3636,14.1818,12.3636L12.3636,12.3636L12.3636,14.1818C12.3636,15.1855,11.5484,16,10.5455,16L1.81818,16C0.814546,16,3.90139e-7,15.1847,3.90139e-7,14.1818L3.90139e-7,5.45455C3.90139e-7,4.45091,0.815273,3.63636,1.81818,3.63636L3.63636,3.63636ZM3.63636,5.09091L1.81818,5.09091C1.61818,5.09091,1.45455,5.25455,1.45455,5.45455L1.45455,14.1818C1.45455,14.3818,1.61818,14.5455,1.81818,14.5455L10.5455,14.5455C10.7455,14.5455,10.9091,14.3818,10.9091,14.1818L10.9091,12.3636L5.45455,12.3636C4.45091,12.3636,3.63636,11.5484,3.63636,10.5455L3.63636,5.09091ZM5.09091,1.81818L5.09091,10.5455C5.09091,10.7455,5.25455,10.9091,5.45455,10.9091L14.1818,10.9091C14.3818,10.9091,14.5455,10.7455,14.5455,10.5455L14.5455,1.81818C14.5455,1.61818,14.3818,1.45455,14.1818,1.45455L5.45455,1.45455C5.25455,1.45455,5.09091,1.61818,5.09091,1.81818Z"})],-1)])),_:1},8,["tip"])],8,Ge)])]))}},Xe=K(We,[["__scopeId","data-v-27f03eb0"]]);export{Xe as default};
