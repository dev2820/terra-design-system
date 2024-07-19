import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{r as l}from"./index-CDs2tPxN.js";import{b as d,c as r,a as v}from"./cva-C095pwBQ.js";import{s as x}from"./sva-CxSEfBjn.js";import{c as N}from"./create-react-context-Dw26gLIP.js";d({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:66,sm:{fontSize:40}},md:{fontSize:50,sm:{fontSize:32}},sm:{fontSize:40,sm:{fontSize:25}}}}});const C=d({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:50,sm:{fontSize:40}},md:{fontSize:40,sm:{fontSize:32}},sm:{fontSize:32,sm:{fontSize:25}}}}});d({base:{lineHeight:"normal",fontWeight:"bold"},variants:{size:{"2xl":{letterSpacing:1,fontSize:32,sm:{fontSize:25}},xl:{fontSize:25},lg:{fontSize:21},md:{fontSize:19},sm:{fontSize:17},xs:{fontSize:15}}},defaultVariants:{size:"md"}});d({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});const w=d({base:{lineHeight:"normal",fontWeight:"normal",letterSpacing:0},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15},xs:{fontSize:13}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});d({base:{lineHeight:"normal",fontWeight:"normal",letterSpacing:0},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});const _=x({className:"card",slots:["root","header","content","footer","title","description"],base:{root:{rounded:"lg",overflow:"hidden"},header:{p:6},content:{px:6,pb:6},footer:{px:6,pb:6},title:{color:"neutral.800"},description:{color:"neutral.500"}},variants:{variant:{elevated:{root:{shadow:"md"}},filled:{root:{bg:"neutral.200"}},outline:{root:{border:"1px solid",borderColor:"neutral.200"}}}},defaultVariants:{variant:"elevated"}}),[R,c]=N({name:"card",hookName:"useCardContext",providerName:"CardProvider",defaultValue:{classes:{}}}),f=l.forwardRef((n,e)=>{const{variant:a="elevated",className:s,children:t,...o}=n,m=_({variant:a}),b={classes:m};return i.jsx(R,{value:b,children:i.jsx("div",{ref:e,className:r(m.root,s),...o,children:t})})}),g=l.forwardRef(function(n,e){const{className:a,children:s,...t}=n,{classes:o}=c();return i.jsx("div",{ref:e,className:r(o.header,a),...t,children:s})}),u=l.forwardRef(function(n,e){const{className:a,children:s,...t}=n,{classes:o}=c();return i.jsx("div",{ref:e,className:r(o.content,a),...t,children:s})}),h=l.forwardRef(function(n,e){const{className:a,children:s,...t}=n,{classes:o}=c();return i.jsx("div",{ref:e,className:r(o.footer,a),...t,children:s})}),p=l.forwardRef(function(n,e){const{className:a,children:s,...t}=n,{classes:o}=c();return i.jsx("h3",{ref:e,className:r(o.title,C({size:"sm"}),a),...t,children:s})}),z=l.forwardRef(function(n,e){const{className:a,children:s,...t}=n,{classes:o}=c();return i.jsx("p",{ref:e,className:r(o.description,w({size:"md"}),a),...t,children:s})});f.__docgenInfo={description:"",methods:[],displayName:"Root"};g.__docgenInfo={description:"",methods:[],displayName:"Header"};u.__docgenInfo={description:"",methods:[],displayName:"Content"};h.__docgenInfo={description:"",methods:[],displayName:"Footer"};p.__docgenInfo={description:"",methods:[],displayName:"Title"};z.__docgenInfo={description:"",methods:[],displayName:"Description"};const k={Root:f,Header:g,Content:u,Footer:h,Title:p,Description:z},W=d({base:{animation:"shimmer",animationDuration:"3s",animationIterationCount:"infinite",backgroundClip:"padding-box",backgroundColor:"neutral.400",color:"transparent",cursor:"default",pointerEvents:"none",userSelect:"none","&::before, &::after, *":{visibility:"hidden"}},variants:{round:{true:{borderRadius:"full"},false:{borderRadius:"lg"}}},defaultVariants:{round:!0}}),S=l.forwardRef(function(n,e){const{round:a=!1,isLoaded:s,className:t,...o}=n;return s?i.jsx("div",{ref:e,className:r(v({animation:"fade-in",animationDuration:"0.2s",animationIterationCount:1}),t),...o}):i.jsx("div",{ref:e,className:r(W({round:a}),t),...o})});S.displayName="Skeleton";S.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};export{k as C,S};
