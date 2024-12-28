import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{T as r}from"./Textarea-CNmOYPS6.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";const n=["sm","md","lg"],h={title:"Components/Textarea",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:n,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:n[1],disabled:!1,invalid:!1}},s={args:{},render:j=>e.jsx(r,{...j})},a={args:{},render:()=>e.jsxs("div",{className:"trds-flex trds-flex-row trds-items-start trds-gap-4 trds-w-96 trds-h-48",children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},t={args:{},render:()=>e.jsx(r,{disabled:!0,children:"Hello world"})},o={args:{},render:()=>e.jsx(r,{invalid:!0,children:"Hello world"})};var d,l,i;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: (props: TextareaProps) => {
    return <Textarea {...props}></Textarea>;
  }
}`,...(i=(l=s.parameters)==null?void 0:l.docs)==null?void 0:i.source}}};var c,p,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-row trds-items-start trds-gap-4 trds-w-96 trds-h-48">
        <Textarea size="sm" />
        <Textarea size="md" />
        <Textarea size="lg" />
      </div>;
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,x,g;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea disabled>Hello world</Textarea>;
  }
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var T,f,z;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea invalid>Hello world</Textarea>;
  }
}`,...(z=(f=o.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};const y=["Default","Sizes","Disabled","Invalid"];export{s as Default,t as Disabled,o as Invalid,a as Sizes,y as __namedExportsOrder,h as default};
