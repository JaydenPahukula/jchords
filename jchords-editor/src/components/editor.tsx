import { ReadonlySignal, useComputed } from '@preact/signals-react';
// @ts-expect-error TODO add type definitions to chord-mark
import { parseSong, renderSong } from 'chord-mark';
import { ChangeEvent, useRef } from 'react';
import { useMatchScrollEffect } from 'shared/hooks/usematchscrolleffect';
import { Song } from 'shared/types/song';
import { updateCurrSong } from 'src/state/functions/song';

interface EditorProps {
  songSignal: ReadonlySignal<Song | undefined>;
}

export function Editor({ songSignal }: EditorProps) {
  const sourceRef = useRef<HTMLTextAreaElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  useMatchScrollEffect(sourceRef, previewRef);

  const disabled = useComputed(() => songSignal.value === undefined);

  const rendered = useComputed<string>(() => renderSong(parseSong(songSignal.value?.text)));

  function onInput(e: ChangeEvent<HTMLTextAreaElement>) {
    updateCurrSong({ text: e.target.value });
  }

  return (
    <div className="bg-bg-1 grid h-full w-full grid-cols-2 overflow-hidden">
      <div className="border-bg-4 flex flex-col overflow-hidden border-r-1">
        <h2 className="border-bg-4 border-b-1 text-center text-sm">ChordMark Source</h2>
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
          className="h-full w-full grow resize-none overflow-y-auto p-2 font-mono text-sm outline-none placeholder:italic"
        ></textarea>
      </div>
      <div className="flex flex-col overflow-hidden">
        <h2 className="border-bg-4 border-b-1 text-center text-sm">Preview</h2>
        <div
          ref={previewRef}
          className="h-full w-full grow overflow-y-auto p-2 font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: rendered.value }}
        ></div>
      </div>
    </div>
  );
}
