import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-C4VbHy4b.js";import{I as i}from"./IconButton-CccESD27.js";import"./Accordion-CeCGiDPE.js";import"./Alert-Kp8PdpBf.js";import"./Avatar--Mk6z6SA.js";import"./Badge-DENI8HDW.js";import"./Skeleton-B-ZNCcEh.js";import"./Carousel-rzhX5Y-M.js";import"./Checkbox-I1Y2Kb_L.js";import"./Collapsible-C41TP7-t.js";import"./ColorPicker-DmEXD1TW.js";import{w as y,x as I,y as V,z as R,A as z,V as f,E as N,G as H,N as M,J as O,K as G,L as W,M as L,O as F,Q as Y,S,U as _,W as E,X as A,Y as J,Z as K}from"./Drawer-DdET6hmK.js";import"./Field-EqIJJceK.js";import"./FileUpload-DgWxyljV.js";import{I as g}from"./Input-MbUOQtdS.js";import"./Link-C40OsrYY.js";import"./NumberInput-BhWaF1OI.js";import{C as c}from"./Pagination-BSZQCcmb.js";import"./Popover-BDZmcRkQ.js";import"./Progress-Dv0leb-f.js";import"./RadioGroup-JBTXVWbV.js";import"./RatingGroup-DXrnLJ0z.js";import"./SegmentGroup-BttOvZmV.js";import"./Select-XSBzWXG1.js";import"./Slider-BR3-FltM.js";import"./Spinner-CANb2VKy.js";import"./Switch-J2azZwoM.js";import"./Table-wi9CWtfK.js";import"./Tabs-DF27ZyPH.js";import"./Textarea-CNmOYPS6.js";import"./Toast-Ol8X2qvH.js";import"./Tooltip-CESLYyH2.js";import"./TreeView-B8pvy2td.js";import{c as Q}from"./createLucideIcon-zijr-BYg.js";import{P as x}from"./portal-DrO_qajF.js";import{C as d}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./Slot-Bw9mQsad.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CWkxw2Z4.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-BgFfooT8.js";import"./index-1fMUQAsE.js";import"./index-DE2wJq7j.js";import"./use-locale-context-D5jQfAP4.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-CVy9tkzU.js";import"./check-DUDaO23Y.js";import"./index-DBzJ7FiP.js";import"./use-field-context-OrFpox1S.js";import"./index-CTARPo-3.js";import"./use-presence-8bHCsiKP.js";import"./index-CMjQVyXy.js";import"./index-DANWLHS3.js";import"./ellipsis-Bl27Sm0D.js";import"./index-OP0vtUYM.js";import"./index-BR8t6gqn.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=Q("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),r={Root:y,Control:I,Trigger:V,ClearTrigger:R,Content:z,View:f,ViewControl:N,ViewTrigger:H,NextTrigger:M,PrevTrigger:O,RangeText:G,Table:W,TableHeader:L,TableHead:F,TableBody:Y,TableRow:S,TableCell:_,TableCellTrigger:E,Input:A,Positioner:J,Context:K},nr={title:"Components/DatePicker",component:r.Root,parameters:{layout:"centered",docs:{description:{component:"based on https://ark-ui.com/react/docs/components/date-picker"}}},tags:["autodocs"],argTypes:{},args:{}},k={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"single",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},P={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"multiple",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},T={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"range",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})};var C,m,u;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(B=(w=T.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const ir=["Default","Multiple","Range"];export{k as Default,P as Multiple,T as Range,ir as __namedExportsOrder,nr as default};
