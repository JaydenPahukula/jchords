import {
  generateInterfaceChecker,
  isString,
  Optional,
} from 'shared/functions/generateInterfaceChecker';

export interface GetUserResponseBody {
  displayName?: string;
  photoURL?: string;
}

export const isGetUserResponseBody = generateInterfaceChecker<GetUserResponseBody>({
  displayName: Optional(isString),
  photoURL: Optional(isString),
});
