import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as j}from"./cva-C095pwBQ.js";import{T as r}from"./Textarea-CCfh2OzW.js";import"./index-CDs2tPxN.js";const o=["sm","md","lg"],D={title:"Components/Textarea",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:o,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:o[1],disabled:!1,invalid:!1}},s={args:{},render:h=>e.jsx(r,{...h})},a={args:{},render:()=>e.jsxs("div",{className:j({display:"flex",flexDir:"row",alignItems:"flex-start",gap:4,width:600,height:120}),children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},t={args:{},render:()=>e.jsx(r,{disabled:!0,children:"Hello world"})},n={args:{},render:()=>e.jsx(r,{invalid:!0,children:"Hello world"})};var i,l,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: TextareaProps) => {
    return <Textarea {...props}></Textarea>;
  }
}`,...(d=(l=s.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,p,m;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      alignItems: 'flex-start',
      gap: 4,
      width: 600,
      height: 120
    })}>
        <Textarea size="sm" />
        <Textarea size="md" />
        <Textarea size="lg" />
      </div>;
  }
}`,...(m=(p=a.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var x,u,g;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea disabled>Hello world</Textarea>;
  }
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var T,f,z;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea invalid>Hello world</Textarea>;
  }
}`,...(z=(f=n.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};const S=["Default","Sizes","Disabled","Invalid"];export{s as Default,t as Disabled,n as Invalid,a as Sizes,S as __namedExportsOrder,D as default};
