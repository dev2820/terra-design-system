import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{R as C,I as b,a as R,b as y,C as T}from"./Accordion-DdhUars_.js";import{c as S}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=S("CircleChevronDown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 10-4 4-4-4",key:"894hmk"}]]),e={Root:C,Item:b,ItemIndicator:R,ItemTrigger:y,Content:T},H={title:"Components/Accordion",component:e.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/accordion"}}},tags:["autodocs"],argTypes:{},args:{}},n=["React","Vue","Solid"],t={args:{defaultValue:[n[0]]},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(e.Root,{...i,children:n.map(o=>r.jsxs(e.Item,{value:o,children:[r.jsxs(e.ItemTrigger,{children:[o,r.jsx(e.ItemIndicator,{})]}),r.jsxs(e.Content,{children:[o," is a JavaScript library for building user interfaces."]})]},o))})})},c={args:{defaultValue:[n[0]]},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(e.Root,{...i,children:n.map(o=>r.jsxs(e.Item,{value:o,children:[r.jsxs(e.ItemTrigger,{children:[o,r.jsx(e.ItemIndicator,{asChild:!0,children:r.jsx(w,{size:20})})]}),r.jsxs(e.Content,{children:[o," is a JavaScript library for building user interfaces."]})]},o))})})},a={args:{defaultValue:[n[0]]},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(e.Root,{...i,children:n.map((o,j)=>r.jsxs(e.Item,{value:o,disabled:j===1,children:[r.jsxs(e.ItemTrigger,{children:[o,r.jsx(e.ItemIndicator,{})]}),r.jsxs(e.Content,{children:[o," is a JavaScript library for building user interfaces."]})]},o))})})},s={args:{defaultValue:[n[0],n[1]],multiple:!0},render:i=>r.jsx("div",{className:"w-96",children:r.jsx(e.Root,{...i,children:n.map(o=>r.jsxs(e.Item,{value:o,children:[r.jsxs(e.ItemTrigger,{children:[o,r.jsx(e.ItemIndicator,{})]}),r.jsxs(e.Content,{children:[o," is a JavaScript library for building user interfaces."]})]},o))})})};var d,m,l;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.ItemTrigger>
                {item}
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(l=(m=t.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var p,u,I;c.parameters={...c.parameters,docs:{...(p=c.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.ItemTrigger>
                {item}

                <Accordion.ItemIndicator asChild>
                  <CircleChevronDownIcon size={20} />
                </Accordion.ItemIndicator>
              </Accordion.ItemTrigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(I=(u=c.parameters)==null?void 0:u.docs)==null?void 0:I.source}}};var g,A,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map((item, i) => <Accordion.Item key={item} value={item} disabled={i === 1}>
              <Accordion.ItemTrigger>
                {item}
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(x=(A=a.parameters)==null?void 0:A.docs)==null?void 0:x.source}}};var v,f,h;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0], exampleList[1]],
    multiple: true
  },
  render: (props: AccordionProps['Root']) => {
    return <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map(item => <Accordion.Item key={item} value={item}>
              <Accordion.ItemTrigger>
                {item}
                <Accordion.ItemIndicator />
              </Accordion.ItemTrigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>)}
        </Accordion.Root>
      </div>;
  }
}`,...(h=(f=s.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};const K=["Default","Indicator","Disabled","Multiple"];export{t as Default,a as Disabled,c as Indicator,s as Multiple,K as __namedExportsOrder,H as default};
