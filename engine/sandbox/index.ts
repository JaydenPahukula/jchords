// @ts-ignore
import { parseSong, renderSong } from 'jchords-engine';

export function render(input: string): string {
  console.debug('Rendering');

  try {
    const parsed = parseSong(input);

    return renderSong(parsed);
  } catch (e) {
    console.log(e);
    return '<p style="color: red; font-style: italic;">Failed to render:<br />' + e + '</p>';
  }
}
