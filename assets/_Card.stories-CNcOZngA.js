import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as o,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-DCZZDNpP.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-B1a7iCfY.js";import"./Badge-cQvqgMYI.js";import{B as s}from"./Button-BVDRYxdW.js";import{C as t}from"./Skeleton-LD6WnSce.js";import"./Link-CuuQqiTV.js";import"./Input-BydU8ZSw.js";import"./Checkbox-BVcKlbXn.js";import"./Combobox-BU_weBTV.js";import"./Collapsible-BoOT_eSZ.js";import"./Field-CkmCy02z.js";import"./Slider-kGdUiT_u.js";import"./NumberInput-C0OXne5i.js";import"./Progress-DGLIG7Gv.js";import"./RadioGroup-DrSVcs93.js";import"./Switch-Do5umUGc.js";import"./Pagination-Cd9Pzfa1.js";import"./Select-CKVoYZ8a.js";import"./Textarea-CCfh2OzW.js";import"./RatingGroup-CunkVA6k.js";import"./Spinner-BE0ZfWCW.js";import"./Dialog-Cm5QuIk3.js";import"./Drawer-Cy5cbp4-.js";import"./Tooltip-h7aSxu8v.js";import"./SegmentGroup-CEmvblql.js";import"./Tabs-CuGF131v.js";import"./Table-QG2pYdBk.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./create-split-props-B1LGkfrB.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CfI1cghP.js";import"./index-sV3Drpq0.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./render-strategy-BSWQDjQ2.js";import"./index-DtKw-7gC.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-DdYi249N.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Cn9om32m.js";import"./portal-Cd3VyvkQ.js";import"./split-presence-props-D9IGhxAv.js";import"./use-presence-JGUWPUYJ.js";import"./index-C4y_itFc.js";import"./index-DBvQjjJd.js";import"./index-CYG3O1W4.js";import"./index-Bu2rmP34.js";import"./index-4KpmSbEW.js";import"./index-hTcMZcOQ.js";import"./index-CZOktVFI.js";import"./index-BR8t6gqn.js";import"./IconButton-E43GEZXc.js";import"./ellipsis-Bl27Sm0D.js";import"./dialog-trigger-DZjal4jv.js";import"./index-Cw5cyZsc.js";const C=["elevated","outline","filled"],Fr={title:"Components/Card",component:t.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},e={args:{},render:a=>r.jsxs(t.Root,{...a,children:[r.jsxs(t.Header,{children:[r.jsx(t.Title,{children:"Sign in"}),r.jsx(t.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(t.Content,{className:o({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(t.Footer,{className:o({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(s,{className:o({flex:1}),children:"Sign in"}),r.jsx(s,{theme:"primary",className:o({flex:1}),children:"🚀 Sign up"})]})]})},n={args:{},render:a=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(i=>r.jsxs(t.Root,{variant:i,...a,children:[r.jsx(t.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(t.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(t.Footer,{children:r.jsx("span",{className:o({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},i))})};var p,m,d,l,c;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(m=e.parameters)==null?void 0:m.docs)==null?void 0:d.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=e.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const Hr=["Default","Variant"];export{e as Default,n as Variant,Hr as __namedExportsOrder,Fr as default};
