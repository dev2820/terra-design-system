import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{b as l,c as d,a as p}from"./cva-C095pwBQ.js";import{f as A}from"./spacer-CRhrBJcD.js";import"./Accordion-4bwd5jls.js";import"./Alert-D8VVORGz.js";import{A as B}from"./Avatar-CicC8rUY.js";import"./Badge-cQvqgMYI.js";import{B as g}from"./Button-BqV08Sjs.js";import{r as c}from"./index-CDs2tPxN.js";import{s as F}from"./sva-CxSEfBjn.js";import{c as I}from"./create-react-context-Dw26gLIP.js";import"./Link-NqX2B7Ij.js";import"./Input-BydU8ZSw.js";import"./Checkbox-DGxfi8Wg.js";import"./Collapsible-C1Rmrxj8.js";import"./Slider-Dcb0VX_2.js";import"./NumberInput-CM85oFlV.js";import"./use-locale-context-DELJ90JS.js";import"./index-B-yFm4aN.js";import"./index-DJ3ti8gJ.js";import"./chevron-down-Du6SRUSG.js";import"./createLucideIcon-zijr-BYg.js";import"./index-CR2wvQ5p.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-CWOgvmEi.js";import"./index-DOljKnny.js";import"./index-Bc7AdKyF.js";import"./index-4KpmSbEW.js";l({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:66,sm:{fontSize:40}},md:{fontSize:50,sm:{fontSize:32}},sm:{fontSize:40,sm:{fontSize:25}}}}});const T=l({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:50,sm:{fontSize:40}},md:{fontSize:40,sm:{fontSize:32}},sm:{fontSize:32,sm:{fontSize:25}}}}});l({base:{lineHeight:"normal",fontWeight:"bold"},variants:{size:{"2xl":{letterSpacing:1,fontSize:32,sm:{fontSize:25}},xl:{fontSize:25},lg:{fontSize:21},md:{fontSize:19},sm:{fontSize:17},xs:{fontSize:15}}},defaultVariants:{size:"md"}});l({base:{lineHeight:"normal",fontWeight:"bold",letterSpacing:1},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});const k=l({base:{lineHeight:"normal",fontWeight:"normal",letterSpacing:0},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15},xs:{fontSize:13}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});l({base:{lineHeight:"normal",fontWeight:"normal",letterSpacing:0},variants:{size:{lg:{fontSize:19},md:{fontSize:17},sm:{fontSize:15}},weight:{bold:{fontWeight:"bold"},normal:{fontWeight:"normal"}}},defaultVariants:{size:"md",weight:"normal"}});const E=F({className:"card",slots:["root","header","content","footer","title","description"],base:{root:{rounded:"lg",overflow:"hidden"},header:{p:6},content:{px:6,pb:6},footer:{px:6,pb:6},title:{color:"neutral.800"},description:{color:"neutral.500"}},variants:{variant:{elevated:{root:{shadow:"md"}},filled:{root:{bg:"neutral.200"}},outline:{root:{border:"1px solid",borderColor:"neutral.200"}}}},defaultVariants:{variant:"elevated"}}),[P,f]=I({name:"card",hookName:"useCardContext",providerName:"CardProvider",defaultValue:{classes:{}}}),b=c.forwardRef((t,r)=>{const{variant:n="elevated",className:o,children:a,...s}=t,u=E({variant:n}),V={classes:u};return e.jsx(P,{value:V,children:e.jsx("div",{ref:r,className:d(u.root,o),...s,children:a})})}),w=c.forwardRef(function(t,r){const{className:n,children:o,...a}=t,{classes:s}=f();return e.jsx("div",{ref:r,className:d(s.header,n),...a,children:o})}),D=c.forwardRef(function(t,r){const{className:n,children:o,...a}=t,{classes:s}=f();return e.jsx("div",{ref:r,className:d(s.content,n),...a,children:o})}),W=c.forwardRef(function(t,r){const{className:n,children:o,...a}=t,{classes:s}=f();return e.jsx("div",{ref:r,className:d(s.footer,n),...a,children:o})}),R=c.forwardRef(function(t,r){const{className:n,children:o,...a}=t,{classes:s}=f();return e.jsx("h3",{ref:r,className:d(s.title,T({size:"sm"}),n),...a,children:o})}),_=c.forwardRef(function(t,r){const{className:n,children:o,...a}=t,{classes:s}=f();return e.jsx("p",{ref:r,className:d(s.description,k({size:"md"}),n),...a,children:o})});b.__docgenInfo={description:"",methods:[],displayName:"Root"};w.__docgenInfo={description:"",methods:[],displayName:"Header"};D.__docgenInfo={description:"",methods:[],displayName:"Content"};W.__docgenInfo={description:"",methods:[],displayName:"Footer"};R.__docgenInfo={description:"",methods:[],displayName:"Title"};_.__docgenInfo={description:"",methods:[],displayName:"Description"};const i={Root:b,Header:w,Content:D,Footer:W,Title:R,Description:_},H=["elevated","outline","filled"],ue={title:"Components/Card",component:i.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{variant:{options:H,control:{type:"select"}}},args:{}},m={args:{},render:t=>e.jsxs(i.Root,{...t,children:[e.jsxs(i.Header,{children:[e.jsx(i.Title,{children:"Sign in"}),e.jsx(i.Description,{children:"Welcome! Begin your journey here."})]}),e.jsxs(i.Content,{className:p({display:"flex",flexDir:"column"}),children:[e.jsx("input",{type:"text",placeholder:"your email"}),e.jsx("input",{type:"password",placeholder:"your password"})]}),e.jsxs(i.Footer,{className:p({display:"flex",flexDir:"row",gap:4}),children:[e.jsx(g,{className:p({flex:1}),children:"Sign in"}),e.jsx(g,{theme:"primary",className:p({flex:1}),children:"🚀 Sign up"})]})]})},h={args:{},render:t=>e.jsx("div",{className:d(A({direction:"row",gap:4})),children:H.map(r=>e.jsxs(i.Root,{variant:r,...t,children:[e.jsx(i.Header,{children:e.jsx(B,{src:"https://i.pravatar.cc/500",size:"lg"})}),e.jsx(i.Content,{children:"An adventurer at heart and a visionary by nature, Alex has journeyed through the unknown, bringing light to the darkest corners of the world."}),e.jsx(i.Footer,{children:e.jsx("span",{className:p({fontSize:"md",fontWeight:"bold"}),children:"- Meet Alex Winters"})})]},r))})};var x,C,z,S,v;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <Card.Root {...props}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>Welcome! Begin your journey here.</Card.Description>
        </Card.Header>
        <Card.Content className={css({
        display: 'flex',
        flexDir: 'column'
      })}>
          <input type="text" placeholder="your email" />
          <input type="password" placeholder="your password" />
        </Card.Content>
        <Card.Footer className={css({
        display: 'flex',
        flexDir: 'row',
        gap: 4
      })}>
          <Button className={css({
          flex: 1
        })}>Sign in</Button>
          <Button theme="primary" className={css({
          flex: 1
        })}>
            🚀 Sign up
          </Button>
        </Card.Footer>
      </Card.Root>;
  }
}`,...(z=(C=m.parameters)==null?void 0:C.docs)==null?void 0:z.source},description:{story:"TODO: 추후 Input component로 교체 필요",...(v=(S=m.parameters)==null?void 0:S.docs)==null?void 0:v.description}}};var y,N,j;h.parameters={...h.parameters,docs:{...(y=h.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {},
  render: (props: CardProps) => {
    return <div className={cx(flex({
      direction: 'row',
      gap: 4
    }))}>
        {variants.map(variant => <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://i.pravatar.cc/500" size="lg" />
            </Card.Header>
            <Card.Content>
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className={css({
            fontSize: 'md',
            fontWeight: 'bold'
          })}>
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>)}
      </div>;
  }
}`,...(j=(N=h.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};const ge=["Default","Variant"];export{m as Default,h as Variant,ge as __namedExportsOrder,ue as default};