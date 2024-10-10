import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{B as t}from"./Button-D9MpFO6Q.js";import{I as i}from"./IconButton-BViwHdHD.js";import{R as D,T as y,C as f,H as C,B as j,F as v,a as b,D as T,b as B}from"./Drawer-e_TcHFBR.js";import{X as l}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./portal-BWW2K-Dr.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CTaGYWMe.js";import"./dialog-trigger-BNZ6OjHh.js";import"./render-strategy-BXR9Yyrn.js";import"./create-split-props-u5h9OPvL.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-DcTE3k_W.js";import"./index-lb5DGD3A.js";import"./index-BTGRfmW-.js";import"./index-DRtd-hRg.js";import"./index-B1LdDssV.js";import"./focus-trap.esm-PH5MDpJx.js";const e={Root:D,Trigger:y,Content:f,Header:C,Body:j,Footer:v,Title:b,Description:T,CloseTrigger:B},I=["left","right","bottom"],$={title:"Components/Drawer",component:e.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{variant:{options:I,control:{type:"select"}}},args:{variant:"left"}},n={args:{},render:s=>r.jsxs(e.Root,{...s,children:[r.jsx(e.Trigger,{asChild:!0,children:r.jsx(t,{children:"Open Drawer"})}),r.jsxs(e.Content,{className:"trds-w-[400px] trds-p-4",children:[r.jsxs(e.Header,{children:[r.jsxs(e.Title,{className:"trds-flex trds-flex-row trds-justify-between trds-mb-4",children:[r.jsx("span",{className:"trds-leading-[200%]",children:"Lorem Ipsum"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(i,{size:"sm",variant:"ghost",children:r.jsx(l,{size:16})})})]}),r.jsx(e.Description,{className:"trds-mb-4",children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),r.jsx(e.Body,{children:"Hello World"}),r.jsx(e.Footer,{children:r.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[r.jsx(t,{variant:"filled",theme:"primary",children:"Confirm"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(t,{variant:"outline",theme:"neutral","aria-label":"Close Drawer",children:"Close"})})]})})]})]})},a={args:{variant:"left"},render:s=>r.jsxs(e.Root,{...s,children:[r.jsx(e.Trigger,{asChild:!0,children:r.jsx(t,{children:"Open Drawer"})}),r.jsxs(e.Content,{className:"trds-w-[400px] trds-p-4",children:[r.jsxs(e.Header,{children:[r.jsxs(e.Title,{className:"trds-flex trds-flex-row trds-justify-between trds-mb-4",children:[r.jsx("span",{className:"trds-leading-[200%]",children:"Lorem Ipsum"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(i,{size:"sm",variant:"ghost",children:r.jsx(l,{size:16})})})]}),r.jsx(e.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),r.jsx(e.Body,{children:"Hello World"}),r.jsx(e.Footer,{children:r.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[r.jsx(t,{variant:"filled",theme:"primary",children:"Confirm"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(t,{variant:"outline",theme:"neutral","aria-label":"Close Drawer",children:"Close"})})]})})]})]})},o={args:{variant:"bottom"},render:s=>r.jsxs(e.Root,{...s,children:[r.jsx(e.Trigger,{asChild:!0,children:r.jsx(t,{children:"Open Drawer"})}),r.jsxs(e.Content,{className:"trds-h-[400px] trds-p-4",children:[r.jsxs(e.Header,{children:[r.jsxs(e.Title,{className:"trds-flex trds-flex-row trds-justify-between trds-mb-4",children:[r.jsx("span",{className:"trds-leading-[200%]",children:"Lorem Ipsum"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(i,{size:"sm",variant:"ghost",children:r.jsx(l,{size:16})})})]}),r.jsx(e.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),r.jsx(e.Body,{children:"Hello World"}),r.jsx(e.Footer,{children:r.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[r.jsx(t,{variant:"filled",theme:"primary",children:"Confirm"}),r.jsx(e.CloseTrigger,{asChild:!0,children:r.jsx(t,{variant:"outline",theme:"neutral","aria-label":"Close Drawer",children:"Close"})})]})})]})]})};var d,m,p;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: (props: DrawerProps['root']) => {
    return <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className="trds-w-[400px] trds-p-4">
          <Drawer.Header>
            <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
              <span className="trds-leading-[200%]">Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description className="trds-mb-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline" theme="neutral" aria-label="Close Drawer">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>;
  }
}`,...(p=(m=n.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var c,u,h;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'left'
  },
  render: (props: DrawerProps['root']) => {
    return <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className="trds-w-[400px] trds-p-4">
          <Drawer.Header>
            <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
              <span className="trds-leading-[200%]">Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline" theme="neutral" aria-label="Close Drawer">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>;
  }
}`,...(h=(u=a.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var w,g,x;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'bottom'
  },
  render: (props: DrawerProps['root']) => {
    return <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className="trds-h-[400px] trds-p-4">
          <Drawer.Header>
            <Drawer.Title className="trds-flex trds-flex-row trds-justify-between trds-mb-4">
              <span className="trds-leading-[200%]">Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className="trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full">
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline" theme="neutral" aria-label="Close Drawer">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>;
  }
}`,...(x=(g=o.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};const rr=["Default","Variant","VariantBottom"];export{n as Default,a as Variant,o as VariantBottom,rr as __namedExportsOrder,$ as default};
