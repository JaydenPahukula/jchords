import cmSong, { cmAccidental } from 'src/types/cmsong';

export default function determineAccidentals(song: cmSong): cmAccidental | undefined {
  if (song.allKeys.explicit.length > 0) {
    return song.allKeys.explicit[0].accidental;
  }
  if (song.allKeys.auto !== undefined) {
    return song.allKeys.auto.accidental;
  }
  return undefined;
}
