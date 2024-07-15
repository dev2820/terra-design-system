import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{r as E}from"./index-CDs2tPxN.js";import{c as d}from"./cva-C095pwBQ.js";import{f as i}from"./spacer-CRhrBJcD.js";import{C as n}from"./Checkbox-D7ha5Ppd.js";import"./sva-CxSEfBjn.js";import"./use-locale-context-Cpyu8C1_.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./check-DUDaO23Y.js";import"./createLucideIcon-zijr-BYg.js";import"./index-BXTwHpfi.js";import"./index-Bc7AdKyF.js";import"./use-event-eGuf5zsd.js";const Q={title:"Components/Checkbox",component:n,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/checkbox"}}},tags:["autodocs"],argTypes:{defaultCheck:{options:[!0,!1,"indeterminate"],control:{type:"select"}},checked:{options:[!0,!1,"indeterminate"],control:{type:"select"}},disabled:{control:{type:"boolean"}},readonly:{control:{type:"boolean"}},invalid:{control:{type:"boolean"}},size:{options:["sm","md","lg"],control:{type:"select"}}},args:{defaultCheck:!1,options:!1,disabled:!1,readonly:!1,invalid:!1,size:"md"}},o={args:{value:"on"},render:e=>r.jsx(n,{...e,children:"Hello"})},s={args:{value:"on"},render:e=>r.jsxs("div",{className:d(i({direction:"column",gap:4})),children:[r.jsx(n,{...e,checked:!0,disabled:!0,children:"Hello"}),r.jsx(n,{...e,disabled:!0,children:"Hello"})]})},a={args:{value:"on"},render:e=>r.jsxs("div",{className:d(i({direction:"column",gap:4})),children:[r.jsx(n,{...e,checked:!0,readOnly:!0,children:"Hello"}),r.jsx(n,{...e,readOnly:!0,children:"Hello"})]})},c={args:{value:"on"},render:e=>r.jsxs("div",{className:d(i({direction:"column",gap:4})),children:[r.jsx(n,{...e,checked:!0,invalid:!0,children:"Hello"}),r.jsx(n,{...e,invalid:!0,children:"Hello"})]})},l={args:{value:"on"},render:e=>r.jsx(n,{...e,checked:"indeterminate",children:"Hello"})},t={args:{value:"on"},render:e=>{const D=["sm","md","lg"];return r.jsx("div",{className:d(i({direction:"column",gap:4})),children:D.map(p=>E.createElement(n,{...e,size:p,key:p},"Hello"))})}};var m,u,x;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <Checkbox {...props}>Hello</Checkbox>;
  }
}`,...(x=(u=o.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var h,k,b;s.parameters={...s.parameters,docs:{...(h=s.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className={cx(flex({
      direction: 'column',
      gap: 4
    }))}>
        <Checkbox {...props} checked disabled>
          Hello
        </Checkbox>
        <Checkbox {...props} disabled>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(b=(k=s.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var g,v,C;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className={cx(flex({
      direction: 'column',
      gap: 4
    }))}>
        <Checkbox {...props} checked readOnly>
          Hello
        </Checkbox>
        <Checkbox {...props} readOnly>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(C=(v=a.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var f,y,H;c.parameters={...c.parameters,docs:{...(f=c.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <div className={cx(flex({
      direction: 'column',
      gap: 4
    }))}>
        <Checkbox {...props} checked invalid>
          Hello
        </Checkbox>
        <Checkbox {...props} invalid>
          Hello
        </Checkbox>
      </div>;
  }
}`,...(H=(y=c.parameters)==null?void 0:y.docs)==null?void 0:H.source}}};var j,z,N;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    return <Checkbox {...props} checked="indeterminate">
        Hello
      </Checkbox>;
  }
}`,...(N=(z=l.parameters)==null?void 0:z.docs)==null?void 0:N.source}}};var S,O,P;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    value: 'on'
  },
  render: (props: CheckboxProps) => {
    const sizes = (['sm', 'md', 'lg'] as CheckboxProps['size'][]);
    return <div className={cx(flex({
      direction: 'column',
      gap: 4
    }))}>
        {sizes.map(size => <Checkbox {...props} size={size} key={size}>
            Hello
          </Checkbox>)}
      </div>;
  }
}`,...(P=(O=t.parameters)==null?void 0:O.docs)==null?void 0:P.source}}};const U=["Default","Disabled","ReadOnly","Invalid","Indeterminated","Size"];export{o as Default,s as Disabled,l as Indeterminated,c as Invalid,a as ReadOnly,t as Size,U as __namedExportsOrder,Q as default};
