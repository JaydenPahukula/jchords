import { Box, Heading, Text } from '@radix-ui/themes';
import { JCRenderOptions } from 'engine';
import { ParsedSong } from 'shared/types/parsedsong';
import 'src/pages/song/components/chart.css';

function calcFontSize(zoom: number): number {
  return Math.min(12 + zoom, 20);
}

interface ChartProps {
  song: ParsedSong;
  renderOptions: JCRenderOptions;
  zoom: number;
}

export function Chart(props: ChartProps) {
  const fontSize = calcFontSize(props.zoom);

  return (
    <Box
      flexShrink="0"
      minWidth={{ initial: '100%', sm: '700px' }}
      mx="auto"
      width="max-content"
      p={{ initial: '20px', sm: '40px' }}
      style={{
        borderRadius: 'var(--radius-6)',
        background: 'var(--gray-1)',
      }}
    >
      <Heading
        as="h1"
        mb="1"
        style={{ fontFamily: 'var(--chart-font)', fontSize: `${fontSize + 8}px` }}
      >
        {props.song.info.title}
      </Heading>
      <Text style={{ fontFamily: 'var(--chart-font)', fontSize: `${fontSize}px` }}>
        {props.song.info.artist}
      </Text>
      <div
        style={{ fontSize: `${fontSize}px`, lineHeight: `${1.25 * fontSize}px` }}
        dangerouslySetInnerHTML={{
          __html: props.song.rendered,
        }}
      />
    </Box>
  );
}
