import { effect, signal, useComputed } from '@preact/signals-react';
import { Size } from 'src/enums/size';

function getSize(): Size {
  const w = window.innerWidth;
  if (w >= 1640) return Size.xl;
  else if (w >= 1280) return Size.lg;
  else if (w >= 1024) return Size.md;
  else if (w >= 768) return Size.sm;
  else if (w >= 520) return Size.xs;
  return Size.initial;
}

const sizeSignal = signal<Size>(getSize());

window.addEventListener('resize', () => {
  sizeSignal.value = getSize();
});

export const useSizeSignal = () => useComputed(() => sizeSignal.value);

effect(() => console.log(sizeSignal.value));
