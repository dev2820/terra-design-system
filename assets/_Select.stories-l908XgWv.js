import{j as e}from"./jsx-runtime-qGIIFXMu.js";import"./Accordion-DdhUars_.js";import"./Alert-Kp8PdpBf.js";import"./Avatar-DB_ZZXTM.js";import"./Badge-DENI8HDW.js";import"./Button-C4VbHy4b.js";import"./Skeleton-Bit1U5GP.js";import"./Carousel-D93fh9k5.js";import"./Checkbox-DxnjDNOX.js";import"./Collapsible-efNrRExo.js";import"./ColorPicker-CMxR3t7e.js";import{s as I,I as u,t as h,V as j,u as w,v as g,w as T,x as k,y as C,z as b,E as f,G,J as L,K as P,L as F}from"./Tooltip-CAu6ypBZ.js";import"./Field-Ca_xrkg7.js";import"./FileUpload-D_tY-3KJ.js";import"./IconButton-CccESD27.js";import"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-ChfNHWDy.js";import"./Pagination-E5yK6SoQ.js";import"./Progress-I4NP4T-d.js";import"./RadioGroup-CUgAT4YD.js";import"./RatingGroup-CyfwjAu0.js";import"./SegmentGroup-Bxgi1O8K.js";import"./Slider-jEiCdT2F.js";import"./Spinner-CANb2VKy.js";import"./Switch-CPhQid8C.js";import"./Table-wVyN-NMp.js";import"./Tabs-BuHGcjZx.js";import"./Textarea-CNmOYPS6.js";import"./Toast-7o5H_X8Q.js";import"./TreeView-4Fbi7LXj.js";import{C as S}from"./chevron-down-Du6SRUSG.js";import{P as x}from"./portal-D-Vx2HB0.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";import"./createLucideIcon-zijr-BYg.js";import"./Slot-Bw9mQsad.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bl-xBte_.js";import"./use-presence-dzHLm_sJ.js";import"./index-CMjQVyXy.js";import"./index-B4yh-cB0.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";const t={Root:I,Item:u,ItemText:h,ValueText:j,ItemIndicator:w,ItemGroup:g,ItemGroupLabel:T,Trigger:k,Content:C,Control:b,Positioner:f,HiddenSelect:G,ClearTrigger:L,Indicator:P,Label:F},Ne={title:"Components/Select",component:t.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/select"}}},tags:["autodocs"],argTypes:{disabled:{control:{type:"boolean"}},size:{options:["sm","md","lg"],control:{type:"select"}}},args:{disabled:!1,size:"md"}},n=["React","Vue","Svelte","Solid"],o={args:{className:"trds-w-96",items:n},render:l=>e.jsx("div",{className:"trds-flex trds-w-48 trds-h-24",children:e.jsxs(t.Root,{...l,children:[e.jsx(t.Label,{children:"Framework"}),e.jsx(t.Control,{className:"trds-w-48",children:e.jsxs(t.Trigger,{children:[e.jsx(t.ValueText,{placeholder:"Select a Framework"}),e.jsx(t.Indicator,{children:e.jsx(S,{})})]})}),e.jsx(x,{children:e.jsx(t.Positioner,{children:e.jsx(t.Content,{children:e.jsxs(t.ItemGroup,{children:[e.jsx(t.ItemGroupLabel,{children:"Frameworks"}),n.map(r=>e.jsxs(t.Item,{item:r,children:[e.jsx(t.ItemText,{children:r}),e.jsx(t.ItemIndicator,{children:"✓"})]},r))]})})})}),e.jsx(t.HiddenSelect,{})]})})},s={args:{className:"trds-w-96",multiple:!0,items:n},render:l=>e.jsx("div",{className:"trds-flex trds-w-48 trds-h-96",children:e.jsxs(t.Root,{...l,children:[e.jsx(t.Label,{children:"Framework"}),e.jsx(t.Control,{className:"trds-w-48",children:e.jsxs(t.Trigger,{children:[e.jsx(t.ValueText,{placeholder:"Select a Framework"}),e.jsx(t.Indicator,{children:e.jsx(S,{})})]})}),e.jsx(x,{children:e.jsx(t.Positioner,{children:e.jsx(t.Content,{children:e.jsxs(t.ItemGroup,{children:[e.jsx(t.ItemGroupLabel,{children:"Frameworks"}),n.map(r=>e.jsxs(t.Item,{item:r,children:[e.jsx(t.ItemText,{children:r}),e.jsx(t.ItemIndicator,{children:"✓"})]},r))]})})})}),e.jsx(t.HiddenSelect,{})]})})};var c,i,m;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-96',
    items: frameworks
  },
  render: (props: SelectProps['Root']) => {
    return <div className="trds-flex trds-w-48 trds-h-24">
        <Select.Root {...props}>
          <Select.Label>Framework</Select.Label>
          <Select.Control className="trds-w-48">
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>
                <ChevronDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {frameworks.map(item => <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>)}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </div>;
  }
}`,...(m=(i=o.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var a,p,d;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    className: 'trds-w-96',
    multiple: true,
    items: frameworks
  },
  render: (props: SelectProps['Root']) => {
    return <div className="trds-flex trds-w-48 trds-h-96">
        <Select.Root {...props}>
          <Select.Label>Framework</Select.Label>
          <Select.Control className="trds-w-48">
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>
                <ChevronDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {frameworks.map(item => <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>)}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </div>;
  }
}`,...(d=(p=s.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};const Re=["Default","MultiSelect"];export{o as Default,s as MultiSelect,Re as __namedExportsOrder,Ne as default};
