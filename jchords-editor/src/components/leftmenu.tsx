import { useComputed } from '@preact/signals';
import { useContext } from 'preact/hooks';
import { JSX } from 'preact/jsx-runtime';
import { LeftMenuPublishButton } from 'src/components/leftmenupublishbutton';
import { updateCurrSongInfo } from 'src/state/functions/song';
import { StateContext } from 'src/state/statecontext';

export function LeftMenu() {
  const state = useContext(StateContext);
  const disabled = useComputed(() => state.currSong.value === undefined);

  const song = state.currSong.value;

  const visibleId = song.info.id === 'welcome' ? '' : song.info.id;

  const onTitleInput = (e: JSX.TargetedInputEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ title: e.currentTarget.value });

  const onArtistInput = (e: JSX.TargetedInputEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ artist: e.currentTarget.value });

  return (
    <div class="bg-bg-0 border-r-bg-4 flex h-full w-[25%] max-w-64 flex-col border-r-1 p-4 pt-2">
      <h2 class="my-1 w-full text-center text-lg">Song Info</h2>
      <label>ID:</label>
      <input class="vanilla-input mb-3 w-full" value={visibleId} readonly disabled></input>
      <label>Title:</label>
      <input
        class="vanilla-input mb-3 w-full"
        value={song.info.title}
        onInput={onTitleInput}
        disabled={disabled}
      ></input>
      <label>Artist:</label>
      <input
        class="vanilla-input w-full"
        value={song.info.artist}
        onInput={onArtistInput}
        disabled={disabled}
      ></input>
      <div class="flex-grow"></div>
      <LeftMenuPublishButton />
    </div>
  );
}
