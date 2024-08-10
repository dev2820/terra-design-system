import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{a as c}from"./cva-C095pwBQ.js";import{R as T,T as h,I as m,a as d,B as l,b as x,c as w,d as V,e as B}from"./TreeView-CkxrDnti.js";import{C as t}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-D5jZQDUh.js";import"./create-split-props-u5h9OPvL.js";import"./index-DHe2XY-8.js";import"./use-locale-context-B5vdPRI5.js";import"./use-event-eGuf5zsd.js";import"./createLucideIcon-zijr-BYg.js";const r={Root:T,Tree:h,Item:m,ItemText:d,Branch:l,BranchControl:x,BranchText:w,BranchContent:V,BranchIndicator:B},N={title:"Components/TreeView",component:r.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},n={args:{defaultExpandedValue:["2.1"]},render:s=>e.jsx("div",{className:c({height:600,w:400}),children:e.jsx(r.Root,{...s,children:e.jsxs(r.Tree,{children:[e.jsx(r.Item,{value:"1.0",children:e.jsx(r.ItemText,{children:"1.0"})}),e.jsxs(r.Branch,{value:"2.0",children:[e.jsxs(r.BranchControl,{children:[e.jsx(r.BranchIndicator,{children:e.jsx(t,{size:16})}),e.jsx(r.BranchText,{children:"2.0"})]}),e.jsxs(r.BranchContent,{children:[e.jsxs(r.Branch,{value:"2.1",id:"2.1",children:[e.jsxs(r.BranchControl,{children:[e.jsx(r.BranchIndicator,{children:e.jsx(t,{size:16})}),e.jsx(r.BranchText,{children:"2.1"})]}),e.jsxs(r.BranchContent,{children:[e.jsx(r.Item,{value:"2.1.1",children:e.jsx(r.ItemText,{children:"2.1.1"})}),e.jsx(r.Item,{value:"2.1.2",children:e.jsx(r.ItemText,{children:"2.1.2"})})]})]}),e.jsx(r.Item,{value:"2.2",disabled:!0,children:e.jsx(r.ItemText,{children:"2.2"})})]})]})]})})})};var i,a,o;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  args: {
    defaultExpandedValue: ['2.1']
  },
  render: (props: TreeViewProps) => {
    return <div className={css({
      height: 600,
      w: 400
    })}>
        <TreeView.Root {...props}>
          <TreeView.Tree>
            <TreeView.Item value="1.0">
              <TreeView.ItemText>1.0</TreeView.ItemText>
            </TreeView.Item>
            <TreeView.Branch value="2.0">
              <TreeView.BranchControl>
                <TreeView.BranchIndicator>
                  <ChevronRightIcon size={16} />
                </TreeView.BranchIndicator>
                <TreeView.BranchText>2.0</TreeView.BranchText>
              </TreeView.BranchControl>
              <TreeView.BranchContent>
                <TreeView.Branch value="2.1" id="2.1">
                  <TreeView.BranchControl>
                    <TreeView.BranchIndicator>
                      <ChevronRightIcon size={16} />
                    </TreeView.BranchIndicator>
                    <TreeView.BranchText>2.1</TreeView.BranchText>
                  </TreeView.BranchControl>
                  <TreeView.BranchContent>
                    <TreeView.Item value="2.1.1">
                      <TreeView.ItemText>2.1.1</TreeView.ItemText>
                    </TreeView.Item>
                    <TreeView.Item value="2.1.2">
                      <TreeView.ItemText>2.1.2</TreeView.ItemText>
                    </TreeView.Item>
                  </TreeView.BranchContent>
                </TreeView.Branch>
                <TreeView.Item value="2.2" disabled>
                  <TreeView.ItemText>2.2</TreeView.ItemText>
                </TreeView.Item>
              </TreeView.BranchContent>
            </TreeView.Branch>
          </TreeView.Tree>
        </TreeView.Root>
      </div>;
  }
}`,...(o=(a=n.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const O=["Default"];export{n as Default,O as __namedExportsOrder,N as default};
