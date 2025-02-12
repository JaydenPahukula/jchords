import { useContext } from 'preact/hooks';
import LoadState from 'shared/enums/loadstate';
import PlayIcon from 'src/components/icons/playicon';
import LoadingSpinner from 'src/components/loadingspinner/loadingspinner';
import UIStateContext from 'src/state/uistatecontext';

export default function HomeSongList() {
  const state = useContext(UIStateContext);

  switch (state.songListLoadState.value) {
    case LoadState.None:
      return <></>;
    case LoadState.Loading:
      return (
        <div class="pt-12">
          <LoadingSpinner class="w-12" />
        </div>
      );
    case LoadState.Error:
      return <p class="text-fg-error p-4 text-xl">Could not load songs</p>;
    case LoadState.Loaded:
      return (
        <div class="w-full max-w-3xl overflow-hidden p-3">
          <h2 class="mx-2 mb-2 text-xl font-bold">All Songs</h2>
          {state.songList.value.map((info) => (
            <div class="bg-bg-0 mb-3 flex h-[76px] w-full items-center rounded-md px-5 py-3 !shadow-md">
              <div class="flex-grow">
                <h3 class="text-xl">{info.title}</h3>
                <p class="text-fg-1">{info.artist || ' '}</p>
              </div>
              <a
                href={`/song/${info.id}`}
                class="bg-bg-button hover:bg-bg-button-hover active:bg-bg-button-active flex cursor-pointer items-center gap-2 rounded-lg p-3 transition-all select-none"
              >
                <label class="cursor-pointer">Open</label>
                <PlayIcon class="h-6" />
              </a>
            </div>
          ))}
        </div>
      );
  }
}
