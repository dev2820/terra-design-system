import{j as d}from"./jsx-runtime-qGIIFXMu.js";import{r as m}from"./index-CDs2tPxN.js";import{c as R}from"./cva-C095pwBQ.js";import{s as pe}from"./sva-CxSEfBjn.js";import{c as Ie}from"./create-react-context-Dw26gLIP.js";import{k as Ee,c as w,m as T,l as C,a as A,p as ve,w as q,q as Te,s as u,V as $,I as Ce,F as fe,W as Oe,X as ye,Y as Se,t as be,r as V,D as Pe,u as H,G as Re,N as Ne,U as Ge,x as Le,y as Ve}from"./create-split-props-BDI0pziA.js";import{c as ke,d as we,i as _,E as Ae,u as He,e as Fe}from"./use-locale-context-kz_CgJym.js";import{c as F}from"./index-DJ3ti8gJ.js";import{C as De}from"./chevron-down-Du6SRUSG.js";import{P as xe}from"./portal-BD9sQvlZ.js";import{C as _e}from"./check-DUDaO23Y.js";import{a as Y,t as je,s as $e,u as We,P as Me}from"./index-UPTylEcv.js";import{C as X}from"./index-qv61AvQj.js";import{c as Ue,e as B}from"./index-AUxzzpyp.js";import{g as Be,a as K}from"./index-D8zD1grH.js";import{t as Ke}from"./index-DBzJ7FiP.js";import{u as j}from"./use-event-eGuf5zsd.js";import{u as J}from"./use-field-context-CLfjAHXa.js";var Q=Ee("select").parts("label","positioner","trigger","indicator","clearTrigger","item","itemText","itemIndicator","itemGroup","itemGroupLabel","list","content","root","control","valueText");Q.build();var v=ke({getRootId:t=>{var o;return((o=t.ids)==null?void 0:o.root)??`select:${t.id}`},getContentId:t=>{var o;return((o=t.ids)==null?void 0:o.content)??`select:${t.id}:content`},getTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.trigger)??`select:${t.id}:trigger`},getClearTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.clearTrigger)??`select:${t.id}:clear-trigger`},getLabelId:t=>{var o;return((o=t.ids)==null?void 0:o.label)??`select:${t.id}:label`},getControlId:t=>{var o;return((o=t.ids)==null?void 0:o.control)??`select:${t.id}:control`},getItemId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.item)==null?void 0:i.call(e,o))??`select:${t.id}:option:${o}`},getHiddenSelectId:t=>{var o;return((o=t.ids)==null?void 0:o.hiddenSelect)??`select:${t.id}:select`},getPositionerId:t=>{var o;return((o=t.ids)==null?void 0:o.positioner)??`select:${t.id}:positioner`},getItemGroupId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.itemGroup)==null?void 0:i.call(e,o))??`select:${t.id}:optgroup:${o}`},getItemGroupLabelId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.itemGroupLabel)==null?void 0:i.call(e,o))??`select:${t.id}:optgroup-label:${o}`},getHiddenSelectEl:t=>v.getById(t,v.getHiddenSelectId(t)),getContentEl:t=>v.getById(t,v.getContentId(t)),getControlEl:t=>v.getById(t,v.getControlId(t)),getTriggerEl:t=>v.getById(t,v.getTriggerId(t)),getClearTriggerEl:t=>v.getById(t,v.getClearTriggerId(t)),getPositionerEl:t=>v.getById(t,v.getPositionerId(t)),getHighlightedOptionEl(t){return t.highlightedValue?v.getById(t,v.getItemId(t,t.highlightedValue)):null}});F()(["closeOnSelect","collection","dir","disabled","form","getRootNode","highlightedValue","id","ids","invalid","loopFocus","multiple","name","onFocusOutside","onHighlightChange","onInteractOutside","onOpenChange","onPointerDownOutside","onValueChange","open.controlled","open","composite","positioning","required","readOnly","scrollToIndexFn","value"]);F()(["item","persistFocus"]);F()(["id"]);F()(["htmlFor"]);const[qe,f]=w({name:"SelectContext",hookName:"useSelectContext",providerName:"<SelectProvider />"}),Z=m.forwardRef((t,o)=>{const e=f(),i=Y(),l=T(e.getContentProps(),i.getPresenceProps(o),t);return i.unmounted?null:d.jsx(C.div,{...l})});Z.displayName="SelectContent";const z=m.forwardRef((t,o)=>{const e=f(),i=T(e.getControlProps(),t);return d.jsx(C.div,{...i,ref:o})});z.displayName="SelectControl";const ee=m.forwardRef((t,o)=>{const e=f(),i=T(e.getHiddenSelectProps(),t),l=e.value.length===0,a=J();return d.jsxs(C.select,{"aria-describedby":a==null?void 0:a.ariaDescribedby,...i,ref:o,children:[l&&d.jsx("option",{value:""}),e.collection.items.map((s,g)=>d.jsx("option",{value:e.collection.getItemValue(s)??"",disabled:e.collection.getItemDisabled(s)},g))]})});ee.displayName="SelectHiddenSelect";const te=m.forwardRef((t,o)=>{const e=f(),i=T(e.getIndicatorProps(),t);return d.jsx(C.div,{...i,ref:o})});te.displayName="SelectIndicator";const[Ye,Gt]=w({name:"SelectItemContext",hookName:"useSelectItemContext",providerName:"<SelectItemProvider />"}),[Xe,oe]=w({name:"SelectItemPropsContext",hookName:"useSelectItemPropsContext",providerName:"<SelectItemPropsProvider />"}),ie=m.forwardRef((t,o)=>{const[e,i]=A()(t,["item","persistFocus"]),l=f(),a=T(l.getItemProps(e),i),s=l.getItemState(e);return d.jsx(Xe,{value:e,children:d.jsx(Ye,{value:s,children:d.jsx(C.div,{...a,ref:o})})})});ie.displayName="SelectItem";const[Je,Qe]=w({name:"SelectItemGroupPropsContext",hookName:"useSelectItemGroupPropsContext",providerName:"<SelectItemGroupPropsProvider />"}),le=m.forwardRef((t,o)=>{const e=m.useId(),[i,l]=A()(t,["id"]),a={id:e,...i},s=f(),g=T(s.getItemGroupProps(a),l);return d.jsx(Je,{value:a,children:d.jsx(C.div,{...g,ref:o})})});le.displayName="SelectItemGroup";const ne=m.forwardRef((t,o)=>{const e=f(),i=Qe(),l=T(e.getItemGroupLabelProps({htmlFor:i.id}),t);return d.jsx(C.div,{...l,ref:o})});ne.displayName="SelectItemGroupLabel";const re=m.forwardRef((t,o)=>{const e=f(),i=oe(),l=T(e.getItemIndicatorProps(i),t);return d.jsx(C.div,{...l,ref:o})});re.displayName="SelectItemIndicator";const se=m.forwardRef((t,o)=>{const e=f(),i=oe(),l=T(e.getItemTextProps(i),t);return d.jsx(C.span,{...l,ref:o})});se.displayName="SelectItemText";const ae=m.forwardRef((t,o)=>{const e=f(),i=T(e.getPositionerProps(),t);return Y().unmounted?null:d.jsx(C.div,{...i,ref:o})});ae.displayName="SelectPositioner";var Ze=ve("select").parts("label","positioner","trigger","indicator","clearTrigger","item","itemText","itemIndicator","itemGroup","itemGroupLabel","list","content","root","control","valueText"),E=Ze.build(),W=t=>q(new X(t));W.empty=()=>q(new X({items:[]}));var r=Te({getRootId:t=>{var o;return((o=t.ids)==null?void 0:o.root)??`select:${t.id}`},getContentId:t=>{var o;return((o=t.ids)==null?void 0:o.content)??`select:${t.id}:content`},getTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.trigger)??`select:${t.id}:trigger`},getClearTriggerId:t=>{var o;return((o=t.ids)==null?void 0:o.clearTrigger)??`select:${t.id}:clear-trigger`},getLabelId:t=>{var o;return((o=t.ids)==null?void 0:o.label)??`select:${t.id}:label`},getControlId:t=>{var o;return((o=t.ids)==null?void 0:o.control)??`select:${t.id}:control`},getItemId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.item)==null?void 0:i.call(e,o))??`select:${t.id}:option:${o}`},getHiddenSelectId:t=>{var o;return((o=t.ids)==null?void 0:o.hiddenSelect)??`select:${t.id}:select`},getPositionerId:t=>{var o;return((o=t.ids)==null?void 0:o.positioner)??`select:${t.id}:positioner`},getItemGroupId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.itemGroup)==null?void 0:i.call(e,o))??`select:${t.id}:optgroup:${o}`},getItemGroupLabelId:(t,o)=>{var e,i;return((i=(e=t.ids)==null?void 0:e.itemGroupLabel)==null?void 0:i.call(e,o))??`select:${t.id}:optgroup-label:${o}`},getHiddenSelectEl:t=>r.getById(t,r.getHiddenSelectId(t)),getContentEl:t=>r.getById(t,r.getContentId(t)),getControlEl:t=>r.getById(t,r.getControlId(t)),getTriggerEl:t=>r.getById(t,r.getTriggerId(t)),getClearTriggerEl:t=>r.getById(t,r.getClearTriggerId(t)),getPositionerEl:t=>r.getById(t,r.getPositionerId(t)),getHighlightedOptionEl(t){return t.highlightedValue?r.getById(t,r.getItemId(t,t.highlightedValue)):null}});function ze(t,o,e){const i=t.context.isDisabled,l=t.context.invalid,a=t.context.readOnly,s=t.context.isInteractive,g=t.context.composite,I=t.hasTag("open"),S=t.matches("focused"),O=t.context.highlightedValue,D=t.context.highlightedItem,he=t.context.selectedItems,M=t.context.isTypingAhead,N=t.context.collection,x=O?r.getItemId(t.context,O):void 0;function G(n){const c=N.getItemDisabled(n.item),p=N.getItemValue(n.item);return{value:p,disabled:!!(i||c),highlighted:O===p,selected:t.context.value.includes(p)}}const me=Be({...t.context.positioning,placement:t.context.currentPlacement});return{open:I,focused:S,empty:t.context.value.length===0,highlightedItem:D,highlightedValue:O,selectedItems:he,hasSelectedItems:t.context.hasSelectedItems,value:t.context.value,valueAsString:t.context.valueAsString,collection:N,setCollection(n){o({type:"COLLECTION.SET",value:n})},reposition(n={}){o({type:"POSITIONING.SET",options:n})},focus(){var n;(n=r.getTriggerEl(t.context))==null||n.focus({preventScroll:!0})},setOpen(n){n!==I&&o(n?"OPEN":"CLOSE")},selectValue(n){o({type:"ITEM.SELECT",value:n})},setValue(n){o({type:"VALUE.SET",value:n})},selectAll(){o({type:"VALUE.SET",value:N.getValues()})},highlightValue(n){o({type:"HIGHLIGHTED_VALUE.SET",value:n})},clearValue(n){o(n?{type:"ITEM.CLEAR",value:n}:{type:"VALUE.CLEAR"})},getItemState:G,getRootProps(){return e.element({...E.root.attrs,dir:t.context.dir,id:r.getRootId(t.context),"data-invalid":u(l),"data-readonly":u(a)})},getLabelProps(){return e.label({dir:t.context.dir,id:r.getLabelId(t.context),...E.label.attrs,"data-disabled":u(i),"data-invalid":u(l),"data-readonly":u(a),htmlFor:r.getHiddenSelectId(t.context),onClick(n){var c;n.defaultPrevented||i||(c=r.getTriggerEl(t.context))==null||c.focus({preventScroll:!0})}})},getControlProps(){return e.element({...E.control.attrs,dir:t.context.dir,id:r.getControlId(t.context),"data-state":I?"open":"closed","data-focus":u(S),"data-disabled":u(i),"data-invalid":u(l)})},getValueTextProps(){return e.element({...E.valueText.attrs,dir:t.context.dir,"data-disabled":u(i),"data-invalid":u(l),"data-focus":u(S)})},getTriggerProps(){return e.button({id:r.getTriggerId(t.context),disabled:i,dir:t.context.dir,type:"button",role:"combobox","aria-controls":r.getContentId(t.context),"aria-expanded":I,"aria-haspopup":"listbox","data-state":I?"open":"closed","aria-invalid":l,"aria-labelledby":r.getLabelId(t.context),...E.trigger.attrs,"data-disabled":u(i),"data-invalid":u(l),"data-readonly":u(a),"data-placement":t.context.currentPlacement,"data-placeholder-shown":u(!t.context.hasSelectedItems),onPointerDown(n){Ue(n)&&s&&(n.currentTarget.dataset.pointerType=n.pointerType,!(i||n.pointerType==="touch")&&o({type:"TRIGGER.CLICK"}))},onClick(n){!s||n.button||n.currentTarget.dataset.pointerType==="touch"&&o({type:"TRIGGER.CLICK"})},onFocus(){o("TRIGGER.FOCUS")},onBlur(){o("TRIGGER.BLUR")},onKeyDown(n){if(n.defaultPrevented||!s)return;const p={ArrowUp(){o({type:"TRIGGER.ARROW_UP"})},ArrowDown(y){o({type:y.altKey?"OPEN":"TRIGGER.ARROW_DOWN"})},ArrowLeft(){o({type:"TRIGGER.ARROW_LEFT"})},ArrowRight(){o({type:"TRIGGER.ARROW_RIGHT"})},Home(){o({type:"TRIGGER.HOME"})},End(){o({type:"TRIGGER.END"})},Enter(){o({type:"TRIGGER.ENTER"})},Space(y){o(M?{type:"TRIGGER.TYPEAHEAD",key:y.key}:{type:"TRIGGER.ENTER"})}}[B(n,t.context)];if(p){p(n),n.preventDefault();return}$.isValidEvent(n)&&(o({type:"TRIGGER.TYPEAHEAD",key:n.key}),n.preventDefault())}})},getIndicatorProps(){return e.element({...E.indicator.attrs,dir:t.context.dir,"aria-hidden":!0,"data-state":I?"open":"closed","data-disabled":u(i),"data-invalid":u(l),"data-readonly":u(a)})},getItemProps(n){const c=G(n);return e.element({id:r.getItemId(t.context,c.value),role:"option",...E.item.attrs,dir:t.context.dir,"data-value":c.value,"aria-selected":c.selected,"data-state":c.selected?"checked":"unchecked","data-highlighted":u(c.highlighted),"data-disabled":u(c.disabled),"aria-disabled":Ce(c.disabled),onPointerMove(p){c.disabled||p.pointerType!=="mouse"||c.value!==t.context.highlightedValue&&o({type:"ITEM.POINTER_MOVE",value:c.value})},onPointerUp(){c.disabled||o({type:"ITEM.CLICK",src:"pointerup",value:c.value})},onPointerLeave(p){c.disabled||n.persistFocus||p.pointerType!=="mouse"||["CONTENT.ARROW_UP","CONTENT.ARROW_DOWN"].includes(t.event.type)||o({type:"ITEM.POINTER_LEAVE"})},onTouchEnd(p){p.preventDefault(),p.stopPropagation()}})},getItemTextProps(n){const c=G(n);return e.element({...E.itemText.attrs,"data-state":c.selected?"checked":"unchecked","data-disabled":u(c.disabled),"data-highlighted":u(c.highlighted)})},getItemIndicatorProps(n){const c=G(n);return e.element({"aria-hidden":!0,...E.itemIndicator.attrs,"data-state":c.selected?"checked":"unchecked",hidden:!c.selected})},getItemGroupLabelProps(n){const{htmlFor:c}=n;return e.element({...E.itemGroupLabel.attrs,id:r.getItemGroupLabelId(t.context,c),role:"group",dir:t.context.dir})},getItemGroupProps(n){const{id:c}=n;return e.element({...E.itemGroup.attrs,"data-disabled":u(i),id:r.getItemGroupId(t.context,c),"aria-labelledby":r.getItemGroupLabelId(t.context,c),dir:t.context.dir})},getClearTriggerProps(){return e.button({...E.clearTrigger.attrs,id:r.getClearTriggerId(t.context),type:"button","aria-label":"Clear value","data-invalid":u(l),disabled:i,hidden:!t.context.hasSelectedItems,dir:t.context.dir,onClick(n){n.defaultPrevented||o("CLEAR.CLICK")}})},getHiddenSelectProps(){return e.select({name:t.context.name,form:t.context.form,disabled:i,multiple:t.context.multiple,required:t.context.required,"aria-hidden":!0,id:r.getHiddenSelectId(t.context),defaultValue:t.context.multiple?t.context.value:t.context.value[0],style:fe,tabIndex:-1,onFocus(){var n;(n=r.getTriggerEl(t.context))==null||n.focus({preventScroll:!0})},"aria-labelledby":r.getLabelId(t.context)})},getPositionerProps(){return e.element({...E.positioner.attrs,dir:t.context.dir,id:r.getPositionerId(t.context),style:me.floating})},getContentProps(){return e.element({hidden:!I,dir:t.context.dir,id:r.getContentId(t.context),role:g?"listbox":"dialog",...E.content.attrs,"data-state":I?"open":"closed","data-placement":t.context.currentPlacement,"data-activedescendant":x,"aria-activedescendant":g?x:void 0,"aria-multiselectable":t.context.multiple&&g?!0:void 0,"aria-labelledby":r.getLabelId(t.context),tabIndex:0,onKeyDown(n){if(!s||!Oe(n))return;if(n.key==="Tab"&&!ye(n)){n.preventDefault();return}const c={ArrowUp(){o({type:"CONTENT.ARROW_UP"})},ArrowDown(){o({type:"CONTENT.ARROW_DOWN"})},Home(){o({type:"CONTENT.HOME"})},End(){o({type:"CONTENT.END"})},Enter(){o({type:"ITEM.CLICK",src:"keydown.enter"})},Space(y){var U;M?o({type:"CONTENT.TYPEAHEAD",key:y.key}):(U=c.Enter)==null||U.call(c,y)}},p=c[B(n)];if(p){p(n),n.preventDefault();return}Se(n.target)||$.isValidEvent(n)&&(o({type:"CONTENT.TYPEAHEAD",key:n.key}),n.preventDefault())}})},getListProps(){return e.element({...E.list.attrs,tabIndex:0,role:g?void 0:"listbox","aria-labelledby":r.getTriggerId(t.context),"aria-activedescendant":g?void 0:x,"aria-multiselectable":!g&&t.context.multiple?!0:void 0})}}}var{and:P,not:b,or:et}=Re;function tt(t){const o=we(t);return be({id:"select",context:{value:[],highlightedValue:null,loopFocus:!1,closeOnSelect:!o.multiple,disabled:!1,readOnly:!1,composite:!0,...o,highlightedItem:null,selectedItems:[],valueAsString:"",collection:o.collection??W.empty(),typeahead:$.defaultOptions,fieldsetDisabled:!1,restoreFocus:!0,positioning:{placement:"bottom-start",gutter:8,...o.positioning}},computed:{hasSelectedItems:e=>e.value.length>0,isTypingAhead:e=>e.typeahead.keysSoFar!=="",isDisabled:e=>!!e.disabled||e.fieldsetDisabled,isInteractive:e=>!(e.isDisabled||e.readOnly)},initial:o.open?"open":"idle",created:["syncCollection"],entry:["syncSelectElement"],watch:{open:["toggleVisibility"],value:["syncSelectedItems","syncSelectElement"],highlightedValue:["syncHighlightedItem"],collection:["syncCollection"]},on:{"HIGHLIGHTED_VALUE.SET":{actions:["setHighlightedItem"]},"ITEM.SELECT":{actions:["selectItem"]},"ITEM.CLEAR":{actions:["clearItem"]},"VALUE.SET":{actions:["setSelectedItems"]},"VALUE.CLEAR":{actions:["clearSelectedItems"]},"CLEAR.CLICK":{actions:["clearSelectedItems","focusTriggerEl"]},"COLLECTION.SET":{actions:["setCollection"]}},activities:["trackFormControlState"],states:{idle:{tags:["closed"],on:{"CONTROLLED.OPEN":[{guard:"isTriggerClickEvent",target:"open",actions:["highlightFirstSelectedItem"]},{target:"open"}],"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","highlightFirstSelectedItem"]}],"TRIGGER.FOCUS":{target:"focused"},OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen"]}]}},focused:{tags:["closed"],entry:["focusTriggerEl"],on:{"CONTROLLED.OPEN":[{guard:"isTriggerClickEvent",target:"open",actions:["highlightFirstSelectedItem"]},{guard:"isTriggerArrowUpEvent",target:"open",actions:["highlightComputedLastItem"]},{guard:et("isTriggerArrowDownEvent","isTriggerEnterEvent"),target:"open",actions:["highlightComputedFirstItem"]},{target:"open"}],OPEN:[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen"]}],"TRIGGER.BLUR":{target:"idle"},"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","highlightFirstSelectedItem"]}],"TRIGGER.ENTER":[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","highlightComputedFirstItem"]}],"TRIGGER.ARROW_UP":[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","highlightComputedLastItem"]}],"TRIGGER.ARROW_DOWN":[{guard:"isOpenControlled",actions:["invokeOnOpen"]},{target:"open",actions:["invokeOnOpen","highlightComputedFirstItem"]}],"TRIGGER.ARROW_LEFT":[{guard:P(b("multiple"),"hasSelectedItems"),actions:["selectPreviousItem"]},{guard:b("multiple"),actions:["selectLastItem"]}],"TRIGGER.ARROW_RIGHT":[{guard:P(b("multiple"),"hasSelectedItems"),actions:["selectNextItem"]},{guard:b("multiple"),actions:["selectFirstItem"]}],"TRIGGER.HOME":{guard:b("multiple"),actions:["selectFirstItem"]},"TRIGGER.END":{guard:b("multiple"),actions:["selectLastItem"]},"TRIGGER.TYPEAHEAD":{guard:b("multiple"),actions:["selectMatchingItem"]}}},open:{tags:["open"],entry:["setInitialFocus"],exit:["scrollContentToTop"],activities:["trackDismissableElement","computePlacement","scrollToHighlightedItem"],on:{"CONTROLLED.CLOSE":[{guard:"shouldRestoreFocus",target:"focused",actions:["clearHighlightedItem"]},{target:"idle",actions:["clearHighlightedItem"]}],CLOSE:[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose","clearHighlightedItem"]}],"TRIGGER.CLICK":[{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"focused",actions:["invokeOnClose","clearHighlightedItem"]}],"ITEM.CLICK":[{guard:P("closeOnSelect","isOpenControlled"),actions:["selectHighlightedItem","invokeOnClose"]},{guard:"closeOnSelect",target:"focused",actions:["selectHighlightedItem","invokeOnClose","clearHighlightedItem"]},{actions:["selectHighlightedItem"]}],"CONTENT.INTERACT_OUTSIDE":[{guard:P("shouldRestoreFocus","isOpenControlled"),actions:["invokeOnClose"]},{guard:"shouldRestoreFocus",target:"focused",actions:["invokeOnClose","clearHighlightedItem"]},{guard:"isOpenControlled",actions:["invokeOnClose"]},{target:"idle",actions:["invokeOnClose","clearHighlightedItem"]}],"CONTENT.HOME":{actions:["highlightFirstItem"]},"CONTENT.END":{actions:["highlightLastItem"]},"CONTENT.ARROW_DOWN":[{guard:P("hasHighlightedItem","loop","isLastItemHighlighted"),actions:["highlightFirstItem"]},{guard:"hasHighlightedItem",actions:["highlightNextItem"]},{actions:["highlightFirstItem"]}],"CONTENT.ARROW_UP":[{guard:P("hasHighlightedItem","loop","isFirstItemHighlighted"),actions:["highlightLastItem"]},{guard:"hasHighlightedItem",actions:["highlightPreviousItem"]},{actions:["highlightLastItem"]}],"CONTENT.TYPEAHEAD":{actions:["highlightMatchingItem"]},"ITEM.POINTER_MOVE":{actions:["highlightItem"]},"ITEM.POINTER_LEAVE":{actions:["clearHighlightedItem"]},"POSITIONING.SET":{actions:["reposition"]}}}}},{guards:{loop:e=>!!e.loopFocus,multiple:e=>!!e.multiple,hasSelectedItems:e=>!!e.hasSelectedItems,hasHighlightedItem:e=>e.highlightedValue!=null,isFirstItemHighlighted:e=>e.highlightedValue===e.collection.firstValue,isLastItemHighlighted:e=>e.highlightedValue===e.collection.lastValue,closeOnSelect:(e,i)=>!!(i.closeOnSelect??e.closeOnSelect),shouldRestoreFocus:e=>!!e.restoreFocus,isOpenControlled:e=>!!e["open.controlled"],isTriggerClickEvent:(e,i)=>{var l;return((l=i.previousEvent)==null?void 0:l.type)==="TRIGGER.CLICK"},isTriggerEnterEvent:(e,i)=>{var l;return((l=i.previousEvent)==null?void 0:l.type)==="TRIGGER.ENTER"},isTriggerArrowUpEvent:(e,i)=>{var l;return((l=i.previousEvent)==null?void 0:l.type)==="TRIGGER.ARROW_UP"},isTriggerArrowDownEvent:(e,i)=>{var l;return((l=i.previousEvent)==null?void 0:l.type)==="TRIGGER.ARROW_DOWN"}},activities:{trackFormControlState(e,i,{initialContext:l}){return Ke(r.getHiddenSelectEl(e),{onFieldsetDisabledChange(a){e.fieldsetDisabled=a},onFormReset(){h.selectedItems(e,l.value)}})},trackDismissableElement(e,i,{send:l}){return je(()=>r.getContentEl(e),{defer:!0,exclude:[r.getTriggerEl(e),r.getClearTriggerEl(e)],onFocusOutside:e.onFocusOutside,onPointerDownOutside:e.onPointerDownOutside,onInteractOutside(s){var g;(g=e.onInteractOutside)==null||g.call(e,s),e.restoreFocus=!s.detail.focusable},onDismiss(){l({type:"CONTENT.INTERACT_OUTSIDE"})}})},computePlacement(e){return e.currentPlacement=e.positioning.placement,K(()=>r.getTriggerEl(e),()=>r.getPositionerEl(e),{defer:!0,...e.positioning,onComplete(a){e.currentPlacement=a.placement}})},scrollToHighlightedItem(e,i,{getState:l}){const a=g=>{if(e.highlightedValue==null||l().event.type.includes("POINTER"))return;const S=r.getHighlightedOptionEl(e),O=r.getContentEl(e);if(e.scrollToIndexFn){const D=e.collection.indexOf(e.highlightedValue);e.scrollToIndexFn({index:D,immediate:g});return}Ge(S,{rootEl:O,block:"nearest"})};return V(()=>a(!0)),Pe(()=>r.getContentEl(e),{defer:!0,attributes:["data-activedescendant"],callback(){a(!1)}})}},actions:{reposition(e,i){const l=()=>r.getPositionerEl(e);K(r.getTriggerEl(e),l,{...e.positioning,...i.options,defer:!0,listeners:!1,onComplete(a){e.currentPlacement=a.placement}})},toggleVisibility(e,i,{send:l}){l({type:e.open?"CONTROLLED.OPEN":"CONTROLLED.CLOSE",previousEvent:i})},highlightPreviousItem(e){if(e.highlightedValue==null)return;const i=e.collection.getPreviousValue(e.highlightedValue);h.highlightedItem(e,i)},highlightNextItem(e){if(e.highlightedValue==null)return;const i=e.collection.getNextValue(e.highlightedValue);h.highlightedItem(e,i)},highlightFirstItem(e){const i=e.collection.firstValue;h.highlightedItem(e,i)},highlightLastItem(e){const i=e.collection.lastValue;h.highlightedItem(e,i)},setInitialFocus(e){V(()=>{const i=Ne({root:r.getContentEl(e)});i==null||i.focus({preventScroll:!0})})},focusTriggerEl(e){V(()=>{var i;(i=r.getTriggerEl(e))==null||i.focus({preventScroll:!0})})},selectHighlightedItem(e,i){const l=i.value??e.highlightedValue;l!=null&&h.selectedItem(e,l)},highlightComputedFirstItem(e){const i=e.hasSelectedItems?e.collection.sort(e.value)[0]:e.collection.firstValue;h.highlightedItem(e,i)},highlightComputedLastItem(e){const i=e.hasSelectedItems?e.collection.sort(e.value)[0]:e.collection.lastValue;h.highlightedItem(e,i)},highlightFirstSelectedItem(e){if(!e.hasSelectedItems)return;const[i]=e.collection.sort(e.value);h.highlightedItem(e,i)},highlightItem(e,i){h.highlightedItem(e,i.value)},highlightMatchingItem(e,i){const l=e.collection.search(i.key,{state:e.typeahead,currentValue:e.highlightedValue});l!=null&&h.highlightedItem(e,l)},setHighlightedItem(e,i){h.highlightedItem(e,i.value)},clearHighlightedItem(e){h.highlightedItem(e,null,!0)},selectItem(e,i){h.selectedItem(e,i.value)},clearItem(e,i){const l=e.value.filter(a=>a!==i.value);h.selectedItems(e,l)},setSelectedItems(e,i){h.selectedItems(e,i.value)},clearSelectedItems(e){h.selectedItems(e,[])},selectPreviousItem(e){const i=e.collection.getPreviousValue(e.value[0]);h.selectedItem(e,i)},selectNextItem(e){const i=e.collection.getNextValue(e.value[0]);h.selectedItem(e,i)},selectFirstItem(e){const i=e.collection.firstValue;h.selectedItem(e,i)},selectLastItem(e){const i=e.collection.lastValue;h.selectedItem(e,i)},selectMatchingItem(e,i){const l=e.collection.search(i.key,{state:e.typeahead,currentValue:e.value[0]});l!=null&&h.selectedItem(e,l)},scrollContentToTop(e){var i;e.scrollToIndexFn?e.scrollToIndexFn({index:0,immediate:!0}):(i=r.getContentEl(e))==null||i.scrollTo(0,0)},invokeOnOpen(e){var i;(i=e.onOpenChange)==null||i.call(e,{open:!0})},invokeOnClose(e){var i;(i=e.onOpenChange)==null||i.call(e,{open:!1})},syncSelectElement(e){const i=r.getHiddenSelectEl(e);if(i){if(e.value.length===0&&!e.multiple){i.selectedIndex=-1;return}for(const l of i.options)l.selected=e.value.includes(l.value)}},setCollection(e,i){e.collection=i.value},syncCollection(e){const i=e.collection.findMany(e.value),l=e.collection.stringifyItems(i);e.highlightedItem=e.collection.find(e.highlightedValue),e.selectedItems=i,e.valueAsString=l},syncSelectedItems(e){k.valueChange(e)},syncHighlightedItem(e){k.highlightChange(e)}}})}function ot(t){V(()=>{const o=r.getHiddenSelectEl(t);if(!o)return;const e=r.getWin(t),i=new e.Event("change",{bubbles:!0,composed:!0});o.dispatchEvent(i)})}var k={valueChange:t=>{const o=t.selectedItems;t.selectedItems=t.value.map(e=>{const i=o.find(l=>t.collection.getItemValue(l)===e);return i||t.collection.find(e)}),t.valueAsString=t.collection.stringifyItems(t.selectedItems)},highlightChange:t=>{t.highlightedItem=t.collection.find(t.highlightedValue)}},L={valueChange:t=>{var o;k.valueChange(t),(o=t.onValueChange)==null||o.call(t,{value:Array.from(t.value),items:Array.from(t.selectedItems)}),ot(t)},highlightChange:t=>{var o;k.highlightChange(t),(o=t.onHighlightChange)==null||o.call(t,{highlightedValue:t.highlightedValue,highlightedItem:t.highlightedItem,highlightedIndex:t.collection.indexOf(t.highlightedValue)})}},h={selectedItem:(t,o,e=!1)=>{if(!_(t.value,o)&&!(o==null&&!e)){if(o==null&&e){t.value=[],L.valueChange(t);return}t.value=t.multiple?Ae(t.value,o):[o],L.valueChange(t)}},selectedItems:(t,o)=>{_(t.value,o)||(t.value=o,L.valueChange(t))},highlightedItem:(t,o,e=!1)=>{_(t.highlightedValue,o)||o==null&&!e||(t.highlightedValue=o??null,L.highlightChange(t))}};H()(["closeOnSelect","collection","dir","disabled","form","getRootNode","highlightedValue","id","ids","invalid","loopFocus","multiple","name","onFocusOutside","onHighlightChange","onInteractOutside","onOpenChange","onPointerDownOutside","onValueChange","open.controlled","open","composite","positioning","required","readOnly","scrollToIndexFn","value"]);H()(["item","persistFocus"]);H()(["id"]);H()(["htmlFor"]);const it=t=>{const[o,e]=A()(t,["isItemDisabled","itemToValue","itemToString","items"]),i=m.useMemo(()=>W(o),Object.values(o)),{getRootNode:l}=He(),{dir:a}=Fe(),s=J(),g={id:m.useId(),ids:{label:s==null?void 0:s.ids.label,hiddenSelect:s==null?void 0:s.ids.control},disabled:s==null?void 0:s.disabled,readOnly:s==null?void 0:s.readOnly,invalid:s==null?void 0:s.invalid,required:s==null?void 0:s.required,dir:a,getRootNode:l,collection:i,open:t.defaultOpen,value:t.defaultValue,"open.controlled":t.open!==void 0,...e},I={...g,collection:i,value:t.value,onValueChange:j(t.onValueChange,{sync:!0}),onHighlightChange:j(t.onHighlightChange),onOpenChange:j(t.onOpenChange)},[S,O]=Le(tt(g),{context:I});return ze(S,O,Ve)},lt=(t,o)=>{const[e,i]=$e(t),[l,a]=A()(i,["closeOnSelect","composite","defaultOpen","defaultValue","disabled","form","highlightedValue","id","ids","invalid","isItemDisabled","items","itemToString","itemToValue","loopFocus","multiple","name","onFocusOutside","onHighlightChange","onInteractOutside","onOpenChange","onPointerDownOutside","onValueChange","open","positioning","readOnly","required","scrollToIndexFn","value"]),s=it(l),g=We(T({present:s.open},e)),I=T(s.getRootProps(),a);return d.jsx(qe,{value:s,children:d.jsx(Me,{value:g,children:d.jsx(C.div,{...I,ref:o})})})},nt=m.forwardRef(lt),de=m.forwardRef((t,o)=>{const e=f(),i=T(e.getTriggerProps(),t);return d.jsx(C.button,{...i,ref:o})});de.displayName="SelectTrigger";const ce=m.forwardRef((t,o)=>{const{children:e,placeholder:i,...l}=t,a=f(),s=T(a.getValueTextProps(),l);return d.jsx(C.span,{...s,ref:o,children:e||a.valueAsString||i})});ce.displayName="SelectValueText";const rt=pe({className:"select",slots:Q.keys(),base:{root:{display:"flex",flexDirection:"column",gap:"1.5",width:"full"},content:{background:"white",borderRadius:"lg",boxShadow:"lg",display:"flex",flexDirection:"column",zIndex:"dropdown",_open:{animation:"fade-in 0.25s ease-out"},_closed:{animation:"fade-out 0.2s ease-out"},_focusVisible:{outlineOffset:"2px",outline:"2px solid",outlineColor:"neutral.300"}},item:{alignItems:"center",borderRadius:"md",cursor:"pointer",display:"flex",justifyContent:"space-between",transitionDuration:"fast",transitionProperty:"background, color",transitionTimingFunction:"default",_hover:{background:"neutral.300",color:"black"},_highlighted:{background:"neutral.300",color:"black"},_selected:{color:"black"},_disabled:{color:"disabled",cursor:"not-allowed",_hover:{background:"transparent",color:"disabled"}}},itemGroupLabel:{fontWeight:"semibold",textStyle:"sm"},itemIndicator:{color:"black"},label:{color:"neutral.500",fontWeight:"medium"},trigger:{appearance:"none",alignItems:"center",borderColor:"neutral.300",borderRadius:"lg",cursor:"pointer",color:"neutral.800",display:"inline-flex",justifyContent:"space-between",outline:0,position:"relative",transitionDuration:"normal",transitionProperty:"background, box-shadow, border-color",transitionTimingFunction:"default",width:"full",borderWidth:"1px",_focus:{borderColor:"neutral.300",boxShadow:"0 0 0 2px var(--shadow-color)",shadowColor:"primary.500"},_placeholderShown:{color:"neutral.400"},_disabled:{color:"disabled",cursor:"not-allowed","& :where(svg)":{color:"disabled"}},"& :where(svg)":{color:"subtle"}}},defaultVariants:{size:"md"},variants:{size:{sm:{content:{p:"0.5",gap:"1"},item:{textStyle:"sm",px:"2",height:"9"},itemIndicator:{"& :where(svg)":{width:"4",height:"4"}},itemGroupLabel:{px:"2",py:"1.5"},label:{textStyle:"sm"},trigger:{px:"2.5",h:"9",minW:"9",fontSize:"sm",gap:"2","& :where(svg)":{width:"4",height:"4"}}},md:{content:{p:"1",gap:"1"},item:{textStyle:"md",px:"2",height:"10"},itemIndicator:{"& :where(svg)":{width:"4",height:"4"}},itemGroupLabel:{px:"2",py:"1.5"},label:{textStyle:"sm"},trigger:{px:"3",h:"10",minW:"10",fontSize:"md",gap:"2","& :where(svg)":{width:"4",height:"4"}}},lg:{content:{p:"1.5",gap:"1"},item:{textStyle:"md",px:"2",height:"11"},itemIndicator:{"& :where(svg)":{width:"5",height:"5"}},itemGroupLabel:{px:"2",py:"1.5"},label:{textStyle:"sm"},trigger:{px:"3.5",h:"11",minW:"11",fontSize:"md",gap:"2","& :where(svg)":{width:"5",height:"5"}}}}}}),[st,ge]=Ie({name:"select",hookName:"useSelectContext",providerName:"SelectProvider",defaultValue:{classes:{},size:"md"}}),at=m.forwardRef(function(t,o){const{size:e,placeholder:i,className:l,children:a,...s}=t,g=rt({size:e}),I={classes:g,size:e};return d.jsx(st,{value:I,children:d.jsxs(nt,{ref:o,className:R(g.root,l),positioning:{sameWidth:!0},...s,children:[d.jsx(z,{className:g.control,children:d.jsxs(de,{className:g.trigger,children:[d.jsx(ce,{placeholder:i,className:g.valueText}),d.jsx(te,{className:g.indicator,children:d.jsx(De,{size:ue(e)})})]})}),d.jsx(xe,{children:d.jsx(ae,{className:g.positioner,children:d.jsx(Z,{className:g.content,children:a})})}),d.jsx(ee,{})]})})}),dt=m.forwardRef(function(t,o){const{label:e,className:i,children:l,...a}=t,{classes:s}=ge();return d.jsxs(le,{className:R(s.itemGroup,i),ref:o,...a,children:[d.jsx(ne,{className:s.itemGroupLabel,children:e}),l]})}),ct=m.forwardRef(function(t,o){const{className:e,children:i,...l}=t,{classes:a,size:s}=ge();return d.jsxs(ie,{className:R(a.item,e),ref:o,...l,children:[d.jsx(se,{className:R(a.itemText),children:i}),d.jsx(re,{className:R(a.itemIndicator),children:d.jsx(_e,{size:ue(s)})})]})}),ue=t=>t==="sm"?28:t==="md"?32:t==="lg"?36:32;at.__docgenInfo={description:"",methods:[],displayName:"Root"};dt.__docgenInfo={description:"",methods:[],displayName:"ItemGroup"};ct.__docgenInfo={description:"",methods:[],displayName:"Item"};export{dt as I,at as R,ct as a};
