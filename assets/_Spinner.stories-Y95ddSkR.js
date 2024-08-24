import{j as s}from"./jsx-runtime-qGIIFXMu.js";import{r as k}from"./index-CDs2tPxN.js";import{a as l}from"./index-CO00fS6N.js";import{S as e}from"./Spinner-C_ADIHlm.js";const i=["xs","sm","md","lg","xl"],v={title:"Components/Spinner",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:i,control:{type:"select"}}},args:{size:i[2]}},n={args:{label:"loading..."},render:r=>s.jsx(e,{...r})},o={args:{label:"loading..."},render:r=>s.jsx("div",{className:l({display:"flex",flexDir:"row",gap:4}),children:i.map(c=>k.createElement(e,{...r,size:c,key:c}))})},a={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:l({borderBottomColor:"blue",borderLeftColor:"blue"})})},t={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:l({borderColor:"neutral.300"})})},p={args:{label:"loading..."},render:r=>s.jsx(e,{...r,className:l({borderWidth:4})})};var d,m,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} />;
  }
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,b,S;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {sizes.map(size => <Spinner {...props} size={size} key={size} />)}
      </div>;
  }
}`,...(S=(b=o.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var x,f,z;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderBottomColor: 'blue',
      borderLeftColor: 'blue'
    })} />;
  }
}`,...(z=(f=a.parameters)==null?void 0:f.docs)==null?void 0:z.source}}};var C,N,j;t.parameters={...t.parameters,docs:{...(C=t.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderColor: 'neutral.300'
    })} />;
  }
}`,...(j=(N=t.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var y,h,P;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderWidth: 4
    })} />;
  }
}`,...(P=(h=p.parameters)==null?void 0:h.docs)==null?void 0:P.source}}};const T=["Default","Size","Color","Track","Width"];export{a as Color,n as Default,o as Size,t as Track,p as Width,T as __namedExportsOrder,v as default};
