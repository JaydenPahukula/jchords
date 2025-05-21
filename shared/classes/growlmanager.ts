import { batch, computed, signal } from '@preact/signals';
import { GrowlStage } from 'shared/enums/growlstage';
import { Growl } from 'shared/types/growl';
import { GrowlRecord } from 'shared/types/growlrecord';

const growlTimeout = 10000;
const growlFadeDuration = 1000;

class GrowlManager {
  private nextId = signal(0);
  private growls = signal<{ [key: number]: GrowlRecord }>({});
  private order = signal<number[]>([]);
  private disabled = signal(false);

  constructor() {}

  public growlList = computed(() => this.order.value.map((id) => this.growls.value[id]));

  public dispatchGrowl(growl: Growl) {
    if (this.disabled.value) return;

    const id = this.nextId.value;

    const record: GrowlRecord = {
      ...growl,
      id: id,
      stage: GrowlStage.Shown,
      close: () =>
        batch(() => {
          const { [id]: _, ...newGrowls } = this.growls.value;
          this.growls.value = newGrowls;
          this.order.value = this.order.value.filter((v) => v !== id);
        }),
    };

    // add to growls
    batch(() => {
      this.nextId.value = this.nextId.value + 1;
      this.order.value = [...this.order.value, id];
      this.growls.value = { ...this.growls.value, [id]: record };
    });

    // set timeout to fade out
    setTimeout(() => {
      record.stage = GrowlStage.Fade;
      this.growls.value = { ...this.growls.value, [id]: record };
    }, growlTimeout);

    // set timeout to remove from DOM
    setTimeout(() => {
      record.close();
    }, growlTimeout + growlFadeDuration);
  }

  public disable() {
    this.disabled.value = true;
  }
}

export const growlManager = new GrowlManager();
