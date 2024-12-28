import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as s}from"./Slider-BR3-FltM.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-1fMUQAsE.js";import"./index-CMjQVyXy.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";const G={title:"Components/Slider",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/collapsible"}}},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}}},args:{disabled:!1}},a={args:{defaultValue:[30]},render:r=>e.jsx(s,{...r,className:"trds-w-48"})},n={args:{defaultValue:[30]},render:r=>e.jsx(s,{...r,className:"trds-w-48",disabled:!0})},t={args:{min:0,max:100,step:10,defaultValue:[30]},render:r=>e.jsx(s,{...r,className:"trds-w-48"})},l={args:{min:0,max:100,defaultValue:[30]},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(s,{...r,size:"sm",className:"trds-w-48"}),e.jsx(s,{...r,size:"md",className:"trds-w-48"}),e.jsx(s,{...r,size:"lg",className:"trds-w-48"})]})},o={args:{min:0,max:100,defaultValue:[30]},render:r=>{const h=[{value:0,marker:"0"},{value:20,marker:"20"},{value:40,marker:"40"},{value:60,marker:"60"},{value:80,marker:"80"},{value:100,marker:"100"}];return e.jsx(s,{...r,markers:h,className:"trds-w-48 trds-text-blackAlpha-500"})}},d={args:{min:0,max:100,defaultValue:[30,60]},render:r=>e.jsx(s,{...r,multiple:!0,className:"trds-w-48"})};var m,p,c;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" />;
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var u,i,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" disabled={true} />;
  }
}`,...(x=(i=n.parameters)==null?void 0:i.docs)==null?void 0:x.source}}};var S,g,f;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className="trds-w-48" />;
  }
}`,...(f=(g=t.parameters)==null?void 0:g.docs)==null?void 0:f.source}}};var k,N,w;l.parameters={...l.parameters,docs:{...(k=l.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Slider {...props} size={'sm'} className="trds-w-48" />
        <Slider {...props} size={'md'} className="trds-w-48" />
        <Slider {...props} size={'lg'} className="trds-w-48" />
      </div>;
  }
}`,...(w=(N=l.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};var v,V,b;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    const markers = [{
      value: 0,
      marker: '0'
    }, {
      value: 20,
      marker: '20'
    }, {
      value: 40,
      marker: '40'
    }, {
      value: 60,
      marker: '60'
    }, {
      value: 80,
      marker: '80'
    }, {
      value: 100,
      marker: '100'
    }];
    return <Slider {...props} markers={markers} className="trds-w-48 trds-text-blackAlpha-500" />;
  }
}`,...(b=(V=o.parameters)==null?void 0:V.docs)==null?void 0:b.source}}};var j,z,P;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30, 60]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} multiple={true} className="trds-w-48" />;
  }
}`,...(P=(z=d.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};const H=["Default","Disabled","Step","Size","Markers","Multiple"];export{a as Default,n as Disabled,o as Markers,d as Multiple,l as Size,t as Step,H as __namedExportsOrder,G as default};
