import { Signal } from '@preact/signals-react';
import { useId } from 'react';
import { Button } from 'src/components/ui/button/button';
import { Popover } from 'src/components/ui/popover/popover';
import { Slider } from 'src/components/ui/slider/slider';

interface ZoomPopoverContentProps {
  zoomSignal: Signal<number>;
}

export function ZoomPopoverContent(props: ZoomPopoverContentProps) {
  const titleId = 'zoom-menu-title-' + useId();

  return (
    <Popover.Content align="end" className="w-[200px]">
      <div className="mb-3 flex items-center justify-between">
        <h2 id={titleId} className="text-lg font-bold">
          Text Size
        </h2>
        <Button
          variant="secondary"
          className="px-2 py-1"
          onClick={() => (props.zoomSignal.value = 4)}
          disabled={props.zoomSignal.value === 4}
        >
          Reset
        </Button>
      </div>
      <Slider
        min={0}
        max={8}
        value={[props.zoomSignal.value]}
        onValueChange={([val]) => {
          if (val !== undefined) props.zoomSignal.value = val;
        }}
        aria-labelledby={titleId}
      />
      <div className="mt-2 flex items-center justify-between px-[6px]">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="bg-gray-6 h-[6px] w-[1.5px]" />
        ))}
      </div>
    </Popover.Content>
  );
}
