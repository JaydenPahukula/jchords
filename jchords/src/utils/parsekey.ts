// @ts-ignore
import { parseSong } from 'chord-mark/lib/chord-mark.js';
import cmSong from 'src/types/cmsong';
import Key from 'src/types/key';

export default function parseKey(src: string | cmSong): Key | undefined {
  const song: cmSong = typeof src === 'string' ? parseSong(src) : src;
  const explicitKeys = song.allKeys.explicit;
  if (explicitKeys.length > 0 && explicitKeys[0]) {
    return song.allKeys.explicit[0].string;
  }
  if (song.allKeys.auto !== undefined) {
    return song.allKeys.auto.string;
  }
  console.error('Could not find key for song');
  return undefined;
}
