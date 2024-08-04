import{j as n}from"./jsx-runtime-qGIIFXMu.js";import{r as s}from"./index-CDs2tPxN.js";import{c as b}from"./cva-C095pwBQ.js";import{s as O}from"./sva-CxSEfBjn.js";import{c as D}from"./create-react-context-Dw26gLIP.js";import{k as V,m as g,l as T,c as W,p as z,g as G,a as J,z as K}from"./create-split-props-BDI0pziA.js";import{u as F,F as Q}from"./use-field-context-CLfjAHXa.js";const U=V("field").parts("root","errorText","helperText","input","label","select","textarea"),_=s.forwardRef((r,a)=>{const e=F(),t=g(e.getErrorTextProps(),r);return e!=null&&e.invalid?n.jsx(T.span,{...t,ref:a}):null});_.displayName="FieldErrorText";const M=s.forwardRef((r,a)=>{const e=F(),t=g(e==null?void 0:e.getHelperTextProps(),r);return n.jsx(T.span,{...t,ref:a})});M.displayName="FieldHelperText";const C=s.forwardRef((r,a)=>{const e=F(),t=g(e==null?void 0:e.getLabelProps(),r);return n.jsx(T.label,{...t,ref:a})});C.displayName="FieldLabel";const[ue,X]=W({name:"FieldsetContext",hookName:"useFieldsetContext",providerName:"<FieldsetProvider />",strict:!1}),Y=z("field").parts("root","errorText","helperText","input","label","select","textarea"),m=Y.build(),Z=r=>{const a=X(),{disabled:e=!!(a!=null&&a.disabled),invalid:t=!1,readOnly:o=!1,required:l=!1}=r,f=s.useRef(!1),N=s.useRef(!1),d=r.id??s.useId(),y=s.useRef(null),i=`field::${d}::error-text`,c=`field::${d}::helper-text`,h=`field::${d}::label`;s.useLayoutEffect(()=>{const p=y.current;if(!p)return;const E=G(p),I=E.document,j=()=>{f.current=!!I.getElementById(i),N.current=!!I.getElementById(c)};j();const w=new E.MutationObserver(j);return w.observe(p,{childList:!0,subtree:!0}),()=>w.disconnect()},[i,c]);const P=s.useMemo(()=>{const p=[];return f.current&&t&&p.push(i),N.current&&p.push(c),p.join(" ")||void 0},[t,i,c]),H=s.useMemo(()=>()=>({...m.root.attrs,ref:y,role:"group","data-disabled":x(e),"data-invalid":x(t),"data-readonly":x(o)}),[e,t,o]),k=s.useMemo(()=>()=>({...m.label.attrs,id:h,"data-disabled":x(e),"data-invalid":x(t),"data-readonly":x(o),htmlFor:d}),[e,t,o,d,h]),u=s.useMemo(()=>()=>({"aria-describedby":P,"aria-invalid":v(t),"aria-required":v(l),"aria-readonly":v(o),id:d,required:l,disabled:e,readOnly:o}),[P,t,l,o,d,e]),$=s.useMemo(()=>()=>({...u(),...m.input.attrs}),[u]),A=s.useMemo(()=>()=>({...u(),...m.textarea.attrs}),[u]),S=s.useMemo(()=>()=>({...u(),...m.select.attrs}),[u]),q=s.useMemo(()=>()=>({id:c,...m.helperText.attrs}),[c]),B=s.useMemo(()=>()=>({id:i,...m.errorText.attrs,"aria-live":"polite"}),[i]);return{ariaDescribedby:P,ids:{control:d,label:h,errorText:i,helperText:c},refs:{rootRef:y},disabled:e,invalid:t,readOnly:o,required:l,getLabelProps:k,getRootProps:H,getInputProps:$,getTextareaProps:A,getSelectProps:S,getHelperTextProps:q,getErrorTextProps:B}},x=r=>r?"true":void 0,v=r=>r?!0:void 0,L=s.forwardRef((r,a)=>{const[e,t]=J()(r,["id","disabled","invalid","readOnly","required"]),o=Z(e),l=g(o.getRootProps(),t);return n.jsx(Q,{value:o,children:n.jsx(T.div,{...l,ref:K(a,o.refs.rootRef)})})});L.displayName="FieldRoot";const ee=O({className:"field",slots:U.keys(),base:{root:{display:"flex",flexDirection:"column",gap:"1.5"},label:{color:"neutral.900",fontWeight:"medium",textStyle:"sm",_disabled:{color:"disabled"}},helperText:{alignItems:"center",display:"inline-flex",color:"neutral.400",gap:"1",textStyle:"sm",_disabled:{color:"disabled"}},errorText:{alignItems:"center",color:"error.500",display:"inline-flex",gap:"1",textStyle:"sm",_disabled:{color:"disabled"}}}}),[te,R]=D({name:"field",hookName:"useFieldContext",providerName:"FieldProvider",defaultValue:{classes:{}}}),re=s.forwardRef(function(r,a){const{children:e,className:t,...o}=r,l=ee(),f={classes:l};return n.jsx(te,{value:f,children:n.jsx(L,{className:b(l.root,t),...o,ref:a,children:e})})}),se=s.forwardRef(function(r,a){const{children:e,className:t,...o}=r,{classes:l}=R();return n.jsx(C,{className:b(l.label,t),ref:a,...o,children:e})}),oe=s.forwardRef(function(r,a){const{children:e,className:t,...o}=r,{classes:l}=R();return n.jsx(M,{className:b(l.helperText,t),ref:a,...o,children:e})}),ae=s.forwardRef(function(r,a){const{children:e,className:t,...o}=r,{classes:l}=R();return n.jsx(_,{className:b(l.errorText,t),ref:a,...o,children:e})});re.__docgenInfo={description:"",methods:[],displayName:"Root"};se.__docgenInfo={description:"",methods:[],displayName:"Label"};oe.__docgenInfo={description:"",methods:[],displayName:"HelperText"};ae.__docgenInfo={description:"",methods:[],displayName:"ErrorText"};export{ae as E,oe as H,se as L,re as R};
