import{j as r}from"./jsx-runtime-qGIIFXMu.js";import{C as s}from"./index-BRczQhMd.js";import{S as e}from"./Skeleton-B-ZNCcEh.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";const W={title:"Components/Skeleton",component:e,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{isLoaded:{control:{type:"boolean"}}},args:{isLoaded:!1}},o={args:{},render:n=>r.jsx(e,{...n,children:r.jsx("div",{children:"Hello World"})})},d={args:{isLoaded:!0},render:n=>r.jsx(e,{...n,children:r.jsx("div",{children:"Hello World"})})},t={args:{round:!0},render:n=>r.jsx(e,{...n,children:r.jsx("div",{className:"trds-w-24 trds-h-24",children:"Hello World"})})},a={args:{},render:()=>r.jsxs(s.Root,{children:[r.jsx(s.Header,{children:r.jsx(e,{children:r.jsx(s.Title,{children:"Hello World"})})}),r.jsx(s.Content,{children:r.jsx(e,{children:r.jsx("div",{className:"trds-w-96 trds-h-72"})})}),r.jsx(s.Footer,{children:r.jsxs("div",{className:"trds-flex trds-flex-row trds-gap-4",children:[r.jsx(e,{round:!0,children:r.jsx("div",{className:"trds-w-5 trds-h-5 trds-rounded-full",children:"!"})}),r.jsx(e,{children:r.jsx("div",{className:"trds-w-40 trds-h-5 trds-rounded-full",children:"Something Something Something Blar Blar Blar"})})]})})]})};var l,i,c;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`{
  args: {},
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(c=(i=o.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var p,m,u;d.parameters={...d.parameters,docs:{...(p=d.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    isLoaded: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(u=(m=d.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,S,x;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    round: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div className="trds-w-24 trds-h-24">Hello World</div>
      </Skeleton>;
  }
}`,...(x=(S=t.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var g,j,v;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
              <div className="trds-w-5 trds-h-5 trds-rounded-full">!</div>
            </Skeleton>
            <Skeleton>
              <div className="trds-w-40 trds-h-5 trds-rounded-full">
                Something Something Something Blar Blar Blar
              </div>
            </Skeleton>
          </div>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(v=(j=a.parameters)==null?void 0:j.docs)==null?void 0:v.source}}};const B=["Default","IsLoaded","Round","Example"];export{o as Default,a as Example,d as IsLoaded,t as Round,B as __namedExportsOrder,W as default};
