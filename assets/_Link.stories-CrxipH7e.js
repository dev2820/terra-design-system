import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{B as G}from"./Button-DXqIfJ4e.js";import{L as s}from"./Link-BRCrdsFN.js";import{c as j}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=j("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=j("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]),P={title:"Components/Link",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},t={args:{href:"https://github.com/dev2820/terra-design-system"},render:e=>r.jsx(s,{...e,children:"Github"})},n={args:{href:"https://github.com/dev2820/terra-design-system"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,theme:"default",children:"Github"}),r.jsx(s,{...e,theme:"primary",children:"Github"})]})},a={args:{href:"https://github.com/dev2820/terra-design-system"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,variant:"plain",children:"Github"}),r.jsx(s,{...e,variant:"underline",children:"Github"})]})},i={args:{href:"https://github.com/dev2820/terra-design-system",target:"_blank"},render:e=>r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[r.jsx(s,{...e,leftIcon:r.jsx(N,{size:16}),children:"Github"}),r.jsx(s,{...e,rightIcon:r.jsx(I,{size:16}),children:"Github"})]})},d={args:{href:"https://github.com/dev2820/terra-design-system",target:"_blank"},render:e=>r.jsx("div",{className:"trds-flex trds-flex-col trds-gap-4",children:r.jsx(s,{...e,asChild:!0,children:r.jsx(G,{children:"Button Link"})})})};var o,c,p;t.parameters={...t.parameters,docs:{...(o=t.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Github</Link>;
  }
}`,...(p=(c=t.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var h,l,m;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} theme="default">
          Github
        </Link>
        <Link {...props} theme="primary">
          Github
        </Link>
      </div>;
  }
}`,...(m=(l=n.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var u,g,k;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} variant="plain">
          Github
        </Link>
        <Link {...props} variant="underline">
          Github
        </Link>
      </div>;
  }
}`,...(k=(g=a.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var x,f,L;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
    target: '_blank'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} leftIcon={<LinkIcon size={16} />}>
          Github
        </Link>
        <Link {...props} rightIcon={<ExternalLinkIcon size={16} />}>
          Github
        </Link>
      </div>;
  }
}`,...(L=(f=i.parameters)==null?void 0:f.docs)==null?void 0:L.source}}};var b,v,y;d.parameters={...d.parameters,docs:{...(b=d.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
    target: '_blank'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} asChild>
          <Button>Button Link</Button>
        </Link>
      </div>;
  }
}`,...(y=(v=d.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const S=["Default","Theme","Variant","WithIcon","AsChild"];export{d as AsChild,t as Default,n as Theme,a as Variant,i as WithIcon,S as __namedExportsOrder,P as default};
