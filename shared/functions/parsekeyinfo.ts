import { Accidental } from 'shared/enums/accidental';
import { Key } from 'shared/enums/key';
import { Mode } from 'shared/enums/mode';
import { stringToAccidental } from 'shared/functions/converters/stringtoaccidental';
import { stringToKey } from 'shared/functions/converters/stringtokey';
import { stringToMode } from 'shared/functions/converters/stringtomode';
import { cmSong } from 'shared/types/cm/cmsong';

export function parseKeyInfo(song: cmSong | undefined): [Key, Accidental, Mode] | undefined {
  if (song === undefined) return undefined;

  const keyString = song?.allKeys.explicit.length
    ? song.allKeys.explicit[0].string
    : song?.allKeys.auto?.string;
  if (keyString === undefined) return undefined;

  try {
    return [stringToKey(keyString), stringToAccidental(keyString), stringToMode(keyString)];
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
