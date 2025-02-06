import Accidental from 'src/shared/enums/accidental';
import Key from 'src/shared/enums/key';
import Mode from 'src/shared/enums/mode';
import stringToAccidental from 'src/shared/functions/stringtoaccidental';
import stringToKey from 'src/shared/functions/stringtokey';
import stringToMode from 'src/shared/functions/stringtomode';
import cmSong from 'src/shared/types/cm/cmsong';

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
