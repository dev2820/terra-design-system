import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as n}from"./index-CO00fS6N.js";import{R as u,I as C,a as g}from"./Combobox-DqAczYHd.js";import"./index-CDs2tPxN.js";import"./sva-qXmx1AZm.js";import"./create-react-context-Dw26gLIP.js";import"./Input-DFjsJI9P.js";import"./factory-BCwUXDVF.js";import"./index-B-yFm4aN.js";import"./index-Dquv0SIZ.js";import"./createLucideIcon-zijr-BYg.js";import"./portal-DVHZYSwj.js";import"./use-locale-context-0tfyuFre.js";import"./check-DUDaO23Y.js";import"./create-split-props-u5h9OPvL.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-zw3amx30.js";import"./use-event-eGuf5zsd.js";import"./index-BI_J112u.js";import"./index-qa1jsk-d.js";import"./index-DDey0k43.js";import"./index-B-4z8KQ4.js";import"./index-Bi-kwPO5.js";import"./use-field-context-BjqdMh-O.js";const m={Root:u,ItemGroup:C,Item:g},B={title:"Components/Combobox",component:m.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/combobox"}}},tags:["autodocs"],argTypes:{},args:{}},s=["React","Vue","Svelte","Solid"],a=["Javascript","Typescript"],r={args:{className:n({width:600})},render:p=>e.jsx("div",{className:n({display:"flex",width:"600px",height:"500px"}),children:e.jsxs(m.Root,{...p,items:[...s,...a,"None"],placeholder:"Combobox one",children:[e.jsx(m.Item,{item:"None",children:"None"}),e.jsx(m.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(m.Item,{item:o,children:o},o))}),e.jsx(m.ItemGroup,{label:"language",children:a.map(o=>e.jsx(m.Item,{item:o,children:o},o))})]})})},t={args:{className:n({width:600})},render:p=>e.jsx("div",{className:n({display:"flex",width:"600px",height:"500px"}),children:e.jsxs(m.Root,{...p,items:[...s,...a,"None"],placeholder:"Combobox one",multiple:!0,children:[e.jsx(m.Item,{item:"None",children:"None"}),e.jsx(m.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(m.Item,{item:o,children:o},o))}),e.jsx(m.ItemGroup,{label:"language",children:a.map(o=>e.jsx(m.Item,{item:o,children:o},o))})]})})};var i,l,b;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    className: css({
      width: 600
    })
  },
  render: (props: ComboboxProps['root']) => {
    return <div className={css({
      display: 'flex',
      width: '600px',
      height: '500px'
    })}>
        <Combobox.Root {...props} items={[...frameworks, ...languages, 'None']} placeholder="Combobox one">
          <Combobox.Item item="None">None</Combobox.Item>
          <Combobox.ItemGroup label="frameworks">
            {frameworks.map(fw => <Combobox.Item item={fw} key={fw}>
                {fw}
              </Combobox.Item>)}
          </Combobox.ItemGroup>
          <Combobox.ItemGroup label="language">
            {languages.map(lang => <Combobox.Item item={lang} key={lang}>
                {lang}
              </Combobox.Item>)}
          </Combobox.ItemGroup>
        </Combobox.Root>
      </div>;
  }
}`,...(b=(l=r.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var x,c,d;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    className: css({
      width: 600
    })
  },
  render: (props: ComboboxProps['root']) => {
    return <div className={css({
      display: 'flex',
      width: '600px',
      height: '500px'
    })}>
        <Combobox.Root {...props} items={[...frameworks, ...languages, 'None']} placeholder="Combobox one" multiple>
          <Combobox.Item item="None">None</Combobox.Item>
          <Combobox.ItemGroup label="frameworks">
            {frameworks.map(fw => <Combobox.Item item={fw} key={fw}>
                {fw}
              </Combobox.Item>)}
          </Combobox.ItemGroup>
          <Combobox.ItemGroup label="language">
            {languages.map(lang => <Combobox.Item item={lang} key={lang}>
                {lang}
              </Combobox.Item>)}
          </Combobox.ItemGroup>
        </Combobox.Root>
      </div>;
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const F=["Default","MultiCombobox"];export{r as Default,t as MultiCombobox,F as __namedExportsOrder,B as default};