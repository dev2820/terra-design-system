import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as c,I as u,a as C}from"./Combobox-CEVnIV7c.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./create-react-context-Dw26gLIP.js";import"./tv-Br1lVx4G.js";import"./Input-DdliT5NN.js";import"./createLucideIcon-zijr-BYg.js";import"./portal-BWW2K-Dr.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./use-locale-context-CTaGYWMe.js";import"./check-DUDaO23Y.js";import"./create-split-props-u5h9OPvL.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./index-Dwc3-hf4.js";import"./index-B1LdDssV.js";import"./index-DRtd-hRg.js";import"./index-CdZdUDHv.js";import"./index-lb5DGD3A.js";import"./index-BTGRfmW-.js";import"./use-field-context-CzRTzM_q.js";const r={Root:c,ItemGroup:u,Item:C},A={title:"Components/Combobox",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/combobox"}}},tags:["autodocs"],argTypes:{},args:{}},s=["React","Vue","Svelte","Solid"],n=["Javascript","Typescript"],m={args:{className:"trds-w-[600px]"},render:a=>e.jsx("div",{className:"trds-flex trds-w-[600px] trds-h-[500px]",children:e.jsxs(r.Root,{...a,items:[...s,...n,"None"],placeholder:"Combobox one",children:[e.jsx(r.Item,{item:"None",children:"None"}),e.jsx(r.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(r.Item,{item:o,children:o},o))}),e.jsx(r.ItemGroup,{label:"language",children:n.map(o=>e.jsx(r.Item,{item:o,children:o},o))})]})})},t={args:{className:"trds-w-[600px]"},render:a=>e.jsx("div",{className:"trds-flex trds-w-[600px] trds-h-[500px]",children:e.jsxs(r.Root,{...a,items:[...s,...n,"None"],placeholder:"Combobox one",multiple:!0,children:[e.jsx(r.Item,{item:"None",children:"None"}),e.jsx(r.ItemGroup,{label:"frameworks",children:s.map(o=>e.jsx(r.Item,{item:o,children:o},o))}),e.jsx(r.ItemGroup,{label:"language",children:n.map(o=>e.jsx(r.Item,{item:o,children:o},o))})]})})};var p,b,l;m.parameters={...m.parameters,docs:{...(p=m.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-[600px]'
  },
  render: (props: ComboboxProps['root']) => {
    return <div className="trds-flex trds-w-[600px] trds-h-[500px]">
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
}`,...(l=(b=m.parameters)==null?void 0:b.docs)==null?void 0:l.source}}};var i,x,d;t.parameters={...t.parameters,docs:{...(i=t.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-[600px]'
  },
  render: (props: ComboboxProps['root']) => {
    return <div className="trds-flex trds-w-[600px] trds-h-[500px]">
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
}`,...(d=(x=t.parameters)==null?void 0:x.docs)==null?void 0:d.source}}};const B=["Default","MultiCombobox"];export{m as Default,t as MultiCombobox,B as __namedExportsOrder,A as default};
