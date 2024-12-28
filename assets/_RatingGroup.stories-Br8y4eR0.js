import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as s}from"./RatingGroup-DXrnLJ0z.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-1fMUQAsE.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-OrFpox1S.js";const k={title:"Components/RatingGroup",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/select"}}},tags:["autodocs"],argTypes:{count:{control:{type:"number"}},defaultValue:{control:{type:"number"}},disabled:{control:{type:"boolean"}},readOnly:{control:{type:"boolean"}}},args:{count:5,defaultValue:3,disabled:!1,readOnly:!1}},o={args:{},render:r=>e.jsx(s,{...r})},a={args:{},render:r=>e.jsx(s,{...r,allowHalf:!0})},t={args:{},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(s,{...r,size:"sm"}),e.jsx(s,{...r,size:"md"}),e.jsx(s,{...r,size:"lg"})]})},n={args:{},render:r=>e.jsx(s,{...r,disabled:!0})},p={args:{defaultValue:2.5},render:r=>e.jsx(s,{...r,allowHalf:!0,readOnly:!0})};var l,d,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} />;
  }
}`,...(u=(d=o.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var i,c,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} allowHalf />;
  }
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var g,f,R;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <RatingGroup {...props} size="sm" />
        <RatingGroup {...props} size="md" />
        <RatingGroup {...props} size="lg" />
      </div>;
  }
}`,...(R=(f=t.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var x,G,y;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} disabled />;
  }
}`,...(y=(G=n.parameters)==null?void 0:G.docs)==null?void 0:y.source}}};var b,j,z;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    defaultValue: 2.5
  },
  render: (props: RatingGroupProps) => {
    return <RatingGroup {...props} allowHalf readOnly />;
  }
}`,...(z=(j=p.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};const C=["Default","AllowHalf","Size","Disabled","ReadOnly"];export{a as AllowHalf,o as Default,n as Disabled,p as ReadOnly,t as Size,C as __namedExportsOrder,k as default};
