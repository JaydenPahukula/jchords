import { generateInterfaceChecker, ObjectOf } from 'shared/functions/generateInterfaceChecker';
import { isSong, Song } from 'shared/types/song';

export interface PatchSongRequestBody {
  song: Song;
}

export const isPatchSongRequestBody = generateInterfaceChecker<PatchSongRequestBody>({
  song: ObjectOf(isSong),
});
