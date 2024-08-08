import{j as C}from"./jsx-runtime-qGIIFXMu.js";import{a as b,q as y,t as I,v as E,y as R,z as P,r as f,E as L,B as w,C as k,F as S,c as D,o as N,p as v}from"./create-split-props-DTq8A8QE.js";import{r as u}from"./index-CDs2tPxN.js";import{e as A,j as T,u as z}from"./use-locale-context-BAx_KD7B.js";import{u as M}from"./use-event-eGuf5zsd.js";const j=n=>b()(n,["defaultOpen","disabled","id","ids","lazyMount","onExitComplete","onOpenChange","open","unmountOnExit"]);var x=y("collapsible").parts("root","trigger","content"),g=x.build(),l=I({getRootId:n=>{var a;return((a=n.ids)==null?void 0:a.root)??`collapsible:${n.id}`},getContentId:n=>{var a;return((a=n.ids)==null?void 0:a.content)??`collapsible:${n.id}:content`},getTriggerId:n=>{var a;return((a=n.ids)==null?void 0:a.trigger)??`collapsible:${n.id}:trigger`},getRootEl:n=>l.getById(n,l.getRootId(n)),getContentEl:n=>l.getById(n,l.getContentId(n)),getTriggerEl:n=>l.getById(n,l.getTriggerId(n))});function B(n,a,e){const o=n.matches("open","closing"),i=n.matches("open"),t=n.context.height,r=n.context.width,s=!!n.context.disabled,d=!n.context.initial&&i;return{disabled:s,visible:o,open:i,setOpen(p){p!==i&&a(p?"OPEN":"CLOSE")},getRootProps(){return e.element({...g.root.attrs,"data-state":i?"open":"closed",dir:n.context.dir,id:l.getRootId(n.context)})},getContentProps(){return e.element({...g.content.attrs,"data-state":d?void 0:i?"open":"closed",id:l.getContentId(n.context),"data-disabled":E(s),hidden:!o,style:{"--height":t!=null?`${t}px`:void 0,"--width":r!=null?`${r}px`:void 0}})},getTriggerProps(){return e.element({...g.trigger.attrs,id:l.getTriggerId(n.context),dir:n.context.dir,type:"button","data-state":i?"open":"closed","data-disabled":E(s),"aria-controls":l.getContentId(n.context),"aria-expanded":o||!1,onClick(p){p.defaultPrevented||s||a({type:i?"CLOSE":"OPEN",src:"trigger.click"})}})}}}function V(n){const a=A(n);return R({id:"collapsible",initial:a.open?"open":"closed",context:{...a,height:0,width:0,initial:!1,stylesRef:null,unmountAnimationName:null},watch:{open:["setInitial","computeSize","toggleVisibility"]},exit:["clearInitial"],states:{closed:{tags:["closed"],on:{"CONTROLLED.OPEN":"open",OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["setInitial","computeSize","invokeOnOpen"]}]}},closing:{tags:["open"],activities:["trackAnimationEvents"],on:{"CONTROLLED.CLOSE":"closed","CONTROLLED.OPEN":"open",OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["setInitial","invokeOnOpen"]}],CLOSE:[{guard:"isOpenControlled",actions:["invokeOnExitComplete"]},{target:"closed",actions:["setInitial","computeSize","invokeOnExitComplete"]}],"ANIMATION.END":{target:"closed",actions:["invokeOnExitComplete"]}}},open:{tags:["open"],on:{"CONTROLLED.CLOSE":"closing",CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"closing",actions:["setInitial","computeSize","invokeOnClose"]}]}}}},{guards:{isOpenControlled:e=>!!e["open.controlled"]},activities:{trackAnimationEvents(e,o,{send:i}){let t;const r=f(()=>{const s=l.getContentEl(e);if(!s)return;const d=L(s).animationName;if(!d||d==="none"){i({type:"ANIMATION.END"});return}const m=c=>{const h=(s.ownerDocument.defaultView||window).getComputedStyle(s).animationName;c.target===s&&h===e.unmountAnimationName&&i({type:"ANIMATION.END"})};s.addEventListener("animationend",m),t=()=>{s.removeEventListener("animationend",m)}});return()=>{r(),t==null||t()}}},actions:{setInitial(e){e.initial=!0},clearInitial(e){e.initial=!1},computeSize(e,o){var i;(i=e._rafCleanup)==null||i.call(e),e._rafCleanup=f(()=>{const t=l.getContentEl(e);if(!t)return;if(e.stylesRef||(e.stylesRef=w({animationName:t.style.animationName,animationDuration:t.style.animationDuration})),o.type==="CLOSE"||!e.open){const d=t.ownerDocument.defaultView||window;e.unmountAnimationName=d.getComputedStyle(t).animationName}const r=t.hidden;t.style.animationName="none",t.style.animationDuration="0s",t.hidden=!1;const s=t.getBoundingClientRect();e.height=s.height,e.width=s.width,e.initial&&(t.style.animationName=e.stylesRef.animationName,t.style.animationDuration=e.stylesRef.animationDuration),t.hidden=r})},invokeOnOpen:e=>{var o;(o=e.onOpenChange)==null||o.call(e,{open:!0})},invokeOnClose:e=>{var o;(o=e.onOpenChange)==null||o.call(e,{open:!1})},invokeOnExitComplete(e){var o;(o=e.onExitComplete)==null||o.call(e)},toggleVisibility:(e,o,{send:i})=>{i({type:e.open?"CONTROLLED.OPEN":"CONTROLLED.CLOSE"})}}})}P()(["dir","disabled","getRootNode","id","ids","onExitComplete","onOpenChange","open.controlled","open"]);const $=(n={})=>{const{lazyMount:a,unmountOnExit:e,...o}=n,i=u.useRef(!1),{dir:t}=T(),{getRootNode:r}=z(),s={id:u.useId(),dir:t,getRootNode:r,open:n.defaultOpen,"open.controlled":n.open!==void 0,...o},d={...s,open:n.open,onOpenChange:M(n.onOpenChange,{sync:!0})},[p,m]=k(V(s),{context:d}),c=B(p,m,S);c.visible&&(i.current=!0);const O=!c.visible&&!i.current&&a||e&&!c.visible&&i.current;return{...c,isUnmounted:O}},[_,U]=D({name:"CollapsibleContext",hookName:"useCollapsibleContext",providerName:"<CollapsibleProvider />"}),q=u.forwardRef((n,a)=>{const[e,o]=j(n),i=$(e),t=N(i.getRootProps(),o);return C.jsx(_,{value:i,children:C.jsx(v.div,{...t,ref:a})})});q.displayName="CollapsibleRoot";const F=u.forwardRef((n,a)=>{const e=U();if(e.isUnmounted)return null;const o=N(e.getContentProps(),n);return C.jsx(v.div,{...o,ref:a})});F.displayName="CollapsibleContent";export{q as C,F as a,U as u};
