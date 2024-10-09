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
  autoRepeatChords: boolean;
  printBarSeparators: cmPrintBarSeperatorsOptions;
  simplifyChords: cmSimplifyChordsOptions;
}

export const cmDefaultRenderOptions: cmRenderOptions = {
  autoRepeatChords: true,
  printBarSeparators: cmPrintBarSeperatorsOptions.grids,
  simplifyChords: cmSimplifyChordsOptions.none,
};
