import {
  generateInterfaceChecker,
  isString,
  ObjectOf,
} from 'shared/functions/generateInterfaceChecker';

export interface FirestoreSongDoc {
  text: string;
  info: {
    title: string;
    artist: string;
    author: string;
  };
}

export const isFirestoreSongDoc = generateInterfaceChecker<FirestoreSongDoc>({
  text: isString,
  info: ObjectOf(
    generateInterfaceChecker({
      title: isString,
      artist: isString,
      author: isString,
    }),
  ),
});
