import Song from 'shared/types/song';
import getTmpId from 'src/functions/gettmpid';

export default function makeNewSong(): Song {
  return {
    info: {
      id: getTmpId(),
      title: 'New Song',
      artist: '',
    },
    text: '',
  };
}
