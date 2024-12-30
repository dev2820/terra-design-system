import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{R as S,I,a as g}from"./Select-QyoqJkMW.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./use-locale-context-hL6yk3cA.js";import"./check-DUDaO23Y.js";import"./create-split-props-u5h9OPvL.js";import"./index-Bxx3IDnZ.js";import"./index-DE2wJq7j.js";import"./use-presence-C6AD7UWc.js";import"./use-event-eGuf5zsd.js";import"./index-Bc8Or9Mt.js";import"./index-Dhu86lpg.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bc1L1tNp.js";const r={Root:S,ItemGroup:I,Item:g},J={title:"Components/Select",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/select"}}},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},size:{options:["sm","md","lg"],control:{type:"select"}}},args:{disabled:!1,size:"md"}},l=["React","Vue","Svelte","Solid"],n=["Javascript","Typescript"],o={args:{className:"trds-w-96"},render:a=>t.jsx("div",{className:"trds-flex trds-w-48 trds-h-24",children:t.jsxs(r.Root,{...a,items:[...l,...n,"None"],placeholder:"Select one",children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:n.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})},s={args:{className:"trds-w-96"},render:a=>t.jsx("div",{className:"trds-flex trds-w-48 trds-h-96",children:t.jsxs(r.Root,{...a,items:[...l,...n,"None"],placeholder:"Select one",multiple:!0,children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:n.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})};var m,c,p;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-96'
  },
  render: (props: SelectProps['root']) => {
    return <div className="trds-flex trds-w-48 trds-h-24">
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
}`,...(p=(c=o.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var i,d,u;s.parameters={...s.parameters,docs:{...(i=s.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-96'
  },
  render: (props: SelectProps['root']) => {
    return <div className="trds-flex trds-w-48 trds-h-96">
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
}`,...(u=(d=s.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const O=["Default","MultiSelect"];export{o as Default,s as MultiSelect,O as __namedExportsOrder,J as default};
