import Song from 'src/types/song';
import generateTmpId from './generatetmpid';

const makeBlankSong = (): Song => ({
  src: '',
  info: {
    id: generateTmpId(),
    title: 'New Song',
    artist: '',
  },
});

export default makeBlankSong;
