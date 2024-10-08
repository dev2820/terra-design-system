import{r as b,R as le}from"./index-CDs2tPxN.js";import"./index-B-yFm4aN.js";import"./jsx-runtime-qGIIFXMu.js";function he(t,e){return`${t} returned \`undefined\`. Seems you forgot to wrap component within ${e}`}function zn(t={}){const{name:e,strict:n=!0,hookName:s="useContext",providerName:i="Provider",errorMessage:c,defaultValue:u}=t,r=b.createContext(u);r.displayName=e;function a(){var f;const o=b.useContext(r);if(!o&&n){const l=new Error(c??he(s,i));throw l.name="ContextError",(f=Error.captureStackTrace)==null||f.call(Error,l,a),l}return o}return[r.Provider,a,r]}var J=(t,e=[])=>({parts:(...n)=>{if(de(e))return J(t,n);throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")},extendWith:(...n)=>J(t,[...e,...n]),rename:n=>J(n,e),keys:()=>e,build:()=>[...new Set(e)].reduce((n,s)=>Object.assign(n,{[s]:{selector:[`&[data-scope="${N(t)}"][data-part="${N(s)}"]`,`& [data-scope="${N(t)}"][data-part="${N(s)}"]`].join(", "),attrs:{"data-scope":N(t),"data-part":N(s)}}}),{})}),N=t=>t.replace(/([A-Z])([A-Z])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),de=t=>t.length===0,Yn=t=>t?"":void 0,Bn=t=>t?"true":void 0,qn=2147483647,pe=1,ge=9,ye=11,H=t=>typeof t=="object"&&t!==null,C=t=>H(t)&&t.nodeType===pe&&typeof t.nodeName=="string",$t=t=>H(t)&&t.nodeType===ge,me=t=>H(t)&&t===t.window,kt=t=>C(t)?t.localName||"":"#document";function ve(t){return["html","body","#document"].includes(kt(t))}var Ee=t=>H(t)&&t.nodeType!==void 0,at=t=>Ee(t)&&t.nodeType===ye&&"host"in t;function be(t,e){return!t||!e||!C(t)||!C(e)?!1:t===e||t.contains(e)}function ht(t){return $t(t)?t:me(t)?t.document:(t==null?void 0:t.ownerDocument)??document}function we(t){return ht(t).documentElement}function $(t){var e;return at(t)?$(t.host):$t(t)?t.defaultView??window:C(t)?((e=t.ownerDocument)==null?void 0:e.defaultView)??window:window}var dt=()=>typeof document<"u";function Se(){const t=navigator.userAgentData;return(t==null?void 0:t.platform)??navigator.platform}var pt=t=>dt()&&t.test(Se()),Ae=t=>dt()&&t.test(navigator.userAgent),Te=t=>dt()&&t.test(navigator.vendor),Gn=()=>pt(/^Mac/),Hn=()=>Vt()&&Te(/apple/i),Un=()=>Ae(/firefox\//i),Vt=()=>pt(/mac|iphone|ipad|ipod/i),Xn=()=>pt(/iP(hone|ad|od)|iOS/);function xe(t){var e,n,s;return((e=t.composedPath)==null?void 0:e.call(t))??((s=(n=t.nativeEvent)==null?void 0:n.composedPath)==null?void 0:s.call(n))}function Oe(t){const e=xe(t);return(e==null?void 0:e[0])??t.target}var Zn=t=>be(t.currentTarget,Oe(t));function Jn(t){const e=t.currentTarget;if(!e)return!1;const n=Vt();if(n&&!t.metaKey||!n&&!t.ctrlKey)return!1;const s=e.localName;return s==="a"||s==="button"&&e.type==="submit"||s==="input"&&e.type==="submit"}function Qn(t){const e=t.currentTarget;if(!e)return!1;const n=e.localName;return t.altKey?n==="a"||n==="button"&&e.type==="submit"||n==="input"&&e.type==="submit":!1}function ts(t){var e;return((e=t.nativeEvent)==null?void 0:e.isComposing)??t.isComposing}var gt=t=>t.id;function Re(t,e,n=gt){return t.find(s=>n(s)===e)}function yt(t,e,n=gt){const s=Re(t,e,n);return s?t.indexOf(s):-1}function es(t,e,n=!0){let s=yt(t,e);return s=n?(s+1)%t.length:Math.min(s+1,t.length-1),t[s]}function ns(t,e,n=!0){let s=yt(t,e);return s===-1?n?t[t.length-1]:null:(s=n?(s-1+t.length)%t.length:Math.max(0,s-1),t[s])}var Pe=t=>t.split("").map(e=>{const n=e.charCodeAt(0);return n>0&&n<128?e:n>=128&&n<=255?`/x${n.toString(16)}`.replace("/","\\"):""}).join("").trim(),Me=t=>Pe(t.dataset.valuetext??t.textContent??""),Ce=(t,e)=>t.trim().toLowerCase().startsWith(e.toLowerCase()),_e=(t,e)=>t.map((n,s)=>t[(Math.max(e,0)+s)%t.length]);function De(t,e,n,s=gt){const i=n?yt(t,n,s):-1;let c=n?_e(t,i):t;return e.length===1&&(c=c.filter(r=>s(r)!==n)),c.find(r=>Ce(Me(r),e))}function Ne(t,e){const{state:n,activeId:s,key:i,timeout:c=350,itemToId:u}=e,r=n.keysSoFar+i,o=r.length>1&&Array.from(r).every(m=>m===r[0])?r[0]:r;let f=t.slice();const l=De(f,o,s,u);function d(){clearTimeout(n.timer),n.timer=-1}function p(m){n.keysSoFar=m,d(),m!==""&&(n.timer=+setTimeout(()=>{p(""),d()},c))}return p(r),l}var ss=Object.assign(Ne,{defaultOptions:{keysSoFar:"",timer:-1},isValidEvent:je});function je(t){return t.key.length===1&&!t.ctrlKey&&!t.metaKey}var Q=new WeakMap;function rs(t){return Q.has(t)||Q.set(t,$(t).getComputedStyle(t)),Q.get(t)}function Ie(t){if(kt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||at(t)&&t.host||we(t);return at(e)?e.host:e}var mt=t=>typeof t=="object"&&t!==null&&t.nodeType===1,zt=t=>mt(t)&&t.tagName==="IFRAME";function Le(t){return mt(t)?t.offsetWidth>0||t.offsetHeight>0||t.getClientRects().length>0:!1}function We(t){return parseInt(t.getAttribute("tabindex")||"0",10)<0}var vt="input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type",Fe=(t,e=!1)=>{if(!t)return[];const n=Array.from(t.querySelectorAll(vt));(e==!0||e=="if-empty"&&n.length===0)&&mt(t)&&ct(t)&&n.unshift(t);const i=n.filter(ct);return i.forEach((c,u)=>{if(zt(c)&&c.contentDocument){const r=c.contentDocument.body;i.splice(u,1,...Fe(r))}}),i};function ct(t){return!t||t.closest("[inert]")?!1:t.matches(vt)&&Le(t)}function U(t,e){if(!t)return[];const n=Array.from(t.querySelectorAll(vt)),s=n.filter(Pt);return e&&Pt(t)&&s.unshift(t),s.forEach((i,c)=>{if(zt(i)&&i.contentDocument){const u=i.contentDocument.body,r=U(u);s.splice(c,1,...r)}}),!s.length&&e?n:s}function Pt(t){return t!=null&&t.tabIndex>0?!0:ct(t)&&!We(t)}function Yt(t,e){const n=U(t,e),s=n[0]||null,i=n[n.length-1]||null;return[s,i]}function Ke(t,e){const n=U(t),s=(t==null?void 0:t.ownerDocument)||document,i=e??s.activeElement;if(!i)return null;const c=n.indexOf(i);return n[c+1]||null}function is(t){const{root:e,getInitialEl:n,filter:s,enabled:i=!0}=t;if(!i)return;let c=null;if(c||(c=typeof n=="function"?n():n),c||(c=e==null?void 0:e.querySelector("[data-autofocus],[autofocus]")),!c){const u=U(e);c=s?u.filter(s)[0]:u[0]}return c||e||void 0}function os(t){const e=t.currentTarget;if(!e)return!1;const[n,s]=Yt(e),i=e.ownerDocument||document;return!(i.activeElement===n&&t.shiftKey||i.activeElement===s&&!t.shiftKey||!n&&!s)}function as(t){if(t==null||!C(t))return!1;try{const e=$(t);return t instanceof e.HTMLInputElement&&t.selectionStart!=null||/(textarea|select)/.test(t.localName)||t.isContentEditable}catch{return!1}}function $e(t){return t.parentElement&&$e(t.parentElement)?!0:t.hidden}var ke=/auto|scroll|overlay|hidden|clip/;function Et(t){const e=$(t),{overflow:n,overflowX:s,overflowY:i,display:c}=e.getComputedStyle(t);return ke.test(n+i+s)&&!["inline","contents"].includes(c)}function cs(t){const e=new Set;function n(s){const i=globalThis.requestAnimationFrame(s);e.add(()=>globalThis.cancelAnimationFrame(i))}return n(()=>n(t)),function(){e.forEach(i=>i())}}function bt(t){const e=globalThis.requestAnimationFrame(t);return()=>{globalThis.cancelAnimationFrame(e)}}function Ve(t,e){if(!t)return;const{attributes:n,callback:s}=e,i=t.ownerDocument.defaultView||window,c=new i.MutationObserver(u=>{for(const r of u)r.type==="attributes"&&r.attributeName&&n.includes(r.attributeName)&&s(r)});return c.observe(t,{attributes:!0,attributeFilter:n}),()=>c.disconnect()}function us(t,e){const{defer:n}=e,s=n?bt:c=>c(),i=[];return i.push(s(()=>{const c=typeof t=="function"?t():t;i.push(Ve(c,e))})),()=>{i.forEach(c=>c==null?void 0:c())}}function ze(t,e){const{callback:n}=e;if(!t)return;const s=t.ownerDocument.defaultView||window,i=new s.MutationObserver(n);return i.observe(t,{childList:!0,subtree:!0}),()=>i.disconnect()}function fs(t,e){const{defer:n}=e,s=n?bt:c=>c(),i=[];return i.push(s(()=>{const c=typeof t=="function"?t():t;i.push(ze(c,e))})),()=>{i.forEach(c=>c==null?void 0:c())}}function Bt(t){const e=Ie(t);return ve(e)?ht(e).body:C(e)&&Et(e)?e:Bt(e)}function Ye(t,e=[]){const n=Bt(t),s=n===t.ownerDocument.body,i=$(n);return s?e.concat(i,i.visualViewport||[],Et(n)?n:[]):e.concat(n,Ye(n,[]))}function Be(t,e={}){const{triggerElement:n,onFocus:s}=e,i=(t==null?void 0:t.ownerDocument)||document,c=i.body;function u(r){if(r.key!=="Tab")return;let a=null;const[o,f]=Yt(t,!0),l=!o&&!f;r.shiftKey&&(i.activeElement===o||l)?a=n:!r.shiftKey&&i.activeElement===n?a=o:!r.shiftKey&&(i.activeElement===f||l)&&(a=Ke(c,n)),a&&(r.preventDefault(),typeof s=="function"?s(a):a.focus())}return i==null||i.addEventListener("keydown",u,!0),()=>{i==null||i.removeEventListener("keydown",u,!0)}}function ls(t,e){const{defer:n,triggerElement:s,...i}=e,c=n?bt:r=>r(),u=[];return u.push(c(()=>{const r=typeof t=="function"?t():t,a=typeof s=="function"?s():s;u.push(Be(r,{triggerElement:a,...i}))})),()=>{u.forEach(r=>r==null?void 0:r())}}function hs(t,e){return Array.from((t==null?void 0:t.querySelectorAll(e))??[])}function ds(t,e){return(t==null?void 0:t.querySelector(e))??null}function ps(t){const e={getRootNode:n=>{var s;return((s=n.getRootNode)==null?void 0:s.call(n))??document},getDoc:n=>ht(e.getRootNode(n)),getWin:n=>e.getDoc(n).defaultView??window,getActiveElement:n=>e.getRootNode(n).activeElement,isActiveElement:(n,s)=>s===e.getActiveElement(n),getById:(n,s)=>e.getRootNode(n).getElementById(s),setValue:(n,s)=>{if(n==null||s==null)return;const i=s.toString();n.value!==i&&(n.value=s.toString())}};return{...e,...t}}function qe(t){return t.scrollHeight>t.clientHeight||t.scrollWidth>t.clientWidth}function gs(t,e){const{rootEl:n,...s}=e||{};!t||!n||!Et(n)||!qe(n)||t.scrollIntoView(s)}var tt=new WeakMap;function Ge(t,e,n){tt.has(t)||tt.set(t,new Map);const s=tt.get(t),i=s.get(e);if(!i)return s.set(e,n()),()=>{var r;(r=s.get(e))==null||r(),s.delete(e)};const c=n(),u=()=>{c(),i(),s.delete(e)};return s.set(e,u),()=>{s.get(e)===u&&(c(),s.set(e,i))}}function ys(t,e){return t?Ge(t,"style",()=>{const s=t.style.cssText;return Object.assign(t.style,e),()=>{t.style.cssText=s}}):()=>{}}var ms={border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px",whiteSpace:"nowrap",wordWrap:"normal"},He=1e3/60;function Ue(t,e){const n=t();if(C(n)&&n.isConnected)return e(n),()=>{};{const s=setInterval(()=>{const i=t();C(i)&&i.isConnected&&(e(i),clearInterval(s))},He);return()=>clearInterval(s)}}function vs(t,e){const n=[];return t==null||t.forEach(s=>{const i=Ue(s,e);n.push(i)}),()=>{n.forEach(s=>s())}}const Xe=Symbol(),wt=Symbol(),W="a",qt="f",Mt="p",Gt="c",Ht="t",et="n",nt="g",Ut="h",z="w",Xt="o",Zt="k";let Ze=(t,e)=>new Proxy(t,e);const ut=Object.getPrototypeOf,ft=new WeakMap,Jt=t=>t&&(ft.has(t)?ft.get(t):ut(t)===Object.prototype||ut(t)===Array.prototype),Ct=t=>typeof t=="object"&&t!==null,Je=t=>Object.values(Object.getOwnPropertyDescriptors(t)).some(e=>!e.configurable&&!e.writable),Qe=t=>{if(Array.isArray(t))return Array.from(t);const e=Object.getOwnPropertyDescriptors(t);return Object.values(e).forEach(n=>{n.configurable=!0}),Object.create(ut(t),e)},tn=(t,e)=>{const n={[qt]:e};let s=!1;const i=(r,a)=>{if(!s){let o=n[W].get(t);if(o||(o={},n[W].set(t,o)),r===z)o[z]=!0;else{let f=o[r];f||(f=new Set,o[r]=f),f.add(a)}}},c=()=>{s=!0,n[W].delete(t)},u={get(r,a){return a===wt?t:(i(Zt,a),te(Reflect.get(r,a),n[W],n[Gt],n[Ht]))},has(r,a){return a===Xe?(c(),!0):(i(Ut,a),Reflect.has(r,a))},getOwnPropertyDescriptor(r,a){return i(Xt,a),Reflect.getOwnPropertyDescriptor(r,a)},ownKeys(r){return i(z),Reflect.ownKeys(r)}};return e&&(u.set=u.deleteProperty=()=>!1),[u,n]},Qt=t=>t[wt]||t,te=(t,e,n,s)=>{if(!Jt(t))return t;let i=s&&s.get(t);if(!i){const a=Qt(t);Je(a)?i=[a,Qe(a)]:i=[a],s==null||s.set(t,i)}const[c,u]=i;let r=n&&n.get(c);return(!r||r[1][qt]!==!!u)&&(r=tn(c,!!u),r[1][Mt]=Ze(u||c,r[0]),n&&n.set(c,r)),r[1][W]=e,r[1][Gt]=n,r[1][Ht]=s,r[1][Mt]},en=(t,e)=>{const n=Reflect.ownKeys(t),s=Reflect.ownKeys(e);return n.length!==s.length||n.some((i,c)=>i!==s[c])},ee=(t,e,n,s,i=Object.is)=>{if(i(t,e))return!1;if(!Ct(t)||!Ct(e))return!0;const c=n.get(Qt(t));if(!c)return!0;if(s){const r=s.get(t);if(r&&r[et]===e)return r[nt];s.set(t,{[et]:e,[nt]:!1})}let u=null;try{for(const r of c[Ut]||[])if(u=Reflect.has(t,r)!==Reflect.has(e,r),u)return u;if(c[z]===!0){if(u=en(t,e),u)return u}else for(const r of c[Xt]||[]){const a=!!Reflect.getOwnPropertyDescriptor(t,r),o=!!Reflect.getOwnPropertyDescriptor(e,r);if(u=a!==o,u)return u}for(const r of c[Zt]||[])if(u=ee(t[r],e[r],n,s,i),u)return u;return u===null&&(u=!0),u}finally{s&&s.set(t,{[et]:e,[nt]:u})}},nn=t=>Jt(t)&&t[wt]||null,_t=(t,e=!0)=>{ft.set(t,e)};function sn(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global}function St(t,e){const n=sn();return n?(n[t]||(n[t]=e()),n[t]):e()}var st=t=>typeof t=="object"&&t!==null,_=St("__zag__proxyStateMap",()=>new WeakMap),F=St("__zag__refSet",()=>new WeakSet),rn=(t=Object.is,e=(o,f)=>new Proxy(o,f),n=o=>st(o)&&!F.has(o)&&(Array.isArray(o)||!(Symbol.iterator in o))&&!(o instanceof WeakMap)&&!(o instanceof WeakSet)&&!(o instanceof Error)&&!(o instanceof Number)&&!(o instanceof Date)&&!(o instanceof String)&&!(o instanceof RegExp)&&!(o instanceof ArrayBuffer),s=o=>{switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:throw o}},i=new WeakMap,c=(o,f,l=s)=>{const d=i.get(o);if((d==null?void 0:d[0])===f)return d[1];const p=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));return _t(p,!0),i.set(o,[f,p]),Reflect.ownKeys(o).forEach(m=>{const E=Reflect.get(o,m);F.has(E)?(_t(E,!1),p[m]=E):E instanceof Promise?Object.defineProperty(p,m,{get(){return l(E)}}):_.has(E)?p[m]=M(E,l):p[m]=E}),Object.freeze(p)},u=new WeakMap,r=[1,1],a=o=>{if(!st(o))throw new Error("object required");const f=u.get(o);if(f)return f;let l=r[0];const d=new Set,p=(v,g=++r[0])=>{l!==g&&(l=g,d.forEach(y=>y(v,g)))};let m=r[1];const E=(v=++r[1])=>(m!==v&&!d.size&&(m=v,x.forEach(([g])=>{const y=g[1](v);y>l&&(l=y)})),l),T=v=>(g,y)=>{const w=[...g];w[1]=[v,...w[1]],p(w,y)},x=new Map,xt=(v,g)=>{if(d.size){const y=g[3](T(v));x.set(v,[g,y])}else x.set(v,[g])},Ot=v=>{var y;const g=x.get(v);g&&(x.delete(v),(y=g[1])==null||y.call(g))},ue=v=>(d.add(v),d.size===1&&x.forEach(([y,w],D)=>{const I=y[3](T(D));x.set(D,[y,I])}),()=>{d.delete(v),d.size===0&&x.forEach(([y,w],D)=>{w&&(w(),x.set(D,[y]))})}),Z=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),k=e(Z,{deleteProperty(v,g){const y=Reflect.get(v,g);Ot(g);const w=Reflect.deleteProperty(v,g);return w&&p(["delete",[g],y]),w},set(v,g,y,w){var Rt;const D=Reflect.has(v,g),I=Reflect.get(v,g,w);if(D&&(t(I,y)||u.has(y)&&t(I,u.get(y))))return!0;Ot(g),st(y)&&(y=nn(y)||y);let V=y;if(!((Rt=Object.getOwnPropertyDescriptor(v,g))!=null&&Rt.set))if(y instanceof Promise)y.then(R=>{Object.assign(y,{status:"fulfilled",value:R}),p(["resolve",[g],R])}).catch(R=>{Object.assign(y,{status:"rejected",reason:R}),p(["reject",[g],R])});else{!_.has(y)&&n(y)&&(V=At(y));const R=!F.has(V)&&_.get(V);R&&xt(g,R)}return Reflect.set(v,g,V,w),p(["set",[g],y,I]),!0}});u.set(o,k);const fe=[Z,E,c,ue];return _.set(k,fe),Reflect.ownKeys(o).forEach(v=>{const g=Object.getOwnPropertyDescriptor(o,v);g.get||g.set?Object.defineProperty(Z,v,g):k[v]=o[v]}),k})=>[a,_,F,t,e,n,s,i,c,u,r],[on]=rn();function At(t={}){return on(t)}function lt(t,e,n){const s=_.get(t);let i;const c=[],u=s[3];let r=!1;const o=u(f=>{if(c.push(f),n){e(c.splice(0));return}i||(i=Promise.resolve().then(()=>{i=void 0,r&&e(c.splice(0))}))});return r=!0,()=>{r=!1,o()}}function M(t,e){const n=_.get(t),[s,i,c]=n;return c(s,i(),e)}function Dt(t){return F.add(t),t}function an(t,e){Object.keys(e).forEach(i=>{if(Object.getOwnPropertyDescriptor(t,i))throw new Error("object property already defined");const c=e[i],{get:u,set:r}=typeof c=="function"?{get:c}:c,a={};a.get=()=>u(M(s)),r&&(a.set=o=>r(s,o)),Object.defineProperty(t,i,a)});const s=At(t);return s}function Nt(t,e,n){typeof n.value=="object"&&(n.value=j(n.value)),!n.enumerable||n.get||n.set||!n.configurable||!n.writable||e==="__proto__"?Object.defineProperty(t,e,n):t[e]=n.value}function j(t){if(typeof t!="object")return t;var e=0,n,s,i,c=Object.prototype.toString.call(t);if(c==="[object Object]"?i=Object.create(t.__proto__||null):c==="[object Array]"?i=Array(t.length):c==="[object Set]"?(i=new Set,t.forEach(function(u){i.add(j(u))})):c==="[object Map]"?(i=new Map,t.forEach(function(u,r){i.set(j(r),j(u))})):c==="[object Date]"?i=new Date(+t):c==="[object RegExp]"?i=new RegExp(t.source,t.flags):c==="[object DataView]"?i=new t.constructor(j(t.buffer)):c==="[object ArrayBuffer]"?i=t.slice(0):c.slice(-6)==="Array]"&&(i=new t.constructor(t)),i){for(s=Object.getOwnPropertySymbols(t);e<s.length;e++)Nt(i,s[e],Object.getOwnPropertyDescriptor(t,s[e]));for(e=0,s=Object.getOwnPropertyNames(t);e<s.length;e++)Object.hasOwnProperty.call(i,n=s[e])&&i[n]===t[n]||Nt(i,n,Object.getOwnPropertyDescriptor(t,n))}return i||t}var cn=Object.defineProperty,un=(t,e,n)=>e in t?cn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,h=(t,e,n)=>un(t,typeof e!="symbol"?e+"":e,n);function fn(t){for(;t.length>0;)t.pop();return t}var jt=(t,...e)=>(typeof t=="function"?t(...e):t)??void 0,O=t=>t,ln=()=>{},hn=(...t)=>(...e)=>{t.forEach(function(n){n==null||n(...e)})},It=(()=>{let t=0;return()=>(t++,t.toString(36))})(),B=t=>Array.isArray(t),K=t=>!(t==null||typeof t!="object"||B(t)),dn=t=>typeof t=="number"&&!Number.isNaN(t),S=t=>typeof t=="string",q=t=>typeof t=="function",pn=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);function G(t){if(!gn(t)||t===void 0)return t;const e=Reflect.ownKeys(t).filter(s=>typeof s=="string"),n={};for(const s of e){const i=t[s];i!==void 0&&(n[s]=G(i))}return n}var gn=t=>t&&typeof t=="object"&&t.constructor===Object;function rt(...t){const e=t.length===1?t[0]:t[1],n=t.length===2?t[0]:!0}function Y(...t){const e=t.length===1?t[0]:t[1],n=t.length===2?t[0]:!0}function ne(t,...e){for(const n of e){const s=G(n);for(const i in s)K(n[i])?(t[i]||(t[i]={}),ne(t[i],n[i])):t[i]=n[i]}return t}function Lt(t){return j(t)}function A(t){return S(t)?{type:t}:t}function P(t){return t?B(t)?t.slice():[t]:[]}function se(t){return K(t)&&t.predicate!=null}var re=()=>!0;function X(t,e,n,s){return i=>{var c;return S(i)?!!((c=t[i])!=null&&c.call(t,e,n,s)):q(i)?i(e,n,s):i.predicate(t)(e,n,s)}}function yn(...t){return{predicate:e=>(n,s,i)=>t.map(X(e,n,s,i)).some(Boolean)}}function mn(...t){return{predicate:e=>(n,s,i)=>t.map(X(e,n,s,i)).every(Boolean)}}function vn(t){return{predicate:e=>(n,s,i)=>!X(e,n,s,i)(t)}}function En(...t){return(e,n,s)=>s.state.matches(...t)}var Es={or:yn,and:mn,not:vn,stateIn:En};function bs(t){return{predicate:e=>(n,s,i)=>{var c;return(c=t.find(u=>{const r=u.guard??re;return X(e,n,s,i)(r)}))==null?void 0:c.actions}}}function ie(t,e){return t=t??re,(n,s,i)=>{if(S(t)){const c=e[t];return q(c)?c(n,s,i):c}return se(t)?t.predicate(e)(n,s,i):t==null?void 0:t(n,s,i)}}function it(t,e){return(n,s,i)=>se(t)?t.predicate(e)(n,s,i):t}function bn(t){var c,u;const e=t.computed??O({}),n=t.context??O({}),s=t.initial?(u=(c=t.states)==null?void 0:c[t.initial])==null?void 0:u.tags:[],i=At({value:t.initial??"",previousValue:"",event:O({}),previousEvent:O({}),context:an(n,e),done:!1,tags:s??[],hasTag(r){return this.tags.includes(r)},matches(...r){return r.includes(this.value)},can(r){return O(this).nextEvents.includes(r)},get nextEvents(){var o,f;const r=((f=(o=t.states)==null?void 0:o[this.value])==null?void 0:f.on)??{},a=(t==null?void 0:t.on)??{};return Object.keys({...r,...a})},get changed(){return this.event.value==="machine.init"||!this.previousValue?!1:this.value!==this.previousValue}});return O(i)}function L(t,e){return(n,s)=>{if(dn(t))return t;if(q(t))return t(n,s);if(S(t)){const i=Number.parseFloat(t);if(!Number.isNaN(i))return i;if(e){const c=e==null?void 0:e[t];return Y(c==null,`[@zag-js/core > determine-delay] Cannot determine delay for \`${t}\`. It doesn't exist in \`options.delays\``),q(c)?c(n,s):c}}}}function wn(t){return S(t)?{target:t}:t}function Sn(t,e){return(n,s,i)=>P(t).map(wn).find(c=>ie(c.guard,e)(n,s,i)??c.target??c.actions)}var oe=class{constructor(t,e){var n,s,i,c,u;h(this,"status","Not Started"),h(this,"state"),h(this,"initialState"),h(this,"initialContext"),h(this,"id"),h(this,"type","machine"),h(this,"activityEvents",new Map),h(this,"delayedEvents",new Map),h(this,"stateListeners",new Set),h(this,"doneListeners",new Set),h(this,"contextWatchers",new Set),h(this,"removeStateListener",ln),h(this,"parent"),h(this,"children",new Map),h(this,"guardMap"),h(this,"actionMap"),h(this,"delayMap"),h(this,"activityMap"),h(this,"sync"),h(this,"options"),h(this,"config"),h(this,"_created",()=>{var a;const r=A("machine.created");this.executeActions((a=this.config)==null?void 0:a.created,r)}),h(this,"start",r=>{if(this.state.value="",this.state.tags=[],this.status==="Running")return this;this.status="Running",this.removeStateListener=lt(this.state,()=>{this.stateListeners.forEach(p=>{p(this.stateSnapshot)})},this.sync),this.setupContextWatchers(),this.executeActivities(A("machine.start"),P(this.config.activities),"machine.start"),this.executeActions(this.config.entry,A("machine.start"));const a=A("machine.init"),o=K(r)?r.value:r,f=K(r)?r.context:void 0;f&&this.setContext(f);const l={target:o??this.config.initial},d=this.getNextStateInfo(l,a);return this.initialState=d,this.performStateChangeEffects(this.state.value,d,a),this}),h(this,"setupContextWatchers",()=>{const{watch:r}=this.config;if(!r)return;let a=M(this.state.context);const o=lt(this.state.context,()=>{var l;const f=M(this.state.context);for(const[d,p]of Object.entries(r))(((l=this.options.compareFns)==null?void 0:l[d])??Object.is)(a[d],f[d])||this.executeActions(p,this.state.event);a=f});this.contextWatchers.add(o)}),h(this,"stop",()=>{if(this.status!=="Stopped")return this.performExitEffects(this.state.value,A("machine.stop")),this.executeActions(this.config.exit,A("machine.stop")),this.setState(""),this.setEvent("machine.stop"),this.stopStateListeners(),this.stopChildren(),this.stopActivities(),this.stopDelayedEvents(),this.stopContextWatchers(),this.status="Stopped",this}),h(this,"stopStateListeners",()=>{this.removeStateListener(),this.stateListeners.clear()}),h(this,"stopContextWatchers",()=>{this.contextWatchers.forEach(r=>r()),this.contextWatchers.clear()}),h(this,"stopDelayedEvents",()=>{this.delayedEvents.forEach(r=>{r.forEach(a=>a())}),this.delayedEvents.clear()}),h(this,"stopActivities",r=>{var a,o;r?((a=this.activityEvents.get(r))==null||a.forEach(f=>f()),(o=this.activityEvents.get(r))==null||o.clear(),this.activityEvents.delete(r)):(this.activityEvents.forEach(f=>{f.forEach(l=>l()),f.clear()}),this.activityEvents.clear())}),h(this,"sendChild",(r,a)=>{const o=A(r),f=jt(a,this.contextSnapshot),l=this.children.get(f);l||Y(`[@zag-js/core] Cannot send '${o.type}' event to unknown child`),l.send(o)}),h(this,"stopChild",r=>{this.children.has(r)||Y(`[@zag-js/core > stop-child] Cannot stop unknown child ${r}`),this.children.get(r).stop(),this.children.delete(r)}),h(this,"removeChild",r=>{this.children.delete(r)}),h(this,"stopChildren",()=>{this.children.forEach(r=>r.stop()),this.children.clear()}),h(this,"setParent",r=>{this.parent=r}),h(this,"spawn",(r,a)=>{const o=jt(r);return a&&(o.id=a),o.type="machine.actor",o.setParent(this),this.children.set(o.id,O(o)),o.onDone(()=>{this.removeChild(o.id)}).start(),O(Dt(o))}),h(this,"stopActivity",r=>{var o;if(!this.state.value)return;const a=this.activityEvents.get(this.state.value);(o=a==null?void 0:a.get(r))==null||o(),a==null||a.delete(r)}),h(this,"addActivityCleanup",(r,a,o)=>{var f;r&&(this.activityEvents.has(r)?(f=this.activityEvents.get(r))==null||f.set(a,o):this.activityEvents.set(r,new Map([[a,o]])))}),h(this,"setState",r=>{this.state.previousValue=this.state.value,this.state.value=r;const a=this.getStateNode(r);r==null?fn(this.state.tags):this.state.tags=P(a==null?void 0:a.tags)}),h(this,"setContext",r=>{r&&ne(this.state.context,G(r))}),h(this,"setOptions",r=>{const a=G(r);this.actionMap={...this.actionMap,...a.actions},this.delayMap={...this.delayMap,...a.delays},this.activityMap={...this.activityMap,...a.activities},this.guardMap={...this.guardMap,...a.guards}}),h(this,"getStateNode",r=>{var a;if(r)return(a=this.config.states)==null?void 0:a[r]}),h(this,"getNextStateInfo",(r,a)=>{const o=this.determineTransition(r,a),f=!(o!=null&&o.target),l=(o==null?void 0:o.target)??this.state.value,d=this.state.value!==l,p=this.getStateNode(l),E={reenter:!f&&!d&&!(o!=null&&o.internal),transition:o,stateNode:p,target:l,changed:d};return this.log("NextState:",`[${a.type}]`,this.state.value,"---->",E.target),E}),h(this,"getAfterActions",(r,a)=>{let o;return{entry:()=>{o=globalThis.setTimeout(()=>{const f=this.getNextStateInfo(r,this.state.event);this.performStateChangeEffects(this.state.value,f,this.state.event)},a)},exit:()=>{globalThis.clearTimeout(o)}}}),h(this,"getDelayedEventActions",r=>{const a=this.getStateNode(r),o=this.state.event;if(!a||!a.after)return;const f=[],l=[];if(B(a.after)){const d=this.determineTransition(a.after,o);if(!d)return;if(!pn(d,"delay"))throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(d)}`);const m=L(d.delay,this.delayMap)(this.contextSnapshot,o),E=this.getAfterActions(d,m);return f.push(E.entry),l.push(E.exit),{entries:f,exits:l}}if(K(a.after))for(const d in a.after){const p=a.after[d],E=L(d,this.delayMap)(this.contextSnapshot,o),T=this.getAfterActions(p,E);f.push(T.entry),l.push(T.exit)}return{entries:f,exits:l}}),h(this,"executeActions",(r,a)=>{var f;const o=it(r,this.guardMap)(this.contextSnapshot,a,this.guardMeta);for(const l of P(o)){const d=S(l)?(f=this.actionMap)==null?void 0:f[l]:l;rt(S(l)&&!d,`[@zag-js/core > execute-actions] No implementation found for action: \`${l}\``),d==null||d(this.state.context,a,this.meta)}}),h(this,"executeActivities",(r,a,o)=>{var f;for(const l of a){const d=S(l)?(f=this.activityMap)==null?void 0:f[l]:l;if(!d){rt(`[@zag-js/core > execute-activity] No implementation found for activity: \`${l}\``);continue}const p=d(this.state.context,r,this.meta);if(p){const m=S(l)?l:l.name||It();this.addActivityCleanup(o??this.state.value,m,p)}}}),h(this,"createEveryActivities",(r,a)=>{if(r)if(B(r)){const o=P(r).find(p=>{const m=p.delay,T=L(m,this.delayMap)(this.contextSnapshot,this.state.event);return ie(p.guard,this.guardMap)(this.contextSnapshot,this.state.event,this.guardMeta)??T!=null});if(!o)return;const l=L(o.delay,this.delayMap)(this.contextSnapshot,this.state.event);a(()=>{const p=globalThis.setInterval(()=>{this.executeActions(o.actions,this.state.event)},l);return()=>{globalThis.clearInterval(p)}})}else for(const o in r){const f=r==null?void 0:r[o],d=L(o,this.delayMap)(this.contextSnapshot,this.state.event);a(()=>{const m=globalThis.setInterval(()=>{this.executeActions(f,this.state.event)},d);return()=>{globalThis.clearInterval(m)}})}}),h(this,"setEvent",r=>{this.state.previousEvent=this.state.event,this.state.event=Dt(A(r))}),h(this,"performExitEffects",(r,a)=>{const o=this.state.value;if(o==="")return;const f=r?this.getStateNode(r):void 0;this.stopActivities(o);const l=it(f==null?void 0:f.exit,this.guardMap)(this.contextSnapshot,a,this.guardMeta),d=P(l),p=this.delayedEvents.get(o);p&&d.push(...p),this.executeActions(d,a)}),h(this,"performEntryEffects",(r,a)=>{const o=this.getStateNode(r),f=P(o==null?void 0:o.activities);this.createEveryActivities(o==null?void 0:o.every,m=>{f.unshift(m)}),f.length>0&&this.executeActivities(a,f);const l=it(o==null?void 0:o.entry,this.guardMap)(this.contextSnapshot,a,this.guardMeta),d=P(l),p=this.getDelayedEventActions(r);o!=null&&o.after&&p&&(this.delayedEvents.set(r,p==null?void 0:p.exits),d.push(...p.entries)),this.executeActions(d,a),(o==null?void 0:o.type)==="final"&&(this.state.done=!0,this.doneListeners.forEach(m=>{m(this.stateSnapshot)}),this.stop())}),h(this,"performTransitionEffects",(r,a)=>{const o=this.determineTransition(r,a);this.executeActions(o==null?void 0:o.actions,a)}),h(this,"performStateChangeEffects",(r,a,o)=>{this.setEvent(o);const f=a.changed||a.reenter;f&&this.performExitEffects(r,o),this.performTransitionEffects(a.transition,o),this.setState(a.target),f&&this.performEntryEffects(a.target,o)}),h(this,"determineTransition",(r,a)=>{const o=Sn(r,this.guardMap);return o==null?void 0:o(this.contextSnapshot,a,this.guardMeta)}),h(this,"sendParent",r=>{var o;this.parent||Y("[@zag-js/core > send-parent] Cannot send event to an unknown parent");const a=A(r);(o=this.parent)==null||o.send(a)}),h(this,"log",(...r)=>{}),h(this,"send",r=>{const a=A(r);this.transition(this.state.value,a)}),h(this,"transition",(r,a)=>{var p,m;const o=S(r)?this.getStateNode(r):r==null?void 0:r.stateNode,f=A(a);if(!o&&!this.config.on){const E=this.status==="Stopped"?"[@zag-js/core > transition] Cannot transition a stopped machine":`[@zag-js/core > transition] State does not have a definition for \`state\`: ${r}, \`event\`: ${f.type}`;rt(E);return}const l=((p=o==null?void 0:o.on)==null?void 0:p[f.type])??((m=this.config.on)==null?void 0:m[f.type]),d=this.getNextStateInfo(l,f);return this.performStateChangeEffects(this.state.value,d,f),d.stateNode}),h(this,"subscribe",r=>(this.stateListeners.add(r),this.status==="Running"&&r(this.stateSnapshot),()=>{this.stateListeners.delete(r)})),h(this,"onDone",r=>(this.doneListeners.add(r),this)),h(this,"onTransition",r=>(this.stateListeners.add(r),this.status==="Running"&&r(this.stateSnapshot),this)),this.config=Lt(t),this.options=Lt(e??{}),this.id=this.config.id??`machine-${It()}`,this.guardMap=((n=this.options)==null?void 0:n.guards)??{},this.actionMap=((s=this.options)==null?void 0:s.actions)??{},this.delayMap=((i=this.options)==null?void 0:i.delays)??{},this.activityMap=((c=this.options)==null?void 0:c.activities)??{},this.sync=((u=this.options)==null?void 0:u.sync)??!1,this.state=bn(this.config),this.initialContext=M(this.state.context)}get stateSnapshot(){return O(M(this.state))}getState(){return this.stateSnapshot}get contextSnapshot(){return this.stateSnapshot.context}get self(){const t=this;return{id:this.id,send:this.send.bind(this),sendParent:this.sendParent.bind(this),sendChild:this.sendChild.bind(this),stop:this.stop.bind(this),stopChild:this.stopChild.bind(this),spawn:this.spawn.bind(this),stopActivity:this.stopActivity.bind(this),get state(){return t.stateSnapshot},get initialContext(){return t.initialContext},get initialState(){var e;return((e=t.initialState)==null?void 0:e.target)??""}}}get meta(){var t;return{state:this.stateSnapshot,guards:this.guardMap,send:this.send.bind(this),self:this.self,initialContext:this.initialContext,initialState:((t=this.initialState)==null?void 0:t.target)??"",getState:()=>this.stateSnapshot,getAction:e=>this.actionMap[e],getGuard:e=>this.guardMap[e]}}get guardMeta(){return{state:this.stateSnapshot}}get[Symbol.toStringTag](){return"Machine"}getHydrationState(){const t=this.getState();return{value:t.value,tags:t.tags}}},ws=(t,e)=>new oe(t,e),Ss=t=>t instanceof oe||(t==null?void 0:t.type)==="machine",An=(...t)=>t.map(e=>{var n;return(n=e==null?void 0:e.trim)==null?void 0:n.call(e)}).filter(Boolean).join(" "),Tn=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g,Wt=t=>{const e={};let n;for(;n=Tn.exec(t);)e[n[1]]=n[2];return e},xn=(t,e)=>{if(S(t)){if(S(e))return`${t};${e}`;t=Wt(t)}else S(e)&&(e=Wt(e));return Object.assign({},t??{},e??{})};function On(...t){let e={};for(let n of t){for(let s in e){if(s.startsWith("on")&&typeof e[s]=="function"&&typeof n[s]=="function"){e[s]=hn(n[s],e[s]);continue}if(s==="className"||s==="class"){e[s]=An(e[s],n[s]);continue}if(s==="style"){e[s]=xn(e[s],n[s]);continue}e[s]=n[s]!==void 0?n[s]:e[s]}for(let s in n)e[s]===void 0&&(e[s]=n[s])}return e}function Rn(t){return new Proxy({},{get(){return t}})}var As=()=>t=>Array.from(new Set(t)),Ts=Rn(t=>t),Ft=t=>(t==null?void 0:t.constructor.name)==="Array",Pn=(t,e)=>{if(t.length!==e.length)return!1;for(let n=0;n<t.length;n++)if(!Tt(t[n],e[n]))return!1;return!0},Tt=(t,e)=>{if(Object.is(t,e))return!0;if(t==null&&e!=null||t!=null&&e==null)return!1;if(typeof(t==null?void 0:t.isEqual)=="function"&&typeof(e==null?void 0:e.isEqual)=="function")return t.isEqual(e);if(typeof t=="function"&&typeof e=="function")return t.toString()===e.toString();if(Ft(t)&&Ft(e))return Pn(Array.from(t),Array.from(e));if(typeof t!="object"||typeof e!="object")return!1;const n=Object.keys(e??Object.create(null)),s=n.length;for(let i=0;i<s;i++)if(!Reflect.has(t,n[i]))return!1;for(let i=0;i<s;i++){const c=n[i];if(!Tt(t[c],e[c]))return!1}return!0};function ae(t){if(!Mn(t)||t===void 0)return t;const e=Reflect.ownKeys(t).filter(s=>typeof s=="string"),n={};for(const s of e){const i=t[s];i!==void 0&&(n[s]=ae(i))}return n}var Mn=t=>t&&typeof t=="object"&&t.constructor===Object;function Cn(t,e){const n=b.useRef(!1),s=b.useRef(!1);b.useEffect(()=>{if(n.current&&s.current)return t();s.current=!0},e),b.useEffect(()=>(n.current=!0,()=>{n.current=!1}),[])}var{use:Kt}=le,_n=St("__zag__targetCache",()=>new WeakMap);function ce(t,e){const{actions:n,context:s,sync:i}=e??{},c=b.useRef(),u=b.useRef(),r=b.useSyncExternalStore(b.useCallback(l=>lt(t.state,l,i),[i]),()=>{const l=M(t.state,Kt);try{if(c.current&&u.current&&!ee(c.current,l,u.current,new WeakMap))return c.current}catch{}return l},()=>M(t.state,Kt));t.setOptions({actions:n});const a=b.useMemo(()=>ae(s??{}),[s]);Cn(()=>{const l=Object.entries(a),d=t.contextSnapshot??{};l.map(([E,T])=>({key:E,curr:T,prev:d[E],equal:Tt(d[E],T)})).every(({equal:E})=>E)||t.setContext(a)},[a]);const o=new WeakMap;b.useEffect(()=>{c.current=r,u.current=o});const f=b.useMemo(()=>new WeakMap,[]);return te(r,o,f,_n)}function xs(t){return[ce(t),t.send]}function Dn(t){const e=b.useRef();return e.current||(e.current={v:t()}),e.current.v}var Nn=typeof document<"u"?b.useLayoutEffect:b.useEffect;function jn(t,e){const{state:n,context:s}=e??{},i=Dn(()=>{const u=typeof t=="function"?t():t;return s&&u.setContext(s),u._created(),u}),c=b.useRef();return Nn(()=>{const u=n??c.current;return i.start(u),()=>{i.stop()}},[]),i}function Os(t,e){const n=jn(t,e);return[ce(n,e),n.send,n]}function In(t,e){typeof t=="function"?t(e):t!=null&&(t.current=e)}function Ln(...t){return e=>{for(const n of t)In(n,e)}}function Wn(t){return"ref"in t.props?t.props.ref:"ref"in t?t.ref:null}const ot=t=>{const e=b.memo(b.forwardRef((n,s)=>{const{asChild:i,children:c,...u}=n;if(!i)return b.createElement(t,{...u,ref:s},c);const r=b.Children.only(c);if(!b.isValidElement(r))return null;const a=Wn(r);return b.cloneElement(r,{...On(u,r.props),ref:s?Ln(s,a):a})}));return e.displayName=t.displayName||t.name,e},Fn=()=>{const t=new Map;return new Proxy(ot,{apply(e,n,s){return ot(s[0])},get(e,n){const s=n;return t.has(s)||t.set(s,ot(s)),t.get(s)}})},Rs=Fn();export{as as $,Os as A,Ln as B,lt as C,Ss as D,Ts as E,xs as F,rs as G,us as H,fs as I,es as J,ns as K,Re as L,qn as M,Zn as N,ts as O,Hn as P,Fe as Q,At as R,Ye as S,is as T,ds as U,Bn as V,bs as W,ls as X,dt as Y,$e as Z,ss as _,J as a,Qn as a0,Jn as a1,gs as a2,os as a3,ps as b,zn as c,Yn as d,ws as e,As as f,Es as g,Rs as h,Xn as i,Gn as j,Un as k,$ as l,On as m,cs as n,ht as o,Oe as p,hs as q,bt as r,be as s,at as t,ct as u,ms as v,C as w,vs as x,ys as y,Dt as z};