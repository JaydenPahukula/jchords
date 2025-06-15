import { Song } from 'shared/types/song';

export function makeNewSong(): Song {
  return {
    info: {
      id: '',
      title: 'New Song',
      artist: '',
      author: '',
    },
    text: '',
  };
}
