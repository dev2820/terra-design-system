import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as t}from"./cva-C095pwBQ.js";import{B as n}from"./Button-BqV08Sjs.js";import{I as m}from"./IconButton-DBZbh7S6.js";import{R as p,T as c,C as g,a as d,D as u,b as h}from"./Dialog-BqKYqoYW.js";import{c as D}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./use-locale-context-BOqpzadf.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./portal-ZEB98p48.js";import"./index-dMBs-5Uu.js";import"./use-event-eGuf5zsd.js";import"./index-4VAcYN_X.js";import"./render-strategy-Dh08fE-v.js";import"./index-BvO06sdd.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=D("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]),o={Root:p,Trigger:c,Content:g,Title:d,Description:u,CloseTrigger:h},E={title:"Components/Dialog",component:o.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{},args:{}},s={args:{},render:l=>e.jsxs(o.Root,{...l,children:[e.jsx(o.Trigger,{asChild:!0,children:e.jsx(n,{children:"Open Dialog"})}),e.jsxs(o.Content,{className:t({w:400,p:4}),children:[e.jsx(o.CloseTrigger,{asChild:!0,children:e.jsx(m,{className:t({position:"absolute",right:4,top:3}),size:"sm",variant:"ghost",children:e.jsx(y,{size:16})})}),e.jsx(o.Title,{className:t({mb:4}),children:"Lorem Ipsume"}),e.jsx(o.Description,{className:t({mb:4}),children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),e.jsxs("div",{className:t({display:"flex",flexDir:"row-reverse",gap:2,w:"full"}),children:[e.jsx(n,{variant:"filled",theme:"primary",children:"Confirm"}),e.jsx(o.CloseTrigger,{asChild:!0,children:e.jsx(n,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})]})};var r,i,a;s.parameters={...s.parameters,docs:{...(r=s.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {},
  render: (props: DialogProps['root']) => {
    return <Dialog.Root {...props}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className={css({
        w: 400,
        p: 4
      })}>
          <Dialog.CloseTrigger asChild>
            <IconButton className={css({
            position: 'absolute',
            right: 4,
            top: 3
          })} size="sm" variant="ghost">
              <XIcon size={16} />
            </IconButton>
          </Dialog.CloseTrigger>
          <Dialog.Title className={css({
          mb: 4
        })}>Lorem Ipsume</Dialog.Title>
          <Dialog.Description className={css({
          mb: 4
        })}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Dialog.Description>
          <div className={css({
          display: 'flex',
          flexDir: 'row-reverse',
          gap: 2,
          w: 'full'
        })}>
            <Button variant="filled" theme="primary">
              Confirm
            </Button>
            <Dialog.CloseTrigger asChild>
              <Button variant="outline" theme="neutral" aria-label="Close Dialog">
                Close
              </Button>
            </Dialog.CloseTrigger>
          </div>
        </Dialog.Content>
      </Dialog.Root>;
  }
}`,...(a=(i=s.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const M=["Default"];export{s as Default,M as __namedExportsOrder,E as default};
