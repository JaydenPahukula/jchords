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
  printBarSeparators: cmPrintBarSeperatorsOptions;
  simplifyChords: cmSimplifyChordsOptions;
}
