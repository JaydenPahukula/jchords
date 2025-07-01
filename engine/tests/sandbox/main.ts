import { render } from '../../src/engine';

export function renderSong(input: string) {
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
    return 'ERROR';
  }
}
