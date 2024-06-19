import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{b as y,d as c}from"./cva-DWZhh4fZ.js";import{r as h}from"./index-CDs2tPxN.js";import{s as C}from"./sva-DJJztBSp.js";import{c as _}from"./create-react-context-Dw26gLIP.js";import{c as s}from"./createLucideIcon-zijr-BYg.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const S=s("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=s("CircleCheck",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=s("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=s("Rocket",[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=s("Star",[["polygon",{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2",key:"8f66p6"}]]);/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=s("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),g=C({className:"alert",slots:["root","title","description"],base:{root:{position:"relative",padding:4,rounded:"lg",border:"1px solid","& > svg":{position:"absolute",top:6,left:4}},title:{"svg + &":{paddingLeft:8},fontWeight:"semiBold",fontSize:"lg",lineHeight:2,mb:2,color:"neutral.800"},description:{color:"neutral.600",fontSize:"md","svg ~ &":{paddingLeft:8}}},variants:{theme:{neutral:{root:{color:"neutral.500",bg:"neutral.50",borderColor:"neutral.200"},title:{color:"neutral.500"}},info:{root:{color:"info.500",bg:"info.50",borderColor:"info.200"},title:{color:"info.500"}},success:{root:{color:"success.500",bg:"success.50",borderColor:"success.200"},title:{color:"success.500"}},warning:{root:{color:"warning.500",bg:"warning.50",borderColor:"warning.200"},title:{color:"warning.500"}},error:{root:{color:"error.500",bg:"error.50",borderColor:"error.200"},title:{color:"error.500"}}}},defaultVariants:{theme:"neutral"}}),[W,v]=_({name:"alert",hookName:"useAlertContext",providerName:"AlertProvider",defaultValue:{theme:"neutral"}}),T=h.forwardRef(function(n,o){const{theme:r,children:i,className:a,...m}=n,l=g({theme:r}),z={theme:r};return e.jsx(W,{value:z,children:e.jsx("div",{className:y(l.root,a),ref:o,...m,children:i})})}),D=h.forwardRef(function(n,o){const{children:r,className:i,...a}=n,{theme:m}=v(),l=g({theme:m});return e.jsx("h5",{ref:o,className:y(l.title,i),...a,children:r})}),N=h.forwardRef(function(n,o){const{children:r,className:i,...a}=n,{theme:m}=v(),l=g({theme:m});return e.jsx("p",{ref:o,className:y(l.description,i),...a,children:r})});T.__docgenInfo={description:"",methods:[],displayName:"Root"};D.__docgenInfo={description:"",methods:[],displayName:"Title"};N.__docgenInfo={description:"",methods:[],displayName:"Description"};const t={Root:T,Title:D,Description:N},k=["neutral","info","success","error","warning"],K={title:"Components/Alert",component:t,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{theme:{options:k,control:{type:"select"}}},args:{theme:k[0]}},p={args:{},render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(q,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]})},d={args:{},render:n=>e.jsxs(t.Root,{...n,children:[e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]})},u={args:{},render:n=>e.jsxs(e.Fragment,{children:[e.jsxs(t.Root,{...n,className:c({mb:4}),theme:"neutral",children:[e.jsx(E,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsxs(t.Root,{...n,className:c({mb:4}),theme:"error",children:[e.jsx(S,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsxs(t.Root,{...n,className:c({mb:4}),theme:"warning",children:[e.jsx(V,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsxs(t.Root,{...n,className:c({mb:4}),theme:"success",children:[e.jsx(M,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]}),e.jsxs(t.Root,{...n,className:c({mb:4}),theme:"info",children:[e.jsx(P,{size:20}),e.jsx(t.Title,{children:"Lorem ipsume"}),e.jsx(t.Description,{children:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."})]})]})};var x,f,b;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: AlertProps['Root']) => {
    return <Alert.Root {...props}>
        <RocketIcon size={20} />
        <Alert.Title>Lorem ipsume</Alert.Title>
        <Alert.Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Alert.Description>
      </Alert.Root>;
  }
}`,...(b=(f=p.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var A,L,I;d.parameters={...d.parameters,docs:{...(A=d.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {},
  render: (props: AlertProps['Root']) => {
    return <Alert.Root {...props}>
        <Alert.Title>Lorem ipsume</Alert.Title>
        <Alert.Description>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </Alert.Description>
      </Alert.Root>;
  }
}`,...(I=(L=d.parameters)==null?void 0:L.docs)==null?void 0:I.source}}};var w,j,R;u.parameters={...u.parameters,docs:{...(w=u.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {},
  render: (props: AlertProps['Root']) => {
    return <>
        <Alert.Root {...props} className={css({
        mb: 4
      })} theme={'neutral'}>
          <StarIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={css({
        mb: 4
      })} theme={'error'}>
          <AlertCircleIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={css({
        mb: 4
      })} theme={'warning'}>
          <TriangleAlertIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={css({
        mb: 4
      })} theme={'success'}>
          <CircleCheckIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
        <Alert.Root {...props} className={css({
        mb: 4
      })} theme={'info'}>
          <InfoIcon size={20} />
          <Alert.Title>Lorem ipsume</Alert.Title>
          <Alert.Description>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Alert.Description>
        </Alert.Root>
      </>;
  }
}`,...(R=(j=u.parameters)==null?void 0:j.docs)==null?void 0:R.source}}};const Q=["Default","WithoutIcon","Theme"];export{p as Default,u as Theme,d as WithoutIcon,Q as __namedExportsOrder,K as default};
