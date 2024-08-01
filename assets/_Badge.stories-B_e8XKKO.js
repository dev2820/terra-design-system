import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{r as m}from"./index-CDs2tPxN.js";import{a as p}from"./cva-C095pwBQ.js";import{B as a}from"./Badge-cQvqgMYI.js";const s=["primary","error","warning","info","success"],c=["filled","outline","subtle"],N={title:"Components/Badge",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:c,control:{type:"select"}},theme:{options:s,control:{type:"select"}}},args:{variant:c[0],theme:s[0]}},t={args:{text:"new"},render:r=>i.jsx(a,{...r})},n={args:{text:"new"},render:r=>i.jsx("div",{className:p({display:"flex",flexDir:"row",gap:4}),children:c.map(e=>m.createElement(a,{...r,variant:e,key:e}))})},o={args:{text:"new"},render:r=>i.jsxs("div",{className:p({display:"grid",gridTemplateRows:3,gridTemplateColumns:5,gap:4}),children:[s.map(e=>m.createElement(a,{...r,theme:e,key:e})),s.map((e,B)=>m.createElement(a,{...r,theme:e,key:"outline-"+e,className:p({columnSpan:`${B}`}),variant:"outline"})),s.map(e=>m.createElement(a,{...r,theme:e,key:"subtle-"+e,variant:"subtle"}))]})};var l,d,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  }
}`,...(u=(d=t.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var g,x,v;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(x=n.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var y,h,f;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <div className={css({
      display: 'grid',
      gridTemplateRows: 3,
      gridTemplateColumns: 5,
      gap: 4
    })}>
        {themes.map(color => <Badge {...props} theme={color} key={color} />)}
        {themes.map((color, i) => <Badge {...props} theme={color} key={\`outline-\` + color} className={css({
        columnSpan: \`\${i}\`
      })} variant="outline" />)}
        {themes.map(color => <Badge {...props} theme={color} key={\`subtle-\` + color} variant="subtle" />)}
      </div>;
  }
}`,...(f=(h=o.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};const b=["Default","Variant","Theme"];export{t as Default,o as Theme,n as Variant,b as __namedExportsOrder,N as default};
