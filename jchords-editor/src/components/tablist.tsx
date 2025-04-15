import { computed } from '@preact/signals';
import { useContext } from 'preact/hooks';
import PlusIcon from 'shared/components/icons/plusicon';
import XIcon from 'shared/components/icons/xicon';
import isDefined from 'shared/functions/isdefined';
import { closeTab, newTab, switchTab } from 'src/state/functions/tabs';
import StateContext from 'src/state/statecontext';

export default function TabList() {
  const state = useContext(StateContext);

  const songList = computed(() =>
    state.tabs.value.map((id) => state.songs.value[id] ?? undefined).filter(isDefined),
  );

  return (
    <div class="no-scrollbar flex h-8 w-full gap-2 self-end overflow-x-auto">
      {songList.value.map(({ song, modified }, index) => (
        <div
          key={song.info.id}
          onClick={() => switchTab(index)}
          class={
            'grid cursor-default grid-cols-[124px_28px] items-center ' +
            (index === state.tabIndex.value ? 'bg-bg-0' : 'bg-bg-2 hover:bg-bg-0')
          }
        >
          <p class="ml-2 overflow-hidden overflow-ellipsis whitespace-nowrap">
            {(modified ? '* ' : '') + song.info.title}
          </p>
          <button
            onClick={(e) => {
              closeTab(index);
              e.stopPropagation();
            }}
            class="hover:bg-bg-button active:bg-bg-button-hover m-[6px] ml-0.5 cursor-pointer rounded-sm p-[3.5px]"
          >
            <XIcon />
          </button>
        </div>
      ))}
      <button onClick={newTab} class="bg-bg-2 hover:bg-bg-0 w-8 cursor-pointer p-[9.5px]">
        <PlusIcon />
      </button>
    </div>
  );
}
