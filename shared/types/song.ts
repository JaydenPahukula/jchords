export default interface Song {
  id: string;
  text: string;
}

export function isSong(obj: unknown): obj is Song {
  const objAs = obj as Song;
  return !!objAs && typeof objAs.id === 'string' && typeof objAs.text === 'string';
}
