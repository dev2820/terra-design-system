import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{L as t}from"./Link-C40OsrYY.js";import{c as L}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./Slot-Bw9mQsad.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=L("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=L("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]),E={title:"Components/Link",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},s={args:{href:"https://github.com/dev2820/terra-design-system"},render:r=>e.jsx(t,{...r,children:"Github"})},n={args:{href:"https://github.com/dev2820/terra-design-system"},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(t,{...r,theme:"neutral",children:"Github"}),e.jsx(t,{...r,theme:"primary",children:"Github"})]})},a={args:{href:"https://github.com/dev2820/terra-design-system",target:"_blank"},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(t,{...r,leftIcon:e.jsx(b,{size:16}),children:"Github"}),e.jsx(t,{...r,rightIcon:e.jsx(v,{size:16}),children:"Github"})]})},i={args:{href:"https://github.com/dev2820/terra-design-system",target:"_blank"},render:r=>e.jsx("div",{className:"trds-flex trds-flex-col trds-gap-4",children:e.jsx(t,{...r,leftIcon:e.jsx(b,{size:16}),asChild:!0,children:e.jsx("button",{children:"Button Link"})})})};var o,d,c;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Github</Link>;
  }
}`,...(c=(d=s.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var p,h,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} theme="neutral">
          Github
        </Link>
        <Link {...props} theme="primary">
          Github
        </Link>
      </div>;
  }
}`,...(l=(h=n.parameters)==null?void 0:h.docs)==null?void 0:l.source}}};var m,u,g;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
    target: '_blank'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} leftIcon={<ExternalLinkIcon size={16} />}>
          Github
        </Link>
        <Link {...props} rightIcon={<LinkIcon size={16} />}>
          Github
        </Link>
      </div>;
  }
}`,...(g=(u=a.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var k,x,f;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system',
    target: '_blank'
  },
  render: (props: LinkProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <Link {...props} leftIcon={<ExternalLinkIcon size={16} />} asChild>
          <button>Button Link</button>
        </Link>
      </div>;
  }
}`,...(f=(x=i.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};const N=["Default","Theme","WithIcon","AsChild"];export{i as AsChild,s as Default,n as Theme,a as WithIcon,N as __namedExportsOrder,E as default};
