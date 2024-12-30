import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{R as F,H as b,C as z,a as k,I as O,b as w,c as P,E as D,F as V}from"./RatingGroup-C5Z5FJLM.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-Bc8Or9Mt.js";import"./index-DBzJ7FiP.js";import"./index-DE2wJq7j.js";import"./use-locale-context-hL6yk3cA.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Bc1L1tNp.js";const t={Root:F,HiddenInput:b,Control:z,Context:k,Item:O,ItemContext:w,HalfStarIcon:P,EmptyStarIcon:D,FullStarIcon:V},X={title:"Components/RatingGroup",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{count:{control:{type:"number"}},defaultValue:{control:{type:"number"}},disabled:{control:{type:"boolean"}},readOnly:{control:{type:"boolean"}}},args:{count:5,defaultValue:3,disabled:!1,readOnly:!1}},u={args:{},render:i=>n.jsxs(t.Root,{...i,children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]})},p={args:{allowHalf:!0},render:i=>n.jsxs(t.Root,{...i,children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]})},s={args:{},render:i=>n.jsxs("div",{className:"trds-flex trds-flex-col trds-gap-4",children:[n.jsxs(t.Root,{...i,size:"sm",children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]}),n.jsxs(t.Root,{...i,size:"md",children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]}),n.jsxs(t.Root,{...i,size:"lg",children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]})]})},l={args:{disabled:!0},render:i=>n.jsxs(t.Root,{...i,children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]})},g={args:{allowHalf:!0,defaultValue:2.5,readOnly:!0},render:i=>n.jsxs(t.Root,{...i,children:[n.jsx(t.Control,{children:n.jsx(t.Context,{children:({items:o})=>o.map(r=>n.jsx(t.Item,{index:r,children:n.jsx(t.ItemContext,{children:({half:a,highlighted:e})=>a&&e?n.jsx(t.HalfStarIcon,{}):e?n.jsx(t.FullStarIcon,{}):n.jsx(t.EmptyStarIcon,{})})},r))})}),n.jsx(t.HiddenInput,{})]})};var d,m,R;u.parameters={...u.parameters,docs:{...(d=u.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps['Root']) => {
    return <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({
            items
          }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({
                half,
                highlighted
              }) => {
                if (half && highlighted) {
                  return <RatingGroup.HalfStarIcon />;
                }
                if (highlighted) {
                  return <RatingGroup.FullStarIcon />;
                }
                return <RatingGroup.EmptyStarIcon />;
              }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>)}
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>;
  }
}`,...(R=(m=u.parameters)==null?void 0:m.docs)==null?void 0:R.source}}};var c,x,G;p.parameters={...p.parameters,docs:{...(c=p.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    allowHalf: true
  },
  render: (props: RatingGroupProps['Root']) => {
    return <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({
            items
          }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({
                half,
                highlighted
              }) => {
                if (half && highlighted) {
                  return <RatingGroup.HalfStarIcon />;
                }
                if (highlighted) {
                  return <RatingGroup.FullStarIcon />;
                }
                return <RatingGroup.EmptyStarIcon />;
              }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>)}
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>;
  }
}`,...(G=(x=p.parameters)==null?void 0:x.docs)==null?void 0:G.source}}};var I,h,f;s.parameters={...s.parameters,docs:{...(I=s.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {},
  render: (props: RatingGroupProps) => {
    return <div className="trds-flex trds-flex-col trds-gap-4">
        <RatingGroup.Root {...props} size="sm">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({
              items
            }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({
                  half,
                  highlighted
                }) => {
                  if (half && highlighted) {
                    return <RatingGroup.HalfStarIcon />;
                  }
                  if (highlighted) {
                    return <RatingGroup.FullStarIcon />;
                  }
                  return <RatingGroup.EmptyStarIcon />;
                }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>)}
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
        <RatingGroup.Root {...props} size="md">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({
              items
            }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({
                  half,
                  highlighted
                }) => {
                  if (half && highlighted) {
                    return <RatingGroup.HalfStarIcon />;
                  }
                  if (highlighted) {
                    return <RatingGroup.FullStarIcon />;
                  }
                  return <RatingGroup.EmptyStarIcon />;
                }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>)}
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
        <RatingGroup.Root {...props} size="lg">
          <RatingGroup.Control>
            <RatingGroup.Context>
              {({
              items
            }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                    <RatingGroup.ItemContext>
                      {({
                  half,
                  highlighted
                }) => {
                  if (half && highlighted) {
                    return <RatingGroup.HalfStarIcon />;
                  }
                  if (highlighted) {
                    return <RatingGroup.FullStarIcon />;
                  }
                  return <RatingGroup.EmptyStarIcon />;
                }}
                    </RatingGroup.ItemContext>
                  </RatingGroup.Item>)}
            </RatingGroup.Context>
          </RatingGroup.Control>
          <RatingGroup.HiddenInput />
        </RatingGroup.Root>
      </div>;
  }
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var C,j,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: (props: RatingGroupProps) => {
    return <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({
            items
          }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({
                half,
                highlighted
              }) => {
                if (half && highlighted) {
                  return <RatingGroup.HalfStarIcon />;
                }
                if (highlighted) {
                  return <RatingGroup.FullStarIcon />;
                }
                return <RatingGroup.EmptyStarIcon />;
              }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>)}
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>;
  }
}`,...(S=(j=l.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var H,y,E;g.parameters={...g.parameters,docs:{...(H=g.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    allowHalf: true,
    defaultValue: 2.5,
    readOnly: true
  },
  render: (props: RatingGroupProps) => {
    return <RatingGroup.Root {...props}>
        <RatingGroup.Control>
          <RatingGroup.Context>
            {({
            items
          }) => items.map(item => <RatingGroup.Item key={item} index={item}>
                  <RatingGroup.ItemContext>
                    {({
                half,
                highlighted
              }) => {
                if (half && highlighted) {
                  return <RatingGroup.HalfStarIcon />;
                }
                if (highlighted) {
                  return <RatingGroup.FullStarIcon />;
                }
                return <RatingGroup.EmptyStarIcon />;
              }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>)}
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>;
  }
}`,...(E=(y=g.parameters)==null?void 0:y.docs)==null?void 0:E.source}}};const Y=["Default","AllowHalf","Size","Disabled","ReadOnly"];export{p as AllowHalf,u as Default,l as Disabled,g as ReadOnly,s as Size,Y as __namedExportsOrder,X as default};
