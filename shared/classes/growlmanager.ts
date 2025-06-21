import { batch, computed, signal } from '@preact/signals-react';
import { Growl } from 'shared/types/growl';
import { GrowlRecord } from 'shared/types/growlrecord';

class GrowlManager {
  private nextId = signal(0);
  private growls = signal<GrowlRecord[]>([]);

  constructor() {}

  public growlList = computed(() => this.growls.value);

  public dispatchGrowl(growl: Growl) {
    const id = this.nextId.value;

    const closeSelf = () => {
      this.growls.value = this.growls.value.filter((g) => g.id !== id);
    };

    const record: GrowlRecord = {
      ...growl,
      id: id,
      close: closeSelf,
      onOpenChange: (open: boolean) => !open && closeSelf(),
    };

    // add to growls
    batch(() => {
      this.nextId.value = this.nextId.value + 1;
      this.growls.value = [...this.growls.value, record];
    });
  }
}

export const growlManager = new GrowlManager();
