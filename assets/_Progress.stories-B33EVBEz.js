import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{c as J,a as N}from"./cva-C095pwBQ.js";import{r as p}from"./index-CDs2tPxN.js";import{s as K}from"./sva-CxSEfBjn.js";import{e as Q,f as X,z as Y,m as g,h as m,k as Z,l as ee,p as re,q as se,F as _,s as ae,w as te,v as oe,x as ne,y as ie,j as ce}from"./use-locale-context-DELJ90JS.js";import{c as le}from"./index-DJ3ti8gJ.js";import"./index-B-yFm4aN.js";var F=Q("progress").parts("root","label","track","range","valueText","view","circle","circleTrack","circleRange");F.build();X({getRootId:e=>{var r;return((r=e.ids)==null?void 0:r.root)??`progress-${e.id}`},getTrackId:e=>{var r;return((r=e.ids)==null?void 0:r.track)??`progress-${e.id}-track`},getLabelId:e=>{var r;return((r=e.ids)==null?void 0:r.label)??`progress-${e.id}-label`},getCircleId:e=>{var r;return((r=e.ids)==null?void 0:r.circle)??`progress-${e.id}-circle`}});le()(["dir","getRootNode","id","ids","max","min","orientation","translations","value"]);const[de,u]=Y({name:"ProgressContext",hookName:"useProgressContext",providerName:"<ProgressProvider />"}),U=e=>{const r=u(),s=g(r.getCircleProps(),e);return a.jsx(m.svg,{...s})};U.displayName="ProgressCircle";const H=e=>{const r=u(),s=g(r.getCircleRangeProps(),e);return a.jsx(m.circle,{...s})};H.displayName="ProgressCircleRange";const O=e=>{const r=u(),s=g(r.getCircleTrackProps(),e);return a.jsx(m.circle,{...s})};O.displayName="ProgressCircleTrack";const W=p.forwardRef((e,r)=>{const s=u(),t=g(s.getLabelProps(),e);return a.jsx(m.label,{...t,ref:r})});W.displayName="ProgressLabel";const q=p.forwardRef((e,r)=>{const s=u(),t=g(s.getRangeProps(),e);return a.jsx(m.div,{...t,ref:r})});q.displayName="ProgressRange";var ge=Z("progress").parts("root","label","track","range","valueText","view","circle","circleTrack","circleRange"),d=ge.build(),f=ee({getRootId:e=>{var r;return((r=e.ids)==null?void 0:r.root)??`progress-${e.id}`},getTrackId:e=>{var r;return((r=e.ids)==null?void 0:r.track)??`progress-${e.id}-track`},getLabelId:e=>{var r;return((r=e.ids)==null?void 0:r.label)??`progress-${e.id}-label`},getCircleId:e=>{var r;return((r=e.ids)==null?void 0:r.circle)??`progress-${e.id}-circle`}});function me(e,r,s){const t=e.context.percent,o=e.context.max,i=e.context.min,c=e.context.orientation,l=e.context.translations,j=e.context.isIndeterminate,v=e.context.value,T=l.value({value:v,max:o,percent:t,min:i}),x=pe(v,o),z={role:"progressbar","aria-label":T,"data-max":o,"aria-valuemin":i,"aria-valuemax":o,"aria-valuenow":v??void 0,"data-orientation":c,"data-state":x},b=ue(e.context);return{value:v,valueAsString:T,setValue(P){r({type:"VALUE.SET",value:P})},setToMax(){r({type:"VALUE.SET",value:o})},getRootProps(){return s.element({dir:e.context.dir,...d.root.attrs,id:f.getRootId(e.context),"data-max":o,"data-value":v??void 0,"data-state":x,"data-orientation":c,style:{"--percent":j?void 0:t}})},getLabelProps(){return s.element({dir:e.context.dir,id:f.getLabelId(e.context),...d.label.attrs,"data-orientation":c})},getValueTextProps(){return s.element({dir:e.context.dir,"aria-live":"polite",...d.valueText.attrs})},getTrackProps(){return s.element({dir:e.context.dir,id:f.getTrackId(e.context),...d.track.attrs,...z})},getRangeProps(){return s.element({dir:e.context.dir,...d.range.attrs,"data-orientation":c,"data-state":x,style:{[e.context.isHorizontal?"width":"height"]:j?void 0:`${t}%`}})},getCircleProps(){return s.element({dir:e.context.dir,id:f.getCircleId(e.context),...d.circle.attrs,...z,...b.root})},getCircleTrackProps(){return s.element({dir:e.context.dir,"data-orientation":c,...d.circleTrack.attrs,...b.track})},getCircleRangeProps(){return s.element({dir:e.context.dir,...d.circleRange.attrs,...b.range,"data-state":x})},getViewProps(P){return s.element({dir:e.context.dir,...d.view.attrs,"data-state":P.state,hidden:P.state!==x})}}}function pe(e,r){return e==null?"indeterminate":e===r?"complete":"loading"}function ue(e){const r={style:{"--radius":"calc(var(--size) / 2 - var(--thickness) / 2)",cx:"calc(var(--size) / 2)",cy:"calc(var(--size) / 2)",r:"var(--radius)",fill:"transparent",strokeWidth:"var(--thickness)"}};return{root:{viewBox:"0 0 var(--size) var(--size)",style:{width:"var(--size)",height:"var(--size)"}},track:r,range:{opacity:e.value===0?0:void 0,style:{...r.style,"--percent":e.percent,"--circumference":"calc(2 * 3.14159 * var(--radius))","--offset":"calc(var(--circumference) * (100 - var(--percent)) / 100}))",strokeDashoffset:"calc(var(--circumference) * ((100 - var(--percent)) / 100))",strokeDasharray:e.isIndeterminate?void 0:"var(--circumference)",transformOrigin:"center",transform:"rotate(-90deg)"}}}}function ve(e,r){return e+(r-e)/2}function xe(e){const r=re(e);return se({id:"progress",initial:"idle",context:{max:r.max??100,min:r.min??0,value:ve(r.min??0,r.max??100),orientation:"horizontal",translations:{value:({percent:s})=>s===-1?"loading...":`${s} percent`,...r.translations},...r},created:["validateContext"],computed:{isIndeterminate:s=>s.value===null,percent(s){return _(s.value)?Math.round((s.value-s.min)/(s.max-s.min)*100):-1},isAtMax:s=>s.value===s.max,isHorizontal:s=>s.orientation==="horizontal",isRtl:s=>s.dir==="rtl"},states:{idle:{on:{"VALUE.SET":{actions:["setValue"]}}}}},{actions:{setValue:(s,t)=>{s.value=t.value===null?null:Math.max(0,Math.min(t.value,s.max))},validateContext:s=>{if(s.value!=null){if(!R(s.max))throw new Error(`[progress] The max value passed \`${s.max}\` is not a valid number`);if(!Pe(s.value,s.max))throw new Error(`[progress] The value passed \`${s.value}\` exceeds the max value \`${s.max}\``);if(!fe(s.value,s.min))throw new Error(`[progress] The value passed \`${s.value}\` exceeds the min value \`${s.min}\``)}}}})}function R(e){return _(e)&&!isNaN(e)}function Pe(e,r){return R(e)&&e<=r}function fe(e,r){return R(e)&&e>=r}ae()(["dir","getRootNode","id","ids","max","min","orientation","translations","value"]);const he=e=>{const{getRootNode:r}=te(),{dir:s}=oe(),t={id:p.useId(),dir:s,getRootNode:r,...e},o={...t,value:e.value},[i,c]=ne(xe(t),{context:o});return me(i,c,ie)},B=p.forwardRef((e,r)=>{const[s,t]=ce()(e,["id","ids","max","min","orientation","translations","value"]),o=he(s),i=g(o.getRootProps(),t);return a.jsx(de,{value:o,children:a.jsx(m.div,{...i,ref:r})})});B.displayName="ProgressRoot";const G=p.forwardRef((e,r)=>{const s=u(),t=g(s.getTrackProps(),e);return a.jsx(m.div,{...t,ref:r})});G.displayName="ProgressTrack";const ke=K({className:"progress",slots:F.keys(),base:{root:{alignItems:"center",display:"flex",flexDirection:"column",gap:"1.5",width:"full"},label:{fontWeight:"medium",textStyle:"sm"},track:{backgroundColor:"neutral.300",borderRadius:"full",overflow:"hidden",width:"full"},range:{backgroundColor:"primary",height:"full",transition:"width 0.2s ease-in-out","--translate-x":"-100%"},circleTrack:{stroke:"neutral.300"},circleRange:{stroke:"primary",transitionProperty:"stroke-dasharray, stroke",transitionDuration:"0.6s"},valueText:{textStyle:"sm"}},variants:{size:{sm:{track:{height:"1.5"},circle:{"--size":"36px","--thickness":"4px"}},md:{track:{height:"2"},circle:{"--size":"40px","--thickness":"4px"}},lg:{track:{height:"2.5"},circle:{"--size":"44px","--thickness":"4px"}}}},defaultVariants:{size:"md"}}),n=p.forwardRef(function(e,r){const{size:s,children:t,className:o,variant:i="linear",...c}=e,l=ke({size:s});return a.jsxs(B,{ref:r,className:J(l.root,o),...c,children:[t&&a.jsx(W,{className:l.label,children:t}),i==="linear"&&a.jsx(a.Fragment,{children:a.jsx(G,{className:l.track,children:a.jsx(q,{className:l.range})})}),i==="circular"&&a.jsxs(U,{className:l.circle,children:[a.jsx(O,{className:l.circleTrack}),a.jsx(H,{className:l.circleRange})]})]})});n.displayName="Progress";n.__docgenInfo={description:"",methods:[],displayName:"Progress"};const C=["sm","md","lg","icon"],w=["linear","circular"],ze={title:"Components/Progress",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:C,control:{type:"select"}},variant:{options:w,control:{type:"select"}}},args:{size:C[1],variant:w[0],disabled:!1,loading:!1}},h={args:{},render:e=>a.jsx(n,{...e,className:N({w:400})})},k={args:{},render:()=>a.jsx("div",{className:N({width:400,display:"flex",flexDir:"column",gap:4}),children:w.map(e=>a.jsx(n,{variant:e},e))})},y={args:{},render:()=>a.jsxs(a.Fragment,{children:[a.jsxs("div",{className:N({width:400,display:"flex",flexDir:"column",gap:4,mb:4}),children:[a.jsx(n,{size:"sm"}),a.jsx(n,{size:"md"}),a.jsx(n,{size:"lg"})]}),a.jsxs("div",{className:N({display:"flex",flexDir:"row",gap:4}),children:[a.jsx(n,{size:"sm",variant:"circular"}),a.jsx(n,{size:"md",variant:"circular"}),a.jsx(n,{size:"lg",variant:"circular"})]})]})};var $,I,S;h.parameters={...h.parameters,docs:{...($=h.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {},
  render: (props: ProgressProps) => {
    return <Progress {...props} className={css({
      w: 400
    })} />;
  }
}`,...(S=(I=h.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var V,E,D;k.parameters={...k.parameters,docs:{...(V=k.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      width: 400,
      display: 'flex',
      flexDir: 'column',
      gap: 4
    })}>
        {variants.map(variant => <Progress variant={variant} key={variant}></Progress>)}
      </div>;
  }
}`,...(D=(E=k.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var L,M,A;y.parameters={...y.parameters,docs:{...(L=y.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className={css({
        width: 400,
        display: 'flex',
        flexDir: 'column',
        gap: 4,
        mb: 4
      })}>
          <Progress size="sm"></Progress>
          <Progress size="md"></Progress>
          <Progress size="lg"></Progress>
        </div>
        <div className={css({
        display: 'flex',
        flexDir: 'row',
        gap: 4
      })}>
          <Progress size="sm" variant="circular"></Progress>
          <Progress size="md" variant="circular"></Progress>
          <Progress size="lg" variant="circular"></Progress>
        </div>
      </>;
  }
}`,...(A=(M=y.parameters)==null?void 0:M.docs)==null?void 0:A.source}}};const Ce=["Default","Variant","Sizes"];export{h as Default,y as Sizes,k as Variant,Ce as __namedExportsOrder,ze as default};
