import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{r as P}from"./index-CDs2tPxN.js";import{C as s}from"./Checkbox-ncrP5pSZ.js";import"./tv-CIwtzMts.js";import"./check-DUDaO23Y.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-Bc8Or9Mt.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-hL6yk3cA.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Bc1L1tNp.js";const M={title:"Components/Checkbox",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/checkbox"}}},tags:["autodocs"],argTypes:{defaultChecked:{options:[!0,!1,"indeterminate"],control:{type:"select"}},checked:{options:[!0,!1,"indeterminate"],control:{type:"select"}},disabled:{control:{type:"boolean"}},readOnly:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},size:{options:["sm","md","lg"],control:{type:"select"}}},args:{defaultChecked:!1,disabled:!1,readOnly:!1,invalid:!1,size:"md"}},o={args:{value:"on"},render:e=>r.jsx(s,{...e,children:"Hello"})},n={args:{value:"on"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,checked:!0,disabled:!0,children:"Hello"}),r.jsx(s,{...e,disabled:!0,children:"Hello"})]})},a={args:{value:"on"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,checked:!0,readOnly:!0,children:"Hello"}),r.jsx(s,{...e,readOnly:!0,children:"Hello"})]})},t={args:{value:"on"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,checked:!0,invalid:!0,children:"Hello"}),r.jsx(s,{...e,invalid:!0,children:"Hello"})]})},l={args:{value:"on"},render:e=>r.jsx(s,{...e,checked:"indeterminate",children:"Hello"})},c={args:{value:"on"},render:e=>{const S=["sm","md","lg"];return r.jsx("div",{className:"trds-flex trds-flex-col trds-gap-4",children:S.map(d=>P.createElement(s,{...e,size:d,key:d},"Hello"))})}};var i,p,m;o.parameters={...o.parameters,docs:{...(i=o.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <Checkbox {...props}>Hello</Checkbox>;
  }
}`,...(m=(p=o.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,x,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Checkbox {...props} checked disabled>
          Hello
        </Checkbox>
        <Checkbox {...props} disabled>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var k,b,g;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Checkbox {...props} checked readOnly>
          Hello
        </Checkbox>
        <Checkbox {...props} readOnly>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(g=(b=a.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var v,C,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Checkbox {...props} checked invalid>
          Hello
        </Checkbox>
        <Checkbox {...props} invalid>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(f=(C=t.parameters)==null?void 0:C.docs)==null?void 0:f.source}}};var y,H,j;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <Checkbox {...props} checked="indeterminate">
        Hello
      </Checkbox>;
  }
}`,...(j=(H=l.parameters)==null?void 0:H.docs)==null?void 0:j.source}}};var z,O,N;c.parameters={...c.parameters,docs:{...(z=c.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    const sizes = (['sm', 'md', 'lg'] as CheckboxProps['size'][]);
    return <div className="trds-flex trds-flex-col trds-gap-4">
        {sizes.map(size => <Checkbox {...props} size={size} key={size}>
            Hello
          </Checkbox>)}
      </div>;
  }
}`,...(N=(O=c.parameters)==null?void 0:O.docs)==null?void 0:N.source}}};const Q=["Default","Disabled","ReadOnly","Invalid","Indeterminated","Size"];export{o as Default,n as Disabled,l as Indeterminated,t as Invalid,a as ReadOnly,c as Size,Q as __namedExportsOrder,M as default};
