import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as o,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-BeeHS-q8.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-DiAr6rxL.js";import"./Badge-cQvqgMYI.js";import{B as i}from"./Button-BqV08Sjs.js";import{C as e}from"./Skeleton-LD6WnSce.js";import"./Link-NqX2B7Ij.js";import"./Input-BydU8ZSw.js";import"./Checkbox-Df3vZr4X.js";import"./Combobox-DOn5ibq4.js";import"./Collapsible-D8fMEC1b.js";import"./Slider-wIL1bHiW.js";import"./NumberInput-1Dt5KDIZ.js";import"./Progress-Bq4Kn3-5.js";import"./RadioGroup-BLHTpk7t.js";import"./Switch-Ck_sDPDg.js";import"./Select-CeaIJRUz.js";import"./Textarea-CCfh2OzW.js";import"./RatingGroup-DASRcjCG.js";import"./Spinner-BE0ZfWCW.js";import"./Dialog-BqKYqoYW.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./use-locale-context-BOqpzadf.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./render-strategy-Dh08fE-v.js";import"./index-4VAcYN_X.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-g_U6M1Il.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-Bc7AdKyF.js";import"./portal-ZEB98p48.js";import"./index-dMBs-5Uu.js";import"./index-DHm5Ag3V.js";import"./index-BOBSZ6Us.js";import"./index-BvO06sdd.js";import"./index-4KpmSbEW.js";import"./index-hTcMZcOQ.js";const C=["elevated","outline","filled"],cr={title:"Components/Card",component:e.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},t={args:{},render:a=>r.jsxs(e.Root,{...a,children:[r.jsxs(e.Header,{children:[r.jsx(e.Title,{children:"Sign in"}),r.jsx(e.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(e.Content,{className:o({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(e.Footer,{className:o({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(i,{className:o({flex:1}),children:"Sign in"}),r.jsx(i,{theme:"primary",className:o({flex:1}),children:"🚀 Sign up"})]})]})},n={args:{},render:a=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(s=>r.jsxs(e.Root,{variant:s,...a,children:[r.jsx(e.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(e.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(e.Footer,{children:r.jsx("span",{className:o({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},s))})};var p,d,m,l,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(m=(d=t.parameters)==null?void 0:d.docs)==null?void 0:m.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.description}}};var u,x,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=n.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const ur=["Default","Variant"];export{t as Default,n as Variant,ur as __namedExportsOrder,cr as default};
