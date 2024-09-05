import{j as g}from"./jsx-runtime-qGIIFXMu.js";import{I as de}from"./index-9MS2e6do.js";import{r as v}from"./index-CDs2tPxN.js";import{t as le,c as ue}from"./tv-Br1lVx4G.js";import{c as G,m as P,h as T,a as ce,b as ge,q as me,d as u,V as fe,e as he,f as q,r as pe,A as ve,E as be}from"./factory-BCO0_PXk.js";import{c as D}from"./create-split-props-u5h9OPvL.js";import{h as Ie,j as xe,g as ye,d as Pe,k as Te,e as Ee,l as Se}from"./index-DRtd-hRg.js";import{g as K,a as _,b as Re,s as Ve,c as z,d as Ce,e as ke,f as Ae,h as N}from"./index-CMjQVyXy.js";import{a as we,t as Ne}from"./index-DBzJ7FiP.js";import{c as Oe,a as A}from"./index-B1LdDssV.js";import{u as Me,a as Fe}from"./use-locale-context-CTaGYWMe.js";import{u as w}from"./use-event-eGuf5zsd.js";const[De,E]=G({name:"SliderContext",hookName:"useSliderContext",providerName:"<SliderProvider />"}),X=v.forwardRef((e,r)=>{const t=E(),n=P(t.getControlProps(),e);return g.jsx(T.div,{...n,ref:r})});X.displayName="SliderControl";const[_e,ze]=G({name:"SliderThumbPropsContext",hookName:"useSliderThumbPropsContext",providerName:"<SliderThumbPropsProvider />"}),O=v.forwardRef((e,r)=>{const t=E(),n=ze(),o=P(t.getHiddenInputProps(n),e);return g.jsx(T.input,{...o,ref:r})});O.displayName="SliderHiddenInput";const Y=v.forwardRef((e,r)=>{const[t,n]=D()(e,["value"]),o=E(),a=P(o.getMarkerProps(t),n);return g.jsx(T.span,{...a,ref:r})});Y.displayName="SliderMarker";const J=v.forwardRef((e,r)=>{const t=E(),n=P(t.getMarkerGroupProps(),e);return g.jsx(T.div,{...n,ref:r})});J.displayName="SliderMarkerGroup";const Q=v.forwardRef((e,r)=>{const t=E(),n=P(t.getRangeProps(),e);return g.jsx(T.div,{...n,ref:r})});Q.displayName="SliderRange";function He(e,r){if(!e){r(void 0);return}r({width:e.offsetWidth,height:e.offsetHeight});const t=e.ownerDocument.defaultView??window,n=new t.ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const[a]=o;let c,d;if("borderBoxSize"in a){const m=a.borderBoxSize,f=Array.isArray(m)?m[0]:m;c=f.inlineSize,d=f.blockSize}else c=e.offsetWidth,d=e.offsetHeight;r({width:c,height:d})});return n.observe(e,{box:"border-box"}),()=>n.unobserve(e)}function je(e){const{getNodes:r,observeMutation:t=!0,callback:n}=e,o=[];let a=null;function c(){const d=r();a=d[0];const m=d.map((f,b)=>He(f,R=>{n(R,b)}));o.push(...m)}if(c(),t){const d=$e(a,c);o.push(d)}return()=>{o.forEach(d=>{d==null||d()})}}function $e(e,r){var o;if(!e||!e.parentElement)return;const t=((o=e.ownerDocument)==null?void 0:o.defaultView)??window,n=new t.MutationObserver(()=>{r()});return n.observe(e.parentElement,{childList:!0}),()=>{n.disconnect()}}var Ue=ce("slider").parts("root","label","thumb","valueText","track","range","control","markerGroup","marker"),I=Ue.build();function Be(e){const r=e[0],t=e[e.length-1];return[r,t]}function Le(e){const[r,t]=Be(e.valuePercent);if(e.valuePercent.length===1){if(e.origin==="center"){const n=e.valuePercent[0]<50,o=n?`${e.valuePercent[0]}%`:"50%",a=n?"50%":`${100-e.valuePercent[0]}%`;return{start:o,end:a}}return{start:"0%",end:`${100-t}%`}}return{start:`${r}%`,end:`${100-t}%`}}function We(e){return e.isVertical?{position:"absolute",bottom:"var(--slider-range-start)",top:"var(--slider-range-end)"}:{position:"absolute",[e.isRtl?"right":"left"]:"var(--slider-range-start)",[e.isRtl?"left":"right"]:"var(--slider-range-end)"}}function Ge(e){const{height:r=0}=e.thumbSize??{},t=N([e.min,e.max],[-r/2,r/2]);return parseFloat(t(e.value).toFixed(2))}function qe(e){const{width:r=0}=e.thumbSize??{};if(e.isRtl){const n=N([e.max,e.min],[-r/2,r/2]);return-1*parseFloat(n(e.value).toFixed(2))}const t=N([e.min,e.max],[-r/2,r/2]);return parseFloat(t(e.value).toFixed(2))}function Ke(e,r){if(e.thumbAlignment==="center")return`${r}%`;const t=e.isVertical?Ge(e):qe(e);return`calc(${r}% - ${t}px)`}function Z(e){let r=_(e.value,e.min,e.max)*100;return Ke(e,r)}function ee(e){let r="visible";return e.thumbAlignment==="contain"&&!e.hasMeasuredThumbSize&&(r="hidden"),r}function Xe(e,r){const t=e.isVertical?"bottom":"insetInlineStart";return{visibility:ee(e),position:"absolute",transform:"var(--slider-thumb-transform)",[t]:`var(--slider-thumb-offset-${r})`}}function Ye(){return{touchAction:"none",userSelect:"none",WebkitUserSelect:"none",position:"relative"}}function Je(e){const r=Le(e);return{...e.value.reduce((n,o,a)=>{const c=Z({...e,value:o});return{...n,[`--slider-thumb-offset-${a}`]:c}},{}),"--slider-thumb-transform":e.isVertical?"translateY(50%)":e.isRtl?"translateX(50%)":"translateX(-50%)","--slider-range-start":r.start,"--slider-range-end":r.end}}function Qe(e,r){return{visibility:ee(e),position:"absolute",pointerEvents:"none",[e.isHorizontal?"insetInlineStart":"bottom"]:Z({...e,value:r}),translate:"var(--tx) var(--ty)","--tx":e.isHorizontal?e.isRtl?"50%":"-50%":"0%","--ty":e.isHorizontal?"0%":"50%"}}function Ze(){return{userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none",position:"relative"}}var et={getRootStyle:Je,getControlStyle:Ye,getThumbStyle:Xe,getRangeStyle:We,getMarkerStyle:Qe,getMarkerGroupStyle:Ze},i=ge({...et,getRootId:e=>{var r;return((r=e.ids)==null?void 0:r.root)??`slider:${e.id}`},getThumbId:(e,r)=>{var t,n;return((n=(t=e.ids)==null?void 0:t.thumb)==null?void 0:n.call(t,r))??`slider:${e.id}:thumb:${r}`},getHiddenInputId:(e,r)=>{var t,n;return((n=(t=e.ids)==null?void 0:t.hiddenInput)==null?void 0:n.call(t,r))??`slider:${e.id}:input:${r}`},getControlId:e=>{var r;return((r=e.ids)==null?void 0:r.control)??`slider:${e.id}:control`},getTrackId:e=>{var r;return((r=e.ids)==null?void 0:r.track)??`slider:${e.id}:track`},getRangeId:e=>{var r;return((r=e.ids)==null?void 0:r.range)??`slider:${e.id}:range`},getLabelId:e=>{var r;return((r=e.ids)==null?void 0:r.label)??`slider:${e.id}:label`},getValueTextId:e=>{var r;return((r=e.ids)==null?void 0:r.valueText)??`slider:${e.id}:value-text`},getMarkerId:(e,r)=>{var t,n;return((n=(t=e.ids)==null?void 0:t.marker)==null?void 0:n.call(t,r))??`slider:${e.id}:marker:${r}`},getRootEl:e=>i.getById(e,i.getRootId(e)),getThumbEl:(e,r)=>i.getById(e,i.getThumbId(e,r)),getHiddenInputEl:(e,r)=>i.getById(e,i.getHiddenInputId(e,r)),getControlEl:e=>i.getById(e,i.getControlId(e)),getElements:e=>me(i.getControlEl(e),"[role=slider]"),getFirstEl:e=>i.getElements(e)[0],getRangeEl:e=>i.getById(e,i.getRangeId(e)),getValueFromPoint(e,r){const t=i.getControlEl(e);if(!t)return;const o=Ie(r,t).getPercentValue({orientation:e.orientation,dir:e.dir,inverted:{y:!0}});return K(o,e.min,e.max,e.step)},dispatchChangeEvent(e){Array.from(e.value).forEach((t,n)=>{const o=i.getHiddenInputEl(e,n);o&&we(o,{value:t})})}});function W(e,r){return r.map((t,n,o)=>M({...e,value:o},t,n))}function y(e,r){return Re(e.value,e.min,e.max,e.minStepsBetweenThumbs)[r]}function M(e,r,t){const n=y(e,t),o=Ve(r,e.min,e.max,e.step);return z(o,n.min,n.max)}function tt(e,r,t){const n=r??e.focusedIndex,o=y(e,n),a=Ce(n,{...o,step:t??e.step,values:e.value});return a[n]=z(a[n],o.min,o.max),a}function rt(e,r,t){const n=r??e.focusedIndex,o=y(e,n),a=ke(n,{...o,step:t??e.step,values:e.value});return a[n]=z(a[n],o.min,o.max),a}function nt(e,r){return Ae(e.value,r)}function ot(e,r){for(let t=0;t<r.length;t++){const n=r[t];e[t]=n}}function at(e,r,t){const n=e.context["aria-label"],o=e.context["aria-labelledby"],a=e.context.value,c=e.matches("focus"),d=e.matches("dragging"),m=e.context.isDisabled,f=e.context.invalid,b=e.context.isInteractive,R=e.context.orientation==="horizontal",H=e.context.orientation==="vertical";function j(s){return _(s,e.context.min,e.context.max)}function $(s){return K(s,e.context.min,e.context.max,e.context.step)}return{value:e.context.value,dragging:d,focused:c,setValue(s){r({type:"SET_VALUE",value:s})},getThumbValue(s){return a[s]},setThumbValue(s,l){r({type:"SET_VALUE",index:s,value:l})},getValuePercent:j,getPercentValue:$,getThumbPercent(s){return j(a[s])},setThumbPercent(s,l){const p=$(l);r({type:"SET_VALUE",index:s,value:p})},getThumbMin(s){return y(e.context,s).min},getThumbMax(s){return y(e.context,s).max},increment(s){r({type:"INCREMENT",index:s})},decrement(s){r({type:"DECREMENT",index:s})},focus(){b&&r({type:"FOCUS",index:0})},getLabelProps(){return t.label({...I.label.attrs,dir:e.context.dir,"data-disabled":u(m),"data-orientation":e.context.orientation,"data-invalid":u(f),"data-dragging":u(d),"data-focus":u(c),id:i.getLabelId(e.context),htmlFor:i.getHiddenInputId(e.context,0),onClick(s){var l;b&&(s.preventDefault(),(l=i.getFirstEl(e.context))==null||l.focus())},style:{userSelect:"none",WebkitUserSelect:"none"}})},getRootProps(){return t.element({...I.root.attrs,"data-disabled":u(m),"data-orientation":e.context.orientation,"data-dragging":u(d),"data-invalid":u(f),"data-focus":u(c),id:i.getRootId(e.context),dir:e.context.dir,style:i.getRootStyle(e.context)})},getValueTextProps(){return t.element({...I.valueText.attrs,dir:e.context.dir,"data-disabled":u(m),"data-orientation":e.context.orientation,"data-invalid":u(f),"data-focus":u(c),id:i.getValueTextId(e.context)})},getTrackProps(){return t.element({...I.track.attrs,dir:e.context.dir,id:i.getTrackId(e.context),"data-disabled":u(m),"data-invalid":u(f),"data-dragging":u(d),"data-orientation":e.context.orientation,"data-focus":u(c),style:{position:"relative"}})},getThumbProps(s){var U,B;const{index:l=0,name:p}=s,k=a[l],V=y(e.context,l),ne=(B=(U=e.context).getAriaValueText)==null?void 0:B.call(U,{value:k,index:l}),oe=Array.isArray(n)?n[l]:n,ae=Array.isArray(o)?o[l]:o;return t.element({...I.thumb.attrs,dir:e.context.dir,"data-index":l,"data-name":p,id:i.getThumbId(e.context,l),"data-disabled":u(m),"data-orientation":e.context.orientation,"data-focus":u(c&&e.context.focusedIndex===l),"data-dragging":u(d&&e.context.focusedIndex===l),draggable:!1,"aria-disabled":fe(m),"aria-label":oe,"aria-labelledby":ae??i.getLabelId(e.context),"aria-orientation":e.context.orientation,"aria-valuemax":V.max,"aria-valuemin":V.min,"aria-valuenow":a[l],"aria-valuetext":ne,role:"slider",tabIndex:m?void 0:0,style:i.getThumbStyle(e.context,l),onPointerDown(x){b&&(r({type:"THUMB_POINTER_DOWN",index:l}),x.stopPropagation())},onBlur(){b&&r("BLUR")},onFocus(){b&&r({type:"FOCUS",index:l})},onKeyDown(x){if(x.defaultPrevented||!b)return;const S=xe(x)*e.context.step,ie={ArrowUp(){R||r({type:"ARROW_INC",step:S,src:"ArrowUp"})},ArrowDown(){R||r({type:"ARROW_DEC",step:S,src:"ArrowDown"})},ArrowLeft(){H||r({type:"ARROW_DEC",step:S,src:"ArrowLeft"})},ArrowRight(){H||r({type:"ARROW_INC",step:S,src:"ArrowRight"})},PageUp(){r({type:"ARROW_INC",step:S,src:"PageUp"})},PageDown(){r({type:"ARROW_DEC",step:S,src:"PageDown"})},Home(){r("HOME")},End(){r("END")}},se=ye(x,e.context),L=ie[se];L&&(L(x),x.preventDefault(),x.stopPropagation())}})},getHiddenInputProps(s){const{index:l=0,name:p}=s;return t.input({name:p??(e.context.name?e.context.name+(e.context.value.length>1?"[]":""):void 0),form:e.context.form,type:"text",hidden:!0,defaultValue:e.context.value[l],id:i.getHiddenInputId(e.context,l)})},getRangeProps(){return t.element({id:i.getRangeId(e.context),...I.range.attrs,dir:e.context.dir,"data-dragging":u(d),"data-focus":u(c),"data-invalid":u(f),"data-disabled":u(m),"data-orientation":e.context.orientation,style:i.getRangeStyle(e.context)})},getControlProps(){return t.element({...I.control.attrs,dir:e.context.dir,id:i.getControlId(e.context),"data-dragging":u(d),"data-disabled":u(m),"data-orientation":e.context.orientation,"data-invalid":u(f),"data-focus":u(c),style:i.getControlStyle(),onPointerDown(s){if(!b||!Pe(s)||Te(s))return;const l=Ee(s);r({type:"POINTER_DOWN",point:l}),s.preventDefault(),s.stopPropagation()}})},getMarkerGroupProps(){return t.element({...I.markerGroup.attrs,role:"presentation",dir:e.context.dir,"aria-hidden":!0,"data-orientation":e.context.orientation,style:i.getMarkerGroupStyle()})},getMarkerProps(s){const l=i.getMarkerStyle(e.context,s.value);let p;const k=e.context.value[0],V=e.context.value[e.context.value.length-1];return s.value<k?p="under-value":s.value>V?p="over-value":p="at-value",t.element({...I.marker.attrs,id:i.getMarkerId(e.context,s.value),role:"presentation",dir:e.context.dir,"data-orientation":e.context.orientation,"data-value":s.value,"data-disabled":u(m),"data-state":p,style:l})}}}var it=(e,r)=>(e==null?void 0:e.width)===(r==null?void 0:r.width)&&(e==null?void 0:e.height)===(r==null?void 0:r.height);function st(e){const r=Oe(e);return he({id:"slider",initial:"idle",context:{thumbSize:null,thumbAlignment:"contain",min:0,max:100,step:1,value:[0],origin:"start",orientation:"horizontal",dir:"ltr",minStepsBetweenThumbs:0,disabled:!1,readOnly:!1,...r,focusedIndex:-1,fieldsetDisabled:!1},computed:{isHorizontal:t=>t.orientation==="horizontal",isVertical:t=>t.orientation==="vertical",isRtl:t=>t.orientation==="horizontal"&&t.dir==="rtl",isDisabled:t=>!!t.disabled||t.fieldsetDisabled,isInteractive:t=>!(t.readOnly||t.isDisabled),hasMeasuredThumbSize:t=>t.thumbSize!=null,valuePercent(t){return t.value.map(n=>100*_(n,t.min,t.max))}},watch:{value:["syncInputElements"]},entry:["coarseValue"],activities:["trackFormControlState","trackThumbsSize"],on:{SET_VALUE:[{guard:"hasIndex",actions:"setValueAtIndex"},{actions:"setValue"}],INCREMENT:{actions:"incrementThumbAtIndex"},DECREMENT:{actions:"decrementThumbAtIndex"}},states:{idle:{on:{POINTER_DOWN:{target:"dragging",actions:["setClosestThumbIndex","setPointerValue","focusActiveThumb"]},FOCUS:{target:"focus",actions:"setFocusedIndex"},THUMB_POINTER_DOWN:{target:"dragging",actions:["setFocusedIndex","focusActiveThumb"]}}},focus:{entry:"focusActiveThumb",on:{POINTER_DOWN:{target:"dragging",actions:["setClosestThumbIndex","setPointerValue","focusActiveThumb"]},THUMB_POINTER_DOWN:{target:"dragging",actions:["setFocusedIndex","focusActiveThumb"]},ARROW_DEC:{actions:["decrementThumbAtIndex","invokeOnChangeEnd"]},ARROW_INC:{actions:["incrementThumbAtIndex","invokeOnChangeEnd"]},HOME:{actions:["setFocusedThumbToMin","invokeOnChangeEnd"]},END:{actions:["setFocusedThumbToMax","invokeOnChangeEnd"]},BLUR:{target:"idle",actions:"clearFocusedIndex"}}},dragging:{entry:"focusActiveThumb",activities:"trackPointerMove",on:{POINTER_UP:{target:"focus",actions:"invokeOnChangeEnd"},POINTER_MOVE:{actions:"setPointerValue"}}}}},{guards:{hasIndex:(t,n)=>n.index!=null},activities:{trackFormControlState(t,n,{initialContext:o}){return Ne(i.getRootEl(t),{onFieldsetDisabledChange(a){t.fieldsetDisabled=a},onFormReset(){h.value(t,o.value)}})},trackPointerMove(t,n,{send:o}){return Se(i.getDoc(t),{onPointerMove(a){o({type:"POINTER_MOVE",point:a.point})},onPointerUp(){o("POINTER_UP")}})},trackThumbsSize(t){if(!(t.thumbAlignment!=="contain"||t.thumbSize))return je({getNodes:()=>i.getElements(t),observeMutation:!0,callback(n){!n||it(t.thumbSize,n)||(t.thumbSize=n)}})}},actions:{syncInputElements(t){t.value.forEach((n,o)=>{const a=i.getHiddenInputEl(t,o);i.setValue(a,n)})},invokeOnChangeEnd(t){C.valueChangeEnd(t)},setClosestThumbIndex(t,n){const o=i.getValueFromPoint(t,n.point);if(o==null)return;const a=nt(t,o);h.focusedIndex(t,a)},setFocusedIndex(t,n){h.focusedIndex(t,n.index)},clearFocusedIndex(t){h.focusedIndex(t,-1)},setPointerValue(t,n){const o=i.getValueFromPoint(t,n.point);if(o==null)return;const a=M(t,o,t.focusedIndex);h.valueAtIndex(t,t.focusedIndex,a)},focusActiveThumb(t){pe(()=>{const n=i.getThumbEl(t,t.focusedIndex);n==null||n.focus({preventScroll:!0})})},decrementThumbAtIndex(t,n){const o=tt(t,n.index,n.step);h.value(t,o)},incrementThumbAtIndex(t,n){const o=rt(t,n.index,n.step);h.value(t,o)},setFocusedThumbToMin(t){const{min:n}=y(t,t.focusedIndex);h.valueAtIndex(t,t.focusedIndex,n)},setFocusedThumbToMax(t){const{max:n}=y(t,t.focusedIndex);h.valueAtIndex(t,t.focusedIndex,n)},coarseValue(t){const n=W(t,t.value);h.value(t,n)},setValueAtIndex(t,n){const o=M(t,n.value,n.index);h.valueAtIndex(t,n.index,o)},setValue(t,n){const o=W(t,n.value);h.value(t,o)}}})}var C={valueChange(e){var r;(r=e.onValueChange)==null||r.call(e,{value:Array.from(e.value)}),i.dispatchChangeEvent(e)},valueChangeEnd(e){var r;(r=e.onValueChangeEnd)==null||r.call(e,{value:Array.from(e.value)})},focusChange(e){var r;(r=e.onFocusChange)==null||r.call(e,{value:Array.from(e.value),focusedIndex:e.focusedIndex})}},h={valueAtIndex:(e,r,t)=>{A(e.value[r],t)||(e.value[r]=t,C.valueChange(e))},value:(e,r)=>{A(e.value,r)||(ot(e.value,r),C.valueChange(e))},focusedIndex:(e,r)=>{A(e.focusedIndex,r)||(e.focusedIndex=r,C.focusChange(e))}};q()(["aria-label","aria-labelledby","dir","disabled","form","getAriaValueText","getRootNode","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]);q()(["index","name"]);const dt=e=>{const{getRootNode:r}=Me(),{dir:t}=Fe(),n={id:v.useId(),dir:t,getRootNode:r,value:e.defaultValue,...e},o={...n,value:e.value,onValueChange:w(e.onValueChange,{sync:!0}),onValueChangeEnd:w(e.onValueChangeEnd),onFocusChange:w(e.onFocusChange)},[a,c]=ve(st(n),{context:o});return at(a,c,be)},te=v.forwardRef((e,r)=>{const[t,n]=D()(e,["aria-label","aria-labelledby","defaultValue","disabled","form","getAriaValueText","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]),o=dt(t),a=P(o.getRootProps(),n);return g.jsx(De,{value:o,children:g.jsx(T.div,{...a,ref:r})})});te.displayName="SliderRoot";const F=v.forwardRef((e,r)=>{const[t,n]=D()(e,["index","name"]),o=E(),a=P(o.getThumbProps(t),n);return g.jsx(_e,{value:t,children:g.jsx(T.div,{...a,ref:r})})});F.displayName="SliderThumb";const re=v.forwardRef((e,r)=>{const t=E(),n=P(t.getTrackProps(),e);return g.jsx(T.div,{...n,ref:r})});re.displayName="SliderTrack";const lt=le({base:`${de.scope} slider`,slots:{root:"trds-flex trds-flex-col trds-gap-1 trds-w-full",control:"trds-relative trds-flex trds-items-center",track:"trds-bg-neutral-200 trds-rounded-full trds-overflow-hidden trds-flex-1 trds-cursor-pointer data-disabled:trds-cursor-not-allowed",range:"trds-bg-primary data-disabled:trds-bg-muted",thumb:"trds-bg-white trds-border-primary trds-rounded-full trds-border-2 trds-shadow-md trds-outline-none trds-z-1 trds-cursor-pointer data-disabled:trds-border-muted data-disabled:trds-cursor-not-allowed",markerGroup:"-trds-mt-1",marker:"trds-text-current before:trds-bg-white before:trds-rounded-full before:trds-content-[''] before:trds-block before:trds-left-1/2 before:trds-relative before:-trds-translate-x-1/2"},variants:{size:{sm:{control:"trds-h-4",range:"trds-h-1.5",track:"trds-h-1.5",thumb:"trds-h-4 trds-w-4",marker:"trds-text-sm before:trds-h-1 before:-trds-top-2.5 before:trds-w-0.5"},md:{control:"trds-h-5",range:"trds-h-2",track:"trds-h-2",thumb:"trds-h-5 trds-w-5",marker:"trds-text-sm before:trds-h-1 before:-trds-top-3 before:trds-w-0.5"},lg:{control:"trds-h-6",range:"trds-h-2.5",track:"trds-h-2.5",thumb:"trds-h-6 trds-w-6",marker:"trds-text-md before:trds-h-1.5 before:trds-top-[-15px] before:trds-w-0.5"}}},defaultVariants:{size:"md"}}),ut=v.forwardRef((e,r)=>{const{size:t,multiple:n=!1,markers:o=[],className:a,...c}=e,d=lt({size:t});return g.jsxs(te,{ref:r,className:ue(d.root(),a),...c,children:[g.jsxs(X,{className:d.control(),children:[g.jsx(re,{className:d.track(),children:g.jsx(Q,{className:d.range()})}),g.jsx(F,{index:0,className:d.thumb(),children:g.jsx(O,{})}),n&&g.jsx(F,{index:1,className:d.thumb(),children:g.jsx(O,{})})]}),o.length>0&&g.jsx(J,{className:d.markerGroup(),children:o.map(({value:m,marker:f})=>g.jsx(Y,{value:m,className:d.marker(),children:f}))})]})});ut.__docgenInfo={description:"",methods:[],displayName:"Root"};export{ut as R};
