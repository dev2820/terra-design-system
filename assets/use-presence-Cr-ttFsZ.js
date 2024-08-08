import{c as d,a as N,y as v,z as E,B as c,C as P,D as f}from"./create-split-props-DTq8A8QE.js";import{r as y}from"./index-CDs2tPxN.js";import{u as A}from"./use-event-eGuf5zsd.js";const[T,k]=d({name:"PresenceContext",hookName:"usePresenceContext",providerName:"<PresenceProvider />"}),h=t=>N()(t,["immediate","lazyMount","onExitComplete","present","unmountOnExit"]);function O(t,e,i){const o=t.matches("mounted","unmountSuspended");return{skip:!t.context.initial&&o,present:o,setNode(n){n&&e({type:"NODE.SET",node:n})},unmount(){e({type:"UNMOUNT"})}}}function u(t){return(t==null?void 0:t.animationName)||"none"}function U(t){return v({initial:t.present?"mounted":"unmounted",context:{node:null,styles:null,unmountAnimationName:null,prevAnimationName:null,present:!1,initial:!1,...t},exit:["clearInitial"],watch:{present:["setInitial","syncPresence"]},on:{"NODE.SET":{actions:["setNode","setStyles"]}},states:{mounted:{on:{UNMOUNT:{target:"unmounted",actions:["invokeOnExitComplete"]},"UNMOUNT.SUSPEND":"unmountSuspended"}},unmountSuspended:{activities:["trackAnimationEvents"],on:{MOUNT:{target:"mounted",actions:["setPrevAnimationName"]},"ANIMATION.END":{target:"unmounted",actions:["invokeOnExitComplete"]},UNMOUNT:{target:"unmounted",actions:["invokeOnExitComplete"]}}},unmounted:{entry:["clearPrevAnimationName"],on:{MOUNT:{target:"mounted",actions:["setPrevAnimationName"]}}}}},{actions:{setInitial(e){e.initial=!0},clearInitial(e){e.initial=!1},invokeOnExitComplete(e){var i;(i=e.onExitComplete)==null||i.call(e)},setNode(e,i){e.node=c(i.node)},setStyles(e,i){const o=i.node.ownerDocument.defaultView||window;e.styles=c(o.getComputedStyle(i.node))},syncPresence(e,i,{send:o}){if(e.present){o({type:"MOUNT",src:"presence.changed"});return}const n=u(e.styles);(e.immediate?queueMicrotask:requestAnimationFrame)(()=>{var a,s;e.unmountAnimationName=n,n==="none"||n===e.prevAnimationName||((a=e.styles)==null?void 0:a.display)==="none"||((s=e.styles)==null?void 0:s.animationDuration)==="0s"?o({type:"UNMOUNT",src:"presence.changed"}):o({type:"UNMOUNT.SUSPEND"})})},setPrevAnimationName(e){(e.immediate?queueMicrotask:requestAnimationFrame)(()=>{e.prevAnimationName=u(e.styles)})},clearPrevAnimationName(e){e.prevAnimationName=null}},activities:{trackAnimationEvents(e,i,{send:o}){const n=e.node;if(!n)return;const m=s=>{s.target===n&&(e.prevAnimationName=u(e.styles))},a=s=>{const r=u(e.styles);s.target===n&&r===e.unmountAnimationName&&o({type:"UNMOUNT",src:"animationend"})};return n.addEventListener("animationstart",m),n.addEventListener("animationcancel",a),n.addEventListener("animationend",a),()=>{n.removeEventListener("animationstart",m),n.removeEventListener("animationcancel",a),n.removeEventListener("animationend",a)}}}})}E()(["onExitComplete","present","immediate"]);const x=t=>{const{lazyMount:e,unmountOnExit:i,...o}=t,n=y.useRef(!1),m={...o,onExitComplete:A(t.onExitComplete)},[a,s]=P(U(m),{context:m}),r=O(a,s);r.present&&(n.current=!0);const l=!r.present&&!n.current&&e||i&&!r.present&&n.current;return{getPresenceProps:p=>({ref:f(r.setNode,p),"data-state":t.present?"open":"closed",hidden:!r.present}),present:r.present,unmounted:l}};export{T as P,k as a,h as s,x as u};
