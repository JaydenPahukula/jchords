import { computed, Signal, useSignalEffect } from '@preact/signals-react';
import { DialogType } from 'shared/enums/dialogtype';
import { DialogManifest } from 'shared/types/dialog/dialogmanifest';

interface DialogManagerProps {
  signal: Signal<DialogType>;
  manifest: DialogManifest;
}

export function DialogManager({ signal, manifest }: DialogManagerProps) {
  useSignalEffect(() => {
    if (signal.value !== DialogType.None) {
      (document.activeElement as HTMLElement)?.blur();
    }
  });

  return (
    <>
      {manifest.map((d) => (
        <d.component
          key={d.type}
          type={d.type}
          open={computed(() => signal.value === d.type)}
          close={() => (signal.value = DialogType.None)}
          changeDialog={(dialog: DialogType) => (signal.value = dialog)}
        />
      ))}
    </>
  );
}
