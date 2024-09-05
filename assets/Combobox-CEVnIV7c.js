import{j as c}from"./jsx-runtime-qGIIFXMu.js";import{I as de}from"./index-9MS2e6do.js";import{r as I}from"./index-CDs2tPxN.js";import{c as ge}from"./create-react-context-Dw26gLIP.js";import{t as pe,c as x}from"./tv-Br1lVx4G.js";import{I as me}from"./Input-DdliT5NN.js";import{c as he}from"./createLucideIcon-zijr-BYg.js";import{P as Ie}from"./portal-BWW2K-Dr.js";import{C as Ce}from"./check-DUDaO23Y.js";import{c as w,m as O,h as P,a as be,z as W,b as fe,U as ve,d as p,V as _,O as Oe,a0 as Ee,a1 as Pe,e as Ve,I as Te,r as E,H as ye,g as Ne,a2 as Se,A as Le,E as ke}from"./factory-BCO0_PXk.js";import{c as H}from"./create-split-props-u5h9OPvL.js";import{s as xe}from"./split-presence-props-DcTE3k_W.js";import{a as q,u as Re,P as Fe}from"./use-presence-BYwEg9-n.js";import{C as Y}from"./index-Dwc3-hf4.js";import{g as B,d as Ae,i as Ue,c as we}from"./index-DRtd-hRg.js";import{g as He,a as $}from"./index-CdZdUDHv.js";import{a as Ge}from"./index-lb5DGD3A.js";import{a as De}from"./index-BTGRfmW-.js";import{c as _e,s as je,t as M,v as J,a as j,x as Me}from"./index-B1LdDssV.js";import{a as Ke,u as Be}from"./use-locale-context-CTaGYWMe.js";import{u as F}from"./use-event-eGuf5zsd.js";import{u as Q}from"./use-field-context-CzRTzM_q.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=he("ChevronsUpDown",[["path",{d:"m7 15 5 5 5-5",key:"1hf1tw"}],["path",{d:"m7 9 5-5 5 5",key:"sgt6xg"}]]),[We,V]=w({name:"ComboboxContext",hookName:"useComboboxContext",providerName:"<ComboboxProvider />"}),X=I.forwardRef((t,o)=>{const e=V(),n=q(),i=O(e.getContentProps(),n.getPresenceProps(o),t);return n.unmounted?null:c.jsx(P.div,{...i})});X.displayName="ComboboxContent";const Z=I.forwardRef((t,o)=>{const e=V(),n=O(e.getControlProps(),t);return c.jsx(P.div,{...n,ref:o})});Z.displayName="ComboboxControl";const z=I.forwardRef((t,o)=>{const e=V(),n=O(e.getInputProps(),t),i=Q();return c.jsx(P.input,{"aria-describedby":i==null?void 0:i.ariaDescribedby,...n,ref:o})});z.displayName="ComboboxInput";const[qe,xt]=w({name:"ComboboxItemContext",hookName:"useComboboxItemContext",providerName:"<ComboboxItemProvider />"}),[Ye,ee]=w({name:"ComboboxItemPropsContext",hookName:"useComboboxItemPropsContext",providerName:"<ComboboxItemPropsProvider />"}),te=I.forwardRef((t,o)=>{const[e,n]=H()(t,["item","persistFocus"]),i=V(),u=O(i.getItemProps(e),n),s=i.getItemState(e);return c.jsx(Ye,{value:e,children:c.jsx(qe,{value:s,children:c.jsx(P.div,{...u,ref:o})})})});te.displayName="ComboboxItem";const[Je,Qe]=w({name:"ComboboxItemGroupPropsContext",hookName:"useComboboxItemGroupPropsContext",providerName:"<ComboboxItemGroupPropsProvider />"}),oe=I.forwardRef((t,o)=>{const e=I.useId(),[n,i]=H()(t,["id"]),u={id:e,...n},s=V(),d=O(s.getItemGroupProps(u),i);return c.jsx(Je,{value:u,children:c.jsx(P.div,{...d,ref:o})})});oe.displayName="ComboboxItemGroup";const ne=I.forwardRef((t,o)=>{const e=V(),n=Qe(),i=O(e.getItemGroupLabelProps({htmlFor:n.id}),t);return c.jsx(P.div,{...i,ref:o})});ne.displayName="ComboboxItemGroupLabel";const ie=I.forwardRef((t,o)=>{const e=V(),n=ee(),i=O(e.getItemIndicatorProps(n),t);return c.jsx(P.div,{...i,ref:o})});ie.displayName="ComboboxItemIndicator";const le=I.forwardRef((t,o)=>{const e=V(),n=ee(),i=O(e.getItemTextProps(n),t);return c.jsx(P.span,{...i,ref:o})});le.displayName="ComboboxItemText";const re=I.forwardRef((t,o)=>{const e=V(),n=q(),i=O(e.getPositionerProps(),t);return n.unmounted?null:c.jsx(P.div,{...i,ref:o})});re.displayName="ComboboxPositioner";var Xe=be("combobox").parts("root","clearTrigger","content","control","input","item","itemGroup","itemGroupLabel","itemIndicator","itemText","label","list","positioner","trigger"),b=Xe.build(),K=t=>W(new Y(t));K.empty=()=>W(new Y({items:[]}));var r=fe({getRootId:t=>{var o;return((o=t.ids)==null?void 0:o.root)??`combobox:${t.id}`},getLabelId:t=>{var o;return((o=t.ids)==null?void 0:o.label)??`combobox:${t.id}:label`},getControlId:t=>{var o;return((o=t.ids)==null?void 0:o.control)??`combobox:${t.id}:control`},getInputId:t=>{var o;return((o=t.ids)==null?void 0:o.input)??`combobox:${t.id}:input`},getContentId:t=>{var o;return((o=t.ids)==null?void 0:o.content)??`combobox:${t.id}:content`},getPositionerId:t=>{var o;return((o=t.ids)==null?void 0:o.positioner)??`combobox:${t.id}:popper`},getTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.trigger)??`combobox:${t.id}:toggle-btn`},getClearTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.clearTrigger)??`combobox:${t.id}:clear-btn`},getItemGroupId:(t,o)=>{var e,n;return((n=(e=t.ids)==null?void 0:e.itemGroup)==null?void 0:n.call(e,o))??`combobox:${t.id}:optgroup:${o}`},getItemGroupLabelId:(t,o)=>{var e,n;return((n=(e=t.ids)==null?void 0:e.itemGroupLabel)==null?void 0:n.call(e,o))??`combobox:${t.id}:optgroup-label:${o}`},getItemId:(t,o)=>{var e,n;return((n=(e=t.ids)==null?void 0:e.item)==null?void 0:n.call(e,o))??`combobox:${t.id}:option:${o}`},getContentEl:t=>r.getById(t,r.getContentId(t)),getInputEl:t=>r.getById(t,r.getInputId(t)),getPositionerEl:t=>r.getById(t,r.getPositionerId(t)),getControlEl:t=>r.getById(t,r.getControlId(t)),getTriggerEl:t=>r.getById(t,r.getTriggerId(t)),getClearTriggerEl:t=>r.getById(t,r.getClearTriggerId(t)),getHighlightedItemEl:t=>{const o=t.highlightedValue;if(o==null)return;const e=`[role=option][data-value="${CSS.escape(o)}"`;return ve(r.getContentEl(t),e)},focusInputEl:t=>{const o=r.getInputEl(t);r.isActiveElement(t,o)||o==null||o.focus({preventScroll:!0})},focusTriggerEl:t=>{const o=r.getTriggerEl(t);r.isActiveElement(t,o)||o==null||o.focus({preventScroll:!0})}});function Ze(t,o,e){const n=t.context.translations,i=t.context.collection,u=t.context.disabled,s=t.context.isInteractive,d=t.context.invalid,v=t.context.readOnly,g=t.hasTag("open"),T=t.hasTag("focused"),y=t.context.composite,L=t.context.highlightedValue,G=He({...t.context.positioning,placement:t.context.currentPlacement});function S(l){const{item:a}=l,C=i.getItemDisabled(a),h=i.getItemValue(a);return{value:h,disabled:!!(C||C),highlighted:L===h,selected:t.context.value.includes(h)}}return{focused:T,open:g,inputValue:t.context.inputValue,highlightedValue:L,highlightedItem:t.context.highlightedItem,value:t.context.value,valueAsString:t.context.valueAsString,hasSelectedItems:t.context.hasSelectedItems,selectedItems:t.context.selectedItems,collection:t.context.collection,reposition(l={}){o({type:"POSITIONING.SET",options:l})},setCollection(l){o({type:"COLLECTION.SET",value:l})},setHighlightValue(l){o({type:"HIGHLIGHTED_VALUE.SET",value:l})},selectValue(l){o({type:"ITEM.SELECT",value:l})},setValue(l){o({type:"VALUE.SET",value:l})},setInputValue(l){o({type:"INPUT_VALUE.SET",value:l})},clearValue(l){l!=null?o({type:"ITEM.CLEAR",value:l}):o("VALUE.CLEAR")},focus(){var l;(l=r.getInputEl(t.context))==null||l.focus()},setOpen(l){l!==g&&o(l?"OPEN":"CLOSE")},getRootProps(){return e.element({...b.root.attrs,dir:t.context.dir,id:r.getRootId(t.context),"data-invalid":p(d),"data-readonly":p(v)})},getLabelProps(){return e.label({...b.label.attrs,dir:t.context.dir,htmlFor:r.getInputId(t.context),id:r.getLabelId(t.context),"data-readonly":p(v),"data-disabled":p(u),"data-invalid":p(d),"data-focus":p(T),onClick(l){var a;y||(l.preventDefault(),(a=r.getTriggerEl(t.context))==null||a.focus({preventScroll:!0}))}})},getControlProps(){return e.element({...b.control.attrs,dir:t.context.dir,id:r.getControlId(t.context),"data-state":g?"open":"closed","data-focus":p(T),"data-disabled":p(u),"data-invalid":p(d)})},getPositionerProps(){return e.element({...b.positioner.attrs,dir:t.context.dir,id:r.getPositionerId(t.context),style:G.floating})},getInputProps(){return e.input({...b.input.attrs,dir:t.context.dir,"aria-invalid":_(d),"data-invalid":p(d),name:t.context.name,form:t.context.form,disabled:u,autoFocus:t.context.autoFocus,required:t.context.required,autoComplete:"off",autoCorrect:"off",autoCapitalize:"none",spellCheck:"false",readOnly:v,placeholder:t.context.placeholder,id:r.getInputId(t.context),type:"text",role:"combobox",defaultValue:t.context.inputValue,"aria-autocomplete":t.context.autoComplete?"both":"list","aria-controls":r.getContentId(t.context),"aria-expanded":g,"data-state":g?"open":"closed","aria-activedescendant":L?r.getItemId(t.context,L):void 0,onClick(l){l.defaultPrevented||t.context.openOnClick&&s&&o("INPUT.CLICK")},onFocus(){u||o("INPUT.FOCUS")},onBlur(){u||o("INPUT.BLUR")},onChange(l){o({type:"INPUT.CHANGE",value:l.currentTarget.value})},onKeyDown(l){if(l.defaultPrevented||!s||l.ctrlKey||l.shiftKey||Oe(l))return;const a=t.context.openOnKeyPress,C=l.ctrlKey||l.metaKey||l.shiftKey,h=!0,R={ArrowDown(N){!a&&!g||(o({type:N.altKey?"OPEN":"INPUT.ARROW_DOWN",keypress:h}),N.preventDefault())},ArrowUp(){!a&&!g||(o({type:l.altKey?"CLOSE":"INPUT.ARROW_UP",keypress:h}),l.preventDefault())},Home(N){C||(o({type:"INPUT.HOME",keypress:h}),g&&N.preventDefault())},End(N){C||(o({type:"INPUT.END",keypress:h}),g&&N.preventDefault())},Enter(N){o({type:"INPUT.ENTER",keypress:h}),g&&N.preventDefault();const ce=r.getHighlightedItemEl(t.context);we(ce)},Escape(){o({type:"INPUT.ESCAPE",keypress:h}),l.preventDefault()}},ue=B(l,t.context),D=R[ue];D==null||D(l)}})},getTriggerProps(l={}){return e.button({...b.trigger.attrs,dir:t.context.dir,id:r.getTriggerId(t.context),"aria-haspopup":y?"listbox":"dialog",type:"button",tabIndex:l.focusable?void 0:-1,"aria-label":n.triggerLabel,"aria-expanded":g,"data-state":g?"open":"closed","aria-controls":g?r.getContentId(t.context):void 0,disabled:u,"data-invalid":p(d),"data-focusable":p(l.focusable),"data-readonly":p(v),"data-disabled":p(u),onFocus(){l.focusable&&o({type:"INPUT.FOCUS",src:"trigger"})},onClick(a){a.defaultPrevented||s&&Ae(a)&&o("TRIGGER.CLICK")},onPointerDown(a){s&&a.pointerType!=="touch"&&(a.preventDefault(),queueMicrotask(()=>{var C;(C=r.getInputEl(t.context))==null||C.focus({preventScroll:!0})}))},onKeyDown(a){if(a.defaultPrevented||y)return;const C={ArrowDown(){o({type:"INPUT.ARROW_DOWN",src:"trigger"})},ArrowUp(){o({type:"INPUT.ARROW_UP",src:"trigger"})}},h=B(a,t.context),R=C[h];R&&(R(a),a.preventDefault())}})},getContentProps(){return e.element({...b.content.attrs,dir:t.context.dir,id:r.getContentId(t.context),role:y?"listbox":"dialog",tabIndex:-1,hidden:!g,"data-state":g?"open":"closed","data-placement":t.context.currentPlacement,"aria-labelledby":r.getLabelId(t.context),"aria-multiselectable":t.context.multiple&&y?!0:void 0,onPointerDown(l){l.preventDefault()}})},getListProps(){return e.element({...b.list.attrs,role:y?void 0:"listbox","aria-labelledby":r.getLabelId(t.context),"aria-multiselectable":t.context.multiple&&!y?!0:void 0})},getClearTriggerProps(){return e.button({...b.clearTrigger.attrs,dir:t.context.dir,id:r.getClearTriggerId(t.context),type:"button",tabIndex:-1,disabled:u,"data-invalid":p(d),"aria-label":n.clearTriggerLabel,"aria-controls":r.getInputId(t.context),hidden:!t.context.value.length,onPointerDown(l){l.preventDefault()},onClick(l){l.defaultPrevented||s&&o({type:"VALUE.CLEAR",src:"clear-trigger"})}})},getItemState:S,getItemProps(l){const a=S(l),C=a.value;return e.element({...b.item.attrs,dir:t.context.dir,id:r.getItemId(t.context,C),role:"option",tabIndex:-1,"data-highlighted":p(a.highlighted),"data-state":a.selected?"checked":"unchecked","aria-selected":_(a.highlighted),"aria-disabled":_(a.disabled),"data-disabled":p(a.disabled),"data-value":a.value,onPointerMove(){a.disabled||a.highlighted||o({type:"ITEM.POINTER_MOVE",value:C})},onPointerLeave(){l.persistFocus||a.disabled||!t.previousEvent.type.includes("POINTER")||o({type:"ITEM.POINTER_LEAVE",value:C})},onClick(h){Ee(h)||Pe(h)||Ue(h)||a.disabled||o({type:"ITEM.CLICK",src:"click",value:C})}})},getItemTextProps(l){const a=S(l);return e.element({...b.itemText.attrs,dir:t.context.dir,"data-state":a.selected?"checked":"unchecked","data-disabled":p(a.disabled),"data-highlighted":p(a.highlighted)})},getItemIndicatorProps(l){const a=S(l);return e.element({"aria-hidden":!0,...b.itemIndicator.attrs,dir:t.context.dir,"data-state":a.selected?"checked":"unchecked",hidden:!a.selected})},getItemGroupProps(l){const{id:a}=l;return e.element({...b.itemGroup.attrs,dir:t.context.dir,id:r.getItemGroupId(t.context,a),"aria-labelledby":r.getItemGroupLabelId(t.context,a)})},getItemGroupLabelProps(l){const{htmlFor:a}=l;return e.element({...b.itemGroupLabel.attrs,dir:t.context.dir,id:r.getItemGroupLabelId(t.context,a),role:"group"})}}}var{and:f,not:k}=Ne;function ze(t){const o=_e(t);return Ve({id:"combobox",initial:o.open?"suggesting":"idle",context:{loopFocus:!0,openOnClick:!1,value:[],highlightedValue:null,inputValue:"",allowCustomValue:!1,closeOnSelect:!o.multiple,inputBehavior:"none",selectionBehavior:"replace",openOnKeyPress:!0,openOnChange:!0,composite:!0,readOnly:!1,disabled:!1,...o,highlightedItem:null,selectedItems:[],valueAsString:"",collection:o.collection??K.empty(),positioning:{placement:"bottom",flip:!1,sameWidth:!0,...o.positioning},translations:{triggerLabel:"Toggle suggestions",clearTriggerLabel:"Clear value",...o.translations}},created:["syncInitialValues","syncSelectionBehavior"],computed:{isInputValueEmpty:e=>e.inputValue.length===0,isInteractive:e=>!(e.readOnly||e.disabled),autoComplete:e=>e.inputBehavior==="autocomplete",autoHighlight:e=>e.inputBehavior==="autohighlight",hasSelectedItems:e=>e.value.length>0},watch:{value:["syncSelectedItems"],inputValue:["syncInputValue"],highlightedValue:["syncHighlightedItem","autofillInputValue"],multiple:["syncSelectionBehavior"],open:["toggleVisibility"]},on:{"HIGHLIGHTED_VALUE.SET":{actions:["setHighlightedItem"]},"ITEM.SELECT":{actions:["selectItem"]},"ITEM.CLEAR":{actions:["clearItem"]},"VALUE.SET":{actions:["setSelectedItems"]},"INPUT_VALUE.SET":{actions:"setInputValue"},"COLLECTION.SET":{actions:["setCollection"]},"POSITIONING.SET":{actions:["reposition"]}},states:{idle:{tags:["idle","closed"],entry:["scrollContentToTop","clearHighlightedItem"],on:{"CONTROLLED.OPEN":{target:"interacting"},"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["setInitialFocus","highlightFirstSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["setInitialFocus","highlightFirstSelectedItem","invokeOnOpen"]}],"INPUT.CLICK":[{guard:"isOpenControlled",actions:["highlightFirstSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["highlightFirstSelectedItem","invokeOnOpen"]}],"INPUT.FOCUS":{target:"focused"},OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"interacting",actions:["invokeOnOpen"]}],"VALUE.CLEAR":{target:"focused",actions:["clearInputValue","clearSelectedItems","setInitialFocus"]}}},focused:{tags:["focused","closed"],entry:["scrollContentToTop","clearHighlightedItem"],on:{"CONTROLLED.OPEN":[{guard:"isChangeEvent",target:"suggesting"},{target:"interacting"}],"INPUT.CHANGE":[{guard:f("isOpenControlled","openOnChange"),actions:["setInputValue","invokeOnOpen","highlightFirstItemIfNeeded"]},{guard:"openOnChange",target:"suggesting",actions:["setInputValue","invokeOnOpen","highlightFirstItemIfNeeded"]},{actions:"setInputValue"}],"LAYER.INTERACT_OUTSIDE":{target:"idle"},"INPUT.ESCAPE":{guard:f("isCustomValue",k("allowCustomValue")),actions:"revertInputValue"},"INPUT.BLUR":{target:"idle"},"INPUT.CLICK":[{guard:"isOpenControlled",actions:["highlightFirstSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["highlightFirstSelectedItem","invokeOnOpen"]}],"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["setInitialFocus","highlightFirstSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["setInitialFocus","highlightFirstSelectedItem","invokeOnOpen"]}],"INPUT.ARROW_DOWN":[{guard:f("isOpenControlled","autoComplete"),actions:["invokeOnOpen"]},{guard:"autoComplete",target:"interacting",actions:["invokeOnOpen"]},{guard:"isOpenControlled",actions:["highlightFirstOrSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["highlightFirstOrSelectedItem","invokeOnOpen"]}],"INPUT.ARROW_UP":[{guard:"autoComplete",target:"interacting",actions:"invokeOnOpen"},{guard:"autoComplete",target:"interacting",actions:"invokeOnOpen"},{target:"interacting",actions:["highlightLastOrSelectedItem","invokeOnOpen"]},{target:"interacting",actions:["highlightLastOrSelectedItem","invokeOnOpen"]}],OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"interacting",actions:["invokeOnOpen"]}],"VALUE.CLEAR":{actions:["clearInputValue","clearSelectedItems"]}}},interacting:{tags:["open","focused"],entry:["setInitialFocus"],activities:["scrollToHighlightedItem","trackDismissableLayer","computePlacement","hideOtherElements"],on:{"CONTROLLED.CLOSE":[{guard:"restoreFocus",target:"focused",actions:["setFinalFocus"]},{target:"idle"}],"INPUT.HOME":{actions:["highlightFirstItem"]},"INPUT.END":{actions:["highlightLastItem"]},"INPUT.ARROW_DOWN":[{guard:f("autoComplete","isLastItemHighlighted"),actions:["clearHighlightedItem","scrollContentToTop"]},{actions:["highlightNextItem"]}],"INPUT.ARROW_UP":[{guard:f("autoComplete","isFirstItemHighlighted"),actions:"clearHighlightedItem"},{actions:"highlightPrevItem"}],"INPUT.ENTER":[{guard:f("isOpenControlled","closeOnSelect"),actions:["selectHighlightedItem","invokeOnClose"]},{guard:"closeOnSelect",target:"focused",actions:["selectHighlightedItem","invokeOnClose","setFinalFocus"]},{actions:["selectHighlightedItem"]}],"INPUT.CHANGE":[{guard:"autoComplete",target:"suggesting",actions:["setInputValue","invokeOnOpen"]},{target:"suggesting",actions:["clearHighlightedItem","setInputValue","invokeOnOpen"]}],"ITEM.POINTER_MOVE":{actions:["setHighlightedItem"]},"ITEM.POINTER_LEAVE":{actions:["clearHighlightedItem"]},"ITEM.CLICK":[{guard:f("isOpenControlled","closeOnSelect"),actions:["selectItem","invokeOnClose"]},{guard:"closeOnSelect",target:"focused",actions:["selectItem","invokeOnClose","setFinalFocus"]},{actions:["selectItem"]}],"LAYER.ESCAPE":[{guard:f("isOpenControlled","autoComplete"),actions:["syncInputValue","invokeOnClose"]},{guard:"autoComplete",target:"focused",actions:["syncInputValue","invokeOnClose"]},{guard:"isOpenControlled",actions:"invokeOnClose"},{target:"focused",actions:["invokeOnClose","setFinalFocus"]}],"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:"invokeOnClose"},{target:"focused",actions:"invokeOnClose"}],"LAYER.INTERACT_OUTSIDE":[{guard:f("isOpenControlled","isCustomValue",k("allowCustomValue")),actions:["revertInputValue","invokeOnClose"]},{guard:f("isCustomValue",k("allowCustomValue")),target:"idle",actions:["revertInputValue","invokeOnClose"]},{guard:"isOpenControlled",actions:"invokeOnClose"},{target:"idle",actions:"invokeOnClose"}],CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose","setFinalFocus"]}],"VALUE.CLEAR":[{guard:"isOpenControlled",actions:["clearInputValue","clearSelectedItems","invokeOnClose"]},{target:"focused",actions:["clearInputValue","clearSelectedItems","invokeOnClose","setFinalFocus"]}]}},suggesting:{tags:["open","focused"],activities:["trackDismissableLayer","scrollToHighlightedItem","computePlacement","trackChildNodes","hideOtherElements"],entry:["setInitialFocus"],on:{"CONTROLLED.CLOSE":[{guard:"restoreFocus",target:"focused",actions:["setFinalFocus"]},{target:"idle"}],CHILDREN_CHANGE:{actions:["highlightFirstItem"]},"INPUT.ARROW_DOWN":{target:"interacting",actions:["highlightNextItem"]},"INPUT.ARROW_UP":{target:"interacting",actions:["highlightPrevItem"]},"INPUT.HOME":{target:"interacting",actions:["highlightFirstItem"]},"INPUT.END":{target:"interacting",actions:["highlightLastItem"]},"INPUT.ENTER":[{guard:f("isOpenControlled","closeOnSelect"),actions:["selectHighlightedItem","invokeOnClose"]},{guard:"closeOnSelect",target:"focused",actions:["selectHighlightedItem","invokeOnClose","setFinalFocus"]},{actions:["selectHighlightedItem"]}],"INPUT.CHANGE":[{guard:"autoHighlight",actions:["setInputValue"]},{actions:["setInputValue"]}],"LAYER.ESCAPE":[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose"]}],"ITEM.POINTER_MOVE":{target:"interacting",actions:["setHighlightedItem"]},"ITEM.POINTER_LEAVE":{actions:["clearHighlightedItem"]},"LAYER.INTERACT_OUTSIDE":[{guard:f("isOpenControlled","isCustomValue",k("allowCustomValue")),actions:["revertInputValue","invokeOnClose"]},{guard:f("isCustomValue",k("allowCustomValue")),target:"idle",actions:["revertInputValue","invokeOnClose"]},{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"idle",actions:["invokeOnClose"]}],"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose"]}],"ITEM.CLICK":[{guard:f("isOpenControlled","closeOnSelect"),actions:["selectItem","invokeOnClose"]},{guard:"closeOnSelect",target:"focused",actions:["selectItem","invokeOnClose","setFinalFocus"]},{actions:["selectItem"]}],CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose","setFinalFocus"]}],"VALUE.CLEAR":[{guard:"isOpenControlled",actions:["clearInputValue","clearSelectedItems","invokeOnClose"]},{target:"focused",actions:["clearInputValue","clearSelectedItems","invokeOnClose","setFinalFocus"]}]}}}},{guards:{isInputValueEmpty:e=>e.isInputValueEmpty,autoComplete:e=>e.autoComplete&&!e.multiple,autoHighlight:e=>e.autoHighlight,isFirstItemHighlighted:e=>e.collection.firstValue===e.highlightedValue,isLastItemHighlighted:e=>e.collection.lastValue===e.highlightedValue,isCustomValue:e=>e.inputValue!==e.valueAsString,allowCustomValue:e=>!!e.allowCustomValue,hasHighlightedItem:e=>e.highlightedValue!=null,closeOnSelect:e=>!!e.closeOnSelect,isOpenControlled:e=>!!e["open.controlled"],openOnChange:(e,n)=>{var i;return je(e.openOnChange)?e.openOnChange:!!((i=e.openOnChange)!=null&&i.call(e,{inputValue:n.value}))},restoreFocus:(e,n)=>n.restoreFocus==null?!0:!!n.restoreFocus,isChangeEvent:(e,n)=>{var i;return((i=n.previousEvent)==null?void 0:i.type)==="INPUT.CHANGE"}},activities:{trackDismissableLayer(e,n,{send:i}){return e.disableLayer?void 0:De(()=>r.getContentEl(e),{defer:!0,exclude:()=>[r.getInputEl(e),r.getTriggerEl(e),r.getClearTriggerEl(e)],onFocusOutside:e.onFocusOutside,onPointerDownOutside:e.onPointerDownOutside,onInteractOutside:e.onInteractOutside,onEscapeKeyDown(s){s.preventDefault(),s.stopPropagation(),i("LAYER.ESCAPE")},onDismiss(){i({type:"LAYER.INTERACT_OUTSIDE",restoreFocus:!1})}})},hideOtherElements(e){return Ge([r.getInputEl(e),r.getContentEl(e),r.getTriggerEl(e)])},computePlacement(e){const n=()=>r.getControlEl(e),i=()=>r.getPositionerEl(e);return e.currentPlacement=e.positioning.placement,$(n,i,{...e.positioning,defer:!0,onComplete(u){e.currentPlacement=u.placement}})},trackChildNodes(e,n,{send:i}){return e.autoHighlight?Te(()=>r.getContentEl(e),{callback:()=>i("CHILDREN_CHANGE"),defer:!0}):void 0},scrollToHighlightedItem(e,n,{getState:i}){const u=r.getInputEl(e);let s=[];const d=T=>{if(i().event.type.includes("POINTER")||!e.highlightedValue)return;const G=r.getHighlightedItemEl(e),S=r.getContentEl(e);if(e.scrollToIndexFn){const a=e.collection.indexOf(e.highlightedValue);e.scrollToIndexFn({index:a,immediate:T});return}const l=E(()=>{Se(G,{rootEl:S,block:"nearest"})});s.push(l)},v=E(()=>d(!0));s.push(v);const g=ye(u,{attributes:["aria-activedescendant"],callback:()=>d(!1)});return s.push(g),()=>{s.forEach(T=>T())}}},actions:{reposition(e,n){$(()=>r.getControlEl(e),()=>r.getPositionerEl(e),{...e.positioning,...n.options,defer:!0,listeners:!1,onComplete(s){e.currentPlacement=s.placement}})},setHighlightedItem(e,n){n.value!=null&&m.highlightedValue(e,n.value)},clearHighlightedItem(e){m.highlightedValue(e,null,!0)},selectHighlightedItem(e){m.value(e,e.highlightedValue)},selectItem(e,n){n.value!=null&&m.value(e,n.value)},clearItem(e,n){if(n.value==null)return;const i=e.value.filter(u=>u!==n.value);m.value(e,i)},setInitialFocus(e){E(()=>{r.focusInputEl(e)})},setFinalFocus(e){E(()=>{const n=r.getTriggerEl(e);(n==null?void 0:n.dataset.focusable)==null?r.focusInputEl(e):r.focusTriggerEl(e)})},syncInputValue(e){const n=r.getInputEl(e);n&&(n.value=e.inputValue,queueMicrotask(()=>{const{selectionStart:i,selectionEnd:u}=n;Math.abs((u??0)-(i??0))===0&&i===0&&n.setSelectionRange(n.value.length,n.value.length)}))},setInputValue(e,n){m.inputValue(e,n.value)},clearInputValue(e){m.inputValue(e,"")},revertInputValue(e){const n=M(e.selectionBehavior,{replace:e.hasSelectedItems?e.valueAsString:"",preserve:e.inputValue,clear:""});m.inputValue(e,n)},syncInitialValues(e){const n=e.collection.findMany(e.value),i=e.collection.stringifyMany(e.value);e.highlightedItem=e.collection.find(e.highlightedValue),e.selectedItems=n,e.valueAsString=i,!(e.inputValue.trim()||e.multiple)&&(e.inputValue=M(e.selectionBehavior,{preserve:e.inputValue||i,replace:i,clear:""}))},syncSelectionBehavior(e){e.multiple&&(e.selectionBehavior="clear")},setSelectedItems(e,n){J(n.value)&&m.value(e,n.value)},clearSelectedItems(e){m.value(e,[])},scrollContentToTop(e){if(e.scrollToIndexFn)e.scrollToIndexFn({index:0,immediate:!0});else{const n=r.getContentEl(e);if(!n)return;n.scrollTop=0}},invokeOnOpen(e){var n;(n=e.onOpenChange)==null||n.call(e,{open:!0})},invokeOnClose(e){var n;(n=e.onOpenChange)==null||n.call(e,{open:!1})},highlightFirstItem(e){E(()=>{const n=e.collection.firstValue;m.highlightedValue(e,n)})},highlightFirstItemIfNeeded(e){e.autoHighlight&&E(()=>{const n=e.collection.firstValue;m.highlightedValue(e,n)})},highlightLastItem(e){E(()=>{const n=e.collection.lastValue;m.highlightedValue(e,n)})},highlightNextItem(e){let n=null;e.highlightedValue?(n=e.collection.getNextValue(e.highlightedValue),!n&&e.loopFocus&&(n=e.collection.firstValue)):n=e.collection.firstValue,m.highlightedValue(e,n)},highlightPrevItem(e){let n=null;e.highlightedValue?(n=e.collection.getPreviousValue(e.highlightedValue),!n&&e.loopFocus&&(n=e.collection.lastValue)):n=e.collection.lastValue,m.highlightedValue(e,n)},highlightFirstSelectedItem(e){E(()=>{const[n]=e.collection.sort(e.value);m.highlightedValue(e,n)})},highlightFirstOrSelectedItem(e){E(()=>{let n=null;e.hasSelectedItems?n=e.collection.sort(e.value)[0]:n=e.collection.firstValue,m.highlightedValue(e,n)})},highlightLastOrSelectedItem(e){E(()=>{let n=null;e.hasSelectedItems?n=e.collection.sort(e.value)[0]:n=e.collection.lastValue,m.highlightedValue(e,n)})},autofillInputValue(e,n){const i=r.getInputEl(e);if(!e.autoComplete||!i||!n.keypress)return;const u=e.collection.stringify(e.highlightedValue);E(()=>{i.value=u||e.inputValue})},setCollection(e,n){e.collection=n.value},syncSelectedItems(e){U.valueChange(e)},syncHighlightedItem(e){U.highlightChange(e)},toggleVisibility(e,n,{send:i}){i({type:e.open?"CONTROLLED.OPEN":"CONTROLLED.CLOSE",previousEvent:n})}}})}var U={valueChange:t=>{const o=t.selectedItems;t.selectedItems=t.value.map(i=>{const u=o.find(s=>t.collection.getItemValue(s)===i);return u||t.collection.find(i)});const e=t.collection.stringifyItems(t.selectedItems);t.valueAsString=e;let n;t.getSelectionValue?n=t.getSelectionValue({inputValue:t.inputValue,selectedItems:Array.from(t.selectedItems),valueAsString:e}):n=M(t.selectionBehavior,{replace:t.valueAsString,preserve:t.inputValue,clear:""}),m.inputValue(t,n)},highlightChange:t=>{t.highlightedItem=t.collection.find(t.highlightedValue)}},A={valueChange:t=>{var o;U.valueChange(t),(o=t.onValueChange)==null||o.call(t,{value:Array.from(t.value),items:Array.from(t.selectedItems)})},highlightChange:t=>{var o;U.highlightChange(t),(o=t.onHighlightChange)==null||o.call(t,{highlightedValue:t.highlightedValue,highlightedItem:t.highlightedItem})},inputChange:t=>{var o;(o=t.onInputValueChange)==null||o.call(t,{inputValue:t.inputValue})}},m={value:(t,o,e=!1)=>{if(!j(t.value,o)&&!(o==null&&!e)){if(o==null&&e){t.value=[],A.valueChange(t);return}J(o)?t.value=o:o!=null&&(t.value=t.multiple?Me(t.value,o):[o]),A.valueChange(t)}},highlightedValue:(t,o,e=!1)=>{j(t.highlightedValue,o)||!o&&!e||(t.highlightedValue=o||null,A.highlightChange(t))},inputValue:(t,o)=>{j(t.inputValue,o)||(t.inputValue=o,A.inputChange(t))}};const et=t=>{const[o,e]=H()(t,["isItemDisabled","itemToValue","itemToString","items"]),n=I.useMemo(()=>K(o),Object.values(o)),{dir:i}=Ke(),{getRootNode:u}=Be(),s=Q(),d={id:I.useId(),ids:{label:s==null?void 0:s.ids.label,input:s==null?void 0:s.ids.control},disabled:s==null?void 0:s.disabled,readOnly:s==null?void 0:s.readOnly,required:s==null?void 0:s.required,invalid:s==null?void 0:s.invalid,dir:i,getRootNode:u,collection:n,open:t.defaultOpen,value:t.defaultValue,"open.controlled":t.open!==void 0,...e},v={...d,collection:n,value:t.value,onValueChange:F(t.onValueChange,{sync:!0}),onInputValueChange:F(t.onInputValueChange,{sync:!0}),onHighlightChange:F(t.onHighlightChange),onOpenChange:F(t.onOpenChange)},[g,T]=Le(ze(d),{context:v});return Ze(g,T,ke)},tt=(t,o)=>{const[e,n]=xe(t),[i,u]=H()(n,["allowCustomValue","autoFocus","closeOnSelect","composite","defaultOpen","defaultValue","disabled","disableLayer","form","getSelectionValue","highlightedValue","id","ids","inputBehavior","inputValue","invalid","isItemDisabled","items","itemToString","itemToValue","loopFocus","multiple","name","onFocusOutside","onHighlightChange","onInputValueChange","onInteractOutside","onOpenChange","onOpenChange","onPointerDownOutside","onValueChange","open","openOnChange","openOnClick","openOnKeyPress","placeholder","positioning","readOnly","required","scrollToIndexFn","selectionBehavior","translations","value"]),s=et(i),d=Re(O({present:s.open},e)),v=O(s.getRootProps(),u);return c.jsx(We,{value:s,children:c.jsx(Fe,{value:d,children:c.jsx(P.div,{...v,ref:o})})})},ot=I.forwardRef(tt),se=I.forwardRef((t,o)=>{const e=V(),n=O(e.getTriggerProps(),t);return c.jsx(P.button,{...n,ref:o})});se.displayName="ComboboxTrigger";const nt=pe({base:`${de.scope} combobox`,slots:{root:"trds-flex trds-flex-col trds-gap-1.5 trds-w-full",control:"trds-relative",trigger:"trds-absolute trds-bottom-0 trds-right-0 trds-top-0 trds-text-muted trds-cursor-pointer",input:"trds-w-full",content:"trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-z-dropdown data-hidden:trds-hidden data-open:trds-animate-fade-in data-closed:trds-animate-fade-out focus-visible:trds-outline-2 focus-visible:trds-outline-solid focus-visible:trds-outline-neutral-300 focus-visible:trds-outline-offset-2",item:"trds-flex trds-items-center trds-justify-between trds-rounded-md trds-cursor-pointer trds-transition-fast trds-transition-[background,color] trds-ease-default hover:trds-bg-neutral-100 data-highlighted:trds-bg-neutral-100 disabled:trds-text-disabled disabled:trds-cursor-not-allowed disabled:hover:trds-bg-transparent disabled:hover:trds-text-disabled",itemGroupLabel:"trds-font-semibold trds-text-sm",itemIndicator:"trds-text-black",itemText:"",itemGroup:"",positioner:""},variants:{size:{sm:{content:"trds-p-0.5 trds-gap-1",item:"trds-text-sm trds-px-2 trds-h-9",itemIndicator:"[&_:where(svg)]:trds-w-4 [&_:where(svg)]:trds-h-4",itemGroupLabel:"trds-px-2 trds-py-1.5",label:"trds-text-sm",trigger:"trds-right-2.5"},md:{content:"trds-p-1 trds-gap-1",item:"trds-text-md trds-px-2 trds-h-10",itemIndicator:"[&_:where(svg)]:trds-w-4 [&_:where(svg)]:trds-h-4",itemGroupLabel:"trds-px-2 trds-py-1.5",label:"trds-text-sm",trigger:"trds-right-3"},lg:{content:"trds-p-1.5 trds-gap-1",item:"trds-text-md trds-px-2 trds-h-11",itemIndicator:"[&_:where(svg)]:trds-w-5 [&_:where(svg)]:trds-h-5",itemGroupLabel:"trds-px-2 trds-py-1.5",label:"trds-text-sm",trigger:"trds-right-3.5"}}},defaultVariants:{size:"md"}}),[it,ae]=ge({name:"combobox",hookName:"useComboboxContext",providerName:"ComboboxProvider",defaultValue:{classes:{},size:"md"}}),lt=I.forwardRef(function(t,o){const{size:e,placeholder:n,className:i,children:u,...s}=t,d=nt({size:e}),v={classes:d,size:e};return c.jsx(it,{value:v,children:c.jsxs(ot,{ref:o,className:x(d.root(),i),positioning:{sameWidth:!0},lazyMount:!0,unmountOnExit:!0,...s,children:[c.jsxs(Z,{className:d.control(),children:[c.jsx(z,{placeholder:"Select a Framework",className:d.input(),asChild:!0,children:c.jsx(me,{})}),c.jsx(se,{asChild:!0,className:d.trigger(),children:c.jsx("button",{"aria-label":"open",children:c.jsx($e,{size:20})})})]}),c.jsx(Ie,{children:c.jsx(re,{className:d.positioner(),children:c.jsx(X,{className:d.content(),children:u})})})]})})}),rt=I.forwardRef(function(t,o){const{label:e,className:n,children:i,...u}=t,{classes:s}=ae();return c.jsxs(oe,{className:x(s.itemGroup(),n),ref:o,...u,children:[c.jsx(ne,{className:s.itemGroupLabel(),children:e}),i]})}),st=I.forwardRef(function(t,o){const{className:e,children:n,...i}=t,{classes:u,size:s}=ae();return c.jsxs(te,{className:x(u.item(),e),ref:o,...i,children:[c.jsx(le,{className:x(u.itemText()),children:n}),c.jsx(ie,{className:x(u.itemIndicator()),children:c.jsx(Ce,{size:at(s)})})]})}),at=t=>t==="sm"?28:t==="md"?32:t==="lg"?36:32;lt.__docgenInfo={description:"",methods:[],displayName:"Root"};rt.__docgenInfo={description:"",methods:[],displayName:"ItemGroup"};st.__docgenInfo={description:"",methods:[],displayName:"Item"};export{rt as I,lt as R,st as a};
