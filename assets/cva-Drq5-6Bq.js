function x(r){return typeof r=="object"&&r!=null&&!Array.isArray(r)}function _(r){return Object.fromEntries(Object.entries(r??{}).filter(([t,e])=>e!==void 0))}var z=r=>r==="base";function W(r){return r.slice().filter(t=>!z(t))}function C(r){return String.fromCharCode(r+(r>25?39:97))}function L(r){let t="",e;for(e=Math.abs(r);e>52;e=e/52|0)t=C(e%52)+t;return C(e%52)+t}function D(r,t){let e=t.length;for(;e;)r=r*33^t.charCodeAt(--e);return r}function F(r){return L(D(5381,r)>>>0)}var E=/\s*!(important)?/i;function X(r){return typeof r=="string"?E.test(r):!1}function Y(r){return typeof r=="string"?r.replace(E,"").trim():r}function j(r){return typeof r=="string"?r.replaceAll(" ","_"):r}var k=r=>{const t=new Map;return(...n)=>{const o=JSON.stringify(n);if(t.has(o))return t.get(o);const a=r(...n);return t.set(o,a),a}};function v(...r){return r.filter(Boolean).reduce((e,n)=>(Object.keys(n).forEach(o=>{const a=e[o],i=n[o];x(a)&&x(i)?e[o]=v(a,i):e[o]=i}),e),{})}var N=r=>r!=null;function w(r,t,e={}){const{stop:n,getKey:o}=e;function a(i,s=[]){if(x(i)||Array.isArray(i)){const l={};for(const[d,p]of Object.entries(i)){const b=(o==null?void 0:o(d,p))??d,c=[...s,b];if(n!=null&&n(i,c))return t(i,s);const g=a(p,c);N(g)&&(l[b]=g)}return l}return t(i,s)}return a(r)}function q(r,t){return Array.isArray(r)?r.map(e=>t(e)):x(r)?w(r,e=>t(e)):t(r)}function H(r,t){return r.reduce((e,n,o)=>{const a=t[o];return n!=null&&(e[a]=n),e},{})}function P(r,t,e=!0){const{utility:n,conditions:o}=t,{hasShorthand:a,resolveShorthand:i}=n;return w(r,s=>Array.isArray(s)?H(s,o.breakpoints.keys):s,{stop:s=>Array.isArray(s),getKey:e?s=>a?i(s):s:void 0})}var $={shift:r=>r,finalize:r=>r,breakpoints:{keys:[]}},G=r=>typeof r=="string"?r.replaceAll(/[\n\s]+/g," "):r;function K(r){const{utility:t,hash:e,conditions:n=$}=r,o=i=>[t.prefix,i].filter(Boolean).join("-"),a=(i,s)=>{let l;if(e){const d=[...n.finalize(i),s];l=o(t.toHash(d,F))}else l=[...n.finalize(i),o(s)].join(":");return l};return k(({base:i,...s}={})=>{const l=Object.assign(s,i),d=P(l,r),p=new Set;return w(d,(b,c)=>{const g=X(b);if(b==null)return;const[u,...m]=n.shift(c),y=W(m),S=t.transform(u,Y(G(b)));let h=a(y,S.className);g&&(h=`${h}!`),p.add(h)}),Array.from(p).join(" ")})}function U(...r){return r.flat().filter(t=>x(t)&&Object.keys(_(t)).length>0)}function Z(r){function t(o){const a=U(...o);return a.length===1?a:a.map(i=>P(i,r))}function e(...o){return v(...t(o))}function n(...o){return Object.assign({},...t(o))}return{mergeCss:k(e),assignCss:n}}var J=/([A-Z])/g,Q=/^ms-/,rr=k(r=>r.startsWith("--")?r:r.replace(J,"-$1").replace(Q,"-ms-").toLowerCase()),tr=["min","max","clamp","calc"],er=new RegExp(`^(${tr.join("|")})\\(.*\\)`),or=r=>typeof r=="string"&&er.test(r),nr="cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%",ir=`(?:${nr.split(",").join("|")})`,ar=new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${ir}$`),sr=r=>typeof r=="string"&&ar.test(r),lr=r=>typeof r=="string"&&/^var\(--.+\)$/.test(r),kr={map:q,isCssFunction:or,isCssVar:lr,isCssUnit:sr},_r=(r,t)=>{if(!(r!=null&&r.defaultValues))return t;const e=typeof r.defaultValues=="function"?r.defaultValues(t):r.defaultValues;return Object.assign({},e,_(t))},vr=(r={})=>{const t=o=>{var a;return{className:[r.className,o].filter(Boolean).join("__"),base:((a=r.base)==null?void 0:a[o])??{},variants:{},defaultVariants:r.defaultVariants??{},compoundVariants:r.compoundVariants?dr(r.compoundVariants,o):[]}},n=(r.slots??[]).map(o=>[o,t(o)]);for(const[o,a]of Object.entries(r.variants??{}))for(const[i,s]of Object.entries(a))n.forEach(([l,d])=>{var p;(p=d.variants)[o]??(p[o]={}),d.variants[o][i]=s[l]??{}});return Object.fromEntries(n)},dr=(r,t)=>r.filter(e=>e.css[t]).map(e=>({...e,css:e.css[t]}));function cr(r,...t){const e=Object.getOwnPropertyDescriptors(r),n=Object.keys(e),o=i=>{const s={};for(let l=0;l<i.length;l++){const d=i[l];e[d]&&(Object.defineProperty(s,d,e[d]),delete e[d])}return s},a=i=>o(Array.isArray(i)?i:n.filter(i));return t.map(a).concat(o(n))}var gr=(...r)=>r.filter(Boolean).reduce((t,e)=>Array.from(new Set([...t,...e])),[]);const pr="_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_default,_optional,_open,_closed,_fullscreen,_loading,_currentPage,_currentStep,_motionReduce,_motionSafe,_print,_landscape,_portrait,_dark,_light,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_starting,sm,smOnly,smDown,md,mdOnly,mdDown,lg,lgOnly,lgDown,xl,xlOnly,xlDown,2xl,2xlOnly,2xlDown,smToMd,smToLg,smToXl,smTo2xl,mdToLg,mdToXl,mdTo2xl,lgToXl,lgTo2xl,xlTo2xl,@/xs,@/sm,@/md,@/lg,@/xl,@/2xl,@/3xl,@/4xl,@/5xl,@/6xl,@/7xl,@/8xl,base",T=new Set(pr.split(","));function B(r){return T.has(r)||/^@|&|&$/.test(r)}const br=/^_/,ur=/&|@/;function mr(r){return r.map(t=>T.has(t)?t.replace(br,""):ur.test(t)?`[${j(t.trim())}]`:t)}function fr(r){return r.sort((t,e)=>{const n=B(t),o=B(e);return n&&!o?1:!n&&o?-1:0})}const hr="aspectRatio:aspect,boxDecorationBreak:decoration,zIndex:z,boxSizing:box,objectPosition:obj-pos,objectFit:obj-fit,overscrollBehavior:overscroll,overscrollBehaviorX:overscroll-x,overscrollBehaviorY:overscroll-y,position:pos/1,top:top,left:left,insetInline:inset-x/insetX,insetBlock:inset-y/insetY,inset:inset,insetBlockEnd:inset-b,insetBlockStart:inset-t,insetInlineEnd:end/insetEnd/1,insetInlineStart:start/insetStart/1,right:right,bottom:bottom,float:float,visibility:vis,display:d,hideFrom:hide,hideBelow:show,flexBasis:basis,flex:flex,flexDirection:flex/flexDir,flexGrow:grow,flexShrink:shrink,gridTemplateColumns:grid-cols,gridTemplateRows:grid-rows,gridColumn:col-span,gridRow:row-span,gridColumnStart:col-start,gridColumnEnd:col-end,gridAutoFlow:grid-flow,gridAutoColumns:auto-cols,gridAutoRows:auto-rows,gap:gap,gridGap:gap,gridRowGap:gap-x,gridColumnGap:gap-y,rowGap:gap-x,columnGap:gap-y,justifyContent:justify,alignContent:content,alignItems:items,alignSelf:self,padding:p/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,paddingBottom:pb/1,paddingBlock:py/1/paddingY,paddingBlockEnd:pb,paddingBlockStart:pt,paddingInline:px/paddingX/1,paddingInlineEnd:pe/1/paddingEnd,paddingInlineStart:ps/1/paddingStart,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,marginBottom:mb/1,margin:m/1,marginBlock:my/1/marginY,marginBlockEnd:mb,marginBlockStart:mt,marginInline:mx/1/marginX,marginInlineEnd:me/1/marginEnd,marginInlineStart:ms/1/marginStart,spaceX:space-x,spaceY:space-y,outlineWidth:ring-width/ringWidth,outlineColor:ring-color/ringColor,outline:ring/1,outlineOffset:ring-offset/ringOffset,divideX:divide-x,divideY:divide-y,divideColor:divide-color,divideStyle:divide-style,width:w/1,inlineSize:w,minWidth:min-w/minW,minInlineSize:min-w,maxWidth:max-w/maxW,maxInlineSize:max-w,height:h/1,blockSize:h,minHeight:min-h/minH,minBlockSize:min-h,maxHeight:max-h/maxH,maxBlockSize:max-b,color:text,fontFamily:font,fontSize:fs,fontWeight:fw,fontSmoothing:smoothing,fontVariantNumeric:numeric,letterSpacing:tracking,lineHeight:leading,textAlign:text-align,textDecoration:text-decor,textDecorationColor:text-decor-color,textEmphasisColor:text-emphasis-color,textDecorationStyle:decoration-style,textDecorationThickness:decoration-thickness,textUnderlineOffset:underline-offset,textTransform:text-transform,textIndent:indent,textShadow:text-shadow,textShadowColor:text-shadow/textShadowColor,textOverflow:text-overflow,verticalAlign:v-align,wordBreak:break,textWrap:text-wrap,truncate:truncate,lineClamp:clamp,listStyleType:list-type,listStylePosition:list-pos,listStyleImage:list-img,backgroundPosition:bg-pos/bgPosition,backgroundPositionX:bg-pos-x/bgPositionX,backgroundPositionY:bg-pos-y/bgPositionY,backgroundAttachment:bg-attach/bgAttachment,backgroundClip:bg-clip/bgClip,background:bg/1,backgroundColor:bg/bgColor,backgroundOrigin:bg-origin/bgOrigin,backgroundImage:bg-img/bgImage,backgroundRepeat:bg-repeat/bgRepeat,backgroundBlendMode:bg-blend/bgBlendMode,backgroundSize:bg-size/bgSize,backgroundGradient:bg-gradient/bgGradient,textGradient:text-gradient,gradientFromPosition:gradient-from-pos,gradientToPosition:gradient-to-pos,gradientFrom:gradient-from,gradientTo:gradient-to,gradientVia:gradient-via,gradientViaPosition:gradient-via-pos,borderRadius:rounded/1,borderTopLeftRadius:rounded-tl/roundedTopLeft,borderTopRightRadius:rounded-tr/roundedTopRight,borderBottomRightRadius:rounded-br/roundedBottomRight,borderBottomLeftRadius:rounded-bl/roundedBottomLeft,borderTopRadius:rounded-t/roundedTop,borderRightRadius:rounded-r/roundedRight,borderBottomRadius:rounded-b/roundedBottom,borderLeftRadius:rounded-l/roundedLeft,borderStartStartRadius:rounded-ss/roundedStartStart,borderStartEndRadius:rounded-se/roundedStartEnd,borderStartRadius:rounded-s/roundedStart,borderEndStartRadius:rounded-es/roundedEndStart,borderEndEndRadius:rounded-ee/roundedEndEnd,borderEndRadius:rounded-e/roundedEnd,border:border,borderWidth:border-w,borderTopWidth:border-tw,borderLeftWidth:border-lw,borderRightWidth:border-rw,borderBottomWidth:border-bw,borderColor:border,borderInline:border-x/borderX,borderInlineWidth:border-x/borderXWidth,borderInlineColor:border-x/borderXColor,borderBlock:border-y/borderY,borderBlockWidth:border-y/borderYWidth,borderBlockColor:border-y/borderYColor,borderLeft:border-l,borderLeftColor:border-l,borderInlineStart:border-s/borderStart,borderInlineStartWidth:border-s/borderStartWidth,borderInlineStartColor:border-s/borderStartColor,borderRight:border-r,borderRightColor:border-r,borderInlineEnd:border-e/borderEnd,borderInlineEndWidth:border-e/borderEndWidth,borderInlineEndColor:border-e/borderEndColor,borderTop:border-t,borderTopColor:border-t,borderBottom:border-b,borderBottomColor:border-b,borderBlockEnd:border-be,borderBlockEndColor:border-be,borderBlockStart:border-bs,borderBlockStartColor:border-bs,boxShadow:shadow/1,boxShadowColor:shadow-color/shadowColor,mixBlendMode:mix-blend,filter:filter,brightness:brightness,contrast:contrast,grayscale:grayscale,hueRotate:hue-rotate,invert:invert,saturate:saturate,sepia:sepia,dropShadow:drop-shadow,blur:blur,backdropFilter:backdrop,backdropBlur:backdrop-blur,backdropBrightness:backdrop-brightness,backdropContrast:backdrop-contrast,backdropGrayscale:backdrop-grayscale,backdropHueRotate:backdrop-hue-rotate,backdropInvert:backdrop-invert,backdropOpacity:backdrop-opacity,backdropSaturate:backdrop-saturate,backdropSepia:backdrop-sepia,borderCollapse:border,borderSpacing:border-spacing,borderSpacingX:border-spacing-x,borderSpacingY:border-spacing-y,tableLayout:table,transitionTimingFunction:ease,transitionDelay:delay,transitionDuration:duration,transitionProperty:transition-prop,transition:transition,animation:animation,animationName:animation-name,animationTimingFunction:animation-ease,animationDuration:animation-duration,animationDelay:animation-delay,transformOrigin:origin,rotate:rotate,rotateX:rotate-x,rotateY:rotate-y,rotateZ:rotate-z,scale:scale,scaleX:scale-x,scaleY:scale-y,translate:translate,translateX:translate-x/x,translateY:translate-y/y,translateZ:translate-z/z,accentColor:accent,caretColor:caret,scrollBehavior:scroll,scrollbar:scrollbar,scrollMargin:scroll-m,scrollMarginLeft:scroll-ml,scrollMarginRight:scroll-mr,scrollMarginTop:scroll-mt,scrollMarginBottom:scroll-mb,scrollMarginBlock:scroll-my/scrollMarginY,scrollMarginBlockEnd:scroll-mb,scrollMarginBlockStart:scroll-mt,scrollMarginInline:scroll-mx/scrollMarginX,scrollMarginInlineEnd:scroll-me,scrollMarginInlineStart:scroll-ms,scrollPadding:scroll-p,scrollPaddingBlock:scroll-pb/scrollPaddingY,scrollPaddingBlockStart:scroll-pt,scrollPaddingBlockEnd:scroll-pb,scrollPaddingInline:scroll-px/scrollPaddingX,scrollPaddingInlineEnd:scroll-pe,scrollPaddingInlineStart:scroll-ps,scrollPaddingLeft:scroll-pl,scrollPaddingRight:scroll-pr,scrollPaddingTop:scroll-pt,scrollPaddingBottom:scroll-pb,scrollSnapAlign:snap-align,scrollSnapStop:snap-stop,scrollSnapType:snap-type,scrollSnapStrictness:snap-strictness,scrollSnapMargin:snap-m,scrollSnapMarginTop:snap-mt,scrollSnapMarginBottom:snap-mb,scrollSnapMarginLeft:snap-ml,scrollSnapMarginRight:snap-mr,touchAction:touch,userSelect:select,fill:fill,stroke:stroke,strokeWidth:stroke-w,srOnly:sr,debug:debug,appearance:appearance,backfaceVisibility:backface,clipPath:clip-path,hyphens:hyphens,mask:mask,maskImage:mask-image,maskSize:mask-size,textSizeAdjust:text-adjust,container:cq,containerName:cq-name,containerType:cq-type,textStyle:textStyle",I=new Map,A=new Map;hr.split(",").forEach(r=>{const[t,e]=r.split(":"),[n,...o]=e.split("/");I.set(t,n),o.length&&o.forEach(a=>{A.set(a==="1"?n:a,t)})});const O=r=>A.get(r)||r,M={conditions:{shift:fr,finalize:mr,breakpoints:{keys:["base","sm","md","lg","xl","2xl"]}},utility:{transform:(r,t)=>{const e=O(r);return{className:`${I.get(e)||rr(e)}_${j(t)}`}},hasShorthand:!0,toHash:(r,t)=>t(r.join(":")),resolveShorthand:O}},xr=K(M),V=(...r)=>xr(f(...r));V.raw=(...r)=>f(...r);const{mergeCss:f,assignCss:wr}=Z(M);function Cr(){let r="",t=0,e;for(;t<arguments.length;)(e=arguments[t++])&&typeof e=="string"&&(r&&(r+=" "),r+=e);return r}const R=r=>({base:{},variants:{},defaultVariants:{},compoundVariants:[],...r});function yr(r){const{base:t,variants:e,defaultVariants:n,compoundVariants:o}=R(r),a=c=>({...n,..._(c)});function i(c={}){var y;const g=a(c);let u={...t};for(const[S,h]of Object.entries(g))(y=e[S])!=null&&y[h]&&(u=f(u,e[S][h]));const m=Sr(o,g);return f(u,m)}function s(c){const g=R(c.config),u=gr(c.variantKeys,Object.keys(e));return yr({base:f(t,g.base),variants:Object.fromEntries(u.map(m=>[m,f(e[m],g.variants[m])])),defaultVariants:v(n,g.defaultVariants),compoundVariants:[...o,...g.compoundVariants]})}function l(c){return V(i(c))}const d=Object.keys(e);function p(c){return cr(c,d)}const b=Object.fromEntries(Object.entries(e).map(([c,g])=>[c,Object.keys(g)]));return Object.assign(k(l),{__cva__:!0,variantMap:b,variantKeys:d,raw:i,config:r,merge:s,splitVariantProps:p,getVariantProps:a})}function Sr(r,t){let e={};return r.forEach(n=>{Object.entries(n).every(([a,i])=>a==="css"?!0:(Array.isArray(i)?i:[i]).some(l=>t[a]===l))&&(e=f(e,n.css))}),e}export{Cr as a,V as b,yr as c,vr as d,_ as e,_r as g,k as m,kr as p,cr as s};
