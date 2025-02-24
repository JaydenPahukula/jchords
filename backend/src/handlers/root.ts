import { Handler } from 'express';

const rootHandler: Handler = (request, response) => {
  return response.status(200).send('hello');
};

export default rootHandler;
