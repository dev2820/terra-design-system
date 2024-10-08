import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{L as t}from"./Link-ClOXAS-H.js";import{c as g}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=g("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=g("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]),G={title:"Components/Link",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},s={args:{href:"https://github.com/dev2820/terra-design-system"},render:r=>e.jsx(t,{...r,children:"Github"})},n={args:{href:"https://github.com/dev2820/terra-design-system"},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(t,{...r,theme:"neutral",children:"Github"}),e.jsx(t,{...r,theme:"primary",children:"Github"})]})},a={args:{href:"https://github.com/dev2820/terra-design-system",target:"_blank"},render:r=>e.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[e.jsx(t,{...r,leftIcon:e.jsx(k,{size:16}),children:"Github"}),e.jsx(t,{...r,rightIcon:e.jsx(x,{size:16}),children:"Github"})]})};var i,o,d;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    href: 'https://github.com/dev2820/terra-design-system'
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Github</Link>;
  }
}`,...(d=(o=s.parameters)==null?void 0:o.docs)==null?void 0:d.source}}};var c,p,h;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
}`,...(h=(p=n.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var m,l,u;a.parameters={...a.parameters,docs:{...(m=a.parameters)==null?void 0:m.docs,source:{originalSource:`{
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
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const I=["Default","Theme","WithIcon"];export{s as Default,n as Theme,a as WithIcon,I as __namedExportsOrder,G as default};
