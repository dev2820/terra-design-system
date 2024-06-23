import{a as A,e as S,p as N,c as x}from"./cva-C095pwBQ.js";import{j as c}from"./jsx-runtime-qGIIFXMu.js";import{f as w}from"./index-DOljKnny.js";import{r as d}from"./index-CDs2tPxN.js";import{s as P}from"./sva-CxSEfBjn.js";import{c as O,a as M,b as G,d as j,m as p,e as f,f as L,g as D,h as $,i as F,j as U,o as _,k as B,u as H,l as T,n as z,p as V,q as W,r as q}from"./use-event-BIwGymbi.js";import{c as J}from"./createLucideIcon-zijr-BYg.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=J("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var k=O("avatar").parts("root","image","fallback");k.build();var v=M({getRootId:a=>{var t;return((t=a.ids)==null?void 0:t.root)??`avatar:${a.id}`},getImageId:a=>{var t;return((t=a.ids)==null?void 0:t.image)??`avatar:${a.id}:image`},getFallbackId:a=>{var t;return((t=a.ids)==null?void 0:t.fallback)??`avatar:${a.id}:fallback`},getRootEl:a=>v.getById(a,v.getRootId(a)),getImageEl:a=>v.getById(a,v.getImageId(a))});G()(["dir","id","ids","onStatusChange","getRootNode"]);const[Q,R]=j({name:"AvatarContext",hookName:"useAvatarContext",providerName:"<AvatarProvider />"}),b=d.forwardRef((a,t)=>{const e=R(),r=p(e.getFallbackProps(),a);return c.jsx(f.span,{...r,ref:t})});b.displayName="AvatarFallback";const y=d.forwardRef((a,t)=>{const e=R(),r=p(e.getImageProps(),a);return c.jsx(f.img,{...r,ref:t})});y.displayName="AvatarImage";var X=L("avatar").parts("root","image","fallback"),u=X.build(),n=D({getRootId:a=>{var t;return((t=a.ids)==null?void 0:t.root)??`avatar:${a.id}`},getImageId:a=>{var t;return((t=a.ids)==null?void 0:t.image)??`avatar:${a.id}:image`},getFallbackId:a=>{var t;return((t=a.ids)==null?void 0:t.fallback)??`avatar:${a.id}:fallback`},getRootEl:a=>n.getById(a,n.getRootId(a)),getImageEl:a=>n.getById(a,n.getImageId(a))});function Y(a,t,e){const r=a.matches("loaded");return{loaded:r,setSrc(s){t({type:"SRC.SET",src:s})},setLoaded(){t({type:"IMG.LOADED",src:"api"})},setError(){t({type:"IMG.ERROR",src:"api"})},getRootProps(){return e.element({...u.root.attrs,dir:a.context.dir,id:n.getRootId(a.context)})},getImageProps(){return e.img({...u.image.attrs,hidden:!r,dir:a.context.dir,id:n.getImageId(a.context),"data-state":r?"visible":"hidden",onLoad(){t({type:"IMG.LOADED",src:"element"})},onError(){t({type:"IMG.ERROR",src:"element"})}})},getFallbackProps(){return e.element({...u.fallback.attrs,dir:a.context.dir,id:n.getFallbackId(a.context),hidden:r,"data-state":r?"hidden":"visible"})}}}function Z(a){const t=$(a);return F({id:"avatar",initial:"loading",activities:["trackImageRemoval"],context:t,on:{"SRC.CHANGE":{target:"loading"},"IMG.UNMOUNT":{target:"error"}},states:{loading:{activities:["trackSrcChange"],entry:["checkImageStatus"],on:{"IMG.LOADED":{target:"loaded",actions:["invokeOnLoad"]},"IMG.ERROR":{target:"error",actions:["invokeOnError"]}}},error:{activities:["trackSrcChange"],on:{"IMG.LOADED":{target:"loaded",actions:["invokeOnLoad"]}}},loaded:{activities:["trackSrcChange"],on:{"IMG.ERROR":{target:"error",actions:["invokeOnError"]}}}}},{activities:{trackSrcChange(e,r,{send:s}){const o=n.getImageEl(e);return _(o,{attributes:["src","srcset"],callback(){s({type:"SRC.CHANGE"})}})},trackImageRemoval(e,r,{send:s}){const o=n.getRootEl(e);return B(o,{callback(i){Array.from(i[0].removedNodes).find(g=>g.matches("[data-scope=avatar][data-part=image]"))&&s({type:"IMG.UNMOUNT"})}})}},actions:{invokeOnLoad(e){var r;(r=e.onStatusChange)==null||r.call(e,{status:"loaded"})},invokeOnError(e){var r;(r=e.onStatusChange)==null||r.call(e,{status:"error"})},checkImageStatus(e,r,{send:s}){const o=n.getImageEl(e);if(o!=null&&o.complete){const i=aa(o)?"IMG.LOADED":"IMG.ERROR";s({type:i,src:"ssr"})}}}})}function aa(a){return a.complete&&a.naturalWidth!==0&&a.naturalHeight!==0}U()(["dir","id","ids","onStatusChange","getRootNode"]);const ta=(a={})=>{const{getRootNode:t}=H(),{dir:e}=T(),r={id:d.useId(),dir:e,getRootNode:t,...a},s={...r,onStatusChange:z(a.onStatusChange)},[o,i]=V(Z(r),{context:s});return Y(o,i,W)},E=d.forwardRef((a,t)=>{const[e,r]=q()(a,["id","ids","onStatusChange"]),s=ta(e),o=p(s.getRootProps(),r);return c.jsx(Q,{value:s,children:c.jsx(f.div,{...o,ref:t})})});E.displayName="AvatarRoot";const I={transform(a){const{direction:t,align:e,justify:r,wrap:s,basis:o,grow:i,shrink:l,...m}=a;return{display:"flex",flexDirection:t,alignItems:e,justifyContent:r,flexWrap:s,flexBasis:o,flexGrow:i,flexShrink:l,...m}}},C=(a={})=>{const t=S(I,a);return I.transform(t,N)},ea=a=>A(C(a));ea.raw=C;const ra=P({className:"avatar",slots:k.keys(),base:{root:{rounded:"full",overflow:"hidden"},fallback:{bg:"neutral.200"},image:{bg:"neutral.200"}},variants:{size:{sm:{root:{w:8,h:8},fallback:{w:8,h:8},image:{w:8,h:8}},md:{root:{w:10,h:10},fallback:{w:10,h:10},image:{w:10,h:10}},lg:{root:{w:12,h:12},fallback:{w:12,h:12},image:{w:12,h:12}}}},defaultVariants:{size:"md"}}),oa=d.forwardRef((a,t)=>{const{fallback:e,src:r,alt:s,size:o,className:i,children:l,...m}=a,g=ra({size:o}),h=l&&d.Children.only(l);return c.jsxs(E,{ref:t,className:x(g.root,i),...m,children:[c.jsx(y,{src:r,alt:s,className:g.image,asChild:w(h),children:h}),c.jsx(b,{className:g.fallback,asChild:!0,children:e??c.jsx(K,{size:sa(o)})})]})}),sa=a=>a==="sm"?32:a==="md"?40:a==="lg"?48:10;oa.__docgenInfo={description:"",methods:[],displayName:"Avatar"};export{oa as A,K as U,ea as f};
