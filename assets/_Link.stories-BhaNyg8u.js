import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as u}from"./index-CO00fS6N.js";import{L as n}from"./Link-D1Kz-1a4.js";import{c as k}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=k("ExternalLink",[["path",{d:"M15 3h6v6",key:"1q9fwt"}],["path",{d:"M10 14 21 3",key:"gplh6r"}],["path",{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",key:"a6xqqp"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=k("Link",[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]]),G={title:"Components/Link",component:n,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},o={args:{href:"https://www.google.com"},render:r=>e.jsx(n,{...r,children:"Google"})},s={args:{href:"https://www.google.com"},render:r=>e.jsx(n,{...r,theme:"neutral",children:"Google"})},t={args:{href:"https://google.com",target:"_blank"},render:r=>e.jsxs("div",{className:u({display:"flex",flexDir:"column",gap:4}),children:[e.jsx(n,{...r,leftIcon:e.jsx(L,{size:16}),children:"Google"}),e.jsx(n,{...r,rightIcon:e.jsx(f,{size:16}),children:"Google"})]})};var a,c,p;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    href: 'https://www.google.com'
  },
  render: (props: LinkProps) => {
    return <Link {...props}>Google</Link>;
  }
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var i,l,m;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    href: 'https://www.google.com'
  },
  render: (props: LinkProps) => {
    return <Link {...props} theme="neutral">
        Google
      </Link>;
  }
}`,...(m=(l=s.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var g,d,h;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(h=(d=t.parameters)==null?void 0:d.docs)==null?void 0:h.source}}};const _=["Default","Theme","WithIcon"];export{o as Default,s as Theme,t as WithIcon,_ as __namedExportsOrder,G as default};
