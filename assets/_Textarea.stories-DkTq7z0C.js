import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{b as _,c as D,a as C}from"./cva-C095pwBQ.js";import{r as I}from"./index-CDs2tPxN.js";const N=_({base:{appearance:"none",background:"none",borderColor:"neutral.300",borderRadius:"lg",borderWidth:"1px",minWidth:0,outline:0,position:"relative",transitionDuration:"normal",transitionProperty:"border-color, box-shadow",width:"full",_disabled:{opacity:.4,cursor:"not-allowed"},_placeholder:{color:"neutral.400"},_focus:{borderColor:"primary.500",boxShadow:"0 0 0 1px var(--shadow-color)",shadowColor:"primary.500"}},defaultVariants:{size:"md"},variants:{size:{sm:{p:"2.5",fontSize:"sm"},md:{p:"3",fontSize:"md"},lg:{p:"3.5",fontSize:"md"}},invalid:{true:{borderColor:"error.500"}}}}),r=I.forwardRef(function(n,w){const{size:T,invalid:y,disabled:i=!1,className:j,...S}=n;return e.jsx("textarea",{className:D(N({size:T,invalid:y}),j),disabled:i,"aria-disabled":i,ref:w,...S})});r.__docgenInfo={description:"",methods:[],displayName:"Textarea"};const d=["sm","md","lg"],P={title:"Components/Textarea",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:d,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:d[1],disabled:!1,invalid:!1}},a={args:{},render:n=>e.jsx(r,{...n})},s={args:{},render:()=>e.jsxs("div",{className:C({display:"flex",flexDir:"row",alignItems:"flex-start",gap:4,width:600,height:120}),children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},o={args:{},render:()=>e.jsx(r,{disabled:!0,children:"Hello world"})},t={args:{},render:()=>e.jsx(r,{invalid:!0,children:"Hello world"})};var l,c,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: (props: TextareaProps) => {
    return <Textarea {...props}></Textarea>;
  }
}`,...(p=(c=a.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var m,u,x;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      alignItems: 'flex-start',
      gap: 4,
      width: 600,
      height: 120
    })}>
        <Textarea size="sm" />
        <Textarea size="md" />
        <Textarea size="lg" />
      </div>;
  }
}`,...(x=(u=s.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var g,f,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea disabled>Hello world</Textarea>;
  }
}`,...(b=(f=o.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var h,z,v;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Textarea invalid>Hello world</Textarea>;
  }
}`,...(v=(z=t.parameters)==null?void 0:z.docs)==null?void 0:v.source}}};const V=["Default","Sizes","Disabled","Invalid"];export{a as Default,o as Disabled,t as Invalid,s as Sizes,V as __namedExportsOrder,P as default};
