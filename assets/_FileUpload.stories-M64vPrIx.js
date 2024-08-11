import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as r}from"./cva-C095pwBQ.js";import{B as d}from"./Button-BVDRYxdW.js";import{I as c}from"./IconButton-E43GEZXc.js";import{R as h,D as x,T as I,L as u,I as g,a as F,b as U,c as f,d as j,e as y,f as T,C as v}from"./FileUpload-Cz839xJ8.js";import{c as D}from"./createLucideIcon-zijr-BYg.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-_nUwlzfN.js";import"./index-DJ3ti8gJ.js";import"./create-split-props-u5h9OPvL.js";import"./use-locale-context-B5vdPRI5.js";import"./use-event-eGuf5zsd.js";import"./use-field-context-Dq9yVNyx.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=D("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]),t={Root:h,Dropzone:x,Trigger:I,Label:u,ItemGroup:g,Item:F,ItemPreview:U,ItemPreviewImage:f,ItemSizeText:j,ItemName:y,ItemDeleteTrigger:T,Context:v},H={title:"Components/FileUpload",component:t.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/file-upload"}}},tags:["autodocs"],argTypes:{},args:{}},o={args:{maxFiles:3,className:r({width:"full"})},render:l=>e.jsx("div",{className:r({width:"600px"}),children:e.jsxs(t.Root,{maxFiles:3,...l,children:[e.jsxs(t.Dropzone,{children:[e.jsx(t.Label,{children:"Drop your files here"}),e.jsx(t.Trigger,{asChild:!0,children:e.jsx(d,{size:"md",theme:"primary",children:"Open Dialog"})})]}),e.jsx(t.ItemGroup,{children:e.jsx(t.Context,{children:({acceptedFiles:n})=>n.map((p,m)=>e.jsxs(t.Item,{file:p,children:[e.jsx(t.ItemPreview,{type:"image/*",children:e.jsx(t.ItemPreviewImage,{})}),e.jsx(t.ItemName,{}),e.jsx(t.ItemSizeText,{}),e.jsx(t.ItemDeleteTrigger,{asChild:!0,children:e.jsx(c,{variant:"ghost",size:"sm",theme:"blackAlpha",children:e.jsx(z,{size:16})})})]},m))})})]})})};var a,i,s;o.parameters={...o.parameters,docs:{...(a=o.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    maxFiles: 3,
    className: css({
      width: 'full'
    })
  },
  render: (props: FileUploadProps['root']) => {
    return <div className={css({
      width: '600px'
    })}>
        <FileUpload.Root maxFiles={3} {...props}>
          <FileUpload.Dropzone>
            <FileUpload.Label>Drop your files here</FileUpload.Label>
            <FileUpload.Trigger asChild>
              <Button size="md" theme="primary">
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
}`,...(s=(i=o.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const q=["Default"];export{o as Default,q as __namedExportsOrder,H as default};
