import { JCRenderOptions, defaultRenderOptions, parseSong, renderSong } from 'engine';

export function render(input: string): string {
  console.debug('Rendering');

  try {
    const parsed = parseSong(input);
    const opts: JCRenderOptions = {
      ...defaultRenderOptions,
      alignChordsWithLyrics: true,
      showChordTimings: true,
    };
    return renderSong(parsed, opts);
  } catch (e) {
    console.log(e);
    return '<p style="color: red; font-style: italic;">Failed to render:<br />' + e + '</p>';
  }
}
