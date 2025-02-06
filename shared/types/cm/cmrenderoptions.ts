import cmAccidental from './cmaccidental';

export type cmAccidentalsType = cmAccidental | 'auto';

type cmPrintBarSeperators = 'never' | 'grids' | 'always';

export default interface cmRenderOptions {
  accidentalsType: cmAccidentalsType;
  transposeValue: number;
  printBarSeparators: cmPrintBarSeperators;
}

export function makeDefaultRenderOptions(): cmRenderOptions {
  return {
    accidentalsType: 'auto',
    transposeValue: 0,
    printBarSeparators: 'grids',
  };
}
