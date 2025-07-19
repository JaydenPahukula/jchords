import {
  generateInterfaceChecker,
  isBoolean,
  ObjectOf,
} from 'shared/functions/generateInterfaceChecker';
import { isSong, Song } from 'shared/types/song';

export interface Tab {
  song: Song;
  new: boolean;
  modified: boolean;
}

export const isTab = generateInterfaceChecker<Tab>({
  song: ObjectOf(isSong),
  new: isBoolean,
  modified: isBoolean,
});
