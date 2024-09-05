import{j as d}from"./jsx-runtime-qGIIFXMu.js";import{I as J}from"./index-9MS2e6do.js";import{r as c}from"./index-CDs2tPxN.js";import{c as Y}from"./create-react-context-Dw26gLIP.js";import{t as Q,c as P}from"./tv-Br1lVx4G.js";import{c as O,m as g,h as f,a as X,b as ee,d as u,N as te,s as U,v as re,e as ie,z as h,f as _,g as oe,r as se,A as ae,E as ne}from"./factory-BCO0_PXk.js";import{c as C}from"./create-split-props-u5h9OPvL.js";import{c as le}from"./index-B1LdDssV.js";import{u as de,a as ce}from"./use-locale-context-CTaGYWMe.js";import{u as x}from"./use-event-eGuf5zsd.js";import{u as z}from"./use-field-context-CzRTzM_q.js";const[pe,F]=O({name:"FileUploadContext",hookName:"useFileUploadContext",providerName:"<FileUploadProvider />"}),me=e=>e.children(F()),S=c.forwardRef((e,r)=>{const t=F(),i=g(t.getDropzoneProps(),e);return d.jsx(f.div,{...i,ref:r})});S.displayName="FileUploadDropzone";const A=c.forwardRef((e,r)=>{const t=F(),i=g(t.getHiddenInputProps(),e),o=z();return d.jsx(f.input,{"aria-describedby":o==null?void 0:o.ariaDescribedby,...i,ref:r})});A.displayName="FileUploadHiddenInput";const[ue,w]=O({name:"FileUploadItemPropsContext",hookName:"useFileUploadItemPropsContext",providerName:"<FileUploadItemPropsProvider />"}),k=c.forwardRef((e,r)=>{const[t,i]=C()(e,["file"]),o=F(),s=g(o.getItemProps(t),i);return d.jsx(ue,{value:t,children:d.jsx(f.li,{...s,ref:r})})});k.displayName="FileUploadItem";const $=c.forwardRef((e,r)=>{const t=F(),i=w(),o=g(t.getItemDeleteTriggerProps(i),e);return d.jsx(f.button,{...o,ref:r})});$.displayName="FileUploadItemDeleteTrigger";const G=c.forwardRef((e,r)=>{const t=F(),i=g(t.getItemGroupProps(),e);return d.jsx(f.ul,{...i,ref:r})});G.displayName="FileUploadItemGroup";const M=c.forwardRef((e,r)=>{const{children:t,...i}=e,o=F(),s=w(),n=g(o.getItemNameProps(s),i);return d.jsx(f.div,{...n,ref:r,children:t||s.file.name})});M.displayName="FileUploadItemName";const Z=c.forwardRef((e,r)=>{const t=F(),i=w(),o=g(t.getItemPreviewProps(i),e);return i.file.type.match(e.type??".*")?d.jsx(f.div,{...o,ref:r}):null});Z.displayName="FileUploadItemPreview";const H=c.forwardRef((e,r)=>{const[t,i]=c.useState(""),o=F(),s=w(),n=g(o.getItemPreviewImageProps({...s,url:t}),e);return c.useEffect(()=>{o.createFileUrl(s.file,p=>i(p))},[s,o]),d.jsx(f.img,{...n,ref:r})});H.displayName="FileUploadItemPreviewImage";const V=c.forwardRef((e,r)=>{const{children:t,...i}=e,o=F(),s=w(),n=g(o.getItemSizeTextProps(s),i);return d.jsx(f.div,{...n,ref:r,children:t||o.getFileSize(s.file)})});V.displayName="FileUploadItemSizeText";const W=c.forwardRef((e,r)=>{const t=F(),i=g(t.getLabelProps(),e);return d.jsx(f.label,{...i,ref:r})});W.displayName="FileUploadLabel";function ge(e){const r=new Map;return function(i,o){const s=i+(o?Object.entries(o).sort((p,a)=>p[0]<a[0]?-1:1).join():"");if(r.has(s))return r.get(s);let n=new e(i,o);return r.set(s,n),n}}var fe=ge(Intl.NumberFormat);function Fe(e,r,t={}){return fe(r,t).format(e)}var Ie=["","kilo","mega","giga","tera"],Pe=["","kilo","mega","giga","tera","peta"],he=(e,r="en-US",t={})=>{if(isNaN(e))return"";if(e===0)return"0 B";const{unit:i="byte",unitDisplay:o="short"}=t,s=i==="bit"?Ie:Pe,n=Math.max(0,Math.min(Math.floor(Math.log10(e)/3),s.length-1)),p=s[n]+i,a=o||"short",l=parseFloat((e/Math.pow(1e3,n)).toPrecision(3));return Fe(l,r,{style:"unit",unit:p,unitDisplay:a})};function Ee(e){return e==="audio/*"||e==="video/*"||e==="image/*"||e==="text/*"||/\w+\/[-+.\w]+/g.test(e)}function Ne(e){return/^.*\.[\w]+$/.test(e)}var T=e=>Ee(e)||Ne(e);function ye(e){if(e)return typeof e=="string"?e:Array.isArray(e)?e.filter(T).join(","):Object.entries(e).reduce((r,[t,i])=>[...r,t,...i],[]).filter(T).join(",")}var Re=(e,r)=>e.name===r.name&&e.size===r.size&&e.type===r.type,v=e=>e!=null;function ve(e,r,t){if(v(e.size))if(v(r)&&v(t)){if(e.size>t)return[!1,"FILE_TOO_LARGE"];if(e.size<r)return[!1,"FILE_TOO_SMALL"]}else{if(v(r)&&e.size<r)return[!1,"FILE_TOO_SMALL"];if(v(t)&&e.size>t)return[!1,"FILE_TOO_LARGE"]}return[!0,null]}function we(e,r){if(e&&r){const t=Array.isArray(r)?r:r.split(","),i=e.name||"",o=(e.type||"").toLowerCase(),s=o.replace(/\/.*$/,"");return t.some(n=>{const p=n.trim().toLowerCase();return p.charAt(0)==="."?i.toLowerCase().endsWith(p):p.endsWith("/*")?s===p.replace(/\/.*$/,""):o===p})}return!0}function xe(e,r){const t=e.type==="application/x-moz-file"||we(e,r);return[t,t?null:"FILE_INVALID_TYPE"]}var be=X("file-upload").parts("root","dropzone","item","itemDeleteTrigger","itemGroup","itemName","itemPreview","itemPreviewImage","itemSizeText","label","trigger"),I=be.build(),m=ee({getRootId:e=>{var r;return((r=e.ids)==null?void 0:r.root)??`file:${e.id}`},getDropzoneId:e=>{var r;return((r=e.ids)==null?void 0:r.dropzone)??`file:${e.id}:dropzone`},getHiddenInputId:e=>{var r;return((r=e.ids)==null?void 0:r.hiddenInput)??`file:${e.id}:input`},getTriggerId:e=>{var r;return((r=e.ids)==null?void 0:r.trigger)??`file:${e.id}:trigger`},getLabelId:e=>{var r;return((r=e.ids)==null?void 0:r.label)??`file:${e.id}:label`},getItemId:(e,r)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.item)==null?void 0:i.call(t,r))??`file:${e.id}:item:${r}`},getItemNameId:(e,r)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemName)==null?void 0:i.call(t,r))??`file:${e.id}:item-name:${r}`},getItemSizeTextId:(e,r)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemSizeText)==null?void 0:i.call(t,r))??`file:${e.id}:item-size:${r}`},getItemPreviewId:(e,r)=>{var t,i;return((i=(t=e.ids)==null?void 0:t.itemPreview)==null?void 0:i.call(t,r))??`file:${e.id}:item-preview:${r}`},getHiddenInputEl:e=>m.getById(e,m.getHiddenInputId(e)),getDropzoneEl:e=>m.getById(e,m.getDropzoneId(e))});function j(e){return e.dataTransfer?e.dataTransfer.types.some(r=>r==="Files"||r==="application/x-moz-file"):!!e.target&&"files"in e.target}function q(e,r){return!e.multiple&&r>1?!1:!e.multiple&&r+e.acceptedFiles.length===2?!0:!(r+e.acceptedFiles.length>e.maxFiles)}function De(e,r){const t=[],i=[];return r.forEach(o=>{var y;const[s,n]=xe(o,e.acceptAttr),[p,a]=ve(o,e.minFileSize,e.maxFileSize),l=(y=e.validate)==null?void 0:y.call(e,o),N=l?l.length===0:!0;if(s&&p&&N)t.push(o);else{const D=[n,a];N||D.push(...l??[]),i.push({file:o,errors:D.filter(Boolean)})}}),q(e,t.length)||(t.forEach(o=>{i.push({file:o,errors:["TOO_MANY_FILES"]})}),t.splice(0)),{acceptedFiles:t,rejectedFiles:i}}function Ue(e,r,t){const i=e.context.disabled,o=e.context.allowDrop,s=e.context.translations,n=e.matches("dragging"),p=e.matches("focused")&&!i;return{dragging:n,focused:p,openFilePicker(){r("OPEN")},deleteFile(a){r({type:"FILE.DELETE",file:a})},acceptedFiles:e.context.acceptedFiles,rejectedFiles:e.context.rejectedFiles,setFiles(a){const l=a.length;r({type:"FILES.SET",files:a,count:l})},clearRejectedFiles(){r({type:"REJECTED_FILES.CLEAR"})},clearFiles(){r({type:"FILES.CLEAR"})},getFileSize(a){return he(a.size,e.context.locale)},createFileUrl(a,l){const N=m.getWin(e.context),y=N.URL.createObjectURL(a);return l(y),()=>N.URL.revokeObjectURL(y)},getRootProps(){return t.element({...I.root.attrs,dir:e.context.dir,id:m.getRootId(e.context),"data-disabled":u(i),"data-dragging":u(n)})},getDropzoneProps(){return t.element({...I.dropzone.attrs,dir:e.context.dir,id:m.getDropzoneId(e.context),tabIndex:i?void 0:0,"aria-disabled":i,"aria-invalid":e.context.invalid,"data-invalid":u(e.context.invalid),"data-disabled":u(i),"data-dragging":u(n),onKeyDown(a){a.defaultPrevented||te(a)&&(a.key!=="Enter"&&a.key!==" "||r({type:"DROPZONE.CLICK",src:"keydown"}))},onClick(a){a.currentTarget.localName==="label"&&a.preventDefault(),r("DROPZONE.CLICK")},onDragOver(a){if(!o)return;a.preventDefault(),a.stopPropagation();try{a.dataTransfer.dropEffect="copy"}catch{}if(!j(a))return;const N=a.dataTransfer.items.length;r({type:"DROPZONE.DRAG_OVER",count:N})},onDragLeave(a){!o||i||U(a.currentTarget,a.relatedTarget)||r({type:"DROPZONE.DRAG_LEAVE"})},onDrop(a){o&&(a.preventDefault(),a.stopPropagation());const l=j(a);i||!l||r({type:"DROPZONE.DROP",files:Array.from(a.dataTransfer.files)})},onFocus(){r("DROPZONE.FOCUS")},onBlur(){r("DROPZONE.BLUR")}})},getTriggerProps(){return t.button({...I.trigger.attrs,dir:e.context.dir,id:m.getTriggerId(e.context),disabled:i,"data-disabled":u(i),type:"button",onClick(a){i||(U(m.getDropzoneEl(e.context),a.currentTarget)&&a.stopPropagation(),r("OPEN"))}})},getHiddenInputProps(){return t.input({id:m.getHiddenInputId(e.context),tabIndex:-1,disabled:i,type:"file",required:e.context.required,capture:e.context.capture,name:e.context.name,accept:e.context.acceptAttr,webkitdirectory:e.context.capture?"":void 0,multiple:e.context.multiple||e.context.maxFiles>1,onClick(a){a.stopPropagation(),a.currentTarget.value=""},onChange(a){if(i)return;const{files:l}=a.currentTarget;r({type:"FILES.SET",files:l?Array.from(l):[]})},style:re})},getItemGroupProps(){return t.element({...I.itemGroup.attrs,dir:e.context.dir,"data-disabled":u(i)})},getItemProps(a){const{file:l}=a;return t.element({...I.item.attrs,dir:e.context.dir,id:m.getItemId(e.context,l.name),"data-disabled":u(i)})},getItemNameProps(a){const{file:l}=a;return t.element({...I.itemName.attrs,dir:e.context.dir,id:m.getItemNameId(e.context,l.name),"data-disabled":u(i)})},getItemSizeTextProps(a){const{file:l}=a;return t.element({...I.itemSizeText.attrs,dir:e.context.dir,id:m.getItemSizeTextId(e.context,l.name),"data-disabled":u(i)})},getItemPreviewProps(a){const{file:l}=a;return t.element({...I.itemPreview.attrs,dir:e.context.dir,id:m.getItemPreviewId(e.context,l.name),"data-disabled":u(i)})},getItemPreviewImageProps(a){const{file:l,url:N}=a;if(!l.type.startsWith("image/"))throw new Error("Preview Image is only supported for image files");return t.img({...I.itemPreviewImage.attrs,alt:s.itemPreview(l),src:N,"data-disabled":u(i)})},getItemDeleteTriggerProps(a){const{file:l}=a;return t.button({...I.itemDeleteTrigger.attrs,dir:e.context.dir,type:"button",disabled:i,"data-disabled":u(i),"aria-label":s.deleteFile(l),onClick(){i||r({type:"FILE.DELETE",file:l})}})},getLabelProps(){return t.label({...I.label.attrs,dir:e.context.dir,id:m.getLabelId(e.context),htmlFor:m.getHiddenInputId(e.context),"data-disabled":u(i)})}}}var{not:L}=oe;function Te(e){const r=le(e);return ie({id:"fileupload",initial:"idle",context:{minFileSize:0,maxFileSize:1/0,maxFiles:1,allowDrop:!0,...r,acceptedFiles:h([]),rejectedFiles:h([]),invalid:!1,translations:{itemPreview:t=>`preview of ${t.name}`,deleteFile:t=>`delete file ${t.name}`,...r.translations}},computed:{acceptAttr:t=>ye(t.accept),multiple:t=>t.maxFiles>1},on:{"FILES.SET":{actions:["setFilesFromEvent"]},"FILE.DELETE":{actions:["removeFile"]},"FILES.CLEAR":{actions:["clearFiles"]},"REJECTED_FILES.CLEAR":{actions:["clearRejectedFiles"]}},states:{idle:{on:{OPEN:{actions:["openFilePicker"]},"DROPZONE.CLICK":{actions:["openFilePicker"]},"DROPZONE.FOCUS":"focused","DROPZONE.DRAG_OVER":[{guard:L("isWithinRange"),target:"dragging",actions:["setInvalid"]},{target:"dragging"}]}},focused:{on:{"DROPZONE.BLUR":"idle",OPEN:{actions:["openFilePicker"]},"DROPZONE.CLICK":{actions:["openFilePicker"]},"DROPZONE.DRAG_OVER":[{guard:L("isWithinRange"),target:"dragging",actions:["setInvalid"]},{target:"dragging"}]}},dragging:{on:{"DROPZONE.DROP":{target:"idle",actions:["clearInvalid","setFilesFromEvent","syncInputElement"]},"DROPZONE.DRAG_LEAVE":{target:"idle",actions:["clearInvalid"]}}}}},{guards:{isWithinRange:(t,i)=>q(t,i.count)},actions:{syncInputElement(t){const i=m.getHiddenInputEl(t);if(!i)return;const o=m.getWin(t),s=new o.DataTransfer;t.acceptedFiles.forEach(n=>{s.items.add(n)}),i.files=s.files},openFilePicker(t){se(()=>{var i;(i=m.getHiddenInputEl(t))==null||i.click()})},setInvalid(t){t.invalid=!0},clearInvalid(t){t.invalid=!1},setFilesFromEvent(t,i){const o=De(t,i.files),{acceptedFiles:s,rejectedFiles:n}=o;if(t.multiple){const p=h([...t.acceptedFiles,...s]);b.files(t,p,n);return}if(s.length){const p=h([s[0]]);b.files(t,p,n)}else n.length&&b.files(t,[],n)},removeFile(t,i){const o=t.acceptedFiles.filter(s=>s!==i.file);t.acceptedFiles=h(o),R.change(t)},clearRejectedFiles(t){t.rejectedFiles=h([]),R.change(t)},clearFiles(t){t.acceptedFiles=h([]),t.rejectedFiles=h([]),R.change(t)}},compareFns:{acceptedFiles:(t,i)=>t.length===i.length&&t.every((o,s)=>Re(o,i[s]))}})}var R={change:e=>{var r;(r=e.onFileChange)==null||r.call(e,{acceptedFiles:e.acceptedFiles,rejectedFiles:e.rejectedFiles})},accept:e=>{var r;(r=e.onFileAccept)==null||r.call(e,{files:e.acceptedFiles})},reject:e=>{var r;(r=e.onFileReject)==null||r.call(e,{files:e.rejectedFiles})}},b={files:(e,r,t)=>{e.acceptedFiles=h(r),R.accept(e),t&&(e.rejectedFiles=h(t),R.reject(e)),R.change(e)}};_()(["accept","allowDrop","capture","dir","directory","disabled","getRootNode","id","ids","locale","maxFiles","maxFileSize","minFileSize","name","onFileAccept","onFileReject","onFileChange","required","translations","validate"]);_()(["file"]);const je=(e={})=>{const{getRootNode:r}=de(),{dir:t}=ce(),i=z(),o={id:c.useId(),ids:{label:i==null?void 0:i.ids.label,hiddenInput:i==null?void 0:i.ids.control},dir:t,disabled:i==null?void 0:i.disabled,required:i==null?void 0:i.required,getRootNode:r,...e},s={...o,onFileAccept:x(e.onFileAccept),onFileReject:x(e.onFileReject),onFileChange:x(e.onFileChange,{sync:!0})},[n,p]=ae(Te(o),{context:s});return Ue(n,p,ne)},B=c.forwardRef((e,r)=>{const[t,i]=C()(e,["accept","allowDrop","capture","directory","disabled","id","ids","locale","maxFiles","maxFileSize","minFileSize","name","onFileAccept","onFileChange","onFileReject","required","translations","validate"]),o=je(t),s=g(o.getRootProps(),i);return d.jsx(pe,{value:o,children:d.jsx(f.div,{...s,ref:r})})});B.displayName="FileUploadRoot";const K=c.forwardRef((e,r)=>{const t=F(),i=g(t.getTriggerProps(),e);return d.jsx(f.button,{...i,ref:r})});K.displayName="FileUploadTrigger";const Le=Q({base:`${J.scope} fileUpload`,slots:{root:"trds-flex trds-flex-col trds-gap-4 trds-w-full",label:"trds-font-medium trds-text-sm",dropzone:"trds-flex trds-items-center trds-justify-center trds-flex-col trds-bg-white trds-rounded-md trds-border trds-border-boundary trds-min-h-xs trds-px-6 trds-py-4 trds-gap-3",trigger:"",item:'trds-grid trds-grid-cols-[auto_1fr_auto] [grid-template-areas:"preview_name_delete""preview_size_delete"] trds-bg-white trds-rounded-md trds-border trds-border-boundary trds-gap-x-3 trds-p-4 trds-animate-fade-in',itemGroup:"trds-flex trds-flex-col trds-gap-3",itemName:"trds-text-fg-title trds-font-medium trds-text-sm [grid-area:name]",itemSizeText:"trds-text-fg-description trds-text-sm [grid-area:size]",itemDeleteTrigger:"trds-self-start [grid-area:delete]",itemPreview:"[grid-area:preview]",itemPreviewImage:"trds-aspect-square trds-h-10 trds-w-10 trds-object-scale-down"}}),[Oe,E]=Y({name:"fileUpload",hookName:"useFileUploadContext",providerName:"FileUploadProvider",defaultValue:{classes:{}}}),_e=c.forwardRef(function(e,r){const{placeholder:t,className:i,children:o,...s}=e,n=Le(),p={classes:n};return d.jsx(Oe,{value:p,children:d.jsxs(B,{ref:r,className:P(n.root(),i),...s,children:[o,d.jsx(A,{})]})})}),Ce=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(S,{className:P(s.dropzone(),t),ref:r,...o,children:i})}),ze=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(W,{className:P(s.label(),t),ref:r,...o,children:i})}),Se=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(K,{className:P(s.trigger(),t),ref:r,...o,children:i})}),Ae=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(G,{className:P(s.itemGroup(),t),ref:r,...o,children:i})}),ke=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(k,{className:P(s.item(),t),ref:r,...o,children:i})}),$e=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(Z,{className:P(s.itemPreview(),t),ref:r,...o,children:i})}),Ge=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(H,{className:P(s.itemPreviewImage(),t),ref:r,...o,children:i})}),Me=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(M,{className:P(s.itemName(),t),ref:r,...o,children:i})}),Ze=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx(V,{className:P(s.itemSizeText(),t),ref:r,...o,children:i})}),He=c.forwardRef(function(e,r){const{className:t,children:i,...o}=e,{classes:s}=E();return d.jsx($,{className:P(s.itemDeleteTrigger(),t),ref:r,...o,children:i})}),rt=me;_e.__docgenInfo={description:"",methods:[],displayName:"Root"};Ce.__docgenInfo={description:"",methods:[],displayName:"Dropzone"};Se.__docgenInfo={description:"",methods:[],displayName:"Trigger"};ze.__docgenInfo={description:"",methods:[],displayName:"Label"};Ae.__docgenInfo={description:"",methods:[],displayName:"ItemGroup"};ke.__docgenInfo={description:"",methods:[],displayName:"Item"};$e.__docgenInfo={description:"",methods:[],displayName:"ItemPreview"};Ge.__docgenInfo={description:"",methods:[],displayName:"ItemPreviewImage"};Ze.__docgenInfo={description:"",methods:[],displayName:"ItemSizeText"};Me.__docgenInfo={description:"",methods:[],displayName:"ItemName"};He.__docgenInfo={description:"",methods:[],displayName:"ItemDeleteTrigger"};export{rt as C,Ce as D,Ae as I,ze as L,_e as R,Se as T,ke as a,$e as b,Ge as c,Ze as d,Me as e,He as f};
