import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{r as u}from"./index-CDs2tPxN.js";import{b as h,a as v,c as _}from"./cva-C095pwBQ.js";import{c as y}from"./createLucideIcon-zijr-BYg.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=y("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),w=h({base:{display:"inline-flex",justifyContent:"center",placeItems:"center",whiteSpace:"nowrap",rounded:"lg",fontSize:"md",fontWeight:"medium",gap:"2",transition:["colors"],cursor:"pointer",_disabled:{cursor:"not-allowed",opacity:50}},variants:{variant:{filled:{},outline:{borderWidth:1,borderStyle:"solid",bg:"white"},ghost:{bg:"transparent"}},theme:{primary:{},neutral:{}},size:{sm:{h:9,paddingX:3},md:{h:10,paddingX:4},lg:{h:11,paddingX:6}},loading:{true:{_disabled:{cursor:"wait"}}}},defaultVariants:{variant:"filled",theme:"neutral",size:"md",loading:!1},compoundVariants:[{theme:"primary",variant:"filled",css:{bgColor:"primary",color:"primary.foreground",_disabled:{bg:"primary",_hover:{bg:"primary"},_active:{bg:"primary"}},_hover:{bg:"primary.600"},_active:{bg:"primary.700"}}},{theme:"neutral",variant:"filled",css:{bgColor:"neutral",color:"neutral.foreground",_disabled:{bg:"neutral",_hover:{bg:"neutral"},_active:{bg:"neutral"}},_hover:{bg:"neutral.200"},_active:{bg:"neutral.300"}}},{theme:"primary",variant:"outline",css:{color:"primary.500",borderColor:"primary.500",_disabled:{_hover:{bg:"white"},_active:{bg:"white"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{theme:"neutral",variant:"outline",css:{color:"neutral.500",borderColor:"neutral.300",_disabled:{bg:"transparent",_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}},{theme:"primary",variant:"ghost",css:{color:"primary.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"primary.100"},_active:{bg:"primary.200"}}},{theme:"neutral",variant:"ghost",css:{color:"neutral.500",_disabled:{_hover:{bg:"transparent"},_active:{bg:"transparent"}},_hover:{bg:"neutral.100"},_active:{bg:"neutral.200"}}}]}),x=u.forwardRef(function(t,i){const{type:o="button",loading:r=!1,loadingIcon:n=e.jsx(f,{className:v({animation:"spin"}),size:20}),leftIcon:s,rightIcon:l,disabled:a=!1,variant:d,size:c,theme:b,className:m,children:g,...p}=t;return e.jsxs("button",{className:_(w({variant:d,theme:b,size:c,loading:r}),m),type:o,disabled:a||r,"aria-disabled":a||r,"aria-busy":r,ref:i,...p,children:[r&&n,s,g,l]})});x.__docgenInfo={description:"",methods:[],displayName:"Button"};export{x as B};
