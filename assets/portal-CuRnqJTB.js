import{j as o}from"./jsx-runtime-qGIIFXMu.js";import{h as d,d as c}from"./factory-DwUv65Y6.js";import{r as s}from"./index-CDs2tPxN.js";import{r as f}from"./index-B-yFm4aN.js";import{u as p}from"./use-locale-context-B5vdPRI5.js";const l=()=>{const[t,r]=s.useState(!0);return s.useEffect(()=>{r(!1)},[]),t},N=t=>{const{children:r,container:e,disabled:n}=t,a=l(),{getRootNode:m}=p();if(a||n)return o.jsx(o.Fragment,{children:r});const i=(e==null?void 0:e.current)??x(m);return o.jsx(o.Fragment,{children:s.Children.map(r,u=>f.createPortal(u,i))})};function x(t){const r=t==null?void 0:t(),e=r.getRootNode();return d(e)?e:c(r).body}export{N as P};
