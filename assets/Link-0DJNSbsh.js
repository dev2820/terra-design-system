import{j as a}from"./jsx-runtime-qGIIFXMu.js";import{c as l,t as u,I as x}from"./tv-CIwtzMts.js";import{r}from"./index-CDs2tPxN.js";function d(e){const{children:n,...i}=e,s=r.Children.toArray(n).filter(r.isValidElement);if(r.Children.count(s)>1)throw new Error("Only one child allowed in asChild");if(r.isValidElement(s[0])){const t=s[0];return r.cloneElement(t,{...i,...t.props,style:{...e.style,...t.props.style},className:l(e.className,t.props.className)})}return null}d.__docgenInfo={description:"",methods:[],displayName:"Slot"};const y=u({base:[`${x.scope} link`,"trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-cursor-pointer","trds-underline-under trds-decoration-[2px] trds-underline-offset-2"],variants:{theme:{default:"trds-text-fg",primary:"trds-text-primary-fg hover:trds-text-primary-strong active:trds-text-primary-stronger"},variant:{plain:"hover:trds-unerline",underline:"trds-underline"}},defaultVariants:{theme:"default",variant:"underline"}}),o=r.forwardRef(function(e,n){const{theme:i,leftIcon:s,rightIcon:t,className:c,children:m,asChild:p,...f}=e,h=p?d:"a";return a.jsx(h,{className:l(y({theme:i}),c),ref:n,...f,children:a.jsxs("span",{className:"trds-flex trds-flex-row trds-gap-1 trds-place-items-center",children:[s,m,t]})})});o.displayName="Link";o.__docgenInfo={description:"",methods:[],displayName:"Link"};export{o as L};
