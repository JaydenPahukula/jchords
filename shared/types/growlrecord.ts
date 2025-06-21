import { Growl } from 'shared/types/growl';

// Stores extra information about the growl for the manager
export interface GrowlRecord extends Growl {
  id: number;
  close: () => void;
  onOpenChange: (open: boolean) => void;
}
