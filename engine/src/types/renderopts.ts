import { AccidentalPreference } from 'src/types/accidental';

/**
 * Represents the configuration settings passed into the renderer
 */
export type RenderOptions = {
  accidentalPreference: AccidentalPreference; // todo
  // alignBars: boolean; // todo
  alignChordsWithLyrics: boolean;
  // auto repeat?
  // chartType: ChartTypeOptions; // todo
  // expandRepeatSecions: boolean; // todo
  // renderNumerals: boolean; // todo
  // simplifyChords: boolean; // todo
  showChordTimings: boolean;
  // showBarSeparators: boolean; // todo
  // showSubBeatDelimiters: boolean; // todo
  // showInlineTimeSignatures: boolean; // todo
  transpose: number;
  // use short names?
  // wrapping options?
};

export const defaultRenderOptions: RenderOptions = Object.freeze({
  accidentalPreference: 'original',
  // alignBars: true,
  alignChordsWithLyrics: true,
  // chartType: 'all',
  // expandRepeatSecions: true,
  // renderNumerals: false,
  // simplifyChords: false,
  showChordTimings: true,
  // showBarSeparators: true,
  // showSubBeatDelimiters: true,
  // showInlineTimeSignatures: true,
  transpose: 0,
});

export type ChartTypeOptions = 'all' | 'lyrics' | 'chords' | 'first-lyric-line';
