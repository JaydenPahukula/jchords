import { generateInterfaceChecker, ObjectOf } from 'shared/functions/generateInterfaceChecker';
import { isSong, Song } from 'shared/types/song';

export interface PutSongRequestBody {
  song: Song;
}

export const isPutSongRequestBody = generateInterfaceChecker<PutSongRequestBody>({
  song: ObjectOf(isSong),
});
