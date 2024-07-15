import{j as c}from"./jsx-runtime-qGIIFXMu.js";import{r as f}from"./index-CDs2tPxN.js";import{c as P}from"./cva-C095pwBQ.js";import{s as H}from"./sva-CxSEfBjn.js";import{c as O}from"./create-react-context-Dw26gLIP.js";import{e as L,f as j,R as q,z as y,m as h,h as R,j as T,k as B,l as U,V as z,o as g,C as W,p as M,q as K,s as k,D as J,a1 as Q,E as X,n as Y,w as Z,v as ee,x as te,y as oe}from"./use-locale-context-Cpyu8C1_.js";import{c as S}from"./index-DJ3ti8gJ.js";import{t as ie,d as re}from"./index-Bc7AdKyF.js";import{u as ae}from"./use-event-eGuf5zsd.js";var G=L("radio-group").parts("root","label","item","itemText","itemControl","indicator");G.build();var u=j({getRootId:e=>{var o;return((o=e.ids)==null?void 0:o.root)??`radio-group:${e.id}`},getLabelId:e=>{var o;return((o=e.ids)==null?void 0:o.label)??`radio-group:${e.id}:label`},getItemId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.item)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:${o}`},getItemHiddenInputId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemHiddenInput)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:input:${o}`},getItemControlId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemControl)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:control:${o}`},getItemLabelId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemLabel)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:label:${o}`},getIndicatorId:e=>{var o;return((o=e.ids)==null?void 0:o.indicator)??`radio-group:${e.id}:indicator`},getRootEl:e=>u.getById(e,u.getRootId(e)),getItemHiddenInputEl:(e,o)=>u.getById(e,u.getItemHiddenInputId(e,o)),getIndicatorEl:e=>u.getById(e,u.getIndicatorId(e)),getFirstEnabledInputEl:e=>{var o;return(o=u.getRootEl(e))==null?void 0:o.querySelector("input:not(:disabled)")},getFirstEnabledAndCheckedInputEl:e=>{var o;return(o=u.getRootEl(e))==null?void 0:o.querySelector("input:not(:disabled):checked")},getInputEls:e=>{const t=`input[type=radio][data-ownedby='${CSS.escape(u.getRootId(e))}']:not([disabled])`;return q(u.getRootEl(e),t)},getActiveRadioEl:e=>{if(e.value)return u.getById(e,u.getItemId(e,e.value))},getOffsetRect:e=>({left:(e==null?void 0:e.offsetLeft)??0,top:(e==null?void 0:e.offsetTop)??0,width:(e==null?void 0:e.offsetWidth)??0,height:(e==null?void 0:e.offsetHeight)??0}),getRectById:(e,o)=>{const t=u.getById(e,u.getItemId(e,o));if(t)return u.resolveRect(u.getOffsetRect(t))},resolveRect:e=>({width:`${e.width}px`,height:`${e.height}px`,left:`${e.left}px`,top:`${e.top}px`})});S()(["dir","disabled","form","getRootNode","id","ids","name","onValueChange","orientation","readOnly","value"]);S()(["value","disabled","invalid"]);const[ne,b]=y({name:"RadioGroupContext",hookName:"useRadioGroupContext",providerName:"<RadioGroupProvider />"}),$=f.forwardRef((e,o)=>{const t=b(),i=h(t.getIndicatorProps(),e);return c.jsx(R.div,{...i,ref:o})});$.displayName="RadioGroupIndicator";const[de,Fe]=y({name:"RadioGroupItemContext",hookName:"useRadioGroupItemContext",providerName:"<RadioGroupItemProvider />"}),[se,C]=y({name:"RadioGroupItemPropsContext",hookName:"useRadioGroupItemPropsContext",providerName:"<RadioGroupItemPropsProvider />"}),V=f.forwardRef((e,o)=>{const[t,i]=T()(e,["value","disabled","invalid"]),a=b(),d=h(a.getItemProps(t),i),l=a.getItemState(t);return c.jsx(de,{value:l,children:c.jsx(se,{value:t,children:c.jsx(R.label,{...d,ref:o})})})});V.displayName="RadioGroupItem";const _=f.forwardRef((e,o)=>{const t=b(),i=C(),a=h(t.getItemControlProps(i),e);return c.jsx(R.div,{...a,ref:o})});_.displayName="RadioGroupItemControl";const w=f.forwardRef((e,o)=>{const t=b(),i=C(),a=h(t.getItemHiddenInputProps(i),e);return c.jsx(R.input,{...a,ref:o})});w.displayName="RadioGroupItemHiddenInput";const A=f.forwardRef((e,o)=>{const t=b(),i=C(),a=h(t.getItemTextProps(i),e);return c.jsx(R.span,{...a,ref:o})});A.displayName="RadioGroupItemText";var E,I=new Map,le=e=>e.getBoundingClientRect();function ue(e,o){const{scope:t="rect",getRect:i=le,onChange:a}=o,d=ce({scope:t,getRect:i}),l=I.get(e);return l?(l.callbacks.push(a),a(i(e))):(I.set(e,{rect:{},callbacks:[a]}),I.size===1&&(E=requestAnimationFrame(d))),function(){const r=I.get(e);if(!r)return;const s=r.callbacks.indexOf(a);s>-1&&r.callbacks.splice(s,1),r.callbacks.length===0&&(I.delete(e),I.size===0&&cancelAnimationFrame(E))}}function ce(e){const{scope:o,getRect:t}=e,i=me(o);return function a(){const d=[];I.forEach((l,m)=>{const r=t(m);i(l.rect,r)||(l.rect=r,d.push(l))}),d.forEach(l=>{l.callbacks.forEach(m=>m(l.rect))}),E=requestAnimationFrame(a)}}var F=(e,o)=>e.width===o.width&&e.height===o.height,N=(e,o)=>e.top===o.top&&e.left===o.left,pe=(e,o)=>F(e,o)&&N(e,o);function me(e){return e==="size"?F:e==="position"?N:pe}var ge=B("radio-group").parts("root","label","item","itemText","itemControl","indicator"),v=ge.build(),n=U({getRootId:e=>{var o;return((o=e.ids)==null?void 0:o.root)??`radio-group:${e.id}`},getLabelId:e=>{var o;return((o=e.ids)==null?void 0:o.label)??`radio-group:${e.id}:label`},getItemId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.item)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:${o}`},getItemHiddenInputId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemHiddenInput)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:input:${o}`},getItemControlId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemControl)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:control:${o}`},getItemLabelId:(e,o)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemLabel)==null?void 0:i.call(t,o))??`radio-group:${e.id}:radio:label:${o}`},getIndicatorId:e=>{var o;return((o=e.ids)==null?void 0:o.indicator)??`radio-group:${e.id}:indicator`},getRootEl:e=>n.getById(e,n.getRootId(e)),getItemHiddenInputEl:(e,o)=>n.getById(e,n.getItemHiddenInputId(e,o)),getIndicatorEl:e=>n.getById(e,n.getIndicatorId(e)),getFirstEnabledInputEl:e=>{var o;return(o=n.getRootEl(e))==null?void 0:o.querySelector("input:not(:disabled)")},getFirstEnabledAndCheckedInputEl:e=>{var o;return(o=n.getRootEl(e))==null?void 0:o.querySelector("input:not(:disabled):checked")},getInputEls:e=>{const t=`input[type=radio][data-ownedby='${CSS.escape(n.getRootId(e))}']:not([disabled])`;return z(n.getRootEl(e),t)},getActiveRadioEl:e=>{if(e.value)return n.getById(e,n.getItemId(e,e.value))},getOffsetRect:e=>({left:(e==null?void 0:e.offsetLeft)??0,top:(e==null?void 0:e.offsetTop)??0,width:(e==null?void 0:e.offsetWidth)??0,height:(e==null?void 0:e.offsetHeight)??0}),getRectById:(e,o)=>{const t=n.getById(e,n.getItemId(e,o));if(t)return n.resolveRect(n.getOffsetRect(t))},resolveRect:e=>({width:`${e.width}px`,height:`${e.height}px`,left:`${e.left}px`,top:`${e.top}px`})});function fe(e,o,t){const i=e.context.isDisabled,a=e.context.readOnly;function d(r){return{invalid:!!r.invalid,disabled:!!r.disabled||i,checked:e.context.value===r.value,focused:e.context.focusedValue===r.value,hovered:e.context.hoveredValue===r.value,active:e.context.activeValue===r.value}}function l(r){const s=d(r);return{"data-focus":g(s.focused),"data-disabled":g(s.disabled),"dats-readonly":g(a),"data-state":s.checked?"checked":"unchecked","data-hover":g(s.hovered),"data-invalid":g(s.invalid),"data-orientation":e.context.orientation}}const m=()=>{const r=n.getFirstEnabledAndCheckedInputEl(e.context);if(r){r.focus();return}const s=n.getFirstEnabledInputEl(e.context);s==null||s.focus()};return{focus:m,value:e.context.value,setValue(r){o({type:"SET_VALUE",value:r,isTrusted:!1})},clearValue(){o({type:"SET_VALUE",value:null,isTrusted:!1})},getRootProps(){return t.element({...v.root.attrs,role:"radiogroup",id:n.getRootId(e.context),"aria-labelledby":n.getLabelId(e.context),"data-orientation":e.context.orientation,"data-disabled":g(i),"aria-orientation":e.context.orientation,dir:e.context.dir,style:{position:"relative"}})},getLabelProps(){return t.element({...v.label.attrs,dir:e.context.dir,"data-orientation":e.context.orientation,"data-disabled":g(i),id:n.getLabelId(e.context),onClick:m})},getItemState:d,getItemProps(r){const s=d(r);return t.label({...v.item.attrs,dir:e.context.dir,id:n.getItemId(e.context,r.value),htmlFor:n.getItemHiddenInputId(e.context,r.value),...l(r),onPointerMove(){s.disabled||s.hovered||o({type:"SET_HOVERED",value:r.value,hovered:!0})},onPointerLeave(){s.disabled||o({type:"SET_HOVERED",value:null})},onPointerDown(p){s.disabled||(s.focused&&p.pointerType==="mouse"&&p.preventDefault(),o({type:"SET_ACTIVE",value:r.value,active:!0}))},onPointerUp(){s.disabled||o({type:"SET_ACTIVE",value:null})}})},getItemTextProps(r){return t.element({...v.itemText.attrs,dir:e.context.dir,id:n.getItemLabelId(e.context,r.value),...l(r)})},getItemControlProps(r){const s=d(r);return t.element({...v.itemControl.attrs,dir:e.context.dir,id:n.getItemControlId(e.context,r.value),"data-active":g(s.active),"aria-hidden":!0,...l(r)})},getItemHiddenInputProps(r){const s=d(r);return t.input({"data-ownedby":n.getRootId(e.context),id:n.getItemHiddenInputId(e.context,r.value),type:"radio",name:e.context.name||e.context.id,form:e.context.form,value:r.value,onChange(p){if(a){p.preventDefault();return}p.target.checked&&o({type:"SET_VALUE",value:r.value,isTrusted:!0})},onBlur(){o({type:"SET_FOCUSED",value:null})},onFocus(){o({type:"SET_FOCUSED",value:r.value,focused:!0})},onKeyDown(p){p.defaultPrevented||p.key===" "&&o({type:"SET_ACTIVE",value:r.value,active:!0})},onKeyUp(p){p.defaultPrevented||p.key===" "&&o({type:"SET_ACTIVE",value:null})},disabled:s.disabled,defaultChecked:s.checked,style:W})},getIndicatorProps(){var r,s,p,x;return t.element({id:n.getIndicatorId(e.context),...v.indicator.attrs,dir:e.context.dir,hidden:e.context.value==null,"data-disabled":g(i),"data-orientation":e.context.orientation,style:{"--transition-property":"left, top, width, height","--left":(r=e.context.indicatorRect)==null?void 0:r.left,"--top":(s=e.context.indicatorRect)==null?void 0:s.top,"--width":(p=e.context.indicatorRect)==null?void 0:p.width,"--height":(x=e.context.indicatorRect)==null?void 0:x.height,position:"absolute",willChange:"var(--transition-property)",transitionProperty:"var(--transition-property)",transitionDuration:e.context.canIndicatorTransition?"var(--transition-duration, 150ms)":"0ms",transitionTimingFunction:"var(--transition-timing-function)",[e.context.orientation==="horizontal"?"left":"top"]:e.context.orientation==="horizontal"?"var(--left)":"var(--top)"}})}}}var{not:Ie}=J;function ve(e){const o=M(e);return K({id:"radio",initial:"idle",context:{value:null,activeValue:null,focusedValue:null,hoveredValue:null,disabled:!1,orientation:"vertical",...o,indicatorRect:{},canIndicatorTransition:!1,fieldsetDisabled:!1},computed:{isDisabled:t=>!!t.disabled||t.fieldsetDisabled},entry:["syncIndicatorRect"],exit:["cleanupObserver"],activities:["trackFormControlState"],watch:{value:["setIndicatorTransition","syncIndicatorRect","syncInputElements"]},on:{SET_VALUE:[{guard:Ie("isTrusted"),actions:["setValue","dispatchChangeEvent"]},{actions:["setValue"]}],SET_HOVERED:{actions:"setHovered"},SET_ACTIVE:{actions:"setActive"},SET_FOCUSED:{actions:"setFocused"}},states:{idle:{}}},{guards:{isTrusted:(t,i)=>!!i.isTrusted},activities:{trackFormControlState(t,i,{send:a,initialContext:d}){return ie(n.getRootEl(t),{onFieldsetDisabledChange(l){t.fieldsetDisabled=l},onFormReset(){a({type:"SET_VALUE",value:d.value})}})}},actions:{setValue(t,i){Re.value(t,i.value)},setHovered(t,i){t.hoveredValue=i.value},setActive(t,i){t.activeValue=i.value},setFocused(t,i){t.focusedValue=i.value},syncInputElements(t){n.getInputEls(t).forEach(a=>{a.checked=a.value===t.value})},setIndicatorTransition(t){t.canIndicatorTransition=Q(t.value)},cleanupObserver(t){var i;(i=t.indicatorCleanup)==null||i.call(t)},syncIndicatorRect(t){var d;if((d=t.indicatorCleanup)==null||d.call(t),!n.getIndicatorEl(t))return;const i=t.value,a=n.getActiveRadioEl(t);if(i==null||!a){t.indicatorRect={};return}t.indicatorCleanup=ue(a,{getRect(l){return n.getOffsetRect(l)},onChange(l){t.indicatorRect=n.resolveRect(l),Y(()=>{t.canIndicatorTransition=!1})}})},dispatchChangeEvent(t){n.getInputEls(t).forEach(a=>{const d=a.value===t.value;d!==a.checked&&re(a,{checked:d})})}}})}var he={change:e=>{var o;e.value!=null&&((o=e.onValueChange)==null||o.call(e,{value:e.value}))}},Re={value:(e,o)=>{X(e.value,o)||(e.value=o,he.change(e))}};k()(["dir","disabled","form","getRootNode","id","ids","name","onValueChange","orientation","readOnly","value"]);k()(["value","disabled","invalid"]);const be=e=>{const{getRootNode:o}=Z(),{dir:t}=ee(),i={id:f.useId(),dir:t,getRootNode:o,value:e.defaultValue,...e},a={...i,value:e.value,onValueChange:ae(e.onValueChange,{sync:!0})},[d,l]=te(ve(i),{context:a});return fe(d,l,oe)},D=f.forwardRef((e,o)=>{const[t,i]=T()(e,["defaultValue","disabled","form","id","ids","name","onValueChange","orientation","readOnly","value"]),a=be(t),d=h(a.getRootProps(),i);return c.jsx(ne,{value:a,children:c.jsx(R.div,{...d,ref:o})})});D.displayName="RadioGroupRoot";const Ee=H({className:"radioGroup",slots:G.keys(),base:{root:{display:"flex",flexDirection:{_vertical:"column",_horizontal:"row"}},item:{alignItems:"center",cursor:"pointer",display:"flex",_disabled:{cursor:"not-allowed"}},itemControl:{background:"transparent",borderColor:"neutral.300",borderRadius:"full",borderWidth:"2px",transitionDuration:"normal",transitionProperty:"background",transitionTimingFunction:"default",_checked:{background:"transparent",borderColor:"primary",outlineColor:"primary",outlineStyle:"solid"},_disabled:{borderColor:"disabled",color:"disabled",_hover:{bg:"initial",color:"disabled"},_checked:{borderColor:"disabled",outlineColor:"disabled"}}},itemText:{fontWeight:"medium",_disabled:{color:"disabled"}}},variants:{size:{sm:{root:{gap:{_vertical:"3",_horizontal:"4"}},item:{gap:"2"},itemControl:{width:"4",height:"4",_checked:{outlineWidth:"4px",outlineOffset:"-5px"}},itemText:{textStyle:"sm"}},md:{root:{gap:{_vertical:"4",_horizontal:"6"}},item:{gap:"3"},itemControl:{width:"5",height:"5",_checked:{outlineWidth:"5px",outlineOffset:"-6px"}},itemText:{textStyle:"md"}},lg:{root:{gap:{_vertical:"5",_horizontal:"8"}},item:{gap:"4"},itemControl:{width:"6",height:"6",_checked:{outlineWidth:"6px",outlineOffset:"-7px"}},itemText:{textStyle:"lg"}}}},defaultVariants:{size:"md"}}),[ye,Ce]=O({name:"radioGroup",hookName:"useRadioGroupContext",providerName:"RadioGroupProvider",defaultValue:{classes:{}}}),xe=f.forwardRef(function(e,o){const{size:t,className:i,children:a,...d}=e,l=Ee({size:t}),m={classes:l};return c.jsx(ye,{value:m,children:c.jsxs(D,{ref:o,className:P(l.root,i),...d,children:[c.jsx($,{}),a]})})}),Pe=f.forwardRef(function(e,o){const{className:t,children:i,...a}=e,{classes:d}=Ce();return c.jsxs(V,{className:P(d.item,t),ref:o,...a,children:[c.jsx(_,{className:d.itemControl}),c.jsx(A,{className:d.itemText,children:i}),c.jsx(w,{})]})});xe.__docgenInfo={description:"",methods:[],displayName:"Root"};Pe.__docgenInfo={description:"",methods:[],displayName:"Item"};export{Pe as I,xe as R};
