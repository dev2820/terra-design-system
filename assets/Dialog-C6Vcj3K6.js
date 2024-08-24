import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{I as d,c as r}from"./index-CO00fS6N.js";import{r as c}from"./index-CDs2tPxN.js";import{s as m}from"./sva-qXmx1AZm.js";import{c as g}from"./create-react-context-Dw26gLIP.js";import{a as p,D as f,b as u,c as h,d as x,e as N,f as D,g as _,h as b}from"./dialog-trigger-DxUI0aph.js";import{P as y}from"./portal-DVHZYSwj.js";const j=m({className:`${d.scope} dialog`,slots:p.keys(),base:{backdrop:{backdropFilter:"blur(4px)",background:{base:"blackAlpha.700",_light:"blackAlpha.700",_dark:"whiteAlpha.700"},height:"100vh",left:"0",position:"fixed",top:"0",width:"100vw",zIndex:"overlay",_open:{animation:"backdrop-in 0.2s ease-out"},_closed:{animation:"backdrop-out 0.15s ease-out"}},positioner:{alignItems:"center",display:"flex",justifyContent:"center",left:"0",overflow:"auto",position:"fixed",top:"0",width:"100vw",height:"100dvh",zIndex:"modal"},content:{background:"white",borderRadius:"lg",boxShadow:"lg",minW:"sm",position:"relative",transitionDuration:"normal",_open:{animation:"dialog-in 0.2s ease-out"},_closed:{animation:"dialog-out 0.15s ease-out"}},title:{fontWeight:"semibold",textStyle:"lg"},description:{color:"neutral.400",textStyle:"sm"}}}),[k,l]=g({name:"dialog",hookName:"useDialogContext",providerName:"DialogProvider",defaultValue:{classes:{}}});function w({children:s,...e}){const t={classes:j()};return a.jsx(k,{value:t,children:a.jsx(b,{lazyMount:!0,unmountOnExit:!0,...e,children:s})})}const I=c.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(f,{className:r(o.trigger,i),ref:e,...n,children:t})}),R=c.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsxs(y,{children:[a.jsx(u,{className:o.backdrop}),a.jsx(h,{className:o.positioner,children:a.jsx(x,{className:r(o.content,i),ref:e,...n,children:t})})]})}),v=c.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(N,{className:r(o.title,i),ref:e,...n,children:t})}),T=c.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(D,{className:r(o.description,i),ref:e,...n,children:t})}),C=c.forwardRef(function(s,e){const{classes:o}=l(),{children:t,className:i,...n}=s;return a.jsx(_,{className:r(o.closeTrigger,i),ref:e,...n,children:t})});w.__docgenInfo={description:"",methods:[],displayName:"Root"};I.__docgenInfo={description:"",methods:[],displayName:"Trigger"};R.__docgenInfo={description:"",methods:[],displayName:"Content"};v.__docgenInfo={description:"",methods:[],displayName:"Title"};T.__docgenInfo={description:"",methods:[],displayName:"Description"};C.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};export{R as C,T as D,w as R,I as T,v as a,C as b};
