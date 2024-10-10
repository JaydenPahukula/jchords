export function isOnMobile(): boolean {
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
  return width < 800; //px
}
