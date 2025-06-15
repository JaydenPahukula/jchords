import { Song } from 'shared/types/song';

export function makeWelcomeSong(): Song {
  return {
    info: {
      id: 'welcome',
      title: 'Welcome',
      artist: '',
      author: '',
    },
    text: 'this is the welcome song!',
  };
}
