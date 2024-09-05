import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{R as C,I as R,T as y,C as I}from"./Accordion-B2vZCjVo.js";import{c as T}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./create-react-context-Dw26gLIP.js";import"./tv-Br1lVx4G.js";import"./chevron-down-Du6SRUSG.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BXR9Yyrn.js";import"./index-DRtd-hRg.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-Yst3ur6b.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=T("CircleChevronDown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 10-4 4-4-4",key:"894hmk"}]]),o={Root:C,Item:R,Trigger:y,Content:I},G={title:"Components/Accordion",component:o.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/accordion"}}},tags:["autodocs"],argTypes:{},args:{}},n=["React","Vue","Solid"],c={args:{defaultValue:[n[0]]},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(o.Root,{...i,children:n.map(e=>r.jsxs(o.Item,{value:e,children:[r.jsx(o.Trigger,{children:e}),r.jsxs(o.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},t={args:{defaultValue:[n[0]],indicator:r.jsx(S,{size:20})},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(o.Root,{...i,children:n.map(e=>r.jsxs(o.Item,{value:e,children:[r.jsx(o.Trigger,{children:e}),r.jsxs(o.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},a={args:{defaultValue:[n[0]]},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(o.Root,{...i,children:n.map((e,b)=>r.jsxs(o.Item,{value:e,disabled:b===1,children:[r.jsx(o.Trigger,{children:e}),r.jsxs(o.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},s={args:{defaultValue:[n[0],n[1]],multiple:!0},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(o.Root,{...i,children:n.map(e=>r.jsxs(o.Item,{value:e,children:[r.jsx(o.Trigger,{children:e}),r.jsxs(o.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})};var d,l,m;c.parameters={...c.parameters,docs:{...(d=c.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.Trigger>{item}</Accordion.Trigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(m=(l=c.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var p,u,g;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]],
    indicator: <CircleChevronDownIcon size={20} />
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.Trigger>{item}</Accordion.Trigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(g=(u=t.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var A,x,v;a.parameters={...a.parameters,docs:{...(A=a.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map((item, i) => <Accordion.Item key={item} value={item} disabled={i === 1}>
              <Accordion.Trigger>{item}</Accordion.Trigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(v=(x=a.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var f,h,j;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0], exampleList[1]],
    multiple: true
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.Trigger>{item}</Accordion.Trigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(j=(h=s.parameters)==null?void 0:h.docs)==null?void 0:j.source}}};const H=["Default","Indicator","Disabled","Multiple"];export{c as Default,a as Disabled,t as Indicator,s as Multiple,H as __namedExportsOrder,G as default};
