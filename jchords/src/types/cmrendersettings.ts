import { cmAccidental } from 'src/types/cmsong';

export default interface cmRenderSettings {
  accidentalsType: cmAccidental;
  transposeValue: number;
}
