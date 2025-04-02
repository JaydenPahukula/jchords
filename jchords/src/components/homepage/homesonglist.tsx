import { useContext } from 'preact/hooks';
import PlayIcon from 'shared/components/icons/playicon';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import LoadState from 'shared/enums/loadstate';
import UIStateContext from 'src/state/statecontext';

export default function HomeSongList() {
  const state = useContext(UIStateContext);

  switch (state.songListLoadState.value) {
    case LoadState.None:
      return <></>;
    case LoadState.Loading:
      return (
        <div class="w-10 pt-12">
          <LoadingSpinner />
        </div>
      );
    case LoadState.Error:
      return <p class="text-fg-error p-4 text-xl">Could not load songs</p>;
    case LoadState.Loaded:
      return (
        <div class="w-full max-w-3xl overflow-y-visible p-3">
          <h2 class="mx-2 mb-2 text-xl font-bold">All Songs</h2>
          {state.songList.value.map((info) => (
            <div class="bg-bg-0 mb-2 grid w-full grid-cols-[auto_min-content] grid-rows-[min-content_min-content] rounded-md p-2 pl-3 !shadow-sm sm:mb-3">
              <h3 class="truncate text-xl">{info.title || '*no title*'}</h3>
              <a
                href={`/song/${info.id}`}
                class="bg-bg-button hover:bg-bg-button-hover active:bg-bg-button-active row-span-2 flex cursor-pointer items-center gap-2 rounded-lg p-3 transition-all select-none"
              >
                <label class="hidden h-min cursor-pointer sm:block">Open</label>
                <div class="w-7">
                  <PlayIcon />
                </div>
              </a>
              <p class="text-fg-1 h-6 truncate">{info.artist}</p>
            </div>
          ))}
        </div>
      );
  }
}
