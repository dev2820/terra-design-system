import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as r}from"./Button-Dwqr5mVQ.js";import{E as R}from"./ellipsis-Bl27Sm0D.js";import{S as p}from"./search-CJImRorz.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";const g=["xs","sm","md","lg"],m=["primary","neutral","whiteAlpha","blackAlpha"],u=["filled","outline","ghost"],Q={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:g,control:{type:"select"}},variant:{options:u,control:{type:"select"}},theme:{options:m,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:g[2],variant:u[0],theme:m[1],disabled:!1,loading:!1}},t={args:{},render:s=>e.jsx(r,{...s,children:"Click me"})},n={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:u.map(s=>e.jsx(r,{variant:s,theme:"neutral",children:"Click me"},s))})},a={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:m.map(s=>e.jsx(r,{theme:s,children:"Click me"},s))})},o={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{size:"xs",children:"Click me"}),e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"})]})},i={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(R,{size:20}),children:"Click me"})]})},c={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{leftIcon:e.jsx(p,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(p,{size:20}),children:"Click me"})]})},d={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:e.jsx(r,{disabled:!0,children:"Click me"})})},l={args:{},render:()=>e.jsx(r,{theme:"primary",asChild:!0,children:e.jsx("a",{href:"https://github.com/dev2820/terra-design-system",children:"Terra Design System"})})};var x,h,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(f=(h=t.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var B,C,k;n.parameters={...n.parameters,docs:{...(B=n.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <Button variant={variant} theme="neutral" key={variant}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(k=(C=n.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var v,j,z;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {colors.map(color => <Button theme={color} key={color}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(z=(j=a.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var S,y,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button size="xs">Click me</Button>
        <Button size="sm">Click me</Button>
        <Button size="md">Click me</Button>
        <Button size="lg">Click me</Button>
      </div>;
  }
}`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var N,b,I;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button loading>Click me</Button>
        <Button loading loadingIcon={<EllipsisIcon size={20} />}>
          Click me
        </Button>
      </div>;
  }
}`,...(I=(b=i.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var D,E,A;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button leftIcon={<SearchIcon size={20} />}>Click me</Button>
        <Button rightIcon={<SearchIcon size={20} />}>Click me</Button>
      </div>;
  }
}`,...(A=(E=c.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var _,T,L;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button disabled>Click me</Button>
      </div>;
  }
}`,...(L=(T=d.parameters)==null?void 0:T.docs)==null?void 0:L.source}}};var V,O,P;l.parameters={...l.parameters,docs:{...(V=l.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Button theme="primary" asChild>
        <a href="https://github.com/dev2820/terra-design-system">
          Terra Design System
        </a>
      </Button>;
  }
}`,...(P=(O=l.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const U=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled","AsChild"];export{l as AsChild,a as ColorScheme,t as Default,d as Disabled,c as Icon,i as Loading,o as Sizes,n as Variant,U as __namedExportsOrder,Q as default};
