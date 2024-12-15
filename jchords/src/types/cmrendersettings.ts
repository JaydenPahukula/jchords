import Accidental from './accidental';

type cmAccidentalsType = Accidental | 'auto';

export default interface cmRenderSettings {
  accidentalsType: cmAccidentalsType;
  transposeValue: number;
}
