export const sectionLabelSymbol = '#';
export const repeatChordSymbol = '%';
export const barSeparator = '|';
export const chordDurationSymbol = '.';
export const subBeatChordGroupStartSymbol = '[';
export const subBeatChordGroupEndSymbol = ']';
export const keyDeclarationKeyword = 'key';
export const chordPositionMarker = '_';

export const allowedTimeSignatures = [
  '1/2',
  '2/2',
  '3/2',
  '4/2',
  '1/4',
  '2/4',
  '3/4',
  '4/4',
  '5/4',
  '6/4',
  '7/4',
  '9/4',
  '10/4',
  '3/8',
  '4/8',
  '5/8',
  '6/8',
  '7/8',
  '9/8',
  '12/8',
];

export const sectionLabelShorthands: Record<string, string> = {
  a: 'Adlib',
  b: 'Bridge',
  c: 'Chorus',
  i: 'Intro',
  o: 'Outro',
  p: 'Pre-chorus',
  s: 'Solo',
  u: 'Interlude',
  v: 'Verse',
};

export const songClassName = 'jc-song';
export const sectionClassName = 'jc-section';
export const chordClassName = 'jc-chord';
export const chordLineClassName = 'jc-chord-line';
export const emptyLineClassName = 'jc-empty-line';
export const keyDeclarationLineClassName = 'jc-key-line';
export const lyricLineClassName = 'jc-lyric-line';
export const sectionLabelLineClassName = 'jc-section-label';
export const timeSignatureLineClassName = 'jc-time-signature';
export const errorClassName = 'jc-error';
