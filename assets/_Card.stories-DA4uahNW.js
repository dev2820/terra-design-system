import{j as r}from"./jsx-runtime-qGIIFXMu.js";import"./Accordion-DdhUars_.js";import"./Alert-Kp8PdpBf.js";import{A as g}from"./Avatar-DB_ZZXTM.js";import"./Badge-DENI8HDW.js";import{B as n}from"./Button-C4VbHy4b.js";import{C as t}from"./index-iSeV9LzD.js";import"./Carousel-D93fh9k5.js";import"./Checkbox-DxnjDNOX.js";import"./Collapsible-efNrRExo.js";import"./ColorPicker-CMxR3t7e.js";import"./Tooltip-CAu6ypBZ.js";import"./Field-Ca_xrkg7.js";import"./FileUpload-D_tY-3KJ.js";import"./IconButton-CccESD27.js";import{I as i}from"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-ChfNHWDy.js";import"./Pagination-E5yK6SoQ.js";import"./Progress-I4NP4T-d.js";import"./RadioGroup-CUgAT4YD.js";import"./RatingGroup-CyfwjAu0.js";import"./SegmentGroup-Bxgi1O8K.js";import"./Skeleton-Bit1U5GP.js";import"./Slider-jEiCdT2F.js";import"./Spinner-CANb2VKy.js";import"./Switch-CPhQid8C.js";import"./Table-wVyN-NMp.js";import"./Tabs-BuHGcjZx.js";import"./Textarea-CNmOYPS6.js";import"./Toast-7o5H_X8Q.js";import"./TreeView-4Fbi7LXj.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";import"./Slot-Bw9mQsad.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bl-xBte_.js";import"./use-presence-dzHLm_sJ.js";import"./index-CMjQVyXy.js";import"./index-B4yh-cB0.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";const C=["elevated","outline","filled"],fr={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},e={args:{},render:s=>r.jsxs(t.Root,{...s,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(t.Content,{className:"trds-flex trds-flex-col",children:[r.jsx(i,{type:"text",placeholder:"your email",className:"trds-mb-2"}),r.jsx(i,{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(n,{className:"trds-flex-1",children:"Sign in"}),r.jsx(n,{theme:"primary",className:"trds-flex-1",children:"🚀 Sign up"})]})]})},o={args:{},render:s=>r.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:C.map(a=>r.jsxs(t.Root,{variant:a,...s,children:[r.jsx(t.Header,{children:r.jsx(g,{src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:"lg"})}),r.jsx(t.Content,{className:"trds-text-neutral-500",children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:"trds-text-md trds-font-bold trds-text-neutral-400",children:"- Meet Alex Winters"})})]},a))})};var d,p,m,l,c;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <Card.Root {...props}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>Welcome! Begin your journey here.</Card.Description>
        </Card.Header>
        <Card.Content className="trds-flex trds-flex-col">
          <Input type="text" placeholder="your email" className="trds-mb-2" />
          <Input type="password" placeholder="your password" />
        </Card.Content>
        <Card.Footer className="trds-flex trds-flex-row trds-gap-4">
          <Button className="trds-flex-1">Sign in</Button>
          <Button theme="primary" className="trds-flex-1">
            🚀 Sign up
          </Button>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <div className="trds-flex trds-flex-row trds-gap-4">
        {variants.map(variant => <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://avatars.githubusercontent.com/u/40891497?v=4" size="lg" />
            </Card.Header>
            <Card.Content className="trds-text-neutral-500">
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className="trds-text-md trds-font-bold trds-text-neutral-400">
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>)}
      </div>;
  }
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const yr=["Default","Variant"];export{e as Default,o as Variant,yr as __namedExportsOrder,fr as default};
