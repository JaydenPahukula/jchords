import { signal } from '@preact/signals';

const count = signal(0);

export default function getTmpId(): string {
  const id = `new${count.value}`;
  count.value++;
  return id;
}
