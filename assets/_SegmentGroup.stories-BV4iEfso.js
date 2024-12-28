import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as j,I as h,a as R}from"./SegmentGroup-DzgIVQ3Z.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-BcpZ0LeP.js";import"./index-BR8t6gqn.js";import"./index-DBzJ7FiP.js";import"./index-6Viw2UEs.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";const t={Root:j,Item:h,Indicator:R},a=["sm","md","lg"],O={title:"Components/SegmentGroup",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:a,control:{type:"select"}}},args:{size:a[1]}},r={args:{defaultValue:"react"},render:s=>e.jsxs(t.Root,{...s,children:[e.jsx(t.Item,{value:"react",children:"React"}),e.jsx(t.Item,{value:"vue",children:"Vue"}),e.jsx(t.Item,{value:"svelte",children:"Svelte"}),e.jsx(t.Item,{value:"solid",children:"Solid"}),e.jsx(t.Indicator,{})]})},n={args:{defaultValue:"react",orientation:"horizontal"},render:s=>e.jsxs(t.Root,{...s,children:[e.jsx(t.Item,{value:"react",children:"React"}),e.jsx(t.Item,{value:"vue",children:"Vue"}),e.jsx(t.Item,{value:"svelte",children:"Svelte"}),e.jsx(t.Item,{value:"solid",children:"Solid"}),e.jsx(t.Indicator,{})]})},o={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-72 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(t.Root,{size:"sm",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"}),e.jsx(t.Indicator,{})]}),e.jsx("hr",{}),e.jsxs(t.Root,{size:"md",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"}),e.jsx(t.Indicator,{})]})]})})},m={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-72 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(t.Root,{defaultValue:"item 1",disabled:!0,children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"}),e.jsx(t.Indicator,{})]}),e.jsx("hr",{}),e.jsxs(t.Root,{size:"md",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",disabled:!0,children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"}),e.jsx(t.Indicator,{})]})]})})};var u,i,l;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    defaultValue: 'react'
  },
  render: (props: SegmentGroupProps) => {
    return <SegmentGroup.Root {...props}>
        <SegmentGroup.Item value="react">React</SegmentGroup.Item>
        <SegmentGroup.Item value="vue">Vue</SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">Svelte</SegmentGroup.Item>
        <SegmentGroup.Item value="solid">Solid</SegmentGroup.Item>
        <SegmentGroup.Indicator />
      </SegmentGroup.Root>;
  }
}`,...(l=(i=r.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,p,c;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    defaultValue: 'react',
    orientation: 'horizontal'
  },
  render: (props: SegmentGroupProps) => {
    return <SegmentGroup.Root {...props}>
        <SegmentGroup.Item value="react">React</SegmentGroup.Item>
        <SegmentGroup.Item value="vue">Vue</SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">Svelte</SegmentGroup.Item>
        <SegmentGroup.Item value="solid">Solid</SegmentGroup.Item>
        <SegmentGroup.Indicator />
      </SegmentGroup.Root>;
  }
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var g,S,I;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-72 trds-flex trds-flex-col trds-gap-4">
          <SegmentGroup.Root size="sm" defaultValue="item 1">
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item 1">
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </>;
  }
}`,...(I=(S=o.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var G,v,x;m.parameters={...m.parameters,docs:{...(G=m.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-72 trds-flex trds-flex-col trds-gap-4">
          <SegmentGroup.Root defaultValue="item 1" disabled>
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item 1">
            <SegmentGroup.Item value="item 1" disabled>
              item 1
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </>;
  }
}`,...(x=(v=m.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};const T=["Default","Horizontal","Sizes","Disabled"];export{r as Default,m as Disabled,n as Horizontal,o as Sizes,T as __namedExportsOrder,O as default};