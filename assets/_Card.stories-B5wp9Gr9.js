import{j as r}from"./jsx-runtime-qGIIFXMu.js";import"./Accordion-CeCGiDPE.js";import"./Alert-Kp8PdpBf.js";import{A as g}from"./Avatar--Mk6z6SA.js";import"./Badge-DENI8HDW.js";import{B as n}from"./Button-C4VbHy4b.js";import{C as t}from"./index-BRczQhMd.js";import"./Carousel-rzhX5Y-M.js";import"./Checkbox-I1Y2Kb_L.js";import"./Collapsible-C41TP7-t.js";import"./ColorPicker-DmEXD1TW.js";import"./Drawer-DdET6hmK.js";import"./Field-EqIJJceK.js";import"./FileUpload-DgWxyljV.js";import"./IconButton-CccESD27.js";import{I as i}from"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-BhWaF1OI.js";import"./Pagination-BSZQCcmb.js";import"./Popover-BDZmcRkQ.js";import"./Progress-Dv0leb-f.js";import"./RadioGroup-JBTXVWbV.js";import"./RatingGroup-DXrnLJ0z.js";import"./SegmentGroup-BttOvZmV.js";import"./Select-XSBzWXG1.js";import"./Skeleton-B-ZNCcEh.js";import"./Slider-BR3-FltM.js";import"./Spinner-CANb2VKy.js";import"./Switch-J2azZwoM.js";import"./Table-wi9CWtfK.js";import"./Tabs-DF27ZyPH.js";import"./Textarea-CNmOYPS6.js";import"./Toast-Ol8X2qvH.js";import"./Tooltip-CESLYyH2.js";import"./TreeView-B8pvy2td.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BgFfooT8.js";import"./index-1fMUQAsE.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-CVy9tkzU.js";import"./Slot-Bw9mQsad.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-OrFpox1S.js";import"./index-CTARPo-3.js";import"./use-presence-8bHCsiKP.js";import"./index-CMjQVyXy.js";import"./index-DANWLHS3.js";import"./ellipsis-Bl27Sm0D.js";import"./chevron-right-CT14g65n.js";import"./portal-DrO_qajF.js";import"./index-OP0vtUYM.js";import"./index-BR8t6gqn.js";const C=["elevated","outline","filled"],Ar={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},e={args:{},render:s=>r.jsxs(t.Root,{...s,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(t.Content,{className:"trds-flex trds-flex-col",children:[r.jsx(i,{type:"text",placeholder:"your email",className:"trds-mb-2"}),r.jsx(i,{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(n,{className:"trds-flex-1",children:"Sign in"}),r.jsx(n,{theme:"primary",className:"trds-flex-1",children:"🚀 Sign up"})]})]})},o={args:{},render:s=>r.jsx("div",{className:"trds-flex trds-flex-row trds-gap-4",children:C.map(a=>r.jsxs(t.Root,{variant:a,...s,children:[r.jsx(t.Header,{children:r.jsx(g,{src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:"lg"})}),r.jsx(t.Content,{className:"trds-text-neutral-500",children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:"trds-text-md trds-font-bold trds-text-neutral-400",children:"- Meet Alex Winters"})})]},a))})};var p,d,m,l,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const Br=["Default","Variant"];export{e as Default,o as Variant,Br as __namedExportsOrder,Ar as default};
