import { batch, useSignal } from '@preact/signals-react';
import { Box, Grid, Spinner } from '@radix-ui/themes';
import { RenderOptions } from 'engine';
import { useEffect } from 'react';
import { Song } from 'shared/types/song';
import { DialogType } from 'src/enums/dialogtype';
import { apiGetSong } from 'src/functions/api/endpoints/getsong';
import { Chart } from 'src/pages/song/components/chart';
import { SongHeader } from 'src/pages/song/components/header/songheader';
import 'src/pages/song/components/songpage.css';

const defaultRenderOptions: RenderOptions = {
  alignChordsWithLyrics: true,
  showChordDurations: true,
};

export function SongPage() {
  const songId = window.location.pathname.match(/^\/song\/([A-Za-z0-9]+)/)?.[1];
  if (songId === undefined) throw new Error('songId is undefined');

  const dialogSignal = useSignal<DialogType>(DialogType.None);
  const songSignal = useSignal<Song | 'loading' | 'error'>('loading');
  const zoomSignal = useSignal<number>(4); // [0,8]

  const song =
    songSignal.value === 'loading' || songSignal.value === 'error' ? undefined : songSignal.value;

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
      <SongHeader song={song} zoomSignal={zoomSignal} />
      {song === undefined ? (
        <Spinner mx="auto" my="6" size="3" />
      ) : (
        <Box overflow="auto" p={{ initial: '2', sm: '4' }}>
          <Chart song={song} renderOptions={defaultRenderOptions} zoom={zoomSignal.value} />
        </Box>
      )}
    </Grid>
  );
}
