import{j as p}from"./jsx-runtime-qGIIFXMu.js";import{N as o}from"./NumberInput-ChfNHWDy.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-D_n9ZWii.js";import"./index-DBzJ7FiP.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Bl-xBte_.js";const w={title:"Components/NumberInput",component:o,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},e={args:{placeholder:"input number",defaultValue:0},render:r=>p.jsx(o,{...r})},t={args:{placeholder:"input number"},render:r=>p.jsx(o,{...r,disabled:!0})},n={args:{placeholder:"input number"},render:r=>p.jsx(o,{...r,invalid:!0})};var s,a,u;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
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
}`,...(d=(i=t.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var l,c,b;n.parameters={...n.parameters,docs:{...(l=n.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    placeholder: 'input number'
  },
  render: (props: NumberInputProps) => {
    return <NumberInput {...props} invalid />;
  }
}`,...(b=(c=n.parameters)==null?void 0:c.docs)==null?void 0:b.source}}};const C=["Default","Disabled","Invalid"];export{e as Default,t as Disabled,n as Invalid,C as __namedExportsOrder,w as default};
