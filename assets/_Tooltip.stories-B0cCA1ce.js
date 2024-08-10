import{j as o}from"./jsx-runtime-qGIIFXMu.js";import{a as s}from"./cva-C095pwBQ.js";import{R as I,T as f,C as h,A as j}from"./Tooltip-h7aSxu8v.js";import{I as i}from"./info-CEHfXOTA.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./create-split-props-B1LGkfrB.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CfI1cghP.js";import"./index-DJ3ti8gJ.js";import"./use-presence-JGUWPUYJ.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-D9IGhxAv.js";import"./index-DBvQjjJd.js";import"./index-DtKw-7gC.js";import"./createLucideIcon-zijr-BYg.js";const e={Root:I,Trigger:f,Content:h,Arrow:j},O={title:"Components/Tooltip",component:e.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/tooltip"}}},tags:["autodocs"],argTypes:{},args:{}},r={args:{},render:a=>o.jsxs(e.Root,{...a,children:[o.jsxs(e.Trigger,{className:s({display:"inline-flex",alignItems:"center",gap:1}),children:[o.jsx(i,{size:16})," Hover me"]}),o.jsx(e.Content,{children:"I am a Tooltip"})]})},t={args:{},render:a=>o.jsxs(e.Root,{...a,children:[o.jsxs(e.Trigger,{className:s({display:"inline-flex",alignItems:"center",gap:1}),children:[o.jsx(i,{size:16})," Hover me"]}),o.jsxs(e.Content,{children:[o.jsx(e.Arrow,{}),"I am a Tooltip"]})]})},n={args:{},render:()=>o.jsxs("div",{children:[o.jsxs(e.Root,{theme:"neutral",children:[o.jsxs(e.Trigger,{className:s({display:"inline-flex",alignItems:"center",gap:1,mr:4}),children:[o.jsx(i,{size:16})," Neutral (Default)"]}),o.jsx(e.Content,{children:"I am a Tooltip"})]}),o.jsxs(e.Root,{theme:"primary",children:[o.jsxs(e.Trigger,{className:s({display:"inline-flex",alignItems:"center",gap:1}),children:[o.jsx(i,{size:16})," Primary"]}),o.jsx(e.Content,{children:"I am a Tooltip"})]})]})};var p,l,m;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: (props: TooltipProps['root']) => {
    return <Tooltip.Root {...props}>
        <Tooltip.Trigger className={css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1
      })}>
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Content>I am a Tooltip</Tooltip.Content>
      </Tooltip.Root>;
  }
}`,...(m=(l=r.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var c,T,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: (props: TooltipProps['root']) => {
    return <Tooltip.Root {...props}>
        <Tooltip.Trigger className={css({
        display: 'inline-flex',
        alignItems: 'center',
        gap: 1
      })}>
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />I am a Tooltip
        </Tooltip.Content>
      </Tooltip.Root>;
  }
}`,...(g=(T=t.parameters)==null?void 0:T.docs)==null?void 0:g.source}}};var d,x,u;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div>
        <Tooltip.Root theme="neutral">
          <Tooltip.Trigger className={css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1,
          mr: 4
        })}>
            <InfoIcon size={16} /> Neutral (Default)
          </Tooltip.Trigger>
          <Tooltip.Content>I am a Tooltip</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root theme="primary">
          <Tooltip.Trigger className={css({
          display: 'inline-flex',
          alignItems: 'center',
          gap: 1
        })}>
            <InfoIcon size={16} /> Primary
          </Tooltip.Trigger>
          <Tooltip.Content>I am a Tooltip</Tooltip.Content>
        </Tooltip.Root>
      </div>;
  }
}`,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};const q=["Default","WithArrow","Theme"];export{r as Default,n as Theme,t as WithArrow,q as __namedExportsOrder,O as default};
