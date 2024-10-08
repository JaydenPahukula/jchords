export enum cmAccidentalsTypeOptions {
  auto = 'auto',
  flat = 'flat',
  sharp = 'sharp',
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
  printBarSeparators: cmPrintBarSeperatorsOptions;
  simplifyChords: cmSimplifyChordsOptions;
  transposeValue: number;
}

export const cmDefaultRenderOptions: cmRenderOptions = {
  accidentalsType: cmAccidentalsTypeOptions.auto,
  autoRepeatChords: true,
  printBarSeparators: cmPrintBarSeperatorsOptions.grids,
  simplifyChords: cmSimplifyChordsOptions.none,
  transposeValue: 0,
};
