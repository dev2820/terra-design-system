import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as n,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-BGoYIkFx.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-BF2z82co.js";import"./Badge-cQvqgMYI.js";import{B as i}from"./Button-BqV08Sjs.js";import{C as e}from"./index-B1wKpd-r.js";import"./Link-NqX2B7Ij.js";import"./Input-BydU8ZSw.js";import"./Checkbox-D7ha5Ppd.js";import"./Collapsible-Co9ySoaM.js";import"./Slider-DQpwWYFn.js";import"./NumberInput-Bctgbq_R.js";import"./Progress-BxURvrfQ.js";import"./RadioGroup-CW9QpMD9.js";import"./Switch--IXybQzF.js";import"./Select-BbXQsMH-.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./use-locale-context-Cpyu8C1_.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./index-BXTwHpfi.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-CBKLDLNM.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-Bc7AdKyF.js";import"./index-4KpmSbEW.js";import"./index-mn7sIeA1.js";const C=["elevated","outline","filled"],er={title:"Components/Card",component:e.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},t={args:{},render:a=>r.jsxs(e.Root,{...a,children:[r.jsxs(e.Header,{children:[r.jsx(e.Title,{children:"Sign in"}),r.jsx(e.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(e.Content,{className:n({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(e.Footer,{className:n({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(i,{className:n({flex:1}),children:"Sign in"}),r.jsx(i,{theme:"primary",className:n({flex:1}),children:"🚀 Sign up"})]})]})},o={args:{},render:a=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(s=>r.jsxs(e.Root,{variant:s,...a,children:[r.jsx(e.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(e.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(e.Footer,{children:r.jsx("span",{className:n({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},s))})};var p,d,l,c,m;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(m=(c=t.parameters)==null?void 0:c.docs)==null?void 0:m.description}}};var u,x,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const tr=["Default","Variant"];export{t as Default,o as Variant,tr as __namedExportsOrder,er as default};
