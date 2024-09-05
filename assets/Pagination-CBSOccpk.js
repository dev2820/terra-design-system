import{j as i}from"./jsx-runtime-qGIIFXMu.js";import{I as O}from"./index-9MS2e6do.js";import{r as c}from"./index-CDs2tPxN.js";import{t as U,c as X}from"./tv-Br1lVx4G.js";import{I as b}from"./IconButton-BCa2qX4v.js";import{L as C}from"./Link-CdD6jeHL.js";import{C as _}from"./chevron-left-Bqxy6nNn.js";import{E as B}from"./ellipsis-Bl27Sm0D.js";import{C as A}from"./chevron-right-CT14g65n.js";import{c as Z,m as f,h,a as q,b as D,d as I,e as H,f as y,A as J,E as K}from"./factory-BCO0_PXk.js";import{c as R}from"./create-split-props-u5h9OPvL.js";import{c as Q,a as G}from"./index-B1LdDssV.js";import{u as W,a as Y}from"./use-locale-context-CTaGYWMe.js";import{u as ee}from"./use-event-eGuf5zsd.js";const[te,x]=Z({name:"PaginationContext",hookName:"usePaginationContext",providerName:"<PaginationProvider />"}),ae=t=>t.children(x()),V=c.forwardRef((t,a)=>{const[e,o]=R()(t,["index"]),n=x(),r=f(n.getEllipsisProps(e),o);return i.jsx(h.div,{...r,ref:a})});V.displayName="PaginationEllipsis";const $=c.forwardRef((t,a)=>{const[e,o]=R()(t,["value","type"]),n=x(),r=f(n.getItemProps(e),o);return i.jsx(h.button,{...r,ref:a})});$.displayName="PaginationItem";const w=c.forwardRef((t,a)=>{const e=x(),o=f(e.getNextTriggerProps(),t);return i.jsx(h.button,{...o,ref:a})});w.displayName="PaginationNextTrigger";const F=c.forwardRef((t,a)=>{const e=x(),o=f(e.getPrevTriggerProps(),t);return i.jsx(h.button,{...o,ref:a})});F.displayName="PaginationPrevTrigger";var oe=q("pagination").parts("root","item","ellipsis","prevTrigger","nextTrigger"),T=oe.build(),v=D({getRootId:t=>{var a;return((a=t.ids)==null?void 0:a.root)??`pagination:${t.id}`},getPrevTriggerId:t=>{var a;return((a=t.ids)==null?void 0:a.prevTrigger)??`pagination:${t.id}:prev`},getNextTriggerId:t=>{var a;return((a=t.ids)==null?void 0:a.nextTrigger)??`pagination:${t.id}:next`},getEllipsisId:(t,a)=>{var e,o;return((o=(e=t.ids)==null?void 0:e.ellipsis)==null?void 0:o.call(e,a))??`pagination:${t.id}:ellipsis:${a}`},getItemId:(t,a)=>{var e,o;return((o=(e=t.ids)==null?void 0:e.item)==null?void 0:o.call(e,a))??`pagination:${t.id}:item:${a}`}}),E=(t,a)=>{let e=a-t+1;return Array.from({length:e},(o,n)=>n+t)},ie=t=>t.map(a=>typeof a=="number"?{type:"page",value:a}:{type:"ellipsis"}),S="ellipsis",ne=t=>{const a=Math.min(2*t.siblingCount+5,t.totalPages),e=1,o=t.totalPages,n=Math.max(t.page-t.siblingCount,e),r=Math.min(t.page+t.siblingCount,o),g=n>e+1,p=r<o-1,s=a-2;if(!g&&p)return[...E(1,s),S,o];if(g&&!p){const d=E(o-s+1,o);return[e,S,...d]}if(g&&p){const d=E(n,r);return[e,S,...d,S,o]}return E(e,o)},re=t=>ie(ne(t));function se(t,a,e){const o=t.context.totalPages,n=t.context.page,r=t.context.translations,g=t.context.previousPage,p=t.context.nextPage,s=t.context.pageRange,d=t.context.type==="button",N=n===1,z=n===o,k=re(t.context);return{page:n,pageSize:t.context.pageSize,totalPages:o,pages:k,previousPage:g,nextPage:p,pageRange:s,slice(l){return l.slice(s.start,s.end)},setCount(l){a({type:"SET_COUNT",count:l})},setPageSize(l){a({type:"SET_PAGE_SIZE",size:l})},setPage(l){a({type:"SET_PAGE",page:l})},goToNextPage(){a({type:"NEXT_PAGE"})},goToPrevPage(){a({type:"PREVIOUS_PAGE"})},goToFirstPage(){a({type:"FIRST_PAGE"})},goToLastPage(){a({type:"LAST_PAGE"})},getRootProps(){return e.element({id:v.getRootId(t.context),...T.root.attrs,dir:t.context.dir,"aria-label":r.rootLabel})},getEllipsisProps(l){return e.element({id:v.getEllipsisId(t.context,l.index),...T.ellipsis.attrs,dir:t.context.dir})},getItemProps(l){var L;const m=l.value,j=m===t.context.page;return e.element({id:v.getItemId(t.context,m),...T.item.attrs,dir:t.context.dir,"data-index":m,"data-selected":I(j),"aria-current":j?"page":void 0,"aria-label":(L=r.itemLabel)==null?void 0:L.call(r,{page:m,totalPages:o}),onClick(){a({type:"SET_PAGE",page:m})},...d&&{type:"button"}})},getPrevTriggerProps(){return e.element({id:v.getPrevTriggerId(t.context),...T.prevTrigger.attrs,dir:t.context.dir,"data-disabled":I(N),"aria-label":r.prevTriggerLabel,onClick(){a({type:"PREVIOUS_PAGE"})},...d&&{disabled:N,type:"button"}})},getNextTriggerProps(){return e.element({id:v.getNextTriggerId(t.context),...T.nextTrigger.attrs,dir:t.context.dir,"data-disabled":I(z),"aria-label":r.nextTriggerLabel,onClick(){a({type:"NEXT_PAGE"})},...d&&{disabled:z,type:"button"}})}}}var ge={rootLabel:"pagination",prevTriggerLabel:"previous page",nextTriggerLabel:"next page",itemLabel({page:t,totalPages:a}){return`${a>1&&t===a?"last page, ":""}page ${t}`}};function pe(t){const a=Q(t);return H({id:"pagination",initial:"idle",context:{pageSize:10,siblingCount:1,page:1,type:"button",translations:{...ge,...a.translations},...a},watch:{pageSize:["setPageIfNeeded"]},computed:{totalPages:e=>Math.ceil(e.count/e.pageSize),previousPage:e=>e.page===1?null:e.page-1,nextPage:e=>e.page===e.totalPages?null:e.page+1,pageRange:e=>{const o=(e.page-1)*e.pageSize,n=o+e.pageSize;return{start:o,end:n}},isValidPage:e=>e.page>=1&&e.page<=e.totalPages},on:{SET_COUNT:[{guard:"isValidCount",actions:["setCount","goToFirstPage"]},{actions:"setCount"}],SET_PAGE:{guard:"isValidPage",actions:"setPage"},SET_PAGE_SIZE:{actions:"setPageSize"},FIRST_PAGE:{actions:"goToFirstPage"},LAST_PAGE:{actions:"goToLastPage"},PREVIOUS_PAGE:{guard:"canGoToPrevPage",actions:"goToPrevPage"},NEXT_PAGE:{guard:"canGoToNextPage",actions:"goToNextPage"}},states:{idle:{}}},{guards:{isValidPage:(e,o)=>o.page>=1&&o.page<=e.totalPages,isValidCount:(e,o)=>e.page>o.count,canGoToNextPage:e=>e.page<e.totalPages,canGoToPrevPage:e=>e.page>1},actions:{setCount(e,o){e.count=o.count},setPage(e,o){P.page(e,o.page)},setPageSize(e,o){P.pageSize(e,o.size)},goToFirstPage(e){P.page(e,1)},goToLastPage(e){P.page(e,e.totalPages)},goToPrevPage(e){P.page(e,e.page-1)},goToNextPage(e){P.page(e,e.page+1)},setPageIfNeeded(e,o){e.isValidPage||P.page(e,1)}}})}var le=(t,a)=>Math.min(Math.max(t,1),a),P={pageSize:(t,a)=>{var e;G(t.pageSize,a)||(t.pageSize=a,(e=t.onPageSizeChange)==null||e.call(t,{pageSize:t.pageSize}))},page:(t,a)=>{var e;G(t.page,a)||(t.page=le(a,t.totalPages),(e=t.onPageChange)==null||e.call(t,{page:t.page,pageSize:t.pageSize}))}};y()(["count","dir","getRootNode","id","ids","onPageChange","onPageSizeChange","page","pageSize","siblingCount","translations","type"]);y()(["value","type"]);y()(["index"]);const de=t=>{const{getRootNode:a}=W(),{dir:e}=Y(),o={id:c.useId(),dir:e,getRootNode:a,page:t.defaultPage,...t},n={...o,page:t.page,onPageChange:ee(t.onPageChange,{sync:!0})},[r,g]=J(pe(o),{context:n});return se(r,g,K)},M=c.forwardRef((t,a)=>{const[e,o]=R()(t,["count","defaultPage","id","ids","onPageChange","onPageSizeChange","page","pageSize","siblingCount","translations","type"]),n=de(e),r=f(n.getRootProps(),o);return i.jsx(te,{value:n,children:i.jsx(h.nav,{...r,ref:a})})});M.displayName="PaginationRoot";const Pe=U({base:`${O.scope} pagination`,slots:{root:"trds-flex trds-gap-1",item:"trds-font-tabular-nums",prevTrigger:"",nextTrigger:"",ellipsis:"trds-inline-flex trds-items-center trds-text-neutral-900 trds-font-semibold trds-px-2"}}),ce=c.forwardRef((t,a)=>{const{type:e="button",children:o,className:n,...r}=t,g=Pe();return i.jsxs(M,{ref:a,className:X(g.root(),n),type:e,...r,children:[i.jsx(F,{className:g.prevTrigger(),asChild:!0,children:e==="button"?i.jsx(b,{variant:"ghost",size:"sm",children:i.jsx(_,{size:24})}):i.jsx(C,{theme:"neutral",children:i.jsx(_,{size:24})})}),i.jsx(ae,{children:p=>p.pages.map((s,u)=>s.type==="page"?i.jsx($,{className:g.item(),...s,asChild:!0,children:e==="button"?i.jsx(b,{variant:p.page===s.value?"filled":"ghost",size:"sm","data-active":p.page===s.value?!0:void 0,theme:p.page===s.value?"primary":"neutral",children:s.value}):i.jsx(C,{theme:p.page===s.value?"primary":"neutral","data-active":p.page===s.value?!0:void 0,children:s.value})},u):i.jsx(V,{index:u,className:g.ellipsis(),children:i.jsx(B,{size:16})},u))}),i.jsx(w,{className:g.nextTrigger(),asChild:!0,children:e==="button"?i.jsx(b,{variant:"ghost",size:"sm",children:i.jsx(A,{size:24})}):i.jsx(C,{theme:"neutral",children:i.jsx(A,{size:24})})})]})});ce.__docgenInfo={description:"",methods:[],displayName:"Root"};export{ce as R};
