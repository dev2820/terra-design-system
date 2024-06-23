import{j as c}from"./jsx-runtime-qGIIFXMu.js";import{r as y}from"./index-CDs2tPxN.js";import{a as w}from"./cva-C095pwBQ.js";import{B as t}from"./Badge-cQvqgMYI.js";const o=["primary","error","warning","info","success"],p=["filled","outline","subtle"],E={title:"Components/Badge",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:p,control:{type:"select"}},theme:{options:o,control:{type:"select"}}},args:{variant:p[0],theme:o[0]}},a={args:{text:"new"},render:e=>c.jsx(t,{...e})},s={args:{text:"new"},render:e=>c.jsx("div",{className:w({display:"flex",flexDir:"row",gap:4}),children:p.map(r=>y.createElement(t,{...e,variant:r,key:r}))})},n={args:{text:"new"},render:e=>c.jsx("div",{className:w({display:"flex",flexDir:"row",gap:4}),children:o.map(r=>y.createElement(t,{...e,theme:r,key:r}))})};var i,m,d;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  }
}`,...(d=(m=a.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,g,u;s.parameters={...s.parameters,docs:{...(l=s.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {variants.map(variant => <Badge {...props} variant={variant} key={variant} />)}
      </div>;
  }
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,f,v;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {themes.map(color => <Badge {...props} theme={color} key={color} />)}
      </div>;
  }
}`,...(v=(f=n.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};const k=["Default","Variant","Theme"];export{a as Default,n as Theme,s as Variant,k as __namedExportsOrder,E as default};
