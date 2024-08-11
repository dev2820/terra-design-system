import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as e,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-B6_JJTor.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-C2I-rN-d.js";import"./Badge-cQvqgMYI.js";import{B as s}from"./Button-BVDRYxdW.js";import{C as t}from"./Skeleton-LD6WnSce.js";import"./Checkbox-DMrI8DlA.js";import"./Collapsible-BxKvMvpp.js";import"./Combobox-DPQq0dnA.js";import"./DatePicker-BJSONUJ5.js";import"./Dialog-Cn77NYrF.js";import"./Drawer-Bbk7pjK-.js";import"./Field-B266x8SB.js";import"./FileUpload-Cz839xJ8.js";import"./Input-BydU8ZSw.js";import"./Link-CuuQqiTV.js";import"./NumberInput-C1LrgPt8.js";import"./Pagination-B7xZUgZt.js";import"./Progress-DGTJaP7z.js";import"./RadioGroup-CNir7seQ.js";import"./RatingGroup-Co1KRQsp.js";import"./SegmentGroup-C_ytAGMk.js";import"./Select-DgbUOlFo.js";import"./Slider-B-5S2z1M.js";import"./Spinner-BE0ZfWCW.js";import"./Switch-Br6E2hY_.js";import"./Table-QG2pYdBk.js";import"./Tabs-Bo_bz-Pm.js";import"./Textarea-CCfh2OzW.js";import"./Toast-Uq59u8UX.js";import"./Tooltip-Cl91fmmE.js";import"./TreeView-DiZD_--g.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-_nUwlzfN.js";import"./index-sV3Drpq0.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-D0WC3GAx.js";import"./index-DQwrfqfw.js";import"./use-locale-context-B5vdPRI5.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-wXQFoGrQ.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Dq9yVNyx.js";import"./portal-CuRnqJTB.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-DaxTOS81.js";import"./index-LaiofGft.js";import"./index-DXnRe0oe.js";import"./index-D5juEydB.js";import"./index-1NDb6mNj.js";import"./dialog-trigger-BcQxhW4v.js";import"./index-CkpBL3V2.js";import"./IconButton-E43GEZXc.js";import"./chevron-left-Bqxy6nNn.js";import"./ellipsis-Bl27Sm0D.js";import"./chevron-right-CT14g65n.js";import"./index-QEJZ41x8.js";import"./index-BR8t6gqn.js";import"./index-hTcMZcOQ.js";import"./index-4KpmSbEW.js";const C=["elevated","outline","filled"],Or={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},o={args:{},render:i=>r.jsxs(t.Root,{...i,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(t.Content,{className:e({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:e({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(s,{className:e({flex:1}),children:"Sign in"}),r.jsx(s,{theme:"primary",className:e({flex:1}),children:"🚀 Sign up"})]})]})},n={args:{},render:i=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(a=>r.jsxs(t.Root,{variant:a,...i,children:[r.jsx(t.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(t.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:e({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},a))})};var p,m,d,l,c;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <Card.Root {...props}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>Welcome! Begin your journey here.</Card.Description>
        </Card.Header>
        <Card.Content className={css({
        display: 'flex',
        flexDir: 'column'
      })}>
          <input type="text" placeholder="your email" />
          <input type="password" placeholder="your password" />
        </Card.Content>
        <Card.Footer className={css({
        display: 'flex',
        flexDir: 'row',
        gap: 4
      })}>
          <Button className={css({
          flex: 1
        })}>Sign in</Button>
          <Button theme="primary" className={css({
          flex: 1
        })}>
            🚀 Sign up
          </Button>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(d=(m=o.parameters)==null?void 0:m.docs)==null?void 0:d.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=o.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <div className={cx(flex({
      direction: 'row',
      gap: 4
    }))}>
        {variants.map(variant => <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://i.pravatar.cc/500" size="lg" />
            </Card.Header>
            <Card.Content>
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className={css({
            fontSize: 'md',
            fontWeight: 'bold'
          })}>
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>)}
      </div>;
  }
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const Mr=["Default","Variant"];export{o as Default,n as Variant,Mr as __namedExportsOrder,Or as default};
