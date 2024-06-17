import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{c as K,b as n,a as Q}from"./cva-Drq5-6Bq.js";import{r as U}from"./index-CDs2tPxN.js";import{c as h}from"./createLucideIcon-zijr-BYg.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=h("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $=h("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=h("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),ee=K({base:{display:"inline-flex",alignItems:"center",justifyContent:"center",whiteSpace:"nowrap",rounded:"lg",fontSize:"md",fontWeight:"medium",gap:"2",transition:["colors"],cursor:"pointer",_disabled:{cursor:"not-allowed",opacity:50}},variants:{variant:{filled:{},outline:{border:"1px solid",bg:"white"},ghost:{bg:"transparent"}},theme:{primary:{},neutral:{}},size:{sm:{h:9,paddingX:3},md:{h:10,paddingX:4,paddingY:2},lg:{h:11,paddingX:8},icon:{h:10,w:10}},loading:{true:{_disabled:{cursor:"wait"}}}},defaultVariants:{variant:"filled",theme:"neutral",size:"md",loading:!1},compoundVariants:[{theme:"primary",variant:"filled",css:{bgColor:"primary",color:"primary.foreground",_disabled:{bg:"primary",_hover:{bg:"primary"},_active:{bg:"primary"}},_hover:{bg:"primary.600"},_active:{bg:"primary.700"}}},{theme:"neutral",variant:"filled",css:{bgColor:"neutral",color:"neutral.foreground",_disabled:{bg:"neutral",_hover:{bg:"neutral"},_active:{bg:"neutral"}},_hover:{bg:"neutral.200"},_active:{bg:"neutral.300"}}},{theme:"primary",variant:"outline",css:{color:"primary.500",borderColor:"primary.500",_disabled:{_hover:{bg:"white"},_active:{bg:"white"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{theme:"neutral",variant:"outline",css:{color:"neutral.500",borderColor:"neutral.500",_disabled:{bg:"transparent",_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}},{theme:"primary",variant:"ghost",css:{color:"primary.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{theme:"neutral",variant:"ghost",css:{color:"neutral.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}}]}),r=U.forwardRef(function(a,O){const{type:P="button",loading:s=!1,loadingIcon:T=e.jsx($,{className:n({animation:"spin"}),size:20}),leftIcon:W,rightIcon:Y,disabled:v=!1,variant:A,size:F,theme:G,children:H,...J}=a;return e.jsxs("button",{className:Q(ee({variant:A,theme:G,size:F,loading:s})),type:P,disabled:v||s,"aria-disabled":v||s,"aria-busy":s,ref:O,...J,children:[W,H,Y,s&&T]})});r.__docgenInfo={description:"",methods:[],displayName:"Button"};const x=["sm","md","lg","icon"],u=["primary","neutral"],g=["filled","outline","ghost"],te={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:x,control:{type:"select"}},variant:{options:g,control:{type:"select"}},theme:{options:u,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:x[1],variant:g[0],theme:u[1],disabled:!1,loading:!1}},t={args:{},render:a=>e.jsx(r,{...a,children:"Click me"})},i={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:g.map(a=>e.jsx(r,{variant:a,theme:"neutral",children:"Click me"},a))})},o={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:u.map(a=>e.jsx(r,{theme:a,children:"Click me"},a))})},l={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"}),e.jsx(r,{size:"icon",children:e.jsx(p,{size:20})})]})},c={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(Z,{size:20}),children:"Click me"})]})},d={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{leftIcon:e.jsx(p,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(p,{size:20}),children:"Click me"})]})},m={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:e.jsx(r,{disabled:!0,children:"Click me"})})};var b,f,y;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(y=(f=t.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var _,C,k;i.parameters={...i.parameters,docs:{...(_=i.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {variants.map(variant => <Button variant={variant} theme="neutral" key={variant}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(k=(C=i.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var j,B,z;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {colors.map(color => <Button theme={color} key={color}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(z=(B=o.parameters)==null?void 0:B.docs)==null?void 0:z.source}}};var w,I,S;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button size="sm">Click me</Button>
        <Button size="md">Click me</Button>
        <Button size="lg">Click me</Button>
        <Button size="icon">
          <SearchIcon size={20} />
        </Button>
      </div>;
  }
}`,...(S=(I=l.parameters)==null?void 0:I.docs)==null?void 0:S.source}}};var D,N,E;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button loading>Click me</Button>
        <Button loading loadingIcon={<EllipsisIcon size={20} />}>
          Click me
        </Button>
      </div>;
  }
}`,...(E=(N=c.parameters)==null?void 0:N.docs)==null?void 0:E.source}}};var L,V,X;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button leftIcon={<SearchIcon size={20} />}>Click me</Button>
        <Button rightIcon={<SearchIcon size={20} />}>Click me</Button>
      </div>;
  }
}`,...(X=(V=d.parameters)==null?void 0:V.docs)==null?void 0:X.source}}};var q,R,M;m.parameters={...m.parameters,docs:{...(q=m.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button disabled>Click me</Button>
      </div>;
  }
}`,...(M=(R=m.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};const ie=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled"];export{o as ColorScheme,t as Default,m as Disabled,d as Icon,c as Loading,l as Sizes,i as Variant,ie as __namedExportsOrder,te as default};
