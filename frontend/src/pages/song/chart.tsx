import { Box, Heading, Text } from '@radix-ui/themes';
import { parseSong, RenderOptions, renderSong } from 'engine';
import { Song } from 'shared/types/song';
import 'src/pages/song/chart.css';

interface ChartProps {
  song: Song;
  renderOptions: RenderOptions;
}

export function Chart({ song, renderOptions }: ChartProps) {
  return (
    <Box
      p="40px"
      minWidth="min(100%, 750px)"
      style={{
        borderRadius: 'var(--radius-6)',
        background: 'var(--gray-1)',
      }}
    >
      <Heading as="h1" mb="1" size="7" style={{ fontFamily: 'var(--chart-font)' }}>
        {song.info.title}
      </Heading>
      <Text size="4" style={{ fontFamily: 'var(--chart-font)' }}>
        {song.info.artist}
      </Text>
      <div dangerouslySetInnerHTML={{ __html: renderSong(parseSong(song.text), renderOptions) }} />
    </Box>
  );
}
