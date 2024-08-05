import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as n}from"./cva-C095pwBQ.js";import{B as r}from"./Button-BqV08Sjs.js";import{E as P}from"./ellipsis-Bl27Sm0D.js";import{S as u}from"./search-CJImRorz.js";import"./index-CDs2tPxN.js";import"./createLucideIcon-zijr-BYg.js";const g=["sm","md","lg","icon"],m=["primary","neutral"],p=["filled","outline","ghost"],J={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:g,control:{type:"select"}},variant:{options:p,control:{type:"select"}},theme:{options:m,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:g[1],variant:p[0],theme:m[1],disabled:!1,loading:!1}},a={args:{},render:s=>e.jsx(r,{...s,children:"Click me"})},o={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:p.map(s=>e.jsx(r,{variant:s,theme:"neutral",children:"Click me"},s))})},t={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:m.map(s=>e.jsx(r,{theme:s,children:"Click me"},s))})},i={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"})]})},l={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(P,{size:20}),children:"Click me"})]})},c={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{leftIcon:e.jsx(u,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(u,{size:20}),children:"Click me"})]})},d={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:e.jsx(r,{disabled:!0,children:"Click me"})})};var x,f,h;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(h=(f=a.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var B,v,C;o.parameters={...o.parameters,docs:{...(B=o.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
}`,...(C=(v=o.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var k,j,y;t.parameters={...t.parameters,docs:{...(k=t.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(y=(j=t.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var z,D,S;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
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
      </div>;
  }
}`,...(S=(D=i.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var w,N,I;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
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
}`,...(I=(N=l.parameters)==null?void 0:N.docs)==null?void 0:I.source}}};var b,E,_;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(_=(E=c.parameters)==null?void 0:E.docs)==null?void 0:_.source}}};var L,V,O;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(O=(V=d.parameters)==null?void 0:V.docs)==null?void 0:O.source}}};const K=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled"];export{t as ColorScheme,a as Default,d as Disabled,c as Icon,l as Loading,i as Sizes,o as Variant,K as __namedExportsOrder,J as default};
