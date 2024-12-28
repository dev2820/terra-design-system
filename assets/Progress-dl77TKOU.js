import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{t as L,I as M,c as S}from"./tv-CIwtzMts.js";import{r as c}from"./index-CDs2tPxN.js";import{c as A,m as u,h as g,a as z,b as U,e as D,f as F,A as H,E as _}from"./factory-BCO0_PXk.js";import{c as O}from"./create-split-props-u5h9OPvL.js";import{c as W,k as y}from"./index-6Viw2UEs.js";import{u as q,a as B}from"./use-locale-context-CTaGYWMe.js";const[G,m]=A({name:"ProgressContext",hookName:"useProgressContext",providerName:"<ProgressProvider />"}),N=c.forwardRef((e,t)=>{const r=m(),s=u(r.getCircleProps(),e);return a.jsx(g.svg,{ref:t,...s})});N.displayName="ProgressCircle";const b=c.forwardRef((e,t)=>{const r=m(),s=u(r.getCircleRangeProps(),e);return a.jsx(g.circle,{ref:t,...s})});b.displayName="ProgressCircleRange";const w=c.forwardRef((e,t)=>{const r=m(),s=u(r.getCircleTrackProps(),e);return a.jsx(g.circle,{ref:t,...s})});w.displayName="ProgressCircleTrack";const C=c.forwardRef((e,t)=>{const r=m(),s=u(r.getLabelProps(),e);return a.jsx(g.label,{...s,ref:t})});C.displayName="ProgressLabel";const j=c.forwardRef((e,t)=>{const r=m(),s=u(r.getRangeProps(),e);return a.jsx(g.div,{...s,ref:t})});j.displayName="ProgressRange";var J=z("progress").parts("root","label","track","range","valueText","view","circle","circleTrack","circleRange"),i=J.build(),f=U({getRootId:e=>{var t;return((t=e.ids)==null?void 0:t.root)??`progress-${e.id}`},getTrackId:e=>{var t;return((t=e.ids)==null?void 0:t.track)??`progress-${e.id}-track`},getLabelId:e=>{var t;return((t=e.ids)==null?void 0:t.label)??`progress-${e.id}-label`},getCircleId:e=>{var t;return((t=e.ids)==null?void 0:t.circle)??`progress-${e.id}-circle`}});function K(e,t,r){const s=e.context.percent,l=e.context.isIndeterminate?"":`${s}%`,o=e.context.max,d=e.context.min,n=e.context.orientation,$=e.context.translations,P=e.context.isIndeterminate,p=e.context.value,R=$.value({value:p,max:o,percent:s,min:d}),v=Q(p,o),T={role:"progressbar","aria-label":R,"data-max":o,"aria-valuemin":d,"aria-valuemax":o,"aria-valuenow":p??void 0,"data-orientation":n,"data-state":v},h=X(e.context);return{value:p,valueAsString:R,min:d,max:o,percent:s,percentAsString:l,indeterminate:P,setValue(x){t({type:"VALUE.SET",value:x})},setToMax(){t({type:"VALUE.SET",value:o})},setToMin(){t({type:"VALUE.SET",value:d})},getRootProps(){return r.element({dir:e.context.dir,...i.root.attrs,id:f.getRootId(e.context),"data-max":o,"data-value":p??void 0,"data-state":v,"data-orientation":n,style:{"--percent":P?void 0:s}})},getLabelProps(){return r.element({dir:e.context.dir,id:f.getLabelId(e.context),...i.label.attrs,"data-orientation":n})},getValueTextProps(){return r.element({dir:e.context.dir,"aria-live":"polite",...i.valueText.attrs})},getTrackProps(){return r.element({dir:e.context.dir,id:f.getTrackId(e.context),...i.track.attrs,...T})},getRangeProps(){return r.element({dir:e.context.dir,...i.range.attrs,"data-orientation":n,"data-state":v,style:{[e.context.isHorizontal?"width":"height"]:P?void 0:`${s}%`}})},getCircleProps(){return r.element({dir:e.context.dir,id:f.getCircleId(e.context),...i.circle.attrs,...T,...h.root})},getCircleTrackProps(){return r.element({dir:e.context.dir,"data-orientation":n,...i.circleTrack.attrs,...h.track})},getCircleRangeProps(){return r.element({dir:e.context.dir,...i.circleRange.attrs,...h.range,"data-state":v})},getViewProps(x){return r.element({dir:e.context.dir,...i.view.attrs,"data-state":x.state,hidden:x.state!==v})}}}function Q(e,t){return e==null?"indeterminate":e===t?"complete":"loading"}function X(e){const t={style:{"--radius":"calc(var(--size) / 2 - var(--thickness) / 2)",cx:"calc(var(--size) / 2)",cy:"calc(var(--size) / 2)",r:"var(--radius)",fill:"transparent",strokeWidth:"var(--thickness)"}};return{root:{style:{width:"var(--size)",height:"var(--size)"}},track:t,range:{opacity:e.value===0?0:void 0,style:{...t.style,"--percent":e.percent,"--circumference":"calc(2 * 3.14159 * var(--radius))","--offset":"calc(var(--circumference) * (100 - var(--percent)) / 100)",strokeDashoffset:"calc(var(--circumference) * ((100 - var(--percent)) / 100))",strokeDasharray:e.isIndeterminate?void 0:"var(--circumference)",transformOrigin:"center",transform:"rotate(-90deg)"}}}}function Y(e,t){return e+(t-e)/2}function Z(e){const t=W(e);return D({id:"progress",initial:"idle",context:{max:t.max??100,min:t.min??0,value:Y(t.min??0,t.max??100),orientation:"horizontal",translations:{value:({percent:r})=>r===-1?"loading...":`${r} percent`,...t.translations},...t},created:["validateContext"],computed:{isIndeterminate:r=>r.value===null,percent(r){return y(r.value)?Math.round((r.value-r.min)/(r.max-r.min)*100):-1},isAtMax:r=>r.value===r.max,isHorizontal:r=>r.orientation==="horizontal",isRtl:r=>r.dir==="rtl"},states:{idle:{on:{"VALUE.SET":{actions:["setValue"]}}}}},{actions:{setValue:(r,s)=>{r.value=s.value===null?null:Math.max(0,Math.min(s.value,r.max))},validateContext:r=>{if(r.value!=null){if(!k(r.max))throw new Error(`[progress] The max value passed \`${r.max}\` is not a valid number`);if(!ee(r.value,r.max))throw new Error(`[progress] The value passed \`${r.value}\` exceeds the max value \`${r.max}\``);if(!re(r.value,r.min))throw new Error(`[progress] The value passed \`${r.value}\` exceeds the min value \`${r.min}\``)}}}})}function k(e){return y(e)&&!isNaN(e)}function ee(e,t){return k(e)&&e<=t}function re(e,t){return k(e)&&e>=t}F()(["dir","getRootNode","id","ids","max","min","orientation","translations","value"]);const te=e=>{const{getRootNode:t}=q(),{dir:r}=B(),s={id:c.useId(),dir:r,getRootNode:t,...e},l={...s,value:e.value},[o,d]=H(Z(s),{context:l});return K(o,d,_)},I=c.forwardRef((e,t)=>{const[r,s]=O()(e,["id","ids","max","min","orientation","translations","value"]),l=te(r),o=u(l.getRootProps(),s);return a.jsx(G,{value:l,children:a.jsx(g.div,{...o,ref:t})})});I.displayName="ProgressRoot";const E=c.forwardRef((e,t)=>{const r=m(),s=u(r.getTrackProps(),e);return a.jsx(g.div,{...s,ref:t})});E.displayName="ProgressTrack";const se=L({base:`${M.scope} progress`,slots:{root:"trds-flex trds-items-center trds-flex-col trds-gap-1.5 trds-w-full",label:"trds-font-medium trds-text-sm",track:"trds-bg-track trds-rounded-full trds-overflow-hidden trds-w-full",range:"trds-bg-primary trds-h-full trds-transition-[width] trds-duration-[0.2s] trds-ease-in-out [--translate-x:-100%]",circle:"",circleTrack:"trds-stroke-track",circleRange:"trds-stroke-primary trds-transition-[stroke-dasharray,stroke] trds-duration-[0.6s]",valueText:"trds-text-sm"},variants:{size:{sm:{track:"trds-h-1.5",circle:"[--size:36px] [--thickness:4px]"},md:{track:"trds-h-2",circle:"[--size:40px] [--thickness:4px]"},lg:{track:"trds-h-2.5",circle:"[--size:44px] [--thickness:4px]"}}},defaultVariants:{size:"md"}}),V=c.forwardRef(function(e,t){const{size:r,children:s,className:l,variant:o="linear",...d}=e,n=se({size:r});return a.jsxs(I,{ref:t,className:S(n.root(),l),...d,children:[s&&a.jsx(C,{className:n.label(),children:s}),o==="linear"&&a.jsx(a.Fragment,{children:a.jsx(E,{className:n.track(),children:a.jsx(j,{className:n.range()})})}),o==="circular"&&a.jsxs(N,{className:n.circle(),children:[a.jsx(w,{className:n.circleTrack()}),a.jsx(b,{className:n.circleRange()})]})]})});V.displayName="Progress";V.__docgenInfo={description:"",methods:[],displayName:"Progress"};export{V as R};
