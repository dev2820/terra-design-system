import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{I as t}from"./Input-wO2GjwpU.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";const y={title:"Components/Input",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input email"},render:g=>n.jsx(t,{...g})},r={args:{},render:()=>n.jsx(t,{placeholder:"input email",disabled:!0})},a={args:{},render:()=>n.jsx(t,{placeholder:"input email",invalid:!0})};var s,o,p;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    placeholder: 'input email'
  },
  render: (props: InputProps) => {
    return <Input {...props} />;
  }
}`,...(p=(o=e.parameters)==null?void 0:o.docs)==null?void 0:p.source}}};var l,d,i;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Input placeholder="input email" disabled />;
  }
}`,...(i=(d=r.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var u,c,m;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Input placeholder="input email" invalid />;
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};const h=["Default","Disabled","Invalid"];export{e as Default,r as Disabled,a as Invalid,h as __namedExportsOrder,y as default};
