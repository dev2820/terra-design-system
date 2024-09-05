import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{I as w}from"./index-9MS2e6do.js";import{r as l}from"./index-CDs2tPxN.js";import{t as D,c as S}from"./tv-Br1lVx4G.js";import{C as F}from"./check-DUDaO23Y.js";import{c as L}from"./createLucideIcon-zijr-BYg.js";import{c as y,m,h as k,a as O,b as G,d as h,v as _,e as q,f as K,g as M,A as V,E as $}from"./factory-BCO0_PXk.js";import{c as A}from"./create-split-props-u5h9OPvL.js";import{t as B,b as X}from"./index-DRtd-hRg.js";import{t as W,s as z,d as J}from"./index-DBzJ7FiP.js";import{c as Q,a as U}from"./index-B1LdDssV.js";import{u as Y,a as Z}from"./use-locale-context-CTaGYWMe.js";import{u as ee}from"./use-event-eGuf5zsd.js";import{u as P}from"./use-field-context-CzRTzM_q.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=L("Minus",[["path",{d:"M5 12h14",key:"1ays0h"}]]),[re,C]=y({name:"CheckboxContext",hookName:"useCheckboxContext",providerName:"<CheckboxProvider />"}),N=l.forwardRef((e,r)=>{const t=C(),d=m(t.getControlProps(),e);return a.jsx(k.div,{...d,ref:r})});N.displayName="CheckboxControl";var de=O("checkbox").parts("root","label","control","indicator"),p=de.build(),s=G({getRootId:e=>{var r;return((r=e.ids)==null?void 0:r.root)??`checkbox:${e.id}`},getLabelId:e=>{var r;return((r=e.ids)==null?void 0:r.label)??`checkbox:${e.id}:label`},getControlId:e=>{var r;return((r=e.ids)==null?void 0:r.control)??`checkbox:${e.id}:control`},getHiddenInputId:e=>{var r;return((r=e.ids)==null?void 0:r.hiddenInput)??`checkbox:${e.id}:input`},getRootEl:e=>s.getById(e,s.getRootId(e)),getHiddenInputEl:e=>s.getById(e,s.getHiddenInputId(e))});function oe(e,r,t){const d=e.context.isDisabled,o=!d&&e.context.focused,c=e.context.isChecked,n=e.context.isIndeterminate,b=e.context.readOnly,u={"data-active":h(e.context.active),"data-focus":h(o),"data-readonly":h(b),"data-hover":h(e.context.hovered),"data-disabled":h(d),"data-state":n?"indeterminate":e.context.checked?"checked":"unchecked","data-invalid":h(e.context.invalid)};return{checked:c,disabled:d,indeterminate:n,focused:o,checkedState:e.context.checked,setChecked(i){r({type:"CHECKED.SET",checked:i,isTrusted:!1})},toggleChecked(){r({type:"CHECKED.TOGGLE",checked:c,isTrusted:!1})},getRootProps(){return t.label({...p.root.attrs,...u,dir:e.context.dir,id:s.getRootId(e.context),htmlFor:s.getHiddenInputId(e.context),onPointerMove(){d||r({type:"CONTEXT.SET",context:{hovered:!0}})},onPointerLeave(){d||r({type:"CONTEXT.SET",context:{hovered:!1}})},onClick(i){i.target===s.getHiddenInputEl(e.context)&&i.stopPropagation()}})},getLabelProps(){return t.element({...p.label.attrs,...u,dir:e.context.dir,id:s.getLabelId(e.context)})},getControlProps(){return t.element({...p.control.attrs,...u,dir:e.context.dir,id:s.getControlId(e.context),"aria-hidden":!0})},getIndicatorProps(){return t.element({...p.indicator.attrs,...u,dir:e.context.dir,hidden:!n&&!e.context.checked})},getHiddenInputProps(){return t.input({id:s.getHiddenInputId(e.context),type:"checkbox",required:e.context.required,defaultChecked:c,disabled:d,"aria-labelledby":s.getLabelId(e.context),"aria-invalid":e.context.invalid,name:e.context.name,form:e.context.form,value:e.context.value,style:_,onClick(i){if(b){i.preventDefault();return}const j=i.currentTarget.checked;r({type:"CHECKED.SET",checked:j,isTrusted:!0})}})}}}var{not:f}=M;function se(e){const r=Q(e);return q({id:"checkbox",initial:"ready",context:{checked:!1,value:"on",disabled:!1,...r,fieldsetDisabled:!1},watch:{disabled:"removeFocusIfNeeded",checked:"syncInputElement"},activities:["trackFormControlState","trackPressEvent","trackFocusVisible"],on:{"CHECKED.TOGGLE":[{guard:f("isTrusted"),actions:["toggleChecked","dispatchChangeEvent"]},{actions:["toggleChecked"]}],"CHECKED.SET":[{guard:f("isTrusted"),actions:["setChecked","dispatchChangeEvent"]},{actions:["setChecked"]}],"CONTEXT.SET":{actions:["setContext"]}},computed:{isIndeterminate:t=>x(t.checked),isChecked:t=>v(t.checked),isDisabled:t=>!!t.disabled||t.fieldsetDisabled},states:{ready:{}}},{guards:{isTrusted:(t,d)=>!!d.isTrusted},activities:{trackPressEvent(t){if(!t.isDisabled)return B({pointerNode:s.getRootEl(t),keyboardNode:s.getHiddenInputEl(t),isValidKey:d=>d.key===" ",onPress:()=>t.active=!1,onPressStart:()=>t.active=!0,onPressEnd:()=>t.active=!1})},trackFocusVisible(t){if(!t.isDisabled)return X(s.getHiddenInputEl(t),{onFocus:()=>t.focused=!0,onBlur:()=>t.focused=!1})},trackFormControlState(t,d,{send:o,initialContext:c}){return W(s.getHiddenInputEl(t),{onFieldsetDisabledChange(n){t.fieldsetDisabled=n},onFormReset(){o({type:"CHECKED.SET",checked:!!c.checked})}})}},actions:{setContext(t,d){Object.assign(t,d.context)},syncInputElement(t){const d=s.getHiddenInputEl(t);d&&(z(d,t.isChecked),d.indeterminate=t.isIndeterminate)},removeFocusIfNeeded(t){t.disabled&&t.focused&&(t.focused=!1)},setChecked(t,d){I.checked(t,d.checked)},toggleChecked(t){const d=x(t.checked)?!0:!t.checked;I.checked(t,d)},dispatchChangeEvent(t){const d=s.getHiddenInputEl(t);J(d,{checked:v(t.checked)})}}})}function x(e){return e==="indeterminate"}function v(e){return x(e)?!1:!!e}var ne={change:e=>{var r;(r=e.onCheckedChange)==null||r.call(e,{checked:e.checked})}},I={checked:(e,r)=>{U(e.checked,r)||(e.checked=r,ne.change(e))}};K()(["checked","dir","disabled","form","getRootNode","id","ids","invalid","name","onCheckedChange","readOnly","required","value"]);const[Pe,ae]=y({name:"CheckboxGroupContext",hookName:"useCheckboxGroupContext",providerName:"<CheckboxGroupProvider />",strict:!1}),T=l.forwardRef((e,r)=>{const t=C(),d=m(t.getHiddenInputProps(),e),o=P();return a.jsx(k.input,{"aria-describedby":o==null?void 0:o.ariaDescribedby,...d,ref:r})});T.displayName="CheckboxHiddenInput";const g=l.forwardRef((e,r)=>{const{indeterminate:t,...d}=e,o=C(),c=m(o.getIndicatorProps(),d),n=t?o.indeterminate:o.checked;return a.jsx(k.div,{...c,hidden:!n,ref:r})});g.displayName="CheckboxIndicator";const H=l.forwardRef((e,r)=>{const t=C(),d=m(t.getLabelProps(),e);return a.jsx(k.span,{...d,ref:r})});H.displayName="CheckboxLabel";const ce=(e={})=>{const r=ae(),t=P(),d=l.useMemo(()=>m(e,(r==null?void 0:r.getItemProps({value:e.value}))??{}),[e,r]),{getRootNode:o}=Y(),{dir:c}=Z(),n={id:l.useId(),ids:{label:t==null?void 0:t.ids.label,hiddenInput:t==null?void 0:t.ids.control},dir:c,disabled:t==null?void 0:t.disabled,readOnly:t==null?void 0:t.readOnly,invalid:t==null?void 0:t.invalid,required:t==null?void 0:t.required,getRootNode:o,checked:d.defaultChecked,...d},b={...n,checked:d.checked,onCheckedChange:ee(d.onCheckedChange,{sync:!0})},[u,i]=V(se(n),{context:b});return oe(u,i,$)},R=l.forwardRef((e,r)=>{const[t,d]=A()(e,["checked","defaultChecked","disabled","form","id","ids","invalid","name","onCheckedChange","readOnly","required","value"]),o=ce(t),c=m(o.getRootProps(),d);return a.jsx(re,{value:o,children:a.jsx(k.label,{...c,ref:r})})});R.displayName="CheckboxRoot";const ie=D({base:`${w.scope} checkbox`,slots:{root:"group :focus-within:mt-4 trds-rounded-sm trds-inline-flex trds-flex-row trds-items-center trds-gap-2 trds-cursor-pointer data-[disabled]:trds-cursor-not-allowed data-[readonly]:trds-cursor-default",label:"",control:["trds-border-2 trds-border-neutral-300 trds-rounded-sm trds-flex-none trds-box-border trds-inline-flex trds-place-items-center trds-transition-shadow trds-transition-bg trds-transition-border-color trds-duration-normal trds-ease-default",'data-[state="checked"]:trds-bg-primary-500 data-[state="checked"]:trds-text-white data-[state="checked"]:trds-border-primary-500',"data-[invalid]:trds-border-error-500",'data-[state="indeterminate"]:trds-bg-primary-500 data-[state="indeterminate"]:trds-text-white data-[state="indeterminate"]:trds-border-primary-500',"data-[disabled]:trds-bg-muted data-[disabled]:trds-border-muted",'data-[disabled]:data-[state="checked"]:trds-border-muted data-[disabled]:data-[state="checked"]:trds-bg-muted','data-[disabled]:data-[state="indeterminate"]:trds-border-muted data-[disabled]:data-[state="indeterminate"]:trds-bg-muted',"data-[disabled]:trds-text-neutral-500","data-[focus]:trds-shadow-[0_0_0_2px_var(--shadow-color)] data-[focus]:trds-shadow-primary-500"],indicator:"",hiddenInput:""},variants:{size:{sm:{control:"trds-w-3 trds-h-3"},md:{control:"trds-w-4 trds-h-4"},lg:{control:"trds-w-5 trds-h-5"}}},defaultVariants:{size:"md"}}),le=l.forwardRef((e,r)=>{const{size:t,className:d,children:o,...c}=e,n=ie({size:t});return a.jsxs(R,{ref:r,className:S(n.root(),d),...c,children:[a.jsx(T,{className:n.hiddenInput()}),a.jsxs(N,{className:n.control(),children:[a.jsx(g,{asChild:!0,children:a.jsx(F,{size:E(t),strokeWidth:3})}),a.jsx(g,{indeterminate:!0,asChild:!0,children:a.jsx(te,{size:E(t),strokeWidth:3})})]}),o&&a.jsx(H,{className:n.label(),children:o})]})}),E=e=>e==="sm"?12:e==="md"?16:e==="lg"?20:16;le.__docgenInfo={description:"",methods:[],displayName:"Checkbox"};export{le as C};
