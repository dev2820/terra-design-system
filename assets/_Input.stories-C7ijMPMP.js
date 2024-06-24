import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{r as y}from"./index-CDs2tPxN.js";import{b as v,c as I}from"./cva-C095pwBQ.js";const _=v({base:{display:"flex",flexDir:"",height:10,width:"full",rounded:"lg",border:"1px solid",borderColor:"neutral.300",background:"white",paddingX:3,paddingY:2,fontSize:"sm",outline:0,transitionDuration:"normal",transitionProperty:"box-shadow, border-color",transitionTimingFunction:"default",_file:{border:0,bg:"transparent",fontSize:"sm",fontWeight:"medium"},_placeholder:{color:"neutral.400"},_disabled:{cursor:"not-allowed",opacity:50},_focus:{borderColor:"primary.500",boxShadow:"0 0 0 2px var(--shadow-color)",shadowColor:"primary.500"}},variants:{invalid:{true:{borderColor:"error.500"}}}}),e=y.forwardRef(({invalid:r=!1,className:b,type:g,...x},h)=>n.jsx("input",{type:g,className:I(_({invalid:r}),b),ref:h,"aria-invalid":r,...x}));e.displayName="Input";e.__docgenInfo={description:"",methods:[],displayName:"Input",props:{invalid:{defaultValue:{value:"false",computed:!1},required:!1}}};const S={title:"Components/Input",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},type:{options:["text","password","number","file","date"],control:{type:"select"}}},args:{disabled:!1,invalid:!1,type:"text"}},a={args:{placeholder:"input email"},render:r=>n.jsx(e,{...r})},o={args:{},render:()=>n.jsx(e,{placeholder:"input email",disabled:!0})},t={args:{},render:()=>n.jsx(e,{placeholder:"input email",invalid:!0})};var s,i,l;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    placeholder: 'input email'
  },
  render: (props: InputProps) => {
    return <Input {...props} />;
  }
}`,...(l=(i=a.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,p,u;o.parameters={...o.parameters,docs:{...(d=o.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Input placeholder="input email" disabled />;
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var c,m,f;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Input placeholder="input email" invalid />;
  }
}`,...(f=(m=t.parameters)==null?void 0:m.docs)==null?void 0:f.source}}};const C=["Default","Disabled","Invalid"];export{a as Default,o as Disabled,t as Invalid,C as __namedExportsOrder,S as default};
