import { Handler } from 'express';

export const rootHandler: Handler = (_request, response) => {
  return response.status(200).send('hello');
};
