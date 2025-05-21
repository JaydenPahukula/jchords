import { cmRenderOptions } from 'shared/types/cm/cmrenderoptions';
import { state } from 'src/state/state';

export function updateRenderOptions(newOptions: Partial<cmRenderOptions>) {
  state.renderOptions.value = { ...state.renderOptions.value, ...newOptions };
}
