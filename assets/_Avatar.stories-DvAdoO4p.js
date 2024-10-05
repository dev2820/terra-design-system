import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{A as s,U as j}from"./Avatar-BROtaPwN.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./index-DOljKnny.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";const f=["sm","md","lg","xl","2xl"],F={title:"Components/Avatar",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/avatar"}}},tags:["autodocs"],argTypes:{size:{options:f,control:{type:"select"}}},args:{}},e={args:{alt:"pravatar",src:"https://i.pravatar.cc/500",size:"md"},render:r=>a.jsx(s,{...r})},n={args:{alt:"pravatar",src:"https://i.pravatar.cc/500"},render:r=>a.jsx("div",{className:"trds-flex trds-flex-row trds-gap-1",children:f.map(t=>a.jsx(s,{size:t,...r},t))})},o={args:{children:a.jsx("img",{src:"https://i.pravatar.cc/500",alt:"pravatar"})},render:({children:r,...t})=>a.jsx(s,{...t,children:r})},p={args:{alt:"pravatar",fallback:a.jsx(j,{size:40,className:"trds-bg-neutral-200"})},render:r=>a.jsx(s,{...r})};var c,i,m;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
    size: 'md'
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(m=(i=e.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var d,l,v;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500'
  },
  render: (props: AvatarProps) => {
    return <div className={'trds-flex trds-flex-row trds-gap-1'}>
        {sizes.map(size => <Avatar size={size} key={size} {...props} />)}
      </div>;
  }
}`,...(v=(l=n.parameters)==null?void 0:l.docs)==null?void 0:v.source}}};var u,g,x;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    children: <img src="https://i.pravatar.cc/500" alt="pravatar" />
  },
  render: ({
    children,
    ...props
  }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,A,z;p.parameters={...p.parameters,docs:{...(h=p.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    fallback: <UserIcon size={40} className={'trds-bg-neutral-200'} />
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(z=(A=p.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};const W=["Default","Size","ImageWithChildren","Fallback"];export{e as Default,p as Fallback,o as ImageWithChildren,n as Size,W as __namedExportsOrder,F as default};
