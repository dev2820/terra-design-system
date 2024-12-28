import{j as f}from"./jsx-runtime-qGIIFXMu.js";import{r as F}from"./index-CDs2tPxN.js";import{B as C}from"./Button-Dwqr5mVQ.js";import{I as j}from"./IconButton-BhuYW3nN.js";import{T as V,R as K,A as W,C as z,a as X,D as Y}from"./Toast-BZdcr_rS.js";import{a as q,b as Z,d as v,s as J,C as Q,e as w,M as tt,D as et,z as st,r as L,q as ot,g as nt,E as O,A as at,m as it,h as rt,F as ct}from"./factory-BCO0_PXk.js";import{r as R,c as G,u as lt,w as ut}from"./index-6Viw2UEs.js";import{t as dt}from"./index-6PaDttyw.js";import{a as k}from"./index-DRtd-hRg.js";import{X as gt}from"./x-BG8jWvjC.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./index-B-yFm4aN.js";var pt=q("toast").parts("group","root","title","description","actionTrigger","closeTrigger"),I=pt.build(),h=Z({getRegionId:e=>`toast-group:${e}`,getRegionEl:(e,i)=>h.getById(e,`toast-group:${i}`),getRootId:e=>`toast:${e.id}`,getRootEl:e=>h.getById(e,h.getRootId(e)),getTitleId:e=>`toast:${e.id}:title`,getDescriptionId:e=>`toast:${e.id}:description`,getCloseTriggerId:e=>`toast${e.id}:close`});function _(e,i){return e.filter(t=>t.state.context.placement===i)}var M={info:5e3,error:5e3,success:2e3,loading:1/0,DEFAULT:5e3};function U(e,i){return e??M[i]??M.DEFAULT}function mt(e,i){var o;const t=e.offsets,s=typeof t=="string"?{left:t,right:t,bottom:t,top:t}:t,r=e.dir==="rtl",c=i.replace("-start",r?"-right":"-left").replace("-end",r?"-left":"-right"),u=c.includes("right"),p=c.includes("left"),d={position:"fixed",pointerEvents:e.count>0?void 0:"none",display:"flex",flexDirection:"column","--gap":`${e.gap}px`,"--first-height":`${((o=e.heights[0])==null?void 0:o.height)||0}px`,zIndex:tt};let a="center";if(u&&(a="flex-end"),p&&(a="flex-start"),d.alignItems=a,c.includes("top")){const n=s.top;d.top=`max(env(safe-area-inset-top, 0px), ${n})`}if(c.includes("bottom")){const n=s.bottom;d.bottom=`max(env(safe-area-inset-bottom, 0px), ${n})`}if(!c.includes("left")){const n=s.right;d.insetInlineEnd=`calc(env(safe-area-inset-right, 0px) + ${n})`}if(!c.includes("right")){const n=s.left;d.insetInlineStart=`calc(env(safe-area-inset-left, 0px) + ${n})`}return d}function ht(e,i){const[t]=e.placement.split("-"),s=!e.frontmost,r=!e.stacked,c={position:"absolute",pointerEvents:"auto","--opacity":"0","--remove-delay":`${e.removeDelay}ms`,"--duration":`${e.type==="loading"?Number.MAX_SAFE_INTEGER:e.duration}ms`,"--initial-height":`${e.height}px`,"--offset":`${e.offset}px`,"--index":e.index,"--z-index":e.zIndex,"--lift-amount":"calc(var(--lift) * var(--gap))","--y":"100%","--x":"0"},u=p=>Object.assign(c,p);return t==="top"?u({top:"0","--sign":"-1","--y":"-100%","--lift":"1"}):t==="bottom"&&u({bottom:"0","--sign":"1","--y":"100%","--lift":"-1"}),e.mounted&&(u({"--y":"0","--opacity":"1"}),e.stacked&&u({"--y":"calc(var(--lift) * var(--offset))","--height":"var(--initial-height)"})),i||u({"--opacity":"0",pointerEvents:"none"}),s&&r&&(u({"--base-scale":"var(--index) * 0.05 + 1","--y":"calc(var(--lift-amount) * var(--index))","--scale":"calc(-1 * var(--base-scale))","--height":"var(--first-height)"}),i||u({"--y":"calc(var(--sign) * 40%)"})),s&&e.stacked&&!i&&u({"--y":"calc(var(--lift) * var(--offset) + var(--lift) * -100%)"}),e.frontmost&&!i&&u({"--y":"calc(var(--lift) * -100%)"}),c}function ft(e,i){const t={position:"absolute",inset:"0",scale:"1 2",pointerEvents:i?"none":"auto"},s=r=>Object.assign(t,r);return e.frontmost&&!i&&s({height:"calc(var(--initial-height) + 80%)"}),t}function Tt(e,i){return{position:"absolute",left:"0",height:"calc(var(--gap) + 2px)",bottom:"100%",width:"100%"}}function yt(e,i,t){function s(){return et(e)?e.getState():e}function r(o){return _(s().context.toasts,o)}function c(o){const n=s().context.toasts;return n.length?!!n.find(l=>l.id==o):!1}function u(o){const n=`toast:${lt()}`,l=o.id?o.id:n;return c(l)||i({type:"ADD_TOAST",toast:{...o,id:l}}),l}function p(o,n){return c(o)&&i({type:"UPDATE_TOAST",id:o,toast:n}),o}function d(o){const{id:n}=o;return(n?c(n):!1)&&n!=null?p(n,o):u(o)}function a(o){o==null?i("DISMISS_ALL"):c(o)&&i({type:"DISMISS_TOAST",id:o})}return{getCount(){return s().context.count},getPlacements(){const n=s().context.toasts.map(l=>l.state.context.placement);return Array.from(new Set(n))},getToastsByPlacement:r,isVisible:c,create:u,update:p,upsert:d,dismiss:a,remove(o){o==null?i("REMOVE_ALL"):c(o)&&i({type:"REMOVE_TOAST",id:o})},dismissByPlacement(o){r(o).forEach(l=>a(l.id))},loading(o){return d({...o,type:"loading"})},success(o){return d({...o,type:"success"})},error(o){return d({...o,type:"error"})},promise(o,n,l={}){const g=d({...l,...n.loading,type:"loading"});return R(o).then(m=>{const T=R(n.success,m);d({...l,...T,id:g,type:"success"})}).catch(m=>{const T=R(n.error,m);d({...l,...T,id:g,type:"error"})}).finally(()=>{var m;(m=n.finally)==null||m.call(n)}),g},pause(o){o==null?i("PAUSE_ALL"):c(o)&&i({type:"PAUSE_TOAST",id:o})},resume(o){o==null?i("RESUME_ALL"):c(o)&&i({type:"RESUME_TOAST",id:o})},getGroupProps(o){const{placement:n,label:l="Notifications"}=o,g=s(),m=g.context.hotkey.join("+").replace(/Key/g,"").replace(/Digit/g,""),[T,D="center"]=n.split("-");return t.element({...I.group.attrs,dir:g.context.dir,tabIndex:-1,"aria-label":`${n} ${l} ${m}`,id:h.getRegionId(n),"data-placement":n,"data-side":T,"data-align":D,"aria-live":"polite",role:"region",style:mt(g.context,n),onMouseMove(){i({type:"REGION.POINTER_ENTER",placement:n})},onMouseLeave(){i({type:"REGION.POINTER_LEAVE",placement:n})},onFocus(E){i({type:"REGION.FOCUS",target:E.relatedTarget})},onBlur(E){g.context.isFocusWithin&&!J(E.currentTarget,E.relatedTarget)&&i({type:"REGION.BLUR"})}})},subscribe(o){const n=s();return Q(n.context.toasts,()=>{const g=r(n.context.placement).map(m=>m.getState().context);o(g)})}}}var{not:Et,and:vt,or:It}=nt;function St(e){const{type:i="info",duration:t,id:s="1",placement:r="bottom",removeDelay:c=200,...u}=e,p=G(u),d=U(t,i);return w({id:s,context:{id:s,type:i,remaining:d,duration:d,removeDelay:c,createdAt:Date.now(),placement:r,...p,height:0,offset:0,frontmost:!1,mounted:!1,index:-1,zIndex:0},initial:i==="loading"?"visible:persist":"visible",on:{UPDATE:[{guard:vt("hasTypeChanged","isChangingToLoading"),target:"visible:persist",actions:["setContext"]},{guard:It("hasDurationChanged","hasTypeChanged"),target:"visible:updating",actions:["setContext"]},{actions:["setContext"]}],MEASURE:{actions:["measureHeight"]}},entry:["invokeOnVisible"],activities:["trackHeight"],states:{"visible:updating":{tags:["visible","updating"],after:{0:"visible"}},"visible:persist":{tags:["visible","paused"],on:{RESUME:{guard:Et("isLoadingType"),target:"visible",actions:["setCreatedAt"]},DISMISS:"dismissing"}},visible:{tags:["visible"],after:{VISIBLE_DURATION:"dismissing"},on:{DISMISS:"dismissing",PAUSE:{target:"visible:persist",actions:"setRemainingDuration"}}},dismissing:{entry:"invokeOnDismiss",after:{REMOVE_DELAY:{target:"unmounted",actions:"notifyParentToRemove"}}},unmounted:{entry:"invokeOnUnmount",type:"final"}}},{activities:{trackHeight(a,o,{self:n}){let l;return L(()=>{const g=h.getRootEl(a);if(!g)return;a.mounted=!0;const m=ot(g,"[data-ghost]");ut(m.length!==2,"[toast] No ghost element found in toast. Render the `ghostBefore` and `ghostAfter` elements");const T=()=>{const $=g.style.height;g.style.height="auto";const P=g.getBoundingClientRect().height;g.style.height=$,a.height=P,n.sendParent({type:"UPDATE_HEIGHT",id:n.id,height:P,placement:a.placement})};T();const D=h.getWin(a),E=new D.MutationObserver(T);E.observe(g,{childList:!0,subtree:!0,characterData:!0}),l=()=>E.disconnect()}),()=>l==null?void 0:l()}},guards:{isChangingToLoading:(a,o)=>{var n;return((n=o.toast)==null?void 0:n.type)==="loading"},isLoadingType:a=>a.type==="loading",hasTypeChanged:(a,o)=>{var n;return((n=o.toast)==null?void 0:n.type)!=null&&o.toast.type!==a.type},hasDurationChanged:(a,o)=>{var n;return((n=o.toast)==null?void 0:n.duration)!=null&&o.toast.duration!==a.duration}},delays:{VISIBLE_DURATION:a=>a.remaining,REMOVE_DELAY:a=>a.removeDelay},actions:{measureHeight(a,o,{self:n}){L(()=>{const l=h.getRootEl(a);if(!l)return;a.mounted=!0;const g=l.style.height;l.style.height="auto";const m=l.getBoundingClientRect().height;l.style.height=g,a.height=m,n.sendParent({type:"UPDATE_HEIGHT",id:n.id,height:m,placement:a.placement})})},setRemainingDuration(a){a.remaining-=Date.now()-a.createdAt},setCreatedAt(a){a.createdAt=Date.now()},notifyParentToRemove(a,o,{self:n}){n.sendParent({type:"REMOVE_TOAST",id:n.id})},invokeOnDismiss(a){var o;(o=a.onStatusChange)==null||o.call(a,{status:"dismissing"})},invokeOnUnmount(a){var o;(o=a.onStatusChange)==null||o.call(a,{status:"unmounted"})},invokeOnVisible(a){var o;(o=a.onStatusChange)==null||o.call(a,{status:"visible"})},setContext(a,o){var m,T;const n=(m=o.toast)==null?void 0:m.duration,l=((T=o.toast)==null?void 0:T.type)??a.type,g=U(n,l);Object.assign(a,{...o.toast,duration:g,remaining:g})}}})}function At(e){const i=G(e);return w({id:"toaster",initial:i.overlap?"overlap":"stack",context:{dir:"ltr",max:Number.MAX_SAFE_INTEGER,gap:16,pauseOnPageIdle:!1,hotkey:["altKey","KeyT"],offsets:"1rem",placement:"bottom",removeDelay:200,...i,toasts:[],lastFocusedEl:null,isFocusWithin:!1,heights:[]},computed:{count:t=>t.toasts.length},activities:["trackDocumentVisibility","trackHotKeyPress"],watch:{toasts:["collapsedIfEmpty","setDismissableBranch"]},exit:["removeToasts","clearDismissableBranch","clearLastFocusedEl"],on:{PAUSE_TOAST:{actions:["pauseToast"]},PAUSE_ALL:{actions:["pauseToasts"]},RESUME_TOAST:{actions:["resumeToast"]},RESUME_ALL:{actions:["resumeToasts"]},ADD_TOAST:{guard:"isWithinRange",actions:["createToast","syncToastIndex"]},UPDATE_TOAST:{actions:["updateToast"]},DISMISS_TOAST:{actions:["dismissToast"]},DISMISS_ALL:{actions:["dismissToasts"]},REMOVE_TOAST:{actions:["removeToast","syncToastIndex","syncToastOffset"]},REMOVE_ALL:{actions:["removeToasts"]},UPDATE_HEIGHT:{actions:["syncHeights","syncToastOffset"]},"DOC.HOTKEY":{actions:["focusRegionEl"]},"REGION.BLUR":[{guard:"isOverlapping",target:"overlap",actions:["resumeToasts","restoreLastFocusedEl"]},{actions:["resumeToasts","restoreLastFocusedEl"]}]},states:{stack:{entry:["expandToasts"],on:{"REGION.POINTER_LEAVE":[{guard:"isOverlapping",target:"overlap",actions:["resumeToasts"]},{actions:["resumeToasts"]}],"REGION.OVERLAP":{target:"overlap"},"REGION.FOCUS":{actions:["setLastFocusedEl","pauseToasts"]},"REGION.POINTER_ENTER":{actions:["pauseToasts"]}}},overlap:{entry:["collapseToasts"],on:{"REGION.STACK":{target:"stack"},"REGION.POINTER_ENTER":{target:"stack",actions:["pauseToasts"]},"REGION.FOCUS":{target:"stack",actions:["setLastFocusedEl","pauseToasts"]}}}}},{guards:{isWithinRange:t=>t.toasts.length<t.max,isOverlapping:t=>!!t.overlap},activities:{trackHotKeyPress(t,s,{send:r}){return k(document,"keydown",u=>{t.hotkey.every(d=>u[d]||u.code===d)&&r({type:"DOC.HOTKEY"})},{capture:!0})},trackDocumentVisibility(t,s,{send:r}){if(!t.pauseOnPageIdle)return;const c=h.getDoc(t);return k(c,"visibilitychange",()=>{r(c.visibilityState==="hidden"?"PAUSE_ALL":"RESUME_ALL")})}},actions:{setDismissableBranch(t){var u;const r=_(t.toasts,t.placement).length>0;if(!r){(u=t._cleanup)==null||u.call(t);return}if(r&&t._cleanup)return;const c=()=>h.getRegionEl(t,t.placement);t._cleanup=dt(c,{defer:!0})},clearDismissableBranch(t){var s;(s=t._cleanup)==null||s.call(t)},focusRegionEl(t){queueMicrotask(()=>{var s;(s=h.getRegionEl(t,t.placement))==null||s.focus()})},expandToasts(t){S(t,s=>{s.state.context.stacked=!0})},collapseToasts(t){S(t,s=>{s.state.context.stacked=!1})},collapsedIfEmpty(t,s,{send:r}){!t.overlap||t.toasts.length>1||r("REGION.OVERLAP")},pauseToast(t,s,{self:r}){r.sendChild("PAUSE",s.id)},pauseToasts(t){t.toasts.forEach(s=>s.send("PAUSE"))},resumeToast(t,s,{self:r}){r.sendChild("RESUME",s.id)},resumeToasts(t){t.toasts.forEach(s=>s.send("RESUME"))},measureToasts(t){t.toasts.forEach(s=>s.send("MEASURE"))},createToast(t,s,{self:r,getState:c}){const u={placement:t.placement,duration:t.duration,removeDelay:t.removeDelay,...s.toast,dir:t.dir,getRootNode:t.getRootNode,stacked:c().matches("stack")},p=St(u),d=r.spawn(p);t.toasts=[d,...t.toasts]},updateToast(t,s,{self:r}){r.sendChild({type:"UPDATE",toast:s.toast},s.id)},dismissToast(t,s,{self:r}){r.sendChild("DISMISS",s.id)},dismissToasts(t){t.toasts.forEach(s=>s.send("DISMISS"))},removeToast(t,s,{self:r}){r.stopChild(s.id),t.toasts=t.toasts.filter(c=>c.id!==s.id),t.heights=t.heights.filter(c=>c.id!==s.id)},removeToasts(t,s,{self:r}){t.toasts.forEach(c=>r.stopChild(c.id)),t.toasts=[],t.heights=[]},syncHeights(t,s){const r=t.heights.find(c=>c.id===s.id);if(r)r.height=s.height,r.placement=s.placement;else{const c={id:s.id,height:s.height,placement:s.placement};t.heights=[c,...t.heights]}},syncToastIndex(t){S(t,(s,r,c)=>{s.state.context.index=r,s.state.context.frontmost=r===0,s.state.context.zIndex=c.length-r})},syncToastOffset(t,s){const r=s.placement??t.placement;S({...t,placement:r},c=>{const u=Math.max(t.heights.findIndex(d=>d.id===c.id),0),p=t.heights.reduce((d,a,o)=>o>=u?d:d+a.height,0);c.state.context.offset=u*t.gap+p})},setLastFocusedEl(t,s){t.isFocusWithin||!s.target||(t.isFocusWithin=!0,t.lastFocusedEl=st(s.target))},restoreLastFocusedEl(t){t.isFocusWithin=!1,t.lastFocusedEl&&(t.lastFocusedEl.focus({preventScroll:!0}),t.lastFocusedEl=null)},clearLastFocusedEl(t){t.lastFocusedEl&&(t.lastFocusedEl.focus({preventScroll:!0}),t.lastFocusedEl=null,t.isFocusWithin=!1)}}})}function S(e,i){_(e.toasts,e.placement).forEach(i)}function Dt(e,i,t){const s=e.hasTag("visible"),r=e.hasTag("paused"),c=e.context.placement,u=e.context.type,[p,d="center"]=c.split("-");return{type:u,title:e.context.title,description:e.context.description,placement:c,visible:s,paused:r,pause(){i("PAUSE")},resume(){i("RESUME")},dismiss(){i("DISMISS")},getRootProps(){return t.element({...I.root.attrs,dir:e.context.dir,id:h.getRootId(e.context),"data-state":s?"open":"closed","data-type":u,"data-placement":c,"data-align":d,"data-side":p,"data-mounted":v(e.context.mounted),"data-paused":v(r),"data-first":v(e.context.frontmost),"data-sibling":v(!e.context.frontmost),"data-stack":v(e.context.stacked),"data-overlap":v(!e.context.stacked),role:"status","aria-atomic":"true","aria-describedby":e.context.description?h.getDescriptionId(e.context):void 0,"aria-labelledby":e.context.title?h.getTitleId(e.context):void 0,tabIndex:0,style:ht(e.context,s),onKeyDown(a){a.defaultPrevented||a.key=="Escape"&&(i("DISMISS"),a.preventDefault())}})},getGhostBeforeProps(){return t.element({"data-ghost":"before",style:ft(e.context,s)})},getGhostAfterProps(){return t.element({"data-ghost":"after",style:Tt(e.context)})},getTitleProps(){return t.element({...I.title.attrs,id:h.getTitleId(e.context)})},getDescriptionProps(){return t.element({...I.description.attrs,id:h.getDescriptionId(e.context)})},getActionTriggerProps(){return t.button({...I.actionTrigger.attrs,type:"button",onClick(a){a.defaultPrevented||i("DISMISS")}})},getCloseTriggerProps(){return t.button({id:h.getCloseTriggerId(e.context),...I.closeTrigger.attrs,type:"button","aria-label":"Dismiss notification",onClick(a){a.defaultPrevented||i("DISMISS")}})}}}var b={connect:yt,machine:At};const Rt=e=>{const i=b.machine({id:"1",...e});return{...b.connect(i,i.send,O),machine:i}},H=F.forwardRef((e,i)=>{const{toaster:t,children:s,...r}=e,[c,u]=at(t.machine),p=c.context.placement,d=b.connect(c,u,O),a=d.getToastsByPlacement(p),o=it(d.getGroupProps({placement:p}),r);return f.jsx(rt.div,{...o,ref:i,children:a.map(n=>f.jsx(bt,{value:n,children:l=>s(l)},n.id))})});H.displayName="Toaster";const bt=e=>{const[i,t]=ct(e.value),s=Dt(i,t,O);return f.jsx(V,{value:s,children:e.children(i.context)})},y={Toaster:H,Root:K,ActionTrigger:W,CloseTrigger:z,Title:X,Description:Y,createToaster:Rt},Ht={title:"Components/Toast",component:y.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/toast"}}},tags:["autodocs"],argTypes:{},args:{}},A={args:{},render:e=>{const i=y.createToaster({placement:"bottom-end",overlap:!0,gap:16,removeDelay:300,duration:5e3}),t=()=>{i.create({title:"Lorem Ipsum",description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",type:"info"})};return f.jsxs("div",{className:"trds-w-96 trds-h-96",children:[f.jsx(C,{onClick:t,children:"Show Toast"}),f.jsx(y.Toaster,{toaster:i,children:s=>F.createElement(y.Root,{...e,key:s.id},f.jsx(y.Title,{children:s.title}),f.jsx(y.Description,{children:s.description}),f.jsx(y.ActionTrigger,{asChild:!0,children:f.jsx(C,{size:"md",theme:"primary",children:"Confirm"})}),f.jsx(y.CloseTrigger,{asChild:!0,children:f.jsx(j,{size:"xs",theme:"blackAlpha",variant:"ghost",children:f.jsx(gt,{size:16})})}))})]})}};var x,N,B;A.parameters={...A.parameters,docs:{...(x=A.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: ToastProps['root']) => {
    const toaster = Toast.createToaster({
      placement: 'bottom-end',
      overlap: true,
      gap: 16,
      removeDelay: 300,
      duration: 5000
    });
    const showToast = () => {
      toaster.create({
        title: 'Lorem Ipsum',
        description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        type: 'info'
      });
    };
    return <div className="trds-w-96 trds-h-96">
        <Button onClick={showToast}>Show Toast</Button>
        <Toast.Toaster toaster={toaster}>
          {toast => <Toast.Root {...props} key={toast.id}>
              <Toast.Title>{toast.title}</Toast.Title>
              <Toast.Description>{toast.description}</Toast.Description>
              <Toast.ActionTrigger asChild>
                <Button size="md" theme="primary">
                  Confirm
                </Button>
              </Toast.ActionTrigger>
              <Toast.CloseTrigger asChild>
                <IconButton size="xs" theme="blackAlpha" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Toast.CloseTrigger>
            </Toast.Root>}
        </Toast.Toaster>
      </div>;
  }
}`,...(B=(N=A.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};const $t=["Default"];export{A as Default,$t as __namedExportsOrder,Ht as default};
