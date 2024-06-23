import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as s}from"./cva-C095pwBQ.js";import{B as r}from"./Button-IvN-4m8O.js";import{c as O}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=O("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=O("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),x=["sm","md","lg","icon"],p=["primary","neutral"],u=["filled","outline","ghost"],H={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:x,control:{type:"select"}},variant:{options:u,control:{type:"select"}},theme:{options:p,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:x[1],variant:u[0],theme:p[1],disabled:!1,loading:!1}},a={args:{},render:n=>e.jsx(r,{...n,children:"Click me"})},o={args:{},render:()=>e.jsx("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:u.map(n=>e.jsx(r,{variant:n,theme:"neutral",children:"Click me"},n))})},t={args:{},render:()=>e.jsx("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:p.map(n=>e.jsx(r,{theme:n,children:"Click me"},n))})},i={args:{},render:()=>e.jsxs("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"}),e.jsx(r,{size:"icon",children:e.jsx(m,{size:20})})]})},c={args:{},render:()=>e.jsxs("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(P,{size:20}),children:"Click me"})]})},l={args:{},render:()=>e.jsxs("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{leftIcon:e.jsx(m,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(m,{size:20}),children:"Click me"})]})},d={args:{},render:()=>e.jsx("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:e.jsx(r,{disabled:!0,children:"Click me"})})};var g,f,h;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var y,k,B;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
}`,...(B=(k=o.parameters)==null?void 0:k.docs)==null?void 0:B.source}}};var j,v,C;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(C=(v=t.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var z,D,S;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
}`,...(S=(D=i.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var w,I,N;c.parameters={...c.parameters,docs:{...(w=c.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(N=(I=c.parameters)==null?void 0:I.docs)==null?void 0:N.source}}};var b,E,_;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(_=(E=l.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var L,q,V;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(V=(q=d.parameters)==null?void 0:q.docs)==null?void 0:V.source}}};const J=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled"];export{t as ColorScheme,a as Default,d as Disabled,l as Icon,c as Loading,i as Sizes,o as Variant,J as __namedExportsOrder,H as default};
