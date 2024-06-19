import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{d as D,e as V,p as q,b as L}from"./cva-DWZhh4fZ.js";import{r as d}from"./index-CDs2tPxN.js";import{s as J}from"./sva-DJJztBSp.js";import{c as K,a as Q,b as X,d as Y,m as b,e as R,f as Z,g as aa,h as ra,i as ea,j as ta,o as sa,k as oa,u as na,l as ca,n as ia,p as da,q as la,r as ma}from"./use-event-BKxKQYz4.js";import{c as pa}from"./createLucideIcon-zijr-BYg.js";import"./index-B-yFm4aN.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=pa("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);var $=K("avatar").parts("root","image","fallback");$.build();var v=Q({getRootId:a=>{var r;return((r=a.ids)==null?void 0:r.root)??`avatar:${a.id}`},getImageId:a=>{var r;return((r=a.ids)==null?void 0:r.image)??`avatar:${a.id}:image`},getFallbackId:a=>{var r;return((r=a.ids)==null?void 0:r.fallback)??`avatar:${a.id}:fallback`},getRootEl:a=>v.getById(a,v.getRootId(a)),getImageEl:a=>v.getById(a,v.getImageId(a))});X()(["dir","id","ids","onStatusChange","getRootNode"]);const[ga,_]=Y({name:"AvatarContext",hookName:"useAvatarContext",providerName:"<AvatarProvider />"}),U=d.forwardRef((a,r)=>{const e=_(),t=b(e.getFallbackProps(),a);return n.jsx(R.span,{...t,ref:r})});U.displayName="AvatarFallback";const B=d.forwardRef((a,r)=>{const e=_(),t=b(e.getImageProps(),a);return n.jsx(R.img,{...t,ref:r})});B.displayName="AvatarImage";var va=Z("avatar").parts("root","image","fallback"),k=va.build(),c=aa({getRootId:a=>{var r;return((r=a.ids)==null?void 0:r.root)??`avatar:${a.id}`},getImageId:a=>{var r;return((r=a.ids)==null?void 0:r.image)??`avatar:${a.id}:image`},getFallbackId:a=>{var r;return((r=a.ids)==null?void 0:r.fallback)??`avatar:${a.id}:fallback`},getRootEl:a=>c.getById(a,c.getRootId(a)),getImageEl:a=>c.getById(a,c.getImageId(a))});function ua(a,r,e){const t=a.matches("loaded");return{loaded:t,setSrc(o){r({type:"SRC.SET",src:o})},setLoaded(){r({type:"IMG.LOADED",src:"api"})},setError(){r({type:"IMG.ERROR",src:"api"})},getRootProps(){return e.element({...k.root.attrs,dir:a.context.dir,id:c.getRootId(a.context)})},getImageProps(){return e.img({...k.image.attrs,hidden:!t,dir:a.context.dir,id:c.getImageId(a.context),"data-state":t?"visible":"hidden",onLoad(){r({type:"IMG.LOADED",src:"element"})},onError(){r({type:"IMG.ERROR",src:"element"})}})},getFallbackProps(){return e.element({...k.fallback.attrs,dir:a.context.dir,id:c.getFallbackId(a.context),hidden:t,"data-state":t?"hidden":"visible"})}}}function ha(a){const r=ra(a);return ea({id:"avatar",initial:"loading",activities:["trackImageRemoval"],context:r,on:{"SRC.CHANGE":{target:"loading"},"IMG.UNMOUNT":{target:"error"}},states:{loading:{activities:["trackSrcChange"],entry:["checkImageStatus"],on:{"IMG.LOADED":{target:"loaded",actions:["invokeOnLoad"]},"IMG.ERROR":{target:"error",actions:["invokeOnError"]}}},error:{activities:["trackSrcChange"],on:{"IMG.LOADED":{target:"loaded",actions:["invokeOnLoad"]}}},loaded:{activities:["trackSrcChange"],on:{"IMG.ERROR":{target:"error",actions:["invokeOnError"]}}}}},{activities:{trackSrcChange(e,t,{send:o}){const s=c.getImageEl(e);return sa(s,{attributes:["src","srcset"],callback(){o({type:"SRC.CHANGE"})}})},trackImageRemoval(e,t,{send:o}){const s=c.getRootEl(e);return oa(s,{callback(i){Array.from(i[0].removedNodes).find(p=>p.matches("[data-scope=avatar][data-part=image]"))&&o({type:"IMG.UNMOUNT"})}})}},actions:{invokeOnLoad(e){var t;(t=e.onStatusChange)==null||t.call(e,{status:"loaded"})},invokeOnError(e){var t;(t=e.onStatusChange)==null||t.call(e,{status:"error"})},checkImageStatus(e,t,{send:o}){const s=c.getImageEl(e);if(s!=null&&s.complete){const i=fa(s)?"IMG.LOADED":"IMG.ERROR";o({type:i,src:"ssr"})}}}})}function fa(a){return a.complete&&a.naturalWidth!==0&&a.naturalHeight!==0}ta()(["dir","id","ids","onStatusChange","getRootNode"]);const Ia=(a={})=>{const{getRootNode:r}=na(),{dir:e}=ca(),t={id:d.useId(),dir:e,getRootNode:r,...a},o={...t,onStatusChange:ia(a.onStatusChange)},[s,i]=da(ha(t),{context:o});return ua(s,i,la)},T=d.forwardRef((a,r)=>{const[e,t]=ma()(a,["id","ids","onStatusChange"]),o=Ia(e),s=b(o.getRootProps(),t);return n.jsx(ga,{value:o,children:n.jsx(R.div,{...s,ref:r})})});T.displayName="AvatarRoot";const y={transform(a){const{direction:r,align:e,justify:t,wrap:o,basis:s,grow:i,shrink:m,...g}=a;return{display:"flex",flexDirection:r,alignItems:e,justifyContent:t,flexWrap:o,flexBasis:s,flexGrow:i,flexShrink:m,...g}}},H=(a={})=>{const r=V(y,a);return y.transform(r,q)},W=a=>D(H(a));W.raw=H;const ka=a=>Object.is(a,void 0)||Object.is(a,null),ba=a=>!ka(a),Ra=J({className:"avatar",slots:$.keys(),base:{root:{rounded:"full",overflow:"hidden"},fallback:{bg:"neutral.200"},image:{bg:"neutral.200"}},variants:{size:{sm:{root:{w:8,h:8},fallback:{w:8,h:8},image:{w:8,h:8}},md:{root:{w:10,h:10},fallback:{w:10,h:10},image:{w:10,h:10}},lg:{root:{w:12,h:12},fallback:{w:12,h:12},image:{w:12,h:12}}}},defaultVariants:{size:"md"}}),l=d.forwardRef((a,r)=>{const{fallback:e,src:t,alt:o,size:s,className:i,children:m,...g}=a,p=Ra({size:s}),A=m&&d.Children.only(m);return n.jsxs(T,{ref:r,className:L(p.root,i),...g,children:[n.jsx(B,{src:t,alt:o,className:p.image,asChild:ba(A),children:A}),n.jsx(U,{className:p.fallback,asChild:!0,children:e??n.jsx(F,{size:Aa(s)})})]})}),Aa=a=>a==="sm"?32:a==="md"?40:a==="lg"?48:10;l.__docgenInfo={description:"",methods:[],displayName:"Avatar"};const ja={title:"Components/Avatar",component:l,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/avatar"}}},tags:["autodocs"],argTypes:{},args:{}},u={args:{alt:"pravatar",src:"https://i.pravatar.cc/500",size:"md"},render:a=>n.jsx(l,{...a})},h={args:{alt:"pravatar",src:"https://i.pravatar.cc/500"},render:a=>{const r=["sm","md","lg"];return n.jsx("div",{className:L(W({direction:"row",gap:4})),children:r.map(e=>n.jsx(l,{size:e,...a},e))})}},f={args:{children:n.jsx("img",{src:"https://i.pravatar.cc/500",alt:"pravatar"})},render:({children:a,...r})=>n.jsx(l,{...r,children:a})},I={args:{alt:"pravatar",fallback:n.jsx(F,{size:40,className:D({bg:"neutral.200"})})},render:a=>n.jsx(l,{...a})};var C,x,E;u.parameters={...u.parameters,docs:{...(C=u.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
    size: 'md'
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(E=(x=u.parameters)==null?void 0:x.docs)==null?void 0:E.source}}};var S,N,P;h.parameters={...h.parameters,docs:{...(S=h.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500'
  },
  render: (props: AvatarProps) => {
    const sizes = (['sm', 'md', 'lg'] as AvatarProps['size'][]);
    return <div className={cx(flex({
      direction: 'row',
      gap: 4
    }))}>
        {sizes.map(size => <Avatar size={size} key={size} {...props} />)}
      </div>;
  }
}`,...(P=(N=h.parameters)==null?void 0:N.docs)==null?void 0:P.source}}};var j,w,O;f.parameters={...f.parameters,docs:{...(j=f.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    children: <img src="https://i.pravatar.cc/500" alt="pravatar" />
  },
  render: ({
    children,
    ...props
  }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  }
}`,...(O=(w=f.parameters)==null?void 0:w.docs)==null?void 0:O.source}}};var M,z,G;I.parameters={...I.parameters,docs:{...(M=I.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    fallback: <UserIcon size={40} className={css({
      bg: 'neutral.200'
    })} />
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(G=(z=I.parameters)==null?void 0:z.docs)==null?void 0:G.source}}};const wa=["Default","Size","ImageWithChildren","Fallback"];export{u as Default,I as Fallback,f as ImageWithChildren,h as Size,wa as __namedExportsOrder,ja as default};
