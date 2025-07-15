import { ReadonlySignal, useComputed } from '@preact/signals-react';
import { Box, Grid, Heading } from '@radix-ui/themes';
import { parseSong, RenderOptions, renderSong } from 'engine';
import { ChangeEvent, useRef } from 'react';
import { Song } from 'shared/types/song';
import { useMatchScrollEffect } from 'src/hooks/usematchscrolleffect';
import 'src/pages/editor/components/editor.css';
import { updateCurrSong } from 'src/pages/editor/state/functions/song';

interface EditorProps {
  songSignal: ReadonlySignal<Song | undefined>;
}

const defaultRenderOptions: RenderOptions = {
  alignChordsWithLyrics: true,
  showChordDurations: false,
};

export function Editor({ songSignal }: EditorProps) {
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  useMatchScrollEffect(sourceRef, previewRef);

  const disabled = useComputed(() => songSignal.value === undefined);

  const rendered = useComputed<string>(() =>
    renderSong(parseSong(songSignal.value?.text ?? ''), defaultRenderOptions),
  );

  function onInput(e: ChangeEvent<HTMLTextAreaElement>) {
    updateCurrSong({ text: e.target.value });
  }

  return (
    <Grid columns="2" className="editor" overflow="hidden">
      <Grid rows="auto 1fr" overflow="hidden" style={{ borderRight: 'var(--border)' }}>
        <Heading
          align="center"
          as="h2"
          size="2"
          mt="1"
          weight="regular"
          truncate
          style={{ borderBottom: 'var(--border)' }}
        >
          ChordMark Source
        </Heading>
        <Box p="2" overflow="auto" asChild>
          <textarea
            ref={sourceRef}
            autoComplete="off"
            wrap="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Start typing here..."
            disabled={disabled.value}
            value={songSignal.value?.text}
            onInput={onInput}
            style={{
              border: 'none',
              outline: 'none',
              background: 'transparent',
              resize: 'none',
              lineHeight: '20px',
            }}
          />
        </Box>
      </Grid>
      <Grid rows="auto 1fr" overflow="hidden">
        <Heading
          align="center"
          as="h2"
          size="2"
          mt="1"
          weight="regular"
          truncate
          style={{ borderBottom: 'var(--border)' }}
        >
          Preview
        </Heading>
        <Box p="2" overflow="auto" asChild>
          <div ref={previewRef} dangerouslySetInnerHTML={{ __html: rendered.value }} />
        </Box>
      </Grid>
    </Grid>
  );
}
