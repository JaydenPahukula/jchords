// @ts-ignore
import { parseSong, renderSong } from 'jchords-engine';

export function render(input: string): String {
  console.debug('Rendering');

  try {
    const parsed = parseSong(input);

    return renderSong(parsed, {
      accidentalsPreferrence: 'auto',
      alignBars: false,
      alignChordsWithLyrics: false,
      chartType: 'all',
      expandRepeatSecions: false,
      renderNumerals: false,
      simplifyChords: false,
      showChordDurations: false,
      showBarSeparators: false,
      showSubBeatDelimiters: false,
      showInlineTimeSignatures: false,
      transpose: 0,
    });
  } catch (e) {
    console.log(e);
    return '<p style="color: red; font-style: italic;">Failed to render:<br />' + e + '</p>';
  }
}
