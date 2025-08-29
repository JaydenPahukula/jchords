import { batch, useComputed, useSignal } from '@preact/signals-react';
import { defaultRenderOptions, JCRenderOptions } from 'engine';
import { useEffect } from 'react';
import { parseSong } from 'shared/functions/parsesong';
import { ParsedSong } from 'shared/types/parsedsong';
import { Song } from 'shared/types/song';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';
import { DialogType } from 'src/enums/dialogtype';
import { apiGetSong } from 'src/functions/api/endpoints/getsong';
import { Chart } from 'src/pages/song/components/chart';
import { SongHeader } from 'src/pages/song/components/header/songheader';
import 'src/pages/song/components/songpage.css';

export function SongPage() {
  const songId = window.location.pathname.match(/^\/song\/([A-Za-z0-9]+)/)?.[1];
  if (songId === undefined) throw new Error('songId is undefined');

  const dialogSignal = useSignal<DialogType>(DialogType.None);
  const zoomSignal = useSignal<number>(4); // [0,8]
  const renderOptionsSignal = useSignal<JCRenderOptions>(defaultRenderOptions);

  const songSignal = useSignal<Song | 'loading' | 'error'>('loading');
  const parsedSongSignal = useComputed<ParsedSong | undefined>(() => {
    const song = songSignal.value;
    if (song === 'loading' || song === 'error') return undefined;
    return parseSong(song, renderOptionsSignal.value);
  });

  useEffect(() => {
    document.title = 'JChords';
    batch(() => {
      dialogSignal.value = DialogType.None;
      songSignal.value = 'loading';
    });
    apiGetSong(songId).then((result) => {
      if (result === undefined) {
        songSignal.value = 'error';
      } else {
        songSignal.value = result;
        document.title = result.info.title + ' - JChords';
      }
    });
  }, [songId]);

  return (
    <div
      id="song-page"
      className="bg-gray-6 grid h-dvh grid-rows-[min-content_1fr] overflow-hidden"
    >
      <SongHeader
        song={parsedSongSignal.value}
        zoomSignal={zoomSignal}
        renderOptionsSignal={renderOptionsSignal}
      />
      {parsedSongSignal.value === undefined ? (
        <LoadingSpinner className="mx-auto my-6 size-8" />
      ) : (
        <div className="overflow-auto p-2 sm:p-4">
          <Chart
            song={parsedSongSignal.value}
            renderOptions={defaultRenderOptions}
            zoom={zoomSignal.value}
          />
        </div>
      )}
    </div>
  );
}
