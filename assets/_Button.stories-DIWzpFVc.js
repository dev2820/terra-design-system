import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as r}from"./Button-DUHQiuDU.js";import{E as A}from"./ellipsis-Bl27Sm0D.js";import{S as u}from"./search-CJImRorz.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";const p=["xs","sm","md","lg"],d=["primary","neutral","whiteAlpha","danger"],m=["filled","outline","ghost"],H={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:p,control:{type:"select"}},variant:{options:m,control:{type:"select"}},theme:{options:d,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:p[2],variant:m[0],theme:d[1],disabled:!1,loading:!1}},t={args:{},render:s=>e.jsx(r,{...s,children:"Click me"})},n={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:m.map(s=>e.jsx(r,{variant:s,theme:"neutral",children:"Click me"},s))})},o={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:d.map(s=>e.jsx(r,{theme:s,children:"Click me"},s))})},a={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{size:"xs",children:"Click me"}),e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"})]})},i={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(A,{size:20}),children:"Click me"})]})},c={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{leftIcon:e.jsx(u,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(u,{size:20}),children:"Click me"})]})},l={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:e.jsx(r,{disabled:!0,children:"Click me"})})};var g,x,f;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(f=(x=t.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var h,B,C;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <Button variant={variant} theme="neutral" key={variant}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(C=(B=n.parameters)==null?void 0:B.docs)==null?void 0:C.source}}};var k,v,j;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {colors.map(color => <Button theme={color} key={color}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(j=(v=o.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var z,S,w;a.parameters={...a.parameters,docs:{...(z=a.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button size="xs">Click me</Button>
        <Button size="sm">Click me</Button>
        <Button size="md">Click me</Button>
        <Button size="lg">Click me</Button>
      </div>;
  }
}`,...(w=(S=a.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var N,I,y;i.parameters={...i.parameters,docs:{...(N=i.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button loading>Click me</Button>
        <Button loading loadingIcon={<EllipsisIcon size={20} />}>
          Click me
        </Button>
      </div>;
  }
}`,...(y=(I=i.parameters)==null?void 0:I.docs)==null?void 0:y.source}}};var b,E,D;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button leftIcon={<SearchIcon size={20} />}>Click me</Button>
        <Button rightIcon={<SearchIcon size={20} />}>Click me</Button>
      </div>;
  }
}`,...(D=(E=c.parameters)==null?void 0:E.docs)==null?void 0:D.source}}};var _,L,V;l.parameters={...l.parameters,docs:{...(_=l.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <Button disabled>Click me</Button>
      </div>;
  }
}`,...(V=(L=l.parameters)==null?void 0:L.docs)==null?void 0:V.source}}};const J=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled"];export{o as ColorScheme,t as Default,l as Disabled,c as Icon,i as Loading,a as Sizes,n as Variant,J as __namedExportsOrder,H as default};
