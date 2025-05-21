export interface FirestoreSongDoc {
  id: string;
  text: string;
}

export function isFirestoreSongDoc(obj: unknown): obj is FirestoreSongDoc {
  const objAs = obj as FirestoreSongDoc;
  return !!objAs && typeof objAs.id === 'string' && typeof objAs.text === 'string';
}
