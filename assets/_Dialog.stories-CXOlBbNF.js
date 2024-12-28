import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-Dwqr5mVQ.js";import{I as l}from"./IconButton-BhuYW3nN.js";import{R as m,T as p,C as d,a as g,D as c,P as u,B as h,b as D}from"./Dialog-BUaEJmEl.js";import{P as x}from"./portal-BWW2K-Dr.js";import{X as C}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./dialog-trigger-AWUPQjWy.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./render-strategy-BXR9Yyrn.js";import"./create-split-props-u5h9OPvL.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-DcTE3k_W.js";import"./focus-trap.esm-CsfQhaCm.js";import"./index-6PaDttyw.js";import"./index-DRtd-hRg.js";import"./index-6Viw2UEs.js";import"./use-locale-context-CTaGYWMe.js";const r={Root:m,Trigger:p,Content:d,Title:g,Description:c,Positioner:u,Backdrop:h,CloseTrigger:D},G={title:"Components/Dialog",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{},args:{}},e={args:{},render:a=>t.jsxs(r.Root,{...a,children:[t.jsx(r.Trigger,{asChild:!0,children:t.jsx(o,{children:"Open Dialog"})}),t.jsxs(x,{children:[t.jsx(r.Backdrop,{}),t.jsx(r.Positioner,{children:t.jsxs(r.Content,{className:"trds-w-[400px] trds-p-4",children:[t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(l,{className:"trds-absolute trds-right-4 trds-top-3",size:"sm",variant:"ghost",children:t.jsx(C,{size:16})})}),t.jsx(r.Title,{children:"Lorem Ipsume"}),t.jsx(r.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),t.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[t.jsx(o,{variant:"filled",theme:"primary",children:"Confirm"}),t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(o,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})})]})]})};var s,i,n;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {},
  render: (props: DialogProps['root']) => {
    return <Dialog.Root {...props}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content className="trds-w-[400px] trds-p-4">
              <Dialog.CloseTrigger asChild>
                <IconButton className="trds-absolute trds-right-4 trds-top-3" size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Dialog.CloseTrigger>
              <Dialog.Title>Lorem Ipsume</Dialog.Title>
              <Dialog.Description>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </Dialog.Description>
              <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
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
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>;
  }
}`,...(n=(i=e.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const H=["Default"];export{e as Default,H as __namedExportsOrder,G as default};
