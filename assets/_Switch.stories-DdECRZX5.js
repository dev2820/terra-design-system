import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as z}from"./cva-C095pwBQ.js";import{R as r}from"./Switch-C030RyIV.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./use-locale-context-xdwXIAIs.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./index-FIiQIfFx.js";import"./index-Bc7AdKyF.js";import"./use-event-eGuf5zsd.js";const o=["sm","md","lg"],O={title:"Components/Switch",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:o,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:o[1],disabled:!1,invalid:!1}},s={args:{},render:w=>e.jsx(r,{...w})},t={args:{},render:()=>e.jsxs("div",{className:z({display:"flex",flexDir:"column",alignItems:"center",gap:4,width:100,height:120}),children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},a={args:{},render:()=>e.jsx(r,{disabled:!0})},n={args:{},render:()=>e.jsx(r,{invalid:!0})};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: SwitchProps) => {
    return <Switch {...props}></Switch>;
  }
}`,...(d=(c=s.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var m,p,l;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'column',
      alignItems: 'center',
      gap: 4,
      width: 100,
      height: 120
    })}>
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
      </div>;
  }
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var u,g,h;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Switch disabled />;
  }
}`,...(h=(g=a.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var S,x,f;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Switch invalid />;
  }
}`,...(f=(x=n.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const P=["Default","Sizes","Disabled","Invalid"];export{s as Default,a as Disabled,n as Invalid,t as Sizes,P as __namedExportsOrder,O as default};
