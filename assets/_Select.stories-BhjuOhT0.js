import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{a as s}from"./cva-C095pwBQ.js";import{R as g,I as h,a as I}from"./Select-DnVuxWPG.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./create-split-props-aocGlKWx.js";import"./index-B-yFm4aN.js";import"./use-locale-context-B_Gjrn4q.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./portal-D9Tpc7Ci.js";import"./check-DUDaO23Y.js";import"./index-BiiAj-OS.js";import"./use-event-eGuf5zsd.js";import"./index-CUeq2rMp.js";import"./index-7ip9_ybX.js";import"./index-BsMcsNuy.js";import"./index-DBzJ7FiP.js";import"./use-field-context-vbnK7brc.js";const r={Root:g,ItemGroup:h,Item:I},q={title:"Components/Select",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/select"}}},tags:["autodocs"],argTypes:{},args:{}},a=["React","Vue","Svelte","Solid"],l=["Javascript","Typescript"],o={args:{className:s({width:400})},render:m=>t.jsx("div",{className:s({display:"flex",width:"200px",height:"500px"}),children:t.jsxs(r.Root,{...m,items:[...a,...l,"None"],placeholder:"Select one",children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:a.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})},n={args:{className:s({width:400})},render:m=>t.jsx("div",{className:s({display:"flex",width:"200px",height:"500px"}),children:t.jsxs(r.Root,{...m,items:[...a,...l,"None"],placeholder:"Select one",multiple:!0,children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:a.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})};var c,p,i;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    className: css({
      width: 400
    })
  },
  render: (props: SelectProps['root']) => {
    return <div className={css({
      display: 'flex',
      width: '200px',
      height: '500px'
    })}>
        <Select.Root {...props} items={[...frameworks, ...languages, 'None']} placeholder="Select one">
          <Select.Item item="None">None</Select.Item>
          <Select.ItemGroup label="frameworks">
            {frameworks.map(fw => <Select.Item item={fw} key={fw}>
                {fw}
              </Select.Item>)}
          </Select.ItemGroup>
          <Select.ItemGroup label="language">
            {languages.map(lang => <Select.Item item={lang} key={lang}>
                {lang}
              </Select.Item>)}
          </Select.ItemGroup>
        </Select.Root>
      </div>;
  }
}`,...(i=(p=o.parameters)==null?void 0:p.docs)==null?void 0:i.source}}};var d,u,S;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    className: css({
      width: 400
    })
  },
  render: (props: SelectProps['root']) => {
    return <div className={css({
      display: 'flex',
      width: '200px',
      height: '500px'
    })}>
        <Select.Root {...props} items={[...frameworks, ...languages, 'None']} placeholder="Select one" multiple>
          <Select.Item item="None">None</Select.Item>
          <Select.ItemGroup label="frameworks">
            {frameworks.map(fw => <Select.Item item={fw} key={fw}>
                {fw}
              </Select.Item>)}
          </Select.ItemGroup>
          <Select.ItemGroup label="language">
            {languages.map(lang => <Select.Item item={lang} key={lang}>
                {lang}
              </Select.Item>)}
          </Select.ItemGroup>
        </Select.Root>
      </div>;
  }
}`,...(S=(u=n.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};const z=["Default","MultiSelect"];export{o as Default,n as MultiSelect,z as __namedExportsOrder,q as default};
