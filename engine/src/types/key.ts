import { Mode } from "src/types/mode";
import { Note } from "src/types/note"

/**
 * Represents a key that a song is in at a specific point in time
 */
export type Key = {
  rootNote: Note;
  mode: Mode
};