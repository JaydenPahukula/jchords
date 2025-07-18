import { useComputed, useSignal } from '@preact/signals-react';
import { Box, Button, Dialog, Flex, Grid, Heading, SegmentedControl, Text } from '@radix-ui/themes';
import { useRef } from 'react';
import { Song } from 'shared/types/song';
import { GenericDialog } from 'src/components/dialogs/genericdialog';
import { DialogType } from 'src/enums/dialogtype';
import { useMatchScrollEffect } from 'src/hooks/usematchscrolleffect';
import { newTab } from 'src/pages/editor/state/functions/tabs';
import { DialogProps } from 'src/types/dialog/dialogprops';

type InputFormat = 'auto' | 'chordPro' | 'chordsOverLyrics';

export function ImportDialog(props: DialogProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  useMatchScrollEffect(textAreaRef, previewRef);

  const inputFormat = useSignal<InputFormat>('auto');
  const inputText = useSignal<string>('');

  const previewText = useComputed<string>(
    () => inputText.value,
    // convert2ChordMark(inputText.value, { inputFormat: inputFormat.value }),
  );

  function onInputFormatChange(value: string) {
    if (value === 'auto' || value === 'chordPro' || value === 'chordsOverLyrics') {
      inputFormat.value = value;
    }
  }

  function submit() {
    const song: Song = {
      text: previewText.value,
      info: {
        id: '',
        title: 'Imported Song',
        artist: '',
        author: '',
      },
    };
    newTab(song, true, true);
    props.changeDialog(DialogType.None);
    inputText.value = '';
  }

  return (
    <GenericDialog {...props} closeButton width="1200px" height="80vh">
      <Flex direction="column" height="100%" width="100%">
        <Dialog.Title>Import Song</Dialog.Title>
        <Text>THIS FUNCTIONALITY DOES NOT WORK</Text>
        <Dialog.Description aria-describedby={undefined} />
        <Flex as="span" mb="3" align="center" gap="2">
          <Text>Input format:</Text>
          <SegmentedControl.Root
            size="2"
            value={inputFormat.value}
            onValueChange={onInputFormatChange}
            className="ml-1"
          >
            <SegmentedControl.Item value={'auto'}>Auto-detect</SegmentedControl.Item>
            <SegmentedControl.Item value={'chordPro'}>ChordPro</SegmentedControl.Item>
            <SegmentedControl.Item value={'chordsOverLyrics'}>
              Chords over lyrics
            </SegmentedControl.Item>
          </SegmentedControl.Root>
        </Flex>
        <Grid
          flexGrow="1"
          columns="2"
          className="editor"
          overflow="hidden"
          mb="3"
          style={{ border: 'var(--border' }}
        >
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
              Import
            </Heading>
            <Box p="2" overflow="auto" asChild>
              <textarea
                ref={textAreaRef}
                autoComplete="off"
                wrap="off"
                autoCorrect="off"
                autoCapitalize="off"
                placeholder="Paste here..."
                value={inputText.value}
                onInput={(e) => (inputText.value = e.currentTarget.value)}
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
              ChordMark Preview
            </Heading>
            <Box p="2" overflow="auto" asChild>
              <Text m="0" size="2" asChild>
                <pre ref={previewRef}>{previewText}</pre>
              </Text>
            </Box>
          </Grid>
        </Grid>
        <Flex width="100%" justify="end">
          <Button
            size="3"
            variant="surface"
            disabled={inputText.value.length === 0}
            onClick={submit}
          >
            Import
          </Button>
        </Flex>
      </Flex>
    </GenericDialog>
  );
}
