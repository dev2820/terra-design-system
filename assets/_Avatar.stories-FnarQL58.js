import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{A as s,U as N}from"./Avatar-DB_ZZXTM.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";const k=["xs","sm","md","lg","xl","2xl"],O={title:"Components/Avatar",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/avatar"}}},tags:["autodocs"],argTypes:{size:{options:k,control:{type:"select"}}},args:{}},a={args:{alt:"dev2820",src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:"md"},render:r=>e.jsx(s,{...r})},n={args:{alt:"dev2820",src:"https://avatars.githubusercontent.com/u/40891497?v=4"},render:r=>e.jsx("div",{className:"trds-flex trds-flex-row trds-gap-1",children:k.map(t=>e.jsx(s,{size:t,...r},t))})},o={args:{alt:"dev2820",src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:128},render:r=>e.jsx(s,{...r})},c={args:{children:e.jsx("img",{src:"https://avatars.githubusercontent.com/u/40891497?v=4",alt:"dev2820"})},render:({children:r,...t})=>e.jsx(s,{...t,children:r})},p={args:{alt:"dev2820",fallback:e.jsx(N,{size:40,className:"trds-bg-neutral-200"})},render:r=>e.jsx(s,{...r})};var i,d,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4',
    size: 'md'
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(m=(d=a.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var u,l,v;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4'
  },
  render: (props: AvatarProps) => {
    return <div className={'trds-flex trds-flex-row trds-gap-1'}>
        {sizes.map(size => <Avatar size={size} key={size} {...props} />)}
      </div>;
  }
}`,...(v=(l=n.parameters)==null?void 0:l.docs)==null?void 0:v.source}}};var g,h,x;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    alt: 'dev2820',
    src: 'https://avatars.githubusercontent.com/u/40891497?v=4',
    size: 128
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(x=(h=o.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var b,z,A;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    children: <img src="https://avatars.githubusercontent.com/u/40891497?v=4" alt="dev2820" />
  },
  render: ({
    children,
    ...props
  }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  }
}`,...(A=(z=c.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var f,j,S;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    alt: 'dev2820',
    fallback: <UserIcon size={40} className={'trds-bg-neutral-200'} />
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(S=(j=p.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};const R=["Default","Size","SizeWithNumber","ImageWithChildren","Fallback"];export{a as Default,p as Fallback,c as ImageWithChildren,n as Size,o as SizeWithNumber,R as __namedExportsOrder,O as default};
