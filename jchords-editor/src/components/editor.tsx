import { ReadonlySignal, useComputed } from '@preact/signals';
// @ts-expect-error TODO add type definitions to chord-mark
import { parseSong, renderSong } from 'chord-mark';
import { JSX } from 'preact/jsx-runtime';
import Song from 'shared/types/song';
import { updateCurrSong } from 'src/state/functions/song';

interface EditorProps {
  songSignal: ReadonlySignal<Song | undefined>;
}

export default function Editor({ songSignal }: EditorProps) {
  const disabled = useComputed(() => songSignal.value === undefined);

  const rendered = useComputed<string>(() => renderSong(parseSong(songSignal.value?.text)));

  function onInput(e: JSX.TargetedInputEvent<HTMLTextAreaElement>) {
    updateCurrSong({ text: e.currentTarget.value });
  }

  return (
    <div class="bg-bg-1 grid h-full w-full grid-cols-2">
      <div class="border-bg-4 border-r-1">
        <h2 class="border-bg-4 border-b-1 text-center text-sm">ChordMark Source</h2>
        <textarea
          autoComplete="off"
          wrap="off"
          autoCorrect="off"
          autoCapitalize="off"
          disabled={disabled}
          value={songSignal.value?.text}
          onInput={onInput}
          class="h-full w-full resize-none p-2 font-mono text-sm outline-none"
        ></textarea>
      </div>
      <div>
        <h2 class="border-bg-4 border-b-1 text-center text-sm">Preview</h2>
        <div
          class="h-full w-full p-2 font-mono text-sm"
          dangerouslySetInnerHTML={{ __html: rendered.value }}
        ></div>
      </div>
    </div>
  );
}
