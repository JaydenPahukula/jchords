import Song from 'shared/types/song';

export default function makeWelcomeSong(): Song {
  return {
    info: {
      id: 'welcome',
      title: 'Welcome',
      artist: '',
    },
    text: 'this is the welcome song!',
  };
}
