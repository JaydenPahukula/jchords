// @ts-ignore
import { RenderOptions, defaultRenderOptions, parseSong, renderSong } from 'jchords-engine';

export function render(input: string): string {
  console.debug('Rendering');

  try {
    const parsed = parseSong(input);
    const opts: RenderOptions = {
      ...defaultRenderOptions,
      alignChordsWithLyrics: true,
      showChordDurations: true,
    };
    return renderSong(parsed, opts);
  } catch (e) {
    console.log(e);
    return '<p style="color: red; font-style: italic;">Failed to render:<br />' + e + '</p>';
  }
}
