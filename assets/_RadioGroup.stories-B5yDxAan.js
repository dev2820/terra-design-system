import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as G,I as j,a as h,b as v,c as b,L as T,d as f}from"./RadioGroup-CPP7LEAz.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";import"./index-DBzJ7FiP.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";const o={Root:G,Item:j,ItemControl:h,ItemText:v,ItemHiddenInput:b,Label:T,Indicator:f},i=["sm","md","lg"],P={title:"Components/RadioGroup",component:o.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:i,control:{type:"select"}}},args:{size:i[1]}},a={args:{},render:t=>e.jsxs(o.Root,{...t,children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),["vue","react","solid"].map(r=>e.jsxs(o.Item,{value:r,children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:r}),e.jsx(o.ItemHiddenInput,{})]},r))]})},d={args:{defaultValue:"vue"},render:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(o.Root,{...t,size:"sm",children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),["vue","react","solid"].map(r=>e.jsxs(o.Item,{value:r,children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:r}),e.jsx(o.ItemHiddenInput,{})]},r))]}),e.jsx("hr",{}),e.jsxs(o.Root,{size:"md",...t,children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),["vue","react","solid"].map(r=>e.jsxs(o.Item,{value:r,children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:r}),e.jsx(o.ItemHiddenInput,{})]},r))]}),e.jsx("hr",{}),e.jsxs(o.Root,{size:"lg",...t,children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),["vue","react","solid"].map(r=>e.jsxs(o.Item,{value:r,children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:r}),e.jsx(o.ItemHiddenInput,{})]},r))]})]})})},n={args:{defaultValue:"item1"},render:t=>e.jsx(e.Fragment,{children:e.jsxs("div",{className:"trds-w-48 trds-flex trds-flex-col trds-gap-4",children:[e.jsxs(o.Root,{...t,disabled:!0,children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),e.jsxs(o.Item,{value:"item1",children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:"item1"}),e.jsx(o.ItemHiddenInput,{})]}),e.jsxs(o.Item,{value:"item2",children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:"item2"}),e.jsx(o.ItemHiddenInput,{})]})]}),e.jsx("hr",{}),e.jsxs(o.Root,{...t,children:[e.jsx(o.Label,{children:"Framework"}),e.jsx(o.Indicator,{}),e.jsxs(o.Item,{value:"item1",disabled:!0,children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:"item1"}),e.jsx(o.ItemHiddenInput,{})]}),e.jsxs(o.Item,{value:"item2",children:[e.jsx(o.ItemControl,{}),e.jsx(o.ItemText,{children:"item2"}),e.jsx(o.ItemHiddenInput,{})]})]})]})})};var s,m,p;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {},
  render: (props: RadioGroupProps['Root']) => {
    return <RadioGroup.Root {...props}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        <RadioGroup.Indicator />
        {['vue', 'react', 'solid'].map(framework => <RadioGroup.Item key={framework} value={framework}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>)}
      </RadioGroup.Root>;
  }
}`,...(p=(m=a.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var u,l,I;d.parameters={...d.parameters,docs:{...(u=d.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    defaultValue: 'vue'
  },
  render: (props: RadioGroupProps['Root']) => {
    return <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root {...props} size="sm">
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>)}
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="md" {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>)}
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root size="lg" {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            {['vue', 'react', 'solid'].map(framework => <RadioGroup.Item key={framework} value={framework}>
                <RadioGroup.ItemControl />
                <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
                <RadioGroup.ItemHiddenInput />
              </RadioGroup.Item>)}
          </RadioGroup.Root>
        </div>
      </>;
  }
}`,...(I=(l=d.parameters)==null?void 0:l.docs)==null?void 0:I.source}}};var R,x,c;n.parameters={...n.parameters,docs:{...(R=n.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    defaultValue: 'item1'
  },
  render: (props: RadioGroupProps['Root']) => {
    return <>
        <div className="trds-w-48 trds-flex trds-flex-col trds-gap-4">
          <RadioGroup.Root {...props} disabled>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            <RadioGroup.Item value={'item1'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item1</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item value={'item2'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item2</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </RadioGroup.Root>
          <hr />
          <RadioGroup.Root {...props}>
            <RadioGroup.Label>Framework</RadioGroup.Label>
            <RadioGroup.Indicator />
            <RadioGroup.Item value={'item1'} disabled>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item1</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
            <RadioGroup.Item value={'item2'}>
              <RadioGroup.ItemControl />
              <RadioGroup.ItemText>item2</RadioGroup.ItemText>
              <RadioGroup.ItemHiddenInput />
            </RadioGroup.Item>
          </RadioGroup.Root>
        </div>
      </>;
  }
}`,...(c=(x=n.parameters)==null?void 0:x.docs)==null?void 0:c.source}}};const E=["Default","Sizes","Disabled"];export{a as Default,n as Disabled,d as Sizes,E as __namedExportsOrder,P as default};
