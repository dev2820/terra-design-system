import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{C as s}from"./index-DwiDf62Y.js";import{S as r}from"./Skeleton-D4i3kzB2.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";const y={title:"Components/Skeleton",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isLoaded:{control:{type:"boolean"}}},args:{isLoaded:!1}},d={args:{},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},o={args:{isLoaded:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},t={args:{round:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{className:"trds-w-24 trds-h-24",children:"Hello World"})})},l={args:{},render:()=>e.jsxs(s.Root,{children:[e.jsx(s.Header,{children:e.jsx(r,{children:e.jsx(s.Title,{children:"Hello World"})})}),e.jsx(s.Content,{children:e.jsx(r,{children:e.jsx("div",{className:"trds-w-96 trds-h-72"})})}),e.jsx(s.Footer,{children:e.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[e.jsx(r,{round:!0,children:e.jsx("div",{className:"trds-w-16 trds-h-16 trds-rounded-full",children:"!"})}),e.jsxs("div",{children:[e.jsx(r,{children:e.jsx("div",{className:"trds-w-40 trds-h-6 trds-rounded-full trds-mb-2",children:"Something Something Something Blar Blar Blar"})}),e.jsx(r,{style:{width:"100px"},children:e.jsx("div",{className:"trds-h-6 trds-rounded-full",style:{width:"100px"},children:"Maybe Name"})})]})]})})]})};var a,i,c;d.parameters={...d.parameters,docs:{...(a=d.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {},
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(c=(i=d.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var m,p,u;o.parameters={...o.parameters,docs:{...(m=o.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    isLoaded: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(u=(p=o.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var h,x,S;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    round: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div className="trds-w-24 trds-h-24">Hello World</div>
      </Skeleton>;
  }
}`,...(S=(x=t.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var v,j,g;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
            <div className="trds-w-96 trds-h-72"></div>
          </Skeleton>
        </Card.Content>
        <Card.Footer>
          <div className="trds-flex trds-flex-row trds-gap-4">
            <Skeleton round>
              <div className="trds-w-16 trds-h-16 trds-rounded-full">!</div>
            </Skeleton>
            <div>
              <Skeleton>
                <div className="trds-w-40 trds-h-6 trds-rounded-full trds-mb-2">
                  Something Something Something Blar Blar Blar
                </div>
              </Skeleton>
              <Skeleton style={{
              width: '100px'
            }}>
                <div className="trds-h-6 trds-rounded-full" style={{
                width: '100px'
              }}>
                  Maybe Name
                </div>
              </Skeleton>
            </div>
          </div>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(g=(j=l.parameters)==null?void 0:j.docs)==null?void 0:g.source}}};const W=["Default","IsLoaded","Round","Example"];export{d as Default,l as Example,o as IsLoaded,t as Round,W as __namedExportsOrder,y as default};
