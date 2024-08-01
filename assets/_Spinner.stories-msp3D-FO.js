import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{r as W}from"./index-CDs2tPxN.js";import{b as P,a as n,c as E}from"./cva-C095pwBQ.js";const B=P({base:{display:"inline-block",borderWidth:"2px",borderColor:"transparent",borderStyle:"solid",borderRadius:"full",width:"var(--size)",height:"var(--size)",animation:"spin",animationDuration:"600ms",borderBottomColor:"neutral.800",borderLeftColor:"neutral.800"},defaultVariants:{size:"md"},variants:{size:{xs:{"--size":"sizes.3"},sm:{"--size":"sizes.4"},md:{"--size":"sizes.6"},lg:{"--size":"sizes.8"},xl:{"--size":"sizes.12"}}}}),L=n({position:"absolute",width:"1px",height:"1px",padding:0,margin:"-1px",overflow:"hidden",clip:"rect(0, 0, 0, 0)",whiteSpace:"nowrap",borderWidth:0}),s=W.forwardRef(function(r,a){const{size:_,label:c="loading...",className:k,...D}=r;return e.jsx("div",{ref:a,className:E(B({size:_}),k),...D,children:c&&e.jsx("span",{className:L,children:c})})});s.__docgenInfo={description:"",methods:[],displayName:"Spinner"};const d=["xs","sm","md","lg","xl"],V={title:"Components/Spinner",component:s,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{size:{options:d,control:{type:"select"}}},args:{size:d[2]}},o={args:{label:"loading..."},render:r=>e.jsx(s,{...r})},i={args:{label:"loading..."},render:r=>e.jsx("div",{className:n({display:"flex",flexDir:"row",gap:4}),children:d.map(a=>W.createElement(s,{...r,size:a,key:a}))})},t={args:{label:"loading..."},render:r=>e.jsx(s,{...r,className:n({borderBottomColor:"blue",borderLeftColor:"blue"})})},l={args:{label:"loading..."},render:r=>e.jsx(s,{...r,className:n({borderColor:"neutral.300"})})},p={args:{label:"loading..."},render:r=>e.jsx(s,{...r,className:n({borderWidth:4})})};var m,u,g;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} />;
  }
}`,...(g=(u=o.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var b,x,z;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <div className={css({
      display: 'flex',
      flexDir: 'row',
      gap: 4
    })}>
        {sizes.map(size => <Spinner {...props} size={size} key={size} />)}
      </div>;
  }
}`,...(z=(x=i.parameters)==null?void 0:x.docs)==null?void 0:z.source}}};var S,f,h;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderBottomColor: 'blue',
      borderLeftColor: 'blue'
    })} />;
  }
}`,...(h=(f=t.parameters)==null?void 0:f.docs)==null?void 0:h.source}}};var C,N,y;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderColor: 'neutral.300'
    })} />;
  }
}`,...(y=(N=l.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var j,v,w;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    label: 'loading...'
  },
  render: (props: SpinnerProps) => {
    return <Spinner {...props} className={css({
      borderWidth: 4
    })} />;
  }
}`,...(w=(v=p.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};const I=["Default","Size","Color","Track","Width"];export{t as Color,o as Default,i as Size,l as Track,p as Width,I as __namedExportsOrder,V as default};
