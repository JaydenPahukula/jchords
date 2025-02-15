import Accidental from '../enums/accidental';
import Key from '../enums/key';
import Mode from '../enums/mode';
import stringToAccidental from '../functions/stringtoaccidental';
import stringToKey from '../functions/stringtokey';
import stringToMode from '../functions/stringtomode';
import cmSong from '../types/cm/cmsong';

export default function parseKeyInfo(
  song: cmSong | undefined,
): [Key, Accidental, Mode] | undefined {
  if (song === undefined) return undefined;

  const keyString = song?.allKeys.explicit.length
    ? song.allKeys.explicit[0].string
    : song?.allKeys.auto?.string;
  if (keyString === undefined) return undefined;

  try {
    return [stringToKey(keyString), stringToAccidental(keyString), stringToMode(keyString)];
  } catch (error) {
    return undefined;
  }
}
