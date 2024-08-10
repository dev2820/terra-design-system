import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a}from"./cva-C095pwBQ.js";import{f as z}from"./spacer-CRhrBJcD.js";import{R as s}from"./Slider-kGdUiT_u.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-split-props-B1LGkfrB.js";import"./index-B-yFm4aN.js";import"./index-4KpmSbEW.js";import"./use-locale-context-CfI1cghP.js";import"./index-hTcMZcOQ.js";import"./index-DJ3ti8gJ.js";import"./index-DtKw-7gC.js";import"./index-DBzJ7FiP.js";import"./use-event-eGuf5zsd.js";const G={title:"Components/Slider",component:s,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/collapsible"}}},tags:["autodocs"],argTypes:{},args:{}},n={args:{defaultValue:[30]},render:r=>e.jsx(s,{...r,className:a({width:200})})},t={args:{min:0,max:100,step:10,defaultValue:[30]},render:r=>e.jsx(s,{...r,className:a({width:200})})},o={args:{min:0,max:100,defaultValue:[30]},render:r=>e.jsxs("div",{className:z({direction:"column",gap:8}),children:[e.jsx(s,{...r,size:"sm",className:a({width:200})}),e.jsx(s,{...r,size:"md",className:a({width:200})}),e.jsx(s,{...r,size:"lg",className:a({width:200})})]})},m={args:{min:0,max:100,defaultValue:[30]},render:r=>{const V=[{value:0,marker:"0"},{value:20,marker:"20"},{value:40,marker:"40"},{value:60,marker:"60"},{value:80,marker:"80"},{value:100,marker:"100"}];return e.jsx(s,{...r,markers:V,className:a({width:200,color:"blackAlpha.500"})})}},l={args:{min:0,max:100,defaultValue:[30,60]},render:r=>e.jsx(s,{...r,multiple:!0,className:a({width:200})})};var i,p,c;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className={css({
      width: 200
    })} />;
  }
}`,...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var d,u,S;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} className={css({
      width: 200
    })} />;
  }
}`,...(S=(u=t.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var g,x,k;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    return <div className={flex({
      direction: 'column',
      gap: 8
    })}>
        <Slider {...props} size={'sm'} className={css({
        width: 200
      })} />
        <Slider {...props} size={'md'} className={css({
        width: 200
      })} />
        <Slider {...props} size={'lg'} className={css({
        width: 200
      })} />
      </div>;
  }
}`,...(k=(x=o.parameters)==null?void 0:x.docs)==null?void 0:k.source}}};var f,h,N;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30]
  },
  render: (props: SliderProps) => {
    const markers = [{
      value: 0,
      marker: '0'
    }, {
      value: 20,
      marker: '20'
    }, {
      value: 40,
      marker: '40'
    }, {
      value: 60,
      marker: '60'
    }, {
      value: 80,
      marker: '80'
    }, {
      value: 100,
      marker: '100'
    }];
    return <Slider {...props} markers={markers} className={css({
      width: 200,
      color: 'blackAlpha.500'
    })} />;
  }
}`,...(N=(h=m.parameters)==null?void 0:h.docs)==null?void 0:N.source}}};var v,w,j;l.parameters={...l.parameters,docs:{...(v=l.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    min: 0,
    max: 100,
    defaultValue: [30, 60]
  },
  render: (props: SliderProps) => {
    return <Slider {...props} multiple={true} className={css({
      width: 200
    })} />;
  }
}`,...(j=(w=l.parameters)==null?void 0:w.docs)==null?void 0:j.source}}};const H=["Default","Step","Size","Markers","Multiple"];export{n as Default,m as Markers,l as Multiple,o as Size,t as Step,H as __namedExportsOrder,G as default};
