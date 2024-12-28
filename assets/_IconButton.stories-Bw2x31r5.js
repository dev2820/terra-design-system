import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{I as r}from"./IconButton-BhuYW3nN.js";import{S as s}from"./search-CJImRorz.js";import{E as C}from"./ellipsis-Bl27Sm0D.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./Button-Dwqr5mVQ.js";import"./createLucideIcon-zijr-BYg.js";const p=["xs","sm","md","lg"],l=["primary","neutral"],m=["filled","outline","ghost"],A={title:"Components/IconButton",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:p,control:{type:"select"}},variant:{options:m,control:{type:"select"}},theme:{options:l,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:p[1],variant:m[0],theme:l[1],disabled:!1,loading:!1}},o={args:{},render:n=>e.jsx(r,{...n,children:e.jsx(s,{size:20})})},t={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:m.map(n=>e.jsx(r,{variant:n,theme:"neutral",children:e.jsx(s,{size:20})},n))})},a={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:l.map(n=>e.jsx(r,{theme:n,children:e.jsx(s,{size:20})},n))})},c={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{size:"xs",children:e.jsx(s,{size:20})}),e.jsx(r,{size:"sm",children:e.jsx(s,{size:20})}),e.jsx(r,{size:"md",children:e.jsx(s,{size:20})}),e.jsx(r,{size:"lg",children:e.jsx(s,{size:20})})]})},i={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{loading:!0,children:e.jsx(s,{size:20})}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(C,{size:20}),children:e.jsx(s,{size:20})})]})},d={args:{},render:()=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:e.jsx(r,{disabled:!0,children:e.jsx(s,{size:20})})})};var u,x,g;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: (props: IconButtonProps) => {
    return <IconButton {...props}>
        <SearchIcon size={20} />
      </IconButton>;
  }
}`,...(g=(x=o.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var I,h,z;t.parameters={...t.parameters,docs:{...(I=t.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <IconButton variant={variant} theme="neutral" key={variant}>
            <SearchIcon size={20} />
          </IconButton>)}
      </div>;
  }
}`,...(z=(h=t.parameters)==null?void 0:h.docs)==null?void 0:z.source}}};var f,j,B;a.parameters={...a.parameters,docs:{...(f=a.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {colors.map(color => <IconButton theme={color} key={color}>
            <SearchIcon size={20} />
          </IconButton>)}
      </div>;
  }
}`,...(B=(j=a.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var v,S,w;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <IconButton size="xs">
          <SearchIcon size={20} />
        </IconButton>
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
}`,...(w=(S=c.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var y,N,b;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <IconButton loading>
          <SearchIcon size={20} />
        </IconButton>
        <IconButton loading loadingIcon={<EllipsisIcon size={20} />}>
          <SearchIcon size={20} />
        </IconButton>
      </div>;
  }
}`,...(b=(N=i.parameters)==null?void 0:N.docs)==null?void 0:b.source}}};var E,D,_;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        <IconButton disabled>
          <SearchIcon size={20} />
        </IconButton>
      </div>;
  }
}`,...(_=(D=d.parameters)==null?void 0:D.docs)==null?void 0:_.source}}};const F=["Default","Variant","ColorScheme","Sizes","Loading","Disabled"];export{a as ColorScheme,o as Default,d as Disabled,i as Loading,c as Sizes,t as Variant,F as __namedExportsOrder,A as default};
