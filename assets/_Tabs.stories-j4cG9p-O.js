import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as v}from"./index-CO00fS6N.js";import{R as m,T as x,C as j,L as h,I as p}from"./Tabs-YmLwZExP.js";import"./index-CDs2tPxN.js";import"./sva-qXmx1AZm.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCwUXDVF.js";import"./index-B-yFm4aN.js";import"./index-Dquv0SIZ.js";import"./index-sV3Drpq0.js";import"./index-DJ3ti8gJ.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-B0fJl-aJ.js";import"./index-qa1jsk-d.js";import"./index-BR8t6gqn.js";import"./use-locale-context-0tfyuFre.js";import"./use-event-eGuf5zsd.js";import"./use-presence-zw3amx30.js";const a={Root:m,Trigger:x,Content:j,List:h,Indicator:p},q={title:"Components/Tabs",component:a.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:["sm","md","lg"],control:{type:"select"}},variant:{options:["enclosed","line","outline"],control:{type:"select"}}},args:{size:"md",variant:"line"}},s={args:{defaultValue:"react"},render:b=>e.jsxs(a.Root,{...b,children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Trigger,{value:"svelte",children:"Svelte"}),e.jsx(a.Trigger,{value:"solid",children:"Solid"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"}),e.jsx(a.Content,{value:"svelte",children:"Svelte is awesome"}),e.jsx(a.Content,{value:"solid",children:"Solid is awesome"})]})},t={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:v({width:400,display:"flex",flexDir:"column",gap:4}),children:[e.jsxs(a.Root,{size:"sm",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{size:"md",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{size:"lg",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]})]})})},n={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:v({width:400,display:"flex",flexDir:"column",gap:4}),children:[e.jsxs(a.Root,{variant:"enclosed",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{variant:"line",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{variant:"outline",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]})]})})};var r,i,o;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    defaultValue: 'react'
  },
  render: (props: TabsProps['root']) => {
    return <Tabs.Root {...props}>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="react">React is awesome</Tabs.Content>
        <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
        <Tabs.Content value="svelte">Svelte is awesome</Tabs.Content>
        <Tabs.Content value="solid">Solid is awesome</Tabs.Content>
      </Tabs.Root>;
  }
}`,...(o=(i=s.parameters)==null?void 0:i.docs)==null?void 0:o.source}}};var l,c,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className={css({
        width: 400,
        display: 'flex',
        flexDir: 'column',
        gap: 4
      })}>
          <Tabs.Root size="sm">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root size="md">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root size="lg">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
        </div>
      </>;
  }
}`,...(u=(c=t.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var T,d,g;n.parameters={...n.parameters,docs:{...(T=n.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className={css({
        width: 400,
        display: 'flex',
        flexDir: 'column',
        gap: 4
      })}>
          <Tabs.Root variant="enclosed" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root variant="line" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root variant="outline" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
        </div>
      </>;
  }
}`,...(g=(d=n.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};const A=["Default","Sizes","Variants"];export{s as Default,t as Sizes,n as Variants,A as __namedExportsOrder,q as default};
