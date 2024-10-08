import{j as p}from"./jsx-runtime-qGIIFXMu.js";import{I as Z}from"./index-9MS2e6do.js";import{r as m}from"./index-CDs2tPxN.js";import{c as Q}from"./create-react-context-Dw26gLIP.js";import{t as z,c as b}from"./tv-Br1lVx4G.js";import{c as v,m as C,h as y,a as ee,b as te,w as N,U as R,Z as re,_ as F,q as ae,O as oe,p as ne,$ as se,s as de,d as g,e as ce,g as le,I as ie,A as ue,E as fe}from"./factory-BCO0_PXk.js";import{c as M}from"./create-split-props-u5h9OPvL.js";import{g as he,k as V}from"./index-DRtd-hRg.js";import{c as pe}from"./index-B1LdDssV.js";import{u as me,a as ge}from"./use-locale-context-CTaGYWMe.js";import{u as L}from"./use-event-eGuf5zsd.js";const[Te,A]=v({name:"TreeViewBranchContext",hookName:"useTreeViewBranchContext",providerName:"<TreeViewBranchProvider />"}),[Ie,w]=v({name:"TreeViewContext",hookName:"useTreeViewContext",providerName:"<TreeViewProvider />"}),[O,K]=v({name:"TreeViewDepthContext",hookName:"useTreeViewDepthContext",providerName:"<TreeViewDepthProvider />"}),W=m.forwardRef((t,o)=>{const[e,r]=M()(t,["disabled","value"]),a=w(),s=K(),l={...e,depth:s},f=C(a.getBranchProps(l),r);return p.jsx(O,{value:s+1,children:p.jsx(Te,{value:l,children:p.jsx(y.li,{...f,ref:o})})})});W.displayName="TreeViewBranch";const j=m.forwardRef((t,o)=>{const e=w(),r=A(),a=C(e.getBranchContentProps(r),t);return p.jsx(y.ul,{...a,ref:o})});j.displayName="TreeViewBranchContent";const H=m.forwardRef((t,o)=>{const e=w(),r=A(),a=C(e.getBranchControlProps(r),t);return p.jsx(y.div,{...a,ref:o})});H.displayName="TreeViewBranchControl";const U=m.forwardRef((t,o)=>{const e=w(),r=A(),a=C(e.getBranchIndicatorProps(r),t);return p.jsx(y.div,{...a,ref:o})});U.displayName="TreeViewBranchIndicator";const G=m.forwardRef((t,o)=>{const e=w(),r=A(),a=C(e.getBranchTextProps(r),t);return p.jsx(y.span,{...a,ref:o})});G.displayName="TreeViewBranchText";const[Ee,Ye]=v({name:"TreeViewItemContext",hookName:"useTreeViewItemContext",providerName:"<TreeViewItemProvider />"}),[Ne,xe]=v({name:"TreeViewItemPropsContext",hookName:"useTreeViewItemPropsContext",providerName:"<TreeViewItemProvider />"}),$=m.forwardRef((t,o)=>{const[{value:e,disabled:r},a]=M()(t,["disabled","value"]),s=w(),l=K(),f={value:e,disabled:r,depth:l},u=C(s.getItemProps(f),a),d=s.getItemState(f);return p.jsx(Ne,{value:f,children:p.jsx(Ee,{value:d,children:p.jsx(y.li,{...u,ref:o})})})});$.displayName="TreeViewItem";const X=m.forwardRef((t,o)=>{const e=w(),r=xe(),a=C(e.getItemTextProps(r),t);return p.jsx(y.span,{...a,ref:o})});X.displayName="TreeViewItemText";var be=ee("tree-view").parts("root","label","tree","item","itemIndicator","itemText","branch","branchControl","branchTrigger","branchContent","branchText","branchIndicator"),E=be.build(),c=te({getRootId:t=>{var o;return((o=t.ids)==null?void 0:o.root)??`tree-root:${t.id}`},getLabelId:t=>{var o;return((o=t.ids)==null?void 0:o.label)??`tree-label:${t.id}`},getTreeId:t=>{var o;return((o=t.ids)==null?void 0:o.tree)??`tree-tree:${t.id}`},getNodeId(t){return N(t)?t.dataset.branch??t.dataset.item??null:null},getNodeEl(t,o){const e=c.getItemEl(t,o)??c.getBranchEl(t,o);return(e==null?void 0:e.dataset.part)==="branch"?R(e,"[data-part=branch-control]"):e},getTreeEl(t){return c.getById(t,c.getTreeId(t))},getBranchEl(t,o){const e=`[role=treeitem][data-branch="${o}"]`;return R(c.getTreeEl(t),e)},getItemEl(t,o){const e=`[role=treeitem][data-item="${o}"]`;return R(c.getTreeEl(t),e)},getBranchControlEl(t,o){return R(c.getBranchEl(t,o),"[data-part=branch-control]")},getFocusedEl(t){return t.focusedValue?c.getById(t,t.focusedValue):null},focusNode(t,o){N(t)&&t.focus(o)},getNodeDepth(t){return t!=null&&t.dataset.depth?Number(t.dataset.depth):-1},getTreeWalker(t,o){const{skipHidden:e=!0,root:r}=o??{},a=r||c.getTreeEl(t);if(!a)throw new Error("Tree or branch root not found");return c.getDoc(t).createTreeWalker(a,NodeFilter.SHOW_ELEMENT,{acceptNode(l){return e&&re(l)?NodeFilter.FILTER_REJECT:l.role==="treeitem"&&l.dataset.part!=="branch"||l.role==="button"&&l.dataset.part==="branch-control"?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}})},getMatchingEl(t,o){const e=c.getTreeWalker(t),r=[];let a=e.firstChild();for(;a;)N(a)&&r.push(a),a=e.nextNode();return F(r,{state:t.typeaheadState,key:o,activeId:t.focusedValue,itemToId:s=>c.getNodeId(s)??s.id})},getTreeNodes(t,o={}){const e=c.getTreeWalker(t,o),r=[];let a=e.firstChild();for(;a;)N(a)&&r.push(a),a=e.nextNode();return r},getBranchNodes(t,o){return o===-1?[]:ae(c.getTreeEl(t),`[role=treeitem][data-part=branch][data-depth="${o}"]`)},getNodesInRange(t,o,e){const r=new Set;return t.forEach(a=>{const s=c.getNodeId(a);if(s==null)return;if(a===o||a===e){r.add(s);return}const l=a.compareDocumentPosition(o),f=a.compareDocumentPosition(e);if(l&Node.DOCUMENT_POSITION_FOLLOWING&&f&Node.DOCUMENT_POSITION_PRECEDING){r.add(s);return}if(l&Node.DOCUMENT_POSITION_PRECEDING&&f&Node.DOCUMENT_POSITION_FOLLOWING){r.add(s);return}}),Array.from(r)}});function Ce(t,o,e){const r=Array.from(t.context.expandedValue),a=Array.from(t.context.selectedValue),s=t.context.isTypingAhead,l=t.context.focusedValue;function f(d){return{value:d.value,disabled:!!d.disabled,focused:l===d.value,selected:a.includes(d.value)}}function u(d){return{value:d.value,disabled:!!d.disabled,focused:l===d.value,expanded:r.includes(d.value),selected:a.includes(d.value)}}return{expandedValue:r,selectedValue:a,expand(d){if(!d){o({type:"EXPANDED.ALL"});return}const n=new Set(r);d.forEach(i=>n.add(i)),o({type:"EXPANDED.SET",value:n,src:"expand"})},collapse(d){if(!d){o({type:"EXPANDED.SET",value:new Set([]),src:"collapseAll"});return}const n=new Set(r);d.forEach(i=>n.delete(i)),o({type:"EXPANDED.SET",value:n,src:"collapse"})},deselect(d){if(!d){o({type:"SELECTED.SET",value:new Set([]),src:"deselectAll"});return}const n=new Set(a);d.forEach(i=>n.delete(i)),o({type:"SELECTED.SET",value:n,src:"deselect"})},select(d){if(!d){o({type:"SELECTED.ALL"});return}const n=new Set(a);d.forEach(i=>n.add(i)),o({type:"SELECTED.SET",value:n,src:"select"})},focusBranch(d){var n;(n=c.getBranchControlEl(t.context,d))==null||n.focus()},focusItem(d){var n;(n=c.getItemEl(t.context,d))==null||n.focus()},getRootProps(){return e.element({...E.root.attrs,id:c.getRootId(t.context),dir:t.context.dir})},getLabelProps(){return e.element({...E.label.attrs,id:c.getLabelId(t.context),dir:t.context.dir})},getTreeProps(){return e.element({...E.tree.attrs,id:c.getTreeId(t.context),dir:t.context.dir,role:"tree","aria-label":"Tree View","aria-labelledby":c.getLabelId(t.context),"aria-multiselectable":t.context.selectionMode==="multiple"||void 0,onKeyDown(d){if(d.defaultPrevented||oe(d))return;const n=ne(d);if(se(n))return;const i=n==null?void 0:n.closest("[role=treeitem]");if(!i)return;const I=c.getNodeId(i);if(I==null){console.warn("Node id not found for node",i);return}const P=!!(n!=null&&n.dataset.branch),B={ArrowDown(h){V(h)||(h.preventDefault(),o({type:"ITEM.ARROW_DOWN",id:I,shiftKey:h.shiftKey}))},ArrowUp(h){V(h)||(h.preventDefault(),o({type:"ITEM.ARROW_UP",id:I,shiftKey:h.shiftKey}))},ArrowLeft(h){V(h)||i.dataset.disabled||(h.preventDefault(),o({type:P?"BRANCH.ARROW_LEFT":"ITEM.ARROW_LEFT",id:I}))},ArrowRight(h){!P||i.dataset.disabled||(h.preventDefault(),o({type:"BRANCH.ARROW_RIGHT",id:I}))},Home(h){V(h)||(h.preventDefault(),o({type:"ITEM.HOME",id:I,shiftKey:h.shiftKey}))},End(h){V(h)||(h.preventDefault(),o({type:"ITEM.END",id:I,shiftKey:h.shiftKey}))},Space(h){var k;i.dataset.disabled||(s?o({type:"TREE.TYPEAHEAD",key:h.key}):(k=B.Enter)==null||k.call(B,h))},Enter(h){if(i.dataset.disabled)return;(n==null?void 0:n.closest("a[href]"))||h.preventDefault(),o({type:P?"BRANCH.CLICK":"ITEM.CLICK",id:I,src:"keyboard"})},"*"(h){i.dataset.disabled||(h.preventDefault(),o({type:"EXPAND.SIBLINGS",id:I}))},a(h){!h.metaKey||i.dataset.disabled||(h.preventDefault(),o({type:"SELECTED.ALL",preventScroll:!0,moveFocus:!0}))}},J=he(d,t.context),_=B[J];if(_){_(d);return}!t.context.typeahead||!(d.key.length===1&&!V(d))||(o({type:"TREE.TYPEAHEAD",key:d.key,id:I}),d.preventDefault())},onBlur(d){de(d.currentTarget,d.relatedTarget)||o({type:"TREE.BLUR"})}})},getItemState:f,getItemProps(d){const n=f(d);return e.element({...E.item.attrs,dir:t.context.dir,"data-ownedby":c.getTreeId(t.context),"data-item":n.value,tabIndex:n.focused?0:-1,"data-focus":g(n.focused),role:"treeitem","aria-current":n.selected?"true":void 0,"aria-selected":n.disabled?void 0:n.selected,"data-selected":g(n.selected),"aria-disabled":n.disabled,"data-disabled":g(n.disabled),"aria-level":d.depth,"data-depth":d.depth,style:{"--depth":d.depth},onFocus(i){i.stopPropagation(),o({type:"ITEM.FOCUS",id:n.value})},onClick(i){if(n.disabled)return;const I=i.metaKey||i.ctrlKey;o({type:"ITEM.CLICK",id:n.value,shiftKey:i.shiftKey,ctrlKey:I}),i.stopPropagation(),i.currentTarget.matches("a[href]")||i.preventDefault()}})},getItemTextProps(d){const n=f(d);return e.element({...E.itemText.attrs,"data-disabled":g(n.disabled),"data-selected":g(n.selected),"data-focus":g(n.focused)})},getItemIndicatorProps(d){const n=f(d);return e.element({...E.itemIndicator.attrs,"aria-hidden":!0,"data-disabled":g(n.disabled),"data-selected":g(n.selected),"data-focus":g(n.focused),hidden:!n.selected})},getBranchState:u,getBranchProps(d){const n=u(d);return e.element({...E.branch.attrs,"data-depth":d.depth,dir:t.context.dir,"data-branch":n.value,role:"treeitem","data-ownedby":c.getTreeId(t.context),"aria-level":d.depth,"aria-selected":n.disabled?void 0:n.selected,"data-selected":g(n.selected),"aria-expanded":n.expanded,"data-state":n.expanded?"open":"closed","aria-disabled":n.disabled,"data-disabled":g(n.disabled),style:{"--depth":d.depth}})},getBranchIndicatorProps(d){const n=u(d);return e.element({...E.branchIndicator.attrs,"aria-hidden":!0,"data-state":n.expanded?"open":"closed","data-disabled":g(n.disabled),"data-selected":g(n.selected),"data-focus":g(n.focused)})},getBranchTriggerProps(d){const n=u(d);return e.element({...E.branchTrigger.attrs,role:"button",dir:t.context.dir,"data-disabled":g(n.disabled),"data-state":n.expanded?"open":"closed",onClick(i){n.disabled||(o({type:"BRANCH_TOGGLE.CLICK",id:n.value}),i.stopPropagation())}})},getBranchControlProps(d){const n=u(d);return e.element({...E.branchControl.attrs,role:"button",dir:t.context.dir,tabIndex:n.focused?0:-1,"data-state":n.expanded?"open":"closed","data-disabled":g(n.disabled),"data-selected":g(n.selected),"data-branch":n.value,"data-depth":d.depth,onFocus(i){o({type:"ITEM.FOCUS",id:n.value}),i.stopPropagation()},onClick(i){if(n.disabled)return;const I=i.metaKey||i.ctrlKey;o({type:"BRANCH.CLICK",id:n.value,shiftKey:i.shiftKey,ctrlKey:I}),i.stopPropagation()}})},getBranchTextProps(d){const n=u(d);return e.element({...E.branchText.attrs,dir:t.context.dir,"data-branch":n.value,"data-disabled":g(n.disabled),"data-state":n.expanded?"open":"closed"})},getBranchContentProps(d){const n=u(d);return e.element({...E.branchContent.attrs,role:"group",dir:t.context.dir,"data-branch":n.value,"data-state":n.expanded?"open":"closed",hidden:!n.expanded})}}}var{and:x}=le;function ye(t){const o=pe(t);return ce({id:"tree-view",initial:"idle",context:{expandedValue:[],selectedValue:[],focusedValue:null,expandOnClick:!0,selectionMode:"single",typeahead:!0,...o,typeaheadState:F.defaultOptions},computed:{isMultipleSelection:e=>e.selectionMode==="multiple"},on:{"EXPANDED.SET":{actions:["setExpanded"]},"SELECTED.SET":{actions:["setSelected"]},"SELECTED.ALL":[{guard:x("isMultipleSelection","moveFocus"),actions:["selectAllItems","focusTreeLastItem"]},{guard:"isMultipleSelection",actions:["selectAllItems"]}],"EXPANDED.ALL":{actions:["expandAllBranches"]}},activities:["trackChildrenMutation"],entry:["setFocusableNode"],states:{idle:{on:{"ITEM.FOCUS":{actions:["setFocusedItem"]},"ITEM.ARROW_DOWN":[{guard:x("isShiftKey","isMultipleSelection"),actions:["focusTreeNextItem","extendSelectionToNextItem"]},{actions:["focusTreeNextItem"]}],"ITEM.ARROW_UP":[{guard:x("isShiftKey","isMultipleSelection"),actions:["focusTreePrevItem","extendSelectionToPrevItem"]},{actions:["focusTreePrevItem"]}],"ITEM.ARROW_LEFT":{actions:["focusBranchControl"]},"BRANCH.ARROW_LEFT":[{guard:"isBranchExpanded",actions:["collapseBranch"]},{actions:["focusBranchControl"]}],"BRANCH.ARROW_RIGHT":[{guard:x("isBranchFocused","isBranchExpanded"),actions:["focusBranchFirstItem"]},{actions:["expandBranch"]}],"EXPAND.SIBLINGS":{actions:["expandSiblingBranches"]},"ITEM.HOME":[{guard:x("isShiftKey","isMultipleSelection"),actions:["extendSelectionToFirstItem","focusTreeFirstItem"]},{actions:["focusTreeFirstItem"]}],"ITEM.END":[{guard:x("isShiftKey","isMultipleSelection"),actions:["extendSelectionToLastItem","focusTreeLastItem"]},{actions:["focusTreeLastItem"]}],"ITEM.CLICK":[{guard:x("isCtrlKey","isMultipleSelection"),actions:["addOrRemoveItemFromSelection"]},{guard:x("isShiftKey","isMultipleSelection"),actions:["extendSelectionToItem"]},{actions:["selectItem"]}],"BRANCH.CLICK":[{guard:x("isCtrlKey","isMultipleSelection"),actions:["addOrRemoveItemFromSelection"]},{guard:x("isShiftKey","isMultipleSelection"),actions:["extendSelectionToItem"]},{guard:"openOnClick",actions:["selectItem","toggleBranch"]},{actions:["selectItem"]}],"BRANCH_TOGGLE.CLICK":{actions:["toggleBranch"]},"TREE.TYPEAHEAD":{actions:["focusMatchedItem"]},"TREE.BLUR":{actions:["clearFocusedItem","setFocusableNode"]}}}}},{guards:{isBranchFocused:(e,r)=>e.focusedValue===r.id,isBranchExpanded:(e,r)=>e.expandedValue.includes(r.id),isShiftKey:(e,r)=>r.shiftKey,isCtrlKey:(e,r)=>r.ctrlKey,hasSelectedItems:e=>e.selectedValue.length>0,isMultipleSelection:e=>e.isMultipleSelection,moveFocus:(e,r)=>!!r.moveFocus,openOnClick:e=>!!e.expandOnClick},activities:{trackChildrenMutation(e,r,{send:a}){const s=c.getTreeEl(e);return ie(s,{callback(l){const f=l.flatMap(i=>Array.from(i.removedNodes)).filter(i=>N(i)?i.matches("[role=treeitem]")||i.matches("[role=group]"):!1);if(!f.length)return;let u=null;l.forEach(i=>{N(i.nextSibling)?u=i.nextSibling:N(i.previousSibling)&&(u=i.previousSibling)}),u&&c.focusNode(u);const d=new Set;f.forEach(i=>{const I=c.getNodeId(i);N(i)&&I!=null&&d.add(I)});const n=new Set(e.selectedValue);d.forEach(i=>n.delete(i)),a({type:"SELECTED.SET",value:d})}})}},actions:{setFocusableNode(e){if(e.focusedValue)return;if(e.selectedValue.length>0){const s=Array.from(e.selectedValue)[0];e.focusedValue=s;return}const a=c.getTreeWalker(e).firstChild();N(a)&&(e.focusedValue=c.getNodeId(a))},selectItem(e,r){T.selected(e,[r.id])},setFocusedItem(e,r){T.focused(e,r.id)},clearFocusedItem(e){T.focused(e,null)},clearSelectedItem(e){T.selected(e,[])},toggleBranch(e,r){const a=new Set(e.expandedValue);a.has(r.id)?a.delete(r.id):a.add(r.id),T.expanded(e,Array.from(a))},expandBranch(e,r){const a=new Set(e.expandedValue);a.add(r.id),T.expanded(e,Array.from(a))},collapseBranch(e,r){const a=new Set(e.expandedValue);a.delete(r.id),T.expanded(e,Array.from(a))},setExpanded(e,r){T.expanded(e,r.value)},setSelected(e,r){T.selected(e,r.value)},focusTreeFirstItem(e){const r=c.getTreeWalker(e);c.focusNode(r.firstChild())},focusTreeLastItem(e,r){const a=c.getTreeWalker(e);c.focusNode(a.lastChild(),{preventScroll:r.preventScroll})},focusBranchFirstItem(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=c.getTreeWalker(e);s.currentNode=a,c.focusNode(s.nextNode())},focusTreeNextItem(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=c.getTreeWalker(e);if(e.focusedValue){s.currentNode=a;const l=s.nextNode();c.focusNode(l)}else c.focusNode(s.firstChild())},focusTreePrevItem(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=c.getTreeWalker(e);if(e.focusedValue){s.currentNode=a;const l=s.previousNode();c.focusNode(l)}else c.focusNode(s.lastChild())},focusBranchControl(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=Number(a.dataset.depth)-1;if(s<0)return;const l=`[data-part=branch][data-depth="${s}"]`,f=a.closest(l),u=f==null?void 0:f.querySelector("[data-part=branch-control]");c.focusNode(u)},selectAllItems(e){const r=new Set,a=c.getTreeWalker(e);let s=a.firstChild();for(;s;){const l=c.getNodeId(s);N(s)&&l!=null&&r.add(l),s=a.nextNode()}T.selected(e,Array.from(r))},focusMatchedItem(e,r){c.focusNode(c.getMatchingEl(e,r.key))},addOrRemoveItemFromSelection(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=new Set(e.selectedValue),l=c.getNodeId(a);l!=null&&(s.has(l)?s.delete(l):s.add(l),T.selected(e,Array.from(s)))},expandAllBranches(e){const r=new Set,a=c.getTreeWalker(e,{skipHidden:!1});for(;a.nextNode();){const s=a.currentNode,l=c.getNodeId(s);N(s)&&s.dataset.part==="branch-control"&&l!=null&&r.add(l)}T.expanded(e,Array.from(r))},expandSiblingBranches(e,r){const a=c.getNodeEl(e,r.id),s=c.getBranchNodes(e,c.getNodeDepth(a)),l=new Set;s.forEach(f=>{const u=c.getNodeId(f);u!=null&&l.add(u)}),T.expanded(e,Array.from(l))},extendSelectionToItem(e,r){const a=c.getNodeEl(e,r.id);if(!a)return;const s=c.getTreeNodes(e),l=Array.from(e.selectedValue),f=c.getNodeEl(e,l[0])||s[0],u=c.getNodesInRange(s,f,a);T.selected(e,u)},extendSelectionToNextItem(e,r){const a=r.id,s=c.getNodeEl(e,a);if(!s)return;const l=c.getTreeWalker(e);l.currentNode=s;const f=l.nextNode();c.focusNode(f);const u=new Set(e.selectedValue),d=c.getNodeId(f);d!=null&&(u.has(a)&&u.has(d)?u.delete(a):u.has(d)||u.add(d),T.selected(e,Array.from(u)))},extendSelectionToPrevItem(e,r){const a=r.id,s=c.getNodeEl(e,a);if(!s)return;const l=c.getTreeWalker(e);l.currentNode=s;const f=l.previousNode();c.focusNode(f);const u=new Set(e.selectedValue),d=c.getNodeId(f);d!=null&&(u.has(a)&&u.has(d)?u.delete(a):u.has(d)||u.add(d),T.selected(e,Array.from(u)))},extendSelectionToFirstItem(e){const r=c.getTreeNodes(e),a=c.getNodeEl(e,[...e.selectedValue][0])||r[0],s=r[0],l=c.getNodesInRange(r,a,s);T.selected(e,l)},extendSelectionToLastItem(e){const r=c.getTreeNodes(e),a=c.getNodeEl(e,[...e.selectedValue][0])||r[0],s=r[r.length-1],l=c.getNodesInRange(r,a,s);T.selected(e,l)}}})}var D={focusChange(t){var o;(o=t.onFocusChange)==null||o.call(t,{focusedValue:t.focusedValue})},expandedChange(t){var o;(o=t.onExpandedChange)==null||o.call(t,{expandedValue:Array.from(t.expandedValue),focusedValue:t.focusedValue})},selectionChange(t){var o;(o=t.onSelectionChange)==null||o.call(t,{selectedValue:Array.from(t.selectedValue),focusedValue:t.focusedValue})}},T={selected(t,o){t.selectedValue=o,D.selectionChange(t)},focused(t,o){t.focusedValue=o,D.focusChange(t)},expanded(t,o){t.expandedValue=o,D.expandedChange(t)}};const we=(t={})=>{const{getRootNode:o}=me(),{dir:e}=ge(),r={id:m.useId(),dir:e,getRootNode:o,selectedValue:t.defaultSelectedValue,expandedValue:t.defaultExpandedValue,...t},a={...r,selectedValue:t.selectedValue,expandedValue:t.expandedValue,onFocusChange:L(t.onFocusChange,{sync:!0}),onExpandedChange:L(t.onExpandedChange),onSelectionChange:L(t.onSelectionChange)},[s,l]=ue(ye(r),{context:a});return Ce(s,l,fe)},q=m.forwardRef((t,o)=>{const[e,r]=M()(t,["defaultExpandedValue","defaultSelectedValue","expandedValue","expandOnClick","focusedValue","id","ids","onExpandedChange","onFocusChange","onSelectionChange","selectedValue","selectionMode","typeahead"]),a=we(e),s=C(a.getRootProps(),r);return p.jsx(Ie,{value:a,children:p.jsx(y.div,{...s,ref:o})})});q.displayName="TreeViewRoot";const Y=m.forwardRef((t,o)=>{const e=w(),r=C(e.getTreeProps(),t);return p.jsx(O,{value:1,children:p.jsx(y.ul,{...r,ref:o})})});Y.displayName="TreeViewTree";const Se=z({base:`${Z.scope} treeView`,slots:{root:"trds-w-full",branch:"",branchContent:"trds-relative",branchText:"",branchControl:"trds-flex trds-items-center trds-rounded-md trds-text-fg-caption trds-font-medium trds-gap-1.5 trds-ps-[calc((var(--depth)-1)*22px)] trds-py-1.5 trds-text-sm trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-default hover:trds-bg-layer1 hover:trds-text-fg-highlight trds-cursor-pointer data-disabled:trds-bg-transparent",branchIndicator:"trds-text-fg-caption trds-transform-origin-center trds-transition trds-duration-normal trds-transition-[transform] trds-ease-default [&_svg]:text-md [&_svg]-w-4 [&_svg]-h-4 data-open:trds-text-primary-500 data-open:trds-rotate-90",item:["trds-relative trds-rounded-md trds-text-fg-caption trds-cursor-pointer trds-font-medium","trds-ps-[calc(((var(--depth)-1)*22px)+22px)] trds-py-1.5 trds-text-sm trds-transition trds-duration-normal trds-transition-[background,color] trds-ease-default","hover:trds-bg-layer1 hover:trds-text-fg-highlight","data-selected:trds-bg-layer1 data-selected:trds-text-fg-highlight data-selected:before:trds-absolute data-selected:before:trds-left-2 data-selected:before:trds-top-0 data-selected:before:trds-w-[2px] data-selected:before:trds-h-full data-selected:before:trds-bg-primary data-selected:before:trds-z-elevated","data-disabled:trds-bg-transparent data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed"],itemText:"",tree:"trds-flex trds-flex-col trds-gap-0"}}),[Ve,S]=Q({name:"treeView",hookName:"useTreeViewContext",providerName:"TreeViewProvider",defaultValue:{classes:{}}}),ve=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,s=Se(),l={classes:s};return p.jsx(Ve,{value:l,children:p.jsx(q,{ref:o,className:b(s.root(),e),...a,children:r})})}),Pe=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(Y,{className:b(s.tree(),e),ref:o,...a,children:r})}),Be=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx($,{className:b(s.item(),e),ref:o,...a,children:r})}),Re=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(X,{className:b(s.itemText(),e),ref:o,...a,children:r})}),Ae=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(W,{className:b(s.branch(),e),ref:o,...a,children:r})}),ke=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(G,{className:b(s.branchText(),e),ref:o,...a,children:r})}),Le=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(U,{className:b(s.branchIndicator(),e),ref:o,...a,children:r})}),De=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(H,{className:b(s.branchControl(),e),ref:o,...a,children:r})}),Me=m.forwardRef(function(t,o){const{className:e,children:r,...a}=t,{classes:s}=S();return p.jsx(j,{className:b(s.branchContent(),e),ref:o,...a,children:r})});ve.__docgenInfo={description:"",methods:[],displayName:"Root"};Pe.__docgenInfo={description:"",methods:[],displayName:"Tree"};Be.__docgenInfo={description:"",methods:[],displayName:"Item"};Re.__docgenInfo={description:"",methods:[],displayName:"ItemText"};Ae.__docgenInfo={description:"",methods:[],displayName:"Branch"};ke.__docgenInfo={description:"",methods:[],displayName:"BranchText"};Le.__docgenInfo={description:"",methods:[],displayName:"BranchIndicator"};De.__docgenInfo={description:"",methods:[],displayName:"BranchControl"};Me.__docgenInfo={description:"",methods:[],displayName:"BranchContent"};export{Ae as B,Be as I,ve as R,Pe as T,Re as a,De as b,ke as c,Me as d,Le as e};