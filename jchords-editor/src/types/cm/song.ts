export default interface cmSong {
  allLines: {
    string: string;
    type: string;
    isFromSectionMultiply?: boolean;
    isFromSectionCopy?: boolean;
    isFromAutoRepeatChords?: boolean;
  }[];
  allChords: {
    model: {}; // not sure about this
    occurences: number;
    duration: number;
  }[];
  allKeys: {
    auto: {}; // these either
    explicit: {}[];
  };
}
