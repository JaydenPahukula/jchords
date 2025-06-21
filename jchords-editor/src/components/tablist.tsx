import { Box, Flex, Grid, IconButton, Text } from '@radix-ui/themes';
import { Tabs } from 'radix-ui';
import { useContext, useEffect, useRef } from 'react';
import { PlusIcon } from 'shared/components/icons/plusicon';
import { XIcon } from 'shared/components/icons/xicon';
import { closeTab, newTab } from 'src/state/functions/tabs';
import { StateContext } from 'src/state/statecontext';

export function TabList() {
  const state = useContext(StateContext);
  const ref = useRef<HTMLDivElement>(null);

  // for sideways scrolling
  useEffect(() => {
    const handler = (e: WheelEvent) => {
      if (ref.current !== null) ref.current.scrollLeft += e.deltaY / 2;
    };
    ref.current?.addEventListener('wheel', handler);
    return () => ref.current?.removeEventListener('wheel', handler);
  }, []);

  function onValueChange(val: string) {
    let index = parseInt(val);
    if (Number.isNaN(index)) index = 0;
    state.tabIndex.value = index;
  }

  return (
    <Tabs.Root value={state.tabIndex.toString()} onValueChange={onValueChange} asChild>
      <Tabs.List asChild>
        <Flex pl="4" ref={ref} overflowX="scroll" className="no-scrollbar self-end" height="32px">
          {state.tabs.value.map(({ song, modified }, index) => (
            <Tabs.Trigger key={index} value={index.toString()} asChild>
              <Grid
                className="tab"
                display="inline-grid"
                columns="128px 28px"
                height="32px"
                mr="2"
                align="center"
                style={{ cursor: 'pointer' }}
              >
                <Text size="2" truncate ml="2" style={{ cursor: 'pointer' }}>
                  {(modified ? '* ' : '') + song.info.title}
                </Text>
                <Box m="10px" p="3px" asChild>
                  <IconButton
                    variant="ghost"
                    onClick={(e) => {
                      closeTab(index);
                      e.stopPropagation();
                    }}
                  >
                    <XIcon color="var(--gray-12)" />
                  </IconButton>
                </Box>
              </Grid>
            </Tabs.Trigger>
          ))}
          <Box mr="6" p="9.5px" width="32px" asChild>
            <IconButton radius="none" onClick={() => newTab()} className="tab">
              <PlusIcon color="var(--gray-12)" />
            </IconButton>
          </Box>
        </Flex>
      </Tabs.List>
    </Tabs.Root>
  );
}
