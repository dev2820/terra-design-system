import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as n}from"./index-CO00fS6N.js";import{B as s}from"./Button-BuXCJdcD.js";import{I as u}from"./IconButton-BGSzFWva.js";import{R as w,T as g,C as D,H as x,B as y,F as f,a as C,D as j,b as T}from"./Drawer-DoUUBD8X.js";import{X as h}from"./x-BG8jWvjC.js";import"./index-CDs2tPxN.js";import"./createLucideIcon-zijr-BYg.js";import"./sva-qXmx1AZm.js";import"./create-react-context-Dw26gLIP.js";import"./dialog-trigger-DxUI0aph.js";import"./factory-BCwUXDVF.js";import"./index-B-yFm4aN.js";import"./index-Dquv0SIZ.js";import"./index-DJ3ti8gJ.js";import"./render-strategy-B0fJl-aJ.js";import"./create-split-props-u5h9OPvL.js";import"./use-presence-zw3amx30.js";import"./use-event-eGuf5zsd.js";import"./split-presence-props-DcTE3k_W.js";import"./index-B-4z8KQ4.js";import"./index-Bi-kwPO5.js";import"./index-qa1jsk-d.js";import"./index-CgflYHCK.js";import"./use-locale-context-0tfyuFre.js";import"./portal-DVHZYSwj.js";const r={Root:w,Trigger:g,Content:D,Header:x,Body:y,Footer:f,Title:C,Description:j,CloseTrigger:T},U={title:"Components/Drawer",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/dialog"}}},tags:["autodocs"],argTypes:{},args:{}},t={args:{},render:o=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{asChild:!0,children:e.jsx(s,{children:"Open Drawer"})}),e.jsxs(r.Content,{className:n({w:400,p:4}),children:[e.jsxs(r.Header,{children:[e.jsxs(r.Title,{className:n({display:"flex",flexDir:"row",justifyContent:"space-between",mb:4}),children:[e.jsx("span",{className:n({lineHeight:"200%"}),children:"Lorem Ipsum"}),e.jsx(r.CloseTrigger,{asChild:!0,children:e.jsx(u,{size:"sm",variant:"ghost",children:e.jsx(h,{size:16})})})]}),e.jsx(r.Description,{className:n({mb:4}),children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsx(r.Body,{children:"Hello World"}),e.jsx(r.Footer,{children:e.jsxs("div",{className:n({display:"flex",flexDir:"row-reverse",gap:2,w:"full"}),children:[e.jsx(s,{variant:"filled",theme:"primary",children:"Confirm"}),e.jsx(r.CloseTrigger,{asChild:!0,children:e.jsx(s,{variant:"outline",theme:"neutral","aria-label":"Close Drawer",children:"Close"})})]})})]})]})},a={args:{variant:"left"},render:o=>e.jsxs(r.Root,{...o,children:[e.jsx(r.Trigger,{asChild:!0,children:e.jsx(s,{children:"Open Drawer"})}),e.jsxs(r.Content,{className:n({w:400,p:4}),children:[e.jsxs(r.Header,{children:[e.jsxs(r.Title,{className:n({display:"flex",flexDir:"row",justifyContent:"space-between",mb:4}),children:[e.jsx("span",{className:n({lineHeight:"200%"}),children:"Lorem Ipsum"}),e.jsx(r.CloseTrigger,{asChild:!0,children:e.jsx(u,{size:"sm",variant:"ghost",children:e.jsx(h,{size:16})})})]}),e.jsx(r.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsx(r.Body,{children:"Hello World"}),e.jsx(r.Footer,{children:e.jsxs("div",{className:n({display:"flex",flexDir:"row-reverse",gap:2,w:"full"}),children:[e.jsx(s,{variant:"filled",theme:"primary",children:"Confirm"}),e.jsx(r.CloseTrigger,{asChild:!0,children:e.jsx(s,{variant:"outline",theme:"neutral","aria-label":"Close Drawer",children:"Close"})})]})})]})]})};var i,l,m;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: DrawerProps['root']) => {
    return <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className={css({
        w: 400,
        p: 4
      })}>
          <Drawer.Header>
            <Drawer.Title className={css({
            display: 'flex',
            flexDir: 'row',
            justifyContent: 'space-between',
            mb: 4
          })}>
              <span className={css({
              lineHeight: '200%'
            })}>Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description className={css({
            mb: 4
          })}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className={css({
            display: 'flex',
            flexDir: 'row-reverse',
            gap: 2,
            w: 'full'
          })}>
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline" theme="neutral" aria-label="Close Drawer">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>;
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,p,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    variant: 'left'
  },
  render: (props: DrawerProps['root']) => {
    return <Drawer.Root {...props}>
        <Drawer.Trigger asChild>
          <Button>Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content className={css({
        w: 400,
        p: 4
      })}>
          <Drawer.Header>
            <Drawer.Title className={css({
            display: 'flex',
            flexDir: 'row',
            justifyContent: 'space-between',
            mb: 4
          })}>
              <span className={css({
              lineHeight: '200%'
            })}>Lorem Ipsum</span>
              <Drawer.CloseTrigger asChild>
                <IconButton size="sm" variant="ghost">
                  <XIcon size={16} />
                </IconButton>
              </Drawer.CloseTrigger>
            </Drawer.Title>
            <Drawer.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body>Hello World</Drawer.Body>
          <Drawer.Footer>
            <div className={css({
            display: 'flex',
            flexDir: 'row-reverse',
            gap: 2,
            w: 'full'
          })}>
              <Button variant="filled" theme="primary">
                Confirm
              </Button>
              <Drawer.CloseTrigger asChild>
                <Button variant="outline" theme="neutral" aria-label="Close Drawer">
                  Close
                </Button>
              </Drawer.CloseTrigger>
            </div>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Root>;
  }
}`,...(c=(p=a.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};const Y=["Default","Variant"];export{t as Default,a as Variant,Y as __namedExportsOrder,U as default};