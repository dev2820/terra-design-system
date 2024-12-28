import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{c as p}from"./tv-CIwtzMts.js";import{I as a}from"./IconButton-BhuYW3nN.js";import{I as l}from"./Input-DHWz4W3Z.js";import{R as C,S as x,a as u,b as m,C as k,E as P,T as g,c as f,d as j,e as S,A as v,f as T,g as I,P as w,h as N,i as y,j as b,k as A}from"./ColorPicker-D7VAGquu.js";import{c as B}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./Button-Dwqr5mVQ.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-BYwEg9-n.js";import"./use-event-eGuf5zsd.js";import"./index-CMjQVyXy.js";import"./index-DRtd-hRg.js";import"./index-l88IbyY5.js";import"./index-6Viw2UEs.js";import"./index-6PaDttyw.js";import"./index-DBzJ7FiP.js";import"./use-locale-context-CTaGYWMe.js";import"./use-field-context-CzRTzM_q.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=B("Pipette",[["path",{d:"m2 22 1-1h3l9-9",key:"1sre89"}],["path",{d:"M3 21v-3l9-9",key:"hpe2y6"}],["path",{d:"m15 6 3.4-3.4a2.1 2.1 0 1 1 3 3L18 9l.4.4a2.1 2.1 0 1 1-3 3l-3.8-3.8a2.1 2.1 0 1 1 3-3l.4.4Z",key:"196du1"}]]),e={Root:C,SwatchTrigger:x,Swatch:u,SwatchGroup:m,Context:k,EyeDropperTrigger:P,TransparencyGrid:g,Content:f,Trigger:j,Control:S,AreaBackground:v,AreaThumb:T,Area:I,Positioner:w,ChannelInput:N,ChannelSlider:y,ChannelSliderThumb:b,ChannelSliderTrack:A},lr={title:"Components/ColorPicker",component:e.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},G=["hsl(10, 81%, 59%)","hsl(60, 81%, 59%)","hsl(100, 81%, 59%)","hsl(175, 81%, 59%)","hsl(190, 81%, 59%)","hsl(205, 81%, 59%)","hsl(220, 81%, 59%)","hsl(250, 81%, 59%)","hsl(280, 81%, 59%)","hsl(350, 81%, 59%)"],n={args:{defaultValue:"#eb5e41"},render:c=>r.jsx("div",{className:"trds-flex trds-w-[600px] trds-h-[500px]",children:r.jsx(e.Root,{...c,children:r.jsx(e.Context,{children:d=>r.jsxs(r.Fragment,{children:[r.jsxs(e.Control,{children:[r.jsx(e.ChannelInput,{channel:"hex",asChild:!0,children:r.jsx(l,{className:"trds-flex-1"})}),r.jsx(e.Trigger,{asChild:!0,children:r.jsx(a,{variant:"outline",className:"trds-flex-none",children:r.jsx(e.Swatch,{value:d.value})})})]}),r.jsx(e.Positioner,{children:r.jsx(e.Content,{children:r.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-3",children:[r.jsxs(e.Area,{children:[r.jsx(e.AreaBackground,{}),r.jsx(e.AreaThumb,{})]}),r.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-3",children:[r.jsx(e.EyeDropperTrigger,{asChild:!0,children:r.jsx(a,{variant:"outline",size:"sm","aria-label":"Pick a color",children:r.jsx(E,{size:20})})}),r.jsxs("div",{className:p("trds-flex trds-flex-col trds-gap-2 trds-flex-1"),children:[r.jsxs(e.ChannelSlider,{channel:"hue",children:[r.jsx(e.ChannelSliderTrack,{}),r.jsx(e.ChannelSliderThumb,{})]}),r.jsxs(e.ChannelSlider,{channel:"alpha",children:[r.jsx(e.TransparencyGrid,{size:"8px"}),r.jsx(e.ChannelSliderTrack,{}),r.jsx(e.ChannelSliderThumb,{})]})]})]}),r.jsxs("div",{className:"trds-flex trds-gap-2 trds-flex-1",children:[r.jsx(e.ChannelInput,{channel:"hex",asChild:!0,children:r.jsx(l,{})}),r.jsx(e.ChannelInput,{channel:"alpha",asChild:!0,children:r.jsx(l,{})})]}),r.jsx("div",{className:"trds-flex trds-flex-col trds-gap-1.5",children:r.jsx(e.SwatchGroup,{children:G.map((o,h)=>r.jsx(e.SwatchTrigger,{value:o,children:r.jsx(e.Swatch,{value:o})},h))})})]})})})]})})})})};var s,i,t;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    defaultValue: '#eb5e41'
  },
  render: (props: ColorPickerProps['root']) => {
    return <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <ColorPicker.Root {...props}>
          <ColorPicker.Context>
            {api => <>
                <ColorPicker.Control>
                  <ColorPicker.ChannelInput channel="hex" asChild>
                    <Input className="trds-flex-1" />
                  </ColorPicker.ChannelInput>
                  <ColorPicker.Trigger asChild>
                    <IconButton variant="outline" className="trds-flex-none">
                      <ColorPicker.Swatch value={api.value} />
                    </IconButton>
                  </ColorPicker.Trigger>
                </ColorPicker.Control>
                <ColorPicker.Positioner>
                  <ColorPicker.Content>
                    <div className="trds-flex trds-flex-col trds-gap-3">
                      <ColorPicker.Area>
                        <ColorPicker.AreaBackground />
                        <ColorPicker.AreaThumb />
                      </ColorPicker.Area>
                      <div className="trds-flex trds-flex-row trds-gap-3">
                        <ColorPicker.EyeDropperTrigger asChild>
                          <IconButton variant="outline" size="sm" aria-label="Pick a color">
                            <PipetteIcon size={20} />
                          </IconButton>
                        </ColorPicker.EyeDropperTrigger>
                        <div className={cx('trds-flex trds-flex-col trds-gap-2 trds-flex-1')}>
                          <ColorPicker.ChannelSlider channel="hue">
                            <ColorPicker.ChannelSliderTrack />
                            <ColorPicker.ChannelSliderThumb />
                          </ColorPicker.ChannelSlider>
                          <ColorPicker.ChannelSlider channel="alpha">
                            <ColorPicker.TransparencyGrid size="8px" />
                            <ColorPicker.ChannelSliderTrack />
                            <ColorPicker.ChannelSliderThumb />
                          </ColorPicker.ChannelSlider>
                        </div>
                      </div>
                      <div className="trds-flex trds-gap-2 trds-flex-1">
                        <ColorPicker.ChannelInput channel="hex" asChild>
                          <Input />
                        </ColorPicker.ChannelInput>
                        <ColorPicker.ChannelInput channel="alpha" asChild>
                          <Input />
                        </ColorPicker.ChannelInput>
                      </div>
                      <div className="trds-flex trds-flex-col trds-gap-1.5">
                        <ColorPicker.SwatchGroup>
                          {presets.map((color, id) => <ColorPicker.SwatchTrigger key={id} value={color}>
                              <ColorPicker.Swatch value={color} />
                            </ColorPicker.SwatchTrigger>)}
                        </ColorPicker.SwatchGroup>
                      </div>
                    </div>
                  </ColorPicker.Content>
                </ColorPicker.Positioner>
              </>}
          </ColorPicker.Context>
        </ColorPicker.Root>
      </div>;
  }
}`,...(t=(i=n.parameters)==null?void 0:i.docs)==null?void 0:t.source}}};const or=["Default"];export{n as Default,or as __namedExportsOrder,lr as default};
