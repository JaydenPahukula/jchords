import { useComputed, useSignal } from '@preact/signals-react';
import { defaultRenderOptions, JCRenderOptions } from 'engine';
import { useEffect, useState } from 'react';
import { parseSong } from 'shared/functions/parsesong';
import { ParsedSong } from 'shared/types/parsedsong';
import { Song } from 'shared/types/song';
import LoadingSpinner from 'src/components/ui/loadingspinner/loadingspinner';
import { apiGetSong } from 'src/functions/api/endpoints/getsong';
import { Chart } from 'src/pages/song/components/chart';
import { SongPageHeader } from 'src/pages/song/components/header/songpageheader';
import 'src/pages/song/components/songpage.css';

export const DEFAULT_CHART_ZOOM = 4;

export function SongPage() {
  const songId = window.location.pathname.match(/^\/song\/([A-Za-z0-9]+)/)?.[1];
  if (songId === undefined) throw new Error('songId is undefined');

  /* Chart zoom goes from 0 to 8, with 4 being the default */
  const [zoom, setZoom] = useState<number>(DEFAULT_CHART_ZOOM);
  const renderOptionsSignal = useSignal<JCRenderOptions>(defaultRenderOptions);

  const songSignal = useSignal<Song | 'loading' | 'error'>('loading');
  const parsedSongSignal = useComputed<ParsedSong | undefined>(() => {
    const song = songSignal.value;
    if (song === 'loading' || song === 'error') return undefined;
    return parseSong(song, renderOptionsSignal.value);
  });

  useEffect(() => {
    document.title = 'JChords';
    songSignal.value = 'loading';
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
      <SongPageHeader
        song={parsedSongSignal.value}
        zoom={zoom}
        setZoom={setZoom}
        renderOptionsSignal={renderOptionsSignal}
      />
      <div className="h-full flex-col items-center overflow-auto p-0 sm:flex sm:p-4">
        {parsedSongSignal.value === undefined ? (
          <LoadingSpinner className="mx-auto my-4 size-8" />
        ) : (
          <Chart song={parsedSongSignal.value} renderOptions={defaultRenderOptions} zoom={zoom} />
        )}
      </div>
    </div>
  );
}
