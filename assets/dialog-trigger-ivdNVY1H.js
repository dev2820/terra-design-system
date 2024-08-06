import{k as f,c as D,m as c,l as E,p as y,q as v,t as T,n as k,r as I,u as F,H as b,x as B,y as h}from"./create-split-props-aocGlKWx.js";import{c as R,d as S,u as w,e as N}from"./use-locale-context-B_Gjrn4q.js";import{c as L}from"./index-DJ3ti8gJ.js";import{j as l}from"./jsx-runtime-qGIIFXMu.js";import{r as p}from"./index-CDs2tPxN.js";import{u as $,s as j,R as G}from"./render-strategy-ptiSH5mO.js";import{u as P,a as C,t as K,s as M,P as q}from"./index-BiiAj-OS.js";import{a as A}from"./index-DimjarXC.js";import{p as H,c as V}from"./index-B7ySdDkw.js";import{u as O}from"./use-event-eGuf5zsd.js";var Z=f("dialog").parts("trigger","backdrop","positioner","content","title","description","closeTrigger");Z.build();var d=R({getPositionerId:e=>{var o;return((o=e.ids)==null?void 0:o.positioner)??`dialog:${e.id}:positioner`},getBackdropId:e=>{var o;return((o=e.ids)==null?void 0:o.backdrop)??`dialog:${e.id}:backdrop`},getContentId:e=>{var o;return((o=e.ids)==null?void 0:o.content)??`dialog:${e.id}:content`},getTriggerId:e=>{var o;return((o=e.ids)==null?void 0:o.trigger)??`dialog:${e.id}:trigger`},getTitleId:e=>{var o;return((o=e.ids)==null?void 0:o.title)??`dialog:${e.id}:title`},getDescriptionId:e=>{var o;return((o=e.ids)==null?void 0:o.description)??`dialog:${e.id}:description`},getCloseTriggerId:e=>{var o;return((o=e.ids)==null?void 0:o.closeTrigger)??`dialog:${e.id}:close`},getContentEl:e=>d.getById(e,d.getContentId(e)),getPositionerEl:e=>d.getById(e,d.getPositionerId(e)),getBackdropEl:e=>d.getById(e,d.getBackdropId(e)),getTriggerEl:e=>d.getById(e,d.getTriggerId(e)),getTitleEl:e=>d.getById(e,d.getTitleId(e)),getDescriptionEl:e=>d.getById(e,d.getDescriptionId(e)),getCloseTriggerEl:e=>d.getById(e,d.getCloseTriggerId(e))});L()(["aria-label","closeOnEscape","closeOnInteractOutside","dir","finalFocusEl","getRootNode","getRootNode","id","id","ids","initialFocusEl","modal","onEscapeKeyDown","onFocusOutside","onInteractOutside","onOpenChange","onPointerDownOutside","open.controlled","open","persistentElements","preventScroll","restoreFocus","role","trapFocus"]);const[W,m]=D({name:"DialogContext",hookName:"useDialogContext",providerName:"<DialogProvider />"}),_=p.forwardRef((e,o)=>{const t=m(),r=$(),i=P({...r,present:t.open}),a=c(t.getBackdropProps(),i.getPresenceProps(o),e);return i.unmounted?null:l.jsx(E.div,{...a})});_.displayName="DialogBackdrop";const J=p.forwardRef((e,o)=>{const t=m(),r=c(t.getCloseTriggerProps(),e);return l.jsx(E.button,{...r,ref:o})});J.displayName="DialogCloseTrigger";const Q=p.forwardRef((e,o)=>{const t=m(),r=C(),i=c(t.getContentProps(),r.getPresenceProps(o),e);return r.unmounted?null:l.jsx(E.div,{...i})});Q.displayName="DialogContent";const U=p.forwardRef((e,o)=>{const t=m(),r=c(t.getDescriptionProps(),e);return l.jsx(E.div,{...r,ref:o})});U.displayName="DialogDescription";const X=p.forwardRef((e,o)=>{const t=m(),r=c(t.getPositionerProps(),e);return C().unmounted?null:l.jsx(E.div,{...r,ref:o})});X.displayName="DialogPositioner";var Y=y("dialog").parts("trigger","backdrop","positioner","content","title","description","closeTrigger"),u=Y.build(),n=v({getPositionerId:e=>{var o;return((o=e.ids)==null?void 0:o.positioner)??`dialog:${e.id}:positioner`},getBackdropId:e=>{var o;return((o=e.ids)==null?void 0:o.backdrop)??`dialog:${e.id}:backdrop`},getContentId:e=>{var o;return((o=e.ids)==null?void 0:o.content)??`dialog:${e.id}:content`},getTriggerId:e=>{var o;return((o=e.ids)==null?void 0:o.trigger)??`dialog:${e.id}:trigger`},getTitleId:e=>{var o;return((o=e.ids)==null?void 0:o.title)??`dialog:${e.id}:title`},getDescriptionId:e=>{var o;return((o=e.ids)==null?void 0:o.description)??`dialog:${e.id}:description`},getCloseTriggerId:e=>{var o;return((o=e.ids)==null?void 0:o.closeTrigger)??`dialog:${e.id}:close`},getContentEl:e=>n.getById(e,n.getContentId(e)),getPositionerEl:e=>n.getById(e,n.getPositionerId(e)),getBackdropEl:e=>n.getById(e,n.getBackdropId(e)),getTriggerEl:e=>n.getById(e,n.getTriggerId(e)),getTitleEl:e=>n.getById(e,n.getTitleId(e)),getDescriptionEl:e=>n.getById(e,n.getDescriptionId(e)),getCloseTriggerEl:e=>n.getById(e,n.getCloseTriggerId(e))});function z(e,o,t){const r=e.context["aria-label"],i=e.matches("open"),a=e.context.renderedElements;return{open:i,setOpen(s){s!==i&&o(s?"OPEN":"CLOSE")},getTriggerProps(){return t.button({...u.trigger.attrs,dir:e.context.dir,id:n.getTriggerId(e.context),"aria-haspopup":"dialog",type:"button","aria-expanded":i,"data-state":i?"open":"closed","aria-controls":n.getContentId(e.context),onClick(s){s.defaultPrevented||o("TOGGLE")}})},getBackdropProps(){return t.element({...u.backdrop.attrs,dir:e.context.dir,hidden:!i,id:n.getBackdropId(e.context),"data-state":i?"open":"closed"})},getPositionerProps(){return t.element({...u.positioner.attrs,dir:e.context.dir,id:n.getPositionerId(e.context),style:{pointerEvents:i?void 0:"none"}})},getContentProps(){return t.element({...u.content.attrs,dir:e.context.dir,role:e.context.role,hidden:!i,id:n.getContentId(e.context),tabIndex:-1,"data-state":i?"open":"closed","aria-modal":!0,"aria-label":r||void 0,"aria-labelledby":r||!a.title?void 0:n.getTitleId(e.context),"aria-describedby":a.description?n.getDescriptionId(e.context):void 0})},getTitleProps(){return t.element({...u.title.attrs,dir:e.context.dir,id:n.getTitleId(e.context)})},getDescriptionProps(){return t.element({...u.description.attrs,dir:e.context.dir,id:n.getDescriptionId(e.context)})},getCloseTriggerProps(){return t.button({...u.closeTrigger.attrs,dir:e.context.dir,id:n.getCloseTriggerId(e.context),type:"button",onClick(s){s.defaultPrevented||(s.stopPropagation(),o("CLOSE"))}})}}}function x(e){const o=S(e);return T({id:"dialog",initial:o.open?"open":"closed",context:{role:"dialog",renderedElements:{title:!0,description:!0},modal:!0,trapFocus:!0,preventScroll:!0,closeOnInteractOutside:!0,closeOnEscape:!0,restoreFocus:!0,...o},created:["checkInitialFocusEl"],watch:{open:["toggleVisibility"]},states:{open:{entry:["checkRenderedElements","syncZIndex"],activities:["trackDismissableElement","trapFocus","preventScroll","hideContentBelow"],on:{"CONTROLLED.CLOSE":{target:"closed",actions:["setFinalFocus"]},CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"closed",actions:["invokeOnClose","setFinalFocus"]}],TOGGLE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"closed",actions:["invokeOnClose","setFinalFocus"]}]}},closed:{on:{"CONTROLLED.OPEN":{target:"open"},OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen"]}],TOGGLE:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen"]}]}}}},{guards:{isOpenControlled:t=>!!t["open.controlled"]},activities:{trackDismissableElement(t,r,{send:i}){return K(()=>n.getContentEl(t),{defer:!0,pointerBlocking:t.modal,exclude:[n.getTriggerEl(t)],onInteractOutside(s){var g;(g=t.onInteractOutside)==null||g.call(t,s),(!t.closeOnInteractOutside||t.role==="alertdialog")&&s.preventDefault()},persistentElements:t.persistentElements,onFocusOutside:t.onFocusOutside,onPointerDownOutside:t.onPointerDownOutside,onEscapeKeyDown(s){var g;(g=t.onEscapeKeyDown)==null||g.call(t,s),t.closeOnEscape?i({type:"CLOSE",src:"escape-key"}):s.preventDefault()},onDismiss(){i({type:"CLOSE",src:"interact-outside"})}})},preventScroll(t){if(t.preventScroll)return H(n.getDoc(t))},trapFocus(t){if(!t.trapFocus||!t.modal)return;let r;const i=k(()=>{const a=n.getContentEl(t);if(a){r=V(a,{document:n.getDoc(t),escapeDeactivates:!1,preventScroll:!0,returnFocusOnDeactivate:!1,fallbackFocus:a,allowOutsideClick:!0,initialFocus:b({root:a,getInitialEl:t.initialFocusEl})});try{r.activate()}catch{}}});return()=>{r==null||r.deactivate(),i()}},hideContentBelow(t){return t.modal?A(()=>[n.getContentEl(t)],{defer:!0}):void 0}},actions:{checkInitialFocusEl(t){!t.initialFocusEl&&t.role==="alertdialog"&&(t.initialFocusEl=()=>n.getCloseTriggerEl(t))},checkRenderedElements(t){I(()=>{t.renderedElements.title=!!n.getTitleEl(t),t.renderedElements.description=!!n.getDescriptionEl(t)})},syncZIndex(t){I(()=>{const r=n.getContentEl(t);if(!r)return;const a=n.getWin(t).getComputedStyle(r);[n.getPositionerEl(t),n.getBackdropEl(t)].forEach(g=>{g==null||g.style.setProperty("--z-index",a.zIndex)})})},invokeOnClose(t){var r;(r=t.onOpenChange)==null||r.call(t,{open:!1})},invokeOnOpen(t){var r;(r=t.onOpenChange)==null||r.call(t,{open:!0})},toggleVisibility(t,r,{send:i}){i({type:t.open?"CONTROLLED.OPEN":"CONTROLLED.CLOSE",previousEvent:r})},setFinalFocus(t){t.restoreFocus&&queueMicrotask(()=>{var i;const r=((i=t.finalFocusEl)==null?void 0:i.call(t))??n.getTriggerEl(t);r==null||r.focus({preventScroll:!0})})}}})}F()(["aria-label","closeOnEscape","closeOnInteractOutside","dir","finalFocusEl","getRootNode","getRootNode","id","id","ids","initialFocusEl","modal","onEscapeKeyDown","onFocusOutside","onInteractOutside","onOpenChange","onPointerDownOutside","open.controlled","open","persistentElements","preventScroll","restoreFocus","role","trapFocus"]);const ee=(e={})=>{const{getRootNode:o}=w(),{dir:t}=N(),r={id:p.useId(),getRootNode:o,dir:t,open:e.defaultOpen,"open.controlled":e.open!==void 0,...e},i={...r,open:e.open,onOpenChange:O(e.onOpenChange,{sync:!0}),onEscapeKeyDown:O(e.onEscapeKeyDown),onInteractOutside:O(e.onInteractOutside)},[a,s]=B(x(r),{context:i});return z(a,s,h)},ue=e=>{const[o,{children:t,...r}]=M(e),[i]=j(o),a=ee(r),s=P(c({present:a.open},o));return l.jsx(W,{value:a,children:l.jsx(G,{value:i,children:l.jsx(q,{value:s,children:t})})})},te=p.forwardRef((e,o)=>{const t=m(),r=c(t.getTitleProps(),e);return l.jsx(E.h2,{...r,ref:o})});te.displayName="DialogTitle";const oe=p.forwardRef((e,o)=>{const t=m(),r=C(),i=c({...t.getTriggerProps(),"aria-controls":r.unmounted?void 0:t.getTriggerProps()["aria-controls"]},e);return l.jsx(E.button,{...i,ref:o})});oe.displayName="DialogTrigger";export{oe as D,Z as a,_ as b,X as c,Q as d,te as e,U as f,J as g,ue as h};
