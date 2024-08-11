import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-BVDRYxdW.js";import{I as i}from"./IconButton-E43GEZXc.js";import{I as g}from"./Input-BydU8ZSw.js";import{R as B,C as y,T as I,a as V,b as R,V as z,c as f,d as N,N as H,P as M,e as O,f as G,g as W,h as L,i as F,j as Y,k as _,l as S,I as E,m as $}from"./DatePicker-BJSONUJ5.js";import{c as q}from"./createLucideIcon-zijr-BYg.js";import{C as c}from"./chevron-left-Bqxy6nNn.js";import{C as d}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./cva-C095pwBQ.js";import"./sva-CxSEfBjn.js";import"./create-react-context-Dw26gLIP.js";import"./factory-DwUv65Y6.js";import"./index-B-yFm4aN.js";import"./index-_nUwlzfN.js";import"./index-DJ3ti8gJ.js";import"./portal-CuRnqJTB.js";import"./use-locale-context-B5vdPRI5.js";import"./create-split-props-u5h9OPvL.js";import"./split-presence-props-DcTE3k_W.js";import"./use-presence-DaxTOS81.js";import"./use-event-eGuf5zsd.js";import"./index-DQwrfqfw.js";import"./index-DXnRe0oe.js";import"./index-1NDb6mNj.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=q("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),r={Root:B,Control:y,Trigger:I,ClearTrigger:V,Content:R,View:z,ViewControl:f,ViewTrigger:N,NextTrigger:H,PrevTrigger:M,RangeText:O,Table:G,TableHeader:W,TableHead:L,TableBody:F,TableRow:Y,TableCell:_,TableCellTrigger:S,Input:E,Context:$},Ce={title:"Components/DatePicker",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/date-picker"}}},tags:["autodocs"],argTypes:{},args:{}},k={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"single",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(P,{})})})]}),e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})]})},T={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"multiple",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(P,{})})})]}),e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})]})},x={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"range",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(P,{})})})]}),e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})]})};var D,C,u;k.parameters={...k.parameters,docs:{...(D=k.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['root']) => {
    return <DatePicker.Root positioning={{
      sameWidth: true
    }} startOfWeek={1} selectionMode="single" {...props}>
        <DatePicker.Control>
          <DatePicker.Input asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Trigger asChild>
            <IconButton variant="outline" aria-label="Open date picker">
              <CalendarIcon />
            </IconButton>
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {api.weekDays.map((weekDay, id) => <DatePicker.TableHeader key={id}>
                            {weekDay.narrow}
                          </DatePicker.TableHeader>)}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {api.weeks.map((week, id) => <DatePicker.TableRow key={id}>
                          {week.map((day, id) => <DatePicker.TableCell key={id} value={day}>
                              <DatePicker.TableCellTrigger asChild>
                                <IconButton variant="ghost">
                                  {day.day}
                                </IconButton>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getMonthsGrid({
                    columns: 4,
                    format: 'short'
                  }).map((months, id) => <DatePicker.TableRow key={id}>
                            {months.map((month, id) => <DatePicker.TableCell key={id} value={month.value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">{month.label}</Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>)}
                          </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getYearsGrid({
                    columns: 4
                  }).map((years, id) => <DatePicker.TableRow key={id}>
                          {years.map((year, id) => <DatePicker.TableCell key={id} value={year.value}>
                              <DatePicker.TableCellTrigger asChild>
                                <Button variant="ghost">{year.label}</Button>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Root>;
  }
}`,...(u=(C=k.parameters)==null?void 0:C.docs)==null?void 0:u.source}}};var j,m,b;T.parameters={...T.parameters,docs:{...(j=T.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['root']) => {
    return <DatePicker.Root positioning={{
      sameWidth: true
    }} startOfWeek={1} selectionMode="multiple" {...props}>
        <DatePicker.Control>
          <DatePicker.Input index={0} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Input index={1} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Trigger asChild>
            <IconButton variant="outline" aria-label="Open date picker">
              <CalendarIcon />
            </IconButton>
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {api.weekDays.map((weekDay, id) => <DatePicker.TableHeader key={id}>
                            {weekDay.narrow}
                          </DatePicker.TableHeader>)}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {api.weeks.map((week, id) => <DatePicker.TableRow key={id}>
                          {week.map((day, id) => <DatePicker.TableCell key={id} value={day}>
                              <DatePicker.TableCellTrigger asChild>
                                <IconButton variant="ghost">
                                  {day.day}
                                </IconButton>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getMonthsGrid({
                    columns: 4,
                    format: 'short'
                  }).map((months, id) => <DatePicker.TableRow key={id}>
                            {months.map((month, id) => <DatePicker.TableCell key={id} value={month.value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">{month.label}</Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>)}
                          </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getYearsGrid({
                    columns: 4
                  }).map((years, id) => <DatePicker.TableRow key={id}>
                          {years.map((year, id) => <DatePicker.TableCell key={id} value={year.value}>
                              <DatePicker.TableCellTrigger asChild>
                                <Button variant="ghost">{year.label}</Button>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Root>;
  }
}`,...(b=(m=T.parameters)==null?void 0:m.docs)==null?void 0:b.source}}};var v,p,w;x.parameters={...x.parameters,docs:{...(v=x.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['root']) => {
    return <DatePicker.Root positioning={{
      sameWidth: true
    }} startOfWeek={1} selectionMode="range" {...props}>
        <DatePicker.Control>
          <DatePicker.Input index={0} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Input index={1} asChild>
            <Input />
          </DatePicker.Input>
          <DatePicker.Trigger asChild>
            <IconButton variant="outline" aria-label="Open date picker">
              <CalendarIcon />
            </IconButton>
          </DatePicker.Trigger>
        </DatePicker.Control>
        <DatePicker.Content>
          <DatePicker.View view="day">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableHead>
                      <DatePicker.TableRow>
                        {api.weekDays.map((weekDay, id) => <DatePicker.TableHeader key={id}>
                            {weekDay.narrow}
                          </DatePicker.TableHeader>)}
                      </DatePicker.TableRow>
                    </DatePicker.TableHead>
                    <DatePicker.TableBody>
                      {api.weeks.map((week, id) => <DatePicker.TableRow key={id}>
                          {week.map((day, id) => <DatePicker.TableCell key={id} value={day}>
                              <DatePicker.TableCellTrigger asChild>
                                <IconButton variant="ghost">
                                  {day.day}
                                </IconButton>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="month">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getMonthsGrid({
                    columns: 4,
                    format: 'short'
                  }).map((months, id) => <DatePicker.TableRow key={id}>
                            {months.map((month, id) => <DatePicker.TableCell key={id} value={month.value}>
                                <DatePicker.TableCellTrigger asChild>
                                  <Button variant="ghost">{month.label}</Button>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>)}
                          </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
          <DatePicker.View view="year">
            <DatePicker.Context>
              {api => <>
                  <DatePicker.ViewControl>
                    <DatePicker.PrevTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronLeftIcon />
                      </IconButton>
                    </DatePicker.PrevTrigger>
                    <DatePicker.ViewTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <DatePicker.RangeText />
                      </Button>
                    </DatePicker.ViewTrigger>
                    <DatePicker.NextTrigger asChild>
                      <IconButton variant="ghost" size="sm">
                        <ChevronRightIcon />
                      </IconButton>
                    </DatePicker.NextTrigger>
                  </DatePicker.ViewControl>
                  <DatePicker.Table>
                    <DatePicker.TableBody>
                      {api.getYearsGrid({
                    columns: 4
                  }).map((years, id) => <DatePicker.TableRow key={id}>
                          {years.map((year, id) => <DatePicker.TableCell key={id} value={year.value}>
                              <DatePicker.TableCellTrigger asChild>
                                <Button variant="ghost">{year.label}</Button>
                              </DatePicker.TableCellTrigger>
                            </DatePicker.TableCell>)}
                        </DatePicker.TableRow>)}
                    </DatePicker.TableBody>
                  </DatePicker.Table>
                </>}
            </DatePicker.Context>
          </DatePicker.View>
        </DatePicker.Content>
      </DatePicker.Root>;
  }
}`,...(w=(p=x.parameters)==null?void 0:p.docs)==null?void 0:w.source}}};const ue=["Default","Multiple","Range"];export{k as Default,T as Multiple,x as Range,ue as __namedExportsOrder,Ce as default};
