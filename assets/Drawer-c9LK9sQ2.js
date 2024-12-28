import{j as d}from"./jsx-runtime-qGIIFXMu.js";import{t as l,I as m,c}from"./tv-CIwtzMts.js";import{r as n}from"./index-CDs2tPxN.js";import{c as f}from"./create-react-context-Dw26gLIP.js";import{D as p,a as g,b as h,c as u,d as x,e as w,f as N,g as _}from"./dialog-trigger-AWUPQjWy.js";const b=l({base:`${m.scope} drawer`,slots:{backdrop:"trds-backdrop-blur-[4px] trds-bg-blackAlpha-700 trds-h-[100vh] trds-w-[100vw] trds-left-0 trds-top-0 trds-fixed trds-z-overlay data-open:trds-animate-backdrop-in data-closed:trds-animate-backdrop-out dark:trds-bg-whiteAlpha-700",positioner:"trds-flex trds-items-center trds-justify-center trds-fixed trds-z-modal",content:"trds-bg-white trds-shadow-lg trds-grid trds-grid-cols-[1fr] trds-grid-rows-[auto_1fr_auto] trds-grid-areas-[header,body,footer] trds-h-full trds-w-full",header:"trds-flex trds-flex-col trds-gap-1 trds-grid-area-header trds-pt-4 md:trds-pt-6 trds-pb-4 trds-px-4 md:trds-px-6",body:"trds-flex trds-flex-col trds-grid-area-body trds-overflow-auto trds-p-4 md:trds-p-6",footer:"trds-flex trds-grid-area-footer trds-justify-end trds-py-4 trds-px-4 md:trds-px-6",title:"trds-text-fg-title trds-font-semibold trds-text-xl",description:"trds-text-fg-description trds-text-sm",trigger:"",closeTrigger:""},variants:{variant:{left:{positioner:"trds-left-0 trds-top-0 trds-h-[100dvh] trds-max-w-[100vw] trds-w-sm",content:"data-open:trds-animate-drawer-in-left data-closed:trds-animate-drawer-out-left"},right:{positioner:"trds-right-0 trds-top-0 trds-h-[100dvh] trds-max-w-[100vw] trds-w-sm",content:"data-open:trds-animate-drawer-in-right data-closed:trds-animate-drawer-out-right"},bottom:{positioner:"trds-bottom-0 trds-w-[100dvw] trds-max-h-[100vh] trds-h-sm",content:"data-open:trds-animate-drawer-in-bottom data-closed:trds-animate-drawer-out-bottom"}}},defaultVariants:{variant:"right"}}),[y,i]=f({name:"drawer",hookName:"useDrawerContext",providerName:"DrawerProvider",defaultValue:{classes:{}}});function v({children:s,variant:t,...r}){const o={classes:b({variant:t})};return d.jsx(y,{value:o,children:d.jsx(_,{lazyMount:!0,...r,children:s})})}const D=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(p,{className:c(r.trigger(),o),ref:t,...a,children:e})}),R=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(g,{className:r.backdrop(),...a,ref:t})}),j=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(h,{className:r.positioner(),...a,ref:t,children:e})}),I=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(u,{className:c(r.content(),o),ref:t,...a,children:e})}),T=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx("div",{className:c(r.header(),o),ref:t,...a,children:e})}),k=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx("div",{className:c(r.body(),o),ref:t,...a,children:e})}),C=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx("div",{className:c(r.footer(),o),ref:t,...a,children:e})}),B=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(x,{className:c(r.title(),o),ref:t,...a,children:e})}),P=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(w,{className:c(r.description(),o),ref:t,...a,children:e})}),E=n.forwardRef(function(s,t){const{classes:r}=i(),{children:e,className:o,...a}=s;return d.jsx(N,{className:c(r.closeTrigger(),o),ref:t,...a,children:e})});v.__docgenInfo={description:"",methods:[],displayName:"Root"};D.__docgenInfo={description:"",methods:[],displayName:"Trigger"};I.__docgenInfo={description:"",methods:[],displayName:"Content"};T.__docgenInfo={description:"",methods:[],displayName:"Header"};k.__docgenInfo={description:"",methods:[],displayName:"Body"};C.__docgenInfo={description:"",methods:[],displayName:"Footer"};B.__docgenInfo={description:"",methods:[],displayName:"Title"};P.__docgenInfo={description:"",methods:[],displayName:"Description"};R.__docgenInfo={description:"",methods:[],displayName:"Backdrop"};j.__docgenInfo={description:"",methods:[],displayName:"Positioner"};E.__docgenInfo={description:"",methods:[],displayName:"CloseTrigger"};export{k as B,I as C,P as D,C as F,T as H,j as P,v as R,D as T,B as a,R as b,E as c};