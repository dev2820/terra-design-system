import{j as s}from"./jsx-runtime-qGIIFXMu.js";import{R as o}from"./NumberInput-I0PyIysI.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./use-event-BHryBJ3d.js";import"./index-B-yFm4aN.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./index-CfCBugC6.js";import"./index-Bc7AdKyF.js";const P={title:"Components/NumberInput",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>s.jsx(o,{...r})},t={args:{placeholder:"input number"},render:r=>s.jsx(o,{...r,disabled:!0})},n={args:{placeholder:"input number"},render:r=>s.jsx(o,{...r,invalid:!0})};var a,p,u;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number',
    defaultValue: 0
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} />;
  }
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,l,m;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} disabled />;
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var i,c,b;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} invalid />;
  }
}`,...(b=(c=n.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const R=["Default","Disabled","Invalid"];export{e as Default,t as Disabled,n as Invalid,R as __namedExportsOrder,P as default};
