import{j as r}from"./jsx-runtime-qGIIFXMu.js";import"./Accordion-CgDylwMY.js";import"./Alert-BjONzAXd.js";import{A as g}from"./Avatar-GFQF4lNU.js";import"./Badge-CEU1QJKy.js";import{B as n}from"./Button-DUHQiuDU.js";import{C as t}from"./index-DwiDf62Y.js";import"./Carousel-BR79huiN.js";import"./Checkbox-BbCjP36d.js";import"./Collapsible-CJUjxO-C.js";import"./ColorPicker-CuJQsjo-.js";import"./Tooltip-u1Prow_g.js";import"./Field-B5chCOPf.js";import"./FileUpload-CeSLKIMb.js";import"./IconButton-d0ofoO5p.js";import{I as i}from"./Input-BSxiEAoM.js";import"./Link-CIKGz3cN.js";import"./NumberInput-bg01cOYL.js";import"./Pagination-BqHop7lE.js";import"./Progress-SZ0gL0O0.js";import"./RadioGroup-CPP7LEAz.js";import"./RatingGroup-C7BoSAwl.js";import"./SegmentGroup-D6E4ET2q.js";import"./Skeleton-D4i3kzB2.js";import"./Slider-o5g3lXRu.js";import"./Spinner-CAvmFNxP.js";import"./Switch-a0BVvoMs.js";import"./Table-U3-NvyYg.js";import"./Tabs-QXHsDSrX.js";import"./Textarea-BK1U3_rW.js";import"./Toast-8zzgFxvr.js";import"./TreeView-CJVjMwZV.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bl-xBte_.js";import"./use-presence-dzHLm_sJ.js";import"./index-CMjQVyXy.js";import"./index-B4yh-cB0.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";const C=["elevated","outline","filled"],gr={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},e={args:{},render:s=>r.jsxs(t.Root,{...s,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here"})]}),r.jsxs(t.Content,{className:"trds-flex trds-flex-col",children:[r.jsx(i,{type:"text",placeholder:"your email",className:"trds-mb-2"}),r.jsx(i,{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(n,{className:"trds-flex-1",children:"Sign in"}),r.jsx(n,{theme:"primary",className:"trds-flex-1",children:"🚀 Sign up"})]})]})},o={args:{className:"trds-w-64"},render:s=>r.jsx("div",{className:"trds-flex trds-flex-col trds-gap-4",children:C.map(a=>r.jsxs(t.Root,{variant:a,...s,children:[r.jsx(t.Header,{children:r.jsx(g,{src:"https://avatars.githubusercontent.com/u/40891497?v=4",size:"lg"})}),r.jsx(t.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:"trds-text-md trds-text-neutral-500",children:"- Meet Alex Winters"})})]},a))})};var p,d,m,l,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <Card.Root {...props}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>Welcome! Begin your journey here</Card.Description>
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
  args: {
    className: 'trds-w-64'
  },
  render: (props: CardProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        {variants.map(variant => <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://avatars.githubusercontent.com/u/40891497?v=4" size="lg" />
            </Card.Header>
            <Card.Content>
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className="trds-text-md trds-text-neutral-500">
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>)}
      </div>;
  }
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const fr=["Default","Variant"];export{e as Default,o as Variant,fr as __namedExportsOrder,gr as default};
