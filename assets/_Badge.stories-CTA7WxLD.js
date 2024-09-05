import{j as c}from"./jsx-runtime-qGIIFXMu.js";import{r as d}from"./index-CDs2tPxN.js";import{B as t}from"./Badge-oZjtibBZ.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";const s=["primary","error","warning","info","success"],m=["filled","subtle","outline"],b={title:"Components/Badge",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:m,control:{type:"select"}},theme:{options:s,control:{type:"select"}}},args:{variant:m[0],theme:s[0]}},a={args:{text:"new"},render:r=>c.jsx(t,{...r})},n={args:{text:"new"},render:r=>c.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:m.map(e=>d.createElement(t,{...r,variant:e,key:e}))})},o={args:{text:"new"},render:r=>c.jsxs("div",{className:"trds-grid trds-grid-rows-3 trds-grid-cols-5 trds-gap-4",children:[s.map(e=>d.createElement(t,{...r,theme:e,key:e})),s.map(e=>d.createElement(t,{...r,theme:e,key:"subtle-"+e,variant:"subtle"})),s.map((e,f)=>d.createElement(t,{...r,theme:e,key:"outline-"+e,className:`trds-columns-${f}`,variant:"outline"}))]})};var p,i,l;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  }
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var g,u,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <Badge {...props} variant={variant} key={variant} />)}
      </div>;
  }
}`,...(x=(u=n.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var v,h,y;o.parameters={...o.parameters,docs:{...(v=o.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className="trds-grid trds-grid-rows-3 trds-grid-cols-5 trds-gap-4">
        {themes.map(color => <Badge {...props} theme={color} key={color} />)}
        {themes.map(color => <Badge {...props} theme={color} key={\`subtle-\` + color} variant="subtle" />)}
        {themes.map((color, i) => <Badge {...props} theme={color} key={\`outline-\` + color} className={\`trds-columns-\${i}\`} variant="outline" />)}
      </div>;
  }
}`,...(y=(h=o.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const j=["Default","Variant","Theme"];export{a as Default,o as Theme,n as Variant,j as __namedExportsOrder,b as default};
