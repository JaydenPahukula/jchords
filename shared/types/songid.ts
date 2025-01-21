// prettier-ignore
const SONG_ID_CHARS = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','0','1','2','3','4','5','6','7','8','9'] as const;

type SongIdChar = (typeof SONG_ID_CHARS)[number];

function isSongIdChar(obj: unknown): obj is SongIdChar {
  return typeof obj === 'string' && obj.length == 1 && SONG_ID_CHARS.includes(obj as SongIdChar);
}

type SongId = string & {
  length: 20;
  [Symbol.iterator]: () => IterableIterator<SongIdChar>;
};

export default SongId;

export function isSongId(obj: unknown): obj is SongId {
  return typeof obj === 'string' && obj.length == 20 && Array.from(obj).every(isSongIdChar);
}
