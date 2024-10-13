import Song from '../types/song';

export default function parseSong(src: string): Song {
  const lines: string[] = src.split('\n');
  console.log(lines);

  return {
    timeSignature: undefined,
    sections: [],
  };
}
