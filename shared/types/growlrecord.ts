import { GrowlStage } from 'shared/enums/growlstage';
import { Growl } from 'shared/types/growl';

// Stores extra information about the growl for the manager
export interface GrowlRecord extends Growl {
  id: number;
  stage: GrowlStage;
  close: () => void;
}
