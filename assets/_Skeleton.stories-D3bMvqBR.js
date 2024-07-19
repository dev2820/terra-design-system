import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as s}from"./cva-C095pwBQ.js";import{S as r,C as o}from"./Skeleton-LD6WnSce.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";const B={title:"Components/Skeleton",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},d={args:{},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},t={args:{isLoaded:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},a={args:{round:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{className:s({width:100,height:100}),children:"Hello World"})})},l={args:{},render:()=>e.jsxs(o.Root,{children:[e.jsx(o.Header,{children:e.jsx(r,{children:e.jsx(o.Title,{children:"Hello World"})})}),e.jsx(o.Content,{children:e.jsx(r,{children:e.jsx("div",{className:s({width:400,height:300})})})}),e.jsx(o.Footer,{children:e.jsxs("div",{className:s({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{round:!0,children:e.jsx("div",{className:s({width:20,height:20,rounded:"full"}),children:"!"})}),e.jsx(r,{children:e.jsx("div",{className:s({width:80,height:20,rounded:"full"}),children:"Something Something Something Blar Blar Blar"})})]})})]})};var i,c,p;d.parameters={...d.parameters,docs:{...(i=d.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {},
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(p=(c=d.parameters)==null?void 0:c.docs)==null?void 0:p.source}}};var h,m,u;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    isLoaded: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(u=(m=t.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var g,S,x;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    round: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div className={css({
        width: 100,
        height: 100
      })}>Hello World</div>
      </Skeleton>;
  }
}`,...(x=(S=a.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var j,v,k;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render: () => {
    return <Card.Root>
        <Card.Header>
          <Skeleton>
            <Card.Title>Hello World</Card.Title>
          </Skeleton>
        </Card.Header>
        <Card.Content>
          <Skeleton>
            <div className={css({
            width: 400,
            height: 300
          })}></div>
          </Skeleton>
        </Card.Content>
        <Card.Footer>
          <div className={css({
          display: 'flex',
          flexDir: 'row',
          gap: 4
        })}>
            <Skeleton round>
              <div className={css({
              width: 20,
              height: 20,
              rounded: 'full'
            })}>
                !
              </div>
            </Skeleton>
            <Skeleton>
              <div className={css({
              width: 80,
              height: 20,
              rounded: 'full'
            })}>
                Something Something Something Blar Blar Blar
              </div>
            </Skeleton>
          </div>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(k=(v=l.parameters)==null?void 0:v.docs)==null?void 0:k.source}}};const R=["Default","IsLoaded","Round","Example"];export{d as Default,l as Example,t as IsLoaded,a as Round,R as __namedExportsOrder,B as default};
