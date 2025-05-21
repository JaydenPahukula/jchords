import { Size } from 'shared/enums/size';

export function calcSize(): Size {
  const w = window.innerWidth;
  if (w < 640) return Size.none;
  if (w < 768) return Size.sm;
  if (w < 1024) return Size.md;
  if (w < 1280) return Size.lg;
  if (w < 1536) return Size.xl;
  return Size.xxl;
}
