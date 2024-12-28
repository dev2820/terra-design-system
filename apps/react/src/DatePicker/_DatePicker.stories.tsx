import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Portal } from '../index';
import { Input } from '../Input';
import { DatePicker, type DatePickerProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/date-picker
 */
export default {
  title: 'Components/DatePicker',
  component: DatePicker.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: DatePickerProps['Root']) => {
    return (
      <DatePicker.Root
        positioning={{ sameWidth: true }}
        startOfWeek={1}
        selectionMode="single"
        {...props}
      >
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
                  {api => (
                    <>
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
                            {api.weekDays.map((weekDay, id) => (
                              <DatePicker.TableHeader key={id}>
                                {weekDay.narrow}
                              </DatePicker.TableHeader>
                            ))}
                          </DatePicker.TableRow>
                        </DatePicker.TableHead>
                        <DatePicker.TableBody>
                          {api.weeks.map((week, id) => (
                            <DatePicker.TableRow key={id}>
                              {week.map((day, id) => (
                                <DatePicker.TableCell key={id} value={day}>
                                  <DatePicker.TableCellTrigger asChild>
                                    <IconButton variant="ghost">
                                      {day.day}
                                    </IconButton>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api
                            .getMonthsGrid({ columns: 4, format: 'short' })
                            .map((months, id) => (
                              <DatePicker.TableRow key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell
                                    key={id}
                                    value={month.value}
                                  >
                                    <DatePicker.TableCellTrigger asChild>
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                            <DatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={year.value}
                                >
                                  <DatePicker.TableCellTrigger asChild>
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    );
  },
};

export const Multiple = {
  args: {},
  render: (props: DatePickerProps['Root']) => {
    return (
      <DatePicker.Root
        positioning={{ sameWidth: true }}
        startOfWeek={1}
        selectionMode="multiple"
        {...props}
      >
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
                  {api => (
                    <>
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
                            {api.weekDays.map((weekDay, id) => (
                              <DatePicker.TableHeader key={id}>
                                {weekDay.narrow}
                              </DatePicker.TableHeader>
                            ))}
                          </DatePicker.TableRow>
                        </DatePicker.TableHead>
                        <DatePicker.TableBody>
                          {api.weeks.map((week, id) => (
                            <DatePicker.TableRow key={id}>
                              {week.map((day, id) => (
                                <DatePicker.TableCell key={id} value={day}>
                                  <DatePicker.TableCellTrigger asChild>
                                    <IconButton variant="ghost">
                                      {day.day}
                                    </IconButton>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api
                            .getMonthsGrid({ columns: 4, format: 'short' })
                            .map((months, id) => (
                              <DatePicker.TableRow key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell
                                    key={id}
                                    value={month.value}
                                  >
                                    <DatePicker.TableCellTrigger asChild>
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                            <DatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={year.value}
                                >
                                  <DatePicker.TableCellTrigger asChild>
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    );
  },
};

export const Range = {
  args: {},
  render: (props: DatePickerProps['Root']) => {
    return (
      <DatePicker.Root
        positioning={{ sameWidth: true }}
        startOfWeek={1}
        selectionMode="range"
        {...props}
      >
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
                  {api => (
                    <>
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
                            {api.weekDays.map((weekDay, id) => (
                              <DatePicker.TableHeader key={id}>
                                {weekDay.narrow}
                              </DatePicker.TableHeader>
                            ))}
                          </DatePicker.TableRow>
                        </DatePicker.TableHead>
                        <DatePicker.TableBody>
                          {api.weeks.map((week, id) => (
                            <DatePicker.TableRow key={id}>
                              {week.map((day, id) => (
                                <DatePicker.TableCell key={id} value={day}>
                                  <DatePicker.TableCellTrigger asChild>
                                    <IconButton variant="ghost">
                                      {day.day}
                                    </IconButton>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="month">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api
                            .getMonthsGrid({ columns: 4, format: 'short' })
                            .map((months, id) => (
                              <DatePicker.TableRow key={id}>
                                {months.map((month, id) => (
                                  <DatePicker.TableCell
                                    key={id}
                                    value={month.value}
                                  >
                                    <DatePicker.TableCellTrigger asChild>
                                      <Button variant="ghost">
                                        {month.label}
                                      </Button>
                                    </DatePicker.TableCellTrigger>
                                  </DatePicker.TableCell>
                                ))}
                              </DatePicker.TableRow>
                            ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
              <DatePicker.View view="year">
                <DatePicker.Context>
                  {api => (
                    <>
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
                          {api.getYearsGrid({ columns: 4 }).map((years, id) => (
                            <DatePicker.TableRow key={id}>
                              {years.map((year, id) => (
                                <DatePicker.TableCell
                                  key={id}
                                  value={year.value}
                                >
                                  <DatePicker.TableCellTrigger asChild>
                                    <Button variant="ghost">
                                      {year.label}
                                    </Button>
                                  </DatePicker.TableCellTrigger>
                                </DatePicker.TableCell>
                              ))}
                            </DatePicker.TableRow>
                          ))}
                        </DatePicker.TableBody>
                      </DatePicker.Table>
                    </>
                  )}
                </DatePicker.Context>
              </DatePicker.View>
            </DatePicker.Content>
          </DatePicker.Positioner>
        </Portal>
      </DatePicker.Root>
    );
  },
};
