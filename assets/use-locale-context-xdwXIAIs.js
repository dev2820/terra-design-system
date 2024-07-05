import{r as w,R as ie}from"./index-CDs2tPxN.js";import"./index-B-yFm4aN.js";import"./jsx-runtime-qGIIFXMu.js";var Z=(t,e=[])=>({parts:(...n)=>{if(oe(e))return Z(t,n);throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")},extendWith:(...n)=>Z(t,[...e,...n]),rename:n=>Z(n,e),keys:()=>e,build:()=>[...new Set(e)].reduce((n,s)=>Object.assign(n,{[s]:{selector:[`&[data-scope="${N(t)}"][data-part="${N(s)}"]`,`& [data-scope="${N(t)}"][data-part="${N(s)}"]`].join(", "),attrs:{"data-scope":N(t),"data-part":N(s)}}}),{})}),N=t=>t.replace(/([A-Z])([A-Z])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),oe=t=>t.length===0,Ln=2147483647,ae=t=>t.nodeType===Node.DOCUMENT_NODE,ce=t=>t!=null&&t===t.window;function ue(t){return ae(t)?t:ce(t)?t.document:(t==null?void 0:t.ownerDocument)??document}var Ct=()=>typeof document<"u";function fe(){const t=navigator.userAgentData;return(t==null?void 0:t.platform)??navigator.platform}var le=t=>Ct()&&t.test(fe()),he=t=>Ct()&&t.test(navigator.vendor),Wn=()=>de()&&he(/apple/i),de=()=>le(/mac|iphone|ipad|ipod/i),Tt=t=>t.id;function pe(t,e,n=Tt){return t.find(s=>n(s)===e)}function Mt(t,e,n=Tt){const s=pe(t,e,n);return s?t.indexOf(s):-1}function kn(t,e,n=!0){let s=Mt(t,e);return s=n?(s+1)%t.length:Math.min(s+1,t.length-1),t[s]}function Fn(t,e,n=!0){let s=Mt(t,e);return s===-1?n?t[t.length-1]:null:(s=n?(s-1+t.length)%t.length:Math.max(0,s-1),t[s])}function Kn(t,e){return Array.from((t==null?void 0:t.querySelectorAll(e))??[])}function zn(t){const e={getRootNode:n=>{var s;return((s=n.getRootNode)==null?void 0:s.call(n))??document},getDoc:n=>ue(e.getRootNode(n)),getWin:n=>e.getDoc(n).defaultView??window,getActiveElement:n=>e.getDoc(n).activeElement,isActiveElement:(n,s)=>s===e.getActiveElement(n),getById:(n,s)=>e.getRootNode(n).getElementById(s),setValue:(n,s)=>{if(n==null||s==null)return;const i=s.toString();n.value!==i&&(n.value=s.toString())}};return{...e,...t}}const ge=Symbol(),ut=Symbol(),L="a",_t="f",yt="p",Nt="c",Dt="t",H="n",J="g",$t="h",V="w",jt="o",It="k";let ye=(t,e)=>new Proxy(t,e);const ot=Object.getPrototypeOf,at=new WeakMap,Lt=t=>t&&(at.has(t)?at.get(t):ot(t)===Object.prototype||ot(t)===Array.prototype),mt=t=>typeof t=="object"&&t!==null,me=t=>Object.values(Object.getOwnPropertyDescriptors(t)).some(e=>!e.configurable&&!e.writable),ve=t=>{if(Array.isArray(t))return Array.from(t);const e=Object.getOwnPropertyDescriptors(t);return Object.values(e).forEach(n=>{n.configurable=!0}),Object.create(ot(t),e)},Ee=(t,e)=>{const n={[_t]:e};let s=!1;const i=(r,c)=>{if(!s){let o=n[L].get(t);if(o||(o={},n[L].set(t,o)),r===V)o[V]=!0;else{let f=o[r];f||(f=new Set,o[r]=f),f.add(c)}}},a=()=>{s=!0,n[L].delete(t)},u={get(r,c){return c===ut?t:(i(It,c),kt(Reflect.get(r,c),n[L],n[Nt],n[Dt]))},has(r,c){return c===ge?(a(),!0):(i($t,c),Reflect.has(r,c))},getOwnPropertyDescriptor(r,c){return i(jt,c),Reflect.getOwnPropertyDescriptor(r,c)},ownKeys(r){return i(V),Reflect.ownKeys(r)}};return e&&(u.set=u.deleteProperty=()=>!1),[u,n]},Wt=t=>t[ut]||t,kt=(t,e,n,s)=>{if(!Lt(t))return t;let i=s&&s.get(t);if(!i){const c=Wt(t);me(c)?i=[c,ve(c)]:i=[c],s==null||s.set(t,i)}const[a,u]=i;let r=n&&n.get(a);return(!r||r[1][_t]!==!!u)&&(r=Ee(a,!!u),r[1][yt]=ye(u||a,r[0]),n&&n.set(a,r)),r[1][L]=e,r[1][Nt]=n,r[1][Dt]=s,r[1][yt]},we=(t,e)=>{const n=Reflect.ownKeys(t),s=Reflect.ownKeys(e);return n.length!==s.length||n.some((i,a)=>i!==s[a])},Ft=(t,e,n,s,i=Object.is)=>{if(i(t,e))return!1;if(!mt(t)||!mt(e))return!0;const a=n.get(Wt(t));if(!a)return!0;if(s){const r=s.get(t);if(r&&r[H]===e)return r[J];s.set(t,{[H]:e,[J]:!1})}let u=null;try{for(const r of a[$t]||[])if(u=Reflect.has(t,r)!==Reflect.has(e,r),u)return u;if(a[V]===!0){if(u=we(t,e),u)return u}else for(const r of a[jt]||[]){const c=!!Reflect.getOwnPropertyDescriptor(t,r),o=!!Reflect.getOwnPropertyDescriptor(e,r);if(u=c!==o,u)return u}for(const r of a[It]||[])if(u=Ft(t[r],e[r],n,s,i),u)return u;return u===null&&(u=!0),u}finally{s&&s.set(t,{[H]:e,[J]:u})}},Se=t=>Lt(t)&&t[ut]||null,vt=(t,e=!0)=>{at.set(t,e)};function Et(t,e,n){typeof n.value=="object"&&(n.value=$(n.value)),!n.enumerable||n.get||n.set||!n.configurable||!n.writable||e==="__proto__"?Object.defineProperty(t,e,n):t[e]=n.value}function $(t){if(typeof t!="object")return t;var e=0,n,s,i,a=Object.prototype.toString.call(t);if(a==="[object Object]"?i=Object.create(t.__proto__||null):a==="[object Array]"?i=Array(t.length):a==="[object Set]"?(i=new Set,t.forEach(function(u){i.add($(u))})):a==="[object Map]"?(i=new Map,t.forEach(function(u,r){i.set($(r),$(u))})):a==="[object Date]"?i=new Date(+t):a==="[object RegExp]"?i=new RegExp(t.source,t.flags):a==="[object DataView]"?i=new t.constructor($(t.buffer)):a==="[object ArrayBuffer]"?i=t.slice(0):a.slice(-6)==="Array]"&&(i=new t.constructor(t)),i){for(s=Object.getOwnPropertySymbols(t);e<s.length;e++)Et(i,s[e],Object.getOwnPropertyDescriptor(t,s[e]));for(e=0,s=Object.getOwnPropertyNames(t);e<s.length;e++)Object.hasOwnProperty.call(i,n=s[e])&&i[n]===t[n]||Et(i,n,Object.getOwnPropertyDescriptor(t,n))}return i||t}function Ae(t,e){return`${t} returned \`undefined\`. Seems you forgot to wrap component within ${e}`}function Kt(t={}){const{name:e,strict:n=!0,hookName:s="useContext",providerName:i="Provider",errorMessage:a,defaultValue:u}=t,r=w.createContext(u);r.displayName=e;function c(){var f;const o=w.useContext(r);if(!o&&n){const l=new Error(a??Ae(s,i));throw l.name="ContextError",(f=Error.captureStackTrace)==null||f.call(Error,l,c),l}return o}return[r.Provider,c,r]}var Q=(t,e=[])=>({parts:(...n)=>{if(be(e))return Q(t,n);throw new Error("createAnatomy().parts(...) should only be called once. Did you mean to use .extendWith(...) ?")},extendWith:(...n)=>Q(t,[...e,...n]),rename:n=>Q(n,e),keys:()=>e,build:()=>[...new Set(e)].reduce((n,s)=>Object.assign(n,{[s]:{selector:[`&[data-scope="${D(t)}"][data-part="${D(s)}"]`,`& [data-scope="${D(t)}"][data-part="${D(s)}"]`].join(", "),attrs:{"data-scope":D(t),"data-part":D(s)}}}),{})}),D=t=>t.replace(/([A-Z])([A-Z])/g,"$1-$2").replace(/([a-z])([A-Z])/g,"$1-$2").replace(/[\s_]+/g,"-").toLowerCase(),be=t=>t.length===0,Vn=t=>t?"":void 0,qn=t=>t?"true":void 0,Bn=2147483647,F=t=>typeof t=="object"&&(t==null?void 0:t.nodeType)===Node.ELEMENT_NODE&&typeof(t==null?void 0:t.nodeName)=="string",zt=t=>t.nodeType===Node.DOCUMENT_NODE,xe=t=>t!=null&&t===t.window,Oe=t=>t.nodeType!==void 0,Pe=t=>t&&Oe(t)&&t.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&"host"in t;function Yn(t,e){return!t||!e||!F(t)||!F(e)?!1:t===e||t.contains(e)}function Re(t){return zt(t)?t:xe(t)?t.document:(t==null?void 0:t.ownerDocument)??document}function Vt(t){var e;return Pe(t)?Vt(t.host):zt(t)?t.defaultView??window:F(t)?((e=t.ownerDocument)==null?void 0:e.defaultView)??window:window}var qt=()=>typeof document<"u";function Ce(){const t=navigator.userAgentData;return(t==null?void 0:t.platform)??navigator.platform}var ft=t=>qt()&&t.test(Ce()),Te=t=>qt()&&t.test(navigator.vendor),Gn=()=>ft(/^Mac/),Un=()=>Me()&&Te(/apple/i),Me=()=>ft(/mac|iphone|ipad|ipod/i),Xn=()=>ft(/iP(hone|ad|od)|iOS/);function _e(t){var e,n,s;return((e=t.composedPath)==null?void 0:e.call(t))??((s=(n=t.nativeEvent)==null?void 0:n.composedPath)==null?void 0:s.call(n))}function Zn(t){const e=_e(t);return(e==null?void 0:e[0])??t.target}function Hn(t){var e;return((e=t.nativeEvent)==null?void 0:e.isComposing)??t.isComposing}var Bt=t=>t.id;function Ne(t,e,n=Bt){return t.find(s=>n(s)===e)}function Yt(t,e,n=Bt){const s=Ne(t,e,n);return s?t.indexOf(s):-1}function Jn(t,e,n=!0){let s=Yt(t,e);return s=n?(s+1)%t.length:Math.min(s+1,t.length-1),t[s]}function Qn(t,e,n=!0){let s=Yt(t,e);return s===-1?n?t[t.length-1]:null:(s=n?(s-1+t.length)%t.length:Math.max(0,s-1),t[s])}var tt=new WeakMap;function ts(t){return tt.has(t)||tt.set(t,Vt(t).getComputedStyle(t)),tt.get(t)}var Gt=t=>typeof t=="object"&&t!==null&&t.nodeType===1,De=t=>Gt(t)&&t.tagName==="IFRAME";function $e(t){return Gt(t)?t.offsetWidth>0||t.offsetHeight>0||t.getClientRects().length>0:!1}function je(t){return parseInt(t.getAttribute("tabindex")||"0",10)<0}var Ut="input:not([type='hidden']):not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], button:not([disabled]), [tabindex], iframe, object, embed, area[href], audio[controls], video[controls], [contenteditable]:not([contenteditable='false']), details > summary:first-of-type";function Ie(t){return!t||t.closest("[inert]")?!1:t.matches(Ut)&&$e(t)}function Xt(t,e){if(!t)return[];const n=Array.from(t.querySelectorAll(Ut)),s=n.filter(Le);return s.forEach((i,a)=>{if(De(i)&&i.contentDocument){const u=i.contentDocument.body,r=Xt(u);s.splice(a,1,...r)}}),!s.length&&e?n:s}function Le(t){return t!=null&&t.tabIndex>0?!0:Ie(t)&&!je(t)}function We(t,e){const[n]=Xt(t,e);return n||null}function es(t){const{root:e,getInitialEl:n,enabled:s=!0}=t;if(!s)return e||void 0;let i=null;return i||(i=typeof n=="function"?n():n),i||(i=e==null?void 0:e.querySelector("[data-autofocus],[autofocus]")),i||(i=We(e)),i||e||void 0}function ns(t){const e=new Set;function n(s){const i=globalThis.requestAnimationFrame(s);e.add(()=>globalThis.cancelAnimationFrame(i))}return n(()=>n(t)),function(){e.forEach(i=>i())}}function Zt(t){const e=globalThis.requestAnimationFrame(t);return()=>{globalThis.cancelAnimationFrame(e)}}function ke(t,e){if(!t)return;const{attributes:n,callback:s}=e,i=t.ownerDocument.defaultView||window,a=new i.MutationObserver(u=>{for(const r of u)r.type==="attributes"&&r.attributeName&&n.includes(r.attributeName)&&s(r)});return a.observe(t,{attributes:!0,attributeFilter:n}),()=>a.disconnect()}function ss(t,e){const{defer:n}=e,s=n?Zt:a=>a(),i=[];return i.push(s(()=>{const a=typeof t=="function"?t():t;i.push(ke(a,e))})),()=>{i.forEach(a=>a==null?void 0:a())}}function Fe(t,e){const{callback:n}=e;if(!t)return;const s=t.ownerDocument.defaultView||window,i=new s.MutationObserver(n);return i.observe(t,{childList:!0,subtree:!0}),()=>i.disconnect()}function rs(t,e){const{defer:n}=e,s=n?Zt:a=>a(),i=[];return i.push(s(()=>{const a=typeof t=="function"?t():t;i.push(Fe(a,e))})),()=>{i.forEach(a=>a==null?void 0:a())}}function is(t,e){return Array.from((t==null?void 0:t.querySelectorAll(e))??[])}function os(t,e){return(t==null?void 0:t.querySelector(e))??null}function as(t){const e={getRootNode:n=>{var s;return((s=n.getRootNode)==null?void 0:s.call(n))??document},getDoc:n=>Re(e.getRootNode(n)),getWin:n=>e.getDoc(n).defaultView??window,getActiveElement:n=>e.getDoc(n).activeElement,isActiveElement:(n,s)=>s===e.getActiveElement(n),getById:(n,s)=>e.getRootNode(n).getElementById(s),setValue:(n,s)=>{if(n==null||s==null)return;const i=s.toString();n.value!==i&&(n.value=s.toString())}};return{...e,...t}}var et=new WeakMap;function Ke(t,e,n){et.has(t)||et.set(t,new Map);const s=et.get(t),i=s.get(e);if(!i)return s.set(e,n()),()=>{var r;(r=s.get(e))==null||r(),s.delete(e)};const a=n(),u=()=>{a(),i(),s.delete(e)};return s.set(e,u),()=>{s.get(e)===u&&(a(),s.set(e,i))}}function cs(t,e){return t?Ke(t,"style",()=>{const s=t.style.cssText;return Object.assign(t.style,e),()=>{t.style.cssText=s}}):()=>{}}var us={border:"0",clip:"rect(0 0 0 0)",height:"1px",margin:"-1px",overflow:"hidden",padding:"0",position:"absolute",width:"1px",whiteSpace:"nowrap",wordWrap:"normal"},ze=1e3/60;function Ve(t,e){const n=t();if(F(n)&&n.isConnected)return e(n),()=>{};{const s=setInterval(()=>{const i=t();F(i)&&i.isConnected&&(e(i),clearInterval(s))},ze);return()=>clearInterval(s)}}function fs(t,e){const n=[];return t==null||t.forEach(s=>{const i=Ve(s,e);n.push(i)}),()=>{n.forEach(s=>s())}}var ls=t=>t[0],hs=t=>t[t.length-1],ds=(t,...e)=>t.concat(e),ps=(t,e)=>t.filter(n=>n!==e);function qe(t,e,n={}){const{step:s=1,loop:i=!0}=n,a=e+s,u=t.length,r=u-1;return e===-1?s>0?0:r:a<0?i?r:0:a>=u?i?0:e>u?u:e:a}function gs(t,e,n={}){const{step:s=1,loop:i=!0}=n;return qe(t,e,{step:-s,loop:i})}var wt=t=>(t==null?void 0:t.constructor.name)==="Array",Be=(t,e)=>{if(Object.is(t,e))return!0;if(t==null&&e!=null||t!=null&&e==null)return!1;if(typeof(t==null?void 0:t.isEqual)=="function"&&typeof(e==null?void 0:e.isEqual)=="function")return t.isEqual(e);if(typeof t=="function"&&typeof e=="function")return t.toString()===e.toString();if(wt(t)&&wt(e))return Array.from(t).toString()===Array.from(e).toString();if(typeof t!="object"||typeof e!="object")return!1;const n=Object.keys(e??Object.create(null)),s=n.length;for(let i=0;i<s;i++)if(!Reflect.has(t,n[i]))return!1;for(let i=0;i<s;i++){const a=n[i];if(!Be(t[a],e[a]))return!1}return!0},ys=(t,...e)=>(typeof t=="function"?t(...e):t)??void 0,ms=()=>{},vs=(...t)=>(...e)=>{t.forEach(function(n){n==null||n(...e)})},Ye=(t,e)=>{var n;try{return t()}catch(s){return s instanceof Error&&((n=Error.captureStackTrace)==null||n.call(Error,s,Ye)),e==null?void 0:e()}},Es=t=>typeof t=="number"&&!Number.isNaN(t),ws=t=>typeof t=="string",Ss=t=>typeof t=="function",As=t=>t==null;function Ge(t){if(!Ue(t)||t===void 0)return t;const e=Reflect.ownKeys(t).filter(s=>typeof s=="string"),n={};for(const s of e){const i=t[s];i!==void 0&&(n[s]=Ge(i))}return n}var Ue=t=>t&&typeof t=="object"&&t.constructor===Object;function Xe(t,e){const n={},s={},i=new Set(e);for(const a in t)i.has(a)?s[a]=t[a]:n[a]=t[a];return[s,n]}var bs=t=>function(n){return Xe(n,t)};function xs(...t){const e=t.length===1?t[0]:t[1],n=t.length===2?t[0]:!0}function Ze(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global}function lt(t,e){const n=Ze();return n?(n[t]||(n[t]=e()),n[t]):e()}var nt=t=>typeof t=="object"&&t!==null,M=lt("__zag__proxyStateMap",()=>new WeakMap),W=lt("__zag__refSet",()=>new WeakSet),He=(t=Object.is,e=(o,f)=>new Proxy(o,f),n=o=>nt(o)&&!W.has(o)&&(Array.isArray(o)||!(Symbol.iterator in o))&&!(o instanceof WeakMap)&&!(o instanceof WeakSet)&&!(o instanceof Error)&&!(o instanceof Number)&&!(o instanceof Date)&&!(o instanceof String)&&!(o instanceof RegExp)&&!(o instanceof ArrayBuffer),s=o=>{switch(o.status){case"fulfilled":return o.value;case"rejected":throw o.reason;default:throw o}},i=new WeakMap,a=(o,f,l=s)=>{const d=i.get(o);if((d==null?void 0:d[0])===f)return d[1];const p=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o));return vt(p,!0),i.set(o,[f,p]),Reflect.ownKeys(o).forEach(v=>{const E=Reflect.get(o,v);W.has(E)?(vt(E,!1),p[v]=E):E instanceof Promise?Object.defineProperty(p,v,{get(){return l(E)}}):M.has(E)?p[v]=T(E,l):p[v]=E}),Object.freeze(p)},u=new WeakMap,r=[1,1],c=o=>{if(!nt(o))throw new Error("object required");const f=u.get(o);if(f)return f;let l=r[0];const d=new Set,p=(m,g=++r[0])=>{l!==g&&(l=g,d.forEach(y=>y(m,g)))};let v=r[1];const E=(m=++r[1])=>(v!==m&&!d.size&&(v=m,O.forEach(([g])=>{const y=g[1](m);y>l&&(l=y)})),l),x=m=>(g,y)=>{const S=[...g];S[1]=[m,...S[1]],p(S,y)},O=new Map,dt=(m,g)=>{if(d.size){const y=g[3](x(m));O.set(m,[g,y])}else O.set(m,[g])},pt=m=>{var y;const g=O.get(m);g&&(O.delete(m),(y=g[1])==null||y.call(g))},se=m=>(d.add(m),d.size===1&&O.forEach(([y,S],_)=>{const j=y[3](x(_));O.set(_,[y,j])}),()=>{d.delete(m),d.size===0&&O.forEach(([y,S],_)=>{S&&(S(),O.set(_,[y]))})}),X=Array.isArray(o)?[]:Object.create(Object.getPrototypeOf(o)),K=e(X,{deleteProperty(m,g){const y=Reflect.get(m,g);pt(g);const S=Reflect.deleteProperty(m,g);return S&&p(["delete",[g],y]),S},set(m,g,y,S){var gt;const _=Reflect.has(m,g),j=Reflect.get(m,g,S);if(_&&(t(j,y)||u.has(y)&&t(j,u.get(y))))return!0;pt(g),nt(y)&&(y=Se(y)||y);let z=y;if(!((gt=Object.getOwnPropertyDescriptor(m,g))!=null&&gt.set))if(y instanceof Promise)y.then(R=>{Object.assign(y,{status:"fulfilled",value:R}),p(["resolve",[g],R])}).catch(R=>{Object.assign(y,{status:"rejected",reason:R}),p(["reject",[g],R])});else{!M.has(y)&&n(y)&&(z=ht(y));const R=!W.has(z)&&M.get(z);R&&dt(g,R)}return Reflect.set(m,g,z,S),p(["set",[g],y,j]),!0}});u.set(o,K);const re=[X,E,a,se];return M.set(K,re),Reflect.ownKeys(o).forEach(m=>{const g=Object.getOwnPropertyDescriptor(o,m);g.get||g.set?Object.defineProperty(X,m,g):K[m]=o[m]}),K})=>[c,M,W,t,e,n,s,i,a,u,r],[Je]=He();function ht(t={}){return Je(t)}function ct(t,e,n){const s=M.get(t);let i;const a=[],u=s[3];let r=!1;const o=u(f=>{if(a.push(f),n){e(a.splice(0));return}i||(i=Promise.resolve().then(()=>{i=void 0,r&&e(a.splice(0))}))});return r=!0,()=>{r=!1,o()}}function T(t,e){const n=M.get(t),[s,i,a]=n;return a(s,i(),e)}function St(t){return W.add(t),t}function Qe(t,e){Object.keys(e).forEach(i=>{if(Object.getOwnPropertyDescriptor(t,i))throw new Error("object property already defined");const a=e[i],{get:u,set:r}=typeof a=="function"?{get:a}:a,c={};c.get=()=>u(T(s)),r&&(c.set=o=>r(s,o)),Object.defineProperty(t,i,c)});const s=ht(t);return s}var tn=Object.defineProperty,en=(t,e,n)=>e in t?tn(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n,h=(t,e,n)=>(en(t,typeof e!="symbol"?e+"":e,n),n);function nn(t){for(;t.length>0;)t.pop();return t}var At=(t,...e)=>(typeof t=="function"?t(...e):t)??void 0,P=t=>t,sn=()=>{},rn=(...t)=>(...e)=>{t.forEach(function(n){n==null||n(...e)})},bt=(()=>{let t=0;return()=>(t++,t.toString(36))})(),B=t=>Array.isArray(t),k=t=>!(t==null||typeof t!="object"||B(t)),on=t=>typeof t=="number"&&!Number.isNaN(t),A=t=>typeof t=="string",Y=t=>typeof t=="function",an=(t,e)=>Object.prototype.hasOwnProperty.call(t,e);function G(t){if(!cn(t)||t===void 0)return t;const e=Reflect.ownKeys(t).filter(s=>typeof s=="string"),n={};for(const s of e){const i=t[s];i!==void 0&&(n[s]=G(i))}return n}var cn=t=>t&&typeof t=="object"&&t.constructor===Object;function st(...t){const e=t.length===1?t[0]:t[1],n=t.length===2?t[0]:!0}function q(...t){const e=t.length===1?t[0]:t[1],n=t.length===2?t[0]:!0}function Ht(t,...e){for(const n of e){const s=G(n);for(const i in s)k(n[i])?(t[i]||(t[i]={}),Ht(t[i],n[i])):t[i]=n[i]}return t}function xt(t){return $(t)}function b(t){return A(t)?{type:t}:t}function C(t){return t?B(t)?t.slice():[t]:[]}function Jt(t){return k(t)&&t.predicate!=null}var Qt=()=>!0;function U(t,e,n,s){return i=>{var a;return A(i)?!!((a=t[i])!=null&&a.call(t,e,n,s)):Y(i)?i(e,n,s):i.predicate(t)(e,n,s)}}function un(...t){return{predicate:e=>(n,s,i)=>t.map(U(e,n,s,i)).some(Boolean)}}function fn(...t){return{predicate:e=>(n,s,i)=>t.map(U(e,n,s,i)).every(Boolean)}}function ln(t){return{predicate:e=>(n,s,i)=>!U(e,n,s,i)(t)}}function hn(...t){return(e,n,s)=>s.state.matches(...t)}var Os={or:un,and:fn,not:ln,stateIn:hn};function Ps(t){return{predicate:e=>(n,s,i)=>{var a;return(a=t.find(u=>{const r=u.guard??Qt;return U(e,n,s,i)(r)}))==null?void 0:a.actions}}}function te(t,e){return t=t??Qt,(n,s,i)=>{if(A(t)){const a=e[t];return Y(a)?a(n,s,i):a}return Jt(t)?t.predicate(e)(n,s,i):t==null?void 0:t(n,s,i)}}function rt(t,e){return(n,s,i)=>Jt(t)?t.predicate(e)(n,s,i):t}function dn(t){var a,u;const e=t.computed??P({}),n=t.context??P({}),s=t.initial?(u=(a=t.states)==null?void 0:a[t.initial])==null?void 0:u.tags:[],i=ht({value:t.initial??"",previousValue:"",event:P({}),previousEvent:P({}),context:Qe(n,e),done:!1,tags:s??[],hasTag(r){return this.tags.includes(r)},matches(...r){return r.includes(this.value)},can(r){return P(this).nextEvents.includes(r)},get nextEvents(){var o,f;const r=((f=(o=t.states)==null?void 0:o[this.value])==null?void 0:f.on)??{},c=(t==null?void 0:t.on)??{};return Object.keys({...r,...c})},get changed(){return this.event.value==="machine.init"||!this.previousValue?!1:this.value!==this.previousValue}});return P(i)}function I(t,e){return(n,s)=>{if(on(t))return t;if(Y(t))return t(n,s);if(A(t)){const i=Number.parseFloat(t);if(!Number.isNaN(i))return i;if(e){const a=e==null?void 0:e[t];return q(a==null,`[@zag-js/core > determine-delay] Cannot determine delay for \`${t}\`. It doesn't exist in \`options.delays\``),Y(a)?a(n,s):a}}}}function pn(t){return A(t)?{target:t}:t}function gn(t,e){return(n,s,i)=>C(t).map(pn).find(a=>te(a.guard,e)(n,s,i)??a.target??a.actions)}var yn=class{constructor(t,e){var n,s,i,a,u;h(this,"status","Not Started"),h(this,"state"),h(this,"initialState"),h(this,"initialContext"),h(this,"id"),h(this,"type","machine"),h(this,"activityEvents",new Map),h(this,"delayedEvents",new Map),h(this,"stateListeners",new Set),h(this,"doneListeners",new Set),h(this,"contextWatchers",new Set),h(this,"removeStateListener",sn),h(this,"parent"),h(this,"children",new Map),h(this,"guardMap"),h(this,"actionMap"),h(this,"delayMap"),h(this,"activityMap"),h(this,"sync"),h(this,"options"),h(this,"config"),h(this,"_created",()=>{var c;const r=b("machine.created");this.executeActions((c=this.config)==null?void 0:c.created,r)}),h(this,"start",r=>{if(this.state.value="",this.state.tags=[],this.status==="Running")return this;this.status="Running",this.removeStateListener=ct(this.state,()=>{this.stateListeners.forEach(p=>{p(this.stateSnapshot)})},this.sync),this.setupContextWatchers(),this.executeActivities(b("machine.start"),C(this.config.activities),"machine.start"),this.executeActions(this.config.entry,b("machine.start"));const c=b("machine.init"),o=k(r)?r.value:r,f=k(r)?r.context:void 0;f&&this.setContext(f);const l={target:o??this.config.initial},d=this.getNextStateInfo(l,c);return this.initialState=d,this.performStateChangeEffects(this.state.value,d,c),this}),h(this,"setupContextWatchers",()=>{const{watch:r}=this.config;if(!r)return;let c=T(this.state.context);const o=ct(this.state.context,()=>{var l;const f=T(this.state.context);for(const[d,p]of Object.entries(r))(((l=this.options.compareFns)==null?void 0:l[d])??Object.is)(c[d],f[d])||this.executeActions(p,this.state.event);c=f});this.contextWatchers.add(o)}),h(this,"stop",()=>{if(this.status!=="Stopped")return this.performExitEffects(this.state.value,b("machine.stop")),this.executeActions(this.config.exit,b("machine.stop")),this.setState(""),this.setEvent("machine.stop"),this.stopStateListeners(),this.stopChildren(),this.stopActivities(),this.stopDelayedEvents(),this.stopContextWatchers(),this.status="Stopped",this}),h(this,"stopStateListeners",()=>{this.removeStateListener(),this.stateListeners.clear()}),h(this,"stopContextWatchers",()=>{this.contextWatchers.forEach(r=>r()),this.contextWatchers.clear()}),h(this,"stopDelayedEvents",()=>{this.delayedEvents.forEach(r=>{r.forEach(c=>c())}),this.delayedEvents.clear()}),h(this,"stopActivities",r=>{var c,o;r?((c=this.activityEvents.get(r))==null||c.forEach(f=>f()),(o=this.activityEvents.get(r))==null||o.clear(),this.activityEvents.delete(r)):(this.activityEvents.forEach(f=>{f.forEach(l=>l()),f.clear()}),this.activityEvents.clear())}),h(this,"sendChild",(r,c)=>{const o=b(r),f=At(c,this.contextSnapshot),l=this.children.get(f);l||q(`[@zag-js/core] Cannot send '${o.type}' event to unknown child`),l.send(o)}),h(this,"stopChild",r=>{this.children.has(r)||q(`[@zag-js/core > stop-child] Cannot stop unknown child ${r}`),this.children.get(r).stop(),this.children.delete(r)}),h(this,"removeChild",r=>{this.children.delete(r)}),h(this,"stopChildren",()=>{this.children.forEach(r=>r.stop()),this.children.clear()}),h(this,"setParent",r=>{this.parent=r}),h(this,"spawn",(r,c)=>{const o=At(r);return c&&(o.id=c),o.type="machine.actor",o.setParent(this),this.children.set(o.id,P(o)),o.onDone(()=>{this.removeChild(o.id)}).start(),P(St(o))}),h(this,"stopActivity",r=>{var o;if(!this.state.value)return;const c=this.activityEvents.get(this.state.value);(o=c==null?void 0:c.get(r))==null||o(),c==null||c.delete(r)}),h(this,"addActivityCleanup",(r,c,o)=>{var f;r&&(this.activityEvents.has(r)?(f=this.activityEvents.get(r))==null||f.set(c,o):this.activityEvents.set(r,new Map([[c,o]])))}),h(this,"setState",r=>{this.state.previousValue=this.state.value,this.state.value=r;const c=this.getStateNode(r);r==null?nn(this.state.tags):this.state.tags=C(c==null?void 0:c.tags)}),h(this,"setContext",r=>{r&&Ht(this.state.context,G(r))}),h(this,"setOptions",r=>{const c=G(r);this.actionMap={...this.actionMap,...c.actions},this.delayMap={...this.delayMap,...c.delays},this.activityMap={...this.activityMap,...c.activities},this.guardMap={...this.guardMap,...c.guards}}),h(this,"getStateNode",r=>{var c;if(r)return(c=this.config.states)==null?void 0:c[r]}),h(this,"getNextStateInfo",(r,c)=>{const o=this.determineTransition(r,c),f=!(o!=null&&o.target),l=(o==null?void 0:o.target)??this.state.value,d=this.state.value!==l,p=this.getStateNode(l),E={reenter:!f&&!d&&!(o!=null&&o.internal),transition:o,stateNode:p,target:l,changed:d};return this.log("NextState:",`[${c.type}]`,this.state.value,"---->",E.target),E}),h(this,"getAfterActions",(r,c)=>{let o;return{entry:()=>{o=globalThis.setTimeout(()=>{const f=this.getNextStateInfo(r,this.state.event);this.performStateChangeEffects(this.state.value,f,this.state.event)},c)},exit:()=>{globalThis.clearTimeout(o)}}}),h(this,"getDelayedEventActions",r=>{const c=this.getStateNode(r),o=this.state.event;if(!c||!c.after)return;const f=[],l=[];if(B(c.after)){const d=this.determineTransition(c.after,o);if(!d)return;if(!an(d,"delay"))throw new Error(`[@zag-js/core > after] Delay is required for after transition: ${JSON.stringify(d)}`);const v=I(d.delay,this.delayMap)(this.contextSnapshot,o),E=this.getAfterActions(d,v);return f.push(E.entry),l.push(E.exit),{entries:f,exits:l}}if(k(c.after))for(const d in c.after){const p=c.after[d],E=I(d,this.delayMap)(this.contextSnapshot,o),x=this.getAfterActions(p,E);f.push(x.entry),l.push(x.exit)}return{entries:f,exits:l}}),h(this,"executeActions",(r,c)=>{var f;const o=rt(r,this.guardMap)(this.contextSnapshot,c,this.guardMeta);for(const l of C(o)){const d=A(l)?(f=this.actionMap)==null?void 0:f[l]:l;st(A(l)&&!d,`[@zag-js/core > execute-actions] No implementation found for action: \`${l}\``),d==null||d(this.state.context,c,this.meta)}}),h(this,"executeActivities",(r,c,o)=>{var f;for(const l of c){const d=A(l)?(f=this.activityMap)==null?void 0:f[l]:l;if(!d){st(`[@zag-js/core > execute-activity] No implementation found for activity: \`${l}\``);continue}const p=d(this.state.context,r,this.meta);if(p){const v=A(l)?l:l.name||bt();this.addActivityCleanup(o??this.state.value,v,p)}}}),h(this,"createEveryActivities",(r,c)=>{if(r)if(B(r)){const o=C(r).find(p=>{const v=p.delay,x=I(v,this.delayMap)(this.contextSnapshot,this.state.event);return te(p.guard,this.guardMap)(this.contextSnapshot,this.state.event,this.guardMeta)??x!=null});if(!o)return;const l=I(o.delay,this.delayMap)(this.contextSnapshot,this.state.event);c(()=>{const p=globalThis.setInterval(()=>{this.executeActions(o.actions,this.state.event)},l);return()=>{globalThis.clearInterval(p)}})}else for(const o in r){const f=r==null?void 0:r[o],d=I(o,this.delayMap)(this.contextSnapshot,this.state.event);c(()=>{const v=globalThis.setInterval(()=>{this.executeActions(f,this.state.event)},d);return()=>{globalThis.clearInterval(v)}})}}),h(this,"setEvent",r=>{this.state.previousEvent=this.state.event,this.state.event=St(b(r))}),h(this,"performExitEffects",(r,c)=>{const o=this.state.value;if(o==="")return;const f=r?this.getStateNode(r):void 0;this.stopActivities(o);const l=rt(f==null?void 0:f.exit,this.guardMap)(this.contextSnapshot,c,this.guardMeta),d=C(l),p=this.delayedEvents.get(o);p&&d.push(...p),this.executeActions(d,c)}),h(this,"performEntryEffects",(r,c)=>{const o=this.getStateNode(r),f=C(o==null?void 0:o.activities);this.createEveryActivities(o==null?void 0:o.every,v=>{f.unshift(v)}),f.length>0&&this.executeActivities(c,f);const l=rt(o==null?void 0:o.entry,this.guardMap)(this.contextSnapshot,c,this.guardMeta),d=C(l),p=this.getDelayedEventActions(r);o!=null&&o.after&&p&&(this.delayedEvents.set(r,p==null?void 0:p.exits),d.push(...p.entries)),this.executeActions(d,c),(o==null?void 0:o.type)==="final"&&(this.state.done=!0,this.doneListeners.forEach(v=>{v(this.stateSnapshot)}),this.stop())}),h(this,"performTransitionEffects",(r,c)=>{const o=this.determineTransition(r,c);this.executeActions(o==null?void 0:o.actions,c)}),h(this,"performStateChangeEffects",(r,c,o)=>{this.setEvent(o);const f=c.changed||c.reenter;f&&this.performExitEffects(r,o),this.performTransitionEffects(c.transition,o),this.setState(c.target),f&&this.performEntryEffects(c.target,o)}),h(this,"determineTransition",(r,c)=>{const o=gn(r,this.guardMap);return o==null?void 0:o(this.contextSnapshot,c,this.guardMeta)}),h(this,"sendParent",r=>{var o;this.parent||q("[@zag-js/core > send-parent] Cannot send event to an unknown parent");const c=b(r);(o=this.parent)==null||o.send(c)}),h(this,"log",(...r)=>{}),h(this,"send",r=>{const c=b(r);this.transition(this.state.value,c)}),h(this,"transition",(r,c)=>{var p,v;const o=A(r)?this.getStateNode(r):r==null?void 0:r.stateNode,f=b(c);if(!o&&!this.config.on){const E=this.status==="Stopped"?"[@zag-js/core > transition] Cannot transition a stopped machine":`[@zag-js/core > transition] State does not have a definition for \`state\`: ${r}, \`event\`: ${f.type}`;st(E);return}const l=((p=o==null?void 0:o.on)==null?void 0:p[f.type])??((v=this.config.on)==null?void 0:v[f.type]),d=this.getNextStateInfo(l,f);return this.performStateChangeEffects(this.state.value,d,f),d.stateNode}),h(this,"subscribe",r=>(this.stateListeners.add(r),this.status==="Running"&&r(this.stateSnapshot),()=>{this.stateListeners.delete(r)})),h(this,"onDone",r=>(this.doneListeners.add(r),this)),h(this,"onTransition",r=>(this.stateListeners.add(r),this.status==="Running"&&r(this.stateSnapshot),this)),this.config=xt(t),this.options=xt(e??{}),this.id=this.config.id??`machine-${bt()}`,this.guardMap=((n=this.options)==null?void 0:n.guards)??{},this.actionMap=((s=this.options)==null?void 0:s.actions)??{},this.delayMap=((i=this.options)==null?void 0:i.delays)??{},this.activityMap=((a=this.options)==null?void 0:a.activities)??{},this.sync=((u=this.options)==null?void 0:u.sync)??!1,this.state=dn(this.config),this.initialContext=T(this.state.context)}get stateSnapshot(){return P(T(this.state))}getState(){return this.stateSnapshot}get contextSnapshot(){return this.stateSnapshot.context}get self(){const t=this;return{id:this.id,send:this.send.bind(this),sendParent:this.sendParent.bind(this),sendChild:this.sendChild.bind(this),stop:this.stop.bind(this),stopChild:this.stopChild.bind(this),spawn:this.spawn.bind(this),stopActivity:this.stopActivity.bind(this),get state(){return t.stateSnapshot},get initialContext(){return t.initialContext},get initialState(){var e;return((e=t.initialState)==null?void 0:e.target)??""}}}get meta(){var t;return{state:this.stateSnapshot,guards:this.guardMap,send:this.send.bind(this),self:this.self,initialContext:this.initialContext,initialState:((t=this.initialState)==null?void 0:t.target)??"",getState:()=>this.stateSnapshot,getAction:e=>this.actionMap[e],getGuard:e=>this.guardMap[e]}}get guardMeta(){return{state:this.stateSnapshot}}get[Symbol.toStringTag](){return"Machine"}},Rs=(t,e)=>new yn(t,e),mn=(...t)=>t.map(e=>{var n;return(n=e==null?void 0:e.trim)==null?void 0:n.call(e)}).filter(Boolean).join(" "),vn=/((?:--)?(?:\w+-?)+)\s*:\s*([^;]*)/g,Ot=t=>{const e={};let n;for(;n=vn.exec(t);)e[n[1]]=n[2];return e},En=(t,e)=>{if(A(t)){if(A(e))return`${t};${e}`;t=Ot(t)}else A(e)&&(e=Ot(e));return Object.assign({},t??{},e??{})};function wn(...t){let e={};for(let n of t){for(let s in e){if(s.startsWith("on")&&typeof e[s]=="function"&&typeof n[s]=="function"){e[s]=rn(n[s],e[s]);continue}if(s==="className"||s==="class"){e[s]=mn(e[s],n[s]);continue}if(s==="style"){e[s]=En(e[s],n[s]);continue}e[s]=n[s]!==void 0?n[s]:e[s]}for(let s in n)e[s]===void 0&&(e[s]=n[s])}return e}function Sn(t){return new Proxy({},{get(){return t}})}var Cs=()=>t=>Array.from(new Set(t)),Ts=Sn(t=>t),Pt=t=>(t==null?void 0:t.constructor.name)==="Array",ee=(t,e)=>{if(Object.is(t,e))return!0;if(t==null&&e!=null||t!=null&&e==null)return!1;if(typeof(t==null?void 0:t.isEqual)=="function"&&typeof(e==null?void 0:e.isEqual)=="function")return t.isEqual(e);if(typeof t=="function"&&typeof e=="function")return t.toString()===e.toString();if(Pt(t)&&Pt(e))return Array.from(t).toString()===Array.from(e).toString();if(typeof t!="object"||typeof e!="object")return!1;const n=Object.keys(e??Object.create(null)),s=n.length;for(let i=0;i<s;i++)if(!Reflect.has(t,n[i]))return!1;for(let i=0;i<s;i++){const a=n[i];if(!ee(t[a],e[a]))return!1}return!0};function ne(t){if(!An(t)||t===void 0)return t;const e=Reflect.ownKeys(t).filter(s=>typeof s=="string"),n={};for(const s of e){const i=t[s];i!==void 0&&(n[s]=ne(i))}return n}var An=t=>t&&typeof t=="object"&&t.constructor===Object;function bn(t,e){const n=w.useRef(!1),s=w.useRef(!1);w.useEffect(()=>{if(n.current&&s.current)return t();s.current=!0},e),w.useEffect(()=>(n.current=!0,()=>{n.current=!1}),[])}var{use:Rt}=ie,xn=lt("__zag__targetCache",()=>new WeakMap);function On(t,e){const{actions:n,context:s,sync:i}=e??{},a=w.useRef(),u=w.useRef(),r=w.useSyncExternalStore(w.useCallback(l=>ct(t.state,l,i),[i]),()=>{const l=T(t.state,Rt);try{if(a.current&&u.current&&!Ft(a.current,l,u.current,new WeakMap))return a.current}catch{}return l},()=>T(t.state,Rt));t.setOptions({actions:n});const c=w.useMemo(()=>ne(s??{}),[s]);bn(()=>{const l=Object.entries(c),d=t.contextSnapshot??{};l.map(([E,x])=>({key:E,curr:x,prev:d[E],equal:ee(d[E],x)})).every(({equal:E})=>E)||t.setContext(c)},[c]);const o=new WeakMap;w.useEffect(()=>{a.current=r,u.current=o});const f=w.useMemo(()=>new WeakMap,[]);return kt(r,o,f,xn)}function Pn(t){const e=w.useRef();return e.current||(e.current={v:t()}),e.current.v}var Rn=typeof document<"u"?w.useLayoutEffect:w.useEffect;function Cn(t,e){const{state:n,context:s}=e??{},i=Pn(()=>{const a=typeof t=="function"?t():t;return s&&a.setContext(s),a._created(),a});return Rn(()=>(i.start(n),()=>{i.stop()}),[]),i}function Ms(t,e){const n=Cn(t,e);return[On(n,e),n.send,n]}function Tn(t,e){typeof t=="function"?t(e):t!=null&&(t.current=e)}function Mn(...t){return e=>{for(const n of t)Tn(n,e)}}function _n(t){return"ref"in t.props?t.props.ref:"ref"in t?t.ref:null}const it=t=>{const e=w.memo(w.forwardRef((n,s)=>{const{asChild:i,children:a,...u}=n;if(!i)return w.createElement(t,{...u,ref:s},a);const r=w.Children.only(a);if(!w.isValidElement(r))return null;const c=_n(r);return w.cloneElement(r,{...wn(u,r.props),ref:s?Mn(s,c):c})}));return e.displayName=t.displayName||t.name,e},Nn=()=>{const t=new Map;return new Proxy(it,{apply(e,n,s){return it(s[0])},get(e,n){const s=n;return t.has(s)||t.set(s,it(s)),t.get(s)}})},_s=Nn(),Ns=()=>(t,e)=>e.reduce((n,s)=>{const[i,a]=n,u=s;return a[u]!==void 0&&(i[u]=a[u]),delete a[u],[i,a]},[{},{...t}]),[Ds,$s]=Kt({name:"EnvironmentContext",hookName:"useEnvironmentContext",providerName:"<EnvironmentProvider />",strict:!1,defaultValue:{getRootNode:()=>document,getDocument:()=>document,getWindow:()=>window}}),[js,Is]=Kt({name:"LocaleContext",hookName:"useLocaleContext",providerName:"<LocaleProvider />",strict:!1,defaultValue:{dir:"ltr",locale:"en-US"}});export{qt as $,ss as A,rs as B,us as C,Os as D,Be as E,Es as F,Kn as G,kn as H,Fn as I,bs as J,is as K,ls as L,hs as M,Jn as N,Qn as O,Un as P,ps as Q,ds as R,xs as S,ws as T,Wn as U,Ln as V,Bn as W,qn as X,Hn as Y,Ps as Z,vs as _,Re as a,qe as a0,gs as a1,Mn as a2,ms as a3,F as a4,As as a5,ys as a6,Ie as a7,Ss as a8,fs as a9,cs as aa,os as ab,Ye as ac,es as ad,Gn as b,Zn as c,Yn as d,Z as e,zn as f,Vt as g,_s as h,Xn as i,Ns as j,Q as k,as as l,wn as m,ns as n,Vn as o,Ge as p,Rs as q,Zt as r,Cs as s,ts as t,St as u,Is as v,$s as w,Ms as x,Ts as y,Kt as z};
