import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{B as i}from"./Button-C4VbHy4b.js";import{I as m}from"./IconButton-CccESD27.js";import"./Accordion-CeCGiDPE.js";import"./Alert-Kp8PdpBf.js";import"./Avatar--Mk6z6SA.js";import"./Badge-DENI8HDW.js";import"./Skeleton-B-ZNCcEh.js";import"./Carousel-rzhX5Y-M.js";import"./Checkbox-I1Y2Kb_L.js";import"./Collapsible-C41TP7-t.js";import"./ColorPicker-DmEXD1TW.js";import{R as p,T as l,C as d,a as g,D as u,P as c,B as h,b as x}from"./Drawer-DdET6hmK.js";import"./Field-EqIJJceK.js";import"./FileUpload-DgWxyljV.js";import"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-BhWaF1OI.js";import"./Pagination-BSZQCcmb.js";import"./Popover-BDZmcRkQ.js";import"./Progress-Dv0leb-f.js";import"./RadioGroup-JBTXVWbV.js";import"./RatingGroup-DXrnLJ0z.js";import"./SegmentGroup-BttOvZmV.js";import"./Select-XSBzWXG1.js";import"./Slider-BR3-FltM.js";import"./Spinner-CANb2VKy.js";import"./Switch-J2azZwoM.js";import"./Table-wi9CWtfK.js";import"./Tabs-DF27ZyPH.js";import"./Textarea-CNmOYPS6.js";import"./Toast-Ol8X2qvH.js";import"./Tooltip-CESLYyH2.js";import"./TreeView-B8pvy2td.js";import{P as D}from"./portal-DrO_qajF.js";import{X as C}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./Slot-Bw9mQsad.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BgFfooT8.js";import"./index-1fMUQAsE.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-CVy9tkzU.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-OrFpox1S.js";import"./index-CTARPo-3.js";import"./use-presence-8bHCsiKP.js";import"./index-CMjQVyXy.js";import"./index-DANWLHS3.js";import"./ellipsis-Bl27Sm0D.js";import"./chevron-right-CT14g65n.js";import"./index-OP0vtUYM.js";import"./index-BR8t6gqn.js";const r={Root:p,Trigger:l,Content:d,Title:g,Description:u,Positioner:c,Backdrop:h,CloseTrigger:x},It={title:"Components/Dialog",component:r.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},o={args:{lazyMount:!0,unmountOnExit:!0},render:a=>t.jsxs(r.Root,{...a,children:[t.jsx(r.Trigger,{asChild:!0,children:t.jsx(i,{children:"Open Dialog"})}),t.jsxs(D,{children:[t.jsx(r.Backdrop,{}),t.jsx(r.Positioner,{children:t.jsxs(r.Content,{className:"trds-w-[400px] trds-p-4",children:[t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(m,{className:"trds-absolute trds-right-4 trds-top-3",size:"sm",variant:"ghost",children:t.jsx(C,{size:16})})}),t.jsx(r.Title,{children:"Lorem Ipsume"}),t.jsx(r.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),t.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[t.jsx(i,{variant:"filled",theme:"primary",children:"Confirm"}),t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(i,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})})]})]})};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
  args: {
    lazyMount: true,
    unmountOnExit: true
  },
  render: (props: DialogProps['Root']) => {
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
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const wt=["Default"];export{o as Default,wt as __namedExportsOrder,It as default};
