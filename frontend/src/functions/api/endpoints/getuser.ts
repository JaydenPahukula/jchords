import { isGetUserResponseBody } from 'shared/types/api/getuserresponsebody';
import { UserInfo } from 'shared/types/userinfo';
import { apiFetch } from 'src/functions/api/apifetch';

export async function apiGetUser(id: string): Promise<UserInfo | undefined> {
  const result = await apiFetch('GET', 'user/' + id);
  if (!isGetUserResponseBody(result)) return undefined;
  return result;
}
