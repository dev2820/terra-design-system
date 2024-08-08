import{j as s}from"./jsx-runtime-qGIIFXMu.js";import{R as n}from"./NumberInput-BXnR19gZ.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./create-split-props-DTq8A8QE.js";import"./index-B-yFm4aN.js";import"./use-locale-context-BAx_KD7B.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./index-LwaLqlWa.js";import"./index-DBzJ7FiP.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-BVostUmO.js";const E={title:"Components/NumberInput",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>s.jsx(n,{...r})},t={args:{placeholder:"input number"},render:r=>s.jsx(n,{...r,disabled:!0})},o={args:{placeholder:"input number"},render:r=>s.jsx(n,{...r,invalid:!0})};var a,p,u;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number',
    defaultValue: 0
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} />;
  }
}`,...(u=(p=e.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var m,i,d;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(b=(c=o.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const V=["Default","Disabled","Invalid"];export{e as Default,t as Disabled,o as Invalid,V as __namedExportsOrder,E as default};
