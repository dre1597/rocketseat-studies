import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

type TPayload = {
  sub: string;
};

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, String(process.env.TOKEN_KEY)) as TPayload;

    request.user_id = sub;

    return next();
  } catch (error) {
    return response.status(401).end();
  }
}
