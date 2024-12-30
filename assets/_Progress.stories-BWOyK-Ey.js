import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{P as s}from"./Progress-Bkf0qkAs.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-DE2wJq7j.js";import"./use-locale-context-hL6yk3cA.js";const i=["sm","md","lg","icon"],n=["linear","circular"],_={title:"Components/Progress",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:i,control:{type:"select"}},variant:{options:n,control:{type:"select"}}},args:{size:i[1],variant:n[0]}},a={args:{},render:e=>r.jsx(s,{...e,className:"trds-w-48"})},t={args:{},render:()=>r.jsx("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4",children:n.map(e=>r.jsx(s,{variant:e},e))})},o={args:{},render:()=>r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4 trds-mb-4",children:[r.jsx(s,{size:"sm"}),r.jsx(s,{size:"md"}),r.jsx(s,{size:"lg"})]}),r.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(s,{size:"sm",variant:"circular"}),r.jsx(s,{size:"md",variant:"circular"}),r.jsx(s,{size:"lg",variant:"circular"})]})]})};var d,c,l;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: (props: ProgressProps) => {
    return <Progress {...props} className="trds-w-48" />;
  }
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};var m,p,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
        {variants.map(variant => <Progress variant={variant} key={variant}></Progress>)}
      </div>;
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var u,x,v;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4 trds-mb-4">
          <Progress size="sm"></Progress>
          <Progress size="md"></Progress>
          <Progress size="lg"></Progress>
        </div>
        <div className="trds-flex trds-flex-row trds-gap-4">
          <Progress size="sm" variant="circular"></Progress>
          <Progress size="md" variant="circular"></Progress>
          <Progress size="lg" variant="circular"></Progress>
        </div>
      </>;
  }
}`,...(v=(x=o.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};const b=["Default","Variant","Sizes"];export{a as Default,o as Sizes,t as Variant,b as __namedExportsOrder,_ as default};
