import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{r as l}from"./index-CDs2tPxN.js";import{c as j,b as D,d as x}from"./cva-DWZhh4fZ.js";const _=j({base:{display:"inline-flex",alignItems:"center",whiteSpace:"nowrap",rounded:"full",fontSize:"xs",fontWeight:"semibold",border:"1px solid",paddingX:2.5,paddingY:.5,transitionProperty:"color"},variants:{variant:{filled:{borderColor:"transparent"},subtle:{borderColor:"transparent"},outline:{bg:"transparent"}},theme:{primary:{},info:{},success:{},error:{},warning:{}}},compoundVariants:[{variant:"filled",theme:"primary",css:{bg:"primary.500",color:"primary.foreground"}},{variant:"filled",theme:"error",css:{bg:"error",color:"error.foreground"}},{variant:"filled",theme:"warning",css:{bg:"warning",color:"warning.foreground"}},{variant:"filled",theme:"success",css:{bg:"success",color:"success.foreground"}},{variant:"filled",theme:"info",css:{bg:"info",color:"info.foreground"}},{variant:"subtle",theme:"primary",css:{bg:"primary.light",color:"primary"}},{variant:"subtle",theme:"error",css:{bg:"error.light",color:"error"}},{variant:"subtle",theme:"warning",css:{bg:"warning.light",color:"warning"}},{variant:"subtle",theme:"success",css:{bg:"success.light",color:"success"}},{variant:"subtle",theme:"info",css:{bg:"info.light",color:"info"}},{variant:"outline",theme:"primary",css:{color:"primary",borderColor:"primary"}},{variant:"outline",theme:"error",css:{color:"error",borderColor:"error"}},{variant:"outline",theme:"warning",css:{color:"warning",borderColor:"warning"}},{variant:"outline",theme:"success",css:{color:"success",borderColor:"success"}},{variant:"outline",theme:"info",css:{color:"info",borderColor:"info"}}],defaultVariants:{variant:"filled",theme:"primary"}}),a=l.forwardRef(function(r,e){const{text:y,variant:w,theme:B,className:C,...N}=r;return t.jsx("span",{className:D(_({variant:w,theme:B}),C),ref:e,...N,children:y})});a.__docgenInfo={description:"",methods:[],displayName:"Badge"};const i=["primary","error","warning","info","success"],c=["filled","outline","subtle"],k={title:"Components/Badge",component:a,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:c,control:{type:"select"}},theme:{options:i,control:{type:"select"}}},args:{variant:c[0],theme:i[0]}},s={args:{text:"new"},render:r=>t.jsx(a,{...r})},o={args:{text:"new"},render:r=>t.jsx("div",{className:x({display:"flex",flexDir:"row",gap:4}),children:c.map(e=>l.createElement(a,{...r,variant:e,key:e}))})},n={args:{text:"new"},render:r=>t.jsx("div",{className:x({display:"flex",flexDir:"row",gap:4}),children:i.map(e=>l.createElement(a,{...r,theme:e,key:e}))})};var d,p,m;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    text: 'new'
  },
  render: (props: BadgeProps) => {
    return <Badge {...props} />;
  }
}`,...(m=(p=s.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var g,u,f;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(f=(u=o.parameters)==null?void 0:u.docs)==null?void 0:f.source}}};var h,v,b;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
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
}`,...(b=(v=n.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};const P=["Default","Variant","Theme"];export{s as Default,n as Theme,o as Variant,P as __namedExportsOrder,k as default};
