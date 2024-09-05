import{j as t}from"./jsx-runtime-qGIIFXMu.js";import{R as S,I,a as g}from"./Select-BsWlbIYo.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./create-react-context-Dw26gLIP.js";import"./tv-Br1lVx4G.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./portal-BWW2K-Dr.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CTaGYWMe.js";import"./check-DUDaO23Y.js";import"./create-split-props-u5h9OPvL.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./index-Dwc3-hf4.js";import"./index-B1LdDssV.js";import"./index-DRtd-hRg.js";import"./index-CdZdUDHv.js";import"./index-BTGRfmW-.js";import"./index-DBzJ7FiP.js";import"./use-field-context-CzRTzM_q.js";const r={Root:S,ItemGroup:I,Item:g},A={title:"Components/Select",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/select"}}},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},size:{options:["sm","md","lg"],control:{type:"select"}}},args:{disabled:!1,size:"md"}},l=["React","Vue","Svelte","Solid"],m=["Javascript","Typescript"],o={args:{className:"trds-w-96"},render:n=>t.jsx("div",{className:"trds-flex trds-w-48 trds-h-24",children:t.jsxs(r.Root,{...n,items:[...l,...m,"None"],placeholder:"Select one",children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:m.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})},s={args:{className:"trds-w-96"},render:n=>t.jsx("div",{className:"trds-flex trds-w-48 trds-h-96",children:t.jsxs(r.Root,{...n,items:[...l,...m,"None"],placeholder:"Select one",multiple:!0,children:[t.jsx(r.Item,{item:"None",children:"None"}),t.jsx(r.ItemGroup,{label:"frameworks",children:l.map(e=>t.jsx(r.Item,{item:e,children:e},e))}),t.jsx(r.ItemGroup,{label:"language",children:m.map(e=>t.jsx(r.Item,{item:e,children:e},e))})]})})};var a,c,p;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
}`,...(u=(d=s.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};const B=["Default","MultiSelect"];export{o as Default,s as MultiSelect,B as __namedExportsOrder,A as default};
