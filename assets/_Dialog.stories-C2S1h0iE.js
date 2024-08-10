import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as t}from"./cva-C095pwBQ.js";import{B as s}from"./Button-BVDRYxdW.js";import{I as m}from"./IconButton-E43GEZXc.js";import{R as p,T as g,C as c,a as d,D as u,b as h}from"./Dialog-uwvey2qP.js";import{X as D}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./createLucideIcon-zijr-BYg.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./dialog-trigger-DBCYj8rZ.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-D5jZQDUh.js";import"./index-DJ3ti8gJ.js";import"./render-strategy-D0WC3GAx.js";import"./create-split-props-u5h9OPvL.js";import"./use-presence-DaxTOS81.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-DcTE3k_W.js";import"./index-D5juEydB.js";import"./index-AgpOpevW.js";import"./index-DHe2XY-8.js";import"./index-CkpBL3V2.js";import"./use-locale-context-B5vdPRI5.js";import"./portal-CuRnqJTB.js";const o={Root:p,Trigger:g,Content:c,Title:d,Description:u,CloseTrigger:h},H={title:"Components/Dialog",component:o.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{},args:{}},r={args:{},render:l=>e.jsxs(o.Root,{...l,children:[e.jsx(o.Trigger,{asChild:!0,children:e.jsx(s,{children:"Open Dialog"})}),e.jsxs(o.Content,{className:t({w:400,p:4}),children:[e.jsx(o.CloseTrigger,{asChild:!0,children:e.jsx(m,{className:t({position:"absolute",right:4,top:3}),size:"sm",variant:"ghost",children:e.jsx(D,{size:16})})}),e.jsx(o.Title,{className:t({mb:4}),children:"Lorem Ipsume"}),e.jsx(o.Description,{className:t({mb:4}),children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),e.jsxs("div",{className:t({display:"flex",flexDir:"row-reverse",gap:2,w:"full"}),children:[e.jsx(s,{variant:"filled",theme:"primary",children:"Confirm"}),e.jsx(o.CloseTrigger,{asChild:!0,children:e.jsx(s,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})]})};var n,i,a;r.parameters={...r.parameters,docs:{...(n=r.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(a=(i=r.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const J=["Default"];export{r as Default,J as __namedExportsOrder,H as default};
