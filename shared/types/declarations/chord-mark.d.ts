// TODO finish this
declare module 'chord-mark' {
  interface Song {
    allLines: SongLine[];
    allChords: SongChord[];
    allKeys: SongKeys;
  }

  interface SongLine {
    string: string;
    type: 'chord' | 'lyric' | 'timeSignature' | 'sectionLabel';
    isFromSectionMultiply: boolean;
    isFromSectionCopy: boolean;
    isFromAutoRepeatChords: boolean;
  }

  interface SongChordLine extends SongLine {
    type: 'chord';
    isFromChordLineRepeater: boolean;
  }

  interface SongChord {}

  interface SongKeys {}

  function parseSong(
    songSrc: string | string[],
    options?: {
      /** A JSDOM window object for using chordmark in NodeJs */
      windowObject: any;
    },
  ): Song;

  function renderSong(idk: any): string;

  const lineTypes: {
    CHORD: 'chord';
    EMPTY_LINE: 'emptyLine';
    KEY_DECLARATION: 'keyDeclaration';
    LYRIC: 'lyric';
    SECTION_LABEL: 'sectionLabel';
    TIME_SIGNATURE: 'timeSignature';
  };

  export { lineTypes, parseSong, renderSong };
}
