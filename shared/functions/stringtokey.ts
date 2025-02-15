import Key from '../enums/key';

// prettier-ignore
const KEY_STRINGS = [
  ['C','Am'],
  ['C#','Db','A#m','Bbm'],
  ['D','Bm'],
  ['D#','Eb','Cm'],
  ['E','C#m','Dbm'],
  ['F','Dm'],
  ['F#','Gb','D#m','Ebm'],
  ['G','Em'],
  ['G#','Ab','Fm'],
  ['A','F#m','Gbm'],
  ['A#','Bb','Gm'],
  ['B','G#m','Abm']
]

export default function stringToKey(s: string): Key {
  const index = KEY_STRINGS.findIndex((l) => l.includes(s));
  if (index == -1) return Key.C;
  return index;
}
