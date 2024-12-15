interface cmSongLine {
  // TODO
}

interface cmSongChord {
  // TODO
}

export enum cmAccidental {
  flat = 'flat',
  sharp = 'sharp',
}

interface cmKeyDeclaration {
  string: string;
  accidental: cmAccidental;
}

interface cmSongKeys {
  auto: cmKeyDeclaration | undefined;
  explicit: cmKeyDeclaration[];
}

export default interface cmSong {
  allLines: cmSongLine[];
  allChords: cmSongChord[];
  allKeys: cmSongKeys;
}
