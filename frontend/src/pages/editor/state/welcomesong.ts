import { Song } from 'shared/types/song';

const text = `Welcome to the JChords editor!

This is where you can write chord charts and publish them on JChords.
The format used here is very similar to ChordMark (https://chordmark.netlify.app/),
with a few differences.

*write some documentation and give examples*

Happy editing!
`;

export const welcomeSong: Song = {
  info: {
    id: 'welcome',
    title: 'Welcome to JChords',
    artist: '',
    author: '',
  },
  text: text,
};
