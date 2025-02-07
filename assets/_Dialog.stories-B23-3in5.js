import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{B as i}from"./Button-DUHQiuDU.js";import{I as m}from"./IconButton-DnUa7Vmc.js";import"./Accordion-CgDylwMY.js";import"./Alert-BjONzAXd.js";import"./Avatar-GFQF4lNU.js";import"./Badge-CEU1QJKy.js";import"./Skeleton-D4i3kzB2.js";import"./Carousel-BR79huiN.js";import"./Checkbox-BbCjP36d.js";import"./Collapsible-CJUjxO-C.js";import"./ColorPicker-CuJQsjo-.js";import{R as p,T as l,C as d,a as g,D as u,P as c,B as h,b as x}from"./Tooltip-DQW8BvJz.js";import"./Field-B5chCOPf.js";import"./FileUpload-CeSLKIMb.js";import"./Input-BSxiEAoM.js";import"./Link-BSlq0fgs.js";import"./NumberInput-bg01cOYL.js";import"./Pagination-BqHop7lE.js";import"./Progress-SZ0gL0O0.js";import"./RadioGroup-CPP7LEAz.js";import"./RatingGroup-C7BoSAwl.js";import"./SegmentGroup-D6E4ET2q.js";import"./Slider-o5g3lXRu.js";import"./Spinner-CAvmFNxP.js";import"./Switch-a0BVvoMs.js";import"./Table-U3-NvyYg.js";import"./Tabs-QXHsDSrX.js";import"./Textarea-BK1U3_rW.js";import"./Toast-8zzgFxvr.js";import"./TreeView-CJVjMwZV.js";import{P as D}from"./portal-D-Vx2HB0.js";import{X as C}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bl-xBte_.js";import"./use-presence-dzHLm_sJ.js";import"./index-CMjQVyXy.js";import"./index-B4yh-cB0.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";const r={Root:p,Trigger:l,Content:d,Title:g,Description:u,Positioner:c,Backdrop:h,CloseTrigger:x},yt={title:"Components/Dialog",component:r.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},o={args:{lazyMount:!0,unmountOnExit:!0},render:a=>t.jsxs(r.Root,{...a,children:[t.jsx(r.Trigger,{asChild:!0,children:t.jsx(i,{children:"Open Dialog"})}),t.jsxs(D,{children:[t.jsx(r.Backdrop,{}),t.jsx(r.Positioner,{children:t.jsxs(r.Content,{className:"trds-w-[400px] trds-p-4",children:[t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(m,{className:"trds-absolute trds-right-4 trds-top-3",size:"sm",variant:"ghost",children:t.jsx(C,{size:16})})}),t.jsx(r.Title,{children:"Lorem Ipsume"}),t.jsx(r.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."}),t.jsxs("div",{className:"trds-flex trds-flex-row-reverse trds-gap-2 trds-w-full",children:[t.jsx(i,{variant:"filled",theme:"primary",children:"Confirm"}),t.jsx(r.CloseTrigger,{asChild:!0,children:t.jsx(i,{variant:"outline",theme:"neutral","aria-label":"Close Dialog",children:"Close"})})]})]})})]})]})};var e,s,n;o.parameters={...o.parameters,docs:{...(e=o.parameters)==null?void 0:e.docs,source:{originalSource:`{
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
}`,...(n=(s=o.parameters)==null?void 0:s.docs)==null?void 0:n.source}}};const ft=["Default"];export{o as Default,ft as __namedExportsOrder,yt as default};
