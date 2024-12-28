import{j as o}from"./jsx-runtime-qGIIFXMu.js";import{t as O,I as U,c as X}from"./tv-CIwtzMts.js";import{r as c}from"./index-CDs2tPxN.js";import{I as b}from"./IconButton-BhuYW3nN.js";import{L as C}from"./Link-C1AX8Zr1.js";import{C as _}from"./chevron-left-Bqxy6nNn.js";import{E as B}from"./ellipsis-Bl27Sm0D.js";import{C as A}from"./chevron-right-CT14g65n.js";import{c as Z,m as f,h,a as q,b as D,d as I,e as H,f as y,A as J,E as K}from"./factory-BCO0_PXk.js";import{c as R}from"./create-split-props-u5h9OPvL.js";import{c as Q,a as G}from"./index-6Viw2UEs.js";import{u as W,a as Y}from"./use-locale-context-CTaGYWMe.js";import{u as ee}from"./use-event-eGuf5zsd.js";const[te,x]=Z({name:"PaginationContext",hookName:"usePaginationContext",providerName:"<PaginationProvider />"}),ae=t=>t.children(x()),V=c.forwardRef((t,a)=>{const[e,i]=R()(t,["index"]),n=x(),r=f(n.getEllipsisProps(e),i);return o.jsx(h.div,{...r,ref:a})});V.displayName="PaginationEllipsis";const $=c.forwardRef((t,a)=>{const[e,i]=R()(t,["value","type"]),n=x(),r=f(n.getItemProps(e),i);return o.jsx(h.button,{...r,ref:a})});$.displayName="PaginationItem";const w=c.forwardRef((t,a)=>{const e=x(),i=f(e.getNextTriggerProps(),t);return o.jsx(h.button,{...i,ref:a})});w.displayName="PaginationNextTrigger";const F=c.forwardRef((t,a)=>{const e=x(),i=f(e.getPrevTriggerProps(),t);return o.jsx(h.button,{...i,ref:a})});F.displayName="PaginationPrevTrigger";var ie=q("pagination").parts("root","item","ellipsis","prevTrigger","nextTrigger"),T=ie.build(),v=D({getRootId:t=>{var a;return((a=t.ids)==null?void 0:a.root)??`pagination:${t.id}`},getPrevTriggerId:t=>{var a;return((a=t.ids)==null?void 0:a.prevTrigger)??`pagination:${t.id}:prev`},getNextTriggerId:t=>{var a;return((a=t.ids)==null?void 0:a.nextTrigger)??`pagination:${t.id}:next`},getEllipsisId:(t,a)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.ellipsis)==null?void 0:i.call(e,a))??`pagination:${t.id}:ellipsis:${a}`},getItemId:(t,a)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.item)==null?void 0:i.call(e,a))??`pagination:${t.id}:item:${a}`}}),E=(t,a)=>{let e=a-t+1;return Array.from({length:e},(i,n)=>n+t)},oe=t=>t.map(a=>typeof a=="number"?{type:"page",value:a}:{type:"ellipsis"}),S="ellipsis",ne=t=>{const a=Math.min(2*t.siblingCount+5,t.totalPages),e=1,i=t.totalPages,n=Math.max(t.page-t.siblingCount,e),r=Math.min(t.page+t.siblingCount,i),g=n>e+1,p=r<i-1,s=a-2;if(!g&&p)return[...E(1,s),S,i];if(g&&!p){const d=E(i-s+1,i);return[e,S,...d]}if(g&&p){const d=E(n,r);return[e,S,...d,S,i]}return E(e,i)},re=t=>oe(ne(t));function se(t,a,e){const i=t.context.totalPages,n=t.context.page,r=t.context.translations,g=t.context.previousPage,p=t.context.nextPage,s=t.context.pageRange,d=t.context.type==="button",N=n===1,z=n===i,k=re(t.context);return{page:n,pageSize:t.context.pageSize,totalPages:i,pages:k,previousPage:g,nextPage:p,pageRange:s,slice(l){return l.slice(s.start,s.end)},setCount(l){a({type:"SET_COUNT",count:l})},setPageSize(l){a({type:"SET_PAGE_SIZE",size:l})},setPage(l){a({type:"SET_PAGE",page:l})},goToNextPage(){a({type:"NEXT_PAGE"})},goToPrevPage(){a({type:"PREVIOUS_PAGE"})},goToFirstPage(){a({type:"FIRST_PAGE"})},goToLastPage(){a({type:"LAST_PAGE"})},getRootProps(){return e.element({id:v.getRootId(t.context),...T.root.attrs,dir:t.context.dir,"aria-label":r.rootLabel})},getEllipsisProps(l){return e.element({id:v.getEllipsisId(t.context,l.index),...T.ellipsis.attrs,dir:t.context.dir})},getItemProps(l){var L;const m=l.value,j=m===t.context.page;return e.element({id:v.getItemId(t.context,m),...T.item.attrs,dir:t.context.dir,"data-index":m,"data-selected":I(j),"aria-current":j?"page":void 0,"aria-label":(L=r.itemLabel)==null?void 0:L.call(r,{page:m,totalPages:i}),onClick(){a({type:"SET_PAGE",page:m})},...d&&{type:"button"}})},getPrevTriggerProps(){return e.element({id:v.getPrevTriggerId(t.context),...T.prevTrigger.attrs,dir:t.context.dir,"data-disabled":I(N),"aria-label":r.prevTriggerLabel,onClick(){a({type:"PREVIOUS_PAGE"})},...d&&{disabled:N,type:"button"}})},getNextTriggerProps(){return e.element({id:v.getNextTriggerId(t.context),...T.nextTrigger.attrs,dir:t.context.dir,"data-disabled":I(z),"aria-label":r.nextTriggerLabel,onClick(){a({type:"NEXT_PAGE"})},...d&&{disabled:z,type:"button"}})}}}var ge={rootLabel:"pagination",prevTriggerLabel:"previous page",nextTriggerLabel:"next page",itemLabel({page:t,totalPages:a}){return`${a>1&&t===a?"last page, ":""}page ${t}`}};function pe(t){const a=Q(t);return H({id:"pagination",initial:"idle",context:{pageSize:10,siblingCount:1,page:1,type:"button",translations:{...ge,...a.translations},...a},watch:{pageSize:["setPageIfNeeded"]},computed:{totalPages:e=>Math.ceil(e.count/e.pageSize),previousPage:e=>e.page===1?null:e.page-1,nextPage:e=>e.page===e.totalPages?null:e.page+1,pageRange:e=>{const i=(e.page-1)*e.pageSize,n=i+e.pageSize;return{start:i,end:n}},isValidPage:e=>e.page>=1&&e.page<=e.totalPages},on:{SET_COUNT:[{guard:"isValidCount",actions:["setCount","goToFirstPage"]},{actions:"setCount"}],SET_PAGE:{guard:"isValidPage",actions:"setPage"},SET_PAGE_SIZE:{actions:"setPageSize"},FIRST_PAGE:{actions:"goToFirstPage"},LAST_PAGE:{actions:"goToLastPage"},PREVIOUS_PAGE:{guard:"canGoToPrevPage",actions:"goToPrevPage"},NEXT_PAGE:{guard:"canGoToNextPage",actions:"goToNextPage"}},states:{idle:{}}},{guards:{isValidPage:(e,i)=>i.page>=1&&i.page<=e.totalPages,isValidCount:(e,i)=>e.page>i.count,canGoToNextPage:e=>e.page<e.totalPages,canGoToPrevPage:e=>e.page>1},actions:{setCount(e,i){e.count=i.count},setPage(e,i){P.page(e,i.page)},setPageSize(e,i){P.pageSize(e,i.size)},goToFirstPage(e){P.page(e,1)},goToLastPage(e){P.page(e,e.totalPages)},goToPrevPage(e){P.page(e,e.page-1)},goToNextPage(e){P.page(e,e.page+1)},setPageIfNeeded(e,i){e.isValidPage||P.page(e,1)}}})}var le=(t,a)=>Math.min(Math.max(t,1),a),P={pageSize:(t,a)=>{var e;G(t.pageSize,a)||(t.pageSize=a,(e=t.onPageSizeChange)==null||e.call(t,{pageSize:t.pageSize}))},page:(t,a)=>{var e;G(t.page,a)||(t.page=le(a,t.totalPages),(e=t.onPageChange)==null||e.call(t,{page:t.page,pageSize:t.pageSize}))}};y()(["count","dir","getRootNode","id","ids","onPageChange","onPageSizeChange","page","pageSize","siblingCount","translations","type"]);y()(["value","type"]);y()(["index"]);const de=t=>{const{getRootNode:a}=W(),{dir:e}=Y(),i={id:c.useId(),dir:e,getRootNode:a,page:t.defaultPage,...t},n={...i,page:t.page,onPageChange:ee(t.onPageChange,{sync:!0})},[r,g]=J(pe(i),{context:n});return se(r,g,K)},M=c.forwardRef((t,a)=>{const[e,i]=R()(t,["count","defaultPage","id","ids","onPageChange","onPageSizeChange","page","pageSize","siblingCount","translations","type"]),n=de(e),r=f(n.getRootProps(),i);return o.jsx(te,{value:n,children:o.jsx(h.nav,{...r,ref:a})})});M.displayName="PaginationRoot";const Pe=O({base:`${U.scope} pagination`,slots:{root:"trds-flex trds-gap-1",item:"trds-font-tabular-nums",prevTrigger:"",nextTrigger:"",ellipsis:"trds-inline-flex trds-items-center trds-text-neutral-900 trds-font-semibold trds-px-2"}}),ce=c.forwardRef((t,a)=>{const{type:e="button",children:i,className:n,...r}=t,g=Pe();return o.jsxs(M,{ref:a,className:X(g.root(),n),type:e,...r,children:[o.jsx(F,{className:g.prevTrigger(),asChild:!0,children:e==="button"?o.jsx(b,{variant:"ghost",size:"sm",children:o.jsx(_,{size:24})}):o.jsx(C,{theme:"neutral",children:o.jsx(_,{size:24})})}),o.jsx(ae,{children:p=>p.pages.map((s,u)=>s.type==="page"?o.jsx($,{className:g.item(),...s,asChild:!0,children:e==="button"?o.jsx(b,{variant:p.page===s.value?"filled":"ghost",size:"sm","data-active":p.page===s.value?!0:void 0,theme:p.page===s.value?"primary":"neutral",children:s.value}):o.jsx(C,{theme:p.page===s.value?"primary":"neutral","data-active":p.page===s.value?!0:void 0,children:s.value})},u):o.jsx(V,{index:u,className:g.ellipsis(),children:o.jsx(B,{size:16})},u))}),o.jsx(w,{className:g.nextTrigger(),asChild:!0,children:e==="button"?o.jsx(b,{variant:"ghost",size:"sm",children:o.jsx(A,{size:24})}):o.jsx(C,{theme:"neutral",children:o.jsx(A,{size:24})})})]})});ce.__docgenInfo={description:"",methods:[],displayName:"Root"};export{ce as R};
