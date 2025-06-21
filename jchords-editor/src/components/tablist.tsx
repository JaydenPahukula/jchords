import { useSignalEffect } from '@preact/signals-react';
import * as Tabs from '@radix-ui/react-tabs';
import { Flex, Grid } from '@radix-ui/themes';
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

  useSignalEffect(() => {
    console.log(state.tabs.value.length);
  });

  return (
    <Flex ref={ref} className="self-end" height="32px">
      <Tabs.Root>
        <Tabs.List>
          {state.tabs.value.map(({ song, modified }, index) => (
            <Tabs.Trigger key={index} value={index.toString()} asChild>
              <Grid>
                <p className="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
                  {(modified ? '* ' : '') + song.info.title}
                </p>
                <button
                  onClick={(e) => {
                    closeTab(index);
                    e.stopPropagation();
                  }}
                  className="hover:bg-bg-button active:bg-bg-button-hover m-[6px] ml-0.5 cursor-pointer rounded-sm p-[3.5px]"
                >
                  <XIcon />
                </button>
              </Grid>
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <button
        onClick={() => newTab()}
        className="bg-bg-2 hover:bg-bg-0 mr-4 w-8 shrink-0 cursor-pointer p-[9.5px]"
      >
        <PlusIcon />
      </button>
    </Flex>
  );
}
