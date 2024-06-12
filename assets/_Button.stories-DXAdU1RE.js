import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{c as h,a as H,b as J,d as n}from"./createLucideIcon-D0iwFQMS.js";import"./index-CDs2tPxN.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=h("Ellipsis",[["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}],["circle",{cx:"19",cy:"12",r:"1",key:"1wjl8i"}],["circle",{cx:"5",cy:"12",r:"1",key:"1pcz8c"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=h("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=h("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]),U=H({base:{display:"inline-flex",alignItems:"center",justifyContent:"center",whiteSpace:"nowrap",rounded:"lg",fontSize:"md",fontWeight:"medium",gap:"2",transition:["colors"],cursor:"pointer",_disabled:{cursor:"not-allowed",opacity:50}},variants:{variant:{filled:{},outline:{border:"1px solid",bg:"white"},ghost:{bg:"transparent"}},colorScheme:{primary:{},neutral:{}},size:{sm:{h:9,paddingX:3},md:{h:10,paddingX:4,paddingY:2},lg:{h:11,paddingX:8},icon:{h:10,w:10}},loading:{true:{_disabled:{cursor:"wait"}}}},defaultVariants:{variant:"filled",colorScheme:"neutral",size:"md",loading:!1},compoundVariants:[{colorScheme:"primary",variant:"filled",css:{bgColor:"primary",color:"primary.foreground",_disabled:{bg:"primary",_hover:{bg:"primary"},_active:{bg:"primary"}},_hover:{bg:"primary.600"},_active:{bg:"primary.700"}}},{colorScheme:"neutral",variant:"filled",css:{bgColor:"neutral",color:"neutral.foreground",_disabled:{bg:"neutral",_hover:{bg:"neutral"},_active:{bg:"neutral"}},_hover:{bg:"neutral.200"},_active:{bg:"neutral.300"}}},{colorScheme:"primary",variant:"outline",css:{color:"primary.500",borderColor:"primary.500",_disabled:{_hover:{bg:"white"},_active:{bg:"white"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{colorScheme:"neutral",variant:"outline",css:{color:"neutral.500",borderColor:"neutral.500",_disabled:{bg:"transparent",_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}},{colorScheme:"primary",variant:"ghost",css:{color:"primary.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{colorScheme:"neutral",variant:"ghost",css:{color:"neutral.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}}]});function r({type:a="button",loading:s=!1,loadingIcon:M=e.jsx(Q,{className:n({animation:"spin"}),size:20}),leftIcon:O,rightIcon:P,disabled:f=!1,variant:W,size:Y,colorScheme:A,children:F,...G}){return e.jsxs("button",{className:J(U({variant:W,colorScheme:A,size:Y,loading:s})),type:a,disabled:f||s,"aria-disabled":f||s,"aria-busy":s,...G,children:[O,F,P,s&&M]})}r.__docgenInfo={description:"",methods:[],displayName:"Button",props:{loading:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},loadingIcon:{required:!1,tsType:{name:"ReactNode"},description:"",defaultValue:{value:"<LoaderCircleIcon className={css({ animation: 'spin' })} size={20} />",computed:!1}},rightIcon:{required:!1,tsType:{name:"ReactNode"},description:""},leftIcon:{required:!1,tsType:{name:"ReactNode"},description:""},type:{defaultValue:{value:"'button'",computed:!1},required:!1},disabled:{defaultValue:{value:"false",computed:!1},required:!1}}};const v=["sm","md","lg","icon"],u=["primary","neutral"],g=["filled","outline","ghost"],re={title:"Components/Button",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:v,control:{type:"select"}},variant:{options:g,control:{type:"select"}},colorScheme:{options:u,control:{type:"select"}},disabled:{control:{type:"boolean"}},loading:{control:{type:"boolean"}}},args:{size:v[1],variant:g[0],colorScheme:u[1],disabled:!1,loading:!1}},o={args:{},render:a=>e.jsx(r,{...a,children:"Click me"})},t={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:g.map(a=>e.jsx(r,{variant:a,colorScheme:"neutral",children:"Click me"},a))})},i={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:u.map(a=>e.jsx(r,{colorScheme:a,children:"Click me"},a))})},l={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{size:"sm",children:"Click me"}),e.jsx(r,{size:"md",children:"Click me"}),e.jsx(r,{size:"lg",children:"Click me"}),e.jsx(r,{size:"icon",children:e.jsx(m,{size:20})})]})},c={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{loading:!0,children:"Click me"}),e.jsx(r,{loading:!0,loadingIcon:e.jsx(K,{size:20}),children:"Click me"})]})},d={args:{},render:()=>e.jsxs("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{leftIcon:e.jsx(m,{size:20}),children:"Click me"}),e.jsx(r,{rightIcon:e.jsx(m,{size:20}),children:"Click me"})]})},p={args:{},render:()=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:e.jsx(r,{disabled:!0,children:"Click me"})})};var b,y,x;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {},
  render: (props: ButtonProps) => {
    return <Button {...props}>Click me</Button>;
  }
}`,...(x=(y=o.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var _,C,S;t.parameters={...t.parameters,docs:{...(_=t.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {variants.map(variant => <Button variant={variant} colorScheme="neutral" key={variant}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(S=(C=t.parameters)==null?void 0:C.docs)==null?void 0:S.source}}};var k,j,B;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {colors.map(color => <Button colorScheme={color} key={color}>
            Click me
          </Button>)}
      </div>;
  }
}`,...(B=(j=i.parameters)==null?void 0:j.docs)==null?void 0:B.source}}};var z,w,I;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button size="sm">Click me</Button>
        <Button size="md">Click me</Button>
        <Button size="lg">Click me</Button>
        <Button size="icon">
          <SearchIcon size={20} />
        </Button>
      </div>;
  }
}`,...(I=(w=l.parameters)==null?void 0:w.docs)==null?void 0:I.source}}};var N,D,V;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button loading>Click me</Button>
        <Button loading loadingIcon={<EllipsisIcon size={20} />}>
          Click me
        </Button>
      </div>;
  }
}`,...(V=(D=c.parameters)==null?void 0:D.docs)==null?void 0:V.source}}};var q,L,E;d.parameters={...d.parameters,docs:{...(q=d.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button leftIcon={<SearchIcon size={20} />}>Click me</Button>
        <Button rightIcon={<SearchIcon size={20} />}>Click me</Button>
      </div>;
  }
}`,...(E=(L=d.parameters)==null?void 0:L.docs)==null?void 0:E.source}}};var T,R,X;p.parameters={...p.parameters,docs:{...(T=p.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        <Button disabled>Click me</Button>
      </div>;
  }
}`,...(X=(R=p.parameters)==null?void 0:R.docs)==null?void 0:X.source}}};const ae=["Default","Variant","ColorScheme","Sizes","Loading","Icon","Disabled"];export{i as ColorScheme,o as Default,p as Disabled,d as Icon,c as Loading,l as Sizes,t as Variant,ae as __namedExportsOrder,re as default};
