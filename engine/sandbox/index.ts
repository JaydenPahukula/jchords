// @ts-ignore
import { render } from 'jchords-engine';

export function renderSong(input: string): String {
  console.debug('Rendering');

  try {
    return render(input, {
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
    return '<p style="color: red; font-style: italic;">Failed to render:<br />' + e + '</p>';
  }
}
