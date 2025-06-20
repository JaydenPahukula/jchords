import { generateInterfaceChecker, ObjectOf } from 'shared/functions/generateInterfaceChecker';
import { isSong, Song } from 'shared/types/song';

export interface GetSongResponseBody {
  song: Song;
}

export const isGetSongResponseBody = generateInterfaceChecker<GetSongResponseBody>({
  song: ObjectOf(isSong),
});
