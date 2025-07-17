import { RequestHandler } from 'express';
import { GetUserResponseBody } from 'shared/types/api/getuserresponsebody';
import { getUser as authGetUser } from 'src/firebase/auth';

export const getUser: RequestHandler<{ id: string }, GetUserResponseBody> = async (
  request,
  response,
) => {
  const id = request.params.id;

  const user = await authGetUser(id);
  if (user === undefined) return response.status(404).send();

  return response.status(200).json({
    displayName: user.displayName,
    photoURL: user.photoURL,
  });
};
