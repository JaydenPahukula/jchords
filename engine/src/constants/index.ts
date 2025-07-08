export * from 'src/constants/symbols';

export const allowedTimeSignatures = [
  { upper: 1, lower: 2 },
  { upper: 2, lower: 2 },
  { upper: 3, lower: 2 },
  { upper: 4, lower: 2 },
  { upper: 1, lower: 4 },
  { upper: 2, lower: 4 },
  { upper: 3, lower: 4 },
  { upper: 4, lower: 4 },
  { upper: 5, lower: 4 },
  { upper: 6, lower: 4 },
  { upper: 7, lower: 4 },
  { upper: 9, lower: 4 },
  { upper: 10, lower: 4 },
  { upper: 3, lower: 8 },
  { upper: 4, lower: 8 },
  { upper: 5, lower: 8 },
  { upper: 6, lower: 8 },
  { upper: 7, lower: 8 },
  { upper: 9, lower: 8 },
  { upper: 12, lower: 8 },
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
