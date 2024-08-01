import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{a as n,c as g}from"./cva-C095pwBQ.js";import{f}from"./spacer-CRhrBJcD.js";import"./Accordion-wcd69mca.js";import"./Alert-D8VVORGz.js";import{A as y}from"./Avatar-Bwy0id0e.js";import"./Badge-cQvqgMYI.js";import{B as i}from"./Button-BqV08Sjs.js";import{C as e}from"./Skeleton-LD6WnSce.js";import"./Link-NqX2B7Ij.js";import"./Input-BydU8ZSw.js";import"./Checkbox-BlZLviD7.js";import"./Collapsible-C-hbgofs.js";import"./Slider-Br8lKMO7.js";import"./NumberInput-CZabPKOG.js";import"./Progress-DA3xD-fQ.js";import"./RadioGroup-Hljd4_N5.js";import"./Switch-MFbrrAM_.js";import"./Select-BWjqcMDt.js";import"./Textarea-CCfh2OzW.js";import"./RatingGroup-CuSBwtP6.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./use-locale-context-DWoAJph3.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./index-Dli2qhww.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-Bbs8g-vl.js";import"./index-DOljKnny.js";import"./check-DUDaO23Y.js";import"./index-Bc7AdKyF.js";import"./index-4KpmSbEW.js";import"./index-hTcMZcOQ.js";import"./portal-j78y2agC.js";import"./index-DbNU4G5I.js";const C=["elevated","outline","filled"],ar={title:"Components/Card",component:e.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:C,control:{type:"select"}}},args:{}},t={args:{},render:a=>r.jsxs(e.Root,{...a,children:[r.jsxs(e.Header,{children:[r.jsx(e.Title,{children:"Sign in"}),r.jsx(e.Description,{children:"Welcome! Begin your journey here."})]}),r.jsxs(e.Content,{className:n({display:"flex",flexDir:"column"}),children:[r.jsx("input",{type:"text",placeholder:"your email"}),r.jsx("input",{type:"password",placeholder:"your password"})]}),r.jsxs(e.Footer,{className:n({display:"flex",flexDir:"row",gap:4}),children:[r.jsx(i,{className:n({flex:1}),children:"Sign in"}),r.jsx(i,{theme:"primary",className:n({flex:1}),children:"🚀 Sign up"})]})]})},o={args:{},render:a=>r.jsx("div",{className:g(f({direction:"row",gap:4})),children:C.map(s=>r.jsxs(e.Root,{variant:s,...a,children:[r.jsx(e.Header,{children:r.jsx(y,{src:"https://i.pravatar.cc/500",size:"lg"})}),r.jsx(e.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),r.jsx(e.Footer,{children:r.jsx("span",{className:n({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},s))})};var p,d,l,m,c;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
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
}`,...(l=(d=t.parameters)==null?void 0:d.docs)==null?void 0:l.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.description}}};var u,x,h;o.parameters={...o.parameters,docs:{...(u=o.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(h=(x=o.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};const sr=["Default","Variant"];export{t as Default,o as Variant,sr as __namedExportsOrder,ar as default};
