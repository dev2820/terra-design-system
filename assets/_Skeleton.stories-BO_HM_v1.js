import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{b as R,c as m,a as o}from"./cva-C095pwBQ.js";import{C as s}from"./index-B1wKpd-r.js";import{r as W}from"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";const y=R({base:{animation:"shimmer",animationDuration:"3s",animationIterationCount:"infinite",backgroundClip:"padding-box",backgroundColor:"neutral.400",color:"transparent",cursor:"default",pointerEvents:"none",userSelect:"none","&::before, &::after, *":{visibility:"hidden"}},variants:{round:{true:{borderRadius:"full"},false:{borderRadius:"lg"}}},defaultVariants:{round:!0}}),r=W.forwardRef(function(n,l){const{round:H=!1,isLoaded:b,className:c,...u}=n;return b?e.jsx("div",{ref:l,className:m(o({animation:"fade-in",animationDuration:"0.2s",animationIterationCount:1}),c),...u}):e.jsx("div",{ref:l,className:m(y({round:H}),c),...u})});r.displayName="Skeleton";r.__docgenInfo={description:"",methods:[],displayName:"Skeleton"};const P={title:"Components/Skeleton",component:r,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},a={args:{},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},t={args:{isLoaded:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{children:"Hello World"})})},d={args:{round:!0},render:n=>e.jsx(r,{...n,children:e.jsx("div",{className:o({width:100,height:100}),children:"Hello World"})})},i={args:{},render:()=>e.jsxs(s.Root,{children:[e.jsx(s.Header,{children:e.jsx(r,{children:e.jsx(s.Title,{children:"Hello World"})})}),e.jsx(s.Content,{children:e.jsx(r,{children:e.jsx("div",{className:o({width:400,height:300})})})}),e.jsx(s.Footer,{children:e.jsxs("div",{className:o({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(r,{round:!0,children:e.jsx("div",{className:o({width:20,height:20,rounded:"full"}),children:"!"})}),e.jsx(r,{children:e.jsx("div",{className:o({width:80,height:20,rounded:"full"}),children:"Something Something Something Blar Blar Blar"})})]})})]})};var p,h,g;a.parameters={...a.parameters,docs:{...(p=a.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {},
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(g=(h=a.parameters)==null?void 0:h.docs)==null?void 0:g.source}}};var x,S,f;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    isLoaded: true
  },
  render: (props: SkeletonProps) => {
    return <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>;
  }
}`,...(f=(S=t.parameters)==null?void 0:S.docs)==null?void 0:f.source}}};var v,k,j;d.parameters={...d.parameters,docs:{...(v=d.parameters)==null?void 0:v.docs,source:{originalSource:`{
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
}`,...(j=(k=d.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var C,N,w;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(w=(N=i.parameters)==null?void 0:N.docs)==null?void 0:w.source}}};const T=["Default","IsLoaded","Round","Example"];export{a as Default,i as Example,t as IsLoaded,d as Round,T as __namedExportsOrder,P as default};
