import cmAccidental from 'shared/types/cm/cmaccidental';

export type cmAccidentalsType = cmAccidental | 'auto';

type cmPrintBarSeperators = 'never' | 'grids' | 'always';

type cmSymbolType = 'chord' | 'roman';

export default interface cmRenderOptions {
  accidentalsType: cmAccidentalsType;
  transposeValue: number;
  printBarSeparators: cmPrintBarSeperators;
  symbolType: cmSymbolType;
}

export function makeDefaultRenderOptions(): cmRenderOptions {
  return {
    accidentalsType: 'auto',
    transposeValue: 0,
    printBarSeparators: 'grids',
    symbolType: 'chord',
  };
}
