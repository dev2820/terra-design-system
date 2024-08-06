import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{c as C,a as u}from"./cva-C095pwBQ.js";import{B as N}from"./Button-BVDRYxdW.js";import{I as w}from"./IconButton-E43GEZXc.js";import{r as c}from"./index-CDs2tPxN.js";import{s as te}from"./sva-CxSEfBjn.js";import{c as re}from"./create-react-context-Dw26gLIP.js";import{k as ne,c as se,m as P,l as h,p as ie,q as ae,R as pe,s as le,t as ce,S as de,n as ge,r as O,u as ue,H as x,x as me,y as ve}from"./create-split-props-aocGlKWx.js";import{c as Pe,z as he,d as fe,u as Ce,e as Te}from"./use-locale-context-B_Gjrn4q.js";import{c as Ie}from"./index-DJ3ti8gJ.js";import{P as Ee}from"./portal-D9Tpc7Ci.js";import{a as b,t as ye,s as Oe,u as Ne,P as we}from"./index-BiiAj-OS.js";import{g as be,a as D}from"./index-BsMcsNuy.js";import{a as je}from"./index-DimjarXC.js";import{p as xe,c as De}from"./index-B7ySdDkw.js";import{u as Fe}from"./use-event-eGuf5zsd.js";import{X as j}from"./x-BG8jWvjC.js";import"./createLucideIcon-zijr-BYg.js";import"./index-B-yFm4aN.js";import"./index-CUeq2rMp.js";var G=ne("popover").parts("arrow","arrowTip","anchor","trigger","indicator","positioner","content","title","description","closeTrigger");G.build();var g=Pe({getAnchorId:e=>{var t;return((t=e.ids)==null?void 0:t.anchor)??`popover:${e.id}:anchor`},getTriggerId:e=>{var t;return((t=e.ids)==null?void 0:t.trigger)??`popover:${e.id}:trigger`},getContentId:e=>{var t;return((t=e.ids)==null?void 0:t.content)??`popover:${e.id}:content`},getPositionerId:e=>{var t;return((t=e.ids)==null?void 0:t.positioner)??`popover:${e.id}:popper`},getArrowId:e=>{var t;return((t=e.ids)==null?void 0:t.arrow)??`popover:${e.id}:arrow`},getTitleId:e=>{var t;return((t=e.ids)==null?void 0:t.title)??`popover:${e.id}:title`},getDescriptionId:e=>{var t;return((t=e.ids)==null?void 0:t.description)??`popover:${e.id}:desc`},getCloseTriggerId:e=>{var t;return((t=e.ids)==null?void 0:t.closeTrigger)??`popover:${e.id}:close`},getAnchorEl:e=>g.getById(e,g.getAnchorId(e)),getTriggerEl:e=>g.getById(e,g.getTriggerId(e)),getContentEl:e=>g.getById(e,g.getContentId(e)),getPositionerEl:e=>g.getById(e,g.getPositionerId(e)),getTitleEl:e=>g.getById(e,g.getTitleId(e)),getDescriptionEl:e=>g.getById(e,g.getDescriptionId(e)),getFocusableEls:e=>he(g.getContentEl(e)),getFirstFocusableEl:e=>g.getFocusableEls(e)[0]});Ie()(["autoFocus","closeOnEscape","closeOnInteractOutside","dir","getRootNode","id","ids","initialFocusEl","modal","onEscapeKeyDown","onFocusOutside","onInteractOutside","onOpenChange","onPointerDownOutside","open.controlled","open","persistentElements","portalled","positioning"]);const[Re,f]=se({name:"PopoverContext",hookName:"usePopoverContext",providerName:"<PopoverProvider />"}),z=c.forwardRef((e,t)=>{const o=f(),r=P(o.getArrowProps(),e);return n.jsx(h.div,{...r,ref:t})});z.displayName="PopoverArrow";const W=c.forwardRef((e,t)=>{const o=f(),r=P(o.getArrowTipProps(),e);return n.jsx(h.div,{...r,ref:t})});W.displayName="PopoverArrowTip";const K=c.forwardRef((e,t)=>{const o=f(),r=P(o.getCloseTriggerProps(),e);return n.jsx(h.button,{...r,ref:t})});K.displayName="PopoverCloseTrigger";const V=c.forwardRef((e,t)=>{const o=f(),r=b(),i=P(o.getContentProps(),r.getPresenceProps(t),e);return r.unmounted?null:n.jsx(h.div,{...i})});V.displayName="PopoverContent";const X=c.forwardRef((e,t)=>{const o=f(),r=P(o.getDescriptionProps(),e);return n.jsx(h.div,{...r,ref:t})});X.displayName="PopoverDescription";const H=c.forwardRef((e,t)=>{const o=f(),r=b(),i=P(o.getPositionerProps(),e);return r.unmounted?null:n.jsx(h.div,{...i,ref:t})});H.displayName="PopoverPositioner";var Be=ie("popover").parts("arrow","arrowTip","anchor","trigger","indicator","positioner","content","title","description","closeTrigger"),v=Be.build(),s=ae({getAnchorId:e=>{var t;return((t=e.ids)==null?void 0:t.anchor)??`popover:${e.id}:anchor`},getTriggerId:e=>{var t;return((t=e.ids)==null?void 0:t.trigger)??`popover:${e.id}:trigger`},getContentId:e=>{var t;return((t=e.ids)==null?void 0:t.content)??`popover:${e.id}:content`},getPositionerId:e=>{var t;return((t=e.ids)==null?void 0:t.positioner)??`popover:${e.id}:popper`},getArrowId:e=>{var t;return((t=e.ids)==null?void 0:t.arrow)??`popover:${e.id}:arrow`},getTitleId:e=>{var t;return((t=e.ids)==null?void 0:t.title)??`popover:${e.id}:title`},getDescriptionId:e=>{var t;return((t=e.ids)==null?void 0:t.description)??`popover:${e.id}:desc`},getCloseTriggerId:e=>{var t;return((t=e.ids)==null?void 0:t.closeTrigger)??`popover:${e.id}:close`},getAnchorEl:e=>s.getById(e,s.getAnchorId(e)),getTriggerEl:e=>s.getById(e,s.getTriggerId(e)),getContentEl:e=>s.getById(e,s.getContentId(e)),getPositionerEl:e=>s.getById(e,s.getPositionerId(e)),getTitleEl:e=>s.getById(e,s.getTitleId(e)),getDescriptionEl:e=>s.getById(e,s.getDescriptionId(e)),getFocusableEls:e=>pe(s.getContentEl(e)),getFirstFocusableEl:e=>s.getFocusableEls(e)[0]});function Le(e,t,o){const r=e.matches("open"),i=e.context.currentPlacement,a=e.context.currentPortalled,m=e.context.renderedElements,d=be({...e.context.positioning,placement:i});return{portalled:a,open:r,setOpen(l){l!==r&&t(l?"OPEN":"CLOSE")},reposition(l={}){t({type:"POSITIONING.SET",options:l})},getArrowProps(){return o.element({id:s.getArrowId(e.context),...v.arrow.attrs,dir:e.context.dir,style:d.arrow})},getArrowTipProps(){return o.element({...v.arrowTip.attrs,dir:e.context.dir,style:d.arrowTip})},getAnchorProps(){return o.element({...v.anchor.attrs,dir:e.context.dir,id:s.getAnchorId(e.context)})},getTriggerProps(){return o.button({...v.trigger.attrs,dir:e.context.dir,type:"button","data-placement":i,id:s.getTriggerId(e.context),"aria-haspopup":"dialog","aria-expanded":r,"data-state":r?"open":"closed","aria-controls":s.getContentId(e.context),onClick(l){l.defaultPrevented||t("TOGGLE")},onBlur(l){t({type:"TRIGGER_BLUR",target:l.relatedTarget})}})},getIndicatorProps(){return o.element({...v.indicator.attrs,dir:e.context.dir,"data-state":r?"open":"closed"})},getPositionerProps(){return o.element({id:s.getPositionerId(e.context),...v.positioner.attrs,dir:e.context.dir,style:d.floating})},getContentProps(){return o.element({...v.content.attrs,dir:e.context.dir,id:s.getContentId(e.context),tabIndex:-1,role:"dialog",hidden:!r,"data-state":r?"open":"closed","data-expanded":le(r),"aria-labelledby":m.title?s.getTitleId(e.context):void 0,"aria-describedby":m.description?s.getDescriptionId(e.context):void 0,"data-placement":i})},getTitleProps(){return o.element({...v.title.attrs,id:s.getTitleId(e.context),dir:e.context.dir})},getDescriptionProps(){return o.element({...v.description.attrs,id:s.getDescriptionId(e.context),dir:e.context.dir})},getCloseTriggerProps(){return o.button({...v.closeTrigger.attrs,dir:e.context.dir,id:s.getCloseTriggerId(e.context),type:"button","aria-label":"close",onClick(l){l.defaultPrevented||t("CLOSE")}})}}}function ke(e){const t=fe(e);return ce({id:"popover",initial:t.open?"open":"closed",context:{closeOnInteractOutside:!0,closeOnEscape:!0,autoFocus:!0,modal:!1,portalled:!0,positioning:{placement:"bottom",...t.positioning},currentPlacement:void 0,...t,renderedElements:{title:!0,description:!0}},computed:{currentPortalled:o=>!!o.modal||!!o.portalled},watch:{open:["toggleVisibility"]},entry:["checkRenderedElements"],states:{closed:{on:{"CONTROLLED.OPEN":{target:"open",actions:["setInitialFocus"]},TOGGLE:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","setInitialFocus"]}],OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","setInitialFocus"]}]}},open:{activities:["trapFocus","preventScroll","hideContentBelow","trackPositioning","trackDismissableElement","proxyTabFocus"],on:{"CONTROLLED.CLOSE":{target:"closed",actions:["setFinalFocus"]},CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"closed",actions:["invokeOnClose","setFinalFocus"]}],TOGGLE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"closed",actions:["invokeOnClose"]}],"POSITIONING.SET":{actions:"reposition"}}}}},{guards:{isOpenControlled:o=>!!o["open.controlled"]},activities:{trackPositioning(o){o.currentPlacement=o.positioning.placement;const r=s.getAnchorEl(o)??s.getTriggerEl(o);return D(r,()=>s.getPositionerEl(o),{...o.positioning,defer:!0,onComplete(a){o.currentPlacement=a.placement}})},trackDismissableElement(o,r,{send:i}){const a=()=>s.getContentEl(o);let m=!0;return ye(a,{pointerBlocking:o.modal,exclude:s.getTriggerEl(o),defer:!0,onEscapeKeyDown(d){var l;(l=o.onEscapeKeyDown)==null||l.call(o,d),!o.closeOnEscape&&d.preventDefault()},onInteractOutside(d){var l;(l=o.onInteractOutside)==null||l.call(o,d),!d.defaultPrevented&&(m=!(d.detail.focusable||d.detail.contextmenu),o.closeOnInteractOutside||d.preventDefault())},onPointerDownOutside:o.onPointerDownOutside,onFocusOutside:o.onFocusOutside,persistentElements:o.persistentElements,onDismiss(){i({type:"CLOSE",src:"interact-outside",restoreFocus:m})}})},proxyTabFocus(o){return o.modal||!o.portalled?void 0:de(()=>s.getContentEl(o),{triggerElement:s.getTriggerEl(o),defer:!0,onFocus(i){i.focus({preventScroll:!0})}})},hideContentBelow(o){return o.modal?je(()=>[s.getContentEl(o),s.getTriggerEl(o)],{defer:!0}):void 0},preventScroll(o){if(o.modal)return xe(s.getDoc(o))},trapFocus(o){if(!o.modal)return;let r;return ge(()=>{const i=s.getContentEl(o);if(i){r=De(i,{escapeDeactivates:!1,allowOutsideClick:!0,preventScroll:!0,returnFocusOnDeactivate:!0,document:s.getDoc(o),fallbackFocus:i,initialFocus:x({root:s.getContentEl(o),getInitialEl:o.initialFocusEl,enabled:o.autoFocus})});try{r.activate()}catch{}}}),()=>r==null?void 0:r.deactivate()}},actions:{reposition(o,r){const i=s.getAnchorEl(o)??s.getTriggerEl(o);D(i,()=>s.getPositionerEl(o),{...o.positioning,...r.options,defer:!0,listeners:!1,onComplete(m){o.currentPlacement=m.placement}})},checkRenderedElements(o){O(()=>{Object.assign(o.renderedElements,{title:!!s.getTitleEl(o),description:!!s.getDescriptionEl(o)})})},setInitialFocus(o){o.modal||O(()=>{const r=x({root:s.getContentEl(o),getInitialEl:o.initialFocusEl,enabled:o.autoFocus});r==null||r.focus({preventScroll:!0})})},setFinalFocus(o,r){r.restoreFocus&&O(()=>{const i=s.getTriggerEl(o);i==null||i.focus({preventScroll:!0})})},invokeOnOpen(o){var r;(r=o.onOpenChange)==null||r.call(o,{open:!0})},invokeOnClose(o){var r;(r=o.onOpenChange)==null||r.call(o,{open:!1})},toggleVisibility(o,r,{send:i}){i({type:o.open?"CONTROLLED.OPEN":"CONTROLLED.CLOSE",previousEvent:r})}}})}ue()(["autoFocus","closeOnEscape","closeOnInteractOutside","dir","getRootNode","id","ids","initialFocusEl","modal","onEscapeKeyDown","onFocusOutside","onInteractOutside","onOpenChange","onPointerDownOutside","open.controlled","open","persistentElements","portalled","positioning"]);const Ae=(e={})=>{const{getRootNode:t}=Ce(),{dir:o}=Te(),r={id:c.useId(),dir:o,getRootNode:t,open:e.defaultOpen,"open.controlled":e.open!==void 0,...e},i={...r,open:e.open,onOpenChange:Fe(e.onOpenChange,{sync:!0})},[a,m]=me(ke(r),{context:i});return Le(a,m,ve)},Se=e=>{const[t,{children:o,...r}]=Oe(e),i=Ae(r),a=Ne(P({present:i.open},t));return n.jsx(Re,{value:i,children:n.jsx(we,{value:a,children:o})})},M=c.forwardRef((e,t)=>{const o=f(),r=P(o.getTitleProps(),e);return n.jsx(h.div,{...r,ref:t})});M.displayName="PopoverTitle";const q=c.forwardRef((e,t)=>{const o=f(),r=b(),i=P({...o.getTriggerProps(),"aria-controls":r.unmounted?void 0:o.getTriggerProps()["aria-controls"]},e);return n.jsx(h.button,{...i,ref:t})});q.displayName="PopoverTrigger";const $e=te({className:"popover",slots:G.keys(),base:{positioner:{position:"relative"},content:{background:"white",borderRadius:"lg",boxShadow:"lg",display:"flex",flexDirection:"column",maxWidth:"sm",zIndex:"popover",p:"4",_open:{animation:"fade-in 0.25s ease-out"},_closed:{animation:"fade-out 0.2s ease-out"},"&[aria-hidden]":{display:"none"}},title:{fontWeight:"medium",textStyle:"sm"},description:{color:"neutral.400",textStyle:"sm"},closeTrigger:{color:"neutral.400"},arrow:{"--arrow-size":"var(--sizes-3)","--arrow-background":"var(--colors-white)"},arrowTip:{borderColor:"neutral.100",borderTopWidth:"1px",borderLeftWidth:"1px"}}}),[_e,T]=re({name:"popover",hookName:"usePopoverContext",providerName:"PopoverProvider",defaultValue:{classes:{},portalled:!1}});function U(e){const{portalled:t,children:o,...r}=e,a={classes:$e(),portalled:t};return n.jsx(_e,{value:a,children:n.jsx(Se,{portalled:t,...r,children:o})})}const J=c.forwardRef(function(e,t){const{classes:o}=T(),{children:r,className:i,...a}=e;return n.jsx(q,{className:C(o.trigger,i),ref:t,...a,children:r})}),Q=c.forwardRef(function(e,t){const{classes:o,portalled:r}=T(),{children:i,className:a,...m}=e,d=r?Ee:c.Fragment;return n.jsx(d,{children:n.jsx(H,{children:n.jsx(V,{className:C(o.content,a),ref:t,...m,children:i})})})}),Y=c.forwardRef(function(e,t){const{classes:o}=T(),{children:r,className:i,...a}=e;return n.jsx(z,{className:C(o.arrow,i),...a,ref:t,children:n.jsx(W,{className:o.arrowTip})})}),Z=c.forwardRef(function(e,t){const{classes:o}=T(),{children:r,className:i,...a}=e;return n.jsx(M,{className:C(o.title,i),...a,ref:t,children:r})}),ee=c.forwardRef(function(e,t){const{classes:o}=T(),{children:r,className:i,...a}=e;return n.jsx(X,{className:C(o.description,i),...a,ref:t,children:r})}),oe=c.forwardRef(function(e,t){const{classes:o}=T(),{children:r,className:i,...a}=e;return n.jsx(K,{className:C(o.closeTrigger,i),ref:t,...a,children:r})});U.__docgenInfo={description:"",methods:[],displayName:"Root"};J.__docgenInfo={description:"",methods:[],displayName:"Trigger"};Q.__docgenInfo={description:"",methods:[],displayName:"Content"};oe.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};Z.__docgenInfo={description:"",methods:[],displayName:"Title"};ee.__docgenInfo={description:"",methods:[],displayName:"Description"};Y.__docgenInfo={description:"",methods:[],displayName:"Arrow"};const p={Root:U,Trigger:J,Content:Q,Title:Z,Description:ee,CloseTrigger:oe,Arrow:Y},io={title:"Components/Popover",component:p.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/popover"}}},tags:["autodocs"],argTypes:{},args:{}},I={args:{},render:e=>n.jsx("div",{className:u({width:"600px",height:"500px"}),children:n.jsxs(p.Root,{...e,children:[n.jsx(p.Trigger,{asChild:!0,children:n.jsx(N,{children:"Open Popover"})}),n.jsxs(p.Content,{className:u({position:"relative"}),children:[n.jsx(p.Title,{className:u({mb:4}),children:"Lorem Ipsum"}),n.jsx(p.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}),n.jsx(p.CloseTrigger,{className:u({position:"absolute",right:2,top:2}),asChild:!0,children:n.jsx(w,{variant:"ghost",size:"sm",children:n.jsx(j,{size:16})})})]})]})})},E={args:{portalled:!0},render:e=>n.jsx("div",{className:u({width:"600px",height:"500px"}),children:n.jsxs(p.Root,{...e,children:[n.jsx(p.Trigger,{asChild:!0,children:n.jsx(N,{children:"Open Popover"})}),n.jsxs(p.Content,{className:u({position:"relative"}),children:[n.jsx(p.Title,{className:u({mb:4}),children:"Lorem Ipsum"}),n.jsx(p.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}),n.jsx(p.CloseTrigger,{className:u({position:"absolute",right:2,top:2}),asChild:!0,children:n.jsx(w,{variant:"ghost",size:"sm",children:n.jsx(j,{size:16})})})]})]})})},y={args:{},render:e=>n.jsx("div",{className:u({width:"600px",height:"500px"}),children:n.jsxs(p.Root,{...e,children:[n.jsx(p.Trigger,{asChild:!0,children:n.jsx(N,{children:"Open Popover"})}),n.jsxs(p.Content,{className:u({position:"relative"}),children:[n.jsx(p.Arrow,{}),n.jsx(p.Title,{className:u({mb:4}),children:"Lorem Ipsum"}),n.jsx(p.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry."}),n.jsx(p.CloseTrigger,{className:u({position:"absolute",right:2,top:2}),asChild:!0,children:n.jsx(w,{variant:"ghost",size:"sm",children:n.jsx(j,{size:16})})})]})]})})};var F,R,B;I.parameters={...I.parameters,docs:{...(F=I.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {},
  render: (props: PopoverProps['root']) => {
    return <div className={css({
      width: '600px',
      height: '500px'
    })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({
          position: 'relative'
        })}>
            <Popover.Title className={css({
            mb: 4
          })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger className={css({
            position: 'absolute',
            right: 2,
            top: 2
          })} asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,...(B=(R=I.parameters)==null?void 0:R.docs)==null?void 0:B.source}}};var L,k,A;E.parameters={...E.parameters,docs:{...(L=E.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    portalled: true
  },
  render: (props: PopoverProps['root']) => {
    return <div className={css({
      width: '600px',
      height: '500px'
    })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({
          position: 'relative'
        })}>
            <Popover.Title className={css({
            mb: 4
          })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger className={css({
            position: 'absolute',
            right: 2,
            top: 2
          })} asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,...(A=(k=E.parameters)==null?void 0:k.docs)==null?void 0:A.source}}};var S,$,_;y.parameters={...y.parameters,docs:{...(S=y.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  render: (props: PopoverProps['root']) => {
    return <div className={css({
      width: '600px',
      height: '500px'
    })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({
          position: 'relative'
        })}>
            <Popover.Arrow />
            <Popover.Title className={css({
            mb: 4
          })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger className={css({
            position: 'absolute',
            right: 2,
            top: 2
          })} asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>;
  }
}`,...(_=($=y.parameters)==null?void 0:$.docs)==null?void 0:_.source}}};const ao=["Default","Portalled","WithArrow"];export{I as Default,E as Portalled,y as WithArrow,ao as __namedExportsOrder,io as default};
