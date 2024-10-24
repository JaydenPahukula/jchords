// returns a useEffect callback that adds event listeners to two html elements
// to make them match their relative scroll postitions
export default function matchScrollEffect(a: HTMLElement, b: HTMLElement) {
  const ratio = (a.scrollHeight - a.clientHeight) / (b.scrollHeight - b.clientHeight);
  function aHandler() {
    b.removeEventListener('scroll', bHandler);
    b.scrollTop = a.scrollTop / ratio;
    window.requestAnimationFrame(() => {
      b.addEventListener('scroll', bHandler);
    });
  }
  function bHandler() {
    a.removeEventListener('scroll', aHandler);
    a.scrollTop = b.scrollTop * ratio;
    window.requestAnimationFrame(() => {
      a.addEventListener('scroll', aHandler);
    });
  }
  a.addEventListener('scroll', aHandler);
  b.addEventListener('scroll', bHandler);
}
