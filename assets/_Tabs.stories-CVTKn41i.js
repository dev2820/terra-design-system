import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as b,T as m,C as x,L as j,I as R}from"./Tabs-CKnKsQ-a.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BXR9Yyrn.js";import"./index-DRtd-hRg.js";import"./index-6Viw2UEs.js";import"./index-BR8t6gqn.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";import"./use-presence-BYwEg9-n.js";const a={Root:b,Trigger:m,Content:x,List:j,Indicator:R},F={title:"Components/Tabs",component:a.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:["sm","md","lg"],control:{type:"select"}},variant:{options:["enclosed","line","outline"],control:{type:"select"}}},args:{size:"md",variant:"line"}},t={args:{defaultValue:"react"},render:s=>e.jsxs(a.Root,{...s,children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",disabled:!0,children:"Vue"}),e.jsx(a.Trigger,{value:"svelte",children:"Svelte"}),e.jsx(a.Trigger,{value:"solid",children:"Solid"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"}),e.jsx(a.Content,{value:"svelte",children:"Svelte is awesome"}),e.jsx(a.Content,{value:"solid",children:"Solid is awesome"})]})},r={args:{defaultValue:"react"},render:s=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-96 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(a.Root,{...s,size:"sm",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{...s,size:"md",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{...s,size:"lg",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]})]})})},n={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-96 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(a.Root,{variant:"enclosed",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{variant:"line",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]}),e.jsxs(a.Root,{variant:"outline",defaultValue:"react",children:[e.jsxs(a.List,{children:[e.jsx(a.Trigger,{value:"react",children:"React"}),e.jsx(a.Trigger,{value:"vue",children:"Vue"}),e.jsx(a.Indicator,{})]}),e.jsx(a.Content,{value:"react",children:"React is awesome"}),e.jsx(a.Content,{value:"vue",children:"Vue is awesome"})]})]})})};var i,o,l;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    defaultValue: 'react'
  },
  render: (props: TabsProps['root']) => {
    return <Tabs.Root {...props}>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue" disabled>
            Vue
          </Tabs.Trigger>
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
}`,...(l=(o=t.parameters)==null?void 0:o.docs)==null?void 0:l.source}}};var c,u,T;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    defaultValue: 'react'
  },
  render: (props: TabsProps['root']) => {
    return <>
        <div className="trds-w-96 trds-flex trds-flex-col trds-gap-4">
          <Tabs.Root {...props} size="sm">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root {...props} size="md">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root {...props} size="lg">
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
}`,...(T=(u=r.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};var d,g,v;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-96 trds-flex trds-flex-col trds-gap-4">
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
}`,...(v=(g=n.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};const P=["Default","Sizes","Variants"];export{t as Default,r as Sizes,n as Variants,P as __namedExportsOrder,F as default};
