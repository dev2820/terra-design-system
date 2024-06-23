import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as g}from"./cva-C095pwBQ.js";import{L as s}from"./Link-NqX2B7Ij.js";import{c as d}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=d("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=d("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]),j={title:"Components/Link",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},n={args:{href:"https://www.google.com"},render:r=>e.jsx(s,{...r,children:"Google"})},o={args:{href:"https://google.com",target:"_blank"},render:r=>e.jsxs("div",{className:g({display:"flex",flexDir:"column",gap:4}),children:[e.jsx(s,{...r,leftIcon:e.jsx(m,{size:16}),children:"Google"}),e.jsx(s,{...r,rightIcon:e.jsx(h,{size:16}),children:"Google"})]})};var a,t,i;n.parameters={...n.parameters,docs:{...(a=n.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    href: 'https://www.google.com'
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Google</Link>;
  }
}`,...(i=(t=n.parameters)==null?void 0:t.docs)==null?void 0:i.source}}};var c,p,l;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    href: 'https://google.com',
    target: '_blank'
  },
  render: (props: LinkProps) => {
    return <div className={css({
      display: 'flex',
      flexDir: 'column',
      gap: 4
    })}>
        <Link {...props} leftIcon={<ExternalLinkIcon size={16} />}>
          Google
        </Link>
        <Link {...props} rightIcon={<LinkIcon size={16} />}>
          Google
        </Link>
      </div>;
  }
}`,...(l=(p=o.parameters)==null?void 0:p.docs)==null?void 0:l.source}}};const y=["Default","WithIcon"];export{n as Default,o as WithIcon,y as __namedExportsOrder,j as default};
