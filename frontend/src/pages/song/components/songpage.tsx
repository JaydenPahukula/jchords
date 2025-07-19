import { batch, useComputed, useSignal } from '@preact/signals-react';
import { Box, Grid, Spinner } from '@radix-ui/themes';
import { defaultRenderOptions, JCRenderOptions } from 'engine';
import { useEffect } from 'react';
import { parseSong } from 'shared/functions/parsesong';
import { ParsedSong } from 'shared/types/parsedsong';
import { Song } from 'shared/types/song';
import { DialogType } from 'src/enums/dialogtype';
import { apiGetSong } from 'src/functions/api/endpoints/getsong';
import { Chart } from 'src/pages/song/components/chart';
import { SongHeader } from 'src/pages/song/components/header/songheader';
import 'src/pages/song/components/songpage.css';

console.log('SongPage load');
export function SongPage() {
  console.log('SongPage render');
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
    <Grid overflow="hidden" id="song-page" rows="min-content 1fr" height="100dvh">
      <SongHeader
        song={parsedSongSignal.value}
        zoomSignal={zoomSignal}
        renderOptionsSignal={renderOptionsSignal}
      />
      {parsedSongSignal.value === undefined ? (
        <Spinner mx="auto" my="6" size="3" />
      ) : (
        <Box overflow="auto" p={{ initial: '2', sm: '4' }}>
          <Chart
            song={parsedSongSignal.value}
            renderOptions={defaultRenderOptions}
            zoom={zoomSignal.value}
          />
        </Box>
      )}
    </Grid>
  );
}
