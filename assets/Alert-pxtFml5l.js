import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{r as l}from"./index-CDs2tPxN.js";import{c}from"./cva-C095pwBQ.js";import{s as u}from"./sva-CxSEfBjn.js";import{c as p}from"./create-react-context-Dw26gLIP.js";const d=u({className:"alert",slots:["root","title","description"],base:{root:{position:"relative",padding:4,rounded:"lg",border:"1px solid","& > svg":{position:"absolute",top:6,left:4}},title:{"svg + &":{paddingLeft:8},fontWeight:"semiBold",fontSize:"lg",lineHeight:2,mb:2,color:"neutral.800"},description:{color:"neutral.600",fontSize:"md","svg ~ &":{paddingLeft:8}}},variants:{theme:{neutral:{root:{color:"neutral.500",bg:"neutral.50",borderColor:"neutral.200"},title:{color:"neutral.500"}},info:{root:{color:"info.500",bg:"info.50",borderColor:"info.200"},title:{color:"info.500"}},success:{root:{color:"success.500",bg:"success.50",borderColor:"success.200"},title:{color:"success.500"}},warning:{root:{color:"warning.500",bg:"warning.50",borderColor:"warning.200"},title:{color:"warning.500"}},error:{root:{color:"error.500",bg:"error.50",borderColor:"error.200"},title:{color:"error.500"}}}},defaultVariants:{theme:"neutral"}}),[g,m]=p({name:"alert",hookName:"useAlertContext",providerName:"AlertProvider",defaultValue:{theme:"neutral"}}),h=l.forwardRef(function(e,r){const{theme:o,children:t,className:s,...n}=e,a=d({theme:o}),f={theme:o};return i.jsx(g,{value:f,children:i.jsx("div",{className:c(a.root,s),ref:r,...n,children:t})})}),b=l.forwardRef(function(e,r){const{children:o,className:t,...s}=e,{theme:n}=m(),a=d({theme:n});return i.jsx("h5",{ref:r,className:c(a.title,t),...s,children:o})}),x=l.forwardRef(function(e,r){const{children:o,className:t,...s}=e,{theme:n}=m(),a=d({theme:n});return i.jsx("p",{ref:r,className:c(a.description,t),...s,children:o})});h.__docgenInfo={description:"",methods:[],displayName:"Root"};b.__docgenInfo={description:"",methods:[],displayName:"Title"};x.__docgenInfo={description:"",methods:[],displayName:"Description"};export{x as D,h as R,b as T};
