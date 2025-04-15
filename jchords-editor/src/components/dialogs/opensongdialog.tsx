import { useComputed, useSignal } from '@preact/signals';
import { useEffect } from 'preact/hooks';
import getSongList from 'shared/api/functions/getsonglist';
import GenericDialog from 'shared/components/dialogs/genericdialog';
import FormButton from 'shared/components/generic/formbutton';
import LoadingSpinner from 'shared/components/loadingspinner/loadingspinner';
import DialogProps from 'shared/types/dialogprops';
import SongInfo from 'shared/types/songinfo';

export default function OpenSongDialog(props: DialogProps) {
  const songList = useSignal<SongInfo[] | 'loading' | 'error'>('loading');
  const errorState = useSignal<undefined | 'loading' | 'error'>(undefined);
  const selectedIndex = useSignal<number | undefined>(undefined);

  const submitDisabled = useComputed(
    () => selectedIndex.value === undefined || errorState.value === 'loading',
  );

  useEffect(() => {
    getSongList().then((res) => {
      songList.value = res === undefined ? 'error' : res;
    });
  }, []);

  function submit() {
    errorState.value = 'loading';
    // do stuff
  }

  return (
    <GenericDialog dialogRef={props.dialogRef} closeButton>
      <h2 class="mb-4 text-3xl font-bold">Open Song</h2>
      <div class="border-fg-1 mb-4 h-80 border-1">
        {songList.value === 'loading' ? (
          <div class="flex h-full w-full items-center justify-center">
            <div class="h-10 w-10">
              <LoadingSpinner />
            </div>
          </div>
        ) : songList.value === 'error' ? (
          <>error</>
        ) : (
          <ol>
            {songList.value.map((info, i) => (
              <li
                onClick={() => (selectedIndex.value = i)}
                class={
                  'cursor-pointer overflow-x-hidden overflow-y-auto px-1 text-sm text-ellipsis whitespace-nowrap ' +
                  (selectedIndex.value === i ? 'bg-bg-button-active' : 'hover:bg-bg-button')
                }
              >
                {info.title}
              </li>
            ))}
          </ol>
        )}
      </div>
      <FormButton
        onClick={submit}
        disabled={submitDisabled}
        loading={errorState.value === 'loading'}
      >
        Open Song
      </FormButton>
    </GenericDialog>
  );
}
