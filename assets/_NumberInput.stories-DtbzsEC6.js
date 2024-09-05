import{j as p}from"./jsx-runtime-qGIIFXMu.js";import{R as n}from"./NumberInput-DCxpjDqc.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-DRtd-hRg.js";import"./index-DBzJ7FiP.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-CzRTzM_q.js";const w={title:"Components/NumberInput",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>p.jsx(n,{...r})},t={args:{placeholder:"input number"},render:r=>p.jsx(n,{...r,disabled:!0})},o={args:{placeholder:"input number"},render:r=>p.jsx(n,{...r,invalid:!0})};var s,a,u;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number',
    defaultValue: 0
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} />;
  }
}`,...(u=(a=e.parameters)==null?void 0:a.docs)==null?void 0:u.source}}};var m,i,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} disabled />;
  }
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var l,c,b;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} invalid />;
  }
}`,...(b=(c=o.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const C=["Default","Disabled","Invalid"];export{e as Default,t as Disabled,o as Invalid,C as __namedExportsOrder,w as default};
