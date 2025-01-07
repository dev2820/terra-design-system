import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{r as d}from"./index-CDs2tPxN.js";import{B as s}from"./Badge-CEU1QJKy.js";import"./tv-CIwtzMts.js";const a=["primary","danger","warning","info","success"],c=["filled","subtle","outline"],N={title:"Components/Badge",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:c,control:{type:"select"}},theme:{options:a,control:{type:"select"}}},args:{variant:c[0],theme:a[0]}},t={args:{children:"new"},render:r=>i.jsx(s,{...r})},n={args:{children:"new"},render:r=>i.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:c.map(e=>d.createElement(s,{...r,variant:e,key:e}))})},o={args:{children:"new"},render:r=>i.jsxs("div",{className:"trds-grid trds-grid-rows-3 trds-grid-cols-5 trds-gap-4",children:[a.map(e=>d.createElement(s,{...r,theme:e,key:e})),a.map(e=>d.createElement(s,{...r,theme:e,key:"subtle-"+e,variant:"subtle"})),a.map((e,x)=>d.createElement(s,{...r,theme:e,key:"outline-"+e,className:`trds-columns-${x}`,variant:"outline"}))]})};var m,l,p;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    children: 'new'
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  }
}`,...(p=(l=t.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var g,u,h;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <Badge {...props} variant={variant} key={variant} />)}
      </div>;
  }
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var v,y,f;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    children: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className="trds-grid trds-grid-rows-3 trds-grid-cols-5 trds-gap-4">
        {themes.map(color => <Badge {...props} theme={color} key={color} />)}
        {themes.map(color => <Badge {...props} theme={color} key={\`subtle-\` + color} variant="subtle" />)}
        {themes.map((color, i) => <Badge {...props} theme={color} key={\`outline-\` + color} className={\`trds-columns-\${i}\`} variant="outline" />)}
      </div>;
  }
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};const b=["Default","Variant","Theme"];export{t as Default,o as Theme,n as Variant,b as __namedExportsOrder,N as default};
