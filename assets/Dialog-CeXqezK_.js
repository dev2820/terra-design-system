import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{r}from"./index-CDs2tPxN.js";import{c}from"./cva-C095pwBQ.js";import{s as d}from"./sva-CxSEfBjn.js";import{c as m}from"./create-react-context-Dw26gLIP.js";import{a as g,D as p,b as f,c as u,d as h,e as x,f as N,g as D,h as _}from"./dialog-trigger-DqdDflWz.js";import{P as b}from"./portal-cfn1eJoD.js";const y=d({className:"dialog",slots:g.keys(),base:{backdrop:{backdropFilter:"blur(4px)",background:{base:"blackAlpha.700",_light:"blackAlpha.700",_dark:"whiteAlpha.700"},height:"100vh",left:"0",position:"fixed",top:"0",width:"100vw",zIndex:"overlay",_open:{animation:"backdrop-in 0.2s ease-out"},_closed:{animation:"backdrop-out 0.15s ease-out"}},positioner:{alignItems:"center",display:"flex",justifyContent:"center",left:"0",overflow:"auto",position:"fixed",top:"0",width:"100vw",height:"100dvh",zIndex:"modal"},content:{background:"white",borderRadius:"lg",boxShadow:"lg",minW:"sm",position:"relative",transitionDuration:"normal",_open:{animation:"dialog-in 0.2s ease-out"},_closed:{animation:"dialog-out 0.15s ease-out"}},title:{fontWeight:"semibold",textStyle:"lg"},description:{color:"neutral.400",textStyle:"sm"}}}),[j,l]=m({name:"dialog",hookName:"useDialogContext",providerName:"DialogProvider",defaultValue:{classes:{}}});function k({children:s,...e}){const t={classes:y()};return a.jsx(j,{value:t,children:a.jsx(_,{lazyMount:!0,unmountOnExit:!0,...e,children:s})})}const w=r.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(p,{className:c(o.trigger,i),ref:e,...n,children:t})}),v=r.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsxs(b,{children:[a.jsx(f,{className:o.backdrop}),a.jsx(u,{className:o.positioner,children:a.jsx(h,{className:c(o.content,i),ref:e,...n,children:t})})]})}),R=r.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(x,{className:c(o.title,i),ref:e,...n,children:t})}),C=r.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(N,{className:c(o.description,i),ref:e,...n,children:t})}),T=r.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(D,{className:c(o.closeTrigger,i),ref:e,...n,children:t})});k.__docgenInfo={description:"",methods:[],displayName:"Root"};w.__docgenInfo={description:"",methods:[],displayName:"Trigger"};v.__docgenInfo={description:"",methods:[],displayName:"Content"};R.__docgenInfo={description:"",methods:[],displayName:"Title"};C.__docgenInfo={description:"",methods:[],displayName:"Description"};T.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};export{v as C,C as D,k as R,w as T,R as a,T as b};
