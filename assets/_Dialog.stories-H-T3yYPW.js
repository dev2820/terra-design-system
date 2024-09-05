import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-CQT9mEFX.js";import{I as l}from"./IconButton-BCa2qX4v.js";import{R as m,T as p,C as d,a as g,D as c,b as u}from"./Dialog-BbSfKMH3.js";import{X as h}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./portal-BWW2K-Dr.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CTaGYWMe.js";import"./dialog-trigger-BNZ6OjHh.js";import"./render-strategy-BXR9Yyrn.js";import"./create-split-props-u5h9OPvL.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-DcTE3k_W.js";import"./index-lb5DGD3A.js";import"./index-BTGRfmW-.js";import"./index-DRtd-hRg.js";import"./index-B1LdDssV.js";import"./focus-trap.esm-PH5MDpJx.js";const e={Root:m,Trigger:p,Content:d,Title:g,Description:c,CloseTrigger:u},F={title:"Components/Dialog",component:e.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{},args:{}},r={args:{},render:a=>t.jsxs(e.Root,{...a,children:[t.jsx(e.Trigger,{asChild:!0,children:t.jsx(o,{children:"Open Dialog"})}),t.jsxs(e.Content,{className:"trds-w-[400px] trds-p-4",children:[t.jsx(e.CloseTrigger,{asChild:!0,children:t.jsx(l,{className:"trds-absolute trds-right-4 trds-top-3",size:"sm",variant:"ghost",children:t.jsx(h,{size:16})})}),t.jsx(e.Title,{children:"Lorem Ipsume"}),t.jsx(e.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),t.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[t.jsx(o,{variant:"filled",theme:"primary",children:"Confirm"}),t.jsx(e.CloseTrigger,{asChild:!0,children:t.jsx(o,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})]})};var s,i,n;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {},
  render: (props: DialogProps['root']) => {
    return <Dialog.Root {...props}>
        <Dialog.Trigger asChild>
          <Button>Open Dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content className="trds-w-[400px] trds-p-4">
          <Dialog.CloseTrigger asChild>
            <IconButton className="trds-absolute trds-right-4 trds-top-3" size="sm" variant="ghost">
              <XIcon size={16} />
            </IconButton>
          </Dialog.CloseTrigger>
          <Dialog.Title>Lorem Ipsume</Dialog.Title>
          <Dialog.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
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
      </Dialog.Root>;
  }
}`,...(n=(i=r.parameters)==null?void 0:i.docs)==null?void 0:n.source}}};const G=["Default"];export{r as Default,G as __namedExportsOrder,F as default};
