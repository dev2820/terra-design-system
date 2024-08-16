import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as z}from"./cva-C095pwBQ.js";import{R as e}from"./Switch-DMJDMDOm.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./factory-BCwUXDVF.js";import"./index-B-yFm4aN.js";import"./index-Dquv0SIZ.js";import"./index-DJ3ti8gJ.js";import"./create-split-props-u5h9OPvL.js";import"./index-qa1jsk-d.js";import"./index-DBzJ7FiP.js";import"./use-locale-context-0tfyuFre.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-BjqdMh-O.js";const o=["sm","md","lg"],q={title:"Components/Switch",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:o,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:o[1],disabled:!1,invalid:!1}},s={args:{},render:w=>r.jsx(e,{...w})},t={args:{},render:()=>r.jsxs("div",{className:z({display:"flex",flexDir:"column",alignItems:"center",gap:4,width:100,height:120}),children:[r.jsx(e,{size:"sm"}),r.jsx(e,{size:"md"}),r.jsx(e,{size:"lg"})]})},a={args:{},render:()=>r.jsx(e,{disabled:!0})},n={args:{},render:()=>r.jsx(e,{invalid:!0})};var i,c,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(f=(x=n.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const A=["Default","Sizes","Disabled","Invalid"];export{s as Default,a as Disabled,n as Invalid,t as Sizes,A as __namedExportsOrder,q as default};
