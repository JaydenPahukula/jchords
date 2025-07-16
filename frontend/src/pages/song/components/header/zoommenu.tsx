import { Signal } from '@preact/signals-react';
import { Box, Button, Flex, Heading, Slider } from '@radix-ui/themes';

interface ZoomMenuProps {
  zoomSignal: Signal<number>;
}

const tick = <div style={{ width: '1.5px', height: '6px', background: 'var(--gray-6)' }} />;

export function ZoomMenu(props: ZoomMenuProps) {
  return (
    <Box width="200px">
      <Flex justify="between" align="center" mb="3">
        <Heading as="h2" size="4">
          Text Size
        </Heading>
        <Button
          size="1"
          variant="soft"
          onClick={() => (props.zoomSignal.value = 4)}
          disabled={props.zoomSignal.value === 4}
        >
          Reset
        </Button>
      </Flex>
      <Slider
        min={0}
        max={8}
        value={[props.zoomSignal.value]}
        onValueChange={([val]) => {
          if (val !== undefined) props.zoomSignal.value = val;
        }}
      />
      <Flex justify="between" align="center" mt="2" px="6px">
        {[...Array(9)].map(() => tick)}
      </Flex>
    </Box>
  );
}
