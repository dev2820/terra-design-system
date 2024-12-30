import{j as l}from"./jsx-runtime-qGIIFXMu.js";import{t as W,I as K,c as y}from"./tv-CIwtzMts.js";import{r as f}from"./index-CDs2tPxN.js";import{c as X}from"./create-react-context-Dw26gLIP.js";import{c as H,p as I,s as R,a as q,b as Y,q as J,J as Q,K as G,L as Z,d as b,N as tt,O as et,P as rt,e as at,f as V,g as st,r as T,n as N,Q as ot,A as nt,E as it}from"./factory-CadeRpXq.js";import{c as P}from"./create-split-props-u5h9OPvL.js";import{u as dt,s as ct,R as lt}from"./render-strategy-CzRczIFU.js";import{g as ut,c as gt}from"./index-D_n9ZWii.js";import{f as ft,l as pt,c as mt,a as F}from"./index-BzeP-DbB.js";import{t as bt}from"./index-BR8t6gqn.js";import{u as vt,a as Tt}from"./use-locale-context-BgVInbo7.js";import{u as A}from"./use-event-eGuf5zsd.js";import{u as ht,P as yt}from"./use-presence-dzHLm_sJ.js";const[It,x]=H({name:"TabsContext",hookName:"useTabsContext",providerName:"<TabsProvider />"}),L=f.forwardRef((t,r)=>{const[e,a]=P()(t,["value"]),o=x(),i=dt(),d=ht({...i,present:o.value===t.value,immediate:!0}),p=I(o.getContentProps(e),d.getPresenceProps(r),a);return l.jsx(yt,{value:d,children:d.unmounted?null:l.jsx(R.div,{...p})})});L.displayName="TabContent";const O=f.forwardRef((t,r)=>{const e=x(),a=I(e.getIndicatorProps(),t);return l.jsx(R.div,{...a,ref:r})});O.displayName="TabIndicator";const k=f.forwardRef((t,r)=>{const e=x(),a=I(e.getListProps(),t);return l.jsx(R.div,{...a,ref:r})});k.displayName="TabList";const z=f.forwardRef((t,r)=>{const[e,a]=P()(t,["disabled","value"]),o=x(),i=I(o.getTriggerProps(e),a);return l.jsx(R.button,{...i,ref:r})});z.displayName="TabTrigger";var Rt=q("tabs").parts("root","list","trigger","content","indicator"),h=Rt.build(),s=Y({getRootId:t=>{var r;return((r=t.ids)==null?void 0:r.root)??`tabs:${t.id}`},getListId:t=>{var r;return((r=t.ids)==null?void 0:r.list)??`tabs:${t.id}:list`},getContentId:(t,r)=>{var e;return((e=t.ids)==null?void 0:e.content)??`tabs:${t.id}:content-${r}`},getTriggerId:(t,r)=>{var e;return((e=t.ids)==null?void 0:e.trigger)??`tabs:${t.id}:trigger-${r}`},getIndicatorId:t=>{var r;return((r=t.ids)==null?void 0:r.indicator)??`tabs:${t.id}:indicator`},getListEl:t=>s.getById(t,s.getListId(t)),getContentEl:(t,r)=>s.getById(t,s.getContentId(t,r)),getTriggerEl:(t,r)=>s.getById(t,s.getTriggerId(t,r)),getIndicatorEl:t=>s.getById(t,s.getIndicatorId(t)),getElements:t=>{const e=`[role=tab][data-ownedby='${CSS.escape(s.getListId(t))}']:not([disabled])`;return J(s.getListEl(t),e)},getFirstTriggerEl:t=>ft(s.getElements(t)),getLastTriggerEl:t=>pt(s.getElements(t)),getNextTriggerEl:(t,r)=>Q(s.getElements(t),s.getTriggerId(t,r),t.loopFocus),getPrevTriggerEl:(t,r)=>G(s.getElements(t),s.getTriggerId(t,r),t.loopFocus),getSelectedContentEl:t=>{if(t.value)return s.getContentEl(t,t.value)},getSelectedTriggerEl:t=>{if(t.value)return s.getTriggerEl(t,t.value)},getOffsetRect:t=>({left:(t==null?void 0:t.offsetLeft)??0,top:(t==null?void 0:t.offsetTop)??0,width:(t==null?void 0:t.offsetWidth)??0,height:(t==null?void 0:t.offsetHeight)??0}),getRectById:(t,r)=>{const e=Z(s.getElements(t),s.getTriggerId(t,r));return s.resolveRect(s.getOffsetRect(e))},resolveRect:t=>({width:`${t.width}px`,height:`${t.height}px`,left:`${t.left}px`,top:`${t.top}px`})});function Et(t,r,e){const a=t.context.translations,o=t.matches("focused"),i=t.context.orientation==="vertical",d=t.context.orientation==="horizontal",p=t.context.composite,m=t.context.indicatorState;function _(n){return{selected:t.context.value===n.value,focused:t.context.focusedValue===n.value,disabled:!!n.disabled}}return{value:t.context.value,focusedValue:t.context.focusedValue,setValue(n){r({type:"SET_VALUE",value:n})},clearValue(){r({type:"CLEAR_VALUE"})},setIndicatorRect(n){const c=s.getTriggerId(t.context,n);r({type:"SET_INDICATOR_RECT",id:c})},syncTabIndex(){r("SYNC_TAB_INDEX")},selectNext(n){r({type:"TAB_FOCUS",value:n,src:"selectNext"}),r({type:"ARROW_NEXT",src:"selectNext"})},selectPrev(n){r({type:"TAB_FOCUS",value:n,src:"selectPrev"}),r({type:"ARROW_PREV",src:"selectPrev"})},focus(){var n;(n=s.getSelectedTriggerEl(t.context))==null||n.focus()},getRootProps(){return e.element({...h.root.attrs,id:s.getRootId(t.context),"data-orientation":t.context.orientation,"data-focus":b(o),dir:t.context.dir})},getListProps(){return e.element({...h.list.attrs,id:s.getListId(t.context),role:"tablist",dir:t.context.dir,"data-focus":b(o),"aria-orientation":t.context.orientation,"data-orientation":t.context.orientation,"aria-label":a==null?void 0:a.listLabel,onKeyDown(n){if(n.defaultPrevented||!tt(n)||et(n))return;const c={ArrowDown(){d||r({type:"ARROW_NEXT",key:"ArrowDown"})},ArrowUp(){d||r({type:"ARROW_PREV",key:"ArrowUp"})},ArrowLeft(){i||r({type:"ARROW_PREV",key:"ArrowLeft"})},ArrowRight(){i||r({type:"ARROW_NEXT",key:"ArrowRight"})},Home(){r("HOME")},End(){r("END")},Enter(){r({type:"ENTER"})}};let u=ut(n,t.context);const g=c[u];g&&(n.preventDefault(),g(n))}})},getTriggerState:_,getTriggerProps(n){const{value:c,disabled:u}=n,g=_(n);return e.button({...h.trigger.attrs,role:"tab",type:"button",disabled:u,dir:t.context.dir,"data-orientation":t.context.orientation,"data-disabled":b(u),"aria-disabled":u,"data-value":c,"aria-selected":g.selected,"data-selected":b(g.selected),"data-focus":b(g.focused),"aria-controls":g.selected?s.getContentId(t.context,c):void 0,"data-ownedby":s.getListId(t.context),"data-ssr":b(t.context.ssr),id:s.getTriggerId(t.context,c),tabIndex:g.selected&&p?0:-1,onFocus(){r({type:"TAB_FOCUS",value:c})},onBlur(E){const C=E.relatedTarget;(C==null?void 0:C.getAttribute("role"))!=="tab"&&r({type:"TAB_BLUR"})},onClick(E){E.defaultPrevented||u||(rt()&&E.currentTarget.focus(),r({type:"TAB_CLICK",value:c}))}})},getContentProps(n){const{value:c}=n,u=t.context.value===c;return e.element({...h.content.attrs,dir:t.context.dir,id:s.getContentId(t.context,c),tabIndex:p?0:-1,"aria-labelledby":s.getTriggerId(t.context,c),role:"tabpanel","data-ownedby":s.getListId(t.context),"data-selected":b(u),"data-orientation":t.context.orientation,hidden:!u})},getIndicatorProps(){var n,c,u,g;return e.element({id:s.getIndicatorId(t.context),...h.indicator.attrs,dir:t.context.dir,"data-orientation":t.context.orientation,style:{"--transition-property":"left, right, top, bottom, width, height","--left":(n=m.rect)==null?void 0:n.left,"--top":(c=m.rect)==null?void 0:c.top,"--width":(u=m.rect)==null?void 0:u.width,"--height":(g=m.rect)==null?void 0:g.height,position:"absolute",willChange:"var(--transition-property)",transitionProperty:"var(--transition-property)",transitionDuration:m.transition?"var(--transition-duration, 150ms)":"0ms",transitionTimingFunction:"var(--transition-timing-function)",[d?"left":"top"]:d?"var(--left)":"var(--top)"}})}}}var{not:xt}=st;function wt(t){const r=mt(t);return at({initial:"idle",context:{dir:"ltr",orientation:"horizontal",activationMode:"automatic",value:null,loopFocus:!0,composite:!0,...r,focusedValue:r.value??null,ssr:!0,indicatorState:{rendered:!1,transition:!1,rect:{left:"0px",top:"0px",width:"0px",height:"0px"}}},watch:{value:["allowIndicatorTransition","syncIndicatorRect","syncTabIndex","clickIfLink"],dir:["syncIndicatorRect"],orientation:["syncIndicatorRect"]},on:{SET_VALUE:{actions:"setValue"},CLEAR_VALUE:{actions:"clearValue"},SET_INDICATOR_RECT:{actions:"setIndicatorRect"},SYNC_TAB_INDEX:{actions:"syncTabIndex"}},created:["syncFocusedValue"],entry:["checkRenderedElements","syncIndicatorRect","syncTabIndex","syncSsr"],exit:["cleanupObserver"],states:{idle:{on:{TAB_FOCUS:{target:"focused",actions:"setFocusedValue"},TAB_CLICK:{target:"focused",actions:["setFocusedValue","setValue"]}}},focused:{on:{TAB_CLICK:{target:"focused",actions:["setFocusedValue","setValue"]},ARROW_PREV:[{guard:"selectOnFocus",actions:["focusPrevTab","selectFocusedTab"]},{actions:"focusPrevTab"}],ARROW_NEXT:[{guard:"selectOnFocus",actions:["focusNextTab","selectFocusedTab"]},{actions:"focusNextTab"}],HOME:[{guard:"selectOnFocus",actions:["focusFirstTab","selectFocusedTab"]},{actions:"focusFirstTab"}],END:[{guard:"selectOnFocus",actions:["focusLastTab","selectFocusedTab"]},{actions:"focusLastTab"}],ENTER:{guard:xt("selectOnFocus"),actions:"selectFocusedTab"},TAB_FOCUS:{actions:["setFocusedValue"]},TAB_BLUR:{target:"idle",actions:"clearFocusedValue"}}}}},{guards:{selectOnFocus:e=>e.activationMode==="automatic"},actions:{syncFocusedValue(e){e.value!=null&&e.focusedValue==null&&(e.focusedValue=e.value)},selectFocusedTab(e){T(()=>{v.value(e,e.focusedValue)})},setFocusedValue(e,a){a.value!=null&&v.focusedValue(e,a.value)},clearFocusedValue(e){v.focusedValue(e,null)},setValue(e,a){v.value(e,a.value)},clearValue(e){v.value(e,null)},focusFirstTab(e){T(()=>{var a;(a=s.getFirstTriggerEl(e))==null||a.focus()})},focusLastTab(e){T(()=>{var a;(a=s.getLastTriggerEl(e))==null||a.focus()})},focusNextTab(e){if(!e.focusedValue)return;const a=s.getNextTriggerEl(e,e.focusedValue);T(()=>{e.composite?a==null||a.focus():(a==null?void 0:a.dataset.value)!=null&&v.focusedValue(e,a.dataset.value)})},focusPrevTab(e){if(!e.focusedValue)return;const a=s.getPrevTriggerEl(e,e.focusedValue);T(()=>{e.composite?a==null||a.focus():(a==null?void 0:a.dataset.value)!=null&&v.focusedValue(e,a.dataset.value)})},checkRenderedElements(e){e.indicatorState.rendered=!!s.getIndicatorEl(e)},syncTabIndex(e){T(()=>{const a=s.getSelectedContentEl(e);if(!a)return;ot(a).length>0?a.removeAttribute("tabindex"):a.setAttribute("tabindex","0")})},cleanupObserver(e){var a;(a=e.indicatorCleanup)==null||a.call(e)},allowIndicatorTransition(e){e.indicatorState.transition=!0},setIndicatorRect(e,a){const o=a.id??e.value;!e.indicatorState.rendered||!o||!s.getTriggerEl(e,o)||(e.indicatorState.rect=s.getRectById(e,o),N(()=>{e.indicatorState.transition=!1}))},syncSsr(e){e.ssr=!1},syncIndicatorRect(e){var i;(i=e.indicatorCleanup)==null||i.call(e);const a=e.value;if(!e.indicatorState.rendered||!a)return;const o=s.getSelectedTriggerEl(e);o&&(e.indicatorCleanup=bt(o,{getRect(d){return s.getOffsetRect(d)},onChange(d){e.indicatorState.rect=s.resolveRect(d),N(()=>{e.indicatorState.transition=!1})}}))},clickIfLink(e){gt(s.getSelectedTriggerEl(e))}}})}var S={change:t=>{var r;t.value!=null&&((r=t.onValueChange)==null||r.call(t,{value:t.value}))},focusChange:t=>{var r;t.focusedValue!=null&&((r=t.onFocusChange)==null||r.call(t,{focusedValue:t.focusedValue}))}},v={value:(t,r)=>{F(r,t.value)||(t.value=r,S.change(t))},focusedValue:(t,r)=>{F(r,t.focusedValue)||(t.focusedValue=r,S.focusChange(t))}};V()(["activationMode","composite","dir","getRootNode","id","ids","loopFocus","onFocusChange","onValueChange","orientation","translations","value"]);V()(["disabled","value"]);V()(["value"]);const Ct=t=>{const{getRootNode:r}=vt(),{dir:e}=Tt(),a={id:f.useId(),dir:e,getRootNode:r,value:t.defaultValue,...t},o={...a,value:t.value,onValueChange:A(t.onValueChange,{sync:!0}),onFocusChange:A(t.onFocusChange)},[i,d]=nt(wt(a),{context:o});return Et(i,d,it)},B=f.forwardRef((t,r)=>{const[e,a]=ct(t),[o,i]=P()(a,["activationMode","composite","defaultValue","id","ids","loopFocus","onFocusChange","onValueChange","orientation","translations","value"]),d=Ct(o),p=I(d.getRootProps(),i);return l.jsx(It,{value:d,children:l.jsx(lt,{value:e,children:l.jsx(R.div,{...p,ref:r})})})});B.displayName="TabsRoot";const Vt=W({base:`${K.scope} tabs`,slots:{root:"trds-flex trds-w-full data-horizontal:trds-flex-col data-vertical:trds-flex-row",list:"trds-flex trds-flex-shrink-0 data-horizontal:trds-flex-row data-vertical:trds-flex-col trds-overflow-auto trds-relative trds-scrollbar-none [&::-webkit-scrollbar]:trds-hidden",trigger:["trds-inline-flex trds-items-center trds-text-fg-caption trds-cursor-pointer trds-flex-shrink-0 trds-font-semibold trds-gap-2 trds-justify-center","trds-transition trds-duration-normal trds-transition-[color,background,border-color] trds-ease-default","trds-whitespace-nowrap trds-z-elevated data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed hover:trds-text-neutral-800 data-selected:trds-text-neutral-800 data-vertical:trds-justify-start"],content:"",indicator:""},variants:{variant:{enclosed:{list:"trds-rounded-lg trds-border trds-border-boundary trds-px-1 trds-bg-layer1 dark:trds-bg-neutral-800 data-horizontal:trds-items-center data-vertical:trds-h-fit data-vertical:trds-py-1",indicator:"trds-bg-white light:trds-bg-fg-caption dark:trds-bg-neutral-700 trds-shadow-md trds-rounded-lg trds-transition-duration-normal trds-h-[var(--height)] trds-w-[var(--width)]"},line:{list:'data-horizontal:trds-shadow-[0_-1px_0_0_inset_var(--colors-boundary, "9ca3af")] data-horizontal:trds-gap-4 data-vertical:trds-shadow-[1px_0_0_0_inset_var(--colors-boundary,"9ca3af")] data-vertical:trds-gap-1',indicator:"trds-bg-primary-500 data-horizontal:trds-bottom-0 data-horizontal:trds-h-[2px] data-horizontal:trds-w-[var(--width)] data-vertical:trds-left-0 data-vertical:trds-h-[var(--height)] data-vertical:trds-w-[2px]",content:"trds-pt-4",trigger:"data-horizontal:trds-pb-2.5"},outline:{list:"data-horizontal:trds-mb-[-1px] data-vertical:trds-mr-[-1px]",trigger:[" trds-border trds-border-transparent","data-horizontal:trds-rounded-t-md data-vertical:trds-rounded-tl-md data-vertical:trds-rounded-bl-md",'data-selected:trds-bg-white data-selected:trds-border-boundary data-selected:[&[data-orientation="horizontal"]]:trds-border-b-transparent data-selected:[&[data-orientation="vertical"]]:trds-border-r-transparent'],content:"trds-bg-white trds-border trds-border-boundary trds-border-[1px] trds-w-full"}},size:{sm:{trigger:"[&_svg]:w-4 [&_svg]:h-4"},md:{trigger:"[&_svg]:w-5 [&_svg]:h-5"},lg:{trigger:"[&_svg]:w-5 [&_svg]:h-5"}}},defaultVariants:{variant:"line",size:"md"},compoundVariants:[{size:"sm",variant:"enclosed",class:{list:"trds-h-10",trigger:"trds-h-8 trds-min-w-8 trds-text-sm trds-px-3",content:"trds-p-3.5"}},{size:"md",variant:"enclosed",class:{list:"trds-h-11",trigger:"trds-h-9 trds-min-w-9 trds-text-sm trds-px-3.5",content:"trds-p-4"}},{size:"lg",variant:"enclosed",class:{list:"trds-h-12",trigger:"trds-h-10 trds-min-w-10 trds-text-sm trds-px-4",content:"trds-p-4.5"}},{size:"sm",variant:"outline",class:{trigger:"trds-h-9 trds-min-w-9 trds-text-sm trds-px-3.5",content:"trds-p-3.5"}},{size:"md",variant:"outline",class:{trigger:"trds-h-10 trds-min-w-10 trds-text-sm trds-px-4",content:"trds-p-4"}},{size:"lg",variant:"outline",class:{trigger:"trds-h-11 trds-min-w-11 trds-text-md trds-px-[18px]",content:"trds-p-[18px]"}},{size:"sm",variant:"line",class:{trigger:"trds-text-sm trds-h-9 trds-min-w-9 trds-px-2.5",content:"trds-pt-3"}},{size:"md",variant:"line",class:{trigger:"trds-text-md trds-h-10 trds-min-w-10 trds-px-3",content:"trds-pt-4"}},{size:"lg",variant:"line",class:{trigger:"trds-text-md trds-h-11 trds-min-w-11 trds-px-3.5",content:"trds-pt-5"}}]}),[Pt,w]=X({name:"tabs",hookName:"useTabsContext",providerName:"TabsProvider",defaultValue:{classes:{}}}),j=f.forwardRef(function(t,r){const{size:e,variant:a,className:o,children:i,...d}=t,p=Vt({size:e,variant:a}),m={classes:p};return l.jsx(Pt,{value:m,children:l.jsx(B,{ref:r,className:y(p.root(),o),...d,children:i})})});j.displayName="Tabs.Root";const $=f.forwardRef(function(t,r){const{className:e,children:a,...o}=t,{classes:i}=w();return l.jsx(k,{className:y(i.list(),e),ref:r,...o,children:a})});$.displayName="Tabs.List";const U=f.forwardRef(function(t,r){const{className:e,...a}=t,{classes:o}=w();return l.jsx(O,{className:y(o.indicator(),e),ref:r,...a})});U.displayName="Tabs.Indicator";const D=f.forwardRef(function(t,r){const{className:e,children:a,...o}=t,{classes:i}=w();return l.jsx(z,{className:y(i.trigger(),e),ref:r,...o,children:a})});D.displayName="Tabs.Trigger";const M=f.forwardRef(function(t,r){const{className:e,children:a,...o}=t,{classes:i}=w();return l.jsx(L,{className:y(i.content(),e),ref:r,...o,children:a})});M.displayName="Tabs.Content";j.__docgenInfo={description:"",methods:[],displayName:"Tabs.Root"};M.__docgenInfo={description:"",methods:[],displayName:"Tabs.Content"};D.__docgenInfo={description:"",methods:[],displayName:"Tabs.Trigger"};$.__docgenInfo={description:"",methods:[],displayName:"Tabs.List"};U.__docgenInfo={description:"",methods:[],displayName:"Tabs.Indicator"};export{M as C,U as I,$ as L,j as R,D as T};
