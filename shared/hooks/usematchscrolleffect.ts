import { RefObject } from 'preact';
import { useEffect } from 'preact/hooks';

/*
 * Matches the scroll percent of two elements
 */
export function useMatchScrollEffect(aRef: RefObject<HTMLElement>, bRef: RefObject<HTMLElement>) {
  useEffect(() => {
    if (aRef.current === null || bRef.current === null) return;

    const ratio =
      (aRef.current.scrollHeight - aRef.current.clientHeight) /
      (bRef.current.scrollHeight - bRef.current.clientHeight);

    function aHandler(this: HTMLElement) {
      if (bRef.current === null) return;
      bRef.current.removeEventListener('scroll', bHandler);
      bRef.current.scrollTop = this.scrollTop / ratio;
      window.requestAnimationFrame(() => {
        bRef.current?.addEventListener('scroll', bHandler);
      });
    }

    function bHandler(this: HTMLElement) {
      if (aRef.current === null) return;
      aRef.current.removeEventListener('scroll', aHandler);
      aRef.current.scrollTop = this.scrollTop * ratio;
      window.requestAnimationFrame(() => {
        aRef.current?.addEventListener('scroll', aHandler);
      });
    }

    // add listeners
    aRef.current.addEventListener('scroll', aHandler);
    bRef.current.addEventListener('scroll', bHandler);

    // remove listeners on cleanup
    return () => {
      aRef.current?.removeEventListener('scroll', aHandler);
      bRef.current?.removeEventListener('scroll', bHandler);
    };
  });
}
