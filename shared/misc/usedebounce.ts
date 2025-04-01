import { useRef } from 'preact/hooks';

/**
 * Preact hook to get the debounced version of a function
 */
export default function useDebounce<T extends any[]>(
  callback: (...args: T) => void,
  ms: number = 1000,
): (...args: T) => void {
  const timer = useRef<number | NodeJS.Timeout>(0);
  return (...args: T) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => callback(...args), ms);
  };
}
