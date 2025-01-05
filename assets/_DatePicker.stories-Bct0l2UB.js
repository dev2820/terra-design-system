import{j as e}from"./jsx-runtime-qGIIFXMu.js";import{B as o}from"./Button-DfrSr2aa.js";import{I as i}from"./IconButton-wVH5gEV8.js";import"./Accordion-CgDylwMY.js";import"./Alert-BjONzAXd.js";import"./Avatar-GFQF4lNU.js";import"./Badge-CKKbj5J7.js";import"./Skeleton-D4i3kzB2.js";import"./Carousel-BR79huiN.js";import"./Checkbox-6gX1pFVL.js";import"./Collapsible-BD9Dt3yd.js";import"./ColorPicker-CuJQsjo-.js";import{a6 as y,a7 as I,a8 as V,a9 as R,aa as z,ab as f,ac as N,ad as H,ae as M,af as O,ag as G,ah as W,ai as L,aj as F,ak as Y,al as _,am as S,an as E,ao as q,ap as $,aq as A}from"./Tooltip-1ShL7uRw.js";import"./Field-B5chCOPf.js";import"./FileUpload-CeSLKIMb.js";import{I as g}from"./Input-wO2GjwpU.js";import"./Link-0DJNSbsh.js";import"./NumberInput-D4Y4kRhI.js";import"./Pagination-BqHop7lE.js";import"./Progress-SZ0gL0O0.js";import"./RadioGroup-DS8x9BCb.js";import"./RatingGroup-C7BoSAwl.js";import"./SegmentGroup-D6E4ET2q.js";import"./Slider-o5g3lXRu.js";import"./Spinner-CAvmFNxP.js";import"./Switch-C88-J65r.js";import"./Table-BsAXi9Vt.js";import"./Tabs-D6SjyJxN.js";import"./Textarea-Ddz-yoNu.js";import"./Toast-COmBREa1.js";import"./TreeView-CJVjMwZV.js";import{c as J}from"./createLucideIcon-zijr-BYg.js";import{P as x}from"./portal-D-Vx2HB0.js";import{C as c}from"./chevron-left-Bqxy6nNn.js";import{C as d}from"./chevron-right-CT14g65n.js";import"./index-CDs2tPxN.js";import"./tv-CIwtzMts.js";import"./create-react-context-Dw26gLIP.js";import"./chevron-down-Du6SRUSG.js";import"./factory-CadeRpXq.js";import"./index-B-yFm4aN.js";import"./create-split-props-u5h9OPvL.js";import"./render-strategy-CzRczIFU.js";import"./index-D_n9ZWii.js";import"./index-BzeP-DbB.js";import"./use-locale-context-BgVInbo7.js";import"./use-event-eGuf5zsd.js";import"./collapsible-content-C-nzz1r7.js";import"./index-DBzJ7FiP.js";import"./use-field-context-Bl-xBte_.js";import"./use-presence-dzHLm_sJ.js";import"./index-CMjQVyXy.js";import"./index-B4yh-cB0.js";import"./index-BaA1UbEz.js";import"./index-BR8t6gqn.js";/**
 * @license lucide-react v0.378.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=J("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]),r={Root:y,Control:I,Trigger:V,ClearTrigger:R,Content:z,View:f,ViewControl:N,ViewTrigger:H,NextTrigger:M,PrevTrigger:O,RangeText:G,Table:W,TableHeader:L,TableHead:F,TableBody:Y,TableRow:_,TableCell:S,TableCellTrigger:E,Input:q,Positioner:$,Context:A},Qe={title:"Components/DatePicker",component:r.Root,parameters:{layout:"centered"},tags:["autodocs"],argTypes:{},args:{}},k={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"single",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},P={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"multiple",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})},T={args:{},render:h=>e.jsxs(r.Root,{positioning:{sameWidth:!0},startOfWeek:1,selectionMode:"range",...h,children:[e.jsxs(r.Control,{children:[e.jsx(r.Input,{index:0,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Input,{index:1,asChild:!0,children:e.jsx(g,{})}),e.jsx(r.Trigger,{asChild:!0,children:e.jsx(i,{variant:"outline","aria-label":"Open date picker",children:e.jsx(D,{})})})]}),e.jsx(x,{children:e.jsx(r.Positioner,{children:e.jsxs(r.Content,{children:[e.jsx(r.View,{view:"day",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsxs(r.Table,{children:[e.jsx(r.TableHead,{children:e.jsx(r.TableRow,{children:l.weekDays.map((t,a)=>e.jsx(r.TableHeader,{children:t.narrow},a))})}),e.jsx(r.TableBody,{children:l.weeks.map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",children:n.day})})},s))},a))})]})]})})}),e.jsx(r.View,{view:"month",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getMonthsGrid({columns:4,format:"short"}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})}),e.jsx(r.View,{view:"year",children:e.jsx(r.Context,{children:l=>e.jsxs(e.Fragment,{children:[e.jsxs(r.ViewControl,{children:[e.jsx(r.PrevTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(c,{})})}),e.jsx(r.ViewTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",size:"sm",children:e.jsx(r.RangeText,{})})}),e.jsx(r.NextTrigger,{asChild:!0,children:e.jsx(i,{variant:"ghost",size:"sm",children:e.jsx(d,{})})})]}),e.jsx(r.Table,{children:e.jsx(r.TableBody,{children:l.getYearsGrid({columns:4}).map((t,a)=>e.jsx(r.TableRow,{children:t.map((n,s)=>e.jsx(r.TableCell,{value:n.value,children:e.jsx(r.TableCellTrigger,{asChild:!0,children:e.jsx(o,{variant:"ghost",children:n.label})})},s))},a))})})]})})})]})})})]})};var C,m,u;k.parameters={...k.parameters,docs:{...(C=k.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(B=(w=T.parameters)==null?void 0:w.docs)==null?void 0:B.source}}};const Ue=["Default","Multiple","Range"];export{k as Default,P as Multiple,T as Range,Ue as __namedExportsOrder,Qe as default};
