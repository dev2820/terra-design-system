import{a as l,e as f,p as i}from"./index-CO00fS6N.js";const a={transform(t){const{direction:s,align:r,justify:n,wrap:e,basis:x,grow:g,shrink:y,...u}=t;return{display:"flex",flexDirection:s,alignItems:r,justifyContent:n,flexWrap:e,flexBasis:x,flexGrow:g,flexShrink:y,...u}}},c=(t={})=>{const s=f(a,t);return a.transform(s,i)},m=t=>l(c(t));m.raw=c;const o={transform(t,{map:s}){const{size:r,...n}=t;return{alignSelf:"stretch",justifySelf:"stretch",flex:s(r,e=>e==null?"1":`0 0 ${e}`),...n}}},p=(t={})=>{const s=f(o,t);return o.transform(s,i)},S=t=>l(p(t));S.raw=p;export{m as f,S as s};
