import {
  generateInterfaceChecker,
  isString,
  NullOr,
} from 'shared/functions/generateInterfaceChecker';

export interface GetUserResponseBody {
  displayName: string | null;
  photoURL: string | null;
}

export const isGetUserResponseBody = generateInterfaceChecker<GetUserResponseBody>({
  displayName: NullOr(isString),
  photoURL: NullOr(isString),
});
