import{j as o}from"./jsx-runtime-qGIIFXMu.js";import{R as u,T as h,C as f,A as j}from"./Tooltip-CESLYyH2.js";import{I as n}from"./info-CEHfXOTA.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./use-presence-8bHCsiKP.js";import"./use-event-eGuf5zsd.js";import"./index-CTARPo-3.js";import"./create-split-props-u5h9OPvL.js";import"./index-DE2wJq7j.js";import"./index-1fMUQAsE.js";import"./use-locale-context-D5jQfAP4.js";import"./createLucideIcon-zijr-BYg.js";const r={Root:u,Trigger:h,Content:f,Arrow:j},b={title:"Components/Tooltip",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/tooltip"}}},tags:["autodocs"],argTypes:{},args:{}},t={args:{},render:i=>o.jsxs(r.Root,{...i,children:[o.jsxs(r.Trigger,{className:"trds-inline-flex trds-items-center trds-gap-1",children:[o.jsx(n,{size:16})," Hover me"]}),o.jsx(r.Content,{children:"I am a Tooltip"})]})},e={args:{},render:i=>o.jsxs(r.Root,{...i,children:[o.jsxs(r.Trigger,{className:"trds-inline-flex trds-items-center trds-gap-1",children:[o.jsx(n,{size:16})," Hover me"]}),o.jsxs(r.Content,{children:[o.jsx(r.Arrow,{}),"I am a Tooltip"]})]})},s={args:{},render:()=>o.jsxs("div",{children:[o.jsxs(r.Root,{theme:"neutral",children:[o.jsxs(r.Trigger,{className:"trds-inline-flex trds-items-center trds-gap-1 trds-mr-4",children:[o.jsx(n,{size:16})," Neutral (Default)"]}),o.jsx(r.Content,{children:"I am a Tooltip"})]}),o.jsxs(r.Root,{theme:"primary",children:[o.jsxs(r.Trigger,{className:"trds-inline-flex trds-items-center trds-gap-1 trds-mr-4",children:[o.jsx(n,{size:16})," Primary"]}),o.jsx(r.Content,{children:"I am a Tooltip"})]})]})};var a,p,l;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {},
  render: (props: TooltipProps['root']) => {
    return <Tooltip.Root {...props}>
        <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1">
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Content>I am a Tooltip</Tooltip.Content>
      </Tooltip.Root>;
  }
}`,...(l=(p=t.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};var m,d,c;e.parameters={...e.parameters,docs:{...(m=e.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  render: (props: TooltipProps['root']) => {
    return <Tooltip.Root {...props}>
        <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1">
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />I am a Tooltip
        </Tooltip.Content>
      </Tooltip.Root>;
  }
}`,...(c=(d=e.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var T,g,x;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div>
        <Tooltip.Root theme="neutral">
          <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1 trds-mr-4">
            <InfoIcon size={16} /> Neutral (Default)
          </Tooltip.Trigger>
          <Tooltip.Content>I am a Tooltip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root theme="primary">
          <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1 trds-mr-4">
            <InfoIcon size={16} /> Primary
          </Tooltip.Trigger>
          <Tooltip.Content>I am a Tooltip</Tooltip.Content>
        </Tooltip.Root>
      </div>;
  }
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const k=["Default","WithArrow","Theme"];export{t as Default,s as Theme,e as WithArrow,k as __namedExportsOrder,b as default};
