import{j as r}from"./jsx-runtime-qGIIFXMu.js";import"./Accordion-Cu41JNtv.js";import"./Alert-Kp8PdpBf.js";import{A as g}from"./Avatar-BYrea7Br.js";import"./Badge-DENI8HDW.js";import{B as n}from"./Button-C4VbHy4b.js";import{C as t}from"./index-BRczQhMd.js";import"./Carousel-bifbER4O.js";import"./Checkbox-ncrP5pSZ.js";import"./Collapsible-GojAbrbE.js";import"./ColorPicker-D-8G8e7Z.js";import"./Popover-EMtf2V-Z.js";import"./Field-COID13fQ.js";import"./FileUpload-CqWMVpQO.js";import"./IconButton-CccESD27.js";import{I as i}from"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-BpsX2IC4.js";import"./Pagination-BjHX0jSX.js";import"./Progress-Bkf0qkAs.js";import"./RadioGroup-vgkx_5nk.js";import"./RatingGroup-C5Z5FJLM.js";import"./SegmentGroup-D_YyPJnp.js";import"./Select-QyoqJkMW.js";import"./Skeleton-B-ZNCcEh.js";import"./Slider-Da_MwK4J.js";import"./Spinner-CANb2VKy.js";import"./Switch-Dz_S0PJ4.js";import"./Table-wi9CWtfK.js";import"./Tabs-BByE2UZL.js";import"./Textarea-CNmOYPS6.js";import"./Toast-CVsQtWqu.js";import"./Tooltip-1LFsM8Mc.js";import"./TreeView-BrRAOz1w.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BZFUjd3y.js";import"./index-Bc8Or9Mt.js";import"./index-DE2wJq7j.js";import"./use-locale-context-hL6yk3cA.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-DW9aOTiN.js";import"./Slot-Bw9mQsad.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bc1L1tNp.js";import"./index-Bxx3IDnZ.js";import"./use-presence-C6AD7UWc.js";import"./index-CMjQVyXy.js";import"./index-Dhu86lpg.js";import"./index-BClyrBxD.js";import"./index-BR8t6gqn.js";const C=["elevated","outline","filled"],Nr={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},e={args:{},render:s=>r.jsxs(t.Root,{...s,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(t.Content,{className:"trds-flex trds-flex-col",children:[r.jsx(i,{type:"text",placeholder:"your email",className:"trds-mb-2"}),r.jsx(i,{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(n,{className:"trds-flex-1",children:"Sign in"}),r.jsx(n,{theme:"primary",className:"trds-flex-1",children:"🚀 Sign up"})]})]})},o={args:{},render:s=>r.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:C.map(a=>r.jsxs(t.Root,{variant:a,...s,children:[r.jsx(t.Header,{children:r.jsx(g,{src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:"lg"})}),r.jsx(t.Content,{className:"trds-text-neutral-500",children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:"trds-text-md trds-font-bold trds-text-neutral-400",children:"- Meet Alex Winters"})})]},a))})};var p,d,m,l,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(d=e.parameters)==null?void 0:d.docs)==null?void 0:m.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const Dr=["Default","Variant"];export{e as Default,o as Variant,Dr as __namedExportsOrder,Nr as default};
