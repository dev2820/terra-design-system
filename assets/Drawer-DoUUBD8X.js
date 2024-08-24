import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{I as l,c as i}from"./index-CO00fS6N.js";import{r as c}from"./index-CDs2tPxN.js";import{s as m}from"./sva-qXmx1AZm.js";import{c as p}from"./create-react-context-Dw26gLIP.js";import{a as f,D as g,b as u,c as h,d as x,e as y,f as N,g as w,h as b}from"./dialog-trigger-DxUI0aph.js";import{P as _}from"./portal-DVHZYSwj.js";const D=m({className:`${l.scope} drawer`,slots:f.extendWith("header","body","footer").keys(),base:{backdrop:{backdropFilter:"blur(4px)",background:{base:"blackAlpha.700",_light:"blackAlpha.700",_dark:"whiteAlpha.700"},height:"100vh",left:"0",position:"fixed",top:"0",width:"100vw",zIndex:"overlay",_open:{animation:"backdrop-in 0.2s ease-out"},_closed:{animation:"backdrop-out 0.15s ease-out"}},positioner:{alignItems:"center",display:"flex",height:"100dvh",justifyContent:"center",position:"fixed",top:"0",width:{base:"100vw",sm:"sm"},zIndex:"modal"},content:{background:"white",boxShadow:"lg",display:"grid",gridTemplateColumns:"1fr",gridTemplateRows:"auto 1fr auto",gridTemplateAreas:`
        'header'
        'body'
        'footer'
      `,height:"full",width:"full","&[aria-hidden]":{display:"none"}},header:{display:"flex",flexDirection:"column",gap:"1",gridArea:"header",pt:{base:"4",md:"6"},pb:"4",px:{base:"4",md:"6"}},body:{display:"flex",flexDirection:"column",gridArea:"body",overflow:"auto",p:{base:"4",md:"6"}},footer:{display:"flex",gridArea:"footer",justifyContent:"flex-end",py:"4",px:{base:"4",md:"6"}},title:{color:"neutral.900",fontWeight:"semibold",textStyle:"xl"},description:{color:"neutral.400",textStyle:"sm"}},variants:{variant:{left:{positioner:{left:0},content:{_open:{animation:"drawer-in-left 0.2s ease-out"},_closed:{animation:"drawer-out-left 0.15s ease-out"}}},right:{positioner:{right:0},content:{_open:{animation:"drawer-in-right 0.2s ease-out"},_closed:{animation:"drawer-out-right 0.15s ease-out"}}}}},defaultVariants:{variant:"right"}}),[j,d]=p({name:"drawer",hookName:"useDrawerContext",providerName:"DrawerProvider",defaultValue:{classes:{}}});function v({children:s,variant:o,...e}){const t={classes:D({variant:o})};return n.jsx(j,{value:t,children:n.jsx(b,{lazyMount:!0,unmountOnExit:!0,...e,children:s})})}const I=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx(g,{className:i(e.trigger,t),ref:o,...r,children:a})}),R=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsxs(_,{children:[n.jsx(u,{className:e.backdrop}),n.jsx(h,{className:e.positioner,children:n.jsx(x,{className:i(e.content,t),ref:o,...r,children:a})})]})}),T=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx("div",{className:i(e.header,t),ref:o,...r,children:a})}),k=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx("div",{className:i(e.body,t),ref:o,...r,children:a})}),C=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx("div",{className:i(e.footer,t),ref:o,...r,children:a})}),A=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx(y,{className:i(e.title,t),ref:o,...r,children:a})}),E=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx(N,{className:i(e.description,t),ref:o,...r,children:a})}),F=c.forwardRef(function(s,o){const{classes:e}=d(),{children:a,className:t,...r}=s;return n.jsx(w,{className:i(e.closeTrigger,t),ref:o,...r,children:a})});v.__docgenInfo={description:"",methods:[],displayName:"Root"};I.__docgenInfo={description:"",methods:[],displayName:"Trigger"};R.__docgenInfo={description:"",methods:[],displayName:"Content"};T.__docgenInfo={description:"",methods:[],displayName:"Header"};k.__docgenInfo={description:"",methods:[],displayName:"Body"};C.__docgenInfo={description:"",methods:[],displayName:"Footer"};A.__docgenInfo={description:"",methods:[],displayName:"Title"};E.__docgenInfo={description:"",methods:[],displayName:"Description"};F.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};export{k as B,R as C,E as D,C as F,T as H,v as R,I as T,A as a,F as b};
