import{j as g}from"./jsx-runtime-qGIIFXMu.js";import{r as b}from"./index-CDs2tPxN.js";import{c as fe}from"./cva-C095pwBQ.js";import{s as he}from"./sva-CxSEfBjn.js";import{k as pe,c as X,m as T,l as E,a as z,p as ve,q as be,J as ye,s as d,I as Ie,t as Se,u as K,r as Pe,x as Te,y as Ee}from"./create-split-props-BDI0pziA.js";import{g as Re,a as Y,b as D,c as Ve,s as ke,d as H,e as Ce,f as Ae,h as xe,i as N}from"./index-4KpmSbEW.js";import{c as $e,k as we,d as Ne,i as $,u as Me,e as Oe}from"./use-locale-context-kz_CgJym.js";import{d as Fe}from"./index-hTcMZcOQ.js";import{c as J}from"./index-DJ3ti8gJ.js";import{d as _e,h as ze,e as De,c as He,j as Be,g as Ue,k as je}from"./index-AUxzzpyp.js";import{a as We,t as Le}from"./index-DBzJ7FiP.js";import{u as w}from"./use-event-eGuf5zsd.js";function Ge(e,t,n){return Math.round((e-t)/n)*n+t}function qe(e,t,n){return Math.min(Math.max(e,t),n)}function Xe(e,t,n){return(e-t)/(n-t)}function Ke(e,t,n,r){const o=e*(n-t)+t,a=Ge(o,t,r);return qe(a,t,n)}function M(e,t){const n={min:e[0],max:e[1]},r={min:t[0],max:t[1]};return function(a){if(n.min===n.max||r.min===r.max)return r.min;const l=(r.max-r.min)/(n.max-n.min);return r.min+l*(a-n.min)}}var Q=pe("slider").parts("root","label","thumb","valueText","track","range","control","markerGroup","marker");Q.build();function Ye(e){const t=e[0],n=e[e.length-1];return[t,n]}function Je(e){const[t,n]=Ye(e.valuePercent);if(e.valuePercent.length===1){if(e.origin==="center"){const r=e.valuePercent[0]<50,o=r?`${e.valuePercent[0]}%`:"50%",a=r?"50%":`${100-e.valuePercent[0]}%`;return{start:o,end:a}}return{start:"0%",end:`${100-n}%`}}return{start:`${t}%`,end:`${100-n}%`}}function Qe(e){return e.isVertical?{position:"absolute",bottom:"var(--slider-range-start)",top:"var(--slider-range-end)"}:{position:"absolute",[e.isRtl?"right":"left"]:"var(--slider-range-start)",[e.isRtl?"left":"right"]:"var(--slider-range-end)"}}function Ze(e){const{height:t=0}=e.thumbSize??{},n=M([e.min,e.max],[-t/2,t/2]);return parseFloat(n(e.value).toFixed(2))}function et(e){const{width:t=0}=e.thumbSize??{};if(e.isRtl){const r=M([e.max,e.min],[-t/2,t/2]);return-1*parseFloat(r(e.value).toFixed(2))}const n=M([e.min,e.max],[-t/2,t/2]);return parseFloat(n(e.value).toFixed(2))}function tt(e,t){if(e.thumbAlignment==="center")return`${t}%`;const n=e.isVertical?Ze(e):et(e);return`calc(${t}% - ${n}px)`}function Z(e){let t=Xe(e.value,e.min,e.max)*100;return tt(e,t)}function ee(e){let t="visible";return e.thumbAlignment==="contain"&&!e.hasMeasuredThumbSize&&(t="hidden"),t}function nt(e,t){const n=e.isVertical?"bottom":"insetInlineStart";return{visibility:ee(e),position:"absolute",transform:"var(--slider-thumb-transform)",[n]:`var(--slider-thumb-offset-${t})`}}function rt(){return{touchAction:"none",userSelect:"none",WebkitUserSelect:"none",position:"relative"}}function ot(e){const t=Je(e);return{...e.value.reduce((r,o,a)=>{const l=Z({...e,value:o});return{...r,[`--slider-thumb-offset-${a}`]:l}},{}),"--slider-thumb-transform":e.isVertical?"translateY(50%)":e.isRtl?"translateX(50%)":"translateX(-50%)","--slider-range-start":t.start,"--slider-range-end":t.end}}function at(e,t){return{visibility:ee(e),position:"absolute",pointerEvents:"none",[e.isHorizontal?"insetInlineStart":"bottom"]:Z({...e,value:t}),translate:"var(--tx) var(--ty)","--tx":e.isHorizontal?e.isRtl?"50%":"-50%":"0%","--ty":e.isHorizontal?"0%":"50%"}}function it(){return{userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none",position:"relative"}}var st={getRootStyle:ot,getControlStyle:rt,getThumbStyle:nt,getRangeStyle:Qe,getMarkerStyle:at,getMarkerGroupStyle:it},f=$e({...st,getRootId:e=>{var t;return((t=e.ids)==null?void 0:t.root)??`slider:${e.id}`},getThumbId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.thumb)==null?void 0:r.call(n,t))??`slider:${e.id}:thumb:${t}`},getHiddenInputId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.hiddenInput)==null?void 0:r.call(n,t))??`slider:${e.id}:input:${t}`},getControlId:e=>{var t;return((t=e.ids)==null?void 0:t.control)??`slider:${e.id}:control`},getTrackId:e=>{var t;return((t=e.ids)==null?void 0:t.track)??`slider:${e.id}:track`},getRangeId:e=>{var t;return((t=e.ids)==null?void 0:t.range)??`slider:${e.id}:range`},getLabelId:e=>{var t;return((t=e.ids)==null?void 0:t.label)??`slider:${e.id}:label`},getValueTextId:e=>{var t;return((t=e.ids)==null?void 0:t.valueText)??`slider:${e.id}:value-text`},getMarkerId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.marker)==null?void 0:r.call(n,t))??`slider:${e.id}:marker:${t}`},getRootEl:e=>f.getById(e,f.getRootId(e)),getThumbEl:(e,t)=>f.getById(e,f.getThumbId(e,t)),getHiddenInputEl:(e,t)=>f.getById(e,f.getHiddenInputId(e,t)),getControlEl:e=>f.getById(e,f.getControlId(e)),getElements:e=>we(f.getControlEl(e),"[role=slider]"),getFirstEl:e=>f.getElements(e)[0],getRangeEl:e=>f.getById(e,f.getRangeId(e)),getValueFromPoint(e,t){const n=f.getControlEl(e);if(!n)return;const o=Re(t,n).getPercentValue({orientation:e.orientation,dir:e.dir,inverted:{y:!0}});return Ke(o,e.min,e.max,e.step)},dispatchChangeEvent(e){Array.from(e.value).forEach((n,r)=>{const o=f.getHiddenInputEl(e,r);o&&Fe(o,{value:n})})}});J()(["aria-label","aria-labelledby","dir","disabled","form","getAriaValueText","getRootNode","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]);J()(["index","name"]);const[lt,R]=X({name:"SliderContext",hookName:"useSliderContext",providerName:"<SliderProvider />"}),te=b.forwardRef((e,t)=>{const n=R(),r=T(n.getControlProps(),e);return g.jsx(E.div,{...r,ref:t})});te.displayName="SliderControl";const[ut,dt]=X({name:"SliderThumbPropsContext",hookName:"useSliderThumbPropsContext",providerName:"<SliderThumbPropsProvider />"}),O=b.forwardRef((e,t)=>{const n=R(),r=dt(),o=T(n.getHiddenInputProps(r),e);return g.jsx(E.input,{...o,ref:t})});O.displayName="SliderHiddenInput";const ne=b.forwardRef((e,t)=>{const[n,r]=z()(e,["value"]),o=R(),a=T(o.getMarkerProps(n),r);return g.jsx(E.span,{...a,ref:t})});ne.displayName="SliderMarker";const re=b.forwardRef((e,t)=>{const n=R(),r=T(n.getMarkerGroupProps(),e);return g.jsx(E.div,{...r,ref:t})});re.displayName="SliderMarkerGroup";const oe=b.forwardRef((e,t)=>{const n=R(),r=T(n.getRangeProps(),e);return g.jsx(E.div,{...r,ref:t})});oe.displayName="SliderRange";function ct(e,t){if(!e){t(void 0);return}t({width:e.offsetWidth,height:e.offsetHeight});const n=e.ownerDocument.defaultView??window,r=new n.ResizeObserver(o=>{if(!Array.isArray(o)||!o.length)return;const[a]=o;let l,c;if("borderBoxSize"in a){const m=a.borderBoxSize,p=Array.isArray(m)?m[0]:m;l=p.inlineSize,c=p.blockSize}else l=e.offsetWidth,c=e.offsetHeight;t({width:l,height:c})});return r.observe(e,{box:"border-box"}),()=>r.unobserve(e)}function gt(e){const{getNodes:t,observeMutation:n=!0,callback:r}=e,o=[];let a=null;function l(){const c=t();a=c[0];const m=c.map((p,y)=>ct(p,k=>{r(k,y)}));o.push(...m)}if(l(),n){const c=mt(a,l);o.push(c)}return()=>{o.forEach(c=>{c==null||c()})}}function mt(e,t){var o;if(!e||!e.parentElement)return;const n=((o=e.ownerDocument)==null?void 0:o.defaultView)??window,r=new n.MutationObserver(()=>{t()});return r.observe(e.parentElement,{childList:!0}),()=>{r.disconnect()}}var ft=ve("slider").parts("root","label","thumb","valueText","track","range","control","markerGroup","marker"),I=ft.build();function ht(e){const t=e[0],n=e[e.length-1];return[t,n]}function pt(e){const[t,n]=ht(e.valuePercent);if(e.valuePercent.length===1){if(e.origin==="center"){const r=e.valuePercent[0]<50,o=r?`${e.valuePercent[0]}%`:"50%",a=r?"50%":`${100-e.valuePercent[0]}%`;return{start:o,end:a}}return{start:"0%",end:`${100-n}%`}}return{start:`${t}%`,end:`${100-n}%`}}function vt(e){return e.isVertical?{position:"absolute",bottom:"var(--slider-range-start)",top:"var(--slider-range-end)"}:{position:"absolute",[e.isRtl?"right":"left"]:"var(--slider-range-start)",[e.isRtl?"left":"right"]:"var(--slider-range-end)"}}function bt(e){const{height:t=0}=e.thumbSize??{},n=N([e.min,e.max],[-t/2,t/2]);return parseFloat(n(e.value).toFixed(2))}function yt(e){const{width:t=0}=e.thumbSize??{};if(e.isRtl){const r=N([e.max,e.min],[-t/2,t/2]);return-1*parseFloat(r(e.value).toFixed(2))}const n=N([e.min,e.max],[-t/2,t/2]);return parseFloat(n(e.value).toFixed(2))}function It(e,t){if(e.thumbAlignment==="center")return`${t}%`;const n=e.isVertical?bt(e):yt(e);return`calc(${t}% - ${n}px)`}function ae(e){let t=D(e.value,e.min,e.max)*100;return It(e,t)}function ie(e){let t="visible";return e.thumbAlignment==="contain"&&!e.hasMeasuredThumbSize&&(t="hidden"),t}function St(e,t){const n=e.isVertical?"bottom":"insetInlineStart";return{visibility:ie(e),position:"absolute",transform:"var(--slider-thumb-transform)",[n]:`var(--slider-thumb-offset-${t})`}}function Pt(){return{touchAction:"none",userSelect:"none",WebkitUserSelect:"none",position:"relative"}}function Tt(e){const t=pt(e);return{...e.value.reduce((r,o,a)=>{const l=ae({...e,value:o});return{...r,[`--slider-thumb-offset-${a}`]:l}},{}),"--slider-thumb-transform":e.isVertical?"translateY(50%)":e.isRtl?"translateX(50%)":"translateX(-50%)","--slider-range-start":t.start,"--slider-range-end":t.end}}function Et(e,t){return{visibility:ie(e),position:"absolute",pointerEvents:"none",[e.isHorizontal?"insetInlineStart":"bottom"]:ae({...e,value:t}),translate:"var(--tx) var(--ty)","--tx":e.isHorizontal?e.isRtl?"50%":"-50%":"0%","--ty":e.isHorizontal?"0%":"50%"}}function Rt(){return{userSelect:"none",WebkitUserSelect:"none",pointerEvents:"none",position:"relative"}}var Vt={getRootStyle:Tt,getControlStyle:Pt,getThumbStyle:St,getRangeStyle:vt,getMarkerStyle:Et,getMarkerGroupStyle:Rt},i=be({...Vt,getRootId:e=>{var t;return((t=e.ids)==null?void 0:t.root)??`slider:${e.id}`},getThumbId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.thumb)==null?void 0:r.call(n,t))??`slider:${e.id}:thumb:${t}`},getHiddenInputId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.hiddenInput)==null?void 0:r.call(n,t))??`slider:${e.id}:input:${t}`},getControlId:e=>{var t;return((t=e.ids)==null?void 0:t.control)??`slider:${e.id}:control`},getTrackId:e=>{var t;return((t=e.ids)==null?void 0:t.track)??`slider:${e.id}:track`},getRangeId:e=>{var t;return((t=e.ids)==null?void 0:t.range)??`slider:${e.id}:range`},getLabelId:e=>{var t;return((t=e.ids)==null?void 0:t.label)??`slider:${e.id}:label`},getValueTextId:e=>{var t;return((t=e.ids)==null?void 0:t.valueText)??`slider:${e.id}:value-text`},getMarkerId:(e,t)=>{var n,r;return((r=(n=e.ids)==null?void 0:n.marker)==null?void 0:r.call(n,t))??`slider:${e.id}:marker:${t}`},getRootEl:e=>i.getById(e,i.getRootId(e)),getThumbEl:(e,t)=>i.getById(e,i.getThumbId(e,t)),getHiddenInputEl:(e,t)=>i.getById(e,i.getHiddenInputId(e,t)),getControlEl:e=>i.getById(e,i.getControlId(e)),getElements:e=>ye(i.getControlEl(e),"[role=slider]"),getFirstEl:e=>i.getElements(e)[0],getRangeEl:e=>i.getById(e,i.getRangeId(e)),getValueFromPoint(e,t){const n=i.getControlEl(e);if(!n)return;const o=_e(t,n).getPercentValue({orientation:e.orientation,dir:e.dir,inverted:{y:!0}});return Y(o,e.min,e.max,e.step)},dispatchChangeEvent(e){Array.from(e.value).forEach((n,r)=>{const o=i.getHiddenInputEl(e,r);o&&We(o,{value:n})})}});function q(e,t){return t.map((n,r,o)=>F({...e,value:o},n,r))}function P(e,t){return Ve(e.value,e.min,e.max,e.minStepsBetweenThumbs)[t]}function F(e,t,n){const r=P(e,n),o=ke(t,e.min,e.max,e.step);return H(o,r.min,r.max)}function kt(e,t,n){const r=t??e.focusedIndex,o=P(e,r),a=Ce(r,{...o,step:n??e.step,values:e.value});return a[r]=H(a[r],o.min,o.max),a}function Ct(e,t,n){const r=t??e.focusedIndex,o=P(e,r),a=Ae(r,{...o,step:n??e.step,values:e.value});return a[r]=H(a[r],o.min,o.max),a}function At(e,t){return xe(e.value,t)}function xt(e,t){for(let n=0;n<t.length;n++){const r=t[n];e[n]=r}}function $t(e,t,n){const r=e.context["aria-label"],o=e.context["aria-labelledby"],a=e.context.value,l=e.matches("focus"),c=e.matches("dragging"),m=e.context.isDisabled,p=e.context.invalid,y=e.context.isInteractive,k=e.context.orientation==="horizontal",B=e.context.orientation==="vertical";function U(s){return D(s,e.context.min,e.context.max)}function j(s){return Y(s,e.context.min,e.context.max,e.context.step)}return{value:e.context.value,dragging:c,focused:l,setValue(s){t({type:"SET_VALUE",value:s})},getThumbValue(s){return a[s]},setThumbValue(s,u){t({type:"SET_VALUE",index:s,value:u})},getValuePercent:U,getPercentValue:j,getThumbPercent(s){return U(a[s])},setThumbPercent(s,u){const v=j(u);t({type:"SET_VALUE",index:s,value:v})},getThumbMin(s){return P(e.context,s).min},getThumbMax(s){return P(e.context,s).max},increment(s){t({type:"INCREMENT",index:s})},decrement(s){t({type:"DECREMENT",index:s})},focus(){y&&t({type:"FOCUS",index:0})},getLabelProps(){return n.label({...I.label.attrs,dir:e.context.dir,"data-disabled":d(m),"data-orientation":e.context.orientation,"data-invalid":d(p),"data-dragging":d(c),"data-focus":d(l),id:i.getLabelId(e.context),htmlFor:i.getHiddenInputId(e.context,0),onClick(s){var u;y&&(s.preventDefault(),(u=i.getFirstEl(e.context))==null||u.focus())},style:{userSelect:"none",WebkitUserSelect:"none"}})},getRootProps(){return n.element({...I.root.attrs,"data-disabled":d(m),"data-orientation":e.context.orientation,"data-dragging":d(c),"data-invalid":d(p),"data-focus":d(l),id:i.getRootId(e.context),dir:e.context.dir,style:i.getRootStyle(e.context)})},getValueTextProps(){return n.element({...I.valueText.attrs,dir:e.context.dir,"data-disabled":d(m),"data-orientation":e.context.orientation,"data-invalid":d(p),"data-focus":d(l),id:i.getValueTextId(e.context)})},getTrackProps(){return n.element({...I.track.attrs,dir:e.context.dir,id:i.getTrackId(e.context),"data-disabled":d(m),"data-invalid":d(p),"data-dragging":d(c),"data-orientation":e.context.orientation,"data-focus":d(l),style:{position:"relative"}})},getThumbProps(s){var W,L;const{index:u=0,name:v}=s,x=a[u],C=P(e.context,u),ue=(L=(W=e.context).getAriaValueText)==null?void 0:L.call(W,{value:x,index:u}),de=Array.isArray(r)?r[u]:r,ce=Array.isArray(o)?o[u]:o;return n.element({...I.thumb.attrs,dir:e.context.dir,"data-index":u,"data-name":v,id:i.getThumbId(e.context,u),"data-disabled":d(m),"data-orientation":e.context.orientation,"data-focus":d(l&&e.context.focusedIndex===u),"data-dragging":d(c&&e.context.focusedIndex===u),draggable:!1,"aria-disabled":Ie(m),"aria-label":de,"aria-labelledby":ce??i.getLabelId(e.context),"aria-orientation":e.context.orientation,"aria-valuemax":C.max,"aria-valuemin":C.min,"aria-valuenow":a[u],"aria-valuetext":ue,role:"slider",tabIndex:m?void 0:0,style:i.getThumbStyle(e.context,u),onPointerDown(S){y&&(t({type:"THUMB_POINTER_DOWN",index:u}),S.stopPropagation())},onBlur(){y&&t("BLUR")},onFocus(){y&&t({type:"FOCUS",index:u})},onKeyDown(S){if(S.defaultPrevented||!y)return;const V=ze(S)*e.context.step,ge={ArrowUp(){k||t({type:"ARROW_INC",step:V,src:"ArrowUp"})},ArrowDown(){k||t({type:"ARROW_DEC",step:V,src:"ArrowDown"})},ArrowLeft(){B||t({type:"ARROW_DEC",step:V,src:"ArrowLeft"})},ArrowRight(){B||t({type:"ARROW_INC",step:V,src:"ArrowRight"})},PageUp(){t({type:"ARROW_INC",step:V,src:"PageUp"})},PageDown(){t({type:"ARROW_DEC",step:V,src:"PageDown"})},Home(){t("HOME")},End(){t("END")}},me=De(S,e.context),G=ge[me];G&&(G(S),S.preventDefault(),S.stopPropagation())}})},getHiddenInputProps(s){const{index:u=0,name:v}=s;return n.input({name:v??(e.context.name?e.context.name+(e.context.value.length>1?"[]":""):void 0),form:e.context.form,type:"text",hidden:!0,defaultValue:e.context.value[u],id:i.getHiddenInputId(e.context,u)})},getRangeProps(){return n.element({id:i.getRangeId(e.context),...I.range.attrs,dir:e.context.dir,"data-dragging":d(c),"data-focus":d(l),"data-invalid":d(p),"data-disabled":d(m),"data-orientation":e.context.orientation,style:i.getRangeStyle(e.context)})},getControlProps(){return n.element({...I.control.attrs,dir:e.context.dir,id:i.getControlId(e.context),"data-dragging":d(c),"data-disabled":d(m),"data-orientation":e.context.orientation,"data-invalid":d(p),"data-focus":d(l),style:i.getControlStyle(),onPointerDown(s){if(!y||!He(s)||Be(s))return;const u=Ue(s);t({type:"POINTER_DOWN",point:u}),s.preventDefault(),s.stopPropagation()}})},getMarkerGroupProps(){return n.element({...I.markerGroup.attrs,role:"presentation",dir:e.context.dir,"aria-hidden":!0,"data-orientation":e.context.orientation,style:i.getMarkerGroupStyle()})},getMarkerProps(s){const u=i.getMarkerStyle(e.context,s.value);let v;const x=e.context.value[0],C=e.context.value[e.context.value.length-1];return s.value<x?v="under-value":s.value>C?v="over-value":v="at-value",n.element({...I.marker.attrs,id:i.getMarkerId(e.context,s.value),role:"presentation",dir:e.context.dir,"data-orientation":e.context.orientation,"data-value":s.value,"data-disabled":d(m),"data-state":v,style:u})}}}var wt=(e,t)=>(e==null?void 0:e.width)===(t==null?void 0:t.width)&&(e==null?void 0:e.height)===(t==null?void 0:t.height);function Nt(e){const t=Ne(e);return Se({id:"slider",initial:"idle",context:{thumbSize:null,thumbAlignment:"contain",min:0,max:100,step:1,value:[0],origin:"start",orientation:"horizontal",dir:"ltr",minStepsBetweenThumbs:0,disabled:!1,readOnly:!1,...t,focusedIndex:-1,fieldsetDisabled:!1},computed:{isHorizontal:n=>n.orientation==="horizontal",isVertical:n=>n.orientation==="vertical",isRtl:n=>n.orientation==="horizontal"&&n.dir==="rtl",isDisabled:n=>!!n.disabled||n.fieldsetDisabled,isInteractive:n=>!(n.readOnly||n.isDisabled),hasMeasuredThumbSize:n=>n.thumbSize!=null,valuePercent(n){return n.value.map(r=>100*D(r,n.min,n.max))}},watch:{value:["syncInputElements"]},entry:["coarseValue"],activities:["trackFormControlState","trackThumbsSize"],on:{SET_VALUE:[{guard:"hasIndex",actions:"setValueAtIndex"},{actions:"setValue"}],INCREMENT:{actions:"incrementThumbAtIndex"},DECREMENT:{actions:"decrementThumbAtIndex"}},states:{idle:{on:{POINTER_DOWN:{target:"dragging",actions:["setClosestThumbIndex","setPointerValue","focusActiveThumb"]},FOCUS:{target:"focus",actions:"setFocusedIndex"},THUMB_POINTER_DOWN:{target:"dragging",actions:["setFocusedIndex","focusActiveThumb"]}}},focus:{entry:"focusActiveThumb",on:{POINTER_DOWN:{target:"dragging",actions:["setClosestThumbIndex","setPointerValue","focusActiveThumb"]},THUMB_POINTER_DOWN:{target:"dragging",actions:["setFocusedIndex","focusActiveThumb"]},ARROW_DEC:{actions:["decrementThumbAtIndex","invokeOnChangeEnd"]},ARROW_INC:{actions:["incrementThumbAtIndex","invokeOnChangeEnd"]},HOME:{actions:["setFocusedThumbToMin","invokeOnChangeEnd"]},END:{actions:["setFocusedThumbToMax","invokeOnChangeEnd"]},BLUR:{target:"idle",actions:"clearFocusedIndex"}}},dragging:{entry:"focusActiveThumb",activities:"trackPointerMove",on:{POINTER_UP:{target:"focus",actions:"invokeOnChangeEnd"},POINTER_MOVE:{actions:"setPointerValue"}}}}},{guards:{hasIndex:(n,r)=>r.index!=null},activities:{trackFormControlState(n,r,{initialContext:o}){return Le(i.getRootEl(n),{onFieldsetDisabledChange(a){n.fieldsetDisabled=a},onFormReset(){h.value(n,o.value)}})},trackPointerMove(n,r,{send:o}){return je(i.getDoc(n),{onPointerMove(a){o({type:"POINTER_MOVE",point:a.point})},onPointerUp(){o("POINTER_UP")}})},trackThumbsSize(n){if(!(n.thumbAlignment!=="contain"||n.thumbSize))return gt({getNodes:()=>i.getElements(n),observeMutation:!0,callback(r){!r||wt(n.thumbSize,r)||(n.thumbSize=r)}})}},actions:{syncInputElements(n){n.value.forEach((r,o)=>{const a=i.getHiddenInputEl(n,o);i.setValue(a,r)})},invokeOnChangeEnd(n){A.valueChangeEnd(n)},setClosestThumbIndex(n,r){const o=i.getValueFromPoint(n,r.point);if(o==null)return;const a=At(n,o);h.focusedIndex(n,a)},setFocusedIndex(n,r){h.focusedIndex(n,r.index)},clearFocusedIndex(n){h.focusedIndex(n,-1)},setPointerValue(n,r){const o=i.getValueFromPoint(n,r.point);if(o==null)return;const a=F(n,o,n.focusedIndex);h.valueAtIndex(n,n.focusedIndex,a)},focusActiveThumb(n){Pe(()=>{const r=i.getThumbEl(n,n.focusedIndex);r==null||r.focus({preventScroll:!0})})},decrementThumbAtIndex(n,r){const o=kt(n,r.index,r.step);h.value(n,o)},incrementThumbAtIndex(n,r){const o=Ct(n,r.index,r.step);h.value(n,o)},setFocusedThumbToMin(n){const{min:r}=P(n,n.focusedIndex);h.valueAtIndex(n,n.focusedIndex,r)},setFocusedThumbToMax(n){const{max:r}=P(n,n.focusedIndex);h.valueAtIndex(n,n.focusedIndex,r)},coarseValue(n){const r=q(n,n.value);h.value(n,r)},setValueAtIndex(n,r){const o=F(n,r.value,r.index);h.valueAtIndex(n,r.index,o)},setValue(n,r){const o=q(n,r.value);h.value(n,o)}}})}var A={valueChange(e){var t;(t=e.onValueChange)==null||t.call(e,{value:Array.from(e.value)}),i.dispatchChangeEvent(e)},valueChangeEnd(e){var t;(t=e.onValueChangeEnd)==null||t.call(e,{value:Array.from(e.value)})},focusChange(e){var t;(t=e.onFocusChange)==null||t.call(e,{value:Array.from(e.value),focusedIndex:e.focusedIndex})}},h={valueAtIndex:(e,t,n)=>{$(e.value[t],n)||(e.value[t]=n,A.valueChange(e))},value:(e,t)=>{$(e.value,t)||(xt(e.value,t),A.valueChange(e))},focusedIndex:(e,t)=>{$(e.focusedIndex,t)||(e.focusedIndex=t,A.focusChange(e))}};K()(["aria-label","aria-labelledby","dir","disabled","form","getAriaValueText","getRootNode","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]);K()(["index","name"]);const Mt=e=>{const{getRootNode:t}=Me(),{dir:n}=Oe(),r={id:b.useId(),dir:n,getRootNode:t,value:e.defaultValue,...e},o={...r,value:e.value,onValueChange:w(e.onValueChange,{sync:!0}),onValueChangeEnd:w(e.onValueChangeEnd),onFocusChange:w(e.onFocusChange)},[a,l]=Te(Nt(r),{context:o});return $t(a,l,Ee)},se=b.forwardRef((e,t)=>{const[n,r]=z()(e,["aria-label","aria-labelledby","defaultValue","disabled","form","getAriaValueText","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]),o=Mt(n),a=T(o.getRootProps(),r);return g.jsx(lt,{value:o,children:g.jsx(E.div,{...a,ref:t})})});se.displayName="SliderRoot";const _=b.forwardRef((e,t)=>{const[n,r]=z()(e,["index","name"]),o=R(),a=T(o.getThumbProps(n),r);return g.jsx(ut,{value:n,children:g.jsx(E.div,{...a,ref:t})})});_.displayName="SliderThumb";const le=b.forwardRef((e,t)=>{const n=R(),r=T(n.getTrackProps(),e);return g.jsx(E.div,{...r,ref:t})});le.displayName="SliderTrack";const Ot=he({className:"slider",slots:Q.keys(),base:{root:{display:"flex",flexDirection:"column",gap:"1",width:"full"},control:{position:"relative",display:"flex",alignItems:"center"},track:{backgroundColor:"neutral.200",borderRadius:"full",overflow:"hidden",flex:"1"},range:{background:"primary"},thumb:{background:"white",borderColor:"primary",borderRadius:"full",borderWidth:"2px",boxShadow:"md",outline:"none",zIndex:"1"},markerGroup:{mt:"-1"},marker:{color:"currentColor",_before:{background:"white",borderRadius:"full",content:"''",display:"block",left:"50%",position:"relative",transform:"translateX(-50%)"}}},defaultVariants:{size:"md"},variants:{size:{sm:{control:{height:"4"},range:{height:"1.5"},track:{height:"1.5"},thumb:{height:"4",width:"4"},marker:{_before:{height:"1",top:"-2.5",width:"2px"},textStyle:"sm"}},md:{control:{height:"5"},range:{height:"2"},track:{height:"2"},thumb:{height:"5",width:"5"},marker:{_before:{height:"1",top:"-3",width:"2px"},textStyle:"sm"}},lg:{control:{height:"6"},range:{height:"2.5"},track:{height:"2.5"},thumb:{height:"6",width:"6"},marker:{_before:{height:"1.5",top:"-15px",width:"2px"},textStyle:"md"}}}}}),Ft=b.forwardRef(({size:e,multiple:t=!1,markers:n=[],className:r,...o},a)=>{const l=Ot({size:e});return g.jsxs(se,{ref:a,className:fe(l.root,r),...o,children:[g.jsxs(te,{className:l.control,children:[g.jsx(le,{className:l.track,children:g.jsx(oe,{className:l.range})}),g.jsx(_,{index:0,className:l.thumb,children:g.jsx(O,{})}),t&&g.jsx(_,{index:1,className:l.thumb,children:g.jsx(O,{})})]}),n.length>0&&g.jsx(re,{className:l.markerGroup,children:n.map(({value:c,marker:m})=>g.jsx(ne,{value:c,className:l.marker,children:m}))})]})});Ft.__docgenInfo={description:"",methods:[],displayName:"Root",props:{multiple:{defaultValue:{value:"false",computed:!1},required:!1},markers:{defaultValue:{value:"[]",computed:!1},required:!1}}};export{Ft as R};
