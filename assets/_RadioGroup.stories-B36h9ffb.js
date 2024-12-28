import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as I,I as v}from"./RadioGroup-JBTXVWbV.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-OP0vtUYM.js";import"./index-BR8t6gqn.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";const t={Root:I,Item:v},a=["sm","md","lg"],E={title:"Components/RadioGroup",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:a,control:{type:"select"}}},args:{size:a[1]}},o={args:{},render:G=>e.jsxs(t.Root,{...G,children:[e.jsx(t.Item,{value:"react",children:"React"}),e.jsx(t.Item,{value:"vue",children:"Vue"}),e.jsx(t.Item,{value:"svelte",children:"Svelte"}),e.jsx(t.Item,{value:"solid",children:"Solid"})]})},r={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(t.Root,{size:"sm",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"})]}),e.jsx("hr",{}),e.jsxs(t.Root,{size:"md",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"})]}),e.jsx("hr",{}),e.jsxs(t.Root,{size:"lg",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"})]})]})})},i={args:{},render:()=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(t.Root,{defaultValue:"item 1",disabled:!0,children:[e.jsx(t.Item,{value:"item 1",children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"})]}),e.jsx("hr",{}),e.jsxs(t.Root,{size:"md",defaultValue:"item 1",children:[e.jsx(t.Item,{value:"item 1",disabled:!0,children:"item 1"}),e.jsx(t.Item,{value:"item 2",children:"item 2"})]})]})})};var s,m,d;o.parameters={...o.parameters,docs:{...(s=o.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {},
  render: (props: RadioGroupProps) => {
    return <RadioGroup.Root {...props}>
        <RadioGroup.Item value="react">React</RadioGroup.Item>
        <RadioGroup.Item value="vue">Vue</RadioGroup.Item>
        <RadioGroup.Item value="svelte">Svelte</RadioGroup.Item>
        <RadioGroup.Item value="solid">Solid</RadioGroup.Item>
      </RadioGroup.Root>;
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var u,l,n;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root size="sm" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="lg" defaultValue="item 1">
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>;
  }
}`,...(n=(l=r.parameters)==null?void 0:l.docs)==null?void 0:n.source}}};var p,R,c;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root defaultValue="item 1" disabled>
            <RadioGroup.Item value="item 1">item 1</RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" defaultValue="item 1">
            <RadioGroup.Item value="item 1" disabled>
              item 1
            </RadioGroup.Item>
            <RadioGroup.Item value="item 2">item 2</RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>;
  }
}`,...(c=(R=i.parameters)==null?void 0:R.docs)==null?void 0:c.source}}};const F=["Default","Sizes","Disabled"];export{o as Default,i as Disabled,r as Sizes,F as __namedExportsOrder,E as default};
