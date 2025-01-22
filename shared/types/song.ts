export default interface Song {
  text: string;
}

export function isSong(obj: unknown): obj is Song {
  const objAs = obj as Song;
  return !!objAs && typeof objAs.text === 'string';
}
