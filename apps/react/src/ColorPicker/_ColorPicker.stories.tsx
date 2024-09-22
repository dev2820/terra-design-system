import { ColorPicker, type ColorPickerProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/color-picker
 *
 * TODO: https://www.google.com/search?sca_esv=d92477f2496a46bf&sca_upv=1&q=color+picker+component+dribbble&udm=2&fbs=AEQNm0Aa4sjWe7Rqy32pFwRj0UkWd8nbOJfsBGGB5IQQO6L3J_86uWOeqwdnV0yaSF-x2joZDvir2QxhZkTA8rK1etu4ohtqlTKXOQ56HmFa2r_eprBYzNmbcCED92hCbqO_IkEUX7lq-0c__a0IrXht1Bx6_h-GfwmaB2JrNU1g8ES3V7R-WghDNJ07Lf9hH_5jRbgD_olp&sa=X&ved=2ahUKEwjLqsn77IWHAxUPrlYBHQeTBOAQtKgLegQIEBAB&biw=1728&bih=958&dpr=2#vhid=appWg_GALx3jhM&vssid=mosaic
 */
export default {
  title: 'Components/ColorPicker',
  component: ColorPicker.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    defaultValue: '#eb5e41',
  },
  render: (props: ColorPickerProps['root']) => {
    return (
      <div className="flex w-[600px] h-[500px]">
        <ColorPicker.Root {...props} />
      </div>
    );
  },
};
