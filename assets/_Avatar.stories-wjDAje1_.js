import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{c as j,a as b}from"./cva-C095pwBQ.js";import{A as s,f as k,U as S}from"./Avatar-tAeKUNVj.js";import"./index-CDs2tPxN.js";import"./index-DOljKnny.js";import"./sva-CxSEfBjn.js";import"./use-event-BIwGymbi.js";import"./index-B-yFm4aN.js";import"./createLucideIcon-zijr-BYg.js";const E={title:"Components/Avatar",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/avatar"}}},tags:["autodocs"],argTypes:{},args:{}},e={args:{alt:"pravatar",src:"https://i.pravatar.cc/500",size:"md"},render:r=>a.jsx(s,{...r})},t={args:{alt:"pravatar",src:"https://i.pravatar.cc/500"},render:r=>{const c=["sm","md","lg"];return a.jsx("div",{className:j(k({direction:"row",gap:4})),children:c.map(p=>a.jsx(s,{size:p,...r},p))})}},n={args:{children:a.jsx("img",{src:"https://i.pravatar.cc/500",alt:"pravatar"})},render:({children:r,...c})=>a.jsx(s,{...c,children:r})},o={args:{alt:"pravatar",fallback:a.jsx(S,{size:40,className:b({bg:"neutral.200"})})},render:r=>a.jsx(s,{...r})};var i,m,d;e.parameters={...e.parameters,docs:{...(i=e.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500',
    size: 'md'
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var l,v,u;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    alt: 'pravatar',
    src: 'https://i.pravatar.cc/500'
  },
  render: (props: AvatarProps) => {
    const sizes = (['sm', 'md', 'lg'] as AvatarProps['size'][]);
    return <div className={cx(flex({
      direction: 'row',
      gap: 4
    }))}>
        {sizes.map(size => <Avatar size={size} key={size} {...props} />)}
      </div>;
  }
}`,...(u=(v=t.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var g,h,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
    fallback: <UserIcon size={40} className={css({
      bg: 'neutral.200'
    })} />
  },
  render: (props: AvatarProps) => {
    return <Avatar {...props} />;
  }
}`,...(f=(z=o.parameters)==null?void 0:z.docs)==null?void 0:f.source}}};const F=["Default","Size","ImageWithChildren","Fallback"];export{e as Default,o as Fallback,n as ImageWithChildren,t as Size,F as __namedExportsOrder,E as default};
