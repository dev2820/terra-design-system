import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{I as r}from"./IconButton-wVH5gEV8.js";import{L as l}from"./Link-0DJNSbsh.js";import{R as f,N as T,P as y,I as E,E as R,C as k}from"./Pagination-BqHop7lE.js";import{C as d}from"./chevron-left-Bqxy6nNn.js";import{E as u}from"./ellipsis-Bl27Sm0D.js";import{C as c}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./Button-DfrSr2aa.js";import"./tv-CIwtzMts.js";import"./createLucideIcon-zijr-BYg.js";import"./create-react-context-Dw26gLIP.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";const i={Root:f,NextTrigger:T,PrevTrigger:y,Item:E,Ellipsis:R,Context:k},Q={title:"Components/Pagination",component:i,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},s={args:{count:100,pageSize:10,defaultPage:1},render:o=>e.jsxs(i.Root,{...o,children:[e.jsx(i.PrevTrigger,{asChild:!0,children:e.jsx(r,{variant:"ghost",size:"sm",children:e.jsx(d,{size:24})})}),e.jsx(i.Context,{children:a=>a.pages.map((n,t)=>n.type==="page"?e.jsx(i.Item,{...n,asChild:!0,children:e.jsx(r,{variant:a.page===n.value?"filled":"ghost",size:"sm","data-active":a.page===n.value?!0:void 0,theme:a.page===n.value?"primary":"neutral",children:n.value})},t):e.jsx(i.Ellipsis,{index:t,children:e.jsx(u,{size:16})},t))}),e.jsx(i.NextTrigger,{asChild:!0,children:e.jsx(r,{variant:"ghost",size:"sm",children:e.jsx(c,{size:24})})})]})},g={args:{count:100,pageSize:10,defaultPage:1,siblingCount:2},render:o=>e.jsxs(i.Root,{...o,children:[e.jsx(i.PrevTrigger,{asChild:!0,children:e.jsx(r,{variant:"ghost",size:"sm",children:e.jsx(d,{size:24})})}),e.jsx(i.Context,{children:a=>a.pages.map((n,t)=>n.type==="page"?e.jsx(i.Item,{...n,asChild:!0,children:e.jsx(r,{variant:a.page===n.value?"filled":"ghost",size:"sm","data-active":a.page===n.value?!0:void 0,theme:a.page===n.value?"primary":"neutral",children:n.value})},t):e.jsx(i.Ellipsis,{index:t,children:e.jsx(u,{size:16})},t))}),e.jsx(i.NextTrigger,{asChild:!0,children:e.jsx(r,{variant:"ghost",size:"sm",children:e.jsx(c,{size:24})})})]})},p={args:{count:100,pageSize:10,defaultPage:1},render:o=>e.jsxs(i.Root,{...o,children:[e.jsx(i.PrevTrigger,{asChild:!0,children:e.jsx(l,{theme:"default",children:e.jsx(d,{size:24})})}),e.jsx(i.Context,{children:a=>a.pages.map((n,t)=>n.type==="page"?e.jsx(i.Item,{...n,asChild:!0,children:e.jsx(l,{theme:a.page===n.value?"primary":"default","data-active":a.page===n.value?!0:void 0,children:n.value})},t):e.jsx(i.Ellipsis,{index:t,children:e.jsx(u,{size:16})},t))}),e.jsx(i.NextTrigger,{asChild:!0,children:e.jsx(l,{children:e.jsx(c,{size:24})})})]})};var m,h,x;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1
  },
  render: (props: PaginationProps['Root']) => {
    return <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronLeftIcon size={24} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination => pagination.pages.map((page, index) => page.type === 'page' ? <Pagination.Item key={index} {...page} asChild>
                  <IconButton variant={pagination.page === page.value ? 'filled' : 'ghost'} size="sm" data-active={pagination.page === page.value ? true : undefined} theme={pagination.page === page.value ? 'primary' : 'neutral'}>
                    {page.value}
                  </IconButton>
                </Pagination.Item> : <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>)}
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronRightIcon size={24} />
          </IconButton>
        </Pagination.NextTrigger>
      </Pagination.Root>;
  }
}`,...(x=(h=s.parameters)==null?void 0:h.docs)==null?void 0:x.source}}};var P,v,C;g.parameters={...g.parameters,docs:{...(P=g.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
    siblingCount: 2
  },
  render: (props: PaginationProps['Root']) => {
    return <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronLeftIcon size={24} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination => pagination.pages.map((page, index) => page.type === 'page' ? <Pagination.Item key={index} {...page} asChild>
                  <IconButton variant={pagination.page === page.value ? 'filled' : 'ghost'} size="sm" data-active={pagination.page === page.value ? true : undefined} theme={pagination.page === page.value ? 'primary' : 'neutral'}>
                    {page.value}
                  </IconButton>
                </Pagination.Item> : <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>)}
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronRightIcon size={24} />
          </IconButton>
        </Pagination.NextTrigger>
      </Pagination.Root>;
  }
}`,...(C=(v=g.parameters)==null?void 0:v.docs)==null?void 0:C.source}}};var j,z,I;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1
  },
  render: (props: PaginationProps['Root']) => {
    return <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <Link theme="default">
            <ChevronLeftIcon size={24} />
          </Link>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination => pagination.pages.map((page, index) => page.type === 'page' ? <Pagination.Item key={index} {...page} asChild>
                  <Link theme={pagination.page === page.value ? 'primary' : 'default'} data-active={pagination.page === page.value ? true : undefined}>
                    {page.value}
                  </Link>
                </Pagination.Item> : <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>)}
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <Link>
            <ChevronRightIcon size={24} />
          </Link>
        </Pagination.NextTrigger>
      </Pagination.Root>;
  }
}`,...(I=(z=p.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};const U=["Default","SibilingCount","LinkExample"];export{s as Default,p as LinkExample,g as SibilingCount,U as __namedExportsOrder,Q as default};
