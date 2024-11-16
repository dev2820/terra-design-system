import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as m}from"./Button-BUtwYwDE.js";import{I as d}from"./IconButton-CSRLRDpE.js";import{R as c,D as x,T as h,L as I,I as u,a as g,b as F,c as U,d as j,e as f,f as y,C as v}from"./FileUpload-BVrxc-Td.js";import{c as T}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./index-9MS2e6do.js";import"./tv-Br1lVx4G.js";import"./create-react-context-Dw26gLIP.js";import"./factory-BCO0_PXk.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./index-B1LdDssV.js";import"./use-locale-context-CTaGYWMe.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-CzRTzM_q.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=T("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),t={Root:c,Dropzone:x,Trigger:h,Label:I,ItemGroup:u,Item:g,ItemPreview:F,ItemPreviewImage:U,ItemSizeText:j,ItemName:f,ItemDeleteTrigger:y,Context:v},E={title:"Components/FileUpload",component:t.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/file-upload"}}},tags:["autodocs"],argTypes:{},args:{}},o={args:{maxFiles:3,className:"trds-w-full"},render:l=>e.jsx("div",{className:"trds-w-[600px]",children:e.jsxs(t.Root,{maxFiles:3,...l,children:[e.jsxs(t.Dropzone,{children:[e.jsx(t.Label,{children:"Drop your files here"}),e.jsx(t.Trigger,{asChild:!0,children:e.jsx(m,{size:"md",theme:"primary",variant:"outline",children:"Open Dialog"})})]}),e.jsx(t.ItemGroup,{children:e.jsx(t.Context,{children:({acceptedFiles:s})=>s.map((n,p)=>e.jsxs(t.Item,{file:n,children:[e.jsx(t.ItemPreview,{type:"image/*",children:e.jsx(t.ItemPreviewImage,{})}),e.jsx(t.ItemName,{}),e.jsx(t.ItemSizeText,{}),e.jsx(t.ItemDeleteTrigger,{asChild:!0,children:e.jsx(d,{variant:"ghost",size:"sm",theme:"blackAlpha",children:e.jsx(D,{size:16})})})]},p))})})]})})};var r,a,i;o.parameters={...o.parameters,docs:{...(r=o.parameters)==null?void 0:r.docs,source:{originalSource:`{
  args: {
    maxFiles: 3,
    className: 'trds-w-full'
  },
  render: (props: FileUploadProps['root']) => {
    return <div className="trds-w-[600px]">
        <FileUpload.Root maxFiles={3} {...props}>
          <FileUpload.Dropzone>
            <FileUpload.Label>Drop your files here</FileUpload.Label>
            <FileUpload.Trigger asChild>
              <Button size="md" theme="primary" variant="outline">
                Open Dialog
              </Button>
            </FileUpload.Trigger>
          </FileUpload.Dropzone>
          <FileUpload.ItemGroup>
            <FileUpload.Context>
              {({
              acceptedFiles
            }) => acceptedFiles.map((file, id) => <FileUpload.Item key={id} file={file}>
                    <FileUpload.ItemPreview type="image/*">
                      <FileUpload.ItemPreviewImage />
                    </FileUpload.ItemPreview>
                    <FileUpload.ItemName />
                    <FileUpload.ItemSizeText />
                    <FileUpload.ItemDeleteTrigger asChild>
                      <IconButton variant="ghost" size="sm" theme="blackAlpha">
                        <Trash2Icon size={16} />
                      </IconButton>
                    </FileUpload.ItemDeleteTrigger>
                  </FileUpload.Item>)}
            </FileUpload.Context>
          </FileUpload.ItemGroup>
        </FileUpload.Root>
      </div>;
  }
}`,...(i=(a=o.parameters)==null?void 0:a.docs)==null?void 0:i.source}}};const V=["Default"];export{o as Default,V as __namedExportsOrder,E as default};
