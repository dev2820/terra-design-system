import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{I as n}from"./Input-BydU8ZSw.js";import{R as y,L as H,H as L,E as v}from"./Field-CkmCy02z.js";import{I as a}from"./info-CEHfXOTA.js";import{T as s}from"./triangle-alert-Bhb0PwnQ.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./create-split-props-B1LGkfrB.js";import"./index-B-yFm4aN.js";import"./use-field-context-Cn9om32m.js";import"./createLucideIcon-zijr-BYg.js";const r={Root:y,Label:H,HelperText:L,ErrorText:v},K={title:"Components/Field",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/field"}}},tags:["autodocs"],argTypes:{},args:{}},i={args:{},render:l=>e.jsxs(r.Root,{...l,children:[e.jsx(r.Label,{htmlFor:"input-default",children:"Email"}),e.jsx(n,{id:"input-default",placeholder:"email@example.com"}),e.jsxs(r.HelperText,{children:[e.jsx(a,{size:16}),"Enter your email address"]}),e.jsxs(r.ErrorText,{children:[e.jsx(s,{size:16}),"Invalid email address"]})]})},d={args:{invalid:!0},render:l=>e.jsxs(r.Root,{...l,children:[e.jsx(r.Label,{children:"Email"}),e.jsx(n,{id:"input-default",placeholder:"email@example.com",invalid:!0}),e.jsxs(r.HelperText,{children:[e.jsx(a,{size:16}),"Enter your email address"]}),e.jsxs(r.ErrorText,{children:[e.jsx(s,{size:16}),"Invalid email address"]})]})},o={args:{disabled:!0},render:l=>e.jsxs(r.Root,{...l,children:[e.jsx(r.Label,{children:"Email"}),e.jsx(n,{id:"input-default",placeholder:"email@example.com",disabled:!0}),e.jsxs(r.HelperText,{children:[e.jsx(a,{size:16}),"Enter your email address"]}),e.jsxs(r.ErrorText,{children:[e.jsx(s,{size:16}),"Invalid email address"]})]})},t={args:{readOnly:!0},render:l=>e.jsxs(r.Root,{...l,children:[e.jsx(r.Label,{children:"Email"}),e.jsx(n,{id:"input-default",placeholder:"email@example.com",readOnly:!0}),e.jsxs(r.HelperText,{children:[e.jsx(a,{size:16}),"Enter your email address"]}),e.jsxs(r.ErrorText,{children:[e.jsx(s,{size:16}),"Invalid email address"]})]})},p={args:{required:!0},render:l=>e.jsxs(r.Root,{...l,children:[e.jsx(r.Label,{children:"Email"}),e.jsx(n,{id:"input-default",placeholder:"email@example.com",required:!0}),e.jsxs(r.HelperText,{children:[e.jsx(a,{size:16}),"Enter your email address"]}),e.jsxs(r.ErrorText,{children:[e.jsx(s,{size:16}),"Invalid email address"]})]})};var m,c,u;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {},
  render: (props: FieldProps['root']) => {
    return <Field.Root {...props}>
        <Field.Label htmlFor="input-default">Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>;
  }
}`,...(u=(c=i.parameters)==null?void 0:c.docs)==null?void 0:u.source}}};var x,F,T;d.parameters={...d.parameters,docs:{...(x=d.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    invalid: true
  },
  render: (props: FieldProps['root']) => {
    return <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" invalid />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>;
  }
}`,...(T=(F=d.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var E,j,I;o.parameters={...o.parameters,docs:{...(E=o.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: (props: FieldProps['root']) => {
    return <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" disabled />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>;
  }
}`,...(I=(j=o.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var h,f,g;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    readOnly: true
  },
  render: (props: FieldProps['root']) => {
    return <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" readOnly />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>;
  }
}`,...(g=(f=t.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var b,R,z;p.parameters={...p.parameters,docs:{...(b=p.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    required: true
  },
  render: (props: FieldProps['root']) => {
    return <Field.Root {...props}>
        <Field.Label>Email</Field.Label>
        <Input id="input-default" placeholder="email@example.com" required />
        <Field.HelperText>
          <InfoIcon size={16} />
          Enter your email address
        </Field.HelperText>
        <Field.ErrorText>
          <TriangleAlertIcon size={16} />
          Invalid email address
        </Field.ErrorText>
      </Field.Root>;
  }
}`,...(z=(R=p.parameters)==null?void 0:R.docs)==null?void 0:z.source}}};const M=["Default","Invalid","Disabled","ReadOnly","Required"];export{i as Default,o as Disabled,d as Invalid,t as ReadOnly,p as Required,M as __namedExportsOrder,K as default};
