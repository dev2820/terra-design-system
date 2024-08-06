import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as o,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-FhHteZSw.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-C_ISMPnp.js";import"./Badge-cQvqgMYI.js";import{B as s}from"./Button-BVDRYxdW.js";import{C as e}from"./Skeleton-LD6WnSce.js";import"./Link-CuuQqiTV.js";import"./Input-BydU8ZSw.js";import"./Checkbox-KQ1EsW6k.js";import"./Combobox-DxqW-1dG.js";import"./Collapsible-Bc0CsVPS.js";import"./Field-DhyKCHPb.js";import"./Slider-BQ5aPWFv.js";import"./NumberInput-DblSB0gb.js";import"./Progress-C301zv1k.js";import"./RadioGroup-C_puDtGA.js";import"./Switch-8OgiCmRQ.js";import"./Pagination-DYM2EXCe.js";import"./Select-DnVuxWPG.js";import"./Textarea-CCfh2OzW.js";import"./RatingGroup-CRnHboPl.js";import"./Spinner-BE0ZfWCW.js";import"./Dialog-C7-oiDUs.js";import"./Drawer-DU_IPH1Z.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./create-split-props-aocGlKWx.js";import"./index-B-yFm4aN.js";import"./use-locale-context-B_Gjrn4q.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./render-strategy-ptiSH5mO.js";import"./index-CUeq2rMp.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-Dzih10Fz.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-vbnK7brc.js";import"./portal-D9Tpc7Ci.js";import"./index-BiiAj-OS.js";import"./index-7ip9_ybX.js";import"./index-BsMcsNuy.js";import"./index-DimjarXC.js";import"./index-4KpmSbEW.js";import"./index-hTcMZcOQ.js";import"./IconButton-E43GEZXc.js";import"./ellipsis-Bl27Sm0D.js";import"./dialog-trigger-ivdNVY1H.js";import"./index-B7ySdDkw.js";const C=["elevated","outline","filled"],vr={title:"Components/Card",component:e.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},t={args:{},render:a=>r.jsxs(e.Root,{...a,children:[r.jsxs(e.Header,{children:[r.jsx(e.Title,{children:"Sign in"}),r.jsx(e.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(e.Content,{className:o({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(e.Footer,{className:o({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(s,{className:o({flex:1}),children:"Sign in"}),r.jsx(s,{theme:"primary",className:o({flex:1}),children:"🚀 Sign up"})]})]})},n={args:{},render:a=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(i=>r.jsxs(e.Root,{variant:i,...a,children:[r.jsx(e.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(e.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(e.Footer,{children:r.jsx("span",{className:o({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},i))})};var p,m,d,l,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(d=(m=t.parameters)==null?void 0:m.docs)==null?void 0:d.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const Dr=["Default","Variant"];export{t as Default,n as Variant,Dr as __namedExportsOrder,vr as default};
