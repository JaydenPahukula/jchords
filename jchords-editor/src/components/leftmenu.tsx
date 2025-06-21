import { useComputed } from '@preact/signals-react';
import { ChangeEvent, useContext } from 'react';
import { LeftMenuPublishButton } from 'src/components/leftmenupublishbutton';
import { updateCurrSongInfo } from 'src/state/functions/song';
import { StateContext } from 'src/state/statecontext';

export function LeftMenu() {
  const state = useContext(StateContext);
  const disabled = useComputed(() => state.currSong.value === undefined);

  const song = state.currSong.value;

  const visibleId = song.info.id === 'welcome' ? '' : song.info.id;

  const onTitleInput = (e: ChangeEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ title: e.target.value });

  const onArtistInput = (e: ChangeEvent<HTMLInputElement>) =>
    updateCurrSongInfo({ artist: e.target.value });

  return (
    <div className="bg-bg-0 border-r-bg-4 flex h-full w-[25%] max-w-64 flex-col border-r-1 p-4 pt-2">
      <h2 className="my-1 w-full text-center text-lg">Song Info</h2>
      <label>ID:</label>
      <input className="vanilla-input mb-3 w-full" value={visibleId} readOnly disabled></input>
      <label>Title:</label>
      <input
        className="vanilla-input mb-3 w-full"
        value={song.info.title}
        onInput={onTitleInput}
        disabled={disabled.value}
      ></input>
      <label>Artist:</label>
      <input
        className="vanilla-input w-full"
        value={song.info.artist}
        onInput={onArtistInput}
        disabled={disabled.value}
      ></input>
      <div className="flex-grow"></div>
      <LeftMenuPublishButton />
    </div>
  );
}
