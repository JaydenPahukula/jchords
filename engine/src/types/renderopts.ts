/**
 * Represents the configuration settings passed into the renderer
 */
export type RenderOptions = {
  accidentalsPreferrence: AccidentalsPreferrenceOptions; // todo
  alignBars: boolean; // todo
  alignChordsWithLyrics: boolean; // todo
  // auto repeat?
  chartType: ChartTypeOptions; // todo
  expandRepeatSecions: boolean; // todo
  renderNumerals: boolean; // todo
  simplifyChords: boolean; // todo
  showChordDurations: boolean; // todo
  showBarSeparators: boolean; // todo
  showSubBeatDelimiters: boolean; // todo
  showInlineTimeSignatures: boolean; // todo
  transpose: number; // todo
  // use short names?
  // wrapping options?
};

export type AccidentalsPreferrenceOptions = 'auto' | 'sharps' | 'flats';
export type ChartTypeOptions = 'all' | 'lyrics' | 'chords' | 'first-lyric-line';
