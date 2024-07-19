import{j as s}from"./jsx-runtime-qGIIFXMu.js";import{R as o}from"./NumberInput-r6jASuIk.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./use-locale-context-CR0_REhh.js";import"./index-B-yFm4aN.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./index-Gg5MN_a-.js";import"./index-Bc7AdKyF.js";import"./use-event-eGuf5zsd.js";const R={title:"Components/NumberInput",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>s.jsx(o,{...r})},t={args:{placeholder:"input number"},render:r=>s.jsx(o,{...r,disabled:!0})},n={args:{placeholder:"input number"},render:r=>s.jsx(o,{...r,invalid:!0})};var a,p,u;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number',
    defaultValue: 0
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} />;
  }
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var d,m,i;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} disabled />;
  }
}`,...(i=(m=t.parameters)==null?void 0:m.docs)==null?void 0:i.source}}};var l,c,b;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} invalid />;
  }
}`,...(b=(c=n.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const S=["Default","Disabled","Invalid"];export{e as Default,t as Disabled,n as Invalid,S as __namedExportsOrder,R as default};
