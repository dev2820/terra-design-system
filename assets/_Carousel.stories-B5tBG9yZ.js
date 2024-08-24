import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as v}from"./index-CO00fS6N.js";import{R as D,I as E}from"./Carousel-Bq4bL56f.js";import"./index-CDs2tPxN.js";import"./index-DOljKnny.js";import"./sva-qXmx1AZm.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCwUXDVF.js";import"./index-B-yFm4aN.js";import"./index-Dquv0SIZ.js";import"./index-DJ3ti8gJ.js";import"./createLucideIcon-zijr-BYg.js";import"./create-split-props-u5h9OPvL.js";import"./use-locale-context-0tfyuFre.js";import"./use-event-eGuf5zsd.js";const s={Root:D,Item:E},Y={title:"Components/Carousel",component:s.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},t=["https://tinyurl.com/5b6ka8jd","https://tinyurl.com/7rmccdn5","https://tinyurl.com/59jxz9uu"],n={args:{defaultIndex:1},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},i={args:{defaultIndex:1,showControl:!1},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},l={args:{defaultIndex:1,readonly:!0,hideControl:!0},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},d={args:{defaultIndex:1,loop:!0},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},m={args:{defaultIndex:1,loop:!0},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{className:v({objectFit:"contain"}),index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},p={args:{slidesPerView:2},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{className:v({objectFit:"cover",aspectRatio:"1 / 1"}),index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})},c={args:{align:"center",spacing:"32px"},render:a=>e.jsx(s.Root,{...a,children:t.map((r,o)=>e.jsx(s.Item,{index:o,asChild:!0,children:e.jsx("img",{src:r,alt:`Slide ${o}`})},r))})};var u,g,x;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(x=(g=n.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var C,R,h;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(h=(R=i.parameters)==null?void 0:R.docs)==null?void 0:h.source}}};var I,j,S;l.parameters={...l.parameters,docs:{...(I=l.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(S=(j=l.parameters)==null?void 0:j.docs)==null?void 0:S.source}}};var f,y,$;d.parameters={...d.parameters,docs:{...(f=d.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
}`,...($=(y=d.parameters)==null?void 0:y.docs)==null?void 0:$.source}}};var P,k,b;m.parameters={...m.parameters,docs:{...(P=m.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    defaultIndex: 1,
    loop: true
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} className={css({
        objectFit: 'contain'
      })} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(b=(k=m.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var w,F,N;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    slidesPerView: 2
  },
  render: (props: CarouselProps['Root']) => {
    return <Carousel.Root {...props}>
        {images.map((image, idx) => <Carousel.Item key={image} className={css({
        objectFit: 'cover',
        aspectRatio: '1 / 1'
      })} index={idx} asChild>
            <img src={image} alt={\`Slide \${idx}\`} />
          </Carousel.Item>)}
      </Carousel.Root>;
  }
}`,...(N=(F=p.parameters)==null?void 0:F.docs)==null?void 0:N.source}}};var V,_,O;c.parameters={...c.parameters,docs:{...(V=c.parameters)==null?void 0:V.docs,source:{originalSource:`{
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
}`,...(O=(_=c.parameters)==null?void 0:_.docs)==null?void 0:O.source}}};const Z=["Default","HideControl","Readonly","Loop","ObjectFit","SlidesPerView","Spacing"];export{n as Default,i as HideControl,d as Loop,m as ObjectFit,l as Readonly,p as SlidesPerView,c as Spacing,Z as __namedExportsOrder,Y as default};
