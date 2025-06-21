import { useComputed, useSignal } from '@preact/signals-react';
import { Button, Dialog } from '@radix-ui/themes';
import { ChangeEvent, useRef } from 'react';
import { DialogProps } from 'shared/types/dialog/dialogprops';
// @ts-expect-error TODO
import { convert2ChordMark } from 'chord-mark-converters/lib/chord-mark-converters.js';
import { GenericDialog } from 'shared/components/dialogs/genericdialog';
import { useMatchScrollEffect } from 'shared/hooks/usematchscrolleffect';

const enum InputFormat {
  Auto = 'auto',
  ChordPro = 'chordPro',
  ChordsOverLyrics = 'chordsOverLyrics',
}

export function ImportDialog(props: DialogProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLPreElement>(null);
  useMatchScrollEffect(textAreaRef, previewRef);

  const inputFormat = useSignal<InputFormat>(InputFormat.Auto);
  const inputText = useSignal<string>('');

  const previewText = useComputed(() =>
    convert2ChordMark(inputText.value, { inputFormat: inputFormat.value }),
  );

  function onInputFormatChange(e: ChangeEvent<HTMLSelectElement>) {
    const val = e.target.value;
    if (
      val === InputFormat.Auto ||
      val === InputFormat.ChordPro ||
      val === InputFormat.ChordsOverLyrics
    ) {
      inputFormat.value = val;
    }
  }

  return (
    <GenericDialog {...props} className="h-[80vh]! w-[1200px]!" closeButton>
      <Dialog.Title>Import Song</Dialog.Title>
      <div className="mb-4 inline-block">
        Input format:{' '}
        <select value={inputFormat.value} onChange={onInputFormatChange} className="ml-1">
          <option value={InputFormat.Auto}>Auto-detect</option>
          <option value={InputFormat.ChordPro}>ChordPro</option>
          <option value={InputFormat.ChordsOverLyrics}>Chords over lyrics</option>
        </select>
      </div>
      <div className="border-bg-4 bg-bg-1 mb-4 grid grow grid-cols-2 border-1">
        <div className="border-bg-4 border-r-1">
          <h2 className="border-bg-4 border-b-1 text-center">Input</h2>
          <textarea
            ref={textAreaRef}
            autoComplete="off"
            wrap="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder="Paste here..."
            value={inputText.value}
            onInput={(e) => (inputText.value = e.currentTarget.value)}
            className="w-full resize-none overflow-y-auto p-2 font-mono text-sm outline-none placeholder:italic"
          ></textarea>
        </div>
        <div>
          <h2 className="border-bg-4 border-b-1 text-center">Preview</h2>
          <pre ref={previewRef} className="w-full overflow-y-auto p-2 font-mono text-sm">
            {previewText}
          </pre>
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button>Import</Button>
      </div>
    </GenericDialog>
  );
}
