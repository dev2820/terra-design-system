import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{r as f}from"./index-CDs2tPxN.js";import{c as F}from"./cva-C095pwBQ.js";import{s as D}from"./sva-CxSEfBjn.js";import{j as U,c as O,y as V,z as C,k as B,l as q,T as z,m as v,U as W,o as K,p as k,r as Z,B as X,F as J}from"./factory-DwUv65Y6.js";import{c as Q,x as Y,b as ee,i as P}from"./index-D5jZQDUh.js";import{d as te}from"./index-hTcMZcOQ.js";import{c as A}from"./index-DJ3ti8gJ.js";import{c as G}from"./create-split-props-u5h9OPvL.js";import{d as oe,e as re,h as ne,g as ae}from"./index-DHe2XY-8.js";import{a as ie,t as le}from"./index-DBzJ7FiP.js";import{u as se,a as de}from"./use-locale-context-B5vdPRI5.js";import{u as H}from"./use-event-eGuf5zsd.js";import{u as N}from"./use-field-context-Dq9yVNyx.js";var _=U("rating-group").parts("root","label","item","control");_.build();var m=Q({getRootId:e=>{var o;return((o=e.ids)==null?void 0:o.root)??`rating:${e.id}`},getLabelId:e=>{var o;return((o=e.ids)==null?void 0:o.label)??`rating:${e.id}:label`},getHiddenInputId:e=>{var o;return((o=e.ids)==null?void 0:o.hiddenInput)??`rating:${e.id}:input`},getControlId:e=>{var o;return((o=e.ids)==null?void 0:o.control)??`rating:${e.id}:control`},getItemId:(e,o)=>{var t,r;return((r=(t=e.ids)==null?void 0:t.item)==null?void 0:r.call(t,o))??`rating:${e.id}:item:${o}`},getRootEl:e=>m.getById(e,m.getRootId(e)),getControlEl:e=>m.getById(e,m.getControlId(e)),getRadioEl:(e,o=e.value)=>{const t=`[role=radio][aria-posinset='${Math.ceil(o)}']`;return Y(m.getControlEl(e),t)},getHiddenInputEl:e=>m.getById(e,m.getHiddenInputId(e)),dispatchChangeEvent:e=>{const o=m.getHiddenInputEl(e);o&&te(o,{value:e.value})}});A()(["allowHalf","autoFocus","count","dir","disabled","form","getRootNode","id","ids","name","onHoverChange","onValueChange","required","readOnly","translations","value"]);A()(["index"]);const[ue,E]=O({name:"RatingGroupContext",hookName:"useRatingGroupContext",providerName:"<RatingGroupProvider />"}),ce=e=>e.children(E()),j=f.forwardRef((e,o)=>{const t=E(),r=V(t.getControlProps(),e);return a.jsx(C.div,{...r,ref:o})});j.displayName="RatingGroupControl";const T=f.forwardRef((e,o)=>{const t=E(),r=V(t.getHiddenInputProps(),e),n=N();return a.jsx(C.input,{"aria-describedby":n==null?void 0:n.ariaDescribedby,...r,ref:o})});T.displayName="RatingGroupHiddenInput";const[ge,pe]=O({name:"RatingGroupItemContext",hookName:"useRatingGroupItemContext",providerName:"<RatingGroupItemProvider />"}),S=f.forwardRef((e,o)=>{const[t,r]=G()(e,["index"]),n=E(),d=V(n.getItemProps(t),r),g=n.getItemState(t);return a.jsx(ge,{value:g,children:a.jsx(C.span,{...d,ref:o})})});S.displayName="RatingGroupItem";const ve=e=>e.children(pe());var me=B("rating-group").parts("root","label","item","control"),I=me.build(),i=q({getRootId:e=>{var o;return((o=e.ids)==null?void 0:o.root)??`rating:${e.id}`},getLabelId:e=>{var o;return((o=e.ids)==null?void 0:o.label)??`rating:${e.id}:label`},getHiddenInputId:e=>{var o;return((o=e.ids)==null?void 0:o.hiddenInput)??`rating:${e.id}:input`},getControlId:e=>{var o;return((o=e.ids)==null?void 0:o.control)??`rating:${e.id}:control`},getItemId:(e,o)=>{var t,r;return((r=(t=e.ids)==null?void 0:t.item)==null?void 0:r.call(t,o))??`rating:${e.id}:item:${o}`},getRootEl:e=>i.getById(e,i.getRootId(e)),getControlEl:e=>i.getById(e,i.getControlId(e)),getRadioEl:(e,o=e.value)=>{const t=`[role=radio][aria-posinset='${Math.ceil(o)}']`;return z(i.getControlEl(e),t)},getHiddenInputEl:e=>i.getById(e,i.getHiddenInputId(e)),dispatchChangeEvent:e=>{const o=i.getHiddenInputEl(e);o&&ie(o,{value:e.value})}});function he(e,o,t){const r=e.context.isInteractive,n=e.context.isDisabled,d=e.context.value,g=e.context.hoveredValue,h=e.context.translations;function R(l){const s=e.context.isHovering?e.context.hoveredValue:e.context.value,u=Math.ceil(s)===l.index,L=l.index<=s||u,c=u&&Math.abs(s-l.index)===.5;return{highlighted:L,half:c,checked:u||e.context.value===-1&&l.index===1}}return{hovering:e.context.isHovering,value:d,hoveredValue:g,count:e.context.count,items:Array.from({length:e.context.count}).map((l,s)=>s+1),setValue(l){o({type:"SET_VALUE",value:l})},clearValue(){o("CLEAR_VALUE")},getRootProps(){return t.element({...I.root.attrs,dir:e.context.dir,id:i.getRootId(e.context)})},getHiddenInputProps(){return t.input({name:e.context.name,form:e.context.form,type:"text",hidden:!0,disabled:n,readOnly:e.context.readOnly,required:e.context.required,id:i.getHiddenInputId(e.context),defaultValue:e.context.value})},getLabelProps(){return t.label({...I.label.attrs,dir:e.context.dir,id:i.getLabelId(e.context),"data-disabled":v(n),htmlFor:i.getHiddenInputId(e.context),onClick(l){if(l.defaultPrevented||!r)return;l.preventDefault();const s=i.getRadioEl(e.context,1);s==null||s.focus({preventScroll:!0})}})},getControlProps(){return t.element({id:i.getControlId(e.context),...I.control.attrs,dir:e.context.dir,role:"radiogroup","aria-orientation":"horizontal","aria-labelledby":i.getLabelId(e.context),"aria-readonly":W(e.context.readOnly),"data-readonly":v(e.context.readOnly),tabIndex:e.context.readOnly?0:-1,"data-disabled":v(n),onPointerMove(l){r&&l.pointerType!=="touch"&&o("GROUP_POINTER_OVER")},onPointerLeave(l){r&&l.pointerType!=="touch"&&o("GROUP_POINTER_LEAVE")}})},getItemState:R,getItemProps(l){const{index:s}=l,u=R(l),L=h.ratingValueText(s);return t.element({...I.item.attrs,dir:e.context.dir,id:i.getItemId(e.context,s.toString()),role:"radio",tabIndex:n?void 0:u.checked?0:-1,"aria-roledescription":"rating","aria-label":L,"aria-disabled":n,"data-disabled":v(n),"data-readonly":v(e.context.readOnly),"aria-setsize":e.context.count,"aria-checked":u.checked,"data-checked":v(u.checked),"aria-posinset":s,"data-highlighted":v(u.highlighted),"data-half":v(u.half),onPointerDown(c){r&&oe(c)&&c.preventDefault()},onPointerMove(c){if(!r)return;const y=re(c),$=ne(y,c.currentTarget).getPercentValue({orientation:"horizontal",dir:e.context.dir})<.5;o({type:"POINTER_OVER",index:s,isMidway:$})},onKeyDown(c){if(c.defaultPrevented||!r)return;const y={ArrowLeft(){o("ARROW_LEFT")},ArrowRight(){o("ARROW_RIGHT")},ArrowUp(){o("ARROW_LEFT")},ArrowDown(){o("ARROW_RIGHT")},Space(){o({type:"SPACE",value:s})},Home(){o("HOME")},End(){o("END")}},b=ae(c,e.context),x=y[b];x&&(c.preventDefault(),x(c))},onClick(){r&&o({type:"CLICK",value:s})},onFocus(){r&&o("FOCUS")},onBlur(){r&&o("BLUR")}})}}}function fe(e){const o=ee(e);return K({id:"rating",initial:"idle",context:{name:"rating",count:5,dir:"ltr",value:-1,readOnly:!1,disabled:!1,...o,hoveredValue:-1,fieldsetDisabled:!1,translations:{ratingValueText:t=>`${t} stars`,...o.translations}},created:["roundValueIfNeeded"],watch:{allowHalf:["roundValueIfNeeded"]},computed:{isDisabled:t=>!!t.disabled||t.fieldsetDisabled,isInteractive:t=>!(t.isDisabled||t.readOnly),isHovering:t=>t.hoveredValue>-1},activities:["trackFormControlState"],on:{SET_VALUE:{actions:["setValue"]},CLEAR_VALUE:{actions:["clearValue"]}},states:{idle:{entry:"clearHoveredValue",on:{GROUP_POINTER_OVER:"hover",FOCUS:"focus",CLICK:{actions:["setValue","focusActiveRadio"]}}},focus:{on:{POINTER_OVER:{actions:"setHoveredValue"},GROUP_POINTER_LEAVE:{actions:"clearHoveredValue"},BLUR:"idle",SPACE:{guard:"isValueEmpty",actions:["setValue"]},CLICK:{actions:["setValue","focusActiveRadio"]},ARROW_LEFT:{actions:["setPrevValue","focusActiveRadio"]},ARROW_RIGHT:{actions:["setNextValue","focusActiveRadio"]},HOME:{actions:["setValueToMin","focusActiveRadio"]},END:{actions:["setValueToMax","focusActiveRadio"]}}},hover:{on:{POINTER_OVER:{actions:"setHoveredValue"},GROUP_POINTER_LEAVE:[{guard:"isRadioFocused",target:"focus",actions:"clearHoveredValue"},{target:"idle",actions:"clearHoveredValue"}],CLICK:{actions:["setValue","focusActiveRadio"]}}}}},{guards:{isInteractive:t=>!(t.disabled||t.readOnly),isHoveredValueEmpty:t=>t.hoveredValue===-1,isValueEmpty:t=>t.value<=0,isRadioFocused:t=>{var r;return!!((r=i.getControlEl(t))!=null&&r.contains(i.getActiveElement(t)))}},activities:{trackFormControlState(t,r,{initialContext:n}){return le(i.getHiddenInputEl(t),{onFieldsetDisabledChange(d){t.fieldsetDisabled=d},onFormReset(){p.value(t,n.value)}})}},actions:{clearHoveredValue(t){p.hoveredValue(t,-1)},focusActiveRadio(t){Z(()=>{var r;return(r=i.getRadioEl(t))==null?void 0:r.focus()})},setPrevValue(t){const r=t.allowHalf?.5:1;p.value(t,Math.max(0,t.value-r))},setNextValue(t){const r=t.allowHalf?.5:1,n=t.value===-1?0:t.value;p.value(t,Math.min(t.count,n+r))},setValueToMin(t){p.value(t,1)},setValueToMax(t){p.value(t,t.count)},setValue(t,r){const n=t.hoveredValue===-1?r.value:t.hoveredValue;p.value(t,n)},clearValue(t){p.value(t,-1)},setHoveredValue(t,r){const d=t.allowHalf&&r.isMidway?.5:0;p.hoveredValue(t,r.index-d)},roundValueIfNeeded(t){t.allowHalf||(t.value=Math.round(t.value))}}})}var w={change:e=>{var o;(o=e.onValueChange)==null||o.call(e,{value:e.value}),i.dispatchChangeEvent(e)},hoverChange:e=>{var o;(o=e.onHoverChange)==null||o.call(e,{hoveredValue:e.hoveredValue})}},p={value:(e,o)=>{P(e.value,o)||(e.value=o,w.change(e))},hoveredValue:(e,o)=>{P(e.hoveredValue,o)||(e.hoveredValue=o,w.hoverChange(e))}};k()(["allowHalf","autoFocus","count","dir","disabled","form","getRootNode","id","ids","name","onHoverChange","onValueChange","required","readOnly","translations","value"]);k()(["index"]);const Re=e=>{const{getRootNode:o}=se(),{dir:t}=de(),r=N(),n={id:f.useId(),ids:{label:r==null?void 0:r.ids.label,hiddenInput:r==null?void 0:r.ids.control},dir:t,disabled:r==null?void 0:r.disabled,readOnly:r==null?void 0:r.readOnly,required:r==null?void 0:r.required,getRootNode:o,value:e.defaultValue,...e},d={...n,value:e.value,onValueChange:H(e.onValueChange,{sync:!0}),onHoverChange:H(e.onHoverChange)},[g,h]=X(fe(n),{context:d});return he(g,h,J)},M=f.forwardRef((e,o)=>{const[t,r]=G()(e,["allowHalf","autoFocus","count","defaultValue","disabled","form","id","ids","name","onHoverChange","onValueChange","readOnly","required","translations","value"]),n=Re(t),d=V(n.getRootProps(),r);return a.jsx(ue,{value:n,children:a.jsx(C.div,{...d,ref:o})})});M.displayName="RatingGroupRoot";const Ie=D({className:"ratingGroup",slots:_.keys(),base:{root:{display:"flex",flexDirection:"column",gap:"1.5"},control:{display:"flex"},item:{cursor:"pointer",transitionDuration:"normal",transitionProperty:"color, fill",transitionTimingFunction:"default",fill:"transparent",_highlighted:{fill:"currentColor"},_focusVisible:{outline:"none"},_disabled:{cursor:"not-allowed",opacity:.4}}},defaultVariants:{size:"md"},variants:{size:{sm:{control:{gap:"0"},item:{"& svg":{width:"4",height:"4"}},label:{textStyle:"sm"}},md:{control:{gap:"0.5"},item:{"& svg":{width:"5",height:"5"}},label:{textStyle:"sm"}},lg:{control:{gap:"0.5"},item:{"& svg":{width:"6",height:"6"}},label:{textStyle:"md"}}}}}),Ve=f.forwardRef(function(e,o){const{size:t,className:r,children:n,...d}=e,g=Ie({size:t}),h=Ce(t);return a.jsxs(M,{ref:o,className:F(g.root,r),...d,children:[a.jsx(j,{className:g.control,children:a.jsx(ce,{children:({items:R})=>R.map(l=>a.jsx(S,{index:l,className:g.item,children:a.jsx(ve,{children:({half:s,highlighted:u})=>s&&u?a.jsx(Le,{size:h}):u?a.jsx(Ee,{size:h}):a.jsx(ye,{size:h})})},l))})}),a.jsx(T,{})]})}),Ce=e=>e==="sm"?12:e==="md"?16:e==="lg"?20:16,Ee=e=>{const{size:o,...t}=e;return a.jsx("svg",{width:o,height:o,viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...t,children:a.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",fill:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})},Le=e=>{const{size:o,...t}=e;return a.jsxs("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",...t,children:[a.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),a.jsx("path",{d:"M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z",fill:"currentColor",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})},ye=e=>{const{size:o,...t}=e;return a.jsx("svg",{width:o,height:o,viewBox:"0 0 24 24",fill:"transparent",xmlns:"http://www.w3.org/2000/svg",...t,children:a.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})};Ve.__docgenInfo={description:"",methods:[],displayName:"Root"};export{Ve as R};
