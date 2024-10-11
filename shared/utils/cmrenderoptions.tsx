import cmRenderOptions, {
  cmAccidentalsTypeOptions,
  cmPrintBarSeperatorsOptions,
  cmSimplifyChordsOptions,
} from '../cm/renderoptions';
import Settings from '../types/settings';
import SongChart from '../types/songchart';
import calculateTransposeValue from './transposevalue';

interface calculateCmRenderOptionsArgs {
  songChart?: SongChart;
  settings?: Settings;
}

const calculateCmRenderOptions = ({
  songChart,
  settings,
}: calculateCmRenderOptionsArgs): cmRenderOptions => ({
  accidentalsType: cmAccidentalsTypeOptions.auto,
  autoRepeatChords: true,
  printBarSeparators: cmPrintBarSeperatorsOptions.grids,
  simplifyChords: cmSimplifyChordsOptions.none,
  transposeValue: calculateTransposeValue(songChart?.key, settings?.key),
});

export default calculateCmRenderOptions;
