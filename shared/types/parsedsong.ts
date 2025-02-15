import Accidental from '../enums/accidental';
import Key from '../enums/key';
import Mode from '../enums/mode';
import cmSong from './cm/cmsong';
import Song from './song';

export default interface ParsedSong extends Song {
  parsed: cmSong;
  defaultKey: Key;
  defaultAccidental: Accidental;
  mode: Mode;
}
