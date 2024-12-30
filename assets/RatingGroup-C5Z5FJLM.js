import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{t as W,I as q,c as x}from"./tv-CIwtzMts.js";import{r as c}from"./index-CDs2tPxN.js";import{c as B}from"./create-react-context-Dw26gLIP.js";import{c as _,p as I,s as V,a as z,b as K,S as Z,d as v,T as X,e as J,f as O,r as Q,z as Y,D as ee}from"./factory-Bfpif5Qa.js";import{c as k}from"./create-split-props-u5h9OPvL.js";import{d as te,e as oe,h as re,g as ae}from"./index-Bc8Or9Mt.js";import{a as ne,t as ie}from"./index-DBzJ7FiP.js";import{c as se,a as G}from"./index-DE2wJq7j.js";import{a as le,u as de}from"./use-locale-context-hL6yk3cA.js";import{u as N}from"./use-event-eGuf5zsd.js";import{u as A}from"./use-field-context-Bc1L1tNp.js";const[ue,L]=_({name:"RatingGroupContext",hookName:"useRatingGroupContext",providerName:"<RatingGroupProvider />"}),ce=e=>e.children(L()),T=c.forwardRef((e,o)=>{const t=L(),r=I(t.getControlProps(),e);return i.jsx(V.div,{...r,ref:o})});T.displayName="RatingGroupControl";const j=c.forwardRef((e,o)=>{const t=L(),r=I(t.getHiddenInputProps(),e),a=A();return i.jsx(V.input,{"aria-describedby":a==null?void 0:a.ariaDescribedby,...r,ref:o})});j.displayName="RatingGroupHiddenInput";const[ge,pe]=_({name:"RatingGroupItemContext",hookName:"useRatingGroupItemContext",providerName:"<RatingGroupItemProvider />"}),S=c.forwardRef((e,o)=>{const[t,r]=k()(e,["index"]),a=L(),d=I(a.getItemProps(t),r),m=a.getItemState(t);return i.jsx(ge,{value:m,children:i.jsx(V.span,{...d,ref:o})})});S.displayName="RatingGroupItem";const me=e=>e.children(pe()),M=c.forwardRef((e,o)=>{const t=L(),r=I(t.getLabelProps(),e);return i.jsx(V.label,{...r,ref:o})});M.displayName="RatingGroupLabel";var ve=z("rating-group").parts("root","label","item","control"),C=ve.build(),n=K({getRootId:e=>{var o;return((o=e.ids)==null?void 0:o.root)??`rating:${e.id}`},getLabelId:e=>{var o;return((o=e.ids)==null?void 0:o.label)??`rating:${e.id}:label`},getHiddenInputId:e=>{var o;return((o=e.ids)==null?void 0:o.hiddenInput)??`rating:${e.id}:input`},getControlId:e=>{var o;return((o=e.ids)==null?void 0:o.control)??`rating:${e.id}:control`},getItemId:(e,o)=>{var t,r;return((r=(t=e.ids)==null?void 0:t.item)==null?void 0:r.call(t,o))??`rating:${e.id}:item:${o}`},getRootEl:e=>n.getById(e,n.getRootId(e)),getControlEl:e=>n.getById(e,n.getControlId(e)),getRadioEl:(e,o=e.value)=>{const t=`[role=radio][aria-posinset='${Math.ceil(o)}']`;return Z(n.getControlEl(e),t)},getHiddenInputEl:e=>n.getById(e,n.getHiddenInputId(e)),dispatchChangeEvent:e=>{const o=n.getHiddenInputEl(e);o&&ne(o,{value:e.value})}});function he(e,o,t){const r=e.context.isInteractive,a=e.context.isDisabled,d=e.context.value,m=e.context.hoveredValue,R=e.context.translations;function P(s){const l=e.context.isHovering?e.context.hoveredValue:e.context.value,g=Math.ceil(l)===s.index,E=s.index<=l||g,u=g&&Math.abs(l-s.index)===.5;return{highlighted:E,half:u,checked:g||e.context.value===-1&&s.index===1}}return{hovering:e.context.isHovering,value:d,hoveredValue:m,count:e.context.count,items:Array.from({length:e.context.count}).map((s,l)=>l+1),setValue(s){o({type:"SET_VALUE",value:s})},clearValue(){o("CLEAR_VALUE")},getRootProps(){return t.element({...C.root.attrs,dir:e.context.dir,id:n.getRootId(e.context)})},getHiddenInputProps(){return t.input({name:e.context.name,form:e.context.form,type:"text",hidden:!0,disabled:a,readOnly:e.context.readOnly,required:e.context.required,id:n.getHiddenInputId(e.context),defaultValue:e.context.value})},getLabelProps(){return t.label({...C.label.attrs,dir:e.context.dir,id:n.getLabelId(e.context),"data-disabled":v(a),htmlFor:n.getHiddenInputId(e.context),onClick(s){if(s.defaultPrevented||!r)return;s.preventDefault();const l=n.getRadioEl(e.context,1);l==null||l.focus({preventScroll:!0})}})},getControlProps(){return t.element({id:n.getControlId(e.context),...C.control.attrs,dir:e.context.dir,role:"radiogroup","aria-orientation":"horizontal","aria-labelledby":n.getLabelId(e.context),"aria-readonly":X(e.context.readOnly),"data-readonly":v(e.context.readOnly),tabIndex:e.context.readOnly?0:-1,"data-disabled":v(a),onPointerMove(s){r&&s.pointerType!=="touch"&&o("GROUP_POINTER_OVER")},onPointerLeave(s){r&&s.pointerType!=="touch"&&o("GROUP_POINTER_LEAVE")}})},getItemState:P,getItemProps(s){const{index:l}=s,g=P(s),E=R.ratingValueText(l);return t.element({...C.item.attrs,dir:e.context.dir,id:n.getItemId(e.context,l.toString()),role:"radio",tabIndex:a?void 0:g.checked?0:-1,"aria-roledescription":"rating","aria-label":E,"aria-disabled":a,"data-disabled":v(a),"data-readonly":v(e.context.readOnly),"aria-setsize":e.context.count,"aria-checked":g.checked,"data-checked":v(g.checked),"aria-posinset":l,"data-highlighted":v(g.highlighted),"data-half":v(g.half),onPointerDown(u){r&&te(u)&&u.preventDefault()},onPointerMove(u){if(!r)return;const y=oe(u),$=re(y,u.currentTarget).getPercentValue({orientation:"horizontal",dir:e.context.dir})<.5;o({type:"POINTER_OVER",index:l,isMidway:$})},onKeyDown(u){if(u.defaultPrevented||!r)return;const y={ArrowLeft(){o("ARROW_LEFT")},ArrowRight(){o("ARROW_RIGHT")},ArrowUp(){o("ARROW_LEFT")},ArrowDown(){o("ARROW_RIGHT")},Space(){o({type:"SPACE",value:l})},Home(){o("HOME")},End(){o("END")}},w=ae(u,e.context),b=y[w];b&&(u.preventDefault(),b(u))},onClick(){r&&o({type:"CLICK",value:l})},onFocus(){r&&o("FOCUS")},onBlur(){r&&o("BLUR")}})}}}function fe(e){const o=se(e);return J({id:"rating",initial:"idle",context:{name:"rating",count:5,dir:"ltr",value:-1,readOnly:!1,disabled:!1,...o,hoveredValue:-1,fieldsetDisabled:!1,translations:{ratingValueText:t=>`${t} stars`,...o.translations}},created:["roundValueIfNeeded"],watch:{allowHalf:["roundValueIfNeeded"]},computed:{isDisabled:t=>!!t.disabled||t.fieldsetDisabled,isInteractive:t=>!(t.isDisabled||t.readOnly),isHovering:t=>t.hoveredValue>-1},activities:["trackFormControlState"],on:{SET_VALUE:{actions:["setValue"]},CLEAR_VALUE:{actions:["clearValue"]}},states:{idle:{entry:"clearHoveredValue",on:{GROUP_POINTER_OVER:"hover",FOCUS:"focus",CLICK:{actions:["setValue","focusActiveRadio"]}}},focus:{on:{POINTER_OVER:{actions:"setHoveredValue"},GROUP_POINTER_LEAVE:{actions:"clearHoveredValue"},BLUR:"idle",SPACE:{guard:"isValueEmpty",actions:["setValue"]},CLICK:{actions:["setValue","focusActiveRadio"]},ARROW_LEFT:{actions:["setPrevValue","focusActiveRadio"]},ARROW_RIGHT:{actions:["setNextValue","focusActiveRadio"]},HOME:{actions:["setValueToMin","focusActiveRadio"]},END:{actions:["setValueToMax","focusActiveRadio"]}}},hover:{on:{POINTER_OVER:{actions:"setHoveredValue"},GROUP_POINTER_LEAVE:[{guard:"isRadioFocused",target:"focus",actions:"clearHoveredValue"},{target:"idle",actions:"clearHoveredValue"}],CLICK:{actions:["setValue","focusActiveRadio"]}}}}},{guards:{isInteractive:t=>!(t.disabled||t.readOnly),isHoveredValueEmpty:t=>t.hoveredValue===-1,isValueEmpty:t=>t.value<=0,isRadioFocused:t=>{var r;return!!((r=n.getControlEl(t))!=null&&r.contains(n.getActiveElement(t)))}},activities:{trackFormControlState(t,r,{initialContext:a}){return ie(n.getHiddenInputEl(t),{onFieldsetDisabledChange(d){t.fieldsetDisabled=d},onFormReset(){p.value(t,a.value)}})}},actions:{clearHoveredValue(t){p.hoveredValue(t,-1)},focusActiveRadio(t){Q(()=>{var r;return(r=n.getRadioEl(t))==null?void 0:r.focus()})},setPrevValue(t){const r=t.allowHalf?.5:1;p.value(t,Math.max(0,t.value-r))},setNextValue(t){const r=t.allowHalf?.5:1,a=t.value===-1?0:t.value;p.value(t,Math.min(t.count,a+r))},setValueToMin(t){p.value(t,1)},setValueToMax(t){p.value(t,t.count)},setValue(t,r){const a=t.hoveredValue===-1?r.value:t.hoveredValue;p.value(t,a)},clearValue(t){p.value(t,-1)},setHoveredValue(t,r){const d=t.allowHalf&&r.isMidway?.5:0;p.hoveredValue(t,r.index-d)},roundValueIfNeeded(t){t.allowHalf||(t.value=Math.round(t.value))}}})}var H={change:e=>{var o;(o=e.onValueChange)==null||o.call(e,{value:e.value}),n.dispatchChangeEvent(e)},hoverChange:e=>{var o;(o=e.onHoverChange)==null||o.call(e,{hoveredValue:e.hoveredValue})}},p={value:(e,o)=>{G(e.value,o)||(e.value=o,H.change(e))},hoveredValue:(e,o)=>{G(e.hoveredValue,o)||(e.hoveredValue=o,H.hoverChange(e))}};O()(["allowHalf","autoFocus","count","dir","disabled","form","getRootNode","id","ids","name","onHoverChange","onValueChange","required","readOnly","translations","value"]);O()(["index"]);const Re=e=>{const{getRootNode:o}=le(),{dir:t}=de(),r=A(),a={id:c.useId(),ids:{label:r==null?void 0:r.ids.label,hiddenInput:r==null?void 0:r.ids.control},dir:t,disabled:r==null?void 0:r.disabled,readOnly:r==null?void 0:r.readOnly,required:r==null?void 0:r.required,getRootNode:o,value:e.defaultValue,...e},d={...a,value:e.value,onValueChange:N(e.onValueChange,{sync:!0}),onHoverChange:N(e.onHoverChange)},[m,R]=Y(fe(a),{context:d});return he(m,R,ee)},F=c.forwardRef((e,o)=>{const[t,r]=k()(e,["allowHalf","autoFocus","count","defaultValue","disabled","form","id","ids","name","onHoverChange","onValueChange","readOnly","required","translations","value"]),a=Re(t),d=I(a.getRootProps(),r);return i.jsx(ue,{value:a,children:i.jsx(V.div,{...d,ref:o})})});F.displayName="RatingGroupRoot";const Ie=W({base:`${q.scope} ratingGroup`,slots:{root:"trds-flex trds-flex-col trds-gap-1.5 trds-text-primary",control:"trds-flex",label:"",item:"trds-cursor-pointer trds-transition trds-duration-normal trds-transition-[color,fill] trds-ease-default trds-fill-transparent data-highlighted:trds-fill-current focus-visible:trds-outline-none data-disabled:trds-cursor-not-allowed data-disabled:trds-opacity-40"},variants:{size:{sm:{control:"trds-gap-0",item:"[&_svg:trds-w-4] [&_svg:trds-h-4]",label:"trds-text-sm"},md:{control:"trds-gap-0.5",item:"[&_svg:trds-w-5] [&_svg:trds-h-5]",label:"trds-text-sm"},lg:{control:"trds-gap-0.5",item:"[&_svg:trds-w-6] [&_svg:trds-h-6]",label:"trds-text-md"}}},defaultVariants:{size:"md"}}),[Ve,f]=B({name:"radioGroup",hookName:"useRadioGroupContext",providerName:"RadioGroupProvider",defaultValue:{classes:{},size:"md"}}),Le=c.forwardRef(function(e,o){const{size:t,className:r,children:a,...d}=e,m=Ie({size:t}),R={classes:m,size:t};return i.jsx(Ve,{value:R,children:i.jsx(F,{ref:o,className:x(m.root(),r),...d,children:a})})}),Ce=c.forwardRef(function(e,o){const{className:t,...r}=e,{classes:a}=f();return i.jsx(M,{className:x(a.label(),t),ref:o,...r})});Ce.displayName="RatingGroup.Label";const D=c.forwardRef(function(e,o){const{className:t,...r}=e,{classes:a}=f();return i.jsx(S,{className:x(a.item(),t),ref:o,...r})});D.displayName="RatingGroup.Item";const U=c.forwardRef(function(e,o){const{className:t,...r}=e,{classes:a}=f();return i.jsx(T,{className:x(a.control(),t),ref:o,...r})});U.displayName="RatingGroup.Control";const Se=j,Me=ce,Fe=me,h=e=>e==="sm"?12:e==="md"?16:e==="lg"?20:16,xe=e=>{const{size:o}=f();return i.jsx("svg",{width:h(o),height:h(o),viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:i.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",fill:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})},Ee=e=>{const{size:o}=f();return i.jsxs("svg",{width:h(o),height:h(o),viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:[i.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),i.jsx("path",{d:"M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z",fill:"currentColor",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})},ye=e=>{const{size:o}=f();return i.jsx("svg",{width:h(o),height:h(o),viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",...e,children:i.jsx("path",{d:"M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})})};Le.__docgenInfo={description:"",methods:[],displayName:"Root"};D.__docgenInfo={description:"",methods:[],displayName:"RatingGroup.Item"};U.__docgenInfo={description:"",methods:[],displayName:"RatingGroup.Control"};xe.__docgenInfo={description:"",methods:[],displayName:"FullStarIcon"};Ee.__docgenInfo={description:"",methods:[],displayName:"HalfStarIcon"};ye.__docgenInfo={description:"",methods:[],displayName:"EmptyStarIcon"};export{U as C,ye as E,xe as F,Se as H,D as I,Le as R,Me as a,Fe as b,Ee as c};
