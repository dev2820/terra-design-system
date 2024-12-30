import{j as d}from"./jsx-runtime-qGIIFXMu.js";import{t as T,I as R,c as n}from"./tv-CIwtzMts.js";import{r as l}from"./index-CDs2tPxN.js";import{c as _}from"./create-react-context-Dw26gLIP.js";const w=T({base:`${R.scope} table`,slots:{root:"trds-caption-bottom trds-w-full",body:"[&_tr:last-child]:trds-border-b-0",caption:"trds-text-fg-caption",cell:"trds-align-middle trds-text-fg-description",footer:"trds-font-medium trds-border-t trds-border-boundary [&_tr:last-child]:trds-border-b-0",header:"trds-text-fg-title trds-font-medium trds-text-left trds-align-middle",head:"trds-align-middle",row:"trds-border-b trds-border-boundary trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-default"},variants:{variant:{outline:{root:"trds-border trds-border-boundary trds-border-[1px]",header:"trds-bg-layer1 trds-border-b trds-border-boundary trds-border-b-[1px]",head:"trds-bg-layer1",footer:"trds-bg-layer1"},plain:{header:"trds-bg-layer1 trds-border-b trds-border-boundary trds-border-b-[1px]",row:"hover:trds-bg-layer1 data-selected:trds-bg-layer1",footer:"trds-bg-layer1"}},size:{sm:{root:"trds-text-sm",caption:"trds-mt-4",cell:"trds-h-11 trds-px-3",head:"trds-h-11 trds-px-3",header:"trds-h-11 trds-px-3"},md:{root:"trds-text-sm",caption:"trds-mt-4",cell:"trds-h-14 trds-px-4",head:"trds-h-14 trds-px-4",header:"trds-h-11 trds-px-4"}}},defaultVariants:{size:"md",variant:"plain"}}),[I,c]=_({name:"table",hookName:"useTableContext",providerName:"TableProvider",defaultValue:{classes:{}}}),m=l.forwardRef(function(e,s){const{size:t,variant:r,className:a,children:o,...x}=e,i=w({size:t,variant:r}),g={classes:i};return d.jsx(I,{value:g,children:d.jsx("table",{ref:s,className:n(i.root(),a),...x,children:o})})});m.displayName="Table.Root";const b=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("thead",{className:n(o.header(),t),ref:s,...a,children:r})});b.displayName="Table.Header";const p=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("tbody",{className:n(o.body(),t),ref:s,...a,children:r})});p.displayName="Table.Body";const f=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("tfoot",{className:n(o.footer(),t),ref:s,...a,children:r})});f.displayName="Table.Footer";const h=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("th",{className:n(o.head(),t),ref:s,...a,children:r})});h.displayName="Table.Head";const u=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("tr",{className:n(o.row(),t),ref:s,...a,children:r})});u.displayName="Table.Row";const N=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("td",{className:n(o.cell(),t),ref:s,...a,children:r})});N.displayName="Table.Cell";const y=l.forwardRef(function(e,s){const{className:t,children:r,...a}=e,{classes:o}=c();return d.jsx("caption",{className:n(o.caption(),t),ref:s,...a,children:r})});y.displayName="Table.Caption";m.__docgenInfo={description:"",methods:[],displayName:"Table.Root"};b.__docgenInfo={description:"",methods:[],displayName:"Table.Header"};p.__docgenInfo={description:"",methods:[],displayName:"Table.Body"};f.__docgenInfo={description:"",methods:[],displayName:"Table.Footer"};h.__docgenInfo={description:"",methods:[],displayName:"Table.Head"};u.__docgenInfo={description:"",methods:[],displayName:"Table.Row"};N.__docgenInfo={description:"",methods:[],displayName:"Table.Cell"};y.__docgenInfo={description:"",methods:[],displayName:"Table.Caption"};export{p as B,N as C,f as F,b as H,m as R,h as a,u as b,y as c};
