import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{t as l,I as m,c}from"./tv-CIwtzMts.js";import{r as i}from"./index-CDs2tPxN.js";import{c as g}from"./create-react-context-Dw26gLIP.js";import{D as p,a as f,b as u,c as x,d as h,e as N,f as D,g as b}from"./dialog-trigger-AWUPQjWy.js";const w=l({base:`${m.scope} dialog`,slots:{backdrop:"trds-backdrop-blur-[4px] trds-bg-blackAlpha-700 trds-h-[100vh] trds-w-[100vw] trds-left-0 trds-top-0 trds-fixed trds-z-overlay data-open:trds-animate-backdrop-in data-closed:trds-animate-backdrop-out dark:trds-bg-whiteAlpha-700",positioner:"trds-flex trds-items-center trds-justify-center trds-fixed trds-left-0 trds-top-0 trds-w-[100vw] trds-h-[100dvh] trds-overflow-auto trds-z-modal",content:"trds-bg-white trds-rounded-lg trds-shadow-lg trds-min-w-sm trds-relative trds-duration-normal data-open:trds-animate-dialog-in data-closed:trds-animate-dialog-out",title:"trds-text-fg-title trds-font-semibold trds-text-lg trds-mb-4",description:"trds-text-fg-description trds-text-sm trds-mb-4",trigger:"",closeTrigger:""}}),[_,d]=g({name:"dialog",hookName:"useDialogContext",providerName:"DialogProvider",defaultValue:{classes:{}}});function R({children:s,...t}){const o={classes:w()};return n.jsx(_,{value:o,children:n.jsx(b,{lazyMount:!0,unmountOnExit:!0,...t,children:s})})}const T=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(p,{className:c(e.trigger(),a),ref:t,...r,children:o})}),j=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(f,{className:e.backdrop(),...r,ref:t})}),v=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(u,{className:e.positioner(),...r,ref:t,children:o})}),I=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(x,{className:c(e.content(),a),ref:t,...r,children:o})}),k=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(h,{className:c(e.title(),a),ref:t,...r,children:o})}),y=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(N,{className:c(e.description(),a),ref:t,...r,children:o})}),C=i.forwardRef(function(s,t){const{classes:e}=d(),{children:o,className:a,...r}=s;return n.jsx(D,{className:c(e.closeTrigger(),a),ref:t,...r,children:o})});R.__docgenInfo={description:"",methods:[],displayName:"Root"};T.__docgenInfo={description:"",methods:[],displayName:"Trigger"};I.__docgenInfo={description:"",methods:[],displayName:"Content"};k.__docgenInfo={description:"",methods:[],displayName:"Title"};y.__docgenInfo={description:"",methods:[],displayName:"Description"};C.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};v.__docgenInfo={description:"",methods:[],displayName:"Positioner"};j.__docgenInfo={description:"",methods:[],displayName:"Backdrop"};export{j as B,I as C,y as D,v as P,R,T,k as a,C as b};
