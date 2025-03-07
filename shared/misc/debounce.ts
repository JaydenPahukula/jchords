/**
 * Get the debounced version of a function
 */
export default function debounce<T extends any[]>(
  callback: (...args: T) => void,
  ms: number = 1000,
): (...args: T) => void {
  let timer: number | NodeJS.Timeout = 0;
  return (...args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), ms);
  };
}
