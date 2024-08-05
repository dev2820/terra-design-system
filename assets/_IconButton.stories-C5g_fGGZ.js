import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as o}from"./cva-C095pwBQ.js";import{I as n}from"./IconButton-DBZbh7S6.js";import{S as r}from"./search-CJImRorz.js";import{E as k}from"./ellipsis-Bl27Sm0D.js";import"./index-CDs2tPxN.js";import"./Button-BqV08Sjs.js";import"./createLucideIcon-zijr-BYg.js";const u=["sm","md","lg"],p=["primary","neutral"],m=["filled","outline","ghost"],F={title:"Components/IconButton",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:u,control:{type:"select"}},variant:{options:m,control:{type:"select"}},theme:{options:p,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:u[1],variant:m[0],theme:p[1],disabled:!1,loading:!1}},a={args:{},render:s=>e.jsx(n,{...s,children:e.jsx(r,{size:20})})},t={args:{},render:()=>e.jsx("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:m.map(s=>e.jsx(n,{variant:s,theme:"neutral",children:e.jsx(r,{size:20})},s))})},c={args:{},render:()=>e.jsx("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:p.map(s=>e.jsx(n,{theme:s,children:e.jsx(r,{size:20})},s))})},i={args:{},render:()=>e.jsxs("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(n,{size:"sm",children:e.jsx(r,{size:20})}),e.jsx(n,{size:"md",children:e.jsx(r,{size:20})}),e.jsx(n,{size:"lg",children:e.jsx(r,{size:20})})]})},l={args:{},render:()=>e.jsxs("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(n,{loading:!0,children:e.jsx(r,{size:20})}),e.jsx(n,{loading:!0,loadingIcon:e.jsx(k,{size:20}),children:e.jsx(r,{size:20})})]})},d={args:{},render:()=>e.jsx("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:e.jsx(n,{disabled:!0,children:e.jsx(r,{size:20})})})};var x,g,I;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: IconButtonProps) => {
    return <IconButton {...props}>
        <SearchIcon size={20} />
      </IconButton>;
  }
}`,...(I=(g=a.parameters)==null?void 0:g.docs)==null?void 0:I.source}}};var h,f,z;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {variants.map(variant => <IconButton variant={variant} theme="neutral" key={variant}>
            <SearchIcon size={20} />
          </IconButton>)}
      </div>;
  }
}`,...(z=(f=t.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var j,v,B;c.parameters={...c.parameters,docs:{...(j=c.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {colors.map(color => <IconButton theme={color} key={color}>
            <SearchIcon size={20} />
          </IconButton>)}
      </div>;
  }
}`,...(B=(v=c.parameters)==null?void 0:v.docs)==null?void 0:B.source}}};var S,y,D;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <IconButton size="sm">
          <SearchIcon size={20} />
        </IconButton>
        <IconButton size="md">
          <SearchIcon size={20} />
        </IconButton>
        <IconButton size="lg">
          <SearchIcon size={20} />
        </IconButton>
      </div>;
  }
}`,...(D=(y=i.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var w,N,b;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <IconButton loading>
          <SearchIcon size={20} />
        </IconButton>
        <IconButton loading loadingIcon={<EllipsisIcon size={20} />}>
          <SearchIcon size={20} />
        </IconButton>
      </div>;
  }
}`,...(b=(N=l.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var E,_,C;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <IconButton disabled>
          <SearchIcon size={20} />
        </IconButton>
      </div>;
  }
}`,...(C=(_=d.parameters)==null?void 0:_.docs)==null?void 0:C.source}}};const G=["Default","Variant","ColorScheme","Sizes","Loading","Disabled"];export{c as ColorScheme,a as Default,d as Disabled,l as Loading,i as Sizes,t as Variant,G as __namedExportsOrder,F as default};
