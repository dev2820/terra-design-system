import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{t as c,o as d}from"./factory-BCO0_PXk.js";import{r as s}from"./index-CDs2tPxN.js";import{r as f}from"./index-B-yFm4aN.js";import{u as p}from"./use-locale-context-CTaGYWMe.js";const l=()=>{const[t,r]=s.useState(!0);return s.useEffect(()=>{r(!1)},[]),t},h=t=>{const{children:r,container:o,disabled:n}=t,a=l(),{getRootNode:m}=p();if(a||n)return e.jsx(e.Fragment,{children:r});const i=(o==null?void 0:o.current)??x(m);return e.jsx(e.Fragment,{children:s.Children.map(r,u=>f.createPortal(u,i))})};function x(t){const r=t==null?void 0:t(),o=r.getRootNode();return c(o)?o:d(r).body}export{h as P};