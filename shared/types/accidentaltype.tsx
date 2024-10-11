enum AccidentalsType {
  Flat = 'flat',
  Sharp = 'sharp',
}

export default AccidentalsType;

export const stringToAccidentalsType = (str: string): AccidentalsType | undefined =>
  ({ flat: AccidentalsType.Flat, sharp: AccidentalsType.Sharp })[str];
