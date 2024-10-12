import cmRenderOptions, {
  cmPrintBarSeperatorsOptions,
  cmPrintChordsDurationOptions,
  cmSimplifyChordsOptions,
} from '../types/cmrenderoptions';
import Settings, { defaultSettings } from '../types/settings';
import SongChart from '../types/songchart';
import calcCmAccidentalsType from './cmaccidentalstype';
import calcTransposeValue from './transposevalue';

export default function calcCmRenderOptions({
  songChart,
  settings,
}: {
  songChart?: SongChart;
  settings?: Settings;
}): cmRenderOptions {
  const set: Settings = { ...defaultSettings, ...settings };

  return {
    accidentalsType: calcCmAccidentalsType(set),
    autoRepeatChords: true,
    printChordsDuration: cmPrintChordsDurationOptions.never,
    printBarSeparators: cmPrintBarSeperatorsOptions.grids,
    simplifyChords: cmSimplifyChordsOptions.none,
    transposeValue: calcTransposeValue(songChart?.key, settings?.key),
  };
}
