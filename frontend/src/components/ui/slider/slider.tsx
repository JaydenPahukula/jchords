import { Slider as RadixSlider } from 'radix-ui';

type SliderProps = Omit<RadixSlider.SliderProps, 'children'>;

export function Slider(props: SliderProps) {
  return (
    <RadixSlider.Root {...props} className={'my-slider ' + (props.className ?? '')}>
      <RadixSlider.Track className="my-slider-track">
        <RadixSlider.Range className="my-slider-range" />
      </RadixSlider.Track>
      <RadixSlider.Thumb className="my-slider-thumb" />
    </RadixSlider.Root>
  );
}
