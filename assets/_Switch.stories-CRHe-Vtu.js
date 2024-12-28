import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{R as e}from"./Switch-J2azZwoM.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-1fMUQAsE.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-OrFpox1S.js";const n=["sm","md","lg"],P={title:"Components/Switch",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:n,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:n[1],disabled:!1,invalid:!1}},s={args:{},render:f=>r.jsx(e,{...f})},t={args:{},render:()=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-items-center trds-gap-4 trds-w-36 trds-h-48",children:[r.jsx(e,{size:"sm"}),r.jsx(e,{size:"md"}),r.jsx(e,{size:"lg"})]})},a={args:{},render:()=>r.jsx(e,{disabled:!0})},o={args:{},render:()=>r.jsx(e,{invalid:!0})};var i,d,c;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: SwitchProps) => {
    return <Switch {...props}></Switch>;
  }
}`,...(c=(d=s.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,m,l;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-flex trds-flex-col trds-items-center trds-gap-4 trds-w-36 trds-h-48">
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
      </div>;
  }
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var u,g,S;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Switch disabled />;
  }
}`,...(S=(g=a.parameters)==null?void 0:g.docs)==null?void 0:S.source}}};var x,h,w;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Switch invalid />;
  }
}`,...(w=(h=o.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};const T=["Default","Sizes","Disabled","Invalid"];export{s as Default,a as Disabled,o as Invalid,t as Sizes,T as __namedExportsOrder,P as default};
