import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-C4VbHy4b.js";import{I as i}from"./IconButton-CccESD27.js";import"./Accordion-Cu41JNtv.js";import"./Alert-Kp8PdpBf.js";import"./Avatar-BYrea7Br.js";import"./Badge-DENI8HDW.js";import"./Skeleton-B-ZNCcEh.js";import"./Carousel-bifbER4O.js";import"./Checkbox-ncrP5pSZ.js";import"./Collapsible-GojAbrbE.js";import"./ColorPicker-D-8G8e7Z.js";import{K as y,L as I,M as V,N as R,O as z,V as f,Q as N,S as H,U as M,W as O,X as W,Y as G,Z as L,_ as F,$ as Y,a0 as _,a1 as S,a2 as E,a3 as $,a4 as K,a5 as Q}from"./Popover-EMtf2V-Z.js";import"./Field-COID13fQ.js";import"./FileUpload-CqWMVpQO.js";import{I as g}from"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-BpsX2IC4.js";import"./Pagination-BjHX0jSX.js";import"./Progress-Bkf0qkAs.js";import"./RadioGroup-vgkx_5nk.js";import"./RatingGroup-C5Z5FJLM.js";import"./SegmentGroup-D_YyPJnp.js";import{P as x}from"./Select-QyoqJkMW.js";import"./Slider-Da_MwK4J.js";import"./Spinner-CANb2VKy.js";import"./Switch-Dz_S0PJ4.js";import"./Table-wi9CWtfK.js";import"./Tabs-BByE2UZL.js";import"./Textarea-CNmOYPS6.js";import"./Toast-CVsQtWqu.js";import"./Tooltip-1LFsM8Mc.js";import"./TreeView-BrRAOz1w.js";import{c as U}from"./createLucideIcon-zijr-BYg.js";import{C as c}from"./chevron-left-Bqxy6nNn.js";import{C as d}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./Slot-Bw9mQsad.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-Bfpif5Qa.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BZFUjd3y.js";import"./index-Bc8Or9Mt.js";import"./index-DE2wJq7j.js";import"./use-locale-context-hL6yk3cA.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-DW9aOTiN.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bc1L1tNp.js";import"./index-Bxx3IDnZ.js";import"./use-presence-C6AD7UWc.js";import"./index-CMjQVyXy.js";import"./index-Dhu86lpg.js";import"./index-BClyrBxD.js";import"./index-BR8t6gqn.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=U("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),r={Root:y,Control:I,Trigger:V,ClearTrigger:R,Content:z,View:f,ViewControl:N,ViewTrigger:H,NextTrigger:M,PrevTrigger:O,RangeText:W,Table:G,TableHeader:L,TableHead:F,TableBody:Y,TableRow:_,TableCell:S,TableCellTrigger:E,Input:$,Positioner:K,Context:Q},er={title:"Components/DatePicker",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/date-picker"}}},tags:["autodocs"],argTypes:{},args:{}},k={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"single",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},P={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"multiple",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},T={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"range",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})};var C,m,u;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['Root']) => {
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
        <Portal>
          <DatePicker.Positioner>
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
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
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
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>)}
                            </DatePicker.TableRow>)}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>;
  }
}`,...(u=(m=k.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var j,p,b;P.parameters={...P.parameters,docs:{...(j=P.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['Root']) => {
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
        <Portal>
          <DatePicker.Positioner>
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
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
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
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>)}
                            </DatePicker.TableRow>)}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>;
  }
}`,...(b=(p=P.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var v,w,B;T.parameters={...T.parameters,docs:{...(v=T.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {},
  render: (props: DatePickerProps['Root']) => {
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
        <Portal>
          <DatePicker.Positioner>
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
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
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
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>)}
                            </DatePicker.TableRow>)}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>;
  }
}`,...(B=(w=T.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const rr=["Default","Multiple","Range"];export{k as Default,P as Multiple,T as Range,rr as __namedExportsOrder,er as default};
