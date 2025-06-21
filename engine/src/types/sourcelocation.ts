
/** Describes a location (or optionally a range) in the source document */
export type SourceLocation = {
  line: number,
  col: number,
  length?: number,
};