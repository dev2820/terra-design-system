import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as n}from"./cva-C095pwBQ.js";import{R as u,I as C,a as g}from"./Combobox-DxqW-1dG.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./Input-BydU8ZSw.js";import"./create-split-props-aocGlKWx.js";import"./index-B-yFm4aN.js";import"./use-locale-context-B_Gjrn4q.js";import"./createLucideIcon-zijr-BYg.js";import"./portal-D9Tpc7Ci.js";import"./check-DUDaO23Y.js";import"./index-BiiAj-OS.js";import"./use-event-eGuf5zsd.js";import"./index-CUeq2rMp.js";import"./index-7ip9_ybX.js";import"./index-BsMcsNuy.js";import"./index-DimjarXC.js";import"./use-field-context-vbnK7brc.js";const m={Root:u,ItemGroup:C,Item:g},V={title:"Components/Combobox",component:m.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/combobox"}}},tags:["autodocs"],argTypes:{},args:{}},s=["React","Vue","Svelte","Solid"],a=["Javascript","Typescript"],r={args:{className:n({width:600})},render:p=>e.jsx("div",{className:n({display:"flex",width:"600px",height:"500px"}),children:e.jsxs(m.Root,{...p,items:[...s,...a,"None"],placeholder:"Combobox one",children:[e.jsx(m.Item,{item:"None",children:"None"}),e.jsx(m.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(m.Item,{item:o,children:o},o))}),e.jsx(m.ItemGroup,{label:"language",children:a.map(o=>e.jsx(m.Item,{item:o,children:o},o))})]})})},t={args:{className:n({width:600})},render:p=>e.jsx("div",{className:n({display:"flex",width:"600px",height:"500px"}),children:e.jsxs(m.Root,{...p,items:[...s,...a,"None"],placeholder:"Combobox one",multiple:!0,children:[e.jsx(m.Item,{item:"None",children:"None"}),e.jsx(m.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(m.Item,{item:o,children:o},o))}),e.jsx(m.ItemGroup,{label:"language",children:a.map(o=>e.jsx(m.Item,{item:o,children:o},o))})]})})};var i,l,b;r.parameters={...r.parameters,docs:{...(i=r.parameters)==null?void 0:i.docs,source:{originalSource:`{
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
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const q=["Default","MultiCombobox"];export{r as Default,t as MultiCombobox,q as __namedExportsOrder,V as default};
