import { generateInterfaceChecker, isString } from 'shared/functions/generateInterfaceChecker';

export interface PutSongResponseBody {
  id: string;
}

export const isPutSongResponseBody = generateInterfaceChecker<PutSongResponseBody>({
  id: isString,
});
