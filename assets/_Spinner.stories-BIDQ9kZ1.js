import{j as s}from"./jsx-runtime-qGIIFXMu.js";import{r as E}from"./index-CDs2tPxN.js";import{S as e}from"./Spinner-Cmv6BC9H.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";const d=["xs","sm","md","lg","xl"],w={title:"Components/Spinner",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:d,control:{type:"select"}}},args:{size:d[2]}},n={args:{label:"loading..."},render:r=>s.jsx(e,{...r})},a={args:{label:"loading..."},render:r=>s.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:d.map(l=>E.createElement(e,{...r,size:l,key:l}))})},o={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:"trds-border-b-blue-500 trds-border-l-blue-500"})},t={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:"trds-border-green-500"})},p={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:"trds-border-4"})};var i,c,m;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} />;
  }
}`,...(m=(c=n.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,g,b;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {sizes.map(size => <Spinner {...props} size={size} key={size} />)}
      </div>;
  }
}`,...(b=(g=a.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var S,x,f;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className="trds-border-b-blue-500 trds-border-l-blue-500" />;
  }
}`,...(f=(x=o.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var z,N,j;t.parameters={...t.parameters,docs:{...(z=t.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className="trds-border-green-500" />;
  }
}`,...(j=(N=t.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var y,P,k;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className="trds-border-4" />;
  }
}`,...(k=(P=p.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};const D=["Default","Size","Color","Track","Width"];export{o as Color,n as Default,a as Size,t as Track,p as Width,D as __namedExportsOrder,w as default};
