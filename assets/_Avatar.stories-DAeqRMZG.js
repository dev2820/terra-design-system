import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{A as s,U as j}from"./Avatar-EW6k1PeS.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./index-DOljKnny.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";const F={title:"Components/Avatar",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/avatar"}}},tags:["autodocs"],argTypes:{},args:{}},t={args:{alt:"pravatar",src:"https://i.pravatar.cc/500",size:"md"},render:r=>a.jsx(s,{...r})},e={args:{alt:"pravatar",src:"https://i.pravatar.cc/500"},render:r=>{const p=["sm","md","lg"];return a.jsx("div",{className:"trds-flex trds-flex-row trds-gap-1",children:p.map(c=>a.jsx(s,{size:c,...r},c))})}},n={args:{children:a.jsx("img",{src:"https://i.pravatar.cc/500",alt:"pravatar"})},render:({children:r,...p})=>a.jsx(s,{...p,children:r})},o={args:{alt:"pravatar",fallback:a.jsx(j,{size:40,className:"trds-bg-neutral-200"})},render:r=>a.jsx(s,{...r})};var i,m,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
    size: 'md'
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,v,u;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500'
  },
  render: (props: AvatarProps) => {
    const sizes = (['sm', 'md', 'lg'] as AvatarProps['size'][]);
    return <div className={'trds-flex trds-flex-row trds-gap-1'}>
        {sizes.map(size => <Avatar size={size} key={size} {...props} />)}
      </div>;
  }
}`,...(u=(v=e.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var g,h,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    children: <img src="https://i.pravatar.cc/500" alt="pravatar" />
  },
  render: ({
    children,
    ...props
  }: AvatarProps) => {
    return <Avatar {...props}>{children}</Avatar>;
  }
}`,...(x=(h=n.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var A,z,f;o.parameters={...o.parameters,docs:{...(A=o.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    fallback: <UserIcon size={40} className={'trds-bg-neutral-200'} />
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(f=(z=o.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};const W=["Default","Size","ImageWithChildren","Fallback"];export{t as Default,o as Fallback,n as ImageWithChildren,e as Size,W as __namedExportsOrder,F as default};
