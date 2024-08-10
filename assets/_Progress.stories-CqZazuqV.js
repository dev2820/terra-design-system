import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as o}from"./cva-C095pwBQ.js";import{R as s}from"./Progress-D5OtsNvp.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-D5jZQDUh.js";import"./index-DJ3ti8gJ.js";import"./create-split-props-u5h9OPvL.js";import"./use-locale-context-B5vdPRI5.js";const c=["sm","md","lg","icon"],t=["linear","circular"],b={title:"Components/Progress",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:c,control:{type:"select"}},variant:{options:t,control:{type:"select"}}},args:{size:c[1],variant:t[0]}},a={args:{},render:e=>r.jsx(s,{...e,className:o({w:400})})},n={args:{},render:()=>r.jsx("div",{className:o({width:400,display:"flex",flexDir:"column",gap:4}),children:t.map(e=>r.jsx(s,{variant:e},e))})},i={args:{},render:()=>r.jsxs(r.Fragment,{children:[r.jsxs("div",{className:o({width:400,display:"flex",flexDir:"column",gap:4,mb:4}),children:[r.jsx(s,{size:"sm"}),r.jsx(s,{size:"md"}),r.jsx(s,{size:"lg"})]}),r.jsxs("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(s,{size:"sm",variant:"circular"}),r.jsx(s,{size:"md",variant:"circular"}),r.jsx(s,{size:"lg",variant:"circular"})]})]})};var l,m,p;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: (props: ProgressProps) => {
    return <Progress {...props} className={css({
      w: 400
    })} />;
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var d,g,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      width: 400,
      display: 'flex',
      flexDir: 'column',
      gap: 4
    })}>
        {variants.map(variant => <Progress variant={variant} key={variant}></Progress>)}
      </div>;
  }
}`,...(u=(g=n.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var x,v,P;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className={css({
        width: 400,
        display: 'flex',
        flexDir: 'column',
        gap: 4,
        mb: 4
      })}>
          <Progress size="sm"></Progress>
          <Progress size="md"></Progress>
          <Progress size="lg"></Progress>
        </div>
        <div className={css({
        display: 'flex',
        flexDir: 'row',
        gap: 4
      })}>
          <Progress size="sm" variant="circular"></Progress>
          <Progress size="md" variant="circular"></Progress>
          <Progress size="lg" variant="circular"></Progress>
        </div>
      </>;
  }
}`,...(P=(v=i.parameters)==null?void 0:v.docs)==null?void 0:P.source}}};const E=["Default","Variant","Sizes"];export{a as Default,i as Sizes,n as Variant,E as __namedExportsOrder,b as default};
