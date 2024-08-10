import{j as p}from"./jsx-runtime-qGIIFXMu.js";import{R as n}from"./NumberInput-0HhUjAS5.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-D5jZQDUh.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./create-split-props-u5h9OPvL.js";import"./index-DHe2XY-8.js";import"./index-DBzJ7FiP.js";import"./use-locale-context-B5vdPRI5.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Dq9yVNyx.js";const w={title:"Components/NumberInput",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>p.jsx(n,{...r})},t={args:{placeholder:"input number"},render:r=>p.jsx(n,{...r,disabled:!0})},o={args:{placeholder:"input number"},render:r=>p.jsx(n,{...r,invalid:!0})};var s,a,u;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
