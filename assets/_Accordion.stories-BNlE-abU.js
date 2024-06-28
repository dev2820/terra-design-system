import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as t}from"./cva-C095pwBQ.js";import{R,I as y,T as I,C as T}from"./Accordion-DekpNnWn.js";import{c as S}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./use-event-BRqgqnOD.js";import"./index-B-yFm4aN.js";import"./collapsible-content-DuXuxf_-.js";import"./index-DPKo64-F.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=S("CircleChevronDown",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m16 10-4 4-4-4",key:"894hmk"}]]),n={Root:R,Item:y,Trigger:I,Content:T},O={title:"Components/Accordion",component:n.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/accordion"}}},tags:["autodocs"],argTypes:{},args:{}},o=["React","Vue","Solid"],c={args:{defaultValue:[o[0]]},render:i=>r.jsx("div",{className:t({width:"400px",height:"200px"}),children:r.jsx(n.Root,{...i,children:o.map(e=>r.jsxs(n.Item,{value:e,children:[r.jsx(n.Trigger,{children:e}),r.jsxs(n.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},s={args:{defaultValue:[o[0]],indicator:r.jsx(w,{size:20,className:t({_open:{rotate:"-180"}})})},render:i=>r.jsx("div",{className:t({width:"400px",height:"200px"}),children:r.jsx(n.Root,{...i,children:o.map(e=>r.jsxs(n.Item,{value:e,children:[r.jsx(n.Trigger,{children:e}),r.jsxs(n.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},a={args:{defaultValue:[o[0]]},render:i=>r.jsx("div",{className:t({width:"400px",height:"200px"}),children:r.jsx(n.Root,{...i,children:o.map((e,C)=>r.jsxs(n.Item,{value:e,disabled:C===1,children:[r.jsx(n.Trigger,{children:e}),r.jsxs(n.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})},d={args:{defaultValue:[o[0],o[1]],multiple:!0},render:i=>r.jsx("div",{className:t({width:"400px",height:"200px"}),children:r.jsx(n.Root,{...i,children:o.map(e=>r.jsxs(n.Item,{value:e,children:[r.jsx(n.Trigger,{children:e}),r.jsxs(n.Content,{children:[e," is a JavaScript library for building user interfaces."]})]},e))})})};var l,p,m;c.parameters={...c.parameters,docs:{...(l=c.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className={css({
      width: '400px',
      height: '200px'
    })}>
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
}`,...(m=(p=c.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,g,x;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]],
    indicator: <CircleChevronDownIcon size={20} className={css({
      _open: {
        rotate: '-180'
      }
    })} />
  },
  render: (props: AccordionProps['Root']) => {
    return <div className={css({
      width: '400px',
      height: '200px'
    })}>
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
}`,...(x=(g=s.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var h,A,f;a.parameters={...a.parameters,docs:{...(h=a.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0]]
  },
  render: (props: AccordionProps['Root']) => {
    return <div className={css({
      width: '400px',
      height: '200px'
    })}>
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
}`,...(f=(A=a.parameters)==null?void 0:A.docs)==null?void 0:f.source}}};var v,j,b;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    defaultValue: [exampleList[0], exampleList[1]],
    multiple: true
  },
  render: (props: AccordionProps['Root']) => {
    return <div className={css({
      width: '400px',
      height: '200px'
    })}>
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
}`,...(b=(j=d.parameters)==null?void 0:j.docs)==null?void 0:b.source}}};const q=["Default","Indicator","Disabled","Multiple"];export{c as Default,a as Disabled,s as Indicator,d as Multiple,q as __namedExportsOrder,O as default};
