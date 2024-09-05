import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{R as v,I as D}from"./Carousel-C7po8VyZ.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./index-DOljKnny.js";import"./create-react-context-Dw26gLIP.js";import"./tv-Br1lVx4G.js";import"./createLucideIcon-zijr-BYg.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";const o={Root:v,Item:D},W={title:"Components/Carousel",component:o.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},t=["https://tinyurl.com/5b6ka8jd","https://tinyurl.com/7rmccdn5","https://tinyurl.com/59jxz9uu"],n={args:{defaultIndex:1},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},i={args:{defaultIndex:1,showControl:!1},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},d={args:{defaultIndex:1,readonly:!0,hideControl:!0},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},l={args:{defaultIndex:1,loop:!0},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},m={args:{defaultIndex:1,loop:!0},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{className:"trds-object-contain",index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},p={args:{slidesPerView:2},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{className:"trds-object-cover trds-aspect-square",index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})},c={args:{align:"center",spacing:"32px"},render:a=>e.jsx(o.Root,{...a,children:t.map((r,s)=>e.jsx(o.Item,{index:s,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${s}`})},r))})};var u,g,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var C,h,R;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1,
    showControl: false
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(R=(h=i.parameters)==null?void 0:h.docs)==null?void 0:R.source}}};var I,j,S;d.parameters={...d.parameters,docs:{...(I=d.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1,
    readonly: true,
    hideControl: true
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(S=(j=d.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var f,y,$;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1,
    loop: true
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...($=(y=l.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var P,k,b;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1,
    loop: true
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} className="trds-object-contain" index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(b=(k=m.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var w,N,V;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    slidesPerView: 2
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} className="trds-object-cover trds-aspect-square" index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(V=(N=p.parameters)==null?void 0:N.docs)==null?void 0:V.source}}};var _,O,q;c.parameters={...c.parameters,docs:{...(_=c.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    align: 'center',
    spacing: '32px'
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(q=(O=c.parameters)==null?void 0:O.docs)==null?void 0:q.source}}};const X=["Default","HideControl","Readonly","Loop","ObjectFit","SlidesPerView","Spacing"];export{n as Default,i as HideControl,l as Loop,m as ObjectFit,d as Readonly,p as SlidesPerView,c as Spacing,X as __namedExportsOrder,W as default};
