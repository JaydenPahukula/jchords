import cmRenderOptions from 'shared/types/cm/cmrenderoptions';
import state from '../state';

export default function updateRenderOptions(newOptions: Partial<cmRenderOptions>) {
  state.renderOptions.value = { ...state.renderOptions.value, ...newOptions };
}
