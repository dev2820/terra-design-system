import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{R as w,H as x,C as j,T as b,L as R}from"./Switch-a0BVvoMs.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-D_n9ZWii.js";import"./index-DBzJ7FiP.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Bl-xBte_.js";const r={Root:w,HiddenInput:x,Control:j,Thumb:b,Label:R},i=["sm","md","lg"],N={title:"Components/Switch",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:i,control:{type:"select"}},disabled:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}}},args:{size:i[1],disabled:!1,invalid:!1}},s={args:{},render:o=>t.jsxs(r.Root,{...o,children:[t.jsx(r.Control,{children:t.jsx(r.Thumb,{})}),t.jsx(r.Label,{children:"Switch"}),t.jsx(r.HiddenInput,{})]})},e={args:{},render:o=>t.jsxs("div",{className:"trds-flex trds-flex-col trds-items-center trds-gap-4 trds-w-36 trds-h-48",children:[t.jsxs(r.Root,{...o,size:"sm",children:[t.jsx(r.Control,{children:t.jsx(r.Thumb,{})}),t.jsx(r.HiddenInput,{})]}),t.jsxs(r.Root,{...o,size:"md",children:[t.jsx(r.Control,{children:t.jsx(r.Thumb,{})}),t.jsx(r.HiddenInput,{})]}),t.jsxs(r.Root,{...o,size:"lg",children:[t.jsx(r.Control,{children:t.jsx(r.Thumb,{})}),t.jsx(r.HiddenInput,{})]})]})},n={args:{disabled:!0},render:o=>t.jsxs(r.Root,{...o,size:"lg",children:[t.jsx(r.Control,{children:t.jsx(r.Thumb,{})}),t.jsx(r.HiddenInput,{})]})};var c,d,a;s.parameters={...s.parameters,docs:{...(c=s.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {},
  render: (props: SwitchProps['Root']) => {
    return <Switch.Root {...props}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Switch</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>;
  }
}`,...(a=(d=s.parameters)==null?void 0:d.docs)==null?void 0:a.source}}};var l,h,p;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: (props: SwitchProps['Root']) => {
    return <div className="trds-flex trds-flex-col trds-items-center trds-gap-4 trds-w-36 trds-h-48">
        <Switch.Root {...props} size="sm">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root {...props} size="md">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root {...props} size="lg">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
      </div>;
  }
}`,...(p=(h=e.parameters)==null?void 0:h.docs)==null?void 0:p.source}}};var m,u,S;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: (props: SwitchProps['Root']) => {
    return <Switch.Root {...props} size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>;
  }
}`,...(S=(u=n.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const O=["Default","Sizes","Disabled"];export{s as Default,n as Disabled,e as Sizes,O as __namedExportsOrder,N as default};
