import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

export type RequestWithBody<Body, P = ParamsDictionary> = Request<P, any, Body>;
