export enum cmAccidentalsTypeOptions {
  auto = 'auto',
  flat = 'flat',
  sharp = 'sharp',
}

export enum cmPrintChordsDurationOptions {
  never = 'never',
  uneven = 'uneven',
  always = 'always',
}

export enum cmPrintBarSeperatorsOptions {
  never = 'never',
  grids = 'grids',
  always = 'always',
}

export enum cmSimplifyChordsOptions {
  none = 'none',
  max = 'max',
  core = 'core',
}

export default interface cmRenderOptions {
  accidentalsType: cmAccidentalsTypeOptions;
  autoRepeatChords: boolean;
  printChordsDuration: cmPrintChordsDurationOptions;
  printBarSeparators: cmPrintBarSeperatorsOptions;
  simplifyChords: cmSimplifyChordsOptions;
  transposeValue: number;
}
